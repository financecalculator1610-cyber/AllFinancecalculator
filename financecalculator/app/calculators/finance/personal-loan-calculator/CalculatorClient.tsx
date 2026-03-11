'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'
import { calculateEMI } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { DollarSign, TrendingUp, Calendar, Percent } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [principal, setPrincipal] = useState(500000)
  const [rate, setRate] = useState(14)
  const [tenure, setTenure] = useState(36)

  const result = useMemo(() => calculateEMI(principal, rate, tenure), [principal, rate, tenure])
  const r = result as any

  const pie = [
    { name: 'Principal', value: principal, color: '#93c5fd' },
    { name: 'Interest', value: r.totalInterest || 0, color: '#16a34a' },
  ]

  // Annual data
  const annualData: any[] = []
  if (r.schedule) {
    for (let y = 1; y <= Math.ceil(tenure / 12); y++) {
      const monthsInYear = r.schedule.slice((y - 1) * 12, y * 12)
      const principalPaid = monthsInYear.reduce((s: number, m: any) => s + m.principal, 0)
      const interestPaid = monthsInYear.reduce((s: number, m: any) => s + m.interest, 0)
      const balance = monthsInYear[monthsInYear.length - 1]?.balance || 0
      annualData.push({ year: y, principal: Math.round(principalPaid), interest: Math.round(interestPaid), balance: Math.round(balance) })
    }
  }

  return (
    <CalculatorLayout title="Personal Loan Calculator" description="Calculate personal loan EMI and total interest. See amortization schedule and find the true cost of any personal loan." icon="💳" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Loan Details</h2>
          <div className="space-y-5">
            <InputField label="Loan Amount" value={principal} onChange={setPrincipal} min={10000} max={50000000} step={10000} prefix={currency.symbol} />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={1} max={30} step={0.1} suffix="%" />
            <InputField label="Tenure (Months)" value={tenure} onChange={setTenure} min={6} max={120} step={6} suffix="Mo" />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-green-50 border border-green-200 text-center">
            <p className="text-xs text-green-700 font-bold mb-1">Monthly EMI</p>
            <p className="text-2xl font-black text-green-700">{fmt(r.emi || 0)}</p>
            <p className="text-xs text-green-600 mt-0.5">for {tenure} months</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Monthly EMI" value={fmt(r.emi || 0)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Total Interest" value={fmt(r.totalInterest || 0)} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Total Payment" value={fmt(r.totalPayment || 0)} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Tenure" value={"`${Math.floor(tenure/12)}yr ${tenure%12}mo`"} icon={<Calendar className="w-4 h-4" />} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Principal vs Interest</h3>
              <div style={{ height: 180 }} className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                      {pie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4">
                {pie.map(e => <div key={e.name} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} /><span className="text-xs text-gray-600 font-medium">{e.name}</span></div>)}
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Annual Principal vs Interest</h3>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={annualData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={55} />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number) => [fmt(v), '']} />
                    <Bar dataKey="principal" name="Principal" fill="#93c5fd" radius={[4, 4, 0, 0]} stackId="a" />
                    <Bar dataKey="interest" name="Interest" fill="#16a34a" radius={[4, 4, 0, 0]} stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Amortization Schedule</h3>
            <div className="overflow-x-auto max-h-60 overflow-y-auto">
              <table className="calc-table">
                <thead><tr><th>Month</th><th>EMI</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead>
                <tbody>{(r.schedule || []).map((row: any) => (
                  <tr key={row.month}><td className="text-gray-500">{row.month}</td><td>{fmt(row.emi)}</td><td className="text-blue-600">{fmt(row.principal)}</td><td className="text-green-600">{fmt(row.interest)}</td><td className="font-semibold text-gray-900">{fmt(row.balance)}</td></tr>
                ))}</tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
