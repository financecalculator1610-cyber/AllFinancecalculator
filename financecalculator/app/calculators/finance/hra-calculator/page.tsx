import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'HRA Calculator 2026 — House Rent Allowance Tax Exemption Calculator',
  description: 'Calculate HRA exemption from income tax. Find the least of 3 conditions: actual HRA, rent minus 10% basic, 50%/40% of basic (metro/non-metro). Free HRA exemption calculator.',
  slug: 'hra-calculator',
  category: 'finance',
  keywords: ['HRA calculator', 'HRA exemption calculator', 'house rent allowance calculator', 'HRA tax exemption India', 'HRA calculator metro non-metro', 'HRA 50% 40% calculator 2026'],
})

const faqs = [
  { question: 'What is HRA exemption and who can claim it?', answer: 'HRA (House Rent Allowance) exemption lets salaried employees deduct part of their HRA from taxable income, reducing tax liability. Only employees who actually pay rent AND receive HRA as part of salary can claim this — self-employed individuals cannot.' },
  { question: 'How is HRA exemption calculated?', answer: 'HRA exemption = Least of: (1) Actual HRA received, (2) Actual rent paid minus 10% of Basic salary, (3) 50% of Basic salary (metro cities) or 40% (non-metro). Our calculator computes all three and shows which is the limiting factor.' },
  { question: 'Which cities are considered metro for HRA?', answer: 'Metro cities for 50% HRA: Delhi, Mumbai, Kolkata, Chennai. All other cities are non-metro at 40%. Note: Bengaluru, Hyderabad, Pune are non-metro for HRA purposes despite being major cities.' },
  { question: 'Can I claim HRA if I pay rent to parents?', answer: 'Yes, you can pay rent to parents and claim HRA exemption, provided: the property is genuinely owned by parents, rent is actually paid (bank transfer evidence), and the parent declares rental income in their own return. Paying rent to spouse is not allowed.' },
  { question: 'What if I pay rent but don\'t receive HRA?', answer: 'Salaried employees without HRA component can claim deduction under Section 80GG (up to ₹5,000/month or 25% of total income, whichever is less), subject to certain conditions. This is less generous than the standard HRA exemption.' },
]

const relatedCalculators = [
  { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "🏛️", desc: "Full income tax with HRA deduction" },
    { name: "Salary Calculator", href: "/calculators/finance/salary-calculator", icon: "💼", desc: "CTC to in-hand salary breakdown" },
    { name: "Home Loan Calculator", href: "/calculators/finance/home-loan-calculator", icon: "🏠", desc: "If you buy vs rent analysis" }
]

const structuredData = [
  generateFAQStructuredData(faqs),
  generateWebAppStructuredData({
    name: 'HRA Calculator',
    description: 'Calculate HRA exemption from income tax. Find the least of 3 conditions: actual HRA, rent minus 10% basic, 50%/40% of basic (metro/non-metro). Free HRA exemption calculator.',
    url: 'https://finanacecalculator.com/calculators/finance/hra-calculator',
    category: 'FinanceApplication',
  }),
  generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Finance Calculators', url: '/calculators/finance' },
    { name: 'HRA Calculator', url: '/calculators/finance/hra-calculator' },
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
