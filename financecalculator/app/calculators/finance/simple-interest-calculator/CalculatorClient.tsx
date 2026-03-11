'use client'
import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { calculateSimpleInterest, calculateCompoundInterest } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { DollarSign, Percent, Calendar, TrendingUp } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(5)

  const r = useMemo(() => calculateSimpleInterest(principal, rate, years), [principal, rate, years])
  const ci = useMemo(() => calculateCompoundInterest(principal, rate, years, 12), [principal, rate, years])

  const chartData = Array.from({ length: years }, (_, i) => {
    const y = i + 1
    const siInterest = (principal * rate * y) / 100
    const ciResult = calculateCompoundInterest(principal, rate, y, 12)
    return { year: `Y${y}`, SI: Math.round(principal + siInterest), CI: Math.round(ciResult.amount) }
  })

  return (
    <CalculatorLayout title="Simple Interest Calculator" description="Calculate simple interest and compare it with compound interest. See exactly how much more compound interest earns over time." icon="📐" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Inputs</h2>
          <div className="space-y-5">
            <InputField label="Principal Amount" value={principal} onChange={setPrincipal} min={1000} max={100000000} step={1000} prefix={currency.symbol} />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={0.1} max={50} step={0.5} suffix="%" />
            <InputField label="Time Period" value={years} onChange={setYears} min={1} max={50} step={1} suffix="Years" />
          </div>
          <div className="mt-5 space-y-2">
            <div className="flex justify-between items-center p-3 rounded-xl bg-blue-50 border border-blue-200">
              <span className="text-xs font-semibold text-blue-700">Simple Interest</span>
              <span className="text-sm font-black text-blue-700">{fmt(r.simpleInterest)}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-green-50 border border-green-200">
              <span className="text-xs font-semibold text-green-700">Compound Interest</span>
              <span className="text-sm font-black text-green-700">{fmt(Math.round(ci.amount - principal))}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-xs font-semibold text-amber-700">CI Advantage</span>
              <span className="text-sm font-black text-amber-700">{fmt(Math.round(ci.amount - r.totalAmount))}</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Total Amount (SI)" value={fmt(r.totalAmount)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Simple Interest" value={fmt(r.simpleInterest)} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Principal" value={fmt(r.principal)} icon={<Calendar className="w-4 h-4" />} />
            <ResultCard label="Effective Rate" value={`${((r.simpleInterest / principal) * 100).toFixed(1)}%`} icon={<TrendingUp className="w-4 h-4" />} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Simple Interest vs Compound Interest</h3>
            <div style={{ height: 230 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y.replace('Y', '')}`} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="SI" name="Simple Interest" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="CI" name="Compound Interest" stroke="#16a34a" strokeWidth={2.5} dot={false} strokeDasharray="0" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Year-wise Breakdown</h3>
            <div className="max-h-52 overflow-y-auto">
              <table className="calc-table">
                <thead><tr><th>Year</th><th>SI Total</th><th>CI Total</th><th>CI Advantage</th></tr></thead>
                <tbody>{chartData.map((row, i) => (
                  <tr key={i}>
                    <td className="text-gray-500">{i + 1}</td>
                    <td>{fmt(row.SI)}</td>
                    <td className="text-green-600">{fmt(row.CI)}</td>
                    <td className="font-bold text-amber-600">+{fmt(row.CI - row.SI)}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
