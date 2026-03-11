import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'ROI Calculator 2026 — Return on Investment, Annualized ROI & Net Profit',
  description: 'Calculate ROI (Return on Investment), annualized ROI (CAGR), net profit, and investment multiplier. Compare your investment returns against FD, Nifty 50, and S&P 500 benchmarks.',
  slug: 'roi-calculator',
  category: 'finance',
  keywords: ['ROI calculator', 'return on investment calculator', 'annualized ROI calculator', 'investment return calculator', 'ROI percentage calculator', 'CAGR calculator online', 'investment profit calculator 2026'],
})

const faqs = [
  { question: 'What is ROI and how is it calculated?', answer: 'ROI (Return on Investment) = (Net Profit / Total Cost) × 100. Net Profit = Final Value - Total Cost. Example: Invest ₹1,00,000, get ₹1,75,000 back. ROI = (75,000 / 1,00,000) × 100 = 75%.' },
  { question: 'What is annualized ROI vs total ROI?', answer: 'Total ROI is the overall percentage gain over the entire investment period. Annualized ROI (also called CAGR) converts this to an equivalent per-year rate. For example, 75% total ROI over 3 years = 20.5% annualized ROI. Annualized ROI is more useful for comparing investments of different durations.' },
  { question: 'What is a good ROI for an investment?', answer: 'It depends on the investment type. Good benchmarks: Savings account: 3-4%, FD: 6-7%, Balanced mutual fund: 8-10%, Equity mutual fund: 12-14% (India), US S&P 500 index: 10% historically, Real estate: 8-12%. Higher ROI always comes with higher risk.' },
  { question: 'How does ROI differ from XIRR?', answer: 'ROI assumes a single lump-sum investment and single exit. XIRR handles multiple investments and withdrawals on different dates (like SIPs). For regular investment plans, XIRR gives a more accurate picture of true annualized returns.' },
]

const relatedCalculators = [
  { name: "CAGR Calculator", href: "/calculators/finance/cagr-calculator", icon: "📉", desc: "Compound annual growth rate" },
    { name: "SIP Calculator", href: "/calculators/finance/sip-calculator", icon: "📈", desc: "SIP investment returns" },
    { name: "Mutual Fund Calculator", href: "/calculators/finance/mutual-fund-calculator", icon: "📊", desc: "Net-of-expense MF returns" }
]

const structuredData = [
  generateFAQStructuredData(faqs),
  generateWebAppStructuredData({
    name: 'ROI Calculator',
    description: 'Calculate ROI (Return on Investment), annualized ROI (CAGR), net profit, and investment multiplier. Compare your investment returns against FD, Nifty 50, and S&P 500 benchmarks.',
    url: 'https://finanacecalculator.com/calculators/finance/roi-calculator',
    category: 'FinanceApplication',
  }),
  generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Finance Calculators', url: '/calculators/finance' },
    { name: 'ROI Calculator', url: '/calculators/finance/roi-calculator' },
  ]),
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={structuredData}
      relatedCalculators={relatedCalculators}
      blogSlug="cagr-vs-xirr-which-measures-investment-returns-better"
    />
  )
}
