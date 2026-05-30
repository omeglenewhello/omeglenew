import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy - OmegleNew | Anonymous Chat',
  description: 'OmegleNew Privacy Policy. Learn how we handle data, cookies, and your privacy when using our anonymous stranger chat platform.',
  alternates: { canonical: 'https://omeglenew.com/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="text-brand-600 hover:text-brand-700 text-sm font-medium flex items-center gap-1 mb-4">
            ← Back to OmegleNew
          </Link>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: May 2026</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <p className="text-blue-700 font-semibold text-sm">
            OmegleNew does not require registration. We collect only what is necessary to operate the service safely.
          </p>
        </div>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Do NOT Collect</h2>
            <p>OmegleNew does not collect, store, or process:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li>Your name, email address, or any personal identification</li>
              <li>Phone numbers or social media accounts</li>
              <li>Payment information (our service is free)</li>
              <li>Account credentials (no registration required)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We May Collect</h2>
            <p>For security, legal compliance, and platform improvement, we may collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li><strong>IP Address:</strong> Used for security (rate limiting, ban enforcement) and approximate geolocation for legal compliance.</li>
              <li><strong>Chat Session Data:</strong> Message content and timestamps, stored temporarily for moderation and safety purposes.</li>
              <li><strong>Browser/Device Information:</strong> General browser type and device type for optimizing performance.</li>
              <li><strong>Usage Data:</strong> Anonymous analytics such as active user count and session duration (no personal identifiers).</li>
              <li><strong>Report Logs:</strong> When you report a user, the report details and associated IPs are logged for moderation purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Cookies</h2>
            <p>
              OmegleNew uses minimal cookies to store your age verification preference locally in your browser. This data never leaves your device. We do not use tracking cookies or advertising cookies from third-party services (except Google AdSense, see below).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Google AdSense</h2>
            <p>
              We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" className="text-brand-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>
              . Google&apos;s use of advertising cookies is governed by the{' '}
              <a href="https://policies.google.com/privacy" className="text-brand-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Google Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Chat Data</h2>
            <p>
              To improve platform safety and quality, chat session data (including message text, timestamps, and IP address) may be stored on our servers for a limited period. This data is used solely for moderation, abuse prevention, and service improvement — it is never sold or shared with third parties for marketing purposes.
            </p>
            <p className="mt-3 text-sm text-gray-500">
              Never share sensitive personal information such as your full name, home address, financial details, or passwords with strangers in chat.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Law Enforcement</h2>
            <p>
              We will cooperate with law enforcement and legal authorities if required by law. IP address logs may be shared with law enforcement in response to a valid legal request, particularly in cases involving illegal activity, threats, or exploitation of minors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Children&apos;s Privacy (COPPA)</h2>
            <p>
              OmegleNew is intended for users 13 years and older. We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has accessed our platform, we will immediately terminate their access and delete any collected data. If you believe a child under 13 is using our service, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Data Retention</h2>
            <p>
              Chat session logs are retained for up to 90 days for moderation and safety purposes, after which they are purged. IP address logs used for ban enforcement are retained for 90 days. Report logs may be retained for up to 12 months for moderation purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Your Rights</h2>
            <p>
              We do not link stored data to identifiable individuals (no accounts or names). If you have concerns about data collected — such as your IP address or chat session logs — contact us and we will assist with any applicable data requests.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Continued use of OmegleNew after changes constitutes acceptance of the updated policy.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Also read our{' '}
            <Link href="/terms" className="text-brand-600 hover:underline">Terms of Service</Link>{' '}
            and{' '}
            <Link href="/guidelines" className="text-brand-600 hover:underline">Community Guidelines</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
