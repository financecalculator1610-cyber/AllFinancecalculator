import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'NPS Calculator 2026 — National Pension System Corpus, Pension & Returns',
  description: 'Calculate NPS maturity corpus, monthly pension, and lump sum at retirement. See annuity vs lump sum split, tax benefits under 80CCD. Free NPS calculator India.',
  slug: 'nps-calculator',
  category: 'finance',
  keywords: ['NPS calculator', 'national pension system calculator', 'NPS pension calculator', 'NPS maturity calculator', 'NPS 80CCD calculator', 'NPS annuity calculator 2026'],
})

const faqs = [
  { question: 'What is NPS (National Pension System)?', answer: 'NPS is a government-regulated pension scheme open to all Indian citizens (18-70 years). You invest during your working years, and at retirement (60+), you receive a lump sum (max 60%) and use the rest (min 40%) to purchase an annuity for monthly pension.' },
  { question: 'What are NPS tax benefits?', answer: 'NPS offers triple tax benefits: Up to ₹1.5L under 80C, additional ₹50,000 under 80CCD(1B), and employer contribution up to 10% of salary is fully deductible. The 60% lump sum at maturity is tax-free.' },
  { question: 'What is the expected NPS return?', answer: 'NPS invests in equity (E), corporate bonds (C), and government securities (G). Historical 10-year returns: Tier I Equity funds have delivered 12-14% CAGR. For long-term planning, 10-12% is a reasonable assumption.' },
  { question: 'NPS vs PPF: which is better?', answer: 'NPS offers potentially higher returns (equity exposure) but with market risk. PPF is guaranteed at 7.1% with full capital safety. NPS has better tax benefits and is designed specifically for retirement. Best strategy: use both — PPF for safety, NPS for growth.' },
  { question: 'Can I withdraw from NPS before 60?', answer: 'Partial withdrawal (up to 25% of own contributions) is allowed after 3 years for specific reasons: children\'s education, marriage, home purchase, critical illness, disability. Premature exit is also possible after 10 years — but 80% must go to annuity.' },
]

const relatedCalculators = [
  { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🌅", desc: "Overall retirement corpus planning" },
    { name: "PPF Calculator", href: "/calculators/finance/ppf-calculator", icon: "🏛️", desc: "Compare NPS with PPF" },
    { name: "SWP Calculator", href: "/calculators/finance/swp-calculator", icon: "💸", desc: "Systematic withdrawal planning" }
]

const structuredData = [
  generateFAQStructuredData(faqs),
  generateWebAppStructuredData({
    name: 'NPS Calculator',
    description: 'Calculate NPS maturity corpus, monthly pension, and lump sum at retirement. See annuity vs lump sum split, tax benefits under 80CCD. Free NPS calculator India.',
    url: 'https://finanacecalculator.com/calculators/finance/nps-calculator',
    category: 'FinanceApplication',
  }),
  generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Finance Calculators', url: '/calculators/finance' },
    { name: 'NPS Calculator', url: '/calculators/finance/nps-calculator' },
  ]),
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={structuredData}
      relatedCalculators={relatedCalculators}
      blogSlug="swp-vs-annuity-best-retirement-income-strategy"
    />
  )
}
