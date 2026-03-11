import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'PPF Calculator 2026 — Public Provident Fund Maturity, Interest & Tax Benefits',
  description: 'Calculate PPF maturity amount with year-wise compounding. See total interest earned, tax benefits under Section 80C, and EEE (Exempt-Exempt-Exempt) status. Current rate: 7.1%.',
  slug: 'ppf-calculator',
  category: 'finance',
  keywords: ['PPF calculator', 'public provident fund calculator', 'PPF maturity calculator', 'PPF interest calculator 2026', 'PPF 80C calculator', 'PPF vs FD calculator'],
})

const faqs = [
  { question: 'What is PPF and why is it popular?', answer: 'PPF (Public Provident Fund) is a government-backed long-term savings scheme offering guaranteed returns (currently 7.1% p.a.) with complete tax exemption on deposit, interest, and maturity — called EEE (Exempt-Exempt-Exempt) status. It\'s one of the safest investments in India.' },
  { question: 'What is the PPF interest rate in 2026?', answer: 'The PPF interest rate for 2026 is 7.1% per annum, compounded annually. The rate is reviewed quarterly by the government but has been stable at 7.1% since April 2020.' },
  { question: 'What is the PPF tenure and can it be extended?', answer: 'The minimum PPF tenure is 15 years. After maturity, you can extend in 5-year blocks with or without fresh deposits. You can make partial withdrawals from Year 7 onwards (up to 50% of balance at the end of 4th preceding year).' },
  { question: 'What is the maximum PPF deposit limit?', answer: 'Maximum ₹1.5 lakh per financial year per PPF account. Minimum ₹500 per year. You can make up to 12 deposits per year. Deposits above ₹1.5L do not earn interest and are returned without interest.' },
  { question: 'Can I open multiple PPF accounts?', answer: 'No. You can have only one PPF account in your name (either in a post office or nationalized bank). You can open a separate account in the name of a minor child, with a combined limit of ₹1.5L across both accounts.' },
]

const relatedCalculators = [
  { name: "FD Calculator", href: "/calculators/finance/fd-calculator", icon: "🏦", desc: "Compare PPF with FD returns" },
    { name: "SIP Calculator", href: "/calculators/finance/sip-calculator", icon: "📈", desc: "Compare PPF with equity SIP" },
    { name: "NPS Calculator", href: "/calculators/finance/nps-calculator", icon: "👴", desc: "National Pension System calculator" }
]

const structuredData = [
  generateFAQStructuredData(faqs),
  generateWebAppStructuredData({
    name: 'PPF Calculator',
    description: 'Calculate PPF maturity amount with year-wise compounding. See total interest earned, tax benefits under Section 80C, and EEE (Exempt-Exempt-Exempt) status. Current rate: 7.1%.',
    url: 'https://finanacecalculator.com/calculators/finance/ppf-calculator',
    category: 'FinanceApplication',
  }),
  generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Finance Calculators', url: '/calculators/finance' },
    { name: 'PPF Calculator', url: '/calculators/finance/ppf-calculator' },
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
