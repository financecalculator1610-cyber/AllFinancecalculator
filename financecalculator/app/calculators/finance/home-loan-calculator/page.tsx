import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Home Loan Calculator — Mortgage EMI, Amortization & Total Cost',
  description: 'Calculate home loan / mortgage EMI with down payment analysis. See total interest, complete amortization schedule, and compare 15 vs 30 year mortgages.',
  slug: 'home-loan-calculator',
  category: 'finance',
  keywords: ['home loan calculator', 'mortgage calculator', 'home loan EMI calculator', 'mortgage payment calculator', 'home loan interest calculator'],
})

const relatedCalculators = [
    { name: 'EMI Calculator', href: '/calculators/finance/emi-calculator', icon: '🏦', desc: 'General EMI for any loan' },
    { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', desc: 'Pay off mortgage faster' },
    { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '⚖️', desc: 'Home equity vs mortgage balance' },
    { name: 'Savings Goal Calculator', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', desc: 'Save for down payment' },
    { name: 'Inflation Calculator', href: '/calculators/finance/inflation-calculator', icon: '📊', desc: 'Real cost of housing over time' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'How does a home loan / mortgage work?', answer: 'A home loan is a long-term loan secured against your property. You borrow a lump sum from a bank and repay it in monthly EMIs over 15-30 years. The bank holds the property title until the loan is fully repaid.' },
  { question: 'What is a good home loan interest rate in 2026?', answer: 'In India (2026): 8.5-9.5% for most banks. In the US (2026): Check current 30-year fixed mortgage rates. Even a 0.5% rate difference can save lakhs/thousands over the full tenure — always compare multiple lenders.' },
  { question: 'How much home loan can I get?', answer: 'Banks typically lend 75-90% of the property value (Loan to Value ratio). Your EMI should not exceed 40-50% of your monthly income. Use our calculator to find the maximum loan your income supports.' },
  { question: 'Should I choose 20-year or 30-year home loan tenure?', answer: 'Longer tenure means lower EMI but far more total interest paid. Example: ₹50L at 9% for 20 years = EMI ₹45,000, total interest ₹58L. For 30 years = EMI ₹40,200, total interest ₹95L. If you can afford higher EMI, choose shorter tenure.' },
  { question: 'What is the benefit of home loan prepayment?', answer: 'Prepaying home loan principal reduces your outstanding balance, cutting future interest significantly. Even one extra EMI per year can cut tenure by 2-3 years. Use our Loan Prepayment Calculator to see exact savings.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Home Loan Calculator — Mortgage EMI, Amortization & Total Cost', description: 'Calculate home loan / mortgage EMI with down payment analysis. See total interest, complete amortization schedule, and compare 15 vs 30 year mortgages.', url: 'https://finanacecalculator.com/calculators/finance/home-loan-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'Home Loan Calculator', url: '/calculators/finance/home-loan-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='home-loan-mortgage-guide-how-to-get-best-rate'
    />
  )
}
