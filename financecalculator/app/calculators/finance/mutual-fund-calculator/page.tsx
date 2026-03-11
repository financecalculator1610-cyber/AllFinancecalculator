import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Mutual Fund Return Calculator — Expense Ratio Adjusted Returns',
  description: 'Calculate mutual fund returns adjusted for expense ratio. See how a 1% difference in expense ratio costs thousands over 10+ years.',
  slug: 'mutual-fund-calculator',
  category: 'finance',
  keywords: ['mutual fund calculator', 'mutual fund return calculator', 'expense ratio calculator', 'mutual fund expense ratio', 'SIP return calculator'],
})

const relatedCalculators = [
    { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈', desc: 'Regular SIP planning' },
    { name: 'CAGR Calculator', href: '/calculators/finance/cagr-calculator', icon: '📈', desc: "Calculate your fund's CAGR" },
    { name: 'XIRR Calculator', href: '/calculators/finance/xirr-calculator', icon: '📐', desc: 'True annualized return on investment' },
    { name: 'Lumpsum Calculator', href: '/calculators/finance/lumpsum-calculator', icon: '💼', desc: 'One-time investment return' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'What is expense ratio in mutual funds?', answer: 'Expense ratio is the annual fee charged by a mutual fund, expressed as a percentage of Assets Under Management (AUM). A 1.5% expense ratio on ₹10 lakh = ₹15,000/year deducted from returns. SEBI (India) caps equity fund expense ratios at 1.05-2.25%.' },
  { question: 'How much does expense ratio affect returns over 20 years?', answer: 'Enormously. ₹10 lakh invested at 12% gross return over 20 years: At 0.1% expense = ₹92.3L. At 1.5% expense = ₹72.9L. At 2.5% expense = ₹60.1L. A 2.4% difference in expense ratio costs ₹32 lakhs over 20 years!' },
  { question: 'Direct vs regular mutual fund plans — which is better?', answer: 'Direct plans have expense ratios 0.5-1.5% lower than regular plans (no distributor commission). For long-term investors, direct plans can generate 15-25% more wealth over 20 years. Use our calculator to compare.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Mutual Fund Return Calculator — Expense Ratio Adjusted Returns', description: 'Calculate mutual fund returns adjusted for expense ratio. See how a 1% difference in expense ratio costs thousands over 10+ years.', url: 'https://finanacecalculator.com/calculators/finance/mutual-fund-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'Mutual Fund Return Calculator', url: '/calculators/finance/mutual-fund-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='sip-calculator-guide-how-to-grow-wealth-with-systematic-investment'
    />
  )
}
