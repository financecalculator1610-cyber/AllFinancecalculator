import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Pregnancy Due Date Calculator — Expected Delivery Date (EDD)',
  description: 'Calculate your pregnancy due date using last menstrual period (LMP). See trimester milestones, important dates, and week-by-week progress.',
  slug: 'pregnancy-calculator',
  category: 'health',
  keywords: ['pregnancy calculator', 'due date calculator', 'pregnancy due date', 'EDD calculator', 'when is my due date'],
})

const relatedCalculators = [
    { name: 'Ovulation Calculator', href: '/calculators/health/ovulation-calculator', icon: '🌸', desc: 'Fertile window & ovulation date' },
    { name: 'BMI Calculator', href: '/calculators/health/bmi-calculator', icon: '⚖️', desc: 'Healthy weight during pregnancy' },
    { name: 'Water Intake Calculator', href: '/calculators/health/water-intake-calculator', icon: '💧', desc: 'Hydration during pregnancy' }
  ]

const faqs: { question: string; answer: string }[] = [
  { question: 'How is the pregnancy due date calculated?', answer: 'Standard due date (EDD) is calculated using Naegele\'s Rule: Add 280 days (40 weeks) to the first day of your last menstrual period (LMP). This assumes a 28-day cycle. Our calculator applies this formula automatically.' },
  { question: 'How accurate is a due date calculator?', answer: 'Only about 4% of babies are born exactly on their due date. 80% of births occur within 2 weeks of the EDD (between 38-42 weeks). The due date is a useful estimate, not a precise prediction. Ultrasound dating (especially in first trimester) is more accurate.' },
  { question: 'When does each trimester start and end?', answer: 'First trimester: Weeks 1-12 (fertilization through 12 weeks). Second trimester: Weeks 13-26. Third trimester: Weeks 27-40. Full term is 37-42 weeks. Babies born before 37 weeks are considered preterm.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Pregnancy Due Date Calculator — Expected Delivery Date (EDD)', description: 'Calculate your pregnancy due date using last menstrual period (LMP). See trimester milestones, important dates, and week-by-week progress.', url: 'https://finanacecalculator.com/calculators/health/pregnancy-calculator', category: 'HealthApplication' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Pregnancy Due Date Calculator', url: '/calculators/health/pregnancy-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      blogSlug='bmi-calculator-guide-understanding-body-mass-index'
    />
  )
}
