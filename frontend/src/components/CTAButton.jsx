'use client';

import { useRouter } from 'next/navigation';

export default function CTAButton({ children, className = '' }) {
  const router = useRouter();

  const handleClick = () => {
    const btn = document.getElementById('start-chat-btn');
    if (btn) btn.click();
    else router.push('/?start=1');
  };

  return (
    <button onClick={handleClick} className={`btn-apple-primary text-[17px] ${className}`}>
      {children}
      <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 ml-0.5" aria-hidden="true">
        <path d="M3.75 8a.75.75 0 0 1 .75-.75h5.19L8.22 5.78a.75.75 0 0 1 1.06-1.06l2.5 2.5a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 1 1-1.06-1.06l1.47-1.47H4.5A.75.75 0 0 1 3.75 8z"/>
      </svg>
    </button>
  );
}
