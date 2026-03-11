import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Lumpsum Investment Calculator — One-Time Investment Returns',
  description: 'Calculate the future value of a one-time lumpsum investment. See Rule of 72, year-wise growth, and compare with SIP returns.',
  slug: 'lumpsum-calculator',
  category: 'finance',
  keywords: ['lumpsum calculator', 'lumpsum investment calculator', 'one time investment calculator', 'lumpsum vs SIP', 'lumpsum return calculator'],
})

const relatedCalculators = [
    { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈', desc: 'Compare monthly SIP vs lumpsum' },
    { name: 'Compound Interest Calculator', href: '/calculators/finance/compound-interest-calculator', icon: '💰', desc: 'Different compounding frequencies' },
    { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🌅', desc: 'Use lumpsum for retirement corpus' },
    { name: 'Inflation Calculator', href: '/calculators/finance/inflation-calculator', icon: '📊', desc: 'Real purchasing power of returns' }
  ]

const faqs: { question: string; answer: string }[] = []

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Lumpsum Investment Calculator — One-Time Investment Returns', description: 'Calculate the future value of a one-time lumpsum investment. See Rule of 72, year-wise growth, and compare with SIP returns.', url: 'https://finanacecalculator.com/calculators/finance/lumpsum-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'Lumpsum Investment Calculator', url: '/calculators/finance/lumpsum-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='compound-interest-guide-eighth-wonder-of-the-world'
    />
  )
}
