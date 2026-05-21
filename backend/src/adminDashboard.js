function renderDashboard(sessions, stats) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>OmegleNew — Admin</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0f0f0f;color:#e0e0e0;min-height:100vh}
  .topbar{background:#111;border-bottom:1px solid #222;padding:14px 28px;display:flex;align-items:center;justify-content:space-between}
  .topbar h1{font-size:16px;font-weight:600;color:#fff;letter-spacing:.02em}
  .topbar span{font-size:12px;color:#555}
  .stats{display:flex;gap:16px;padding:24px 28px}
  .stat{background:#111;border:1px solid #222;border-radius:10px;padding:16px 22px;flex:1}
  .stat .num{font-size:28px;font-weight:700;color:#fff}
  .stat .lbl{font-size:11px;color:#555;margin-top:4px;text-transform:uppercase;letter-spacing:.08em}
  .section{padding:0 28px 32px}
  table{width:100%;border-collapse:collapse;font-size:13px}
  th{text-align:left;padding:10px 12px;border-bottom:1px solid #222;color:#555;font-weight:500;font-size:11px;text-transform:uppercase;letter-spacing:.06em}
  td{padding:10px 12px;border-bottom:1px solid #1a1a1a;vertical-align:top}
  tr:hover td{background:#111}
  a{color:#4a9eff;text-decoration:none}
  a:hover{text-decoration:underline}
  .badge{display:inline-block;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:500}
  .badge-green{background:#0d2e1a;color:#34c97a}
  .badge-gray{background:#1a1a1a;color:#666}
  .empty{text-align:center;padding:60px;color:#444;font-size:14px}
  .search{padding:0 28px 16px;display:flex;gap:10px}
  .search input{background:#111;border:1px solid #222;color:#e0e0e0;padding:8px 14px;border-radius:8px;font-size:13px;width:300px;outline:none}
  .search input:focus{border-color:#333}
</style>
</head>
<body>
<div class="topbar">
  <h1>OmegleNew Admin</h1>
  <span>Chat Logs</span>
</div>

<div class="stats">
  <div class="stat"><div class="num">${stats.total_sessions.toLocaleString()}</div><div class="lbl">Total Sessions</div></div>
  <div class="stat"><div class="num">${stats.total_messages.toLocaleString()}</div><div class="lbl">Total Messages</div></div>
  <div class="stat"><div class="num">${stats.today_sessions.toLocaleString()}</div><div class="lbl">Today</div></div>
</div>

<div class="section">
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Session ID</th>
        <th>Started</th>
        <th>Duration</th>
        <th>Messages</th>
        <th>IP A</th>
        <th>IP B</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    ${sessions.length === 0 ? `<tr><td colspan="8" class="empty">No sessions yet</td></tr>` :
      sessions.map((s, i) => {
        const start = new Date(s.started_at);
        const durMs = s.ended_at ? s.ended_at - s.started_at : null;
        const dur = durMs ? `${Math.round(durMs/1000)}s` : '<span style="color:#f59e0b">live</span>';
        return `<tr>
          <td style="color:#444">${i+1}</td>
          <td style="font-family:monospace;font-size:11px;color:#555">${s.id.slice(0,16)}…</td>
          <td>${start.toLocaleDateString()} ${start.toLocaleTimeString()}</td>
          <td>${dur}</td>
          <td><span class="badge ${s.msg_count>0?'badge-green':'badge-gray'}">${s.msg_count}</span></td>
          <td style="font-size:11px;color:#555">${s.ip_a||'-'}</td>
          <td style="font-size:11px;color:#555">${s.is_bot ? '<span style="color:#a78bfa">bot</span>' : (s.ip_b||'-')}</td>
          <td><a href="/admin/chats/${s.id}">View →</a></td>
        </tr>`;
      }).join('')}
    </tbody>
  </table>
</div>
</body>
</html>`;
}

function renderSession(sessionId, messages) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Session — OmegleNew Admin</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0f0f0f;color:#e0e0e0;min-height:100vh}
  .topbar{background:#111;border-bottom:1px solid #222;padding:14px 28px;display:flex;align-items:center;gap:16px}
  .topbar a{color:#555;font-size:13px;text-decoration:none}
  .topbar a:hover{color:#e0e0e0}
  .topbar h1{font-size:14px;font-weight:600;color:#fff;font-family:monospace}
  .chat{max-width:680px;margin:32px auto;padding:0 24px}
  .msg{display:flex;gap:10px;margin-bottom:16px;align-items:flex-start}
  .msg.b{flex-direction:row-reverse}
  .bubble{padding:10px 14px;border-radius:14px;font-size:14px;line-height:1.5;max-width:75%;word-break:break-word}
  .msg.a .bubble{background:#1a2a3a;color:#90c8ff;border-radius:14px 14px 14px 4px}
  .msg.b .bubble{background:#1a2a1a;color:#90d490;border-radius:14px 14px 4px 14px}
  .msg.sys .bubble{background:#1a1a1a;color:#555;font-size:12px;font-style:italic;border-radius:8px}
  .msg.sys{justify-content:center}
  .time{font-size:10px;color:#444;margin-top:4px;white-space:nowrap}
  .label{font-size:10px;color:#444;margin-bottom:2px;text-transform:uppercase;letter-spacing:.06em}
  .empty{text-align:center;padding:60px;color:#444}
</style>
</head>
<body>
<div class="topbar">
  <a href="/admin">← Back</a>
  <h1>${sessionId}</h1>
</div>
<div class="chat">
  ${messages.length === 0
    ? '<div class="empty">No messages in this session</div>'
    : messages.map(m => {
        const t = new Date(m.sent_at).toLocaleTimeString();
        return `<div class="msg ${m.sender === messages[0].sender ? 'a' : 'b'}">
          <div>
            <div class="label">${m.sender === messages[0].sender ? 'User A' : 'User B'}</div>
            <div class="bubble">${escHtml(m.text)}</div>
            <div class="time">${t}</div>
          </div>
        </div>`;
      }).join('')}
</div>
</body>
</html>`;
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function renderLogin(error) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Admin Login</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0f0f0f;display:flex;align-items:center;justify-content:center;min-height:100vh}
  .card{background:#111;border:1px solid #222;border-radius:14px;padding:36px;width:320px}
  h1{font-size:18px;font-weight:600;color:#fff;margin-bottom:6px}
  p{font-size:13px;color:#555;margin-bottom:24px}
  input{width:100%;background:#0f0f0f;border:1px solid #2a2a2a;color:#e0e0e0;padding:10px 14px;border-radius:8px;font-size:14px;outline:none;margin-bottom:12px}
  input:focus{border-color:#444}
  button{width:100%;background:#1a6aff;color:#fff;border:none;padding:11px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer}
  button:hover{background:#1058d8}
  .err{color:#f87171;font-size:12px;margin-bottom:12px}
</style>
</head>
<body>
<div class="card">
  <h1>OmegleNew Admin</h1>
  <p>Enter your admin password to continue</p>
  ${error ? '<div class="err">Wrong password</div>' : ''}
  <form method="POST" action="/admin/login">
    <input type="password" name="password" placeholder="Admin password" autofocus/>
    <button type="submit">Login</button>
  </form>
</div>
</body>
</html>`;
}

module.exports = { renderDashboard, renderSession, renderLogin };
