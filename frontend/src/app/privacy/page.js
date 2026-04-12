import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy - OmegleNew | Anonymous Chat',
  description: 'OmegleNew Privacy Policy. We do not store your chats or personal data. Your anonymous stranger chat sessions are private and secure.',
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
          <p className="text-gray-500 text-sm">Last updated: January 2026</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8">
          <p className="text-green-700 font-semibold text-sm">
            ✓ OmegleNew does not require registration or personal information. Your chats are not stored.
          </p>
        </div>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Do NOT Collect</h2>
            <p>OmegleNew does not collect, store, or process:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li>Your name, email address, or any personal identification</li>
              <li>Your chat messages (they are not stored on our servers)</li>
              <li>Phone numbers or social media accounts</li>
              <li>Payment information (our service is free)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We May Collect</h2>
            <p>For security, legal compliance, and platform improvement, we may collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li><strong>IP Address:</strong> Used for security (rate limiting, ban enforcement) and approximate geolocation for legal compliance.</li>
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
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Chat Privacy</h2>
            <p>
              Chat messages are transmitted in real-time and are <strong>not recorded or stored</strong> on our servers. Once a chat session ends, the messages are gone. However, please be aware that the person you are chatting with may screenshot or record the conversation — never share sensitive personal information with strangers.
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
              OmegleNew is strictly for users 18 years and older. We do not knowingly collect information from minors. If we discover a minor has accessed our platform, we will immediately terminate their access. If you believe a minor is using our service, please report it immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Data Retention</h2>
            <p>
              Since we do not collect personal data, there is nothing to delete. IP address logs used for ban enforcement are retained for 90 days and then automatically purged. Report logs may be retained for up to 12 months for moderation purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Your Rights</h2>
            <p>
              Since we do not store personal information tied to identifiable individuals, most data rights (access, deletion, portability) are not applicable. If you have concerns about data collected via your IP address, contact us and we will assist.
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
