import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'GST Calculator 2026 — Calculate GST Inclusive & Exclusive, CGST SGST IGST',
  description: 'Free GST calculator for India. Calculate GST-exclusive (add GST) and GST-inclusive amounts. Get CGST, SGST, IGST breakdown for 5%, 12%, 18%, 28% rates. Instant results.',
  slug: 'gst-calculator',
  category: 'finance',
  keywords: ['GST calculator', 'GST calculator India', 'CGST SGST calculator', 'IGST calculator', 'GST inclusive exclusive calculator', '18% GST calculator', 'goods services tax calculator 2026'],
})

const faqs = [
  { question: 'What is GST?', answer: 'GST (Goods and Services Tax) is India\'s unified indirect tax that replaced multiple taxes (VAT, service tax, excise duty). It has 4 main rates: 5% (essential goods), 12% (standard goods), 18% (most services), 28% (luxury items).' },
  { question: 'What is the difference between CGST, SGST, and IGST?', answer: 'CGST (Central GST) + SGST (State GST) are applied on intra-state transactions, each at half the GST rate. IGST (Integrated GST) at the full rate is applied on inter-state transactions. The total tax burden is the same in both cases.' },
  { question: 'How to calculate GST on a price?', answer: 'GST-Exclusive (add GST): Total = Price × (1 + GST%/100). GST-Inclusive (extract GST): Original Price = Total / (1 + GST%/100). Our calculator handles both instantly.' },
  { question: 'What goods attract 0% GST?', answer: 'Essential items like fresh fruits, vegetables, milk, eggs, bread, and unprocessed cereals are exempt from GST (0% rate). Healthcare services and educational services are also generally exempt.' },
  { question: 'How is GST different from VAT?', answer: 'VAT was a state-level tax with different rates across states, causing cascading tax effects. GST replaced all of this with a single national rate per category, eliminating tax-on-tax and simplifying compliance significantly.' },
]

const relatedCalculators = [
  { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "🏛️", desc: "Calculate income tax liability" },
    { name: "Salary Calculator", href: "/calculators/finance/salary-calculator", icon: "💼", desc: "CTC to in-hand salary" },
    { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator", icon: "📐", desc: "Calculate simple interest" }
]

const structuredData = [
  generateFAQStructuredData(faqs),
  generateWebAppStructuredData({
    name: 'GST Calculator',
    description: 'Free GST calculator for India. Calculate GST-exclusive (add GST) and GST-inclusive amounts. Get CGST, SGST, IGST breakdown for 5%, 12%, 18%, 28% rates. Instant results.',
    url: 'https://finanacecalculator.com/calculators/finance/gst-calculator',
    category: 'FinanceApplication',
  }),
  generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Finance Calculators', url: '/calculators/finance' },
    { name: 'GST Calculator', url: '/calculators/finance/gst-calculator' },
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
