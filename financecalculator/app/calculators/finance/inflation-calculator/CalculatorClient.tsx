'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line, Bar } from 'recharts'
import { calculateInflation } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [amount, setAmount] = useState(d.mediumAmount)
  const [inflationRate, setInflationRate] = useState(3.5)
  const [years, setYears] = useState(10)

  const result = useMemo(() => calculateInflation(amount, inflationRate, years), [amount, inflationRate, years])

  const inflationData = result.yearlyData.map((r: any) => ({
    year: r.year,
    futureValue: r.total,
    purchasingPower: Math.round(amount / Math.pow(1 + inflationRate / 100, r.year)),
  }))

  const tickFmt = (v: number) => {
    if (currency.code === 'INR') return v >= 100000 ? `₹${(v / 100000).toFixed(0)}L` : `₹${(v / 1000).toFixed(0)}K`
    return v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(1)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`
  }

  const purchasingPowerLoss = ((amount - result.purchasingPower) / amount * 100).toFixed(1)

  return (
    <CalculatorLayout title="Inflation Calculator" description={`See how inflation erodes purchasing power in ${currency.name}. Plan your savings to beat inflation.`} icon="📊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Inputs</h2>
          <div className="space-y-5">
            <InputField label={`Current Amount (${currency.symbol})`} value={amount} onChange={setAmount}
              min={currency.code === 'INR' ? 1000 : 100}
              max={currency.code === 'INR' ? 10000000 : 1000000}
              step={currency.code === 'INR' ? 1000 : 100}
              prefix={currency.symbol}
            />
            <InputField label="Inflation Rate" value={inflationRate} onChange={setInflationRate} min={0.5} max={20} step={0.5} suffix="%" />
            <InputField label="Time Period" value={years} onChange={setYears} min={1} max={50} step={1} suffix="Yrs" />
          </div>
          <div className="mt-5 space-y-3">
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-xs text-gray-500 mb-1">Purchasing Power Loss</p>
              <p className="text-2xl font-bold font-display text-red-400">{purchasingPowerLoss}%</p>
              <p className="text-xs text-gray-400 mt-1">Your {fmt(amount)} will feel like {fmt(result.purchasingPower)} today</p>
            </div>
            <div className="p-4 rounded-xl bg-green-100 border border-green-200">
              <p className="text-xs text-gray-500 mb-1">Future Cost of {fmt(amount)} today</p>
              <p className="text-2xl font-bold font-display text-green-700">{fmtCompact(result.futureValue)}</p>
              <p className="text-xs text-gray-400 mt-1">In {years} years at {inflationRate}% inflation</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Future Cost" value={fmtCompact(result.futureValue)} subValue={`In ${years} years`} highlight />
            <ResultCard label="Purchasing Power" value={fmtCompact(result.purchasingPower)} subValue="Real value today" />
            <ResultCard label="Investment Needed" value={fmtCompact(result.futureValue)} subValue="To maintain value" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Future Value vs Purchasing Power</h3>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={inflationData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="infFv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} /><stop offset="95%" stopColor="#f59e0b" stopOpacity={0} /></linearGradient>
                    <linearGradient id="infPp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={76} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                  <Area type="monotone" dataKey="futureValue" name="Future Cost" stroke="#f59e0b" fill="url(#infFv)" strokeWidth={2} />
                  <Area type="monotone" dataKey="purchasingPower" name="Purchasing Power" stroke="#3b82f6" fill="url(#infPp)" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Year-wise Inflation Impact</h3>
            <div className="overflow-y-auto max-h-56">
              <table className="calc-table">
                <thead><tr><th>Year</th><th>Future Cost</th><th>Purchasing Power</th><th>Value Lost</th></tr></thead>
                <tbody>
                  {inflationData.map((row, i) => (
                    <tr key={i}>
                      <td className="text-gray-500">{row.year}</td>
                      <td className="text-amber-400">{fmtCompact(row.futureValue)}</td>
                      <td className="text-blue-400">{fmtCompact(row.purchasingPower)}</td>
                      <td className="text-red-400">{fmtCompact(amount - row.purchasingPower)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
