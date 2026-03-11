import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CompoundCalculatorClient from './CompoundCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Compound Interest Calculator — See the Power of Compounding',
  description: 'Calculate compound interest with daily, monthly, quarterly, annual compounding. See effective annual rate (EAR), compare frequencies, and growth charts.',
  slug: 'compound-interest-calculator',
  category: 'finance',
  keywords: ['compound interest calculator', 'compound interest formula', 'daily compound interest', 'compound interest vs simple interest', 'EAR calculator'],
})

const relatedCalculators = [
    { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈', desc: 'Regular investment with compounding' },
    { name: 'Lumpsum Calculator', href: '/calculators/finance/lumpsum-calculator', icon: '💼', desc: 'One-time investment growth' },
    { name: 'FD Calculator', href: '/calculators/finance/fd-calculator', icon: '🏛️', desc: 'Fixed deposit / CD returns' },
    { name: 'Inflation Calculator', href: '/calculators/finance/inflation-calculator', icon: '📊', desc: 'Real value after inflation' },
    { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🌅', desc: 'Long-term compounding for retirement' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'What is compound interest?', answer: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. This makes money grow exponentially rather than linearly, which is why Einstein reportedly called it the \'eighth wonder of the world.\'' },
  { question: 'What is the compound interest formula?', answer: 'A = P × (1 + r/n)^(n×t). Where A = final amount, P = principal, r = annual interest rate (decimal), n = compounding frequency per year, t = time in years.' },
  { question: 'Monthly vs annual compounding — which earns more?', answer: 'Monthly compounding earns slightly more than annual compounding. For example, 10% annually with monthly compounding gives an effective annual rate of 10.47%. The more frequent the compounding, the higher the effective return.' },
  { question: 'What is the Rule of 72?', answer: 'The Rule of 72 estimates how many years it takes to double your money: Years to double = 72 / annual interest rate. At 8% interest, money doubles in approximately 9 years (72/8=9).' },
  { question: 'What is CAGR vs simple interest vs compound interest?', answer: 'Simple interest doesn\'t compound (interest on principal only). Compound interest adds accumulated interest to principal. CAGR is the compound annual growth rate — it tells you the equivalent annual growth rate of an investment that went from value A to value B over several years.' },
]

export default function Page() {
  return (
    <CompoundCalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Compound Interest Calculator — See the Power of Compounding', description: 'Calculate compound interest with daily, monthly, quarterly, annual compounding. See effective annual rate (EAR), compare frequencies, and growth charts.', url: 'https://finanacecalculator.com/calculators/finance/compound-interest-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'Compound Interest Calculator', url: '/calculators/finance/compound-interest-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='compound-interest-guide-eighth-wonder-of-the-world'
    />
  )
}
