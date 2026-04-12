import Link from 'next/link';

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'OmegleNew';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[rgba(0,0,0,0.72)] border-b border-white/10">
      <div className="max-w-[980px] mx-auto px-5 h-12 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="OmegleNew home"
        >
          {/* Chat bubble mark */}
          <svg
            viewBox="0 0 28 28"
            fill="none"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <rect width="28" height="28" rx="8" fill="white" fillOpacity="0.12" />
            <path
              d="M8 10.5C8 9.4 8.9 8.5 10 8.5h8c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2h-5l-3 2.5V16.5H10c-1.1 0-2-.9-2-2v-4z"
              fill="white"
            />
          </svg>
          <span className="text-white font-semibold text-[17px] tracking-tight">
            {SITE_NAME}
          </span>
        </Link>

        {/* Nav */}
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-0.5 text-[13px] text-white/70">
            <li>
              <Link
                href="/guidelines"
                className="px-3 py-1.5 rounded-lg hover:text-white transition-colors"
              >
                Guidelines
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="px-3 py-1.5 rounded-lg hover:text-white transition-colors"
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="px-3 py-1.5 rounded-lg hover:text-white transition-colors"
              >
                Privacy
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
