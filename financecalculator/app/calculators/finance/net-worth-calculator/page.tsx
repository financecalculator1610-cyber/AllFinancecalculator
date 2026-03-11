import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Net Worth Calculator — Track Your Total Assets and Liabilities',
  description: 'Calculate net worth by tracking all assets and liabilities. See debt-to-asset ratio, visual breakdown charts, and financial health indicators.',
  slug: 'net-worth-calculator',
  category: 'finance',
  keywords: ['net worth calculator', 'personal net worth calculator', 'asset liability calculator', 'how to calculate net worth', 'net worth tracker'],
})

const relatedCalculators = [
    { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', desc: 'Reduce liabilities faster' },
    { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🌅', desc: 'Retirement assets vs corpus needed' },
    { name: 'Home Loan Calculator', href: '/calculators/finance/home-loan-calculator', icon: '🏠', desc: 'Mortgage vs home equity' },
    { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈', desc: 'Grow your assets with SIP' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'What is net worth?', answer: 'Net worth = Total Assets - Total Liabilities. Assets include cash, investments, property, gold, etc. Liabilities include home loan, car loan, personal loan, credit card balances, etc. Positive and growing net worth is the key measure of financial health.' },
  { question: 'What is a good net worth by age?', answer: 'A rough guideline: Net worth ≈ 0.5× annual income by age 30, 2× by 40, 4× by 50, 7× by 60. But this varies hugely by income level, family situation, and country. Focus on consistent growth rather than benchmarks.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Net Worth Calculator — Track Your Total Assets and Liabilities', description: 'Calculate net worth by tracking all assets and liabilities. See debt-to-asset ratio, visual breakdown charts, and financial health indicators.', url: 'https://finanacecalculator.com/calculators/finance/net-worth-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'Net Worth Calculator', url: '/calculators/finance/net-worth-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='net-worth-guide-how-to-calculate-and-grow-your-wealth'
    />
  )
}
