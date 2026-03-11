'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts'
import { calculateWaterIntake } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [weight, setWeight] = useState(70)
  const [activityMins, setActivityMins] = useState(30)
  const [climate, setClimate] = useState<'temperate' | 'hot' | 'cold'>('temperate')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')

  const weightKg = unit === 'imperial' ? weight * 0.453592 : weight

  const result = useMemo(() => calculateWaterIntake(weightKg, activityMins, climate), [weightKg, activityMins, climate])
  const r = result as any

  const liters = r.totalLiters || 2.5
  const oz = liters * 33.814
  const cups = liters * 4.227
  const glasses = Math.ceil(liters / 0.25)

  // Hydration schedule
  const schedule = [
    { time: '7:00 AM', label: 'Wake Up', amount: 400, emoji: '🌅' },
    { time: '9:00 AM', label: 'Mid Morning', amount: 300, emoji: '☕' },
    { time: '11:00 AM', label: 'Before Lunch', amount: 300, emoji: '🥛' },
    { time: '1:00 PM', label: 'Post Lunch', amount: 300, emoji: '🍽️' },
    { time: '3:00 PM', label: 'Afternoon', amount: 400, emoji: '⚡' },
    { time: '5:00 PM', label: 'Post Exercise', amount: 500, emoji: '💪' },
    { time: '7:00 PM', label: 'Dinner', amount: 300, emoji: '🌙' },
    { time: '9:00 PM', label: 'Evening', amount: 200, emoji: '😴' },
  ]
  const totalScheduled = schedule.reduce((s, i) => s + i.amount, 0)
  const adjusted = schedule.map(s => ({ ...s, amount: Math.round(s.amount * (liters * 1000) / totalScheduled) }))

  return (
    <CalculatorLayout title="Water Intake Calculator" description="Find your daily water intake needs based on weight, activity level, and climate. Get a personalized hydration schedule." icon="💧" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Your Details</h2>
          <div className="space-y-5">
            <SelectField label="Unit System" value={unit} onChange={v => setUnit(v as any)} options={[{ value: 'metric', label: 'Metric (kg)' }, { value: 'imperial', label: 'Imperial (lbs)' }]} />
            <InputField label={`Body Weight (${unit === 'metric' ? 'kg' : 'lbs'})`} value={weight} onChange={setWeight} min={unit === 'metric' ? 30 : 66} max={unit === 'metric' ? 200 : 440} step={1} suffix={unit === 'metric' ? 'kg' : 'lbs'} />
            <InputField label="Daily Exercise (minutes)" value={activityMins} onChange={setActivityMins} min={0} max={180} step={5} suffix="min" />
            <SelectField label="Climate" value={climate} onChange={v => setClimate(v as any)} options={[{ value: 'cold', label: '❄️ Cold Climate' }, { value: 'temperate', label: '🌤 Temperate' }, { value: 'hot', label: '☀️ Hot Climate' }]} />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
            <p className="text-xs text-blue-700 font-bold mb-1">💧 Daily Goal</p>
            <p className="text-3xl font-black text-blue-700">{liters.toFixed(1)}L</p>
            <p className="text-xs text-blue-600 mt-0.5">{glasses} glasses of 250ml</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Liters / Day" value={`${liters.toFixed(2)}L`} highlight />
            <ResultCard label="Fl. Oz / Day" value={`${oz.toFixed(0)} oz`} />
            <ResultCard label="Cups / Day" value={`${cups.toFixed(1)} cups`} />
            <ResultCard label="Glasses (250ml)" value={`${glasses} glasses`} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">💧 Daily Hydration Schedule</h3>
            <div className="space-y-2">
              {adjusted.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                  <span className="text-lg">{item.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-gray-800">{item.time} — {item.label}</span>
                      <span className="text-xs font-bold text-blue-600">{item.amount}ml</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400 rounded-full" style={{ width: `${(item.amount / Math.max(...adjusted.map(a => a.amount))) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Hydration by Activity & Climate</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { label: 'Resting', value: (weightKg * 0.031).toFixed(1) },
                  { label: '30 min ex.', value: (weightKg * 0.031 + 0.5).toFixed(1) },
                  { label: '60 min ex.', value: (weightKg * 0.031 + 1.0).toFixed(1) },
                  { label: 'Hot climate', value: (weightKg * 0.031 + 0.5).toFixed(1) },
                  { label: 'Your need', value: liters.toFixed(1) },
                ]} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="label" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}L`} width={40} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: any) => [`${v}L`, 'Water Needed']} />
                  <Bar dataKey="value" name="Liters" fill="#60a5fa" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
