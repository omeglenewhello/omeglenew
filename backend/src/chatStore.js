const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

const db = new Database(path.join(DB_DIR, 'chats.db'));

// ── Schema ────────────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id          TEXT PRIMARY KEY,
    started_at  INTEGER NOT NULL,
    ended_at    INTEGER,
    ip_a        TEXT,
    ip_b        TEXT,
    msg_count   INTEGER DEFAULT 0,
    is_bot      INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS messages (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id  TEXT NOT NULL,
    sender      TEXT NOT NULL,
    text        TEXT NOT NULL,
    sent_at     INTEGER NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(id)
  );

  CREATE INDEX IF NOT EXISTS idx_messages_session ON messages(session_id);
  CREATE INDEX IF NOT EXISTS idx_sessions_started ON sessions(started_at DESC);
`);

// ── Migrations (add columns to existing tables) ───────────────────────────────
const cols = db.prepare(`PRAGMA table_info(sessions)`).all().map(c => c.name);
if (!cols.includes('is_bot')) {
  db.exec(`ALTER TABLE sessions ADD COLUMN is_bot INTEGER DEFAULT 0`);
}

// ── Prepared statements ───────────────────────────────────────────────────────
const insertSession = db.prepare(
  `INSERT OR IGNORE INTO sessions (id, started_at, ip_a, ip_b) VALUES (?, ?, ?, ?)`
);

const insertMessage = db.prepare(
  `INSERT INTO messages (session_id, sender, text, sent_at) VALUES (?, ?, ?, ?)`
);

const closeSession = db.prepare(
  `UPDATE sessions SET ended_at = ?, msg_count = (
    SELECT COUNT(*) FROM messages WHERE session_id = ?
  ) WHERE id = ?`
);

// ── API ───────────────────────────────────────────────────────────────────────

function startSession(sessionId, ipA, ipB) {
  insertSession.run(sessionId, Date.now(), ipA || null, ipB || null);
}

function logMessage(sessionId, sender, text) {
  try {
    insertMessage.run(sessionId, sender, text, Date.now());
  } catch {}
}

function endSession(sessionId) {
  closeSession.run(Date.now(), sessionId, sessionId);
}

function getSessions({ limit = 50, offset = 0 } = {}) {
  return db.prepare(
    `SELECT * FROM sessions ORDER BY started_at DESC LIMIT ? OFFSET ?`
  ).all(limit, offset);
}

function getSessionMessages(sessionId) {
  return db.prepare(
    `SELECT * FROM messages WHERE session_id = ? ORDER BY sent_at ASC`
  ).all(sessionId);
}

function getStats() {
  return {
    total_sessions: db.prepare(`SELECT COUNT(*) as c FROM sessions`).get().c,
    total_messages: db.prepare(`SELECT COUNT(*) as c FROM messages`).get().c,
    today_sessions: db.prepare(
      `SELECT COUNT(*) as c FROM sessions WHERE started_at > ?`
    ).get(Date.now() - 86400000).c,
  };
}

// Insert a complete bot session in one transaction
const logBotSessionTx = db.transaction((sessionId, startedAt, endedAt, ipA, messages) => {
  db.prepare(
    `INSERT OR IGNORE INTO sessions (id, started_at, ended_at, ip_a, ip_b, msg_count, is_bot)
     VALUES (?, ?, ?, ?, 'bot', ?, 1)`
  ).run(sessionId, startedAt, endedAt, ipA || null, messages.length);

  const ins = db.prepare(
    `INSERT INTO messages (session_id, sender, text, sent_at) VALUES (?, ?, ?, ?)`
  );
  for (const m of messages) {
    ins.run(sessionId, m.sender, m.text, m.sent_at);
  }
});

function logBotSession({ sessionId, startedAt, endedAt, ipA, messages }) {
  try {
    logBotSessionTx(sessionId, startedAt, endedAt, ipA, messages);
  } catch (e) {
    console.error('[chatStore] logBotSession error:', e.message);
  }
}

module.exports = { startSession, logMessage, endSession, logBotSession, getSessions, getSessionMessages, getStats };
