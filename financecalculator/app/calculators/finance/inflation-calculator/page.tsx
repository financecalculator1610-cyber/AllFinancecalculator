import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Inflation Calculator — Future Cost & Purchasing Power Calculator',
  description: 'Calculate how inflation erodes purchasing power and what things will cost in future. Essential for retirement and investment planning.',
  slug: 'inflation-calculator',
  category: 'finance',
  keywords: ['inflation calculator', 'purchasing power calculator', 'future value inflation', 'inflation rate calculator', 'cost of inflation'],
})

const relatedCalculators = [
    { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🌅', desc: 'Plan for inflation-adjusted retirement' },
    { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈', desc: 'SIP returns vs inflation' },
    { name: 'Savings Goal Calculator', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', desc: 'Inflation-adjusted savings goals' },
    { name: 'Compound Interest Calculator', href: '/calculators/finance/compound-interest-calculator', icon: '💰', desc: 'Real vs nominal returns' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'What is inflation and why does it matter for financial planning?', answer: 'Inflation is the rate at which the general price level of goods and services rises, reducing purchasing power. If inflation is 6% and your investment returns 8%, your real return is only 2%. All financial goals must account for inflation.' },
  { question: 'What is India\'s historical inflation rate?', answer: 'India\'s CPI inflation has averaged 5-7% over the past decade. Use 5-6% for financial planning in India. The US has averaged 2-3% historically, though 2021-2023 saw higher rates (6-9%).' },
  { question: 'How much will ₹1 lakh be worth in 20 years?', answer: 'At 6% inflation, ₹1 lakh today will be worth approximately ₹31,180 in 20 years in real terms. Put differently, you\'ll need ₹3.2 lakhs in 20 years to have the same purchasing power as ₹1 lakh today.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Inflation Calculator — Future Cost & Purchasing Power Calculator', description: 'Calculate how inflation erodes purchasing power and what things will cost in future. Essential for retirement and investment planning.', url: 'https://finanacecalculator.com/calculators/finance/inflation-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'Inflation Calculator', url: '/calculators/finance/inflation-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='retirement-planning-guide-how-much-do-you-need-to-retire'
    />
  )
}
