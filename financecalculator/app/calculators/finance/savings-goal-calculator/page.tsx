import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Savings Goal Calculator — Monthly Savings Needed for Your Goal',
  description: 'Calculate exactly how much to save monthly to reach any financial goal. See progress timeline, year-wise breakdown, and investment requirements.',
  slug: 'savings-goal-calculator',
  category: 'finance',
  keywords: ['savings goal calculator', 'how much to save calculator', 'savings plan calculator', 'monthly savings calculator', 'goal based saving calculator'],
})

const relatedCalculators = [
    { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈', desc: 'Invest savings via SIP' },
    { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🌅', desc: 'The biggest savings goal' },
    { name: 'Inflation Calculator', href: '/calculators/finance/inflation-calculator', icon: '📊', desc: 'Adjust goal for inflation' },
    { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '⚖️', desc: 'Current savings as % of goal' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'How do I calculate how much to save per month for a goal?', answer: 'Use the Present Value of Annuity formula in reverse: Monthly SIP = Goal × r / ((1+r)^n - 1). Where r = monthly return rate, n = months to goal. Our calculator does this instantly — just enter your goal, timeline, and expected return.' },
  { question: 'What return rate should I use for goal planning?', answer: 'Short-term goals (1-3 years): Use FD/RD rate (6-7%). Medium-term (3-7 years): 8-10% (balanced fund). Long-term (7+ years): 10-12% (equity fund). Always use a conservative estimate to avoid falling short.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Savings Goal Calculator — Monthly Savings Needed for Your Goal', description: 'Calculate exactly how much to save monthly to reach any financial goal. See progress timeline, year-wise breakdown, and investment requirements.', url: 'https://finanacecalculator.com/calculators/finance/savings-goal-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'Savings Goal Calculator', url: '/calculators/finance/savings-goal-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='retirement-planning-guide-how-much-do-you-need-to-retire'
    />
  )
}
