import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[980px] mx-auto px-5 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center group"
          aria-label="OmegleNew home"
        >
          <Image
            src="/logo-cropped.png"
            alt="OmegleNew"
            width={280}
            height={80}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Nav */}
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-0.5 text-[13px] text-gray-600">
            <li>
              <Link
                href="/guidelines"
                className="px-3 py-1.5 rounded-lg hover:text-gray-900 transition-colors"
              >
                Guidelines
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="px-3 py-1.5 rounded-lg hover:text-gray-900 transition-colors"
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="px-3 py-1.5 rounded-lg hover:text-gray-900 transition-colors"
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
