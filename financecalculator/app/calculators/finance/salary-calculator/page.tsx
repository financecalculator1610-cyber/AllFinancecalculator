import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'CTC to In-Hand Salary Calculator 2026 — Take-Home Pay Breakdown India',
  description: 'Calculate in-hand monthly salary from CTC. Breakdown of basic, HRA, PF, TDS, professional tax. Free CTC salary calculator for India with annual and monthly breakdown.',
  slug: 'salary-calculator',
  category: 'finance',
  keywords: ['salary calculator India', 'CTC to in-hand salary calculator', 'take home salary calculator', 'salary breakup calculator', 'PF TDS salary deduction calculator', 'net salary calculator India 2026'],
})

const faqs = [
  { question: 'What is CTC and how is it different from in-hand salary?', answer: 'CTC (Cost to Company) is the total annual expense an employer incurs for an employee, including: basic salary, HRA, allowances, employer PF contribution, gratuity provision, and any other benefits. In-hand salary is what you actually receive after deducting employee PF, professional tax, and TDS (income tax). Typical in-hand is 70-80% of CTC.' },
  { question: 'What deductions are made from salary?', answer: 'Key deductions: Employee PF (12% of basic, max ₹1,800/month), Professional Tax (₹200/month in most states), TDS/Income Tax (based on annual tax liability). Optional: health insurance, NPS contribution, loan EMIs. After all deductions, the remainder is net in-hand salary.' },
  { question: 'What percentage of CTC is basic salary?', answer: 'Basic salary is typically 40-50% of CTC. Higher basic = higher PF contribution and higher HRA (since HRA is a % of basic), but also higher taxable income. Some companies keep basic low to reduce PF liability. Negotiate basic salary carefully as it affects all other components.' },
  { question: 'How is TDS calculated on salary?', answer: 'TDS is deducted monthly as: (Annual estimated tax / 12). Your employer calculates your full year\'s tax based on projected income and deductions, then deducts 1/12th each month. Submit Form 12BB to your employer declaring all deductions to avoid excess TDS.' },
]

const relatedCalculators = [
  { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "🏛️", desc: "Detailed income tax breakdown" },
    { name: "HRA Calculator", href: "/calculators/finance/hra-calculator", icon: "🏠", desc: "HRA exemption from salary" },
    { name: "Gratuity Calculator", href: "/calculators/finance/gratuity-calculator", icon: "🤝", desc: "Gratuity on resignation/retirement" }
]

const structuredData = [
  generateFAQStructuredData(faqs),
  generateWebAppStructuredData({
    name: 'Salary / CTC Calculator',
    description: 'Calculate in-hand monthly salary from CTC. Breakdown of basic, HRA, PF, TDS, professional tax. Free CTC salary calculator for India with annual and monthly breakdown.',
    url: 'https://finanacecalculator.com/calculators/finance/salary-calculator',
    category: 'FinanceApplication',
  }),
  generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Finance Calculators', url: '/calculators/finance' },
    { name: 'Salary / CTC Calculator', url: '/calculators/finance/salary-calculator' },
  ]),
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={structuredData}
      relatedCalculators={relatedCalculators}
      blogSlug="sip-calculator-guide-how-to-grow-wealth-with-systematic-investment"
    />
  )
}
