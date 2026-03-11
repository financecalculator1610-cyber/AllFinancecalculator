'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { calculateBMR } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(170)
  const [age, setAge] = useState(30)
  const [gender, setGender] = useState<'male' | 'female'>('male')

  const result = useMemo(() => calculateBMR(weight, height, age, gender), [weight, height, age, gender])

  const activityLevels = [
    { label: 'Sedentary', value: result.sedentary, desc: 'Desk job, little exercise', color: '#3b82f6' },
    { label: 'Lightly Active', value: result.lightlyActive, desc: '1–3 days/week exercise', color: '#22c55e' },
    { label: 'Moderately Active', value: result.moderatelyActive, desc: '3–5 days/week exercise', color: '#14b8a6' },
    { label: 'Very Active', value: result.veryActive, desc: '6–7 days/week exercise', color: '#f59e0b' },
    { label: 'Extra Active', value: result.extraActive, desc: '2x/day intense training', color: '#ec4899' },
  ]

  return (
    <CalculatorLayout title="BMR Calculator" description="Calculate your Basal Metabolic Rate — the calories your body burns at complete rest. Used to find your TDEE." icon="❤️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Body Stats</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male', 'female'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {g === 'male' ? '♂ Male' : '♀ Female'}
                </button>
              ))}
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={10} max={100} step={1} suffix="yrs" />
            <InputField label="Weight" value={weight} onChange={setWeight} min={30} max={250} step={0.5} suffix="kg" />
            <InputField label="Height" value={height} onChange={setHeight} min={100} max={250} step={1} suffix="cm" />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <p className="text-xs text-gray-500 mb-1">Your BMR (Mifflin-St Jeor)</p>
            <p className="text-3xl font-bold font-display text-rose-300">{result.bmr} <span className="text-lg text-rose-400">kcal/day</span></p>
            <p className="text-xs text-gray-400 mt-1">Calories burned doing absolutely nothing</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="BMR" value={`${result.bmr} kcal`} subValue="At complete rest" highlight />
            <ResultCard label="Sedentary TDEE" value={`${result.sedentary} kcal`} subValue="Desk job lifestyle" />
            <ResultCard label="Active TDEE" value={`${result.moderatelyActive} kcal`} subValue="3–5 workouts/week" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">TDEE by Activity Level</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityLevels} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, result.extraActive + 200]} />
                  <YAxis type="category" dataKey="label" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={110} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name, props) => [`${v} kcal/day — ${props.payload.desc}`, '']} />
                  <Bar dataKey="value" name="Calories" radius={[0, 6, 6, 0]}>
                    {activityLevels.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">All Activity Levels</h3>
            <table className="calc-table">
              <thead><tr><th>Activity Level</th><th>Description</th><th>Daily Calories</th></tr></thead>
              <tbody>
                {activityLevels.map(a => (
                  <tr key={a.label}>
                    <td className="font-medium" style={{ color: a.color }}>{a.label}</td>
                    <td className="text-gray-500 text-xs">{a.desc}</td>
                    <td className="font-bold text-white">{a.value} kcal</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">BMR Formula (Mifflin-St Jeor)</h3>
            <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm text-gray-700 border border-gray-100">
              {gender === 'male' ? 'BMR = 10×weight + 6.25×height − 5×age + 5' : 'BMR = 10×weight + 6.25×height − 5×age − 161'}
              <div className="mt-2 text-xs text-gray-400 font-sans">= 10×{weight} + 6.25×{height} − 5×{age} {gender === 'male' ? '+ 5' : '− 161'} = <span className="text-gray-900 font-bold">{result.bmr} kcal</span></div>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
