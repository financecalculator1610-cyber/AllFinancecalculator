import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import SIPCalculatorClient from './SIPCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'SIP Calculator — Free Systematic Investment Plan Calculator with Charts',
  description: 'Calculate SIP returns with interactive charts. See maturity value, wealth gain, year-wise breakdown. Supports USD, INR, EUR. Free SIP calculator online.',
  slug: 'sip-calculator',
  category: 'finance',
  keywords: ['SIP calculator', 'systematic investment plan calculator', 'SIP return calculator', 'SIP investment calculator online free', 'monthly SIP calculator 2025'],
})

const faqs = [
  { question: 'What is a SIP Calculator?', answer: 'A SIP (Systematic Investment Plan) calculator estimates the future value of regular monthly investments at a given expected annual return. It uses the future value of annuity formula to show total invested amount, expected returns, and maturity value.' },
  { question: 'How is SIP return calculated?', answer: 'SIP return formula: M = P × { [1+i]^n − 1 } / i × (1+i). Where M = maturity amount, P = monthly investment, i = monthly rate (annual rate/12/100), n = total months. Our calculator applies this formula for each year.' },
  { question: 'What is the minimum SIP amount?', answer: 'In India, minimum SIP is ₹500/month in most mutual funds. In the US, minimum varies by fund — Fidelity allows $1/month, Vanguard requires $1/month for ETF SIPs. There is no universal minimum.' },
  { question: 'Is 12% return realistic for SIP?', answer: 'Historical equity market returns: US S&P 500 averages 10-12% annually over long periods. Indian Nifty 50 has averaged 12-14%. However, returns are not guaranteed and vary year to year. Use 8-10% for conservative estimates.' },
  { question: 'SIP vs Lumpsum: which is better?', answer: 'SIP is better when: markets are volatile, you have regular income, you want to avoid timing risk. Lumpsum is better when: markets have just fallen significantly, you have a large sum to invest, you have long time horizon and conviction.' },
  { question: 'Can I change my SIP amount?', answer: 'Yes. Most mutual fund platforms let you pause, increase, decrease, or stop SIP anytime. A popular strategy is Step-Up SIP — increasing your monthly SIP by 10% annually to match salary growth.' },
  { question: 'What happens to SIP during market crashes?', answer: 'Continue your SIP during crashes. This is actually the best time to invest — you buy more units at lower prices (rupee/dollar cost averaging). Studies show investors who continued SIPs through 2008 and 2020 crashes outperformed those who stopped.' },
  { question: 'How does SIP calculator help in financial planning?', answer: 'SIP calculator shows you exactly how much to invest monthly to reach specific financial goals (retirement, home down payment, education). Enter your goal amount and timeline to back-calculate the required monthly SIP.' },
]

const relatedCalculators = [
  { name: 'Lumpsum Calculator', href: '/calculators/finance/lumpsum-calculator', icon: '💼', desc: 'Compare one-time investment vs monthly SIP' },
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🌅', desc: 'Plan monthly SIP for retirement corpus' },
  { name: 'Compound Interest Calculator', href: '/calculators/finance/compound-interest-calculator', icon: '💰', desc: 'Understand the compounding behind SIP returns' },
  { name: 'Savings Goal Calculator', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', desc: 'Find SIP needed for a specific goal' },
  { name: 'Inflation Calculator', href: '/calculators/finance/inflation-calculator', icon: '📊', desc: 'Adjust your SIP goal for future inflation' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '⚖️', desc: 'Track how SIP investments grow your net worth' },
]

export default function Page() {
  return (
    <SIPCalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'SIP Calculator', description: 'Free SIP return calculator with charts', url: 'https://finanacecalculator.com/calculators/finance/sip-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'SIP Calculator', url: '/calculators/finance/sip-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug="sip-calculator-guide-how-to-grow-wealth-with-systematic-investment"
    />
  )
}
