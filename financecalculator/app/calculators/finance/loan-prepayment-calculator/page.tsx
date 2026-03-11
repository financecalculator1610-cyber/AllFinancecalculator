import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Loan Prepayment Calculator — Interest Saved & Tenure Reduction',
  description: 'Find how much interest you save and how many years you cut by making a prepayment on your home loan, car loan, or personal loan.',
  slug: 'loan-prepayment-calculator',
  category: 'finance',
  keywords: ['loan prepayment calculator', 'mortgage prepayment calculator', 'how much interest saved by prepayment', 'home loan prepayment', 'prepayment benefit calculator'],
})

const relatedCalculators = [
    { name: 'Home Loan Calculator', href: '/calculators/finance/home-loan-calculator', icon: '🏠', desc: 'Full mortgage calculator' },
    { name: 'EMI Calculator', href: '/calculators/finance/emi-calculator', icon: '🏦', desc: 'Monthly EMI planning' },
    { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', desc: 'Pay off all debts faster' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'How much interest can I save by prepaying my home loan?', answer: 'A prepayment of just 5-10% of outstanding principal can save 15-25% of total interest over the loan\'s remaining tenure. For example, a ₹50L prepayment on a ₹1 crore home loan at 9% for 20 remaining years can save ₹40-50 lakhs in interest.' },
  { question: 'Should I prepay home loan or invest in mutual funds?', answer: 'If home loan rate > expected investment return: Prepay. If investment return > home loan rate: Invest instead. At 8.5-9% home loan and 12-14% equity SIP return historically, investing often wins mathematically — but prepayment reduces risk and guarantees interest savings.' },
  { question: 'Does prepayment reduce EMI or tenure?', answer: 'Banks offer both options. Reducing tenure saves significantly more total interest. Reducing EMI improves cash flow. Most financial advisors recommend reducing tenure since the interest savings are dramatically higher.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Loan Prepayment Calculator — Interest Saved & Tenure Reduction', description: 'Find how much interest you save and how many years you cut by making a prepayment on your home loan, car loan, or personal loan.', url: 'https://finanacecalculator.com/calculators/finance/loan-prepayment-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'Loan Prepayment Calculator', url: '/calculators/finance/loan-prepayment-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='home-loan-mortgage-guide-how-to-get-best-rate'
    />
  )
}
