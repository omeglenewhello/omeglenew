'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.omeglenew.com';
const ADMIN_KEY = 'admin_session_key';

export default function SessionPage() {
  const { sessionId } = useParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const key = sessionStorage.getItem(ADMIN_KEY);
    if (!key) { router.replace('/admin'); return; }

    fetch(`${BACKEND}/api/admin/chats/${sessionId}`, {
      headers: { 'x-admin-key': key },
    })
      .then(r => {
        if (r.status === 401) { sessionStorage.removeItem(ADMIN_KEY); router.replace('/admin'); return null; }
        if (!r.ok) throw new Error('Failed to load');
        return r.json();
      })
      .then(data => {
        if (data) setMessages(data.messages || []);
      })
      .catch(() => setError('Could not load session'))
      .finally(() => setLoading(false));
  }, [sessionId]);

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', color: '#e0e0e0', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>

      {/* Top bar */}
      <div style={{ background: '#111', borderBottom: '1px solid #222', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => router.back()}
          style={{ background: 'none', border: '1px solid #333', color: '#888', padding: '4px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>
          ← Back
        </button>
        <span style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>Session</span>
        <span style={{ color: '#444', fontSize: 11, fontFamily: 'monospace' }}>{sessionId}</span>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '28px 24px' }}>
        {loading && <p style={{ color: '#555', textAlign: 'center', padding: 60 }}>Loading...</p>}
        {error && <p style={{ color: '#f87171', textAlign: 'center', padding: 40 }}>{error}</p>}
        {!loading && !error && messages.length === 0 && (
          <p style={{ color: '#444', textAlign: 'center', padding: 60 }}>No messages in this session.</p>
        )}
        {messages.map((m, i) => {
          const isUser = m.sender === 'user';
          const isBot = m.sender === 'bot';
          const isStranger = !isUser && !isBot;
          return (
            <div key={m.id || i} style={{
              display: 'flex',
              flexDirection: isUser ? 'row-reverse' : 'row',
              marginBottom: 12,
              gap: 10,
              alignItems: 'flex-end',
            }}>
              <div style={{
                background: isUser ? '#1a4fd6' : isBot ? '#2d1a5e' : '#1a1a1a',
                border: `1px solid ${isUser ? '#2a5fff' : isBot ? '#7c3aed' : '#2a2a2a'}`,
                borderRadius: 12,
                padding: '8px 14px',
                maxWidth: '72%',
                fontSize: 14,
                lineHeight: 1.5,
                color: '#e0e0e0',
              }}>
                {m.text}
                <div style={{ fontSize: 10, color: '#666', marginTop: 4, textAlign: isUser ? 'right' : 'left' }}>
                  <span style={{ color: isBot ? '#a78bfa' : isStranger ? '#60a5fa' : '#6ea8ff', marginRight: 6, textTransform: 'uppercase', fontSize: 9, letterSpacing: '.05em' }}>
                    {m.sender}
                  </span>
                  {new Date(m.sent_at).toLocaleTimeString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
