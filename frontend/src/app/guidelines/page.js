import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Community Guidelines - OmegleNew | Safe Stranger Chat',
  description: 'OmegleNew Community Guidelines. Rules for safe, respectful chat with strangers on our free Omegle alternative. Zero tolerance for abuse.',
  alternates: { canonical: 'https://omeglenew.com/guidelines' },
  robots: { index: true, follow: true },
};

const DO_LIST = [
  'Treat every stranger with basic respect and dignity',
  'Keep conversations fun, interesting, and friendly',
  'Use the Report button if you encounter anyone violating the rules',
  'Click "Next" to move on if you feel uncomfortable',
  'Keep your personal safety in mind — never share sensitive information',
];

const DONT_LIST = [
  'Harassment, bullying, or threatening behavior of any kind',
  'Hate speech, racism, sexism, or discrimination',
  'Nudity, sexual acts, or sexually explicit content or language',
  'Soliciting personal information (phone number, address, social media)',
  'Spam, advertising, or promoting external services',
  'Sharing or requesting illegal content of any kind',
  'Violence, self-harm references, or encouraging dangerous behavior',
  'Using fake identities or impersonating others',
  'Accessing the platform if you are under 18 years old',
];

const ENFORCEMENT = [
  {
    step: 'Warning',
    color: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    icon: '⚠️',
    desc: 'First minor violation triggers an immediate warning.',
  },
  {
    step: '24-Hour Ban',
    color: 'bg-orange-100 border-orange-300 text-orange-800',
    icon: '🚫',
    desc: 'Repeated violations result in a 24-hour suspension. Three strikes apply.',
  },
  {
    step: 'Permanent Ban',
    color: 'bg-red-100 border-red-300 text-red-800',
    icon: '🔴',
    desc: 'Severe violations (nudity, minors, extreme harassment) = permanent removal.',
  },
  {
    step: 'Legal Action',
    color: 'bg-gray-100 border-gray-300 text-gray-800',
    icon: '👮',
    desc: 'Criminal activity is reported to law enforcement without prior notice.',
  },
];

export default function GuidelinesPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="text-brand-600 hover:text-brand-700 text-sm font-medium flex items-center gap-1 mb-4">
            ← Back to OmegleNew
          </Link>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Community Guidelines</h1>
          <p className="text-gray-500 text-sm">Last updated: January 2026</p>
        </div>

        <p className="text-gray-600 leading-relaxed mb-8">
          OmegleNew is a place for real, meaningful conversations between adults. These guidelines
          exist to keep the platform safe, respectful, and enjoyable for everyone. Violations are
          taken seriously and result in swift action.
        </p>

        {/* Do's */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-green-500">✓</span> What You Should Do
          </h2>
          <ul className="space-y-3">
            {DO_LIST.map((item) => (
              <li key={item} className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-4">
                <span className="text-green-500 font-bold mt-0.5">✓</span>
                <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Don'ts */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-red-500">✗</span> What is Strictly Prohibited
          </h2>
          <ul className="space-y-3">
            {DONT_LIST.map((item) => (
              <li key={item} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
                <span className="text-red-500 font-bold mt-0.5">✗</span>
                <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Age Policy */}
        <section className="mb-8 bg-red-900 text-white rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-2">🔞 Strictly 18+ Only</h2>
          <p className="text-red-100 text-sm leading-relaxed">
            OmegleNew is an adults-only platform. Users under 18 are strictly prohibited. If you
            encounter a user who appears to be a minor, report them immediately. We take child
            safety extremely seriously and cooperate fully with law enforcement on any cases involving
            minors.
          </p>
        </section>

        {/* Enforcement */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Enforcement</h2>
          <div className="space-y-3">
            {ENFORCEMENT.map((item) => (
              <div key={item.step} className={`flex items-start gap-4 border rounded-xl p-4 ${item.color}`}>
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-bold text-sm">{item.step}</p>
                  <p className="text-sm mt-0.5 opacity-90">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reporting */}
        <section className="mb-8 bg-brand-50 border border-brand-100 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">How to Report</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            If you encounter anyone violating these guidelines, use the <strong>Report</strong> button
            in the chat interface. Select the reason for your report and optionally add details.
            Our moderation team reviews all reports.
          </p>
          <p className="text-gray-500 text-xs">
            Reports are anonymous. The reported user will not know you filed a report.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Also read our{' '}
            <Link href="/terms" className="text-brand-600 hover:underline">Terms of Service</Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
