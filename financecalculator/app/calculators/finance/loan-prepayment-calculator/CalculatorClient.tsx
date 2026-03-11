'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { calculateLoanPrepayment } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { DollarSign, TrendingDown, Calendar, Percent } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [principal, setPrincipal] = useState(3000000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(240)
  const [prepayment, setPrepayment] = useState(200000)
  const [afterMonth, setAfterMonth] = useState(24)

  const result = useMemo(() => calculateLoanPrepayment(principal, rate, tenure, prepayment, afterMonth), [principal, rate, tenure, prepayment, afterMonth])
  const r = result as any

  const monthsSaved = (r.originalMonths || tenure) - (r.newMonths || tenure)
  const yearsSaved = Math.floor(monthsSaved / 12)
  const remMonths = monthsSaved % 12

  // Annual comparison data
  const compData: any[] = []
  const origYears = Math.ceil((r.originalMonths || tenure) / 12)
  const newYears = Math.ceil((r.newMonths || tenure) / 12)
  for (let y = 1; y <= Math.max(origYears, newYears); y++) {
    const origBal = r.originalSchedule?.find((s: any) => Math.ceil(s.month / 12) === y && s.month % 12 === 0)?.balance
    const newBal = r.newSchedule?.find((s: any) => Math.ceil(s.month / 12) === y && s.month % 12 === 0)?.balance
    compData.push({ year: y, original: origBal ?? (y <= origYears ? 0 : null), prepaid: newBal ?? (y <= newYears ? 0 : null) })
  }

  return (
    <CalculatorLayout title="Loan Prepayment Calculator" description="Find out exactly how much interest you save and how many years you cut by making a one-time prepayment on your loan." icon="💰" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Loan Details</h2>
          <div className="space-y-5">
            <InputField label="Loan Amount" value={principal} onChange={setPrincipal} min={10000} max={100000000} step={10000} prefix={currency.symbol} />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={1} max={25} step={0.1} suffix="%" />
            <InputField label="Tenure (Months)" value={tenure} onChange={setTenure} min={12} max={360} step={12} suffix="Mo" />
            <InputField label="Prepayment Amount" value={prepayment} onChange={setPrepayment} min={1000} max={50000000} step={1000} prefix={currency.symbol} />
            <InputField label="Prepay After (Month)" value={afterMonth} onChange={setAfterMonth} min={1} max={tenure - 1} step={1} suffix="Mo" />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-green-50 border border-green-200">
            <p className="text-xs text-green-700 font-bold mb-1">⏱️ Time Saved</p>
            <p className="text-xl font-black text-green-700">{yearsSaved > 0 ? `${yearsSaved}yr ` : ''}{remMonths}mo</p>
            <p className="text-xs text-green-600 mt-0.5">earlier loan closure</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Interest Saved" value={fmt(r.interestSaved || 0)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="New Tenure" value={`${Math.floor((r.newMonths || tenure) / 12)}yr ${(r.newMonths || tenure) % 12}mo`} icon={<Calendar className="w-4 h-4" />} />
            <ResultCard label="Original Interest" value={fmt(r.originalTotalInterest || 0)} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="New Total Interest" value={fmt(r.newTotalInterest || 0)} icon={<TrendingDown className="w-4 h-4" />} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-500 font-semibold mb-1">Original Tenure</p>
              <p className="text-lg font-black text-gray-900">{Math.floor(tenure / 12)}yr {tenure % 12}mo</p>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200">
              <p className="text-xs text-green-600 font-semibold mb-1">New Tenure</p>
              <p className="text-lg font-black text-green-700">{Math.floor((r.newMonths || tenure) / 12)}yr {(r.newMonths || tenure) % 12}mo</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-xs text-amber-700 font-semibold mb-1">Prepayment ROI</p>
              <p className="text-lg font-black text-amber-700">
                {prepayment > 0 ? `${((r.interestSaved || 0) / prepayment * 100).toFixed(0)}%` : '—'}
              </p>
            </div>
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Remaining Balance: Original vs Prepaid</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={compData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="lpO" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#fca5a5" stopOpacity={0.3} /><stop offset="95%" stopColor="#fca5a5" stopOpacity={0} /></linearGradient>
                    <linearGradient id="lpN" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Year', position: 'insideBottom', offset: -2, fill: '#9ca3af', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                  <Area type="monotone" dataKey="original" name="Without Prepayment" stroke="#f87171" fill="url(#lpO)" strokeWidth={1.5} dot={false} connectNulls />
                  <Area type="monotone" dataKey="prepaid" name="With Prepayment" stroke="#16a34a" fill="url(#lpN)" strokeWidth={2.5} dot={false} connectNulls />
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
