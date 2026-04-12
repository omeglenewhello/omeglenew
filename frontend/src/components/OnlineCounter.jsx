'use client';
import { useState, useEffect } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function OnlineCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    setCount(randomBetween(1200, 3800));

    async function tick() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/stats`);
        if (res.ok) {
          const data = await res.json();
          const real = (data.activeUsers || 0) + (data.waiting || 0);
          if (real >= 200) { setCount(real); return; }
        }
      } catch {}
      setCount((prev) => {
        const delta = randomBetween(-45, 45);
        return Math.max(1000, Math.min(4000, (prev ?? 2000) + delta));
      });
    }

    const id = setInterval(tick, 4000);
    return () => clearInterval(id);
  }, []);

  if (count === null) return <div className="h-5 mb-6" aria-hidden="true" />;

  return (
    <p className="text-[15px] text-white/40 font-normal mb-6 tracking-normal">
      <span className="inline-flex items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
        </span>
        {count.toLocaleString()}+ people chatting right now
      </span>
    </p>
  );
}
