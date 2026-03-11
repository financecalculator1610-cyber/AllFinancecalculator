import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Currency Converter 2026 — USD to INR, EUR, GBP, JPY & 20 Currencies',
  description: 'Convert between 20+ world currencies including USD, INR, EUR, GBP, JPY, AED, SGD, CAD. Live exchange rates with quick conversion table. Free online currency converter.',
  slug: 'currency-converter',
  category: 'finance',
  keywords: ['currency converter', 'USD to INR calculator', 'dollar to rupee calculator', 'EUR to INR converter', 'live exchange rate calculator', 'free currency converter 2026', 'USD INR EUR GBP JPY converter'],
})

const faqs = [
  { question: 'What is the USD to INR exchange rate in 2026?', answer: 'The USD to INR exchange rate fluctuates daily based on market conditions. As of early 2026, 1 USD ≈ ₹84-86. Our converter uses indicative rates for quick reference. For actual transactions, always check live rates with your bank or forex broker.' },
  { question: 'Why do exchange rates change every day?', answer: 'Exchange rates change due to: interest rate differentials between countries, inflation rates, trade balance (imports vs exports), foreign investment flows, central bank interventions, geopolitical events, and overall market sentiment.' },
  { question: 'What is the best way to convert currency?', answer: 'For small amounts: forex exchange counters at airports (avoid — worst rates), banks (better), online forex platforms (best). For large amounts (above $1,000): use wire transfers through banks or regulated forex brokers like Wise, Remitly, or HDFC Forex.' },
  { question: 'What is the spread in currency conversion?', answer: 'The spread is the difference between the buy and sell price. It\'s the bank\'s profit. Retail rates include a spread of 1-3% compared to the \'mid-market\' rate you see on Google. Our calculator shows the mid-market rate.' },
]

const relatedCalculators = [
  { name: "GST Calculator", href: "/calculators/finance/gst-calculator", icon: "🧾", desc: "Calculate GST on imports" },
    { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "📈", desc: "Return on investment" },
    { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "📊", desc: "Purchasing power calculator" }
]

const structuredData = [
  generateFAQStructuredData(faqs),
  generateWebAppStructuredData({
    name: 'Currency Converter',
    description: 'Convert between 20+ world currencies including USD, INR, EUR, GBP, JPY, AED, SGD, CAD. Live exchange rates with quick conversion table. Free online currency converter.',
    url: 'https://finanacecalculator.com/calculators/finance/currency-converter',
    category: 'FinanceApplication',
  }),
  generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Finance Calculators', url: '/calculators/finance' },
    { name: 'Currency Converter', url: '/calculators/finance/currency-converter' },
  ]),
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={structuredData}
      relatedCalculators={relatedCalculators}
      blogSlug="sip-calculator-guide-how-to-grow-wealth-with-systematic-investment"
    />
  )
}
