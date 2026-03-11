'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { calculateBodyFat } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [weight, setWeight] = useState(80)
  const [height, setHeight] = useState(175)
  const [waist, setWaist] = useState(85)
  const [neck, setNeck] = useState(38)
  const [hip, setHip] = useState(95)

  const result = useMemo(() => calculateBodyFat(gender, weight, height, waist, neck, gender === 'female' ? hip : undefined), [gender, weight, height, waist, neck, hip])

  const categoryRanges = gender === 'male'
    ? [{ label: 'Essential', min: 2, max: 5, color: '#3b82f6' }, { label: 'Athletic', min: 6, max: 13, color: '#22c55e' }, { label: 'Fitness', min: 14, max: 17, color: '#14b8a6' }, { label: 'Average', min: 18, max: 24, color: '#f59e0b' }, { label: 'Obese', min: 25, max: 40, color: '#ef4444' }]
    : [{ label: 'Essential', min: 10, max: 13, color: '#3b82f6' }, { label: 'Athletic', min: 14, max: 20, color: '#22c55e' }, { label: 'Fitness', min: 21, max: 24, color: '#14b8a6' }, { label: 'Average', min: 25, max: 31, color: '#f59e0b' }, { label: 'Obese', min: 32, max: 50, color: '#ef4444' }]

  const currentCat = categoryRanges.find(c => result.bodyFat >= c.min && result.bodyFat <= c.max) || categoryRanges[categoryRanges.length - 1]

  const bodyComposition = [
    { name: 'Fat Mass', value: result.fatMass, color: '#f59e0b' },
    { name: 'Lean Mass', value: result.leanMass, color: '#14b8a6' },
  ]

  return (
    <CalculatorLayout title="Body Fat Calculator" description="Calculate body fat percentage using the US Navy method. Get fat mass, lean mass, and fitness category." icon="💪" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Measurements</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male', 'female'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {g === 'male' ? '♂ Male' : '♀ Female'}
                </button>
              ))}
            </div>
            <InputField label="Weight" value={weight} onChange={setWeight} min={30} max={250} step={0.5} suffix="kg" />
            <InputField label="Height" value={height} onChange={setHeight} min={100} max={250} step={1} suffix="cm" />
            <InputField label="Waist (at navel)" value={waist} onChange={setWaist} min={50} max={200} step={0.5} suffix="cm" />
            <InputField label="Neck (below larynx)" value={neck} onChange={setNeck} min={25} max={70} step={0.5} suffix="cm" />
            {gender === 'female' && <InputField label="Hip (widest point)" value={hip} onChange={setHip} min={60} max={200} step={0.5} suffix="cm" />}
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {/* Big number */}
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Body Fat Percentage</p>
              <div className="text-7xl font-black font-display mb-2" style={{ color: currentCat.color }}>{result.bodyFat}%</div>
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold" style={{ background: `${currentCat.color}20`, color: currentCat.color, border: `1px solid ${currentCat.color}40` }}>
                {result.category}
              </span>
            </div>
          </Card>

          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Body Fat" value={`${result.bodyFat}%`} subValue={result.category} highlight />
            <ResultCard label="Fat Mass" value={`${result.fatMass} kg`} />
            <ResultCard label="Lean Mass" value={`${result.leanMass} kg`} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Body Composition</h3>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={bodyComposition} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                      {bodyComposition.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [`${v} kg`]} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Body Fat Categories</h3>
              <div className="space-y-2.5">
                {categoryRanges.map(cat => (
                  <div key={cat.label} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm text-gray-700">{cat.label}</span>
                      <span className="text-xs text-gray-500">{cat.min}–{cat.max}%</span>
                    </div>
                    {result.category === cat.label && <span className="text-xs font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${cat.color}30`, color: cat.color }}>YOU</span>}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
