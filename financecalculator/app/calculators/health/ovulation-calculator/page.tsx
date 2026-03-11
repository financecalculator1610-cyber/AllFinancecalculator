import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Ovulation Calculator — Fertile Window & Cycle Tracker',
  description: 'Calculate ovulation date and fertile window based on last period and cycle length. Track cycle phases with visual calendar.',
  slug: 'ovulation-calculator',
  category: 'health',
  keywords: ['ovulation calculator', 'fertile window calculator', 'ovulation date calculator', 'when do I ovulate', 'fertility calculator'],
})

const relatedCalculators = [
    { name: 'Pregnancy Calculator', href: '/calculators/health/pregnancy-calculator', icon: '🤰', desc: 'Calculate due date after conception' },
    { name: 'BMI Calculator', href: '/calculators/health/bmi-calculator', icon: '⚖️', desc: 'BMI and fertility connection' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'When do I ovulate?', answer: 'Ovulation typically occurs 14 days before your next period (not 14 days after your last period). For a 28-day cycle, ovulation is around Day 14. For a 32-day cycle, it\'s around Day 18. Our calculator determines your ovulation date based on your cycle length.' },
  { question: 'What is the fertile window?', answer: 'The fertile window is 6 days: 5 days before ovulation plus the day of ovulation itself. Sperm can survive 3-5 days in the reproductive tract, which is why conception can occur from sex before ovulation day.' },
  { question: 'Can I get pregnant outside the fertile window?', answer: 'Pregnancy is theoretically only possible during the fertile window (6 days per cycle). However, cycle length varies, and ovulation can shift due to stress, illness, or irregular cycles — making prediction imperfect. This calculator provides estimates, not guarantees.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Ovulation Calculator — Fertile Window & Cycle Tracker', description: 'Calculate ovulation date and fertile window based on last period and cycle length. Track cycle phases with visual calendar.', url: 'https://finanacecalculator.com/calculators/health/ovulation-calculator', category: 'HealthApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Ovulation Calculator', url: '/calculators/health/ovulation-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='bmi-calculator-guide-understanding-body-mass-index'
    />
  )
}
