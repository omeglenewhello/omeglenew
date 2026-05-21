'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { BOT_TIMEOUT_MS, OPENING_SCRIPT, getBotResponse, randomDelay } from '@/lib/botChat';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export function useSocket() {
  const socketRef       = useRef(null);
  const typingTimerRef  = useRef(null);
  const botTimerRef     = useRef(null);   // fires if no real match in time
  const botTimeoutsRef  = useRef([]);     // pending bot message timeouts
  const isBotRef        = useRef(false);  // are we in bot mode?
  const botTypingRef    = useRef(null);   // bot typing indicator timer
  const botAskedAgeRef  = useRef(false);  // has bot asked age yet?
  const botSessionRef   = useRef(null);   // current bot session log

  const [status, setStatus]               = useState('idle');
  const [messages, setMessages]           = useState([]);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const [commonInterests, setCommonInterests] = useState([]);
  const [displayCount, setDisplayCount]   = useState(null);

  // ── Helpers ──────────────────────────────────────────────────────────────────
  function addMessage(msg) {
    setMessages((prev) => [...prev, msg]);
  }
  function addSystemMessage(text) {
    addMessage({ type: 'system', text, timestamp: Date.now() });
  }

  // ── Bot engine ───────────────────────────────────────────────────────────────
  function flushBotSession() {
    const s = botSessionRef.current;
    if (!s || s.messages.length === 0) return;
    s.endedAt = Date.now();
    const url = `${BACKEND_URL}/api/log-bot-chat`;
    const body = JSON.stringify(s);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }));
    } else {
      fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }).catch(() => {});
    }
    botSessionRef.current = null;
  }

  function clearBotTimeouts() {
    botTimeoutsRef.current.forEach(clearTimeout);
    botTimeoutsRef.current = [];
    clearTimeout(botTypingRef.current);
    clearTimeout(botTimerRef.current);
    setIsPartnerTyping(false);
  }

  function botSendMessage(text) {
    setIsPartnerTyping(true);
    const t = setTimeout(() => {
      setIsPartnerTyping(false);
      const now = Date.now();
      addMessage({ type: 'stranger', text, timestamp: now });
      botSessionRef.current?.messages.push({ sender: 'bot', text, sent_at: now });
    }, randomDelay(600, 1400));
    botTimeoutsRef.current.push(t);
  }

  const connectBot = useCallback(() => {
    isBotRef.current = true;
    botAskedAgeRef.current = false;
    botSessionRef.current = {
      sessionId: `bot_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      startedAt: Date.now(),
      endedAt: null,
      messages: [],
    };
    setStatus('connected');
    setCommonInterests([]);
    addSystemMessage("You're now chatting with a stranger. Say hi!");

    // Fire opening script
    OPENING_SCRIPT.forEach(({ delay, text }) => {
      const t = setTimeout(() => botSendMessage(text), delay);
      botTimeoutsRef.current.push(t);
    });

    // Auto-disconnect after 30 seconds silently
    const tLeave = setTimeout(() => {
      if (!isBotRef.current) return;
      isBotRef.current = false;
      flushBotSession();
      setIsPartnerTyping(false);
      setStatus('stranger_left');
      addSystemMessage('Stranger has disconnected.');
    }, 30000);
    botTimeoutsRef.current.push(tLeave);
  }, []);

  // Called when user sends a message in bot mode
  const botReply = useCallback((userText) => {
    // First reply from user — ask age before anything else
    if (!botAskedAgeRef.current) {
      botAskedAgeRef.current = true;
      const tTyping = setTimeout(() => setIsPartnerTyping(true), 300);
      const t = setTimeout(() => botSendMessage('age ?'), 1200);
      botTimeoutsRef.current.push(tTyping, t);
      return;
    }

    const { text, delay } = getBotResponse(userText);
    const tTyping = setTimeout(() => setIsPartnerTyping(true), Math.min(400, delay - 200));
    const t = setTimeout(() => botSendMessage(text), delay);
    botTimeoutsRef.current.push(tTyping, t);
  }, []);

  // ── Socket setup ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const socket = io(BACKEND_URL, {
      transports: ['polling', 'websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
    });
    socketRef.current = socket;

    socket.on('connect', () => console.log('[socket] connected', socket.id));
    socket.on('disconnect', () => console.log('[socket] disconnected'));

    socket.on('waiting', () => {
      setStatus('searching');
    });

    socket.on('matched', ({ commonInterests: ci = [] }) => {
      // Real user found — cancel bot timer and any pending bot messages
      clearTimeout(botTimerRef.current);
      if (isBotRef.current) return; // already in bot mode, ignore late real match
      isBotRef.current = false;

      setStatus('connected');
      setCommonInterests(ci);
      setIsPartnerTyping(false);
      addSystemMessage(
        ci.length > 0
          ? `You're now chatting with a stranger who likes: ${ci.join(', ')}. Say hi!`
          : "You're now chatting with a stranger. Say hi!"
      );
    });

    socket.on('message', ({ text, timestamp }) => {
      if (isBotRef.current) return; // in bot mode, ignore socket messages
      addMessage({ type: 'stranger', text, timestamp: timestamp || Date.now() });
    });

    socket.on('partner_typing', () => {
      if (isBotRef.current) return;
      setIsPartnerTyping(true);
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = setTimeout(() => setIsPartnerTyping(false), 2500);
    });

    socket.on('stranger_disconnected', () => {
      if (isBotRef.current) return;
      setStatus('stranger_left');
      setIsPartnerTyping(false);
      addSystemMessage('Stranger has disconnected.');
    });

    socket.on('system_error', ({ message }) => {
      addSystemMessage(`⚠ ${message}`);
    });

    socket.on('report_received', () => {
      addSystemMessage('Your report has been submitted. Thank you.');
    });

    socket.on('stats', (data) => {
      const real = (data.activeUsers || 0) + (data.waiting || 0);
      if (real >= 200) {
        setDisplayCount(real);
      } else {
        setDisplayCount((prev) => {
          const delta = Math.floor(Math.random() * 90) - 45;
          return Math.max(1000, Math.min(4000, (prev ?? 2000) + delta));
        });
      }
    });

    const handleUnload = () => flushBotSession();
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      socket.disconnect();
      clearTimeout(typingTimerRef.current);
      clearBotTimeouts();
    };
  }, []);

  // ── Seed fake count on first load ────────────────────────────────────────────
  useEffect(() => {
    setDisplayCount(Math.floor(Math.random() * 2800) + 1200);
  }, []);

  // ── Actions ──────────────────────────────────────────────────────────────────
  const startSearch = useCallback((interests = []) => {
    clearBotTimeouts();
    isBotRef.current = false;
    setStatus('searching');
    setMessages([]);
    setCommonInterests([]);
    setIsPartnerTyping(false);
    socketRef.current?.emit('find_match', { interests });

    // If no real match after BOT_TIMEOUT_MS, connect bot
    botTimerRef.current = setTimeout(() => {
      if (!isBotRef.current) connectBot();
    }, BOT_TIMEOUT_MS);
  }, [connectBot]);

  const sendMessage = useCallback((text) => {
    if (!text?.trim()) return;
    addMessage({ type: 'user', text: text.trim(), timestamp: Date.now() });

    if (isBotRef.current) {
      botSessionRef.current?.messages.push({ sender: 'user', text: text.trim(), sent_at: Date.now() });
      botReply(text.trim());
    } else {
      socketRef.current?.emit('message', { text: text.trim() });
    }
  }, [botReply]);

  const sendTypingIndicator = useCallback(() => {
    if (!isBotRef.current) socketRef.current?.emit('typing');
  }, []);

  const next = useCallback((interests = []) => {
    flushBotSession();
    clearBotTimeouts();
    isBotRef.current = false;
    botAskedAgeRef.current = false;
    setMessages([]);
    setCommonInterests([]);
    setIsPartnerTyping(false);
    setStatus('searching');
    socketRef.current?.emit('next', { interests });

    // Restart bot timer for the new search
    botTimerRef.current = setTimeout(() => {
      if (!isBotRef.current) connectBot();
    }, BOT_TIMEOUT_MS);
  }, [connectBot]);

  const stop = useCallback(() => {
    flushBotSession();
    clearBotTimeouts();
    isBotRef.current = false;
    socketRef.current?.emit('stop');
    setStatus('idle');
    setMessages([]);
    setCommonInterests([]);
    setIsPartnerTyping(false);
  }, []);

  const report = useCallback((reason, details = '') => {
    socketRef.current?.emit('report', { reason, details });
  }, []);

  return {
    status,
    messages,
    isPartnerTyping,
    commonInterests,
    displayCount,
    startSearch,
    sendMessage,
    sendTypingIndicator,
    next,
    stop,
    report,
  };
}
