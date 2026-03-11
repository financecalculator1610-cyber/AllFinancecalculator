import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Water Intake Calculator — Daily Hydration Needs & Schedule',
  description: 'Calculate daily water intake based on weight, activity level, and climate. Get personalized hydration schedule with glass-by-glass timing.',
  slug: 'water-intake-calculator',
  category: 'health',
  keywords: ['water intake calculator', 'how much water should I drink', 'daily water intake', 'hydration calculator', 'water calculator by weight'],
})

const relatedCalculators = [
    { name: 'Calorie Calculator', href: '/calculators/health/calorie-calculator', icon: '🔥', desc: 'Daily calories & macros' },
    { name: 'Protein Intake Calculator', href: '/calculators/health/protein-intake-calculator', icon: '💪', desc: 'Daily protein requirements' },
    { name: 'BMR Calculator', href: '/calculators/health/bmr-calculator', icon: '❤️', desc: 'Resting metabolic rate' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'How much water should I drink per day?', answer: 'Daily water needs depend on body weight, activity, and climate. General formula: 35ml per kg of bodyweight. A 70kg person needs ~2.45L baseline, plus 500-750ml per 30 minutes of exercise. Hot climates add 500ml-1L more.' },
  { question: 'Does coffee count toward daily water intake?', answer: 'Yes. Moderate amounts of coffee and tea do count toward daily fluid intake. The mild diuretic effect of caffeine is offset by the water content. However, water is still the best hydration source. Avoid counting alcohol, which actually dehydrates.' },
  { question: 'What happens if you don\'t drink enough water?', answer: 'Even mild dehydration (1-2% of body weight) impairs cognitive function, causes fatigue, headaches, and reduced exercise performance. Chronic dehydration can contribute to kidney stones, UTIs, constipation, and poor skin health.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Water Intake Calculator — Daily Hydration Needs & Schedule', description: 'Calculate daily water intake based on weight, activity level, and climate. Get personalized hydration schedule with glass-by-glass timing.', url: 'https://finanacecalculator.com/calculators/health/water-intake-calculator', category: 'HealthApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Water Intake Calculator', url: '/calculators/health/water-intake-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='calorie-calculator-guide-tdee-macros-weight-loss'
    />
  )
}
