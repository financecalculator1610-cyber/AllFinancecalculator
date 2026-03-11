import type { Metadata } from 'next'
import Link from 'next/link'
import { allBlogPosts as blogPosts, blogCategories } from '@/lib/blog/posts'
import { ArrowRight, Clock, BookOpen, Tag, TrendingUp, Heart, PiggyBank, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Finance & Health Blog 2026 — Free Guides, Calculator Tutorials & Tips',
  description: 'Expert guides on SIP investing, EMI, compound interest, retirement planning, BMI, TDEE, and more. Practical tips backed by calculators. Updated 2026.',
  keywords: ['finance blog', 'SIP guide', 'investment tips', 'retirement planning guide', 'BMI guide', 'calorie guide', 'health tips', 'personal finance India 2026', 'financial calculator guide'],
  alternates: { canonical: 'https://finanacecalculator.com/blog' },
  openGraph: {
    title: 'Finance & Health Blog — Expert Guides & Calculator Tutorials',
    description: 'Expert guides on SIP investing, EMI, retirement planning, BMI, calorie counting, and personal finance. Free, practical tips.',
    url: 'https://finanacecalculator.com/blog',
    type: 'website',
  },
}

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'FinanaceCalculator Blog',
  url: 'https://finanacecalculator.com/blog',
  description: 'Expert guides on personal finance, investing, loans, and health with free calculators.',
  publisher: {
    '@type': 'Organization',
    name: 'FinanaceCalculator',
    url: 'https://finanacecalculator.com',
  },
  blogPost: blogPosts.map(p => ({
    '@type': 'BlogPosting',
    headline: p.title,
    url: `https://finanacecalculator.com/blog/${p.slug}`,
    datePublished: p.publishedAt,
    author: { '@type': 'Organization', name: p.author },
  }))
}

const catIcons: Record<string, any> = {
  investment: TrendingUp,
  loans: PiggyBank,
  retirement: BookOpen,
  health: Heart,
  'personal-finance': Zap,
}
const catColors: Record<string, string> = {
  investment: 'bg-emerald-100 border-emerald-200 text-emerald-700 hover:bg-emerald-50',
  loans: 'bg-blue-100 border-blue-200 text-blue-700 hover:bg-blue-50',
  retirement: 'bg-amber-100 border-amber-200 text-amber-700 hover:bg-amber-50',
  health: 'bg-rose-100 border-rose-200 text-rose-700 hover:bg-rose-50',
  'personal-finance': 'bg-violet-100 border-violet-200 text-violet-700 hover:bg-violet-50',
}

export default function BlogPage() {
  const featured = blogPosts[0]
  const rest = blogPosts.slice(1)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/" className="text-gray-500 hover:text-green-600">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold">Blog</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900">Finance & Health Blog</h1>
                <p className="text-green-600 font-semibold text-sm mt-0.5">{blogPosts.length} Guides · Expert Tips · Free Calculators</p>
              </div>
            </div>
            <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
              Expert guides on <strong>SIP investing</strong>, <strong>loan planning</strong>, <strong>retirement</strong>, <strong>BMI</strong>, <strong>nutrition</strong>, and more — 
              each with a free calculator to put the advice into practice instantly.
            </p>
          </div>

          {/* Categories */}
          <div className="mb-10">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Browse by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {blogCategories.map(cat => {
                const Icon = catIcons[cat.slug] || BookOpen
                return (
                  <Link key={cat.slug} href={`/blog/category/${cat.slug}`}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-center group ${catColors[cat.slug] || 'bg-gray-100 border-gray-200 text-gray-700'}`}>
                    <Icon className="w-6 h-6" />
                    <div>
                      <p className="font-bold text-sm">{cat.name}</p>
                      <p className="text-xs opacity-70 mt-0.5">{cat.count} articles</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Featured post */}
          {featured && (
            <div className="mb-10">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">⭐ Featured Article</h2>
              <Link href={`/blog/${featured.slug}`}
                className="block group bg-white rounded-3xl border border-gray-200 hover:border-green-400 hover:shadow-xl transition-all overflow-hidden shadow-sm">
                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-700">{featured.category}</span>
                    <span className="flex items-center gap-1 text-xs text-gray-400"><Clock className="w-3 h-3" />{featured.readTime}</span>
                    <span className="text-xs text-gray-400">{new Date(featured.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 group-hover:text-green-700 transition-colors mb-3 leading-tight">{featured.title}</h2>
                  <p className="text-gray-500 mb-5 max-w-2xl leading-relaxed">{featured.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {featured.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" />{tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-colors group-hover:gap-3">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </div>
          )}

          {/* All posts grid */}
          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">All Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200 hover:border-green-400 hover:shadow-xl transition-all p-6 flex flex-col shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-700">{post.category}</span>
                    <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                  <h2 className="font-black text-gray-900 group-hover:text-green-700 transition-colors mb-2 leading-snug line-clamp-2">{post.title}</h2>
                  <p className="text-xs text-gray-500 flex-1 leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="text-xs font-bold text-green-600 group-hover:gap-1 flex items-center gap-0.5 transition-all">Read more <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
