import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Ideal Weight Calculator — 4 Formula Comparison (Hamwi, Robinson, Miller)',
  description: 'Find ideal body weight using 4 scientific formulas — Hamwi, Robinson, Miller, and BMI range. Compare your current weight against all formula results.',
  slug: 'ideal-weight-calculator',
  category: 'health',
  keywords: ['ideal weight calculator', 'ideal body weight calculator', 'Hamwi formula calculator', 'healthy weight calculator', 'what should I weigh'],
})

const relatedCalculators = [
    { name: 'BMI Calculator', href: '/calculators/health/bmi-calculator', icon: '⚖️', desc: 'BMI for your current weight' },
    { name: 'Calorie Calculator', href: '/calculators/health/calorie-calculator', icon: '🔥', desc: 'Calories to reach ideal weight' },
    { name: 'Body Fat Calculator', href: '/calculators/health/body-fat-calculator', icon: '💪', desc: 'Body composition vs ideal' },
    { name: 'BMR Calculator', href: '/calculators/health/bmr-calculator', icon: '❤️', desc: 'Metabolic rate at ideal weight' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'What is the ideal weight for my height?', answer: 'There is no single ideal weight — it depends on body composition, frame size, age, and gender. Our calculator uses 4 established formulas (Devine, Robinson, Miller, Hamwi) and shows the range. The \'ideal\' range is quite broad for most heights.' },
  { question: 'Is ideal weight the same as healthy weight?', answer: 'Not exactly. \'Healthy weight\' is determined by health markers (blood pressure, cholesterol, glucose, fitness level) more than a number on a scale. Two people at the same weight can have very different health profiles based on body composition.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Ideal Weight Calculator — 4 Formula Comparison (Hamwi, Robinson, Miller)', description: 'Find ideal body weight using 4 scientific formulas — Hamwi, Robinson, Miller, and BMI range. Compare your current weight against all formula results.', url: 'https://finanacecalculator.com/calculators/health/ideal-weight-calculator', category: 'HealthApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Ideal Weight Calculator', url: '/calculators/health/ideal-weight-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='bmi-calculator-guide-understanding-body-mass-index'
    />
  )
}
