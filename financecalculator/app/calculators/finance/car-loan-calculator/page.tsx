import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Car Loan Calculator — Auto Loan EMI & Total Interest',
  description: 'Calculate car/auto loan monthly EMI, total interest, and complete amortization schedule. Compare financing options easily.',
  slug: 'car-loan-calculator',
  category: 'finance',
  keywords: ['car loan calculator', 'auto loan calculator', 'car loan EMI calculator', 'car financing calculator', 'vehicle loan calculator'],
})

const relatedCalculators = [
    { name: 'Personal Loan Calculator', href: '/calculators/finance/personal-loan-calculator', icon: '💳', desc: 'Personal loan EMI' },
    { name: 'EMI Calculator', href: '/calculators/finance/emi-calculator', icon: '🏦', desc: 'General loan EMI' },
    { name: 'Loan Prepayment Calculator', href: '/calculators/finance/loan-prepayment-calculator', icon: '💰', desc: 'Save interest by prepaying' },
    { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', desc: 'Avalanche vs snowball payoff' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'How much car loan can I afford?', answer: 'A general rule: car loan EMI should not exceed 10-15% of monthly take-home income. Total vehicle cost (loan + insurance + fuel + maintenance) should be under 20% of income. Never stretch EMI to the maximum the bank offers.' },
  { question: 'What is a good car loan interest rate?', answer: 'India (2026): New car loans: 8.5-11%. Used car loans: 12-16%. US (2026): New car loans: 6-9%. Credit score significantly affects your rate — a 750+ CIBIL/credit score gets better rates.' },
  { question: 'Should I make a bigger down payment on a car loan?', answer: 'Yes, always. Every extra rupee/dollar in down payment reduces principal, which reduces total interest paid significantly. Aim for 20-30% down payment minimum. It also reduces your EMI and improves loan approval chances.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Car Loan Calculator — Auto Loan EMI & Total Interest', description: 'Calculate car/auto loan monthly EMI, total interest, and complete amortization schedule. Compare financing options easily.', url: 'https://finanacecalculator.com/calculators/finance/car-loan-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'Car Loan Calculator', url: '/calculators/finance/car-loan-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='emi-calculator-complete-guide-understand-home-car-personal-loans'
    />
  )
}
