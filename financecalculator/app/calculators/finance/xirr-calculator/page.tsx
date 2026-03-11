import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'XIRR Calculator — True Returns for Irregular Cashflows',
  description: 'Calculate XIRR (Extended Internal Rate of Return) for SIP investments, mutual fund portfolios, and any investment with irregular cashflows.',
  slug: 'xirr-calculator',
  category: 'finance',
  keywords: ['XIRR calculator', 'XIRR formula calculator', 'mutual fund XIRR', 'SIP XIRR', 'how to calculate XIRR'],
})

const relatedCalculators = [
    { name: 'CAGR Calculator', href: '/calculators/finance/cagr-calculator', icon: '📈', desc: 'CAGR for lumpsum investments' },
    { name: 'Mutual Fund Calculator', href: '/calculators/finance/mutual-fund-calculator', icon: '📊', desc: 'Expense ratio adjusted returns' },
    { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈', desc: 'Regular SIP planning' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'What is XIRR?', answer: 'XIRR (Extended Internal Rate of Return) calculates the annualized return for investments with irregular cashflows on different dates. It\'s the industry-standard metric for measuring true mutual fund SIP returns, unlike CAGR which only works for single lump-sum investments.' },
  { question: 'How to calculate XIRR in Excel vs this calculator?', answer: 'In Excel: =XIRR(cashflows_range, dates_range). This calculator works the same way — enter each cashflow with its date (negative for investments, positive for redemptions) and it computes the same result instantly without Excel.' },
  { question: 'What is a good XIRR for mutual fund SIP?', answer: 'For Indian equity mutual funds: XIRR of 12-16% over 10+ years is considered good. 8-12% is average. Below 8% is below inflation-adjusted break-even in many scenarios. For US index funds, 10-14% XIRR over 10+ years is typical.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'XIRR Calculator — True Returns for Irregular Cashflows', description: 'Calculate XIRR (Extended Internal Rate of Return) for SIP investments, mutual fund portfolios, and any investment with irregular cashflows.', url: 'https://finanacecalculator.com/calculators/finance/xirr-calculator', category: 'FinancialApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Finance Calculators', url: '/calculators/finance' }, { name: 'XIRR Calculator', url: '/calculators/finance/xirr-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='sip-calculator-guide-how-to-grow-wealth-with-systematic-investment'
    />
  )
}
