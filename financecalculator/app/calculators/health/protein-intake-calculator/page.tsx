import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Protein Intake Calculator — Daily Protein Needs by Goal',
  description: 'Calculate daily protein requirements based on weight, activity level, and goal (muscle building, weight loss, maintenance) with top protein food sources.',
  slug: 'protein-intake-calculator',
  category: 'health',
  keywords: ['protein intake calculator', 'daily protein calculator', 'how much protein per day', 'protein needs calculator', 'protein for muscle gain'],
})

const relatedCalculators = [
    { name: 'Calorie Calculator', href: '/calculators/health/calorie-calculator', icon: '🔥', desc: 'Full macro & calorie calculator' },
    { name: 'BMR Calculator', href: '/calculators/health/bmr-calculator', icon: '❤️', desc: 'Base metabolic rate' },
    { name: 'BMI Calculator', href: '/calculators/health/bmi-calculator', icon: '⚖️', desc: 'Body mass index check' },
    { name: 'Water Intake Calculator', href: '/calculators/health/water-intake-calculator', icon: '💧', desc: 'Daily hydration needs' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'How much protein do I need per day?', answer: 'Depends on your goal: Sedentary adults: 0.8g/kg. Moderate exercise: 1.2-1.6g/kg. Muscle building: 1.8-2.2g/kg. Aggressive fat loss: 2.0-2.4g/kg (preserves muscle). Elite athletes: 2.2-3.0g/kg. For a 75kg person building muscle: 135-165g/day.' },
  { question: 'Is too much protein bad for you?', answer: 'For healthy adults with normal kidney function, research shows high protein diets (up to 2.5g/kg) are safe long-term. The concern about protein damaging kidneys applies only to those with existing kidney disease. Healthy people process high protein intake without issue.' },
  { question: 'What are the best high-protein foods?', answer: 'Animal sources (complete protein): Chicken breast (31g/100g), eggs (6g each), Greek yogurt (20g/200g), fish (20-28g/100g). Plant sources: Lentils (9g/100g cooked), black beans (8g/100g), tofu (8g/100g). Whey protein powder (25g/scoop) is an efficient supplement.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Protein Intake Calculator — Daily Protein Needs by Goal', description: 'Calculate daily protein requirements based on weight, activity level, and goal (muscle building, weight loss, maintenance) with top protein food sources.', url: 'https://finanacecalculator.com/calculators/health/protein-intake-calculator', category: 'HealthApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Protein Intake Calculator', url: '/calculators/health/protein-intake-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='calorie-calculator-guide-tdee-macros-weight-loss'
    />
  )
}
