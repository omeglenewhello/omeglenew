import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Blog - OmegleNew | Tips, Guides & Online Chat Advice',
  description: 'Read articles about safe online chatting, making friends online, and getting the most out of anonymous stranger chat platforms like OmegleNew.',
  alternates: { canonical: 'https://omeglenew.com/blog' },
  robots: { index: true, follow: true },
};

const posts = [
  {
    slug: 'how-to-stay-safe-online-chat',
    title: 'How to Stay Safe While Chatting with Strangers Online',
    excerpt: 'Essential tips for protecting your privacy and staying safe when talking to people you don\'t know on the internet.',
    date: 'May 2026',
    readTime: '5 min read',
  },
  {
    slug: 'tips-for-interesting-conversations',
    title: '10 Tips for Having More Interesting Conversations with Strangers',
    excerpt: 'How to break the ice, keep a conversation going, and actually enjoy talking to random people online.',
    date: 'May 2026',
    readTime: '4 min read',
  },
  {
    slug: 'omegle-alternatives-2026',
    title: 'Best Omegle Alternatives in 2026 — Compared',
    excerpt: 'Omegle shut down in 2023. Here\'s a detailed comparison of the best stranger chat platforms available today.',
    date: 'April 2026',
    readTime: '6 min read',
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Blog</h1>
          <p className="text-gray-500 text-lg">Tips, guides, and advice for better online conversations.</p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <article className="border border-gray-200 rounded-2xl p-6 hover:border-gray-400 transition-colors">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
                <p className="text-blue-600 text-sm font-medium mt-4">Read article →</p>
              </article>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
