import { ReactNode } from 'react'
import { Breadcrumb } from './Breadcrumb'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface RelatedCalc {
  name: string
  href: string
  icon: string
  desc: string
}

interface CalculatorLayoutProps {
  title: string
  description: string
  icon: string
  category: 'Finance' | 'Health'
  children: ReactNode
  structuredData?: object[]
  relatedCalculators?: RelatedCalc[]
  blogSlug?: string
}

export function CalculatorLayout({ title, description, icon, category, children, structuredData, relatedCalculators, blogSlug }: CalculatorLayoutProps) {
  const catColor = category === 'Finance' ? 'text-green-700 bg-green-100 border-green-200' : 'text-red-700 bg-red-100 border-red-200'

  return (
    <>
      {structuredData?.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: `${category} Calculators`, href: `/calculators/${category.toLowerCase()}` },
          { label: title, href: '#' },
        ]} />

        {/* Header */}
        <div className="mt-5 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-2xl shadow-sm border border-green-200">{icon}</div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${catColor}`}>{category}</span>
            {blogSlug && (
              <Link href={`/blog/${blogSlug}`} className="text-xs text-green-600 hover:text-green-700 flex items-center gap-1 font-medium ml-2 border border-green-200 px-3 py-1 rounded-full bg-green-50 hover:bg-green-100 transition-colors">
                📖 Read Guide <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-display text-gray-900 mb-3">{title}</h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">{description}</p>
        </div>

        {/* Main content */}
        {children}

        {/* Related Calculators */}
        {relatedCalculators && relatedCalculators.length > 0 && (
          <div className="mt-12">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-green-50">
                <h2 className="text-lg font-bold font-display text-gray-900">🔗 Related Calculators</h2>
                <p className="text-sm text-gray-500 mt-0.5">You might also find these useful</p>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {relatedCalculators.map(rc => (
                  <Link key={rc.href} href={rc.href}
                    className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all group">
                    <span className="text-xl flex-shrink-0">{rc.icon}</span>
                    <div>
                      <p className="font-semibold text-sm text-gray-800 group-hover:text-green-700 transition-colors">{rc.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{rc.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-green-500 transition-colors ml-auto flex-shrink-0 mt-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
