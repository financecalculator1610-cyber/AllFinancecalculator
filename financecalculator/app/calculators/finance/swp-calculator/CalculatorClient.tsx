'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { calculateSWP } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { DollarSign, TrendingDown, Calendar, Percent } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [investment, setInvestment] = useState(1000000)
  const [withdrawal, setWithdrawal] = useState(8000)
  const [returnRate, setReturnRate] = useState(10)
  const [years, setYears] = useState(20)

  const result = useMemo(() => calculateSWP(investment, withdrawal, returnRate, years), [investment, withdrawal, returnRate, years])
  const r = result as any

  const totalWithdrawn = withdrawal * 12 * years
  const isCorpusSustainable = (r.finalBalance || 0) > 0

  // Build annual chart data
  const annualData = r.yearlyData
    ? r.yearlyData.filter((_: any, i: number) => i % 12 === 11 || i === r.yearlyData.length - 1).map((d: any) => ({
        year: Math.ceil((d.month || 12) / 12),
        balance: Math.max(0, d.balance),
        withdrawn: d.totalWithdrawn,
      }))
    : []

  return (
    <CalculatorLayout title="SWP Calculator" description="Calculate Systematic Withdrawal Plan — how long your corpus lasts, total withdrawals, and remaining balance projections." icon="💸" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">SWP Details</h2>
          <div className="space-y-5">
            <InputField label="Total Investment" value={investment} onChange={setInvestment} min={10000} max={100000000} step={10000} prefix={currency.symbol} />
            <InputField label="Monthly Withdrawal" value={withdrawal} onChange={setWithdrawal} min={100} max={1000000} step={100} prefix={currency.symbol} />
            <InputField label="Expected Annual Return" value={returnRate} onChange={setReturnRate} min={1} max={20} step={0.5} suffix="%" />
            <InputField label="Withdrawal Period (Years)" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yr" />
          </div>
          <div className={`mt-5 p-4 rounded-xl border ${isCorpusSustainable ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <p className={`text-xs font-bold mb-1 ${isCorpusSustainable ? 'text-green-700' : 'text-red-700'}`}>{isCorpusSustainable ? '✅ Corpus Sustainable' : '⚠️ Corpus May Exhaust'}</p>
            <p className={`text-lg font-black ${isCorpusSustainable ? 'text-green-700' : 'text-red-700'}`}>{fmt(Math.max(0, r.finalBalance || 0), true)}</p>
            <p className={`text-xs mt-0.5 ${isCorpusSustainable ? 'text-green-600' : 'text-red-600'}`}>Remaining after {years} years</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Final Balance" value={fmt(Math.max(0, r.finalBalance || 0))} highlight={isCorpusSustainable} icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Total Withdrawn" value={fmt(r.totalWithdrawn || totalWithdrawn)} icon={<TrendingDown className="w-4 h-4" />} />
            <ResultCard label="Total Interest" value={fmt(r.totalInterestEarned || 0)} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Period" value={`${years} Yrs`} icon={<Calendar className="w-4 h-4" />} />
          </div>

          {annualData.length > 0 && (
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-4">Corpus Balance Over Time</h3>
              <div style={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={annualData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="swpB" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                      <linearGradient id="swpW" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} /><stop offset="95%" stopColor="#f59e0b" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Year', position: 'insideBottom', offset: -2, fill: '#9ca3af', fontSize: 10 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y}`} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                    <Area type="monotone" dataKey="balance" name="Remaining Corpus" stroke="#16a34a" fill="url(#swpB)" strokeWidth={2.5} dot={false} />
                    <Area type="monotone" dataKey="withdrawn" name="Total Withdrawn" stroke="#f59e0b" fill="url(#swpW)" strokeWidth={1.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Key Metrics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs text-gray-500 font-semibold mb-1">Monthly Withdrawal</p>
                <p className="text-base font-black text-gray-900">{fmt(withdrawal)}</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs text-gray-500 font-semibold mb-1">Withdrawal Rate</p>
                <p className="text-base font-black text-gray-900">{((withdrawal * 12 / investment) * 100).toFixed(1)}% annual</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs text-gray-500 font-semibold mb-1">Return vs Withdrawal</p>
                <p className={`text-base font-black ${returnRate > (withdrawal * 12 / investment * 100) ? 'text-green-700' : 'text-red-600'}`}>
                  {returnRate > (withdrawal * 12 / investment * 100) ? '✅ Surplus' : '⚠️ Deficit'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
