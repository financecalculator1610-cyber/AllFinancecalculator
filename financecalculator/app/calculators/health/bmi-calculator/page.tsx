import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import BMICalculatorClient from './BMICalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'BMI Calculator — Body Mass Index with Health Insights',
  description: 'Calculate BMI with visual scale, category analysis, ideal weight range, and personalized health recommendations. Supports metric (kg/cm) and imperial (lb/in).',
  slug: 'bmi-calculator',
  category: 'health',
  keywords: ['BMI calculator', 'body mass index calculator', 'healthy BMI range', 'BMI calculator for adults', 'normal BMI'],
})

const relatedCalculators = [
    { name: 'Calorie Calculator', href: '/calculators/health/calorie-calculator', icon: '🔥', desc: 'Daily calories to reach healthy BMI' },
    { name: 'BMR Calculator', href: '/calculators/health/bmr-calculator', icon: '❤️', desc: 'Resting calorie burn for your body' },
    { name: 'Body Fat Calculator', href: '/calculators/health/body-fat-calculator', icon: '💪', desc: 'More precise than BMI for fitness' },
    { name: 'Ideal Weight Calculator', href: '/calculators/health/ideal-weight-calculator', icon: '🏋️', desc: 'Multi-formula ideal weight comparison' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'What is BMI and how is it calculated?', answer: 'BMI (Body Mass Index) = Weight (kg) / Height² (m²). Example: 70kg at 1.75m height = 70 / (1.75 × 1.75) = 22.9. Categories: Underweight <18.5, Normal 18.5-24.9, Overweight 25-29.9, Obese ≥30.' },
  { question: 'Is BMI an accurate measure of health?', answer: 'BMI is a useful population-level screening tool but has significant limitations. It doesn\'t distinguish between muscle and fat — muscular athletes often show as \'overweight.\' Asian populations use lower cutoffs (23 for overweight, 27.5 for obese). Use with body fat percentage for better accuracy.' },
  { question: 'What is a healthy BMI range?', answer: 'Standard: 18.5-24.9 is healthy. For Asian populations: 18.5-22.9 is optimal. BMI alone doesn\'t determine health — a person with BMI 28 but low body fat and good metabolic markers may be healthier than someone with BMI 23 and high visceral fat.' },
]

export default function Page() {
  return (
    <BMICalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'BMI Calculator — Body Mass Index with Health Insights', description: 'Calculate BMI with visual scale, category analysis, ideal weight range, and personalized health recommendations. Supports metric (kg/cm) and imperial (lb/in).', url: 'https://finanacecalculator.com/calculators/health/bmi-calculator', category: 'HealthApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'BMI Calculator', url: '/calculators/health/bmi-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='bmi-calculator-guide-understanding-body-mass-index'
    />
  )
}
