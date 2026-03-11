'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from 'recharts'
import { calculateEMI } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [homeValue, setHomeValue] = useState(d.homeLoan)
  const [downPayPct, setDownPayPct] = useState(20)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(30)

  const downPayment = Math.round(homeValue * downPayPct / 100)
  const loanAmount = homeValue - downPayment
  const result = useMemo(() => calculateEMI(loanAmount, rate, years * 12), [loanAmount, rate, years])

  const pieData = [
    { name: 'Down Payment', value: downPayment, color: '#22c55e' },
    { name: 'Principal', value: loanAmount, color: '#3b82f6' },
    { name: 'Total Interest', value: result.totalInterest, color: '#f59e0b' },
  ]

  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const slice = result.schedule.slice((y - 1) * 12, y * 12)
    yearlyData.push({
      year: `Y${y}`,
      principal: Math.round(slice.reduce((s, m) => s + m.principal, 0)),
      interest: Math.round(slice.reduce((s, m) => s + m.interest, 0)),
      balance: slice[slice.length - 1]?.balance ?? 0,
    })
  }

  const tickFmt = (v: number) => {
    if (currency.code === 'INR') return v >= 10000000 ? `₹${(v / 10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v / 100000).toFixed(0)}L` : `₹${(v / 1000).toFixed(0)}K`
    return v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(1)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`
  }

  return (
    <CalculatorLayout title="Home Loan / Mortgage Calculator" description={`Calculate your home loan EMI, amortization, and total interest in ${currency.name}.`} icon="🏠" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Property & Loan</h2>
          <div className="space-y-5">
            <InputField label={`Property Value (${currency.symbol})`} value={homeValue} onChange={setHomeValue}
              min={currency.code === 'INR' ? 1000000 : 50000}
              max={currency.code === 'INR' ? 100000000 : 5000000}
              step={currency.code === 'INR' ? 100000 : 10000}
              prefix={currency.symbol}
            />
            <InputField label="Down Payment" value={downPayPct} onChange={setDownPayPct} min={5} max={50} step={1} suffix="%" />
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm space-y-1.5">
              <div className="flex justify-between"><span className="text-gray-500">Down Payment</span><span className="text-green-400 font-semibold">{fmt(downPayment)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Loan Amount</span><span className="text-blue-400 font-semibold">{fmt(loanAmount)}</span></div>
            </div>
            <InputField label="Interest Rate" value={rate} onChange={setRate} min={2} max={20} step={0.1} suffix="%" />
            <InputField label="Loan Tenure" value={years} onChange={setYears} min={5} max={30} step={1} suffix="Yrs" />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Monthly EMI" value={fmt(result.emi)} highlight />
            <ResultCard label="Total Interest" value={fmtCompact(result.totalInterest)} subValue={`${((result.totalInterest / loanAmount) * 100).toFixed(1)}% of loan`} />
            <ResultCard label="Total Cost" value={fmtCompact(homeValue + result.totalInterest)} subValue="Property + interest" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Cost Breakdown</h3>
              <div style={{ height: 210 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={82} paddingAngle={3} dataKey="value">
                      {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Remaining Balance</h3>
              <div style={{ height: 210 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={yearlyData.filter((_, i) => i % 2 === 0 || i === yearlyData.length - 1)} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                    <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} width={72} tickFormatter={tickFmt} />
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                    <Line type="monotone" dataKey="balance" name="Remaining Balance" stroke="#ec4899" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Yearly Payment Breakdown</h3>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData.filter((_, i) => i % 3 === 0 || i === yearlyData.length - 1)} margin={{ top: 0, right: 5, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} width={72} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="principal" name="Principal" fill="#3b82f6" stackId="a" />
                  <Bar dataKey="interest" name="Interest" fill="#f59e0b" stackId="a" radius={[4, 4, 0, 0]} />
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
