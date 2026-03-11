import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'RD Calculator — Recurring Deposit Maturity & Interest Calculator',
  description: 'Calculate Recurring Deposit maturity amount and interest earned. Track monthly contributions with quarterly growth charts.',
  slug: 'rd-calculator',
  category: 'finance',
  keywords: ['RD calculator', 'recurring deposit calculator', 'RD maturity calculator', 'recurring deposit interest', 'RD returns'],
})

const relatedCalculators = [
    { name: 'FD Calculator', href: '/calculators/finance/fd-calculator', icon: '🏛️', desc: 'Fixed deposit lumpsum calculator' },
    { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈', desc: 'RD vs SIP comparison' },
    { name: 'Compound Interest Calculator', href: '/calculators/finance/compound-interest-calculator', icon: '💰', desc: 'Compounding at different frequencies' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'What is a Recurring Deposit (RD)?', answer: 'An RD is a savings scheme where you deposit a fixed amount every month for a fixed period. The bank pays interest (compounded quarterly in India) on accumulated deposits. It\'s like a forced savings plan with FD-like safety.' },
  { question: 'How is RD interest calculated?', answer: 'RD uses the compound interest formula applied to each monthly installment for its remaining tenure. For a 24-month RD, the first installment earns interest for 24 months, the second for 23 months, and so on.' },
  { question: 'RD vs SIP — what\'s the difference?', answer: 'RD offers guaranteed returns (6-7.5% in India) with zero risk. SIP in equity mutual funds offers potentially higher returns (10-14% historically) with market risk. RD is better for short-term goals; SIP for long-term wealth creation.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'RD Calculator — Recurring Deposit Maturity & Interest Calculator', description: 'Calculate Recurring Deposit maturity amount and interest earned. Track monthly contributions with quarterly growth charts.', url: 'https://finanacecalculator.com/calculators/finance/rd-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'RD Calculator', url: '/calculators/finance/rd-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='compound-interest-guide-eighth-wonder-of-the-world'
    />
  )
}
