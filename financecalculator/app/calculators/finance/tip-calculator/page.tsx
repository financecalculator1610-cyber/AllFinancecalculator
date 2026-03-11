import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Tip Calculator — Split Bill & Calculate Tip Per Person (10%, 15%, 20%)',
  description: 'Free tip calculator to calculate tip amount, total bill, and split per person. Quick tip buttons for 10%, 15%, 18%, 20%, 25%. Bill splitter for groups.',
  slug: 'tip-calculator',
  category: 'finance',
  keywords: ['tip calculator', 'tip calculator per person', 'bill split calculator', 'restaurant tip calculator', 'how much to tip calculator', 'tip amount calculator', 'split bill calculator'],
})

const faqs = [
  { question: 'How much should you tip at a restaurant?', answer: 'Standard tipping etiquette: 10% for average service, 15% for good service, 18% for very good service, 20% for excellent service, 25%+ for exceptional service. In the US, 18-20% is the norm. In India and most of Asia, 10-15% is typical and not always expected.' },
  { question: 'How do you calculate a 20% tip?', answer: 'Easiest method: Move the decimal one place left to get 10%, then double it. Example: Bill = ₹1,200. 10% = ₹120. 20% = ₹240. Total = ₹1,440. Or just use this calculator — enter the bill and tap the 20% button!' },
  { question: 'How to split a bill equally among friends?', answer: 'Total bill = Bill amount + Tip. Per person = Total / Number of people. Example: ₹5,000 bill, 20% tip, 4 people. Tip = ₹1,000. Total = ₹6,000. Per person = ₹1,500. Our calculator handles this automatically.' },
  { question: 'Is tipping mandatory?', answer: 'Tipping is customary (not legally required) in most countries. In the US, it\'s heavily expected (18-20%). In India, 10% is appreciated but not always mandatory. In Japan, tipping is actually considered rude. Always check local customs when traveling.' },
]

const relatedCalculators = [
  { name: "Currency Converter", href: "/calculators/finance/currency-converter", icon: "💱", desc: "Convert bill to your currency" },
    { name: "GST Calculator", href: "/calculators/finance/gst-calculator", icon: "🧾", desc: "Calculate tax on bill" },
    { name: "Break-Even Calculator", href: "/calculators/finance/break-even-calculator", icon: "⚖️", desc: "For restaurant owners" }
]

const structuredData = [
  generateFAQStructuredData(faqs),
  generateWebAppStructuredData({
    name: 'Tip Calculator',
    description: 'Free tip calculator to calculate tip amount, total bill, and split per person. Quick tip buttons for 10%, 15%, 18%, 20%, 25%. Bill splitter for groups.',
    url: 'https://finanacecalculator.com/calculators/finance/tip-calculator',
    category: 'FinanceApplication',
  }),
  generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Finance Calculators', url: '/calculators/finance' },
    { name: 'Tip Calculator', url: '/calculators/finance/tip-calculator' },
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
