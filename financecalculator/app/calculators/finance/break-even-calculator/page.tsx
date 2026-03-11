import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Break-Even Calculator 2026 — Break-Even Point, Revenue & Profit Analysis',
  description: 'Calculate break-even point in units and revenue. Analyze contribution margin, fixed vs variable costs, and profit at different sales levels. Free business break-even analysis tool.',
  slug: 'break-even-calculator',
  category: 'finance',
  keywords: ['break-even calculator', 'break even point calculator', 'break-even analysis calculator', 'contribution margin calculator', 'fixed variable cost calculator', 'business break-even analysis 2026'],
})

const faqs = [
  { question: 'What is the break-even point?', answer: 'The break-even point is the level of sales at which total revenue equals total costs (fixed + variable), resulting in zero profit or loss. It\'s a critical business metric: sales above break-even generate profit, below it generate losses.' },
  { question: 'How is break-even calculated?', answer: 'Break-Even Units = Fixed Costs / Contribution Margin per Unit. Contribution Margin = Selling Price - Variable Cost per Unit. Example: Fixed costs ₹1,00,000, selling price ₹250, variable cost ₹150. Contribution margin = ₹100. Break-even = 1,00,000/100 = 1,000 units.' },
  { question: 'What is contribution margin?', answer: 'Contribution Margin = Selling Price - Variable Cost per Unit. It represents how much each unit sold contributes toward covering fixed costs and generating profit. A higher contribution margin means you need fewer sales to break even.' },
  { question: 'How does break-even analysis help businesses?', answer: 'Break-even analysis helps: set minimum pricing, determine sales targets, evaluate business viability, plan production levels, assess impact of cost changes, and make launch/no-launch decisions for new products.' },
]

const relatedCalculators = [
  { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "📈", desc: "Return on investment analysis" },
    { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator", icon: "📐", desc: "Interest on business loans" },
    { name: "EMI Calculator", href: "/calculators/finance/emi-calculator", icon: "🏦", desc: "Business loan EMI" }
]

const structuredData = [
  generateFAQStructuredData(faqs),
  generateWebAppStructuredData({
    name: 'Break-Even Calculator',
    description: 'Calculate break-even point in units and revenue. Analyze contribution margin, fixed vs variable costs, and profit at different sales levels. Free business break-even analysis tool.',
    url: 'https://finanacecalculator.com/calculators/finance/break-even-calculator',
    category: 'FinanceApplication',
  }),
  generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Finance Calculators', url: '/calculators/finance' },
    { name: 'Break-Even Calculator', url: '/calculators/finance/break-even-calculator' },
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
