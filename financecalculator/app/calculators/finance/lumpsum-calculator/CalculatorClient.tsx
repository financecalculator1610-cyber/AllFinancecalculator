'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { calculateLumpsum } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const [principal, setPrincipal] = useState(currency.defaultValues.mediumAmount)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(10)

  const result = useMemo(() => calculateLumpsum(principal, rate, years), [principal, rate, years])

  // Rule of 72
  const doublingYears = (72 / rate).toFixed(1)
  const doublingCount = Math.floor(years / Number(doublingYears))

  const pieData = [
    { name: 'Principal', value: result.principal, color: '#3b82f6' },
    { name: 'Returns', value: result.totalReturns, color: '#14b8a6' },
  ]

  const tickFmt = (v: number) => {
    if (currency.code === 'INR') return v >= 10000000 ? `₹${(v / 10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v / 100000).toFixed(0)}L` : `₹${(v / 1000).toFixed(0)}K`
    return v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(1)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`
  }

  return (
    <CalculatorLayout title="Lumpsum Investment Calculator" description={`Calculate the future value of a one-time investment in ${currency.name} with compound growth.`} icon="💼" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Investment Details</h2>
          <div className="space-y-5">
            <InputField label={`One-time Investment (${currency.symbol})`} value={principal} onChange={setPrincipal}
              min={currency.code === 'INR' ? 1000 : 100}
              max={currency.code === 'INR' ? 100000000 : 10000000}
              step={currency.code === 'INR' ? 1000 : 100}
              prefix={currency.symbol}
            />
            <InputField label="Expected Annual Return" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
            <InputField label="Investment Duration" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yrs" />
          </div>
          <div className="mt-5 space-y-3">
            <div className="p-3 rounded-xl bg-green-100 border border-green-200">
              <p className="text-xs text-gray-500">Rule of 72 — Money doubles every</p>
              <p className="text-xl font-bold text-green-700">{doublingYears} years</p>
              <p className="text-xs text-gray-400">Doubles {doublingCount}x in {years} years at {rate}%</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Maturity Value" value={fmtCompact(result.maturityAmount)} subValue={fmt(result.maturityAmount)} highlight />
            <ResultCard label="Principal Invested" value={fmtCompact(result.principal)} />
            <ResultCard label="Total Gain" value={fmtCompact(result.totalReturns)} subValue={`${((result.totalReturns / result.principal) * 100).toFixed(1)}%`} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Investment Growth</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="lsP" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                    <linearGradient id="lsT" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} /><stop offset="95%" stopColor="#14b8a6" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={76} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                  <Area type="monotone" dataKey="invested" name="Principal" stroke="#3b82f6" fill="url(#lsP)" strokeWidth={2} />
                  <Area type="monotone" dataKey="total" name="Total Value" stroke="#14b8a6" fill="url(#lsT)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Principal vs Returns</h3>
              <div style={{ height: 190 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                      {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Year-wise Growth</h3>
              <div className="overflow-y-auto max-h-[190px]">
                <table className="calc-table">
                  <thead><tr><th>Year</th><th>Gain</th><th>Total</th></tr></thead>
                  <tbody>
                    {result.yearlyData.filter((_, i) => i % 2 === 0 || i === result.yearlyData.length - 1).map(row => (
                      <tr key={row.year}>
                        <td className="text-gray-500">{row.year}</td>
                        <td className="text-green-600">{fmtCompact(row.returns)}</td>
                        <td className="font-semibold text-white">{fmtCompact(row.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
