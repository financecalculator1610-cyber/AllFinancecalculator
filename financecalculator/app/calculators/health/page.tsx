import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, ChevronRight, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Health Calculators 2026 — Free BMI, Calorie, BMR, Water, Protein & More',
  description: '10 free health calculators: BMI, Calorie/TDEE, BMR, Body Fat %, Ideal Weight, Water Intake, Protein Needs, Sleep Cycle, Pregnancy Due Date & Ovulation. Instant personalized results.',
  keywords: ['BMI calculator', 'calorie calculator', 'BMR calculator', 'body fat calculator', 'ideal weight calculator', 'water intake calculator', 'protein intake calculator', 'sleep cycle calculator', 'pregnancy calculator', 'ovulation calculator', 'free health calculators 2026', 'TDEE calculator'],
  alternates: { canonical: 'https://finanacecalculator.com/calculators/health' },
  openGraph: {
    title: 'Health Calculators — 10 Free Tools for BMI, Calories, Sleep & More',
    description: '10 free health calculators for BMI, calorie needs, BMR, body fat, water intake, protein, sleep cycles, and pregnancy. Instant personalized results.',
    url: 'https://finanacecalculator.com/calculators/health',
    type: 'website',
  },
}

const calculators = [
  { name: 'BMI Calculator', desc: 'Body Mass Index with healthy weight range & category', href: '/calculators/health/bmi-calculator', icon: '⚖️', tag: 'Body', popular: true, keywords: 'bmi calculator, body mass index' },
  { name: 'Calorie Calculator', desc: 'Daily calorie needs (TDEE) by activity & goal', href: '/calculators/health/calorie-calculator', icon: '🔥', tag: 'Nutrition', popular: true, keywords: 'calorie calculator, TDEE calculator, daily calorie needs' },
  { name: 'BMR Calculator', desc: 'Basal Metabolic Rate — calories at complete rest', href: '/calculators/health/bmr-calculator', icon: '❤️', tag: 'Fitness', popular: false, keywords: 'bmr calculator, basal metabolic rate' },
  { name: 'Body Fat Calculator', desc: 'Body fat percentage using US Navy method', href: '/calculators/health/body-fat-calculator', icon: '💪', tag: 'Fitness', popular: false, keywords: 'body fat calculator, body fat percentage calculator' },
  { name: 'Ideal Weight Calculator', desc: 'Healthy target weight by 4 popular formulas', href: '/calculators/health/ideal-weight-calculator', icon: '🏋️', tag: 'Weight', popular: false, keywords: 'ideal weight calculator, healthy weight range' },
  { name: 'Water Intake Calculator', desc: 'Daily water needs by weight, activity & climate', href: '/calculators/health/water-intake-calculator', icon: '💧', tag: 'Nutrition', popular: false, keywords: 'water intake calculator, daily water intake, how much water to drink' },
  { name: 'Protein Intake Calculator', desc: 'Daily protein goal for muscle, fat loss & maintenance', href: '/calculators/health/protein-intake-calculator', icon: '🥩', tag: 'Nutrition', popular: false, keywords: 'protein intake calculator, daily protein requirement' },
  { name: 'Pregnancy Calculator', desc: 'Due date & trimester milestones from LMP date', href: '/calculators/health/pregnancy-calculator', icon: '🤰', tag: 'Womens', popular: false, keywords: 'pregnancy calculator, due date calculator, EDD calculator' },
  { name: 'Ovulation Calculator', desc: 'Fertile window & ovulation date from cycle length', href: '/calculators/health/ovulation-calculator', icon: '🌸', tag: 'Womens', popular: false, keywords: 'ovulation calculator, fertile window calculator' },
  { name: 'Sleep Cycle Calculator', desc: 'Best bedtimes & wake-up times based on 90-min cycles', href: '/calculators/health/sleep-cycle-calculator', icon: '😴', tag: 'Wellness', popular: true, keywords: 'sleep cycle calculator, best time to wake up, sleep calculator' },
]

const tagColors: Record<string, string> = {
  Body: 'bg-rose-100 text-rose-700',
  Nutrition: 'bg-emerald-100 text-emerald-700',
  Fitness: 'bg-orange-100 text-orange-700',
  Weight: 'bg-blue-100 text-blue-700',
  Womens: 'bg-pink-100 text-pink-700',
  Wellness: 'bg-violet-100 text-violet-700',
}

const structured = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Health Calculators',
  description: '10 free health calculators for BMI, calories, fitness, nutrition, and wellness',
  url: 'https://finanacecalculator.com/calculators/health',
  numberOfItems: calculators.length,
  itemListElement: calculators.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    description: c.desc,
    url: `https://finanacecalculator.com${c.href}`,
  })),
}

export default function HealthPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} />
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-gray-500 hover:text-rose-600 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold">Health Calculators</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500 flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900">Health Calculators</h1>
                <p className="text-rose-600 font-semibold text-sm mt-0.5">10 Free Tools · Science-Based · Personalized Results</p>
              </div>
            </div>
            <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
              Free health calculators for <strong>BMI</strong>, <strong>daily calories (TDEE)</strong>, <strong>BMR</strong>, <strong>body fat %</strong>, 
              <strong> water intake</strong>, <strong>protein needs</strong>, <strong>sleep cycles</strong>, and more. 
              Instant personalized results — no account needed.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              {[
                { label: '10 Health Tools', icon: '🏥' },
                { label: 'Science-Based', icon: '🔬' },
                { label: 'Metric & Imperial', icon: '📏' },
                { label: '100% Free', icon: '✅' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-rose-200 shadow-sm text-sm font-semibold text-gray-700">
                  <span>{s.icon}</span> {s.label}
                </div>
              ))}
            </div>
          </div>

          {/* Popular highlight */}
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">⭐ Most Popular</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {calculators.filter(c => c.popular).map(calc => (
                <Link key={calc.href} href={calc.href}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white border-2 border-rose-200 hover:border-rose-500 hover:shadow-lg transition-all group shadow-sm">
                  <span className="text-2xl">{calc.icon}</span>
                  <div>
                    <p className="font-bold text-sm text-gray-900 group-hover:text-rose-700">{calc.name}</p>
                    <p className="text-xs text-rose-600 font-semibold flex items-center gap-0.5 mt-0.5">Open <ArrowRight className="w-3 h-3" /></p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* All calculators */}
          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">All Health Calculators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {calculators.map(calc => (
                <Link key={calc.href} href={calc.href}
                  className="group bg-white rounded-2xl border border-gray-200 hover:border-rose-400 hover:shadow-xl transition-all duration-200 p-5 flex flex-col shadow-sm"
                  title={`${calc.name} — ${calc.keywords}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-2xl group-hover:bg-rose-100 transition-colors">
                      {calc.icon}
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${tagColors[calc.tag] || 'bg-gray-100 text-gray-600'}`}>
                      {calc.tag}
                    </span>
                  </div>
                  <h2 className="font-bold text-gray-900 group-hover:text-rose-700 transition-colors mb-1.5">{calc.name}</h2>
                  <p className="text-xs text-gray-500 flex-1 leading-relaxed">{calc.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs font-bold text-rose-600 group-hover:gap-2 transition-all">
                    Open Calculator <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SEO content */}
          <div className="mt-12 p-8 rounded-3xl bg-white border border-gray-100 shadow-sm">
            <h2 className="text-xl font-black text-gray-900 mb-4">About Our Health Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Body & Weight Calculators</h3>
                <p>Our <strong>BMI calculator</strong> uses your height and weight to assess if you're in a healthy range. The <strong>body fat calculator</strong> uses the US Navy method for a more precise measurement of body composition than BMI alone.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Nutrition Calculators</h3>
                <p>The <strong>calorie calculator</strong> estimates your Total Daily Energy Expenditure (TDEE) based on activity level and goal — weight loss, maintenance, or muscle gain. Our <strong>protein intake calculator</strong> gives precise daily targets.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Sleep & Wellness</h3>
                <p>Our <strong>sleep cycle calculator</strong> helps you wake up at the end of a 90-minute REM cycle so you feel refreshed. It calculates optimal bedtimes and wake-up times to eliminate morning grogginess.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Women's Health</h3>
                <p>Our <strong>pregnancy due date calculator</strong> uses Naegele's rule to estimate your EDD from your last menstrual period. The <strong>ovulation calculator</strong> tracks your fertile window and ovulation date.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
