'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useSocket } from '@/hooks/useSocket';
import ReportModal from './ReportModal';

const INTERESTS_OPTIONS = [
  'Music', 'Movies', 'Gaming', 'Sports', 'Travel',
  'Technology', 'Art', 'Books', 'Fitness', 'Food',
  'Anime', 'Science', 'Fashion', 'Photography', 'Coding',
];

const MAX_MSG_LENGTH = 500;

export default function ChatInterface({ onExit }) {
  const {
    status,
    messages,
    isPartnerTyping,
    displayCount,
    startSearch,
    sendMessage,
    sendTypingIndicator,
    next,
    stop,
    report,
  } = useSocket();

  const [input, setInput] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [customInterest, setCustomInterest] = useState('');
  const [nextConfirm, setNextConfirm] = useState(false); // two-step Next confirm
  const nextTimerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const lastTypingSentRef = useRef(0);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isPartnerTyping]);

  // Focus input when connected
  useEffect(() => {
    if (status === 'connected') inputRef.current?.focus();
  }, [status]);

  // ── Interest helpers ────────────────────────────────────────────────────────
  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest].slice(0, 10)
    );
  };

  const addCustomInterest = () => {
    const val = customInterest.trim();
    if (!val || selectedInterests.includes(val) || selectedInterests.length >= 10) return;
    setSelectedInterests((prev) => [...prev, val]);
    setCustomInterest('');
  };

  // ── Send message ────────────────────────────────────────────────────────────
  const handleSend = useCallback(() => {
    if (!input.trim() || status !== 'connected') return;
    sendMessage(input.trim());
    setInput('');
    inputRef.current?.focus();
  }, [input, status, sendMessage]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    // Throttle typing events to ~1 per 2s
    const now = Date.now();
    if (now - lastTypingSentRef.current > 2000) {
      sendTypingIndicator();
      lastTypingSentRef.current = now;
    }
  };

  // ── Next / Stop ─────────────────────────────────────────────────────────────
  const handleNext = () => {
    if (!nextConfirm) {
      // First click — enter confirm mode, auto-reset after 3s
      setNextConfirm(true);
      nextTimerRef.current = setTimeout(() => setNextConfirm(false), 3000);
    } else {
      // Second click — actually skip
      clearTimeout(nextTimerRef.current);
      setNextConfirm(false);
      setInput('');
      next(selectedInterests);
    }
  };

  // Clean up timer on unmount
  useEffect(() => () => clearTimeout(nextTimerRef.current), []);

  const handleStop = () => {
    setInput('');
    stop();
    onExit();
  };

  // ── Report ──────────────────────────────────────────────────────────────────
  const handleReport = (reason, details) => {
    report(reason, details);
    setShowReport(false);
  };

  // ── Status bar config ────────────────────────────────────────────────────────
  const statusConfig = {
    idle: { dot: 'bg-gray-400', text: 'Not connected', textColor: 'text-gray-500' },
    searching: { dot: 'bg-yellow-400 animate-pulse', text: 'Looking for a stranger...', textColor: 'text-yellow-600' },
    connected: { dot: 'bg-green-400', text: 'Connected with a stranger', textColor: 'text-green-600' },
    stranger_left: { dot: 'bg-red-400', text: 'Stranger disconnected', textColor: 'text-red-500' },
  };
  const { dot, text: statusText, textColor } = statusConfig[status] || statusConfig.idle;

  // ── Pre-chat screen (idle / stranger_left) ─────────────────────────────────
  const isIdle = status === 'idle' || status === 'stranger_left';

  return (
    <div className="flex flex-col h-full bg-[#f5f5f7]">
      {/* ── Top Bar ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className={`inline-block w-2.5 h-2.5 rounded-full ${dot}`} />
          <span className={`text-sm font-medium ${textColor}`}>{statusText}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            {displayCount ? `${displayCount.toLocaleString()} online` : '...'}
          </span>
          <button
            onClick={() => { stop(); onExit(); }}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100"
            aria-label="Exit chat"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Main Area ────────────────────────────────────────────────────────── */}
      {isIdle ? (
        // Pre-chat / Setup Screen
        <div className="flex-1 overflow-y-auto flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {status === 'stranger_left' && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <p className="text-red-600 font-medium text-sm">Stranger disconnected.</p>
                <p className="text-red-500 text-xs mt-1">Find a new person below.</p>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-md p-6">
              {/* Back button */}
              <button
                onClick={() => { stop(); onExit(); }}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-5 -ml-1"
                aria-label="Go back to home"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </button>

              <h2 className="text-xl font-bold text-gray-900 mb-1">Start a New Chat</h2>
              <p className="text-gray-500 text-sm mb-5">
                Add your interests to match with like-minded people (optional).
              </p>

              {/* Interest tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {INTERESTS_OPTIONS.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                      selectedInterests.includes(interest)
                        ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-brand-400 hover:text-brand-600'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>

              {/* Custom interest */}
              <div className="flex gap-2 mb-5">
                <input
                  type="text"
                  value={customInterest}
                  onChange={(e) => setCustomInterest(e.target.value.slice(0, 30))}
                  onKeyDown={(e) => e.key === 'Enter' && addCustomInterest()}
                  placeholder="Add your own interest..."
                  className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-300"
                />
                <button
                  onClick={addCustomInterest}
                  className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                >
                  Add
                </button>
              </div>

              {selectedInterests.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {selectedInterests.map((i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-brand-50 text-brand-700 text-xs rounded-full"
                    >
                      {i}
                      <button
                        onClick={() => toggleInterest(i)}
                        className="hover:text-brand-900"
                        aria-label={`Remove ${i}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={() => startSearch(selectedInterests)}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 shadow-md hover:shadow-lg transition-all text-base"
              >
                Start Chatting
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Chat Messages
        <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-messages">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} msg={msg} />
          ))}

          {/* Typing indicator */}
          {isPartnerTyping && (
            <div className="flex items-end gap-2">
              <div className="bg-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                <span className="typing-dot w-2 h-2 bg-gray-500 rounded-full inline-block" />
                <span className="typing-dot w-2 h-2 bg-gray-500 rounded-full inline-block" />
                <span className="typing-dot w-2 h-2 bg-gray-500 rounded-full inline-block" />
              </div>
              <span className="text-xs text-gray-400 mb-1">typing</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* ── Ad Banner (between messages and input) ────────────────────────── */}
      {/* Uncomment and add your slot ID when AdSense is approved:
      <AdBanner slot="YOUR_SLOT_ID" className="mx-4 my-1" />
      */}

      {/* ── Bottom Input Area ─────────────────────────────────────────────── */}
      {!isIdle && (
        <div className="flex-shrink-0 bg-white border-t border-gray-200">
          {/* Input row */}
          <div className="flex items-end gap-2 px-3 py-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={
                status === 'searching'
                  ? 'Connecting...'
                  : status === 'connected'
                  ? 'Type a message...'
                  : 'Stranger disconnected'
              }
              disabled={status !== 'connected'}
              rows={1}
              maxLength={MAX_MSG_LENGTH}
              className="flex-1 px-3 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-300 disabled:bg-gray-50 disabled:text-gray-400 max-h-32 overflow-y-auto"
              style={{ lineHeight: '1.5' }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || status !== 'connected'}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all flex items-center justify-center"
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 translate-x-0.5" aria-hidden="true">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between px-3 pb-3 gap-2">
            <div className="flex gap-2">
              <button
                onClick={handleNext}
                className={`relative overflow-hidden px-4 py-2 text-sm font-semibold rounded-xl text-white transition-all ${
                  nextConfirm
                    ? 'bg-orange-500 hover:bg-orange-600 min-w-[130px]'
                    : 'bg-brand-600 hover:bg-brand-700'
                }`}
              >
                {/* Shrinking timer bar on confirm state */}
                {nextConfirm && (
                  <span
                    className="absolute inset-0 bg-white/20 origin-left"
                    style={{ animation: 'shrinkBar 3s linear forwards' }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">
                  {nextConfirm ? '⚠ Confirm skip?' : 'Next →'}
                </span>
              </button>
              <button
                onClick={handleStop}
                className="px-4 py-2 text-sm font-medium rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all"
              >
                Stop
              </button>
            </div>

            <div className="flex items-center gap-3">
              {input.length > MAX_MSG_LENGTH * 0.8 && (
                <span className="text-xs text-gray-400">
                  {MAX_MSG_LENGTH - input.length}
                </span>
              )}
              {status === 'connected' && (
                <button
                  onClick={() => setShowReport(true)}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors flex items-center gap-1"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                  </svg>
                  Report
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReport && (
        <ReportModal onSubmit={handleReport} onClose={() => setShowReport(false)} />
      )}
    </div>
  );
}

// ── MessageBubble ─────────────────────────────────────────────────────────────
function MessageBubble({ msg }) {
  if (msg.type === 'system') {
    return (
      <div className="flex justify-center message-bubble">
        <span className="text-xs text-gray-400 italic bg-gray-100 px-3 py-1 rounded-full">
          {msg.text}
        </span>
      </div>
    );
  }

  const isUser = msg.type === 'user';

  return (
    <div className={`flex items-end gap-2 message-bubble ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-xs text-gray-500 font-bold">
          S
        </div>
      )}
      <div
        className={`max-w-[75%] sm:max-w-[60%] px-3 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
          isUser
            ? 'bg-brand-600 text-white rounded-br-sm'
            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}
