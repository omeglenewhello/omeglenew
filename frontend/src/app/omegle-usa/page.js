import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';

export const metadata = {
  title: 'Omegle USA - Free American Stranger Chat Online | OmegleNew',
  description:
    'Omegle USA alternative — chat with strangers from the USA online for free. No sign up, no registration. Talk to Americans randomly, anonymously, instantly. Best US stranger chat site 2026.',
  keywords: [
    'omegle usa',
    'omegle america',
    'american stranger chat',
    'chat with strangers usa',
    'usa random chat',
    'omegle usa alternative',
    'us omegle',
    'american chat online',
    'random chat usa',
    'stranger chat usa',
    'chat with american people',
    'talk to strangers usa',
    'free chat usa no registration',
    'american random chat online',
    'chat with girls usa',
    'chat with boys usa',
    'online chat usa free',
    'meet americans online',
    'us anonymous chat',
    'sites like omegle usa',
  ],
  alternates: { canonical: 'https://omeglenew.com/omegle-usa' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Omegle USA - Free American Stranger Chat | OmegleNew',
    description: 'Chat with strangers from the USA for free. No sign up. The best US Omegle alternative — anonymous, instant, safe.',
    url: 'https://omeglenew.com/omegle-usa',
  },
};

const schemaArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Omegle USA — Free Anonymous Chat with American Strangers Online',
  description: 'Chat with American strangers online for free. No sign up required. The best Omegle USA alternative in 2026.',
  url: 'https://omeglenew.com/omegle-usa',
  datePublished: '2026-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  author: { '@type': 'Organization', name: 'OmegleNew' },
  publisher: { '@type': 'Organization', name: 'OmegleNew' },
  inLanguage: 'en-US',
};

export default function OmegleUSAPage() {
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
              USA · Free · Anonymous
            </p>
            <h1
              className="font-bold text-white mb-5"
              style={{ fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.07, letterSpacing: '-0.022em' }}
            >
              Omegle USA —
              <br />
              <span style={{
                backgroundImage: 'linear-gradient(135deg, #0071e3 0%, #b042ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Chat with Americans Free
              </span>
            </h1>
            <p className="text-white/60 text-[18px] leading-relaxed mb-8 max-w-[520px] mx-auto">
              The best Omegle USA alternative. Chat with random American strangers online — no sign up, completely free, anonymous.
            </p>
            <CTAButton>Start Chatting with Americans — Free</CTAButton>
          </div>
        </section>

        {/* Article */}
        <article className="max-w-[760px] mx-auto px-5 py-20">

          <h2 className="text-[28px] font-bold text-[#1d1d1f] mb-4" style={{ letterSpacing: '-0.018em' }}>
            Omegle USA — Why Americans Are Looking for an Alternative
          </h2>
          <p className="text-[#6e6e73] text-[17px] leading-relaxed mb-6">
            The United States was the #1 market for Omegle globally. Millions of Americans used Omegle to chat with strangers, practice conversations, make new friends, and pass the time. When Omegle shut down in November 2023, American users were left searching for the best <strong>Omegle USA alternative</strong>.
          </p>
          <p className="text-[#6e6e73] text-[17px] leading-relaxed mb-10">
            <strong>OmegleNew</strong> is the answer. It works perfectly in the USA, connects you with random strangers from America and worldwide, and is 100% free with no registration required.
          </p>

          <h2 className="text-[28px] font-bold text-[#1d1d1f] mb-4" style={{ letterSpacing: '-0.018em' }}>
            Why OmegleNew is the Best Omegle USA Alternative
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
            How to Chat with American Strangers on OmegleNew
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
            Frequently Asked Questions — Omegle USA
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
              Start Chatting with American Strangers Now
            </h2>
            <p className="text-white/60 text-[16px] mb-6">Free. No sign up. Works on mobile. Instant.</p>
            <CTAButton>Try OmegleNew USA — Free</CTAButton>
          </div>
        </article>

        {/* Internal links */}
        <nav className="max-w-[760px] mx-auto px-5 pb-16" aria-label="Related pages">
          <p className="text-[13px] text-[#86868b] font-semibold uppercase tracking-widest mb-3">Related</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="text-[#0071e3] text-[14px] hover:underline">← Back to OmegleNew</Link>
            <Link href="/omegle-alternative" className="text-[#0071e3] text-[14px] hover:underline">Best Omegle Alternative</Link>
            <Link href="/omegle-india" className="text-[#0071e3] text-[14px] hover:underline">Omegle India</Link>
            <Link href="/omegle-uk" className="text-[#0071e3] text-[14px] hover:underline">Omegle UK</Link>
            <Link href="/guidelines" className="text-[#0071e3] text-[14px] hover:underline">Community Guidelines</Link>
          </div>
        </nav>
      </main>
      <Footer />
    </>
  );
}

const FEATURES = [
  { icon: '🇺🇸', title: 'Works in the USA', desc: 'Fully accessible across all US states. Fast servers, no VPN needed, works on all major US ISPs and mobile carriers.' },
  { icon: '📱', title: 'Mobile First', desc: 'Designed for iPhone and Android. Works perfectly in Safari and Chrome — no app download needed.' },
  { icon: '🔒', title: 'Anonymous & Safe', desc: 'No name, no phone number, no registration. Just open and chat. Your privacy is fully protected.' },
  { icon: '⚡', title: 'Instant Connection', desc: 'Connect with a stranger in under 1 second. No waiting, no loading screens.' },
  { icon: '🎯', title: 'Interest Matching', desc: 'Add interests like Sports, Music, or Gaming to meet Americans who share your hobbies.' },
  { icon: '💬', title: 'Text Only — No Camera', desc: 'No camera pressure. Pure text chat — comfortable, easy, and private.' },
];

const STEPS = [
  { title: 'Open OmegleNew on your phone or laptop', desc: 'Go to omeglenew.com in any browser. No app, no download required.' },
  { title: 'Add interests (optional)', desc: 'Try "Sports", "Music", "Movies", or your state to connect with Americans near you.' },
  { title: 'Click Start Chatting', desc: 'You\'ll be instantly connected with a random stranger.' },
  { title: 'Chat freely — Next if needed', desc: 'Have fun chatting. Not vibing? Click Next to find someone new instantly.' },
];

const FAQ = [
  {
    q: 'Is there an Omegle USA version?',
    a: 'The original Omegle did not have a specific USA version. OmegleNew is the best Omegle USA alternative — it is available to all American users, works on all networks, and is completely free.',
  },
  {
    q: 'Can I chat with American strangers on OmegleNew?',
    a: 'Yes. OmegleNew connects you with strangers from the USA and around the world. You can add interests to increase the chances of matching with American users.',
  },
  {
    q: 'Is OmegleNew free to use in the USA?',
    a: 'Yes, OmegleNew is 100% free for all US users. No subscription, no premium plan, no hidden charges.',
  },
  {
    q: 'Is random stranger chat legal in the USA?',
    a: 'Yes, anonymous text chat with strangers is legal in the United States. OmegleNew complies with US safety standards and has a zero tolerance policy for illegal content. Always follow our community guidelines.',
  },
  {
    q: 'What happened to Omegle in the USA?',
    a: 'Omegle shut down globally in November 2023 due to legal and safety concerns. OmegleNew was created as the modern, safer replacement — carrying on the spirit of random stranger chat with better moderation and features.',
  },
  {
    q: 'Does OmegleNew work on American mobile networks?',
    a: 'Yes. OmegleNew works on all major US carriers including Verizon, AT&T, T-Mobile, and all Wi-Fi connections across the country.',
  },
];
