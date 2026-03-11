'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { calculateMutualFundReturn } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { DollarSign, TrendingUp, Percent, Info } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [amount, setAmount] = useState(500000)
  const [returnRate, setReturnRate] = useState(12)
  const [years, setYears] = useState(10)
  const [expenseRatio, setExpenseRatio] = useState(1.5)

  const result = useMemo(() => calculateMutualFundReturn(amount, returnRate, years, expenseRatio), [amount, returnRate, years, expenseRatio])
  const r = result as any

  // Compare expense ratios
  const expenseComparison = [0.1, 0.5, 1.0, 1.5, 2.0, 2.5].map(er => {
    const res = calculateMutualFundReturn(amount, returnRate, years, er) as any
    return { er: `${er}%`, value: res.finalValue || 0, cost: res.expenseCost || 0 }
  })

  return (
    <CalculatorLayout title="Mutual Fund Return Calculator" description="Calculate mutual fund returns adjusted for expense ratio. See how expense ratio dramatically affects long-term wealth." icon="📊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Fund Details</h2>
          <div className="space-y-5">
            <InputField label="Investment Amount" value={amount} onChange={setAmount} min={1000} max={100000000} step={1000} prefix={currency.symbol} />
            <InputField label="Expected Annual Return" value={returnRate} onChange={setReturnRate} min={1} max={30} step={0.5} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yr" />
            <InputField label="Expense Ratio" value={expenseRatio} onChange={setExpenseRatio} min={0.1} max={3} step={0.1} suffix="%" />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="text-xs text-red-700 font-bold mb-1">💸 Expense Ratio Cost</p>
            <p className="text-xl font-black text-red-700">{fmt(r.expenseCost || 0, true)}</p>
            <p className="text-xs text-red-600 mt-0.5">lost to expense ratio over {years} years</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Net Final Value" value={fmt(r.finalValue || 0)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Gross Return" value={fmt(r.grossReturn || 0)} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Expense Cost" value={fmt(r.expenseCost || 0)} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Net Return %" value={`${(returnRate - expenseRatio).toFixed(1)}%`} icon={<Percent className="w-4 h-4" />} />
          </div>

          {r.yearlyData?.length > 0 && (
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-4">Gross vs Net Value Over Time</h3>
              <div style={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={r.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="mfG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                      <linearGradient id="mfGross" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#93c5fd" stopOpacity={0.15} /><stop offset="95%" stopColor="#93c5fd" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y}`} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                    <Area type="monotone" dataKey="grossValue" name="Gross Value (no expense)" stroke="#93c5fd" fill="url(#mfGross)" strokeWidth={1.5} dot={false} />
                    <Area type="monotone" dataKey="netValue" name="Net Value (after expense)" stroke="#16a34a" fill="url(#mfG)" strokeWidth={2.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              Expense Ratio Impact Comparison
              <span className="text-xs text-gray-400 font-normal flex items-center gap-1"><Info className="w-3 h-3" /> Lower is always better</span>
            </h3>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseComparison} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="er" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => [fmt(v), '']} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                  <Bar dataKey="value" name="Final Value" fill="#16a34a" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="cost" name="Lost to Expense" fill="#fca5a5" radius={[4, 4, 0, 0]} stackId="a" />
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
