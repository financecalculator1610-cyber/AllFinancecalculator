import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'SWP Calculator — Systematic Withdrawal Plan Calculator',
  description: 'Calculate how long your corpus lasts with Systematic Withdrawal Plan. See total withdrawals, interest earned, and remaining balance over time.',
  slug: 'swp-calculator',
  category: 'finance',
  keywords: ['SWP calculator', 'systematic withdrawal plan', 'corpus withdrawal calculator', 'retirement withdrawal', 'SWP returns'],
})

const relatedCalculators = [
    { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🌅', desc: 'Build your retirement corpus' },
    { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈', desc: "SWP's counterpart — SIP investing" },
    { name: 'Compound Interest Calculator', href: '/calculators/finance/compound-interest-calculator', icon: '💰', desc: 'Growth rate of remaining corpus' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'What is SWP (Systematic Withdrawal Plan)?', answer: 'SWP lets you withdraw a fixed amount monthly from your mutual fund investment while the remaining corpus continues to earn returns. It\'s the withdrawal counterpart of SIP — ideal for creating regular retirement income from a lump-sum corpus.' },
  { question: 'How long will my retirement corpus last with SWP?', answer: 'It depends on withdrawal rate vs return rate. If your corpus earns 10% annually and you withdraw 8% annually, the corpus actually grows. If you withdraw more than you earn, the corpus depletes over time. Use our calculator to find the exact timeline.' },
  { question: 'What is a safe SWP withdrawal rate?', answer: 'The \'4% rule\' suggests 4% annual withdrawal is sustainable for 30 years. For Indian investors with higher inflation, 3-3.5% may be safer. Our SWP calculator shows exact corpus balance at each year.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'SWP Calculator — Systematic Withdrawal Plan Calculator', description: 'Calculate how long your corpus lasts with Systematic Withdrawal Plan. See total withdrawals, interest earned, and remaining balance over time.', url: 'https://finanacecalculator.com/calculators/finance/swp-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'SWP Calculator', url: '/calculators/finance/swp-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='retirement-planning-guide-how-much-do-you-need-to-retire'
    />
  )
}
