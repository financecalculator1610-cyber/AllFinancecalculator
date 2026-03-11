import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Sleep Cycle Calculator — Best Bedtimes & Wake-Up Times',
  description: 'Find optimal bedtimes and wake-up times based on 90-minute sleep cycles. Wake up refreshed, avoid sleep inertia.',
  slug: 'sleep-cycle-calculator',
  category: 'health',
  keywords: ['sleep cycle calculator', 'best time to wake up', 'sleep calculator', '90 minute sleep cycle', 'when to go to sleep'],
})

const relatedCalculators = [
    { name: 'BMR Calculator', href: '/calculators/health/bmr-calculator', icon: '❤️', desc: 'Metabolism & sleep connection' },
    { name: 'Calorie Calculator', href: '/calculators/health/calorie-calculator', icon: '🔥', desc: 'Sleep affects calorie needs' },
    { name: 'BMI Calculator', href: '/calculators/health/bmi-calculator', icon: '⚖️', desc: 'Body health overview' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'How long is one sleep cycle?', answer: 'One complete sleep cycle lasts approximately 90 minutes and includes Stage 1 (light sleep), Stage 2 (sleep spindles), Stage 3 (deep/slow-wave sleep), and REM sleep. Adults complete 4-6 cycles per night for optimal rest.' },
  { question: 'Why do I feel groggy even after 8 hours of sleep?', answer: 'Sleep inertia (grogginess) occurs when you wake during deep sleep (Stage 3). If 8 hours doesn\'t align with the end of a sleep cycle, you\'ll feel worse than if you woke after 7.5 hours at a cycle\'s end. Our calculator helps you find the optimal wake time.' },
  { question: 'How many hours of sleep do adults need?', answer: 'Adults need 7-9 hours (5-6 complete 90-minute cycles) per night. Less than 7 hours chronically impairs memory, immune function, metabolism, mood, and cardiovascular health. Sleep is non-negotiable for performance and longevity.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Sleep Cycle Calculator — Best Bedtimes & Wake-Up Times', description: 'Find optimal bedtimes and wake-up times based on 90-minute sleep cycles. Wake up refreshed, avoid sleep inertia.', url: 'https://finanacecalculator.com/calculators/health/sleep-cycle-calculator', category: 'HealthApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Sleep Cycle Calculator', url: '/calculators/health/sleep-cycle-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='calorie-calculator-guide-tdee-macros-weight-loss'
    />
  )
}
