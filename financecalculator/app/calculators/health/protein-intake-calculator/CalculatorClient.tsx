'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { calculateProteinIntake } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

const PROTEIN_FOODS = [
  { food: 'Chicken Breast (100g)', protein: 31, calories: 165, emoji: '🍗' },
  { food: 'Eggs (1 large)', protein: 6, calories: 70, emoji: '🥚' },
  { food: 'Greek Yogurt (200g)', protein: 20, calories: 130, emoji: '🥛' },
  { food: 'Canned Tuna (100g)', protein: 25, calories: 116, emoji: '🐟' },
  { food: 'Cottage Cheese (200g)', protein: 25, calories: 220, emoji: '🧀' },
  { food: 'Whey Protein Shake', protein: 25, calories: 130, emoji: '🥤' },
  { food: 'Lentils (100g cooked)', protein: 9, calories: 116, emoji: '🫘' },
  { food: 'Black Beans (100g)', protein: 8, calories: 132, emoji: '⚫' },
]

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [weight, setWeight] = useState(75)
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'athlete'>('moderate')
  const [goal, setGoal] = useState<'maintain' | 'build' | 'lose'>('build')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')

  const weightKg = unit === 'imperial' ? weight * 0.453592 : weight
  const result = useMemo(() => calculateProteinIntake(weightKg, activityLevel, goal), [weightKg, activityLevel, goal])
  const r = result as any

  const grams = r.dailyProteinGrams || Math.round(weightKg * 1.6)
  const perMeal = Math.round(grams / 4)
  const proteinCals = grams * 4

  const macroData = [
    { name: 'Protein', value: grams * 4, color: '#16a34a' },
    { name: 'Other Calories', value: 2000 - grams * 4, color: '#e5e7eb' },
  ]

  return (
    <CalculatorLayout title="Protein Intake Calculator" description="Calculate your daily protein needs based on weight, activity level, and fitness goal. Get food sources and per-meal targets." icon="💪" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Details</h2>
          <div className="space-y-5">
            <SelectField label="Unit System" value={unit} onChange={v => setUnit(v as any)} options={[{ value: 'metric', label: 'Metric (kg)' }, { value: 'imperial', label: 'Imperial (lbs)' }]} />
            <InputField label={`Body Weight (${unit === 'metric' ? 'kg' : 'lbs'})`} value={weight} onChange={setWeight} min={unit === 'metric' ? 30 : 66} max={unit === 'metric' ? 200 : 440} step={1} suffix={unit === 'metric' ? 'kg' : 'lbs'} />
            <SelectField label="Activity Level" value={activityLevel} onChange={v => setActivityLevel(v as any)} options={[
              { value: 'sedentary', label: '🪑 Sedentary' },
              { value: 'light', label: '🚶 Lightly Active' },
              { value: 'moderate', label: '🏃 Moderately Active' },
              { value: 'active', label: '⚡ Very Active' },
              { value: 'athlete', label: '🏅 Athlete' },
            ]} />
            <SelectField label="Goal" value={goal} onChange={v => setGoal(v as any)} options={[
              { value: 'lose', label: '⚖️ Lose Weight' },
              { value: 'maintain', label: '✅ Maintain' },
              { value: 'build', label: '💪 Build Muscle' },
            ]} />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-green-50 border border-green-200 text-center">
            <p className="text-xs text-green-700 font-bold mb-1">Daily Protein Goal</p>
            <p className="text-3xl font-black text-green-700">{grams}g</p>
            <p className="text-xs text-green-600 mt-0.5">{(grams / weightKg).toFixed(1)}g per kg bodyweight</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Daily Protein" value={`${grams}g`} highlight />
            <ResultCard label="Per Meal (4 meals)" value={`${perMeal}g`} />
            <ResultCard label="Protein Calories" value={`${proteinCals} kcal`} />
            <ResultCard label="g/kg Bodyweight" value={`${(grams / weightKg).toFixed(1)}g/kg`} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">📊 Protein Needs by Goal</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { goal: 'Lose Fat', grams: Math.round(weightKg * 1.6) },
                  { goal: 'Maintain', grams: Math.round(weightKg * 1.4) },
                  { goal: 'Build Muscle', grams: Math.round(weightKg * 2.0) },
                  { goal: 'Athlete', grams: Math.round(weightKg * 2.2) },
                ]} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="goal" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}g`} width={40} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => [`${v}g`, 'Protein']} />
                  <Bar dataKey="grams" fill="#16a34a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">🍗 Top Protein Sources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PROTEIN_FOODS.map(food => {
                const servings = Math.ceil(grams / food.protein)
                const pct = Math.min(100, Math.round(food.protein / grams * 100))
                return (
                  <div key={food.food} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-green-50 hover:border-green-200 transition-colors">
                    <span className="text-xl">{food.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-800 truncate">{food.food}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs font-bold text-green-700 flex-shrink-0">{food.protein}g</span>
                        <span className="text-xs text-gray-400 flex-shrink-0">{food.calories}kcal</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
