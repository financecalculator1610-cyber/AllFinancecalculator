import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Debt Payoff Calculator — Avalanche vs Snowball Method',
  description: 'Find the fastest way to pay off all debts. Compare avalanche (highest interest first) vs snowball (smallest balance first) methods with exact payoff dates.',
  slug: 'debt-payoff-calculator',
  category: 'finance',
  keywords: ['debt payoff calculator', 'debt avalanche calculator', 'debt snowball calculator', 'how to pay off debt', 'debt free calculator'],
})

const relatedCalculators = [
    { name: 'EMI Calculator', href: '/calculators/finance/emi-calculator', icon: '🏦', desc: 'Calculate individual loan EMI' },
    { name: 'Home Loan Calculator', href: '/calculators/finance/home-loan-calculator', icon: '🏠', desc: 'Mortgage payoff analysis' },
    { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '⚖️', desc: 'Track net worth as debt reduces' },
    { name: 'Savings Goal Calculator', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', desc: 'Save after debt is paid off' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'What is the avalanche method for debt payoff?', answer: 'Avalanche method: Pay minimums on all debts, then put all extra money toward the highest-interest debt first. This mathematically minimizes total interest paid. Best for people who want to save the most money.' },
  { question: 'What is the snowball method for debt payoff?', answer: 'Snowball method: Pay minimums on all debts, then put extra money toward the smallest balance first. Once that\'s paid, roll that payment to the next smallest. Best for people who need psychological wins to stay motivated.' },
  { question: 'Avalanche vs snowball — which saves more money?', answer: 'Avalanche saves more money (sometimes thousands). Snowball is better psychologically and leads to higher completion rates. Studies show debt behavior is more psychological than mathematical — if snowball keeps you motivated, it may be better for you overall.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Debt Payoff Calculator — Avalanche vs Snowball Method', description: 'Find the fastest way to pay off all debts. Compare avalanche (highest interest first) vs snowball (smallest balance first) methods with exact payoff dates.', url: 'https://finanacecalculator.com/calculators/finance/debt-payoff-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'Debt Payoff Calculator', url: '/calculators/finance/debt-payoff-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='debt-payoff-strategies-avalanche-vs-snowball-method'
    />
  )
}
