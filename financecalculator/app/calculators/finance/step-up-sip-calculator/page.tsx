import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Step-Up SIP Calculator — Annual Increment SIP Returns',
  description: 'See how increasing SIP by 10% annually boosts final corpus. Compare Step-Up SIP vs flat SIP with year-wise charts.',
  slug: 'step-up-sip-calculator',
  category: 'finance',
  keywords: ['step up SIP calculator', 'increasing SIP calculator', 'step up SIP vs SIP', 'annual increment SIP', 'SIP step up returns'],
})

const relatedCalculators = [
    { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈', desc: 'Regular flat SIP calculator' },
    { name: 'CAGR Calculator', href: '/calculators/finance/cagr-calculator', icon: '📈', desc: 'Annual growth rate of SIP' },
    { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🌅', desc: 'Use step-up SIP for retirement' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'What is a Step-Up SIP?', answer: 'Step-Up SIP (also called Increase SIP) automatically increases your monthly investment by a fixed percentage each year. Example: Start with ₹5,000/month, increase 10% yearly — Year 2 = ₹5,500, Year 3 = ₹6,050, etc. This aligns with typical salary growth.' },
  { question: 'How much more wealth does Step-Up SIP build vs flat SIP?', answer: 'Significantly more. Example: ₹5,000/month flat SIP for 20 years at 12% = ₹49.9L. Same but with 10% annual step-up = ₹1.21 crore. Step-Up SIP builds 2.4x more wealth! The acceleration in later years is powerful.' },
  { question: 'What step-up percentage should I choose?', answer: 'Match your expected annual salary growth. If you expect 8-10% salary hikes, use 8-10% step-up. Even 5% annual step-up on ₹5,000 for 20 years generates ₹75L vs ₹50L with flat SIP — a 50% increase in final corpus.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Step-Up SIP Calculator — Annual Increment SIP Returns', description: 'See how increasing SIP by 10% annually boosts final corpus. Compare Step-Up SIP vs flat SIP with year-wise charts.', url: 'https://finanacecalculator.com/calculators/finance/step-up-sip-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'Step-Up SIP Calculator', url: '/calculators/finance/step-up-sip-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='sip-calculator-guide-how-to-grow-wealth-with-systematic-investment'
    />
  )
}
