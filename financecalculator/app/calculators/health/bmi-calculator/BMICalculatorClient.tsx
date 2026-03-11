'use client'
import { useState, useMemo } from 'react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { calculateBMI } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function BMICalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(170)
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [age, setAge] = useState(30)

  // Convert if imperial
  const weightKg = unit === 'imperial' ? weight * 0.453592 : weight
  const heightCm = unit === 'imperial' ? height * 2.54 : height

  const result = useMemo(() => calculateBMI(weightKg, heightCm), [weightKg, heightCm])

  const bmiCategories = [
    { name: 'Underweight', range: '< 18.5', color: '#3b82f6', min: 10, max: 18.5 },
    { name: 'Normal', range: '18.5–24.9', color: '#22c55e', min: 18.5, max: 25 },
    { name: 'Overweight', range: '25–29.9', color: '#f59e0b', min: 25, max: 30 },
    { name: 'Obese', range: '≥ 30', color: '#ef4444', min: 30, max: 45 },
  ]

  const bmiPct = Math.min(98, Math.max(2, ((result.bmi - 10) / 35) * 100))

  const weightToLose = weightKg - result.idealWeightMax
  const weightToGain = result.idealWeightMin - weightKg

  return (
    <CalculatorLayout title="BMI Calculator" description="Calculate your Body Mass Index and get personalized health insights and ideal weight range." icon="⚖️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5">Your Measurements</h2>
          <div className="space-y-4">
            {/* Unit toggle */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['metric', 'imperial'] as const).map(u => (
                <button key={u} onClick={() => setUnit(u)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${unit === u ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {u === 'metric' ? '🌍 Metric (kg/cm)' : '🇺🇸 Imperial (lb/in)'}
                </button>
              ))}
            </div>
            {/* Gender toggle */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male', 'female'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)}
                  className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {g === 'male' ? '♂ Male' : '♀ Female'}
                </button>
              ))}
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={5} max={100} step={1} suffix="yrs" />
            <InputField label={unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'} value={weight} onChange={setWeight}
              min={unit === 'metric' ? 20 : 44} max={unit === 'metric' ? 250 : 550} step={0.5}
              suffix={unit === 'metric' ? 'kg' : 'lb'} />
            <InputField label={unit === 'metric' ? 'Height (cm)' : 'Height (inches)'} value={height} onChange={setHeight}
              min={unit === 'metric' ? 100 : 40} max={unit === 'metric' ? 250 : 100} step={1}
              suffix={unit === 'metric' ? 'cm' : 'in'} />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {/* BMI Score Card */}
          <Card gradient>
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Your BMI Score</p>
              <div className="text-8xl font-black font-display mb-3 transition-all duration-500" style={{ color: result.color }}>{result.bmi}</div>
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold" style={{ background: `${result.color}20`, color: result.color, border: `1px solid ${result.color}40` }}>
                {result.category}
              </span>
              <p className="text-gray-500 text-sm mt-3">Healthy range: <span className="text-gray-900 font-semibold">{result.idealWeightMin}–{result.idealWeightMax} kg</span> for your height</p>
            </div>

            {/* BMI Scale */}
            <div className="mt-4 px-2">
              <div className="relative h-5 rounded-full overflow-hidden" style={{ background: 'linear-gradient(to right, #3b82f6 0%, #22c55e 30%, #f59e0b 60%, #ef4444 100%)' }}>
                <div className="absolute top-0.5 bottom-0.5 w-1.5 bg-white rounded-full shadow-xl transition-all duration-500" style={{ left: `calc(${bmiPct}% - 3px)` }} />
              </div>
              <div className="flex justify-between text-xs mt-1 px-0.5">
                <span className="text-blue-400">10</span>
                <span className="text-green-400">18.5</span>
                <span className="text-amber-400">25</span>
                <span className="text-red-400">30</span>
                <span className="text-red-600">45</span>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="BMI Score" value={String(result.bmi)} subValue={result.category} highlight />
            <ResultCard label="Ideal Weight" value={`${result.idealWeightMin}–${result.idealWeightMax} kg`} subValue="BMI 18.5 to 24.9" />
          </div>

          {/* BMI Categories */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">BMI Categories</h3>
            <div className="grid grid-cols-2 gap-3">
              {bmiCategories.map(cat => (
                <div key={cat.name}
                  className="p-3 rounded-xl border transition-all"
                  style={{ background: result.category === cat.name || (cat.name === 'Normal' && result.category === 'Normal Weight') ? `${cat.color}12` : 'transparent', borderColor: result.category === cat.name || (cat.name === 'Normal' && result.category === 'Normal Weight') ? `${cat.color}40` : 'rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
                    <span className="font-semibold text-white text-sm">{cat.name}</span>
                    {(result.category === cat.name || (cat.name === 'Normal' && result.category === 'Normal Weight')) && <span className="text-xs px-1.5 py-0.5 rounded-full font-bold ml-auto" style={{ background: `${cat.color}30`, color: cat.color }}>YOU</span>}
                  </div>
                  <p className="text-xs text-gray-500">BMI {cat.range}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Action card */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Your Health Action</h3>
            {result.category === 'Normal Weight' && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-300 text-sm">
                ✅ You are at a healthy weight. Maintain with regular exercise (150 min/week moderate) and a balanced diet.
              </div>
            )}
            {result.category === 'Underweight' && (
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">
                💙 You should gain approximately <strong>{Math.abs(weightToGain).toFixed(1)} kg</strong> to reach healthy BMI. Focus on nutrient-dense foods and strength training.
              </div>
            )}
            {result.category === 'Overweight' && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm">
                ⚠️ You should lose approximately <strong>{weightToLose.toFixed(1)} kg</strong> to reach healthy BMI. A 500 kcal/day deficit leads to ~0.5 kg/week loss.
              </div>
            )}
            {result.category === 'Obese' && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                🚨 You should lose approximately <strong>{weightToLose.toFixed(1)} kg</strong>. Please consult a healthcare professional for a safe, supervised plan.
              </div>
            )}
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
