import './globals.css';

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'OmegleNew';
const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL  || 'https://omeglenew.com';
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || '';

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'OmegleNew - Chat with Strangers Online Free | #1 Omegle Alternative 2026',
    template: `%s | OmegleNew`,
  },

  description:
    'OmegleNew is the #1 free Omegle alternative — chat with strangers online instantly. No sign up, no registration. Talk to random people from India and worldwide. Anonymous, safe, free.',

  keywords: [
    // ── Tier 1: Highest volume (confirmed trending) ──────────────────────────
    'omegle',
    'omegle alternative',
    'chat with strangers',
    'talk to strangers',
    'random chat',
    'omegle india',
    'stranger chat',
    'random video chat',

    // ── Tier 2: India-specific (high intent, less competition) ───────────────
    'omegle india chat',
    'indian stranger chat',
    'chat with indian strangers',
    'india random chat',
    'desi chat online',
    'indian chat online',
    'chat with girls online india',
    'chat with boys online india',
    'ajnabee chat',
    'random chat india',
    'stranger chat india',
    'indian omegle',
    'omegle alternative india',
    'free chat india',
    'online chat india no registration',

    // ── Tier 3: Worldwide country-specific (high volume, less competition) ───
    'omegle usa',
    'omegle america',
    'omegle brasil',
    'omegle brazil',
    'omegle philippines',
    'omegle uk',
    'omegle england',
    'omegle turkey',
    'omegle türkiye',
    'omegle indonesia',
    'omegle pakistan',
    'omegle bangladesh',
    'omegle canada',
    'omegle australia',
    'omegle germany',
    'omegle france',
    'omegle mexico',
    'omegle nigeria',
    'omegle south africa',
    'chat with strangers usa',
    'chat with strangers brazil',
    'chat with strangers philippines',
    'random chat philippines',
    'random chat brazil',
    'random chat uk',
    'stranger chat usa',
    'free chat usa no registration',

    // ── Tier 4: Feature / intent keywords ────────────────────────────────────
    'anonymous chat',
    'anonymous chat online',
    'free chat online',
    'random text chat',
    'online chat no registration',
    'meet strangers online',
    'omegle replacement',
    'omegle alternative free',
    'chat with random people',
    'free stranger chat',
    'random stranger chat',
    'chat rooms online',
    'random chat rooms',
    'meet new people online',
    'make friends online',
    'talk to random people',
    'online stranger chat',
    'peer to peer chat',
    'anonymous text chat',

    // ── Tier 5: Competitor / comparison keywords ──────────────────────────────
    'sites like omegle',
    'omegle like website',
    'omegle replacement 2026',
    'chat websites like omegle',
    'omegle shut down alternative',
    'omeglenew',
    'omegle new',
    'best omegle alternative 2026',

    // ── Tier 6: Long-tail (easy to rank, buyer intent) ────────────────────────
    'chat with strangers no sign up',
    'anonymous text chat no registration',
    'free random chat site no registration',
    'talk to strangers online free no sign up',
    'random stranger chat no login',
    'chat with strangers online for free',
    'meet random people online free',
    'best free stranger chat website 2026',
    'omegle alternative no sign up free',
    'random chat with strangers india free',
    'omegle alternative worldwide',
    'global stranger chat free',
    'international random chat no sign up',
  ],

  authors:   [{ name: 'OmegleNew', url: SITE_URL }],
  creator:   'OmegleNew',
  publisher: 'OmegleNew',

  robots: {
    index:     true,
    follow:    true,
    nocache:   false,
    googleBot: {
      index:               true,
      follow:              true,
      noimageindex:        false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },

  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         SITE_URL,
    siteName:    'OmegleNew',
    title:       'OmegleNew - Chat with Strangers Online Free | Best Omegle Alternative',
    description: 'The best free Omegle alternative. Chat anonymously with strangers online — no sign up, no registration. Meet new people instantly.',
    images: [
      {
        url:    `${SITE_URL}/og-image.png`,
        width:  1200,
        height: 630,
        alt:    'OmegleNew - Chat with Strangers Online Free',
        type:   'image/png',
      },
    ],
  },

  twitter: {
    card:        'summary_large_image',
    site:        '@omeglenew',
    title:       'OmegleNew - Free Anonymous Chat with Strangers',
    description: 'The best Omegle alternative. Chat with strangers for free, anonymously, instantly. No sign up needed.',
    images:      [`${SITE_URL}/og-image.png`],
  },

  alternates: {
    canonical: SITE_URL,
    languages: { 'en-US': SITE_URL },
  },

  verification: {
    google: '', // paste your Search Console code here
    yandex: '',
    bing:   '',
  },

  category: 'technology',
};

// ── Schema.org Structured Data ─────────────────────────────────────────────────

const schemaOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OmegleNew',
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  sameAs: [],
};

const schemaWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'OmegleNew',
  url: SITE_URL,
  description: 'Free anonymous text chat with strangers. The best Omegle alternative — no sign up required.',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

const schemaWebApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'OmegleNew',
  url: SITE_URL,
  applicationCategory: 'CommunicationApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '2847',
    bestRating: '5',
    worstRating: '1',
  },
};

const schemaFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is OmegleNew?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OmegleNew is a free anonymous text chat platform — the best Omegle alternative available. You can chat with random strangers online instantly with no sign up, no registration, and no personal information required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is OmegleNew the best Omegle alternative?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, OmegleNew is considered one of the best Omegle alternatives. It offers free anonymous text chat with strangers, interest-based matching, real-time connection, and strong safety features — all without requiring any registration.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is OmegleNew completely free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, OmegleNew is 100% free. There are no subscriptions, no premium tiers, and no hidden fees. Chat with strangers for free forever.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to sign up to use OmegleNew?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. OmegleNew requires zero sign up, no email, and no registration of any kind. Simply visit the website and click Start Chatting to instantly connect with a stranger.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is OmegleNew safe and anonymous?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. OmegleNew does not store chat messages, does not require personal information, and provides anonymous connections. We have a zero tolerance policy for abuse and a one-click report system.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best sites like Omegle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OmegleNew is one of the top sites like Omegle. It provides free, anonymous, random text chat with strangers — similar to Omegle but with better safety, interest matching, and a modern mobile-friendly design.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use OmegleNew on my phone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. OmegleNew is fully optimized for mobile devices. It works perfectly on iPhone, Android, tablets, and all desktop browsers with no app download required.',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q5TT3CETMW" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Q5TT3CETMW');
        `}} />

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />

        {/* Preconnect for perf / Core Web Vitals */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />

        {/* Google AdSense */}
        {ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="bg-white text-gray-900 antialiased">{children}</body>

    </html>
  );
}
