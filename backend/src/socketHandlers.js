const queue = require('./queue');
const { filterMessage, containsBannedContent } = require('./profanityFilter');

const MAX_MESSAGE_LENGTH = 500;
const RATE_LIMIT_MESSAGES = 12; // per window
const RATE_LIMIT_WINDOW_MS = 10_000; // 10 seconds

// Per-socket message rate tracking
const rateLimitMap = new Map();

function isRateLimited(socketId) {
  const now = Date.now();
  const entry = rateLimitMap.get(socketId) || { count: 0, windowStart: now };

  if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(socketId, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MESSAGES) return true;

  rateLimitMap.set(socketId, { ...entry, count: entry.count + 1 });
  return false;
}

function setupSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log(`[connect]  ${socket.id}  ip=${socket.handshake.address}`);

    // ── Find Match ─────────────────────────────────────────────────────────────
    socket.on('find_match', ({ interests = [] } = {}) => {
      // Validate interests
      const safeInterests = Array.isArray(interests)
        ? interests.slice(0, 10).map((i) => String(i).slice(0, 30))
        : [];

      const partner = queue.findMatch(socket, safeInterests);

      if (partner) {
        const roomId = queue.createRoom(socket.id, partner.socketId);
        socket.join(roomId);
        partner.socket.join(roomId);

        // Determine common interests for display
        const common = safeInterests.filter((i) =>
          partner.interests.map((x) => x.toLowerCase()).includes(i.toLowerCase())
        );

        socket.emit('matched', { roomId, commonInterests: common });
        partner.socket.emit('matched', { roomId, commonInterests: common });

        console.log(`[matched]  ${socket.id} <-> ${partner.socketId}  room=${roomId}`);
      } else {
        queue.addToQueue(socket, safeInterests);
        socket.emit('waiting');
        console.log(`[waiting]  ${socket.id}`);
      }
    });

    // ── Send Message ───────────────────────────────────────────────────────────
    socket.on('message', ({ text }) => {
      if (!text || typeof text !== 'string') return;

      const trimmed = text.trim();
      if (!trimmed || trimmed.length > MAX_MESSAGE_LENGTH) return;

      if (isRateLimited(socket.id)) {
        socket.emit('system_error', { message: 'You\'re sending messages too fast. Slow down.' });
        return;
      }

      if (containsBannedContent(trimmed)) {
        socket.emit('system_error', { message: 'Your message was blocked for violating community guidelines.' });
        return;
      }

      const filtered = filterMessage(trimmed);
      const partnerId = queue.getPartner(socket.id);

      if (partnerId) {
        io.to(partnerId).emit('message', {
          text: filtered,
          timestamp: Date.now(),
        });
      }
    });

    // ── Typing Indicator ───────────────────────────────────────────────────────
    socket.on('typing', () => {
      const partnerId = queue.getPartner(socket.id);
      if (partnerId) {
        io.to(partnerId).emit('partner_typing');
      }
    });

    // ── Next (skip to new stranger) ────────────────────────────────────────────
    socket.on('next', ({ interests = [] } = {}) => {
      const partnerId = queue.cleanup(socket.id);
      if (partnerId) {
        io.to(partnerId).emit('stranger_disconnected');
        console.log(`[next]     ${socket.id} skipped ${partnerId}`);
      }

      const safeInterests = Array.isArray(interests)
        ? interests.slice(0, 10).map((i) => String(i).slice(0, 30))
        : [];

      const newPartner = queue.findMatch(socket, safeInterests);

      if (newPartner) {
        const roomId = queue.createRoom(socket.id, newPartner.socketId);
        socket.join(roomId);
        newPartner.socket.join(roomId);

        const common = safeInterests.filter((i) =>
          newPartner.interests.map((x) => x.toLowerCase()).includes(i.toLowerCase())
        );

        socket.emit('matched', { roomId, commonInterests: common });
        newPartner.socket.emit('matched', { roomId, commonInterests: common });

        console.log(`[matched]  ${socket.id} <-> ${newPartner.socketId}  room=${roomId}`);
      } else {
        queue.addToQueue(socket, safeInterests);
        socket.emit('waiting');
        console.log(`[waiting]  ${socket.id}`);
      }
    });

    // ── Stop Chat ──────────────────────────────────────────────────────────────
    socket.on('stop', () => {
      const partnerId = queue.cleanup(socket.id);
      if (partnerId) {
        io.to(partnerId).emit('stranger_disconnected');
        console.log(`[stop]     ${socket.id} stopped chat`);
      }
    });

    // ── Report ─────────────────────────────────────────────────────────────────
    socket.on('report', ({ reason, details = '' }) => {
      const partnerId = queue.getPartner(socket.id);
      console.log(
        `[report]   reporter=${socket.id}  reported=${partnerId || 'unknown'}  reason=${reason}  details=${details}`
      );
      // TODO: persist reports to database for moderator review
      socket.emit('report_received');
    });

    // ── Disconnect ─────────────────────────────────────────────────────────────
    socket.on('disconnect', (reason) => {
      console.log(`[disconnect] ${socket.id}  reason=${reason}`);
      const partnerId = queue.cleanup(socket.id);
      if (partnerId) {
        io.to(partnerId).emit('stranger_disconnected');
      }
      rateLimitMap.delete(socket.id);
    });
  });
}

module.exports = { setupSocketHandlers };
