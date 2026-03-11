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

export default function EMICalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [principal, setPrincipal] = useState(d.loanAmount)
  const [rate, setRate] = useState(7.5)
  const [tenure, setTenure] = useState(5)
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years')

  const tenureMonths = tenureType === 'years' ? tenure * 12 : tenure
  const result = useMemo(() => calculateEMI(principal, rate, tenureMonths), [principal, rate, tenureMonths])

  const pieData = [
    { name: 'Principal', value: principal, color: '#3b82f6' },
    { name: 'Total Interest', value: result.totalInterest, color: '#f59e0b' },
  ]

  const yearlyData = []
  for (let y = 1; y <= Math.ceil(tenureMonths / 12); y++) {
    const slice = result.schedule.slice((y - 1) * 12, y * 12)
    yearlyData.push({
      year: `Y${y}`,
      principal: Math.round(slice.reduce((s, m) => s + m.principal, 0)),
      interest: Math.round(slice.reduce((s, m) => s + m.interest, 0)),
      balance: slice[slice.length - 1]?.balance ?? 0,
    })
  }

  return (
    <CalculatorLayout title="EMI Calculator" description={`Calculate monthly loan EMI, total interest, and amortization schedule in ${currency.name} (${currency.symbol}).`} icon="🏦" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Loan Details</h2>
          <div className="space-y-5">
            <InputField label={`Loan Amount (${currency.symbol})`} value={principal} onChange={setPrincipal}
              min={currency.code === 'INR' ? 10000 : 1000}
              max={currency.code === 'INR' ? 50000000 : 2000000}
              step={currency.code === 'INR' ? 10000 : 1000}
              prefix={currency.symbol}
            />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={1} max={30} step={0.1} suffix="%" />
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Loan Tenure</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                  <input type="number" value={tenure} onChange={e => setTenure(Number(e.target.value))}
                    className="w-full bg-transparent text-gray-900 font-semibold outline-none text-right" min={1} max={tenureType === 'years' ? 30 : 360} />
                </div>
                <div className="flex rounded-xl overflow-hidden border border-gray-200">
                  {(['years', 'months'] as const).map(t => (
                    <button key={t} onClick={() => setTenureType(t)}
                      className={`px-3 py-2 text-xs font-semibold transition-all capitalize ${tenureType === t ? 'bg-green-600 text-white' : 'bg-gray-50 text-gray-500 hover:text-white'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <input type="range" value={tenure} onChange={e => setTenure(Number(e.target.value))} min={1} max={tenureType === 'years' ? 30 : 360} className="w-full"
                style={{ background: `linear-gradient(to right,#14b8a6 0%,#14b8a6 ${((tenure - 1) / (tenureType === 'years' ? 29 : 359)) * 100}%,#1e293b ${((tenure - 1) / (tenureType === 'years' ? 29 : 359)) * 100}%,#1e293b 100%)` }} />
            </div>
          </div>

          <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-xs text-gray-500 mb-2 font-medium">Loan Summary</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Loan Amount</span><span className="text-gray-900 font-semibold">{fmt(principal)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Rate (monthly)</span><span className="text-gray-900 font-semibold">{(rate / 12).toFixed(3)}%</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Tenure</span><span className="text-gray-900 font-semibold">{tenureMonths} months</span></div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Monthly EMI" value={fmt(result.emi)} subValue="Fixed monthly payment" highlight />
            <ResultCard label="Total Interest" value={fmtCompact(result.totalInterest)} subValue={`${((result.totalInterest / principal) * 100).toFixed(1)}% of principal`} />
            <ResultCard label="Total Payment" value={fmtCompact(result.totalPayment)} subValue={`Over ${tenureMonths} months`} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Principal vs Interest</h3>
              <div style={{ height: 200 }}>
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
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Yearly Principal vs Interest</h3>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyData.slice(0, 15)} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                    <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false}
                      tickFormatter={v => v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(0)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`} />
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                    <Bar dataKey="principal" name="Principal" fill="#3b82f6" stackId="a" />
                    <Bar dataKey="interest" name="Interest" fill="#f59e0b" stackId="a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Outstanding Balance Chart */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Outstanding Balance Over Time</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={72}
                    tickFormatter={v => v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(1)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                  <Line type="monotone" dataKey="balance" name="Outstanding Balance" stroke="#ec4899" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Amortization Schedule (Every 3rd Month)</h3>
            <div className="overflow-y-auto max-h-64">
              <table className="calc-table">
                <thead><tr><th>Month</th><th>EMI</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead>
                <tbody>
                  {result.schedule.filter((_, i) => i % 3 === 0 || i === result.schedule.length - 1).map(row => (
                    <tr key={row.month}>
                      <td className="text-gray-500">{row.month}</td>
                      <td>{fmt(row.emi)}</td>
                      <td className="text-green-600">{fmt(row.principal)}</td>
                      <td className="text-amber-400">{fmt(row.interest)}</td>
                      <td className="font-medium text-white">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <Card>
          <h2 className="text-xl font-bold font-display text-white mb-4">EMI Formula Explained</h2>
          <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm text-gray-700 border border-gray-100">
            EMI = P × r × (1+r)ⁿ / ( (1+r)ⁿ − 1 )
            <div className="mt-3 space-y-1 text-xs text-gray-400 font-sans">
              <p><span className="text-green-600">P</span> = {fmt(principal)}, <span className="text-green-600">r</span> = {(rate / 12).toFixed(4)}% / month, <span className="text-green-600">n</span> = {tenureMonths} months</p>
              <p className="text-white mt-2">→ EMI = <span className="text-green-700 font-bold">{fmt(result.emi)}</span> / month</p>
            </div>
          </div>
        </Card>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
