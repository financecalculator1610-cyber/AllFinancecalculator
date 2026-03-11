import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Simple Interest Calculator 2026 — SI Formula, Amount & Comparison with CI',
  description: 'Calculate simple interest using the SI formula. Compare simple interest vs compound interest growth over time. Free online simple interest calculator with year-wise table.',
  slug: 'simple-interest-calculator',
  category: 'finance',
  keywords: ['simple interest calculator', 'SI calculator', 'simple interest formula calculator', 'simple vs compound interest calculator', 'SI CI calculator', 'calculate simple interest online 2026'],
})

const faqs = [
  { question: 'What is the simple interest formula?', answer: 'Simple Interest (SI) = Principal (P) × Rate (R) × Time (T) / 100. Total Amount = P + SI. Example: ₹1,00,000 at 8% for 3 years: SI = 1,00,000 × 8 × 3 / 100 = ₹24,000. Total = ₹1,24,000.' },
  { question: 'What is the difference between simple and compound interest?', answer: 'Simple interest is calculated only on the original principal. Compound interest is calculated on principal + accumulated interest. Over time, compound interest grows exponentially while simple interest grows linearly. This is why compound interest builds significantly more wealth for long-term investments.' },
  { question: 'Where is simple interest used in real life?', answer: 'Simple interest is used in: short-term personal loans, some fixed deposits with simple interest payout, car loans (in some countries), government bonds, and educational loans. Most long-term investments and bank deposits use compound interest.' },
  { question: 'Is simple interest better for borrowers?', answer: 'Yes, from a borrower\'s perspective, simple interest is better because you pay less total interest. From an investor\'s perspective, compound interest is better because your money grows faster.' },
]

const relatedCalculators = [
  { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "💰", desc: "Calculate compound interest" },
    { name: "FD Calculator", href: "/calculators/finance/fd-calculator", icon: "🏦", desc: "FD uses compound interest" },
    { name: "EMI Calculator", href: "/calculators/finance/emi-calculator", icon: "🏦", desc: "Loan interest calculation" }
]

const structuredData = [
  generateFAQStructuredData(faqs),
  generateWebAppStructuredData({
    name: 'Simple Interest Calculator',
    description: 'Calculate simple interest using the SI formula. Compare simple interest vs compound interest growth over time. Free online simple interest calculator with year-wise table.',
    url: 'https://finanacecalculator.com/calculators/finance/simple-interest-calculator',
    category: 'FinanceApplication',
  }),
  generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Finance Calculators', url: '/calculators/finance' },
    { name: 'Simple Interest Calculator', url: '/calculators/finance/simple-interest-calculator' },
  ]),
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={structuredData}
      relatedCalculators={relatedCalculators}
      blogSlug="fd-vs-rd-vs-sip-best-investment-for-2026"
    />
  )
}
