'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export function useSocket() {
  const socketRef = useRef(null);
  const typingTimerRef = useRef(null);

  const [status, setStatus] = useState('idle');
  // idle | searching | connected | stranger_left
  const [messages, setMessages] = useState([]);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const [commonInterests, setCommonInterests] = useState([]);
  const [displayCount, setDisplayCount] = useState(null);

  // ── Connect once ────────────────────────────────────────────────────────────
  useEffect(() => {
    const socket = io(BACKEND_URL, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('[socket] connected', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('[socket] disconnected');
    });

    socket.on('waiting', () => {
      setStatus('searching');
    });

    socket.on('matched', ({ commonInterests: ci = [] }) => {
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
      addMessage({ type: 'stranger', text, timestamp: timestamp || Date.now() });
    });

    socket.on('partner_typing', () => {
      setIsPartnerTyping(true);
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = setTimeout(() => setIsPartnerTyping(false), 2500);
    });

    socket.on('stranger_disconnected', () => {
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

    return () => {
      socket.disconnect();
      clearTimeout(typingTimerRef.current);
    };
  }, []);

  // ── Fetch live stats + fake count when real users < 200 ─────────────────────
  useEffect(() => {
    // Seed on client only — avoids hydration mismatch
    setDisplayCount(Math.floor(Math.random() * 2800) + 1200);

    async function fetchStats() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/stats`);
        if (res.ok) {
          const data = await res.json();
          const real = (data.activeUsers || 0) + (data.waiting || 0);
          if (real >= 200) {
            setDisplayCount(real);
            return;
          }
        }
      } catch {
        // Stats are non-critical
      }
      // Real count < 200 or fetch failed — drift the fake number
      setDisplayCount((prev) => {
        const delta = Math.floor(Math.random() * 90) - 45;
        return Math.max(1000, Math.min(4000, (prev ?? 2000) + delta));
      });
    }

    const interval = setInterval(fetchStats, 5_000);
    return () => clearInterval(interval);
  }, []);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  function addMessage(msg) {
    setMessages((prev) => [...prev, msg]);
  }

  function addSystemMessage(text) {
    addMessage({ type: 'system', text, timestamp: Date.now() });
  }

  // ── Actions ─────────────────────────────────────────────────────────────────
  const startSearch = useCallback((interests = []) => {
    setStatus('searching');
    setMessages([]);
    setCommonInterests([]);
    setIsPartnerTyping(false);
    socketRef.current?.emit('find_match', { interests });
  }, []);

  const sendMessage = useCallback((text) => {
    if (!text?.trim()) return;
    socketRef.current?.emit('message', { text: text.trim() });
    addMessage({ type: 'user', text: text.trim(), timestamp: Date.now() });
  }, []);

  const sendTypingIndicator = useCallback(() => {
    socketRef.current?.emit('typing');
  }, []);

  const next = useCallback((interests = []) => {
    setMessages([]);
    setCommonInterests([]);
    setIsPartnerTyping(false);
    setStatus('searching');
    socketRef.current?.emit('next', { interests });
  }, []);

  const stop = useCallback(() => {
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
