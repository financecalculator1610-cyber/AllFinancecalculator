'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { calculateFD } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { DollarSign, TrendingUp, Percent, Calendar } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

const FREQ_OPTIONS = [
  { value: '1', label: 'Annually' },
  { value: '2', label: 'Semi-Annually' },
  { value: '4', label: 'Quarterly' },
  { value: '12', label: 'Monthly' },
]

export default function FDCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(5)
  const [freq, setFreq] = useState('4')

  const result = useMemo(() => calculateFD(principal, rate, years, Number(freq)), [principal, rate, years, freq])
  const r = result as any

  const pie = [
    { name: 'Principal', value: principal, color: '#93c5fd' },
    { name: 'Interest Earned', value: r.interest || 0, color: '#16a34a' },
  ]

  return (
    <CalculatorLayout title="FD / CD Calculator" description="Calculate Fixed Deposit or Certificate of Deposit maturity amount with compounding options and growth charts." icon="🏛️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">FD / CD Details</h2>
          <div className="space-y-5">
            <InputField label="Principal Amount" value={principal} onChange={setPrincipal} min={1000} max={10000000} step={1000} prefix={currency.symbol} />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={1} max={20} step={0.1} suffix="%" />
            <InputField label="Tenure (Years)" value={years} onChange={setYears} min={1} max={30} step={1} suffix="Yr" />
            <SelectField label="Compounding Frequency" value={freq} onChange={setFreq} options={FREQ_OPTIONS} />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-center">
              <p className="text-xs text-green-600 font-semibold mb-1">Maturity</p>
              <p className="text-lg font-black text-green-700">{fmt(r.maturityAmount || 0, true)}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
              <p className="text-xs text-blue-600 font-semibold mb-1">Interest</p>
              <p className="text-lg font-black text-blue-700">{fmt(r.interest || 0, true)}</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Maturity Amount" value={fmt(r.maturityAmount || 0)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Total Interest" value={fmt(r.interest || 0)} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Effective Rate" value={`${r.effectiveRate?.toFixed(2) || rate}%`} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Tenure" value={`${years} Yr`} icon={<Calendar className="w-4 h-4" />} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Growth Over Time</h3>
              <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={r.yearlyData || []} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="fdG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={60} />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y}`} />
                    <Area type="monotone" dataKey="total" name="Total Value" stroke="#16a34a" fill="url(#fdG)" strokeWidth={2.5} dot={false} />
                    <Area type="monotone" dataKey="invested" name="Principal" stroke="#93c5fd" fill="none" strokeDasharray="5 4" strokeWidth={1.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Principal vs Interest</h3>
              <div style={{ height: 180 }} className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pie} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                      {pie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                {pie.map(e => (
                  <div key={e.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />
                    <span className="text-xs text-gray-600 font-medium">{e.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {r.yearlyData?.length > 0 && (
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Year-wise Breakdown</h3>
              <div className="overflow-x-auto max-h-52 overflow-y-auto">
                <table className="calc-table">
                  <thead><tr><th>Year</th><th>Principal</th><th>Interest</th><th>Total Value</th></tr></thead>
                  <tbody>{r.yearlyData.map((row: any) => (
                    <tr key={row.year}><td className="text-gray-500">{row.year}</td><td>{fmt(row.invested)}</td><td className="text-green-600">{fmt(row.returns)}</td><td className="font-bold text-gray-900">{fmt(row.total)}</td></tr>
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
