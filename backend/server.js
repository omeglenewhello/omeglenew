require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { setupSocketHandlers } = require('./src/socketHandlers');
const queue = require('./src/queue');
const chatStore = require('./src/chatStore');
const { renderDashboard, renderSession, renderLogin } = require('./src/adminDashboard');

const app = express();
app.set('trust proxy', 1);
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const NODE_ENV = process.env.NODE_ENV || 'development';

const ALLOWED_ORIGINS = [
  FRONTEND_URL,
  'https://omeglenew.com',
  'https://www.omeglenew.com',
  'http://localhost:3000',
];

// ── Security Middleware ───────────────────────────────────────────────────────
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);

app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.use(express.json({ limit: '10kb' }));

// ── Rate Limiting (HTTP) ──────────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

app.use('/api', apiLimiter);

// ── HTTP Routes ───────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), env: NODE_ENV });
});

app.get('/api/stats', (_req, res) => {
  res.json(queue.getStats());
});

// ── Bot Chat Logger ───────────────────────────────────────────────────────────
app.post('/api/log-bot-chat', (req, res) => {
  const { sessionId, startedAt, endedAt, messages } = req.body || {};
  if (!sessionId || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'invalid payload' });
  }
  const ipA = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  chatStore.logBotSession({ sessionId, startedAt, endedAt, ipA, messages });
  res.json({ ok: true });
});

// ── Admin JSON API ────────────────────────────────────────────────────────────
const ADMIN_KEY = process.env.ADMIN_KEY || 'changeme123';
const ADMIN_COOKIE = 'admin_auth';

function adminApiAuth(req, res, next) {
  const key = req.headers['x-admin-key'];
  if (key && key === ADMIN_KEY) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

app.get('/api/admin/chats', adminApiAuth, (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 50, 500);
  const offset = parseInt(req.query.offset) || 0;
  const sessions = chatStore.getSessions({ limit, offset });
  const stats = chatStore.getStats();
  res.json({ sessions, stats });
});

app.get('/api/admin/chats/:sessionId', adminApiAuth, (req, res) => {
  const messages = chatStore.getSessionMessages(req.params.sessionId);
  res.json({ messages });
});

app.use(express.urlencoded({ extended: false }));

function adminAuth(req, res, next) {
  const cookie = req.headers.cookie || '';
  const token = cookie.split(';').find(c => c.trim().startsWith(ADMIN_COOKIE + '='));
  if (token && token.split('=')[1].trim() === ADMIN_KEY) return next();
  res.redirect('/admin/login');
}

app.get('/admin/login', (_req, res) => {
  res.send(renderLogin(false));
});

app.post('/admin/login', (req, res) => {
  if (req.body.password === ADMIN_KEY) {
    res.setHeader('Set-Cookie', `${ADMIN_COOKIE}=${ADMIN_KEY}; Path=/admin; HttpOnly`);
    return res.redirect('/admin');
  }
  res.send(renderLogin(true));
});

app.get('/admin', adminAuth, (_req, res) => {
  const sessions = chatStore.getSessions({ limit: 100 });
  const stats    = chatStore.getStats();
  res.send(renderDashboard(sessions, stats));
});

app.get('/admin/chats/:sessionId', adminAuth, (req, res) => {
  const messages = chatStore.getSessionMessages(req.params.sessionId);
  res.send(renderSession(req.params.sessionId, messages));
});

// ── Socket.IO ─────────────────────────────────────────────────────────────────
const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  pingTimeout: 120_000,
  pingInterval: 25_000,
  upgradeTimeout: 30_000,
  maxHttpBufferSize: 1e4, // 10 KB max payload
  transports: ['polling', 'websocket'],
});

setupSocketHandlers(io);

// ── Broadcast stats every 10s via Socket.IO ───────────────────────────────────
setInterval(() => {
  io.emit('stats', queue.getStats());
}, 10_000);

// ── Start ─────────────────────────────────────────────────────────────────────
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT} [${NODE_ENV}]`);
  console.log(`   CORS origin: ${FRONTEND_URL}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});
