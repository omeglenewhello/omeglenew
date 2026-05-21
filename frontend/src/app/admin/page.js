'use client';
import { useState, useEffect } from 'react';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.omeglenew.com';
const ADMIN_KEY = 'admin_session_key';

export default function AdminPage() {
  const [authed, setAuthed]       = useState(false);
  const [password, setPassword]   = useState('');
  const [error, setError]         = useState('');
  const [sessions, setSessions]   = useState([]);
  const [stats, setStats]         = useState(null);
  const [loading, setLoading]     = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(ADMIN_KEY);
    if (saved) { setAuthed(true); fetchData(saved); }
  }, []);

  async function fetchData(key) {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/api/admin/chats?limit=100`, {
        headers: { 'x-admin-key': key },
      });
      if (!res.ok) { sessionStorage.removeItem(ADMIN_KEY); setAuthed(false); return; }
      const data = await res.json();
      setSessions(data.sessions || []);
      setStats(data.stats || null);
    } catch {}
    setLoading(false);
  }

  function handleLogin(e) {
    e.preventDefault();
    setError('');
    fetch(`${BACKEND}/api/admin/chats`, { headers: { 'x-admin-key': password } })
      .then(r => {
        if (r.ok) {
          sessionStorage.setItem(ADMIN_KEY, password);
          setAuthed(true);
          return r.json().then(d => { setSessions(d.sessions || []); setStats(d.stats || null); });
        }
        setError('Wrong password');
      })
      .catch(() => setError('Cannot reach backend'));
  }

  if (!authed) return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#111', border: '1px solid #222', borderRadius: 14, padding: 36, width: 320 }}>
        <h1 style={{ color: '#fff', fontSize: 18, fontWeight: 600, marginBottom: 6 }}>OmegleNew Admin</h1>
        <p style={{ color: '#555', fontSize: 13, marginBottom: 24 }}>Enter admin password</p>
        {error && <p style={{ color: '#f87171', fontSize: 12, marginBottom: 12 }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            style={{ width: '100%', background: '#0f0f0f', border: '1px solid #2a2a2a', color: '#e0e0e0', padding: '10px 14px', borderRadius: 8, fontSize: 14, outline: 'none', marginBottom: 12, boxSizing: 'border-box' }}
          />
          <button type="submit" style={{ width: '100%', background: '#1a6aff', color: '#fff', border: 'none', padding: 11, borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', color: '#e0e0e0', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>

      {/* Top bar */}
      <div style={{ background: '#111', borderBottom: '1px solid #222', padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>OmegleNew Admin</span>
        <button onClick={() => { sessionStorage.removeItem(ADMIN_KEY); setAuthed(false); }}
          style={{ background: 'none', border: '1px solid #333', color: '#666', padding: '4px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>
          Logout
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div style={{ display: 'flex', gap: 16, padding: '24px 28px' }}>
          {[
            { num: stats.total_sessions, lbl: 'Total Sessions' },
            { num: stats.total_messages, lbl: 'Total Messages' },
            { num: stats.today_sessions, lbl: 'Today' },
          ].map(s => (
            <div key={s.lbl} style={{ background: '#111', border: '1px solid #222', borderRadius: 10, padding: '16px 22px', flex: 1 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>{s.num?.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: '#555', marginTop: 4, textTransform: 'uppercase', letterSpacing: '.08em' }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div style={{ padding: '0 28px 32px' }}>
        {loading ? <p style={{ color: '#555', padding: 40, textAlign: 'center' }}>Loading...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['#', 'Started', 'Duration', 'Messages', 'Type', 'IP', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #222', color: '#555', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: 60, color: '#444' }}>No sessions yet</td></tr>
              ) : sessions.map((s, i) => {
                const start = new Date(s.started_at);
                const durMs = s.ended_at ? s.ended_at - s.started_at : null;
                const dur = durMs ? `${Math.round(durMs / 1000)}s` : 'live';
                return (
                  <tr key={s.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                    <td style={{ padding: '10px 12px', color: '#444' }}>{i + 1}</td>
                    <td style={{ padding: '10px 12px' }}>{start.toLocaleDateString()} {start.toLocaleTimeString()}</td>
                    <td style={{ padding: '10px 12px' }}>{dur}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ background: s.msg_count > 0 ? '#0d2e1a' : '#1a1a1a', color: s.msg_count > 0 ? '#34c97a' : '#666', padding: '2px 8px', borderRadius: 20, fontSize: 11 }}>{s.msg_count}</span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ color: s.is_bot ? '#a78bfa' : '#60a5fa', fontSize: 11 }}>{s.is_bot ? 'bot' : 'real'}</span>
                    </td>
                    <td style={{ padding: '10px 12px', fontSize: 11, color: '#555' }}>{s.ip_a || '-'}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <a href={`/admin/chats/${s.id}`} style={{ color: '#4a9eff', textDecoration: 'none', fontSize: 12 }}>View →</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
