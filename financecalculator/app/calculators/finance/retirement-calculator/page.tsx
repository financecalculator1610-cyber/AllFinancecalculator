import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Retirement Calculator — How Much Do You Need to Retire?',
  description: 'Calculate your retirement corpus using the 4% rule. Find required monthly SIP, see inflation-adjusted projections, and retirement readiness score.',
  slug: 'retirement-calculator',
  category: 'finance',
  keywords: ['retirement calculator', 'retirement corpus calculator', 'how much to retire', 'retirement planning calculator 2025', '4% rule calculator'],
})

const relatedCalculators = [
    { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈', desc: 'Monthly SIP for retirement goal' },
    { name: 'Inflation Calculator', href: '/calculators/finance/inflation-calculator', icon: '📊', desc: 'Inflation impact on retirement corpus' },
    { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '⚖️', desc: 'Track retirement readiness' },
    { name: 'Savings Goal Calculator', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', desc: 'Savings required by retirement date' },
    { name: 'Lumpsum Calculator', href: '/calculators/finance/lumpsum-calculator', icon: '💼', desc: 'Lumpsum investment for retirement' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'How much do I need to retire comfortably?', answer: 'A common rule is the \'25x rule\' — save 25 times your annual expenses. With ₹60,000/month expenses (₹7.2L/year), you need ₹1.8 crore. Adjust for inflation: if you\'re 30 years away, you\'ll need 5-6x more. Our calculator does this automatically.' },
  { question: 'What is the 4% withdrawal rule?', answer: 'The 4% rule states you can withdraw 4% of your portfolio annually in retirement without running out of money over 30 years. This means a ₹2 crore ($250,000) corpus supports ₹8 lakhs ($10,000) annual withdrawal adjusted for inflation.' },
  { question: 'What return rate should I assume for retirement planning?', answer: 'For long-horizon planning (20+ years): 10-12% for equity SIP (India/US historical average). 7-8% for balanced portfolio (60% equity, 40% debt). 5-6% for conservative portfolio. Always run scenarios at lower rates to be safe.' },
  { question: 'How does inflation affect retirement planning?', answer: 'Critical impact: ₹50,000/month expenses today will need ₹1.6 lakh/month in 20 years at 6% inflation. Our retirement calculator factors in inflation so your corpus target is realistic.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Retirement Calculator — How Much Do You Need to Retire?', description: 'Calculate your retirement corpus using the 4% rule. Find required monthly SIP, see inflation-adjusted projections, and retirement readiness score.', url: 'https://finanacecalculator.com/calculators/finance/retirement-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'Retirement Calculator', url: '/calculators/finance/retirement-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='retirement-planning-guide-how-much-do-you-need-to-retire'
    />
  )
}
