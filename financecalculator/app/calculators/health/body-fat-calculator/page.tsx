import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Body Fat Calculator — US Navy Method with Body Composition',
  description: 'Calculate body fat percentage using the US Navy circumference method. Get fat mass, lean mass, fitness category, and comparison with healthy ranges.',
  slug: 'body-fat-calculator',
  category: 'health',
  keywords: ['body fat calculator', 'body fat percentage calculator', 'US Navy body fat', 'body composition calculator', 'how to calculate body fat'],
})

const relatedCalculators = [
    { name: 'BMI Calculator', href: '/calculators/health/bmi-calculator', icon: '⚖️', desc: 'Weight-based health screening' },
    { name: 'Calorie Calculator', href: '/calculators/health/calorie-calculator', icon: '🔥', desc: 'Calories to reduce body fat' },
    { name: 'BMR Calculator', href: '/calculators/health/bmr-calculator', icon: '❤️', desc: 'Metabolic rate for your lean mass' },
    { name: 'Ideal Weight Calculator', href: '/calculators/health/ideal-weight-calculator', icon: '🏋️', desc: 'Ideal weight ranges by formula' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'What is a healthy body fat percentage?', answer: 'Men: Essential fat 2-5%, Athlete 6-13%, Fitness 14-17%, Average 18-24%, Obese 25%+. Women: Essential fat 10-13%, Athlete 14-20%, Fitness 21-24%, Average 25-31%, Obese 32%+. Athletes naturally have lower percentages.' },
  { question: 'How accurate is the US Navy body fat method?', answer: 'The US Navy method (using neck, waist, and hip measurements) has approximately ±3-4% accuracy compared to DEXA scan (the gold standard). It\'s more accurate than BMI for assessing body composition and doesn\'t require expensive equipment.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Body Fat Calculator — US Navy Method with Body Composition', description: 'Calculate body fat percentage using the US Navy circumference method. Get fat mass, lean mass, fitness category, and comparison with healthy ranges.', url: 'https://finanacecalculator.com/calculators/health/body-fat-calculator', category: 'HealthApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Body Fat Calculator', url: '/calculators/health/body-fat-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='bmi-calculator-guide-understanding-body-mass-index'
    />
  )
}
