'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts'
import { calculateRetirement } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [currentAge, setCurrentAge] = useState(30)
  const [retireAge, setRetireAge] = useState(60)
  const [monthlyExpense, setMonthlyExpense] = useState(d.monthlyExpense)
  const [currentSavings, setCurrentSavings] = useState(d.mediumAmount)
  const [expectedReturn, setExpectedReturn] = useState(10)
  const [inflation, setInflation] = useState(4)

  const result = useMemo(() => calculateRetirement(currentAge, retireAge, monthlyExpense, currentSavings, expectedReturn, inflation), [currentAge, retireAge, monthlyExpense, currentSavings, expectedReturn, inflation])

  const yearsToRetire = retireAge - currentAge
  const progressPct = Math.min(100, Math.round((result.currentSavingsGrown / result.corpusRequired) * 100))

  const tickFmt = (v: number) => {
    if (currency.code === 'INR') return v >= 10000000 ? `₹${(v / 10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v / 100000).toFixed(0)}L` : `₹${(v / 1000).toFixed(0)}K`
    return v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(1)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`
  }

  return (
    <CalculatorLayout title="Retirement Calculator" description={`Plan your retirement corpus in ${currency.name}. Calculate exactly how much you need and how much to save monthly.`} icon="🌅" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Your Details</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={55} step={1} suffix="yr" showSlider={false} />
              <InputField label="Retire At" value={retireAge} onChange={setRetireAge} min={45} max={75} step={1} suffix="yr" showSlider={false} />
            </div>
            <div className="p-3 rounded-xl bg-green-100 border border-green-200 text-center">
              <span className="text-2xl font-bold text-green-700">{yearsToRetire}</span>
              <span className="text-gray-500 text-sm ml-2">years to retirement</span>
            </div>
            <InputField label={`Monthly Expenses (${currency.symbol})`} value={monthlyExpense} onChange={setMonthlyExpense}
              min={currency.code === 'INR' ? 5000 : 500} max={currency.code === 'INR' ? 500000 : 50000}
              step={currency.code === 'INR' ? 5000 : 500} prefix={currency.symbol} />
            <InputField label={`Current Savings (${currency.symbol})`} value={currentSavings} onChange={setCurrentSavings}
              min={0} max={currency.code === 'INR' ? 50000000 : 5000000}
              step={currency.code === 'INR' ? 10000 : 1000} prefix={currency.symbol} />
            <InputField label="Expected Return" value={expectedReturn} onChange={setExpectedReturn} min={4} max={20} step={0.5} suffix="%" />
            <InputField label="Inflation Rate" value={inflation} onChange={setInflation} min={1} max={12} step={0.5} suffix="%" />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Corpus Required" value={fmtCompact(result.corpusRequired)} subValue={`At age ${retireAge}`} highlight />
            <ResultCard label="Monthly SIP Needed" value={fmt(result.monthlySIPRequired)} subValue={`For ${yearsToRetire} years`} />
            <ResultCard label="Current Savings at Retirement" value={fmtCompact(result.currentSavingsGrown)} />
            <ResultCard label="Additional Corpus Needed" value={fmtCompact(result.additionalRequired)} />
          </div>

          {/* Progress bar */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Retirement Readiness</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Current savings cover</span>
              <span className="text-lg font-bold font-display" style={{ color: progressPct >= 80 ? '#22c55e' : progressPct >= 40 ? '#f59e0b' : '#ef4444' }}>{progressPct}%</span>
            </div>
            <div className="h-4 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%`, background: progressPct >= 80 ? 'linear-gradient(90deg,#22c55e,#86efac)' : progressPct >= 40 ? 'linear-gradient(90deg,#f59e0b,#fde68a)' : 'linear-gradient(90deg,#ef4444,#fca5a5)' }} />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {progressPct < 100 ? `You need ${fmtCompact(result.additionalRequired)} more to fully fund retirement. Start a SIP of ${fmt(result.monthlySIPRequired)}/month.` : `Great! Your savings are on track for retirement. Keep growing!`}
            </p>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Wealth Projection to Retirement</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} /><stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Age', fill: '#475569', fontSize: 11, position: 'insideBottomRight', offset: -5 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={76} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Age ${y}`} />
                  <Area type="monotone" dataKey="total" name="Projected Wealth" stroke="#14b8a6" fill="url(#retGrad)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
