'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import AgeGate from './AgeGate';
import ChatInterface from './ChatInterface';

const AGE_GATE_KEY = 'sc_age_verified';

export default function ChatOverlay() {
  const [ageVerified, setAgeVerified]   = useState(false);
  const [showAgeGate, setShowAgeGate]   = useState(false);
  const [chatActive, setChatActive]     = useState(false);
  const [chatKey, setChatKey]           = useState(0);
  const [mounted, setMounted]           = useState(false);
  const router = useRouter();

  // Only render portals after mount (no SSR)
  useEffect(() => {
    setMounted(true);
    try {
      const verified = localStorage.getItem(AGE_GATE_KEY) === 'true';
      const autoStart = new URLSearchParams(window.location.search).get('start') === '1';
      setAgeVerified(verified);
      if (autoStart) {
        // Clean the URL then open chat
        router.replace('/', { scroll: false });
        if (verified) {
          setChatKey((k) => k + 1);
          setChatActive(true);
        } else {
          setShowAgeGate(true);
        }
      }
    } catch {}
  }, []);

  // Lock scroll on <html> — avoids the body:fixed stacking context bug
  useEffect(() => {
    const html = document.documentElement;
    if (chatActive) {
      const scrollY = window.scrollY;
      html.style.overflow     = 'hidden';
      html.dataset.scrollY    = String(scrollY);
    } else {
      const scrollY = Number(html.dataset.scrollY || 0);
      html.style.overflow     = '';
      delete html.dataset.scrollY;
      window.scrollTo(0, scrollY);
    }
  }, [chatActive]);

  const openChat = () => {
    setChatKey((k) => k + 1);
    setChatActive(true);
  };

  const handleStartChatRequest = () => {
    if (ageVerified) openChat();
    else setShowAgeGate(true);
  };

  const handleAgeVerify = () => {
    try { localStorage.setItem(AGE_GATE_KEY, 'true'); } catch {}
    setAgeVerified(true);
    setShowAgeGate(false);
    openChat();
  };

  const handleDecline = () => {
    setShowAgeGate(false);
    window.location.href = 'https://www.google.com';
  };

  const handleExitChat = () => {
    setChatActive(false);
  };

  return (
    <>
      {/* CTA button — stays in hero section */}
      <button
        id="start-chat-btn"
        onClick={handleStartChatRequest}
        className="btn-apple-primary text-[17px]"
        aria-label="Start chatting with strangers"
      >
        Start Chatting
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 ml-0.5" aria-hidden="true">
          <path d="M3.75 8a.75.75 0 0 1 .75-.75h5.19L8.22 5.78a.75.75 0 0 1 1.06-1.06l2.5 2.5a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 1 1-1.06-1.06l1.47-1.47H4.5A.75.75 0 0 1 3.75 8z" />
        </svg>
      </button>

      {/* Age gate + chat overlay — rendered via portal directly into document.body */}
      {mounted && showAgeGate && createPortal(
        <AgeGate onVerify={handleAgeVerify} onDecline={handleDecline} />,
        document.body
      )}

      {mounted && chatActive && createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            background: '#f5f5f7',
          }}
        >
          <ChatInterface key={chatKey} onExit={handleExitChat} />
        </div>,
        document.body
      )}
    </>
  );
}
