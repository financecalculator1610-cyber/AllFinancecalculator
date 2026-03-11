import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { allBlogPosts as blogPosts } from '@/lib/blog/posts'
import { Clock, User, ArrowLeft, ArrowRight, Tag } from 'lucide-react'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) return {}
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: { canonical: `https://finanacecalculator.com/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      url: `https://finanacecalculator.com/blog/${post.slug}`,
    },
    twitter: { card: 'summary_large_image', title: post.seoTitle, description: post.seoDescription },
  }
}

function renderMarkdown(content: string) {
  // Simple markdown rendering
  const lines = content.trim().split('\n')
  let html = ''
  let inTable = false
  let tableRows: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) { if (inTable) { html += renderTable(tableRows); inTable = false; tableRows = [] } continue }

    if (line.startsWith('|')) {
      inTable = true; tableRows.push(line); continue
    }
    if (inTable) { html += renderTable(tableRows); inTable = false; tableRows = [] }

    if (line.startsWith('## ')) html += `<h2>${inline(line.slice(3))}</h2>`
    else if (line.startsWith('### ')) html += `<h3>${inline(line.slice(4))}</h3>`
    else if (line.startsWith('#### ')) html += `<h4>${inline(line.slice(5))}</h4>`
    else if (line.startsWith('- ') || line.startsWith('* ')) html += `<li>${inline(line.slice(2))}</li>`
    else if (/^\d+\. /.test(line)) html += `<li>${inline(line.replace(/^\d+\. /, ''))}</li>`
    else if (line.startsWith('```')) html += '<pre><code>'
    else if (line === '```') html += '</code></pre>'
    else if (line.startsWith('> ')) html += `<blockquote>${inline(line.slice(2))}</blockquote>`
    else html += `<p>${inline(line)}</p>`
  }
  if (inTable && tableRows.length) html += renderTable(tableRows)

  // Wrap consecutive <li> in <ul>
  html = html.replace(/(<li>.*?<\/li>\s*)+/g, m => `<ul>${m}</ul>`)
  // Clean up pre tags
  html = html.replace(/<\/code><\/pre>\s*<pre><code>/g, '\n')

  return html
}

function renderTable(rows: string[]) {
  if (rows.length < 2) return ''
  const headers = rows[0].split('|').filter(c => c.trim()).map(c => `<th>${c.trim()}</th>`).join('')
  const body = rows.slice(2).map(row => {
    const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${inline(c.trim())}</td>`).join('')
    return `<tr>${cells}</tr>`
  }).join('')
  return `<div class="overflow-x-auto my-5"><table class="calc-table"><thead><tr>${headers}</tr></thead><tbody>${body}</tbody></table></div>`
}

function inline(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-green-600 underline underline-offset-2 hover:text-green-700">$1</a>')
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) notFound()

  const catPosts = blogPosts.filter(p => p.categorySlug === post.categorySlug && p.slug !== post.slug).slice(0, 3)
  const idx = blogPosts.findIndex(p => p.slug === post.slug)
  const prevPost = idx > 0 ? blogPosts[idx - 1] : null
  const nextPost = idx < blogPosts.length - 1 ? blogPosts[idx + 1] : null

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'FinanaceCalculator.com', logo: { '@type': 'ImageObject', url: 'https://finanacecalculator.com/logo.png' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://finanacecalculator.com/blog/${post.slug}` },
    keywords: post.keywords.join(', '),
  }

  const faqSchema = post.content.includes('## ') ? null : null // Could add FAQ extraction

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Article */}
          <article className="lg:col-span-3">
            {/* Back link */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-semibold mb-6 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog
            </Link>

            {/* Article Header */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden mb-6">
              <div className="bg-gradient-to-br from-green-50 to-white px-8 pt-8 pb-6">
                <div className="flex flex-wrap gap-2 items-center mb-4">
                  <Link href={`/blog/category/${post.categorySlug}`} className="badge-green hover:bg-green-200 transition-colors">{post.category}</Link>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  <span className="text-xs text-gray-400">{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black font-display text-gray-900 leading-tight mb-4">{post.title}</h1>
                <p className="text-gray-500 text-base leading-relaxed">{post.excerpt}</p>

                {/* CTA Card */}
                <div className="mt-5 p-4 rounded-2xl bg-green-100 border border-green-200 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-green-800">Try the Free Calculator</p>
                    <p className="text-xs text-green-700 mt-0.5">Instantly calculate with interactive charts</p>
                  </div>
                  <Link href={post.relatedCalc.href}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-colors">
                    🧮 {post.relatedCalc.name} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Article Content */}
              <div className="px-8 py-6">
                <div
                  className="prose-green max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
                  style={{ lineHeight: '1.8' }}
                />
              </div>

              {/* Tags */}
              <div className="px-8 pb-6 flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                    <Tag className="w-3 h-3" />{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Calculator CTA */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white mb-6">
              <h3 className="font-black text-xl font-display mb-2">Ready to Run the Numbers?</h3>
              <p className="text-green-100 text-sm mb-4">Use our free {post.relatedCalc.name} to apply what you just learned. Interactive charts, instant results.</p>
              <Link href={post.relatedCalc.href}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors shadow-lg">
                🧮 Open {post.relatedCalc.name} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Prev / Next */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`}
                  className="group p-5 bg-white rounded-2xl border border-gray-100 shadow-card hover:border-green-200 transition-all">
                  <p className="text-xs text-gray-400 flex items-center gap-1 mb-2"><ArrowLeft className="w-3 h-3" />Previous</p>
                  <p className="font-bold text-gray-800 text-sm group-hover:text-green-700 transition-colors line-clamp-2">{prevPost.title}</p>
                </Link>
              )}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`}
                  className="group p-5 bg-white rounded-2xl border border-gray-100 shadow-card hover:border-green-200 transition-all text-right ml-auto w-full">
                  <p className="text-xs text-gray-400 flex items-center gap-1 justify-end mb-2">Next <ArrowRight className="w-3 h-3" /></p>
                  <p className="font-bold text-gray-800 text-sm group-hover:text-green-700 transition-colors line-clamp-2">{nextPost.title}</p>
                </Link>
              )}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-5">
            {/* Calculator Widget */}
            <div className="bg-green-600 rounded-2xl p-5 text-white sticky top-20">
              <p className="text-sm font-bold text-green-100 mb-1">📊 Free Calculator</p>
              <p className="font-black text-lg font-display mb-3">{post.relatedCalc.name}</p>
              <p className="text-green-200 text-xs mb-4">Instantly calculate with live charts. No signup needed.</p>
              <Link href={post.relatedCalc.href}
                className="w-full block text-center py-2.5 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors text-sm">
                Open Calculator →
              </Link>
            </div>

            {/* Related in Category */}
            {catPosts.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100 bg-green-50">
                  <p className="text-xs font-bold text-green-700 uppercase tracking-wider">Related Articles</p>
                </div>
                <div className="p-3 space-y-1">
                  {catPosts.map(p => (
                    <Link key={p.slug} href={`/blog/${p.slug}`}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors group">
                      <div className="flex-1">
                        <p className="font-semibold text-xs text-gray-800 group-hover:text-green-700 transition-colors leading-tight line-clamp-2">{p.title}</p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" />{p.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* All Categories */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">Browse Topics</p>
              </div>
              <div className="p-3 space-y-1">
                {[{ name: 'All Posts', slug: '', icon: '📚' }, ...require('@/lib/blog/posts').blogCategories.map((c: any) => ({ name: c.name, slug: c.slug, icon: c.icon }))].map(cat => (
                  <Link key={cat.slug} href={cat.slug ? `/blog/category/${cat.slug}` : '/blog'}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-green-50 text-sm text-gray-700 hover:text-green-700 font-medium transition-colors">
                    <span>{cat.icon}</span>{cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
