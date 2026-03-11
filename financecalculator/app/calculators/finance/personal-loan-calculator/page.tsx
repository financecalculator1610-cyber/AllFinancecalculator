import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Personal Loan Calculator — EMI, Total Interest & Amortization',
  description: 'Calculate personal loan monthly EMI and total interest with complete amortization schedule. See the true cost before you borrow.',
  slug: 'personal-loan-calculator',
  category: 'finance',
  keywords: ['personal loan calculator', 'personal loan EMI calculator', 'personal loan interest calculator', 'unsecured loan calculator', 'loan EMI calculator online'],
})

const relatedCalculators = [
    { name: 'Car Loan Calculator', href: '/calculators/finance/car-loan-calculator', icon: '🚗', desc: 'Auto loan EMI' },
    { name: 'EMI Calculator', href: '/calculators/finance/emi-calculator', icon: '🏦', desc: 'General loan EMI calculator' },
    { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', desc: 'Fastest debt payoff strategy' },
    { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '⚖️', desc: 'Loan vs net worth' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'What is the interest rate on personal loans?', answer: 'Personal loans are unsecured (no collateral), so they carry higher rates. India (2026): 10.5-24% depending on credit score and lender. US (2026): 8-36%. A 750+ credit score gets you the best rates. Always compare multiple lenders before taking a personal loan.' },
  { question: 'Is a personal loan better than credit card debt?', answer: 'Almost always yes. Credit card interest rates are 24-48% in India, 15-29% in the US. Personal loan rates are typically 10-18%. Use a personal loan to consolidate and pay off credit card debt — the interest savings are substantial.' },
  { question: 'How does credit score affect personal loan EMI?', answer: 'Your credit/CIBIL score dramatically affects the rate. Example for ₹5L loan: Score 750+ = 11% = EMI ₹10,871. Score 650-700 = 18% = EMI ₹12,710. Score below 650 = may not qualify. The difference: ₹1,839/month = ₹22,068/year.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Personal Loan Calculator — EMI, Total Interest & Amortization', description: 'Calculate personal loan monthly EMI and total interest with complete amortization schedule. See the true cost before you borrow.', url: 'https://finanacecalculator.com/calculators/finance/personal-loan-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'Personal Loan Calculator', url: '/calculators/finance/personal-loan-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='emi-calculator-complete-guide-understand-home-car-personal-loans'
    />
  )
}
