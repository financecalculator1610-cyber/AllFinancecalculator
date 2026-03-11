'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { calculateCalories } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(170)
  const [age, setAge] = useState(30)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [activity, setActivity] = useState('1.55')
  const [goal, setGoal] = useState<'maintain' | 'lose' | 'gain'>('maintain')

  const result = useMemo(() => calculateCalories(weight, height, age, gender, Number(activity), goal), [weight, height, age, gender, activity, goal])

  const goalData = [
    { label: 'Aggressive Loss', calories: result.aggressiveLoss, color: '#ef4444', desc: '−1000 kcal/day (−2 lbs/wk)' },
    { label: 'Weight Loss', calories: result.weightLoss, color: '#f59e0b', desc: '−500 kcal/day (−1 lb/wk)' },
    { label: 'Maintain', calories: result.maintenance, color: '#22c55e', desc: 'Maintain current weight' },
    { label: 'Weight Gain', calories: result.weightGain, color: '#14b8a6', desc: '+500 kcal/day (+1 lb/wk)' },
  ]

  const macroData = [
    { name: 'Protein', grams: result.macros.protein, kcal: result.macros.protein * 4, color: '#14b8a6', pct: Math.round((result.macros.protein * 4 / result.tdee) * 100) },
    { name: 'Carbs', grams: result.macros.carbs, kcal: result.macros.carbs * 4, color: '#3b82f6', pct: Math.round((result.macros.carbs * 4 / result.tdee) * 100) },
    { name: 'Fat', grams: result.macros.fat, kcal: result.macros.fat * 9, color: '#f59e0b', pct: Math.round((result.macros.fat * 9 / result.tdee) * 100) },
  ]

  return (
    <CalculatorLayout title="Calorie Calculator" description="Calculate your daily calorie needs (TDEE) based on your body stats, activity level, and fitness goal." icon="🔥" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Your Profile</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male', 'female'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {g === 'male' ? '♂ Male' : '♀ Female'}
                </button>
              ))}
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={10} max={90} step={1} suffix="yrs" />
            <InputField label="Weight" value={weight} onChange={setWeight} min={30} max={250} step={0.5} suffix="kg" />
            <InputField label="Height" value={height} onChange={setHeight} min={100} max={250} step={1} suffix="cm" />
            <SelectField label="Activity Level" value={activity} onChange={setActivity} options={[
              { value: '1.2', label: '🪑 Sedentary (desk job)' },
              { value: '1.375', label: '🚶 Light (1–3 days/wk)' },
              { value: '1.55', label: '🏃 Moderate (3–5 days/wk)' },
              { value: '1.725', label: '💪 Very Active (6–7 days/wk)' },
              { value: '1.9', label: '🏋️ Athlete (2x/day training)' },
            ]} />
            <SelectField label="Your Goal" value={goal} onChange={setGoal as any} options={[
              { value: 'lose', label: '⬇️ Lose Weight' },
              { value: 'maintain', label: '✅ Maintain Weight' },
              { value: 'gain', label: '⬆️ Gain Muscle' },
            ]} />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="TDEE (Daily)" value={`${result.tdee} kcal`} subValue="Total energy expenditure" highlight />
            <ResultCard label="BMR (Resting)" value={`${result.bmr} kcal`} subValue="At complete rest" />
            <ResultCard label="For Your Goal" value={`${goal === 'lose' ? result.weightLoss : goal === 'gain' ? result.weightGain : result.maintenance} kcal`} />
            <ResultCard label="Protein Target" value={`${result.macros.protein}g`} subValue={`${result.macros.protein * 4} kcal`} />
          </div>

          {/* Goals comparison */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Calorie Targets by Goal</h3>
            <div className="space-y-3">
              {goalData.map(g => (
                <div key={g.label} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: g.color }} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <div>
                        <span className="text-sm font-semibold text-white">{g.label}</span>
                        <span className="text-xs text-gray-400 ml-2">{g.desc}</span>
                      </div>
                      <span className="text-sm font-bold" style={{ color: g.color }}>{g.calories} kcal</span>
                    </div>
                    <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(g.calories / result.weightGain) * 100}%`, background: g.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Macros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Macronutrient Split</h3>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={macroData} cx="50%" cy="50%" outerRadius={75} dataKey="kcal" paddingAngle={3}>
                      {macroData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
                      formatter={(v: number, name, props) => [`${props.payload.grams}g / ${v} kcal`, name]} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Macro Breakdown</h3>
              <div className="space-y-4 mt-2">
                {macroData.map(m => (
                  <div key={m.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-semibold" style={{ color: m.color }}>{m.name}</span>
                      <span className="text-gray-900 font-bold">{m.grams}g <span className="text-gray-500 font-normal text-xs">({m.kcal} kcal · {m.pct}%)</span></span>
                    </div>
                    <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: m.color }} />
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-100 text-xs text-gray-400">
                  Per meal (4 meals/day): Protein ~{Math.round(result.macros.protein / 4)}g, Carbs ~{Math.round(result.macros.carbs / 4)}g, Fat ~{Math.round(result.macros.fat / 4)}g
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
