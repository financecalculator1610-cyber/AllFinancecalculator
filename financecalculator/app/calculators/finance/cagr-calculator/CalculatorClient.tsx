'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { calculateCAGR } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { TrendingUp, Percent, Calendar, DollarSign } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt } = useCurrency()
  const [initialValue, setInitialValue] = useState(100000)
  const [finalValue, setFinalValue] = useState(350000)
  const [years, setYears] = useState(7)

  const result = useMemo(() => calculateCAGR(initialValue, finalValue, years), [initialValue, finalValue, years])
  const r = result as any

  const ruleOf72 = r.cagr > 0 ? (72 / r.cagr).toFixed(1) : '—'

  // Comparison: what if different CAGRs
  const comparison = [6, 8, 10, 12, 15].map(rate => ({
    rate: `${rate}%`,
    value: Math.round(initialValue * Math.pow(1 + rate / 100, years))
  }))

  return (
    <CalculatorLayout title="CAGR Calculator" description="Calculate Compound Annual Growth Rate (CAGR) of any investment. See year-wise growth and compare scenarios." icon="📈" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Investment Details</h2>
          <div className="space-y-5">
            <InputField label="Initial Investment" value={initialValue} onChange={setInitialValue} min={1000} max={10000000} step={1000} prefix="$" />
            <InputField label="Final Value" value={finalValue} onChange={setFinalValue} min={1000} max={100000000} step={1000} prefix="$" />
            <InputField label="Investment Period (Years)" value={years} onChange={setYears} min={1} max={50} step={1} suffix="Yr" />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-green-50 border border-green-200">
            <p className="text-xs text-green-700 font-bold mb-1">Rule of 72</p>
            <p className="text-2xl font-black text-green-700">{ruleOf72} years</p>
            <p className="text-xs text-green-600 mt-0.5">to double at this CAGR</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="CAGR" value={`${r.cagr?.toFixed(2) || 0}%`} highlight icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Total Gain" value={fmt(r.absoluteReturn || 0)} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Return %" value={`${r.percentReturn?.toFixed(1) || 0}%`} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Time Period" value={`${years} Years`} icon={<Calendar className="w-4 h-4" />} />
          </div>

          {r.yearlyData?.length > 0 && (
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-4">Growth Trajectory</h3>
              <div style={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={r.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="cG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Year', position: 'insideBottom', offset: -2, fill: '#9ca3af', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y}`} />
                    <Area type="monotone" dataKey="total" name="Portfolio Value" stroke="#16a34a" fill="url(#cG)" strokeWidth={2.5} dot={false} />
                    <Area type="monotone" dataKey="invested" name="Initial Investment" stroke="#93c5fd" fill="none" strokeWidth={1.5} strokeDasharray="5 4" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Rate Comparison — {years}-Year Horizon</h3>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparison} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="rate" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => [fmt(v), 'Value']} />
                  <Bar dataKey="value" name="Final Value" fill="#16a34a" radius={[6, 6, 0, 0]} />
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
