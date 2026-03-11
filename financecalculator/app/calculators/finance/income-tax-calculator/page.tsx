import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Income Tax Calculator FY 2026-27 — New vs Old Regime Tax Comparison India',
  description: 'Calculate income tax for FY 2026-27 (AY 2027-28). Compare New Tax Regime vs Old Tax Regime. Slab-wise tax breakdown, effective rate, net in-hand salary. Free India income tax calculator.',
  slug: 'income-tax-calculator',
  category: 'finance',
  keywords: ['income tax calculator India 2026', 'new tax regime calculator', 'old tax regime calculator', 'income tax calculator FY 2026-27', 'AY 2027-28 tax calculator', 'slab rate tax calculator', 'income tax comparison calculator India'],
})

const faqs = [
  { question: 'New vs Old tax regime — which is better in 2026?', answer: 'New regime wins for incomes below ₹15L if you have few deductions. Old regime wins if you have significant 80C (₹1.5L), HRA, home loan interest, and health insurance deductions. Our calculator compares both and shows which saves more tax for your specific situation.' },
  { question: 'What is the standard deduction in the new regime?', answer: 'Under the new tax regime (FY 2026-27), the standard deduction is ₹75,000 for salaried employees and pensioners. Under the old regime, it remains ₹50,000.' },
  { question: 'What are the new tax regime slabs for FY 2026-27?', answer: 'New regime: 0% up to ₹4L, 5% for ₹4-8L, 10% for ₹8-12L, 15% for ₹12-16L, 20% for ₹16-20L, 25% for ₹20-24L, 30% above ₹24L. Plus 4% health & education cess on tax amount.' },
  { question: 'What is health & education cess?', answer: 'A 4% cess is applied on total income tax + surcharge to fund health and education initiatives. This is mandatory for all taxpayers. For example, if your tax is ₹1,00,000, cess = ₹4,000, total payable = ₹1,04,000.' },
  { question: 'When is surcharge applicable?', answer: 'Surcharge is levied on total income tax: 10% surcharge if taxable income is ₹50L-₹1Cr, and 15% if above ₹1Cr (under new regime). This significantly increases the tax burden for high earners.' },
]

const relatedCalculators = [
  { name: "Salary Calculator", href: "/calculators/finance/salary-calculator", icon: "💼", desc: "CTC to in-hand salary breakdown" },
    { name: "HRA Calculator", href: "/calculators/finance/hra-calculator", icon: "🏠", desc: "HRA tax exemption" },
    { name: "PPF Calculator", href: "/calculators/finance/ppf-calculator", icon: "🏛️", desc: "PPF for 80C deduction" }
]

const structuredData = [
  generateFAQStructuredData(faqs),
  generateWebAppStructuredData({
    name: 'Income Tax Calculator',
    description: 'Calculate income tax for FY 2026-27 (AY 2027-28). Compare New Tax Regime vs Old Tax Regime. Slab-wise tax breakdown, effective rate, net in-hand salary. Free India income tax calculator.',
    url: 'https://finanacecalculator.com/calculators/finance/income-tax-calculator',
    category: 'FinanceApplication',
  }),
  generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Finance Calculators', url: '/calculators/finance' },
    { name: 'Income Tax Calculator', url: '/calculators/finance/income-tax-calculator' },
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
