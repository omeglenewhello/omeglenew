import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';

export const metadata = {
  title: 'Best Omegle Alternative 2026 - Free Random Chat | OmegleNew',
  description:
    'Looking for the best Omegle alternative in 2026? OmegleNew lets you chat with strangers free, anonymous, no sign up. Better than Omegle — safer, faster, mobile-friendly.',
  keywords: [
    'best omegle alternative',
    'omegle alternative 2026',
    'sites like omegle',
    'omegle replacement',
    'free omegle alternative',
    'omegle alternative no sign up',
    'chat with strangers like omegle',
    'omegle shut down alternative',
    'omegle alternative india',
    'random chat websites like omegle',
    'chat websites like omegle free',
    'omegle alternative no registration',
    'top omegle alternatives',
    'omegle alternatives for text chat',
  ],
  alternates: { canonical: 'https://omeglenew.com/omegle-alternative' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Best Omegle Alternative 2026 - Free Random Chat | OmegleNew',
    description: 'The best free Omegle alternative. Chat with strangers anonymously — no sign up needed. Safer, faster, and better than Omegle.',
    url: 'https://omeglenew.com/omegle-alternative',
  },
};

const schemaArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best Omegle Alternative in 2026 — Free Anonymous Stranger Chat',
  description: 'OmegleNew is the best free Omegle alternative. Chat with strangers anonymously with no sign up required.',
  url: 'https://omeglenew.com/omegle-alternative',
  datePublished: '2026-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  author: { '@type': 'Organization', name: 'OmegleNew' },
  publisher: { '@type': 'Organization', name: 'OmegleNew' },
};

export default function OmegleAlternativePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }}
      />
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="bg-[#000] text-white text-center px-5 py-24">
          <div className="max-w-[700px] mx-auto">
            <p className="text-apple-blue text-[13px] font-semibold tracking-widest uppercase mb-4">
              Omegle Replacement
            </p>
            <h1
              className="font-bold text-white mb-5"
              style={{ fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.07, letterSpacing: '-0.022em' }}
            >
              The Best Omegle Alternative in 2026
            </h1>
            <p className="text-white/60 text-[18px] leading-relaxed mb-8 max-w-[520px] mx-auto">
              OmegleNew is the #1 free Omegle alternative — chat with strangers anonymously, no sign up, no camera required.
            </p>
            <CTAButton>Start Chatting Free — No Sign Up</CTAButton>
          </div>
        </section>

        {/* Article body */}
        <article className="max-w-[760px] mx-auto px-5 py-20 prose-article">

          <h2 className="text-[28px] font-bold text-[#1d1d1f] mb-4" style={{ letterSpacing: '-0.018em' }}>
            Why People Are Looking for Omegle Alternatives
          </h2>
          <p className="text-[#6e6e73] text-[17px] leading-relaxed mb-6">
            Omegle — the original random chat website — shut down in November 2023 after over 14 years. Millions of users were left searching for a reliable <strong>Omegle alternative</strong> that offered the same anonymous, random chat experience. OmegleNew was built to fill exactly that gap.
          </p>
          <p className="text-[#6e6e73] text-[17px] leading-relaxed mb-10">
            Whether you want to <strong>talk to strangers online</strong>, practice a new language, make new friends, or just have a random conversation — OmegleNew gives you the best experience available in 2026.
          </p>

          <h2 className="text-[28px] font-bold text-[#1d1d1f] mb-4" style={{ letterSpacing: '-0.018em' }}>
            What Makes OmegleNew the Best Omegle Alternative?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {COMPARISON.map((item) => (
              <div key={item.title} className="border border-[#d2d2d7] rounded-2xl p-5">
                <p className="text-2xl mb-2" aria-hidden="true">{item.icon}</p>
                <h3 className="font-semibold text-[#1d1d1f] text-[16px] mb-1">{item.title}</h3>
                <p className="text-[#6e6e73] text-[14px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-[28px] font-bold text-[#1d1d1f] mb-4" style={{ letterSpacing: '-0.018em' }}>
            OmegleNew vs Omegle: Key Differences
          </h2>
          <div className="overflow-x-auto mb-10">
            <table className="w-full border-collapse text-[15px]">
              <thead>
                <tr className="bg-[#f5f5f7]">
                  <th className="text-left p-4 font-semibold text-[#1d1d1f] border border-[#d2d2d7]">Feature</th>
                  <th className="text-center p-4 font-semibold text-[#1d1d1f] border border-[#d2d2d7]">Omegle</th>
                  <th className="text-center p-4 font-semibold text-[#0071e3] border border-[#d2d2d7]">OmegleNew ✓</th>
                </tr>
              </thead>
              <tbody>
                {TABLE.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f5f5f7]'}>
                    <td className="p-4 text-[#1d1d1f] border border-[#d2d2d7] font-medium">{row.feature}</td>
                    <td className="p-4 text-center text-[#6e6e73] border border-[#d2d2d7]">{row.omegle}</td>
                    <td className="p-4 text-center text-[#0071e3] font-semibold border border-[#d2d2d7]">{row.ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-[28px] font-bold text-[#1d1d1f] mb-4" style={{ letterSpacing: '-0.018em' }}>
            How to Use OmegleNew — The #1 Free Stranger Chat
          </h2>
          <ol className="space-y-4 mb-10">
            {HOW_TO.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-[#0071e3] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-[#1d1d1f] text-[16px]">{step.title}</p>
                  <p className="text-[#6e6e73] text-[14px] leading-relaxed mt-1">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="text-[28px] font-bold text-[#1d1d1f] mb-4" style={{ letterSpacing: '-0.018em' }}>
            Is OmegleNew Safe? Our Safety Commitment
          </h2>
          <p className="text-[#6e6e73] text-[17px] leading-relaxed mb-4">
            Safety is our top priority. OmegleNew has built-in protections that Omegle never had:
          </p>
          <ul className="space-y-2 mb-10 text-[#6e6e73] text-[15px]">
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span> Zero tolerance policy for harassment and abuse</li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span> One-click user reporting system</li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span> Automatic message filtering for banned content</li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span> No chat history stored — messages disappear when session ends</li>
            <li className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span> Cooperation with law enforcement for illegal activity</li>
          </ul>

          <h2 className="text-[28px] font-bold text-[#1d1d1f] mb-4" style={{ letterSpacing: '-0.018em' }}>
            Frequently Asked Questions About Omegle Alternatives
          </h2>
          <div className="space-y-6 mb-10">
            {FAQ.map((item) => (
              <div key={item.q}>
                <h3 className="font-semibold text-[#1d1d1f] text-[17px] mb-2">{item.q}</h3>
                <p className="text-[#6e6e73] text-[15px] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#000] rounded-2xl p-10 text-center">
            <h2 className="font-bold text-white text-[28px] mb-3" style={{ letterSpacing: '-0.018em' }}>
              Try the Best Omegle Alternative Now
            </h2>
            <p className="text-white/60 text-[16px] mb-6">Free. Anonymous. No sign up. Instant.</p>
            <CTAButton>Start Chatting with Strangers</CTAButton>
          </div>
        </article>

        {/* Internal links for SEO */}
        <nav className="max-w-[760px] mx-auto px-5 pb-16" aria-label="Related pages">
          <p className="text-[13px] text-[#86868b] font-semibold uppercase tracking-widest mb-3">Related</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="text-[#0071e3] text-[14px] hover:underline">← Back to OmegleNew</Link>
            <Link href="/guidelines" className="text-[#0071e3] text-[14px] hover:underline">Community Guidelines</Link>
            <Link href="/terms" className="text-[#0071e3] text-[14px] hover:underline">Terms of Service</Link>
            <Link href="/privacy" className="text-[#0071e3] text-[14px] hover:underline">Privacy Policy</Link>
          </div>
        </nav>
      </main>
      <Footer />
    </>
  );
}

const COMPARISON = [
  { icon: '⚡', title: 'Instant Connection', desc: 'Matched with a stranger in under 1 second. No loading, no waiting.' },
  { icon: '🔒', title: 'Fully Anonymous', desc: 'No account, no email, no name. Your identity is never revealed.' },
  { icon: '🎯', title: 'Interest Matching', desc: 'Add interests like Gaming or Music to find strangers you\'ll actually click with.' },
  { icon: '📱', title: 'Mobile Optimized', desc: 'Works perfectly on any phone, tablet, or desktop browser.' },
  { icon: '🛡️', title: 'Safer by Design', desc: 'Built-in content filter, report system, and zero-tolerance moderation.' },
  { icon: '💬', title: 'No Camera Required', desc: 'Text-only chat — no camera pressure, no video awkwardness.' },
];

const TABLE = [
  { feature: 'Still Online',          omegle: '❌ Shut Down',      ours: '✅ Yes' },
  { feature: 'Free to Use',           omegle: 'Was free',          ours: '✅ Always Free' },
  { feature: 'No Sign Up',            omegle: '✅ Yes',            ours: '✅ Yes' },
  { feature: 'Interest Matching',     omegle: 'Basic',             ours: '✅ Advanced' },
  { feature: 'Mobile Friendly',       omegle: '❌ Poor',           ours: '✅ Optimized' },
  { feature: 'Content Moderation',    omegle: '❌ Minimal',        ours: '✅ Active 24/7' },
  { feature: 'Message Filter',        omegle: '❌ No',             ours: '✅ Yes' },
  { feature: 'Report System',         omegle: 'Basic',             ours: '✅ One-Click' },
  { feature: 'Chat History Stored',   omegle: 'Unknown',           ours: '✅ Never Stored' },
];

const HOW_TO = [
  { title: 'Visit OmegleNew.com', desc: 'Open omeglenew.com in any browser — no download or app required.' },
  { title: 'Add Interests (Optional)', desc: 'Select topics like Gaming, Music, or Travel to find better matches.' },
  { title: 'Click "Start Chatting"', desc: 'You\'ll be instantly connected with a random stranger anywhere in the world.' },
  { title: 'Chat Freely', desc: 'Type your messages. Click "Next" anytime to find a new person. Click "Stop" to end.' },
];

const FAQ = [
  {
    q: 'Is OmegleNew the same as Omegle?',
    a: 'OmegleNew is not affiliated with the original Omegle. We are an independent platform built as a modern Omegle alternative with better safety features, interest matching, and a mobile-friendly design.',
  },
  {
    q: 'Why did Omegle shut down?',
    a: 'Omegle shut down in November 2023 due to legal and safety concerns. OmegleNew was built to provide a safer, better-moderated alternative for people who loved the concept of random stranger chat.',
  },
  {
    q: 'What is the best free Omegle alternative in 2026?',
    a: 'OmegleNew is widely considered the best free Omegle alternative in 2026. It offers instant anonymous text chat with strangers, no sign up, interest-based matching, and active moderation — all for free.',
  },
  {
    q: 'Can I use OmegleNew without a camera?',
    a: 'Yes! OmegleNew is a text-only platform. No camera, no microphone, no video is required. Just type and chat.',
  },
  {
    q: 'Is there a mobile app for OmegleNew?',
    a: 'OmegleNew works perfectly in your mobile browser — no app download required. It is fully optimized for iPhone and Android.',
  },
];
