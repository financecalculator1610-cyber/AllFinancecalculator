import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'CAGR Calculator — Compound Annual Growth Rate with Charts',
  description: 'Calculate CAGR of any investment. See year-wise growth, Rule of 72, and compare different growth rate scenarios with interactive charts.',
  slug: 'cagr-calculator',
  category: 'finance',
  keywords: ['CAGR calculator', 'compound annual growth rate', 'investment return calculator', 'rule of 72', 'CAGR formula'],
})

const relatedCalculators = [
    { name: 'Compound Interest Calculator', href: '/calculators/finance/compound-interest-calculator', icon: '💰', desc: 'Full compound interest breakdown' },
    { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈', desc: 'Monthly SIP returns' },
    { name: 'Lumpsum Calculator', href: '/calculators/finance/lumpsum-calculator', icon: '💼', desc: 'One-time investment growth' },
    { name: 'Mutual Fund Calculator', href: '/calculators/finance/mutual-fund-calculator', icon: '📊', desc: 'Expense ratio adjusted returns' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'What is CAGR?', answer: 'CAGR (Compound Annual Growth Rate) is the rate at which an investment grows from its initial value to its final value, assuming profits are reinvested each year. It smooths out volatile annual returns to give a single representative rate.' },
  { question: 'CAGR formula?', answer: 'CAGR = (Final Value / Initial Value)^(1/Years) - 1. Example: Investment of $10,000 grows to $19,500 in 7 years. CAGR = (19,500/10,000)^(1/7) - 1 = 10.0% per year.' },
  { question: 'CAGR vs XIRR — what is the difference?', answer: 'CAGR assumes a single lump-sum investment. XIRR handles multiple cashflows on different dates (like SIPs). For a mutual fund SIP, XIRR gives your true annualized return; CAGR would be misleading because not all money was invested at the same time.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'CAGR Calculator — Compound Annual Growth Rate with Charts', description: 'Calculate CAGR of any investment. See year-wise growth, Rule of 72, and compare different growth rate scenarios with interactive charts.', url: 'https://finanacecalculator.com/calculators/finance/cagr-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'CAGR Calculator', url: '/calculators/finance/cagr-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='compound-interest-guide-eighth-wonder-of-the-world'
    />
  )
}
