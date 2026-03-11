'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { calculateStepUpSIP, calculateSIP } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { TrendingUp, DollarSign, ArrowUpRight, Percent } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [initialSIP, setInitialSIP] = useState(5000)
  const [stepUp, setStepUp] = useState(10)
  const [returnRate, setReturnRate] = useState(12)
  const [years, setYears] = useState(20)

  const result = useMemo(() => calculateStepUpSIP(initialSIP, stepUp, returnRate, years), [initialSIP, stepUp, returnRate, years])
  const r = result as any

  // Compare with flat SIP
  const flatSIP = useMemo(() => calculateSIP(initialSIP, returnRate, years), [initialSIP, returnRate, years])
  const f = flatSIP as any

  const extraWealth = (r.maturityAmount || 0) - (f.totalValue || 0)

  // Year-wise comparison
  const comparison = r.yearlyData?.map((row: any, i: number) => {
    const flatY = f.yearlyData?.[i] || {}
    return { year: row.year, stepUp: row.total, flat: flatY.total || 0 }
  }) || []

  return (
    <CalculatorLayout title="Step-Up SIP Calculator" description="See how increasing your SIP by a fixed % every year dramatically boosts your final corpus. Compare with flat SIP." icon="🚀" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Step-Up SIP Details</h2>
          <div className="space-y-5">
            <InputField label="Initial Monthly SIP" value={initialSIP} onChange={setInitialSIP} min={500} max={500000} step={500} prefix={currency.symbol} />
            <InputField label="Annual Step-Up %" value={stepUp} onChange={setStepUp} min={1} max={50} step={1} suffix="%" />
            <InputField label="Expected Annual Return" value={returnRate} onChange={setReturnRate} min={1} max={30} step={0.5} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yr" />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-green-50 border border-green-200">
            <p className="text-xs text-green-700 font-bold mb-1">🚀 Extra Wealth vs Flat SIP</p>
            <p className="text-2xl font-black text-green-700">{fmt(extraWealth, true)}</p>
            <p className="text-xs text-green-600 mt-0.5">by stepping up {stepUp}% annually</p>
          </div>
          <div className="mt-2 p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm">
            <p className="text-gray-500">Year {years} SIP amount:</p>
            <p className="font-black text-gray-900">{fmt(Math.round(initialSIP * Math.pow(1 + stepUp / 100, years - 1)))}/mo</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Step-Up Corpus" value={fmt(r.maturityAmount || 0)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Flat SIP Corpus" value={fmt(f.totalValue || 0)} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Extra Wealth" value={fmt(extraWealth)} icon={<ArrowUpRight className="w-4 h-4" />} />
            <ResultCard label="Total Invested" value={fmt(r.totalInvested || 0)} icon={<Percent className="w-4 h-4" />} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Step-Up SIP vs Flat SIP</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={comparison} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="suG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                    <linearGradient id="fG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#93c5fd" stopOpacity={0.2} /><stop offset="95%" stopColor="#93c5fd" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                  <Area type="monotone" dataKey="stepUp" name="Step-Up SIP" stroke="#16a34a" fill="url(#suG)" strokeWidth={2.5} dot={false} />
                  <Area type="monotone" dataKey="flat" name="Flat SIP" stroke="#93c5fd" fill="url(#fG)" strokeWidth={1.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {r.yearlyData?.length > 0 && (
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Year-wise Step-Up Breakdown</h3>
              <div className="overflow-x-auto max-h-52 overflow-y-auto">
                <table className="calc-table">
                  <thead><tr><th>Year</th><th>Monthly SIP</th><th>Total Invested</th><th>Returns</th><th>Total Value</th></tr></thead>
                  <tbody>{r.yearlyData.map((row: any) => (
                    <tr key={row.year}>
                      <td className="text-gray-500">{row.year}</td>
                      <td>{fmt(Math.round(initialSIP * Math.pow(1 + stepUp / 100, row.year - 1)))}</td>
                      <td>{fmt(row.invested)}</td>
                      <td className="text-green-600">{fmt(row.returns)}</td>
                      <td className="font-bold text-gray-900">{fmt(row.total)}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
