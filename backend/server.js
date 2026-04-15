require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { setupSocketHandlers } = require('./src/socketHandlers');
const queue = require('./src/queue');

const app = express();
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
  max: 200,
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

// ── Socket.IO ─────────────────────────────────────────────────────────────────
const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  pingTimeout: 60_000,
  pingInterval: 25_000,
  maxHttpBufferSize: 1e4, // 10 KB max payload
  transports: ['websocket', 'polling'],
});

setupSocketHandlers(io);

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
