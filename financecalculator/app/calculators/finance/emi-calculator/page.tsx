import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import EMICalculatorClient from './EMICalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'EMI Calculator — Free Loan EMI Calculator with Amortization Schedule',
  description: 'Calculate monthly EMI for any loan. Get complete amortization schedule, total interest, and payment breakdown charts. Supports home, car, personal loans.',
  slug: 'emi-calculator',
  category: 'finance',
  keywords: ['EMI calculator', 'loan EMI calculator online', 'home loan EMI calculator', 'car loan EMI', 'EMI formula calculator'],
})

const relatedCalculators = [
    { name: 'Home Loan Calculator', href: '/calculators/finance/home-loan-calculator', icon: '🏠', desc: 'Full mortgage calculator with down payment' },
    { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', desc: 'Avalanche vs snowball debt payoff' },
    { name: 'Compound Interest Calculator', href: '/calculators/finance/compound-interest-calculator', icon: '💰', desc: 'Understand loan compounding' },
    { name: 'Savings Goal Calculator', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', desc: 'Save for loan down payment' },
    { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '⚖️', desc: 'Track loan vs assets' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'What is an EMI?', answer: 'EMI (Equated Monthly Installment) is a fixed monthly payment made by a borrower to a lender. It consists of two parts: principal repayment and interest. The ratio of interest to principal changes each month — early EMIs are mostly interest; later EMIs are mostly principal.' },
  { question: 'How is EMI calculated?', answer: 'EMI = P × r × (1+r)^n / ((1+r)^n - 1). Where P = loan principal, r = monthly interest rate (annual rate / 12 / 100), n = loan tenure in months.' },
  { question: 'Does prepaying a loan reduce EMI or tenure?', answer: 'Most lenders offer both options. Reducing tenure saves more total interest. Reducing EMI improves monthly cash flow. Use our Loan Prepayment Calculator to compare both scenarios.' },
  { question: 'What is the ideal EMI to income ratio?', answer: 'Financial advisors recommend keeping total EMIs (all loans combined) below 40-50% of monthly take-home income. Home loan EMI alone should ideally be under 30-35% of income.' },
  { question: 'What is an amortization schedule?', answer: 'An amortization schedule shows the month-by-month breakdown of each EMI payment — how much goes to interest and how much reduces the principal. Our calculator generates the full schedule automatically.' },
]

export default function Page() {
  return (
    <EMICalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'EMI Calculator — Free Loan EMI Calculator with Amortization Schedule', description: 'Calculate monthly EMI for any loan. Get complete amortization schedule, total interest, and payment breakdown charts. Supports home, car, personal loans.', url: 'https://finanacecalculator.com/calculators/finance/emi-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'EMI Calculator', url: '/calculators/finance/emi-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='emi-calculator-complete-guide-understand-home-car-personal-loans'
    />
  )
}
