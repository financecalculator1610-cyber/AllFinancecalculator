import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import FDCalculatorClient from './FDCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'FD / CD Calculator — Fixed Deposit & Certificate of Deposit Returns',
  description: 'Calculate Fixed Deposit or Certificate of Deposit maturity amount with multiple compounding frequencies, year-wise growth charts, and interest breakdown.',
  slug: 'fd-calculator',
  category: 'finance',
  keywords: ['FD calculator', 'fixed deposit calculator', 'CD calculator', 'certificate of deposit calculator', 'FD maturity calculator'],
})

const relatedCalculators = [
    { name: 'RD Calculator', href: '/calculators/finance/rd-calculator', icon: '🏧', desc: 'Recurring deposit returns' },
    { name: 'Compound Interest Calculator', href: '/calculators/finance/compound-interest-calculator', icon: '💰', desc: 'General compounding calculator' },
    { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈', desc: 'Compare FD vs SIP returns' },
    { name: 'Savings Goal Calculator', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', desc: 'How much FD do you need?' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'What is an FD / CD (Fixed Deposit / Certificate of Deposit)?', answer: 'A Fixed Deposit (India) or Certificate of Deposit (US) is a safe, guaranteed savings instrument where you deposit a lump sum with a bank for a fixed period at a fixed interest rate. At maturity, you receive principal + interest.' },
  { question: 'What compounding frequency gives the best FD returns?', answer: 'Monthly compounding gives the highest effective return for the same stated interest rate. Quarterly compounding is most common for bank FDs in India. Our FD calculator lets you compare all frequencies.' },
  { question: 'Is FD interest taxable?', answer: 'Yes. In India, FD interest is added to your income and taxed at your income slab rate (up to 30%). In the US, CD interest is taxed as ordinary income. This significantly reduces effective returns for high earners — compare with tax-efficient options like mutual funds.' },
  { question: 'Can I break an FD early?', answer: 'Yes, but most banks charge a premature withdrawal penalty (typically 0.5-1% reduction in rate). Some banks offer \'no-penalty\' CDs. Factor this in when choosing FD tenure.' },
  { question: 'FD vs SIP — which is better?', answer: 'FD wins on safety and guaranteed returns. SIP in equity mutual funds has historically outperformed FD significantly over 7+ years (12-14% vs 6-8%). FD is better for short-term goals (1-3 years) or capital you can\'t afford to lose.' },
]

export default function Page() {
  return (
    <FDCalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'FD / CD Calculator — Fixed Deposit & Certificate of Deposit Returns', description: 'Calculate Fixed Deposit or Certificate of Deposit maturity amount with multiple compounding frequencies, year-wise growth charts, and interest breakdown.', url: 'https://finanacecalculator.com/calculators/finance/fd-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'FD / CD Calculator', url: '/calculators/finance/fd-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='compound-interest-guide-eighth-wonder-of-the-world'
    />
  )
}
