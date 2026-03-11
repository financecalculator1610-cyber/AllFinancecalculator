'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { calculateRD } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { DollarSign, TrendingUp, Calendar, Percent } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000)
  const [rate, setRate] = useState(6.5)
  const [months, setMonths] = useState(24)

  const result = useMemo(() => calculateRD(monthlyDeposit, rate, months), [monthlyDeposit, rate, months])
  const r = result as any

  // Quarterly data for chart
  const chartData = []
  for (let m = 3; m <= months; m += 3) {
    const partial = calculateRD(monthlyDeposit, rate, m) as any
    chartData.push({ month: m, invested: monthlyDeposit * m, interest: partial.interest || 0, total: partial.maturityAmount || 0 })
  }

  return (
    <CalculatorLayout title="RD Calculator" description="Calculate Recurring Deposit maturity amount and interest earned with monthly deposit tracking." icon="🏧" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">RD Details</h2>
          <div className="space-y-5">
            <InputField label="Monthly Deposit" value={monthlyDeposit} onChange={setMonthlyDeposit} min={100} max={500000} step={100} prefix={currency.symbol} />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={1} max={15} step={0.1} suffix="%" />
            <InputField label="Tenure (Months)" value={months} onChange={setMonths} min={6} max={120} step={1} suffix="Mo" />
          </div>
          <div className="mt-5 space-y-2">
            <div className="p-3 rounded-xl bg-green-50 border border-green-200 flex justify-between items-center">
              <span className="text-xs text-green-700 font-semibold">Maturity Amount</span>
              <span className="text-base font-black text-green-700">{fmt(r.maturityAmount || 0, true)}</span>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex justify-between items-center">
              <span className="text-xs text-blue-700 font-semibold">Total Invested</span>
              <span className="text-base font-black text-blue-700">{fmt(monthlyDeposit * months, true)}</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Maturity Amount" value={fmt(r.maturityAmount || 0)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Interest Earned" value={fmt(r.interest || 0)} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Total Invested" value={fmt(monthlyDeposit * months)} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Tenure" value={`${months} Mo`} icon={<Calendar className="w-4 h-4" />} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Quarterly Growth Tracker</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rdT" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                    <linearGradient id="rdI" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#93c5fd" stopOpacity={0.2} /><stop offset="95%" stopColor="#93c5fd" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: 'Months', position: 'insideBottom', offset: -2, fill: '#9ca3af', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={65} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => [fmt(v), '']} labelFormatter={m => `Month ${m}`} />
                  <Area type="monotone" dataKey="invested" name="Invested" stroke="#93c5fd" fill="url(#rdI)" strokeWidth={1.5} dot={false} />
                  <Area type="monotone" dataKey="total" name="Total Value" stroke="#16a34a" fill="url(#rdT)" strokeWidth={2.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Interest Accumulation by Quarter</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={60} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => [fmt(v), 'Interest']} />
                  <Bar dataKey="interest" name="Interest Earned" fill="#16a34a" radius={[4, 4, 0, 0]} />
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
