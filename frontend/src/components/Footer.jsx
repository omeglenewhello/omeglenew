import Link from 'next/link';

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'OmegleNew';
const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[#000] text-white/40">
      <div className="max-w-[980px] mx-auto px-5 pt-12 pb-8">

        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10 text-[13px]">
          <div>
            <p className="text-white/60 font-semibold mb-3">OmegleNew</p>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white/70 transition-colors">Home</Link></li>
              <li><Link href="/omegle-alternative" className="hover:text-white/70 transition-colors">Omegle Alternative</Link></li>
              <li><a href="#how-it-works" className="hover:text-white/70 transition-colors">How it Works</a></li>
              <li><a href="#faq" className="hover:text-white/70 transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <p className="text-white/60 font-semibold mb-3">Legal</p>
            <ul className="space-y-2">
              <li><Link href="/terms" className="hover:text-white/70 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/guidelines" className="hover:text-white/70 transition-colors">Community Guidelines</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-white/60 font-semibold mb-3">Safety</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5"><span className="text-green-400 text-xs">●</span> Anonymous</li>
              <li className="flex items-center gap-1.5"><span className="text-green-400 text-xs">●</span> No Data Stored</li>
              <li className="flex items-center gap-1.5"><span className="text-green-400 text-xs">●</span> 24/7 Moderation</li>
              <li className="flex items-center gap-1.5"><span className="text-green-400 text-xs">●</span> Report System</li>
            </ul>
          </div>
          <div>
            <p className="text-white/60 font-semibold mb-3">Alternatives</p>
            <ul className="space-y-2 text-[12px]">
              <li>Omegle alternative</li>
              <li>Random chat online</li>
              <li>Anonymous chat</li>
              <li>Talk to strangers</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[12px]">
            <p>Copyright © {year} {SITE_NAME}. All rights reserved.</p>
            <p className="text-white/25 max-w-sm text-right">
              By using {SITE_NAME} you confirm you are 18 or older and agree to our{' '}
              <Link href="/terms" className="underline hover:text-white/50">Terms</Link> and{' '}
              <Link href="/guidelines" className="underline hover:text-white/50">Community Guidelines</Link>.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
