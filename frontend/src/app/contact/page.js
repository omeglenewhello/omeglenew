import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Contact Us - OmegleNew | Anonymous Stranger Chat',
  description: 'Contact the OmegleNew team for support, abuse reports, legal requests, or general inquiries about our anonymous chat platform.',
  alternates: { canonical: 'https://omeglenew.com/contact' },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="text-brand-600 hover:text-brand-700 text-sm font-medium flex items-center gap-1 mb-4">
            ← Back to OmegleNew
          </Link>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-gray-500 text-sm">We typically respond within 1–2 business days.</p>
        </div>

        <div className="space-y-8">

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">General Inquiries</h2>
            <p className="text-gray-500 text-sm mb-3">Questions about the platform, partnerships, or feedback.</p>
            <a href="mailto:contact@omeglenew.com" className="text-brand-600 font-medium hover:underline">
              contact@omeglenew.com
            </a>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Report Abuse</h2>
            <p className="text-gray-500 text-sm mb-3">To report harmful content, harassment, or policy violations — you can also use the in-chat Report button during any session.</p>
            <a href="mailto:abuse@omeglenew.com" className="text-brand-600 font-medium hover:underline">
              abuse@omeglenew.com
            </a>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Legal & Privacy Requests</h2>
            <p className="text-gray-500 text-sm mb-3">For DMCA notices, law enforcement requests, or privacy-related inquiries.</p>
            <a href="mailto:legal@omeglenew.com" className="text-brand-600 font-medium hover:underline">
              legal@omeglenew.com
            </a>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">About OmegleNew</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              OmegleNew is a free anonymous chat platform that connects people around the world for text conversations. We are committed to providing a safe, moderated space for meeting new people. Our platform uses AI-assisted matching and moderation to improve user experience and safety.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              We do not store personal data beyond what is necessary for safety and legal compliance. See our{' '}
              <Link href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link> and{' '}
              <Link href="/terms" className="text-brand-600 hover:underline">Terms of Service</Link> for full details.
            </p>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Also read our{' '}
            <Link href="/guidelines" className="text-brand-600 hover:underline">Community Guidelines</Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
