import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'BMR Calculator — Basal Metabolic Rate & Activity Calories',
  description: 'Calculate your Basal Metabolic Rate (BMR) and TDEE at all activity levels. Based on Mifflin-St Jeor formula with activity multiplier comparison.',
  slug: 'bmr-calculator',
  category: 'health',
  keywords: ['BMR calculator', 'basal metabolic rate calculator', 'resting metabolic rate', 'BMR formula', 'how to calculate BMR'],
})

const relatedCalculators = [
    { name: 'Calorie Calculator', href: '/calculators/health/calorie-calculator', icon: '🔥', desc: 'Full TDEE with macros' },
    { name: 'BMI Calculator', href: '/calculators/health/bmi-calculator', icon: '⚖️', desc: 'Body mass index assessment' },
    { name: 'Body Fat Calculator', href: '/calculators/health/body-fat-calculator', icon: '💪', desc: 'Body composition analysis' },
    { name: 'Ideal Weight Calculator', href: '/calculators/health/ideal-weight-calculator', icon: '🏋️', desc: 'Ideal weight for your stats' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'What is BMR?', answer: 'BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest to maintain basic functions — breathing, circulation, temperature regulation, and organ function. It accounts for 60-75% of total daily calorie expenditure.' },
  { question: 'What is the difference between BMR and TDEE?', answer: 'BMR is your calorie burn at rest (doing nothing). TDEE includes BMR + activity calories. TDEE = BMR × Activity Factor. A sedentary person\'s TDEE ≈ BMR × 1.2. An active person ≈ BMR × 1.55. TDEE is what you use for nutrition planning.' },
  { question: 'Does metabolism slow down with age?', answer: 'Yes, slightly. Metabolism decreases approximately 2-3% per decade after age 20, primarily due to muscle mass loss. Resistance training (weightlifting) is the most effective way to maintain metabolic rate as you age by preserving and building muscle.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'BMR Calculator — Basal Metabolic Rate & Activity Calories', description: 'Calculate your Basal Metabolic Rate (BMR) and TDEE at all activity levels. Based on Mifflin-St Jeor formula with activity multiplier comparison.', url: 'https://finanacecalculator.com/calculators/health/bmr-calculator', category: 'HealthApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'BMR Calculator', url: '/calculators/health/bmr-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='bmr-calculator-guide-basal-metabolic-rate-explained'
    />
  )
}
