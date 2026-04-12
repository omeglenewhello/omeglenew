import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';

export const metadata = {
  title: 'Omegle India - Free Indian Stranger Chat Online | OmegleNew',
  description:
    'Omegle India alternative — chat with strangers from India online for free. No sign up, no registration. Talk to Indian boys and girls randomly. Best desi stranger chat site 2026.',
  keywords: [
    'omegle india',
    'indian stranger chat',
    'chat with strangers india',
    'india random chat',
    'omegle india alternative',
    'indian omegle',
    'desi chat online',
    'indian chat online',
    'random chat india',
    'stranger chat india',
    'chat with indian people',
    'talk to strangers india',
    'free chat india no registration',
    'indian random chat online',
    'chat with girls india',
    'chat with boys india',
    'ajnabee chat india',
    'online chat india free',
    'meet indians online',
    'indian anonymous chat',
  ],
  alternates: { canonical: 'https://omeglenew.com/omegle-india' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Omegle India - Free Indian Stranger Chat | OmegleNew',
    description: 'Chat with strangers from India for free. No sign up. The best Indian Omegle alternative — anonymous, instant, safe.',
    url: 'https://omeglenew.com/omegle-india',
  },
};

const schemaArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Omegle India — Free Anonymous Chat with Indian Strangers Online',
  description: 'Chat with Indian strangers online for free. No sign up required. The best Omegle India alternative in 2026.',
  url: 'https://omeglenew.com/omegle-india',
  datePublished: '2026-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  author: { '@type': 'Organization', name: 'OmegleNew' },
  publisher: { '@type': 'Organization', name: 'OmegleNew' },
  inLanguage: 'en-IN',
};

export default function OmegleIndiaPage() {
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
              India · Free · Anonymous
            </p>
            <h1
              className="font-bold text-white mb-5"
              style={{ fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.07, letterSpacing: '-0.022em' }}
            >
              Omegle India —
              <br />
              <span style={{
                backgroundImage: 'linear-gradient(135deg, #0071e3 0%, #b042ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Chat with Indians Free
              </span>
            </h1>
            <p className="text-white/60 text-[18px] leading-relaxed mb-8 max-w-[520px] mx-auto">
              The best Omegle India alternative. Chat with random Indian strangers online — no sign up, completely free, anonymous.
            </p>
            <CTAButton>Start Chatting with Indians — Free</CTAButton>
          </div>
        </section>

        {/* Article */}
        <article className="max-w-[760px] mx-auto px-5 py-20">

          <h2 className="text-[28px] font-bold text-[#1d1d1f] mb-4" style={{ letterSpacing: '-0.018em' }}>
            Omegle India — What Is It and Why Are Indians Looking for It?
          </h2>
          <p className="text-[#6e6e73] text-[17px] leading-relaxed mb-6">
            India is one of the largest markets for random stranger chat — second only to the USA. Millions of Indians search for <strong>Omegle India</strong>, <strong>desi chat</strong>, and <strong>Indian stranger chat</strong> every day. After Omegle shut down in 2023, Indian users have been searching for the best alternative that works in India.
          </p>
          <p className="text-[#6e6e73] text-[17px] leading-relaxed mb-10">
            <strong>OmegleNew</strong> is the answer. It works perfectly in India, connects you with random strangers from India and worldwide, and is 100% free with no registration required.
          </p>

          <h2 className="text-[28px] font-bold text-[#1d1d1f] mb-4" style={{ letterSpacing: '-0.018em' }}>
            Why OmegleNew is the Best Omegle India Alternative
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {FEATURES.map((f) => (
              <div key={f.title} className="border border-[#d2d2d7] rounded-2xl p-5">
                <p className="text-2xl mb-2" aria-hidden="true">{f.icon}</p>
                <h3 className="font-semibold text-[#1d1d1f] text-[16px] mb-1">{f.title}</h3>
                <p className="text-[#6e6e73] text-[14px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-[28px] font-bold text-[#1d1d1f] mb-4" style={{ letterSpacing: '-0.018em' }}>
            How to Chat with Indian Strangers on OmegleNew
          </h2>
          <ol className="space-y-4 mb-10">
            {STEPS.map((step, i) => (
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
            Frequently Asked Questions — Omegle India
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
              Start Chatting with Indian Strangers Now
            </h2>
            <p className="text-white/60 text-[16px] mb-6">Free. No sign up. Works on mobile. Instant.</p>
            <CTAButton>Try OmegleNew India — Free</CTAButton>
          </div>
        </article>

        {/* Internal links */}
        <nav className="max-w-[760px] mx-auto px-5 pb-16" aria-label="Related pages">
          <p className="text-[13px] text-[#86868b] font-semibold uppercase tracking-widest mb-3">Related</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="text-[#0071e3] text-[14px] hover:underline">← Back to OmegleNew</Link>
            <Link href="/omegle-alternative" className="text-[#0071e3] text-[14px] hover:underline">Best Omegle Alternative</Link>
            <Link href="/guidelines" className="text-[#0071e3] text-[14px] hover:underline">Community Guidelines</Link>
          </div>
        </nav>
      </main>
      <Footer />
    </>
  );
}

const FEATURES = [
  { icon: '🇮🇳', title: 'Works in India', desc: 'Fully accessible in India. Fast servers, no VPN needed, works on Jio, Airtel, Vi, and all ISPs.' },
  { icon: '📱', title: 'Mobile First', desc: 'Designed for Android and iPhone. Works perfectly in Chrome and Safari — no app download needed.' },
  { icon: '🔒', title: 'Anonymous & Safe', desc: 'No name, no phone number, no registration. Just open and chat. Your privacy is protected.' },
  { icon: '⚡', title: 'Instant Connection', desc: 'Connect with a stranger in under 1 second. No waiting, no loading screens.' },
  { icon: '🎯', title: 'Interest Matching', desc: 'Add interests like Bollywood, Cricket, or Gaming to meet Indians who share your hobbies.' },
  { icon: '💬', title: 'Text Only — No Camera', desc: 'No camera pressure. Pure text chat — comfortable, easy, and private.' },
];

const STEPS = [
  { title: 'Open OmegleNew on your phone or laptop', desc: 'Go to omeglenew.com in any browser. No app, no download required.' },
  { title: 'Add interests (optional)', desc: 'Try adding "Bollywood", "Cricket", "India", or your city to connect with Indians near you.' },
  { title: 'Click Start Chatting', desc: 'You\'ll be instantly connected with a random stranger.' },
  { title: 'Chat freely — Next if needed', desc: 'Have fun chatting. Not vibing? Click Next to find someone new instantly.' },
];

const FAQ = [
  {
    q: 'Is there an Omegle India version?',
    a: 'The original Omegle did not have a specific India version. OmegleNew serves as the best Omegle India alternative — it is available to all Indian users, works on all networks, and is completely free.',
  },
  {
    q: 'Can I chat with Indian strangers on OmegleNew?',
    a: 'Yes. OmegleNew connects you with strangers from India and around the world. You can add interests like "India" or regional topics to increase the chances of matching with Indian users.',
  },
  {
    q: 'Is OmegleNew free to use in India?',
    a: 'Yes, OmegleNew is 100% free for all Indian users. No subscription, no premium plan, no hidden charges.',
  },
  {
    q: 'Does OmegleNew work on Jio and Airtel networks in India?',
    a: 'Yes. OmegleNew works on all major Indian internet networks including Jio, Airtel, Vi (Vodafone Idea), BSNL, and all mobile data connections.',
  },
  {
    q: 'Is there a desi or Hindi chat option?',
    a: 'OmegleNew is a text-based platform — you can type in any language including Hindi, Hinglish, Tamil, Bengali, or any other Indian language. Just start typing in your preferred language.',
  },
  {
    q: 'Is random stranger chat legal in India?',
    a: 'Yes, anonymous text chat with strangers is legal in India. OmegleNew complies with safety standards and has a zero tolerance policy for illegal content. Always follow our community guidelines.',
  },
];
