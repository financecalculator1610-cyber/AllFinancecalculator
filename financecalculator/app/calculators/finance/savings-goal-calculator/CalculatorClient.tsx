'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { calculateSavingsGoal } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [goalAmount, setGoalAmount] = useState(d.loanAmount * 2)
  const [currentSavings, setCurrentSavings] = useState(d.smallAmount)
  const [annualRate, setAnnualRate] = useState(8)
  const [years, setYears] = useState(5)

  const result = useMemo(() => calculateSavingsGoal(goalAmount, currentSavings, annualRate, years), [goalAmount, currentSavings, annualRate, years])

  const goalProgress = Math.min(100, Math.round((currentSavings / goalAmount) * 100))

  const tickFmt = (v: number) => {
    if (currency.code === 'INR') return v >= 100000 ? `₹${(v / 100000).toFixed(0)}L` : `₹${(v / 1000).toFixed(0)}K`
    return v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(1)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`
  }

  return (
    <CalculatorLayout title="Savings Goal Calculator" description={`Calculate how much to save monthly to reach your financial goal in ${currency.name}.`} icon="🎯" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Your Goal</h2>
          <div className="space-y-5">
            <InputField label={`Target Amount (${currency.symbol})`} value={goalAmount} onChange={setGoalAmount}
              min={currency.code === 'INR' ? 10000 : 1000}
              max={currency.code === 'INR' ? 100000000 : 10000000}
              step={currency.code === 'INR' ? 10000 : 1000}
              prefix={currency.symbol}
            />
            <InputField label={`Current Savings (${currency.symbol})`} value={currentSavings} onChange={setCurrentSavings}
              min={0} max={goalAmount}
              step={currency.code === 'INR' ? 1000 : 100}
              prefix={currency.symbol}
            />
            <InputField label="Expected Annual Return" value={annualRate} onChange={setAnnualRate} min={1} max={25} step={0.5} suffix="%" />
            <InputField label="Time to Goal" value={years} onChange={setYears} min={1} max={30} step={1} suffix="Yrs" />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-transparent border border-green-200">
            <p className="text-xs text-gray-500 mb-1">Goal Progress</p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-bold font-display text-green-700">{goalProgress}%</span>
              <span className="text-gray-400 text-xs pb-1">funded</span>
            </div>
            <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-300" style={{ width: `${goalProgress}%` }} />
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Monthly Savings Needed" value={fmt(result.monthlySIPRequired)} subValue="Start investing now" highlight />
            <ResultCard label="Goal Amount" value={fmtCompact(goalAmount)} />
            <ResultCard label="Current Savings (grown)" value={fmtCompact(result.currentSavingsGrown)} />
            <ResultCard label="Still Need" value={fmtCompact(Math.max(0, goalAmount - result.currentSavingsGrown))} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Savings Progress to Goal</h3>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sgGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} /><stop offset="95%" stopColor="#14b8a6" stopOpacity={0} /></linearGradient>
                    <linearGradient id="sgInv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={76} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                  {/* Goal line as reference */}
                  <Area type="monotone" dataKey="invested" name="Total Invested" stroke="#3b82f6" fill="url(#sgInv)" strokeWidth={2} />
                  <Area type="monotone" dataKey="total" name="Projected Savings" stroke="#14b8a6" fill="url(#sgGrad)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Year-wise Progress</h3>
            <div className="overflow-y-auto max-h-56">
              <table className="calc-table">
                <thead><tr><th>Year</th><th>Total Invested</th><th>Returns</th><th>Total Savings</th><th>% of Goal</th></tr></thead>
                <tbody>
                  {result.yearlyData.map(row => (
                    <tr key={row.year}>
                      <td className="text-gray-500">{row.year}</td>
                      <td>{fmtCompact(row.invested)}</td>
                      <td className="text-green-600">{fmtCompact(row.returns)}</td>
                      <td className="font-semibold text-white">{fmtCompact(row.total)}</td>
                      <td className="text-gray-700">{Math.min(100, Math.round((row.total / goalAmount) * 100))}%</td>
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
