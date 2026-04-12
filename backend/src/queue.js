/**
 * ChatQueue — manages waiting users and active chat rooms.
 * Interest-based matching: tries to pair users with common interests first,
 * falls back to any available user.
 */
class ChatQueue {
  constructor() {
    // [{ socketId, socket, interests: string[] }]
    this.waitingUsers = [];

    // roomId -> { users: [socketId, socketId] }
    this.activeRooms = new Map();

    // socketId -> roomId
    this.userRooms = new Map();
  }

  // ── Queue Operations ────────────────────────────────────────────────────────

  addToQueue(socket, interests = []) {
    this.removeFromQueue(socket.id); // prevent duplicates
    this.waitingUsers.push({ socketId: socket.id, socket, interests });
  }

  removeFromQueue(socketId) {
    const idx = this.waitingUsers.findIndex((u) => u.socketId === socketId);
    if (idx !== -1) {
      this.waitingUsers.splice(idx, 1);
      return true;
    }
    return false;
  }

  /**
   * Find the best match for a given socket.
   * Prefers users with matching interests; falls back to first available.
   */
  findMatch(socket, interests = []) {
    const others = this.waitingUsers.filter((u) => u.socketId !== socket.id);
    if (others.length === 0) return null;

    let match = null;

    // Interest-based match
    if (interests.length > 0) {
      match = others.find((u) =>
        u.interests.some((i) => interests.map((x) => x.toLowerCase()).includes(i.toLowerCase()))
      );
    }

    // Fallback: first waiting user
    if (!match) match = others[0];

    // Remove from waiting list
    this.waitingUsers = this.waitingUsers.filter((u) => u.socketId !== match.socketId);
    this.removeFromQueue(socket.id);

    return match;
  }

  // ── Room Operations ─────────────────────────────────────────────────────────

  createRoom(socketId1, socketId2) {
    const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.activeRooms.set(roomId, { users: [socketId1, socketId2] });
    this.userRooms.set(socketId1, roomId);
    this.userRooms.set(socketId2, roomId);
    return roomId;
  }

  getRoomId(socketId) {
    return this.userRooms.get(socketId) || null;
  }

  getPartner(socketId) {
    const roomId = this.userRooms.get(socketId);
    if (!roomId) return null;
    const room = this.activeRooms.get(roomId);
    if (!room) return null;
    return room.users.find((id) => id !== socketId) || null;
  }

  leaveRoom(socketId) {
    const roomId = this.userRooms.get(socketId);
    if (!roomId) return null;

    const room = this.activeRooms.get(roomId);
    const partnerId = room?.users.find((id) => id !== socketId);

    this.activeRooms.delete(roomId);
    this.userRooms.delete(socketId);
    if (partnerId) this.userRooms.delete(partnerId);

    return partnerId || null;
  }

  /** Full cleanup: remove from queue AND leave any active room. */
  cleanup(socketId) {
    this.removeFromQueue(socketId);
    return this.leaveRoom(socketId);
  }

  // ── Stats ────────────────────────────────────────────────────────────────────

  getStats() {
    return {
      waiting: this.waitingUsers.length,
      activeRooms: this.activeRooms.size,
      activeUsers: this.activeRooms.size * 2,
    };
  }
}

module.exports = new ChatQueue();
