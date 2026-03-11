import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Gratuity Calculator 2026 — Calculate Gratuity Amount for 5, 10, 15+ Years',
  description: 'Free gratuity calculator for employees covered and not covered under the Payment of Gratuity Act. Calculates gratuity amount, tax-free limit, and taxable gratuity.',
  slug: 'gratuity-calculator',
  category: 'finance',
  keywords: ['gratuity calculator', 'gratuity calculator India', 'gratuity formula calculator', 'payment of gratuity act calculator', 'gratuity tax calculator', 'gratuity after 5 years calculator'],
})

const faqs = [
  { question: 'What is gratuity?', answer: 'Gratuity is a lump-sum payment made by an employer to an employee as a token of appreciation for services rendered. It\'s payable upon resignation, retirement, death, or disablement after completing a minimum of 5 years of continuous service.' },
  { question: 'How is gratuity calculated?', answer: 'For employees covered under the Gratuity Act: Gratuity = (Last Basic+DA Salary × 15 × Years of Service) / 26. For others: use 30 instead of 26. The 26 represents working days in a month (excluding Sundays).' },
  { question: 'What is the maximum tax-free gratuity?', answer: 'As of the latest update, gratuity up to ₹20 lakhs is exempt from income tax under Section 10(10) of the Income Tax Act. Any amount above ₹20 lakhs is added to income and taxed at your applicable slab rate.' },
  { question: 'Who is eligible for gratuity?', answer: 'Any employee who has completed 5+ years of continuous service with an employer. For death or disability, the 5-year rule is waived. This applies to all employees — permanent, contract, or seasonal — covered under the Payment of Gratuity Act 1972.' },
  { question: 'Can an employer refuse to pay gratuity?', answer: 'No. Payment of gratuity to eligible employees is a legal obligation under the Payment of Gratuity Act. Non-payment can result in imprisonment of up to 2 years and/or a fine. Gratuity must be paid within 30 days of it becoming due.' },
]

const relatedCalculators = [
  { name: "Salary Calculator", href: "/calculators/finance/salary-calculator", icon: "💼", desc: "Calculate CTC to in-hand salary" },
    { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "🏛️", desc: "Tax on gratuity amount" },
    { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🌅", desc: "Retirement corpus planning" }
]

const structuredData = [
  generateFAQStructuredData(faqs),
  generateWebAppStructuredData({
    name: 'Gratuity Calculator',
    description: 'Free gratuity calculator for employees covered and not covered under the Payment of Gratuity Act. Calculates gratuity amount, tax-free limit, and taxable gratuity.',
    url: 'https://finanacecalculator.com/calculators/finance/gratuity-calculator',
    category: 'FinanceApplication',
  }),
  generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Finance Calculators', url: '/calculators/finance' },
    { name: 'Gratuity Calculator', url: '/calculators/finance/gratuity-calculator' },
  ]),
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={structuredData}
      relatedCalculators={relatedCalculators}
      blogSlug="swp-vs-annuity-best-retirement-income-strategy"
    />
  )
}
