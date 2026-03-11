import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { allBlogPosts as blogPosts, blogCategories } from '@/lib/blog/posts'
import { Clock, ArrowRight, ArrowLeft, Tag, BookOpen } from 'lucide-react'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return blogCategories.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = blogCategories.find(c => c.slug === params.slug)
  if (!cat) return {}
  return {
    title: `${cat.name} Articles — FinanaceCalculator Blog 2026`,
    description: `Expert articles on ${cat.name.toLowerCase()} — ${cat.desc}. Free guides with calculators to put advice into practice.`,
    keywords: [cat.name.toLowerCase(), 'finance guide', 'free calculator', 'financial tips 2026'],
    alternates: { canonical: `https://finanacecalculator.com/blog/category/${params.slug}` },
  }
}

export default function CategoryPage({ params }: Props) {
  const cat = blogCategories.find(c => c.slug === params.slug)
  if (!cat) notFound()

  const posts = blogPosts.filter(p => p.categorySlug === params.slug)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/" className="text-gray-500 hover:text-green-600">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/blog" className="text-gray-500 hover:text-green-600">Blog</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">{cat!.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900">{cat!.name}</h1>
              <p className="text-green-600 font-semibold text-sm mt-0.5">{posts.length} articles</p>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl">{cat!.desc}</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No articles in this category yet. Check back soon!</p>
            <Link href="/blog" className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to All Articles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-green-400 hover:shadow-xl transition-all p-6 flex flex-col shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-700">{post.category}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
                <h2 className="font-black text-gray-900 group-hover:text-green-700 transition-colors mb-2 leading-snug">{post.title}</h2>
                <p className="text-xs text-gray-500 flex-1 leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="text-xs font-bold text-green-600 flex items-center gap-0.5 group-hover:gap-1 transition-all">Read <ArrowRight className="w-3 h-3" /></span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-green-300 text-green-700 font-bold hover:bg-green-50 transition-colors">
            <ArrowLeft className="w-4 h-4" /> View All Articles
          </Link>
        </div>
      </div>
    </div>
  )
}
