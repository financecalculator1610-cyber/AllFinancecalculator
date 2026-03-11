import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Calorie Calculator — TDEE, Macros & Daily Calorie Needs',
  description: 'Calculate daily calorie needs (TDEE) and macronutrient targets for weight loss, maintenance, or muscle gain. Based on Mifflin-St Jeor formula.',
  slug: 'calorie-calculator',
  category: 'health',
  keywords: ['calorie calculator', 'TDEE calculator', 'daily calorie calculator', 'how many calories to lose weight', 'macro calculator'],
})

const relatedCalculators = [
    { name: 'BMR Calculator', href: '/calculators/health/bmr-calculator', icon: '❤️', desc: 'Base metabolic rate calculation' },
    { name: 'BMI Calculator', href: '/calculators/health/bmi-calculator', icon: '⚖️', desc: 'Check your current BMI' },
    { name: 'Body Fat Calculator', href: '/calculators/health/body-fat-calculator', icon: '💪', desc: 'Body composition analysis' },
    { name: 'Ideal Weight Calculator', href: '/calculators/health/ideal-weight-calculator', icon: '🏋️', desc: 'Target weight for your height' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'What is TDEE (Total Daily Energy Expenditure)?', answer: 'TDEE is the total number of calories your body burns per day, including basal metabolism (BMR), physical activity, and the thermic effect of food. It\'s the most important number for weight management — eat below TDEE to lose weight, above to gain.' },
  { question: 'How many calories to lose 1 pound or 1 kg per week?', answer: '1 pound (0.45kg) of fat ≈ 3,500 calories. To lose 1 pound/week: Create a 500 calorie/day deficit (3,500/7). To lose 1 kg/week: Create a 7,700/7 = 1,100 calorie/day deficit. This is aggressive — 0.5kg/week (550 deficit) is more sustainable.' },
  { question: 'Why do calorie calculators give different results?', answer: 'Different formulas (Harris-Benedict, Mifflin-St Jeor, Katch-McArdle) give slightly different BMR estimates. Activity multipliers vary by calculator. Our calculator uses the Mifflin-St Jeor formula, which research shows is most accurate for most people.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Calorie Calculator — TDEE, Macros & Daily Calorie Needs', description: 'Calculate daily calorie needs (TDEE) and macronutrient targets for weight loss, maintenance, or muscle gain. Based on Mifflin-St Jeor formula.', url: 'https://finanacecalculator.com/calculators/health/calorie-calculator', category: 'HealthApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Calorie Calculator', url: '/calculators/health/calorie-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='calorie-calculator-guide-tdee-macros-weight-loss'
    />
  )
}
