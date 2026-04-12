import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatOverlay from '@/components/ChatOverlay';
import AdBanner from '@/components/AdBanner';
import CTAButton from '@/components/CTAButton';
import OnlineCounter from '@/components/OnlineCounter';

export default function Home() {
  return (
    <>
      <Header />

      <main id="main-content">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="apple-hero min-h-[92vh] flex flex-col items-center justify-center text-center px-5 py-24 relative overflow-hidden" aria-label="Hero">

          {/* Very subtle radial glow — barely visible, premium */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(100,80,255,0.12) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-[700px] mx-auto">
            <OnlineCounter />

            {/* Eyebrow */}
            <p className="text-[15px] font-semibold tracking-widest uppercase text-apple-blue mb-5 letter-spacing-wider">
              Free · Anonymous · Instant
            </p>

            {/* Main headline */}
            <h1 className="font-bold tracking-tighter text-white mb-6"
              style={{ fontSize: 'clamp(44px, 7vw, 80px)', lineHeight: 1.05, letterSpacing: '-0.022em' }}
            >
              Meet strangers.
              <br />
              <span className="hero-accent-text">Chat freely.</span>
            </h1>

            {/* Sub */}
            <p className="text-[19px] sm:text-[21px] text-white/50 font-normal leading-relaxed mb-10 max-w-[520px] mx-auto"
              style={{ letterSpacing: '-0.01em' }}>
              The best <span className="text-white/80">Omegle alternative</span> — connect with a random stranger in seconds. No sign up. No camera. No hassle.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ChatOverlay />
              <a
                href="#how-it-works"
                className="btn-apple-ghost text-[17px]"
              >
                How it works
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom fade to next section */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, #000 90%)' }}
            aria-hidden="true"
          />
        </section>

        {/* ── AD BANNER ────────────────────────────────────────────────────── */}
        <div className="bg-[#000] px-5 pb-10">
          <div className="max-w-[980px] mx-auto">
            <AdBanner slot="TOP_BANNER_SLOT_ID" format="horizontal" className="w-full opacity-60" />
          </div>
        </div>

        {/* ── TAGLINE STRIP ─────────────────────────────────────────────────── */}
        <div className="bg-[#f5f5f7] py-20 text-center px-5">
          <p
            className="font-semibold text-apple-black max-w-[700px] mx-auto"
            style={{ fontSize: 'clamp(24px, 4vw, 40px)', lineHeight: 1.1, letterSpacing: '-0.018em' }}
          >
            Real conversations. Real people.{' '}
            <span className="text-apple-gray">Zero judgement.</span>
          </p>
        </div>

        {/* ── BENTO FEATURES ───────────────────────────────────────────────── */}
        <section id="features" className="bg-[#f5f5f7] py-6 px-5 pb-20" aria-labelledby="features-heading">
          <div className="max-w-[980px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {BENTO.map((card) => (
                <div
                  key={card.title}
                  className="bento-card flex flex-col"
                  style={{ minHeight: 220 }}
                >
                  <span className="text-4xl mb-5" aria-hidden="true">{card.icon}</span>
                  <h3 className="text-white font-semibold text-[19px] mb-2" style={{ letterSpacing: '-0.015em' }}>
                    {card.title}
                  </h3>
                  <p className="text-white/50 text-[15px] leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
        <section id="how-it-works" className="bg-white py-28 px-5" aria-labelledby="hiw-heading">
          <div className="max-w-[700px] mx-auto text-center">
            <p className="text-apple-blue text-[13px] font-semibold tracking-widest uppercase mb-4">Simple by design</p>
            <h2
              id="hiw-heading"
              className="font-bold text-apple-black mb-4"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.08, letterSpacing: '-0.022em' }}
            >
              Three steps to connect.
            </h2>
            <p className="text-apple-gray text-[19px] leading-relaxed mb-20" style={{ letterSpacing: '-0.01em' }}>
              No registration, no camera — just click and talk.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
              {STEPS.map((step, i) => (
                <div key={step.title} className="flex flex-col items-center text-center">
                  <div
                    className="w-12 h-12 rounded-2xl bg-apple-black flex items-center justify-center text-white font-bold text-[18px] mb-5"
                    style={{ letterSpacing: '-0.02em' }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                  <h3 className="text-apple-black font-semibold text-[17px] mb-2">{step.title}</h3>
                  <p className="text-apple-gray text-[15px] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DIVIDER ───────────────────────────────────────────────────────── */}
        <div className="section-divider" />

        {/* ── SAFETY ────────────────────────────────────────────────────────── */}
        <section id="safety" className="bg-white py-28 px-5" aria-labelledby="safety-heading">
          <div className="max-w-[980px] mx-auto">
            <div className="text-center mb-16">
              <p className="text-apple-blue text-[13px] font-semibold tracking-widest uppercase mb-4">Built responsibly</p>
              <h2
                id="safety-heading"
                className="font-bold text-apple-black"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.08, letterSpacing: '-0.022em' }}
              >
                Your safety is not optional.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#d2d2d7] rounded-2xl overflow-hidden">
              {SAFETY.map((item) => (
                <div key={item.title} className="bg-white p-10">
                  <div className="text-3xl mb-4" aria-hidden="true">{item.icon}</div>
                  <h3 className="text-apple-black font-semibold text-[19px] mb-2">{item.title}</h3>
                  <p className="text-apple-gray text-[15px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AD BANNER (mid) ───────────────────────────────────────────────── */}
        <div className="bg-[#f5f5f7] py-8 px-5">
          <div className="max-w-[980px] mx-auto">
            <AdBanner slot="MIDDLE_BANNER_SLOT_ID" format="rectangle" className="w-full" />
          </div>
        </div>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section id="faq" className="bg-[#f5f5f7] py-28 px-5" aria-labelledby="faq-heading">
          <div className="max-w-[700px] mx-auto">
            <div className="text-center mb-14">
              <p className="text-apple-blue text-[13px] font-semibold tracking-widest uppercase mb-4">FAQ</p>
              <h2
                id="faq-heading"
                className="font-bold text-apple-black"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.08, letterSpacing: '-0.022em' }}
              >
                Questions? Answered.
              </h2>
            </div>

            <div className="divide-y divide-[#d2d2d7]">
              {FAQS.map((faq) => (
                <details key={faq.q} className="group py-5">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="text-apple-black font-semibold text-[17px] pr-6" style={{ letterSpacing: '-0.01em' }}>
                      {faq.q}
                    </span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#d2d2d7] flex items-center justify-center transition-transform group-open:rotate-45">
                      <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
                        <path d="M6 2v8M2 6h8" stroke="#1d1d1f" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-apple-gray text-[15px] leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
        <section className="apple-hero py-32 px-5 text-center relative overflow-hidden" aria-label="Call to action">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(0,113,227,0.15) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-[600px] mx-auto">
            <h2
              className="font-bold text-white mb-5"
              style={{ fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: 1.07, letterSpacing: '-0.022em' }}
            >
              Ready to meet someone new?
            </h2>
            <p className="text-white/50 text-[19px] mb-10 leading-relaxed" style={{ letterSpacing: '-0.01em' }}>
              Join thousands of people having real conversations right now.
            </p>
            <CTAButton>Start Chatting for Free</CTAButton>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const BENTO = [
  {
    icon: '🎭',
    title: 'Fully Anonymous',
    desc: 'No account, no email, no personal info. You are just a stranger — and so are they.',
  },
  {
    icon: '⚡',
    title: 'Instant Matching',
    desc: 'Connected in seconds. Add interests to find people who actually get you.',
  },
  {
    icon: '🔒',
    title: 'Private by Default',
    desc: 'Messages are never stored. Once the chat ends, it\'s gone. No logs, no trace.',
  },
  {
    icon: '🎯',
    title: 'Interest Matching',
    desc: 'Add topics like Gaming, Music, or Travel — we\'ll pair you with someone similar.',
  },
  {
    icon: '📱',
    title: 'Any Device',
    desc: 'Designed for mobile-first. Feels perfect on your phone, tablet, or laptop.',
  },
  {
    icon: '🛡️',
    title: 'Report & Block',
    desc: 'One-click reporting. Bad actors are removed. Our moderation works 24/7.',
  },
];

const STEPS = [
  {
    title: 'Open & Click',
    desc: 'Hit "Start Chatting" — no sign up, no forms. Optionally pick your interests.',
  },
  {
    title: 'Get Matched',
    desc: 'Our system pairs you with a stranger instantly. Interest-based if you want.',
  },
  {
    title: 'Talk Freely',
    desc: 'Chat anonymously. Click Next any time to meet someone new.',
  },
];

const SAFETY = [
  {
    icon: '🚫',
    title: 'Zero Tolerance',
    desc: 'Harassment, hate speech, and explicit content result in immediate removal. No warnings for serious violations.',
  },
  {
    icon: '🚨',
    title: 'One-Click Reporting',
    desc: 'See something wrong? Report it instantly. Our team reviews every report around the clock.',
  },
  {
    icon: '🔐',
    title: 'No Data Stored',
    desc: 'Chat messages are never logged on our servers. Complete privacy is built into the architecture.',
  },
  {
    icon: '👮',
    title: 'Law Enforcement',
    desc: 'We cooperate fully with law enforcement for any illegal activity. No exceptions.',
  },
];

const FAQS = [
  {
    q: 'What is OmegleNew?',
    a: 'OmegleNew is a free, anonymous text chat platform where you can connect with random strangers instantly. No registration required — just click and chat.',
  },
  {
    q: 'Is OmegleNew a good Omegle alternative?',
    a: 'Yes. OmegleNew is built as a modern, cleaner Omegle alternative with better safety measures, interest-based matching, and a smoother experience on all devices.',
  },
  {
    q: 'Is it completely free?',
    a: 'Yes — always. No subscriptions, no premium tiers, no hidden fees. OmegleNew is 100% free.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. There is no sign up, no email required, no registration of any kind. Just open the site and start chatting.',
  },
  {
    q: 'Is my chat private?',
    a: 'Yes. Messages are not stored on our servers. No personal information is required. Once a chat ends, it is gone.',
  },
  {
    q: 'Can I choose who I talk to?',
    a: 'You can add interests (Gaming, Music, Travel, etc.) and we\'ll try to match you with someone who shares them. If a match doesn\'t feel right, click Next instantly.',
  },
  {
    q: 'How does the report system work?',
    a: 'Every chat has a Report button. Select a reason, submit — and our moderation team handles it. Reports are anonymous and reviewed continuously.',
  },
];
