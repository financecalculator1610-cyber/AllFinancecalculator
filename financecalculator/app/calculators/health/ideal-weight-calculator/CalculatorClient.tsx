'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'
import { calculateIdealWeight } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [height, setHeight] = useState(170)
  const [age, setAge] = useState(30)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [currentWeight, setCurrentWeight] = useState(75)

  const result = useMemo(() => calculateIdealWeight(height, gender, age), [height, gender, age])

  const diff = currentWeight - result.recommended
  const isOver = diff > 0

  const formulaData = [
    { name: 'Hamwi', value: result.hamwi, color: '#3b82f6' },
    { name: 'Robinson', value: result.robinson, color: '#22c55e' },
    { name: 'Miller', value: result.miller, color: '#8b5cf6' },
    { name: 'BMI Range Low', value: result.bmiMin, color: '#14b8a6' },
    { name: 'BMI Range High', value: result.bmiMax, color: '#14b8a6' },
    { name: 'Recommended', value: result.recommended, color: '#f59e0b' },
  ]

  return (
    <CalculatorLayout title="Ideal Weight Calculator" description="Find your ideal body weight using 4 scientific formulas — Hamwi, Robinson, Miller, and BMI method." icon="🏋️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Your Details</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male', 'female'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {g === 'male' ? '♂ Male' : '♀ Female'}
                </button>
              ))}
            </div>
            <InputField label="Height" value={height} onChange={setHeight} min={100} max={250} step={1} suffix="cm" />
            <InputField label="Age" value={age} onChange={setAge} min={18} max={100} step={1} suffix="yrs" />
            <InputField label="Current Weight" value={currentWeight} onChange={setCurrentWeight} min={30} max={250} step={0.5} suffix="kg" />
          </div>

          <div className="mt-5 space-y-3">
            <div className={`p-4 rounded-xl border ${isOver ? 'bg-amber-500/10 border-amber-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
              <p className="text-xs text-gray-500 mb-1">vs Recommended Ideal Weight</p>
              <p className={`text-xl font-bold font-display ${isOver ? 'text-amber-300' : 'text-green-300'}`}>
                {isOver ? `+${diff.toFixed(1)}` : diff.toFixed(1)} kg
              </p>
              <p className="text-xs text-gray-400 mt-1">{isOver ? `${diff.toFixed(1)} kg above ideal` : Math.abs(diff) < 2 ? 'You are at ideal weight!' : `${Math.abs(diff).toFixed(1)} kg below ideal`}</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Recommended" value={`${result.recommended} kg`} subValue="Average of 3 formulas" highlight />
            <ResultCard label="BMI Range" value={`${result.bmiMin}–${result.bmiMax} kg`} subValue="BMI 18.5–24.9" />
            <ResultCard label="Hamwi Formula" value={`${result.hamwi} kg`} />
            <ResultCard label="Robinson Formula" value={`${result.robinson} kg`} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Ideal Weight by Formula</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formulaData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} domain={[Math.min(...formulaData.map(d => d.value)) - 5, Math.max(...formulaData.map(d => d.value)) + 5]} unit="kg" width={60} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [`${v} kg`]} />
                  <ReferenceLine y={currentWeight} stroke="#ec4899" strokeDasharray="5 5" label={{ value: `You: ${currentWeight}kg`, fill: '#ec4899', fontSize: 11 }} />
                  <Bar dataKey="value" name="Ideal Weight" radius={[6, 6, 0, 0]}>
                    {formulaData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Formula Comparison</h3>
            <table className="calc-table">
              <thead><tr><th>Formula</th><th>Ideal Weight</th><th>Difference from You</th></tr></thead>
              <tbody>
                {[{ name: 'Hamwi', val: result.hamwi }, { name: 'Robinson', val: result.robinson }, { name: 'Miller', val: result.miller }, { name: 'BMI Low (18.5)', val: result.bmiMin }, { name: 'BMI High (24.9)', val: result.bmiMax }, { name: '✨ Recommended', val: result.recommended }].map(r => {
                  const d = currentWeight - r.val
                  return (
                    <tr key={r.name}>
                      <td className="font-medium text-white">{r.name}</td>
                      <td className="text-green-600 font-semibold">{r.val} kg</td>
                      <td style={{ color: Math.abs(d) < 2 ? '#22c55e' : d > 0 ? '#f59e0b' : '#3b82f6' }}>{d > 0 ? '+' : ''}{d.toFixed(1)} kg</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
