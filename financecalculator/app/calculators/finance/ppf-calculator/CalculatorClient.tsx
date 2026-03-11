'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { calculatePPF } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { Shield, TrendingUp, Calendar, DollarSign } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [yearlyDeposit, setYearlyDeposit] = useState(150000)
  const [years, setYears] = useState(15)
  const [interestRate, setInterestRate] = useState(7.1)

  const r = useMemo(() => calculatePPF(yearlyDeposit, years, interestRate), [yearlyDeposit, years, interestRate])

  const pie = [
    { name: 'Total Deposited', value: r.totalDeposited, color: '#93c5fd' },
    { name: 'Interest Earned', value: r.totalInterest, color: '#16a34a' },
  ]

  return (
    <CalculatorLayout title="PPF Calculator" description="Calculate Public Provident Fund maturity amount with year-wise interest compounding. PPF offers tax-free returns under EEE status." icon="🏛️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">PPF Details</h2>
          <div className="space-y-5">
            <InputField label="Yearly Deposit" value={yearlyDeposit} onChange={setYearlyDeposit} min={500} max={150000} step={500} prefix={currency.symbol} />
            <InputField label="Investment Period (Years)" value={years} onChange={setYears} min={15} max={50} step={1} suffix="Yr" />
            <InputField label="Interest Rate" value={interestRate} onChange={setInterestRate} min={6} max={10} step={0.1} suffix="%" />
          </div>
          <div className="mt-5 p-3 rounded-xl bg-blue-50 border border-blue-200 text-sm">
            <p className="font-bold text-blue-700 mb-1">🛡️ PPF Tax Benefits</p>
            <ul className="text-xs text-blue-600 space-y-0.5">
              <li>• Deposit: Deductible under 80C</li>
              <li>• Interest: Tax-free</li>
              <li>• Maturity: Tax-free (EEE status)</li>
              <li>• Max deposit: ₹1.5L/year</li>
            </ul>
          </div>
          <div className="mt-3 p-3 rounded-xl bg-green-50 border border-green-200 text-center">
            <p className="text-xs text-green-700 font-bold mb-1">💰 Maturity Amount</p>
            <p className="text-xl font-black text-green-700">{fmt(r.maturityAmount, true)}</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Maturity Amount" value={fmt(r.maturityAmount)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Total Deposited" value={fmt(r.totalDeposited)} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="Interest Earned" value={fmt(r.totalInterest)} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Investment Period" value={`${years} Years`} icon={<Calendar className="w-4 h-4" />} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">PPF Growth Over {years} Years</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={r.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ppfT" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                    <linearGradient id="ppfD" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#93c5fd" stopOpacity={0.2} /><stop offset="95%" stopColor="#93c5fd" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y}`} />
                  <Area type="monotone" dataKey="totalDeposited" name="Total Deposited" stroke="#93c5fd" fill="url(#ppfD)" strokeWidth={1.5} dot={false} />
                  <Area type="monotone" dataKey="balance" name="Total Balance" stroke="#16a34a" fill="url(#ppfT)" strokeWidth={2.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Deposit vs Interest</h3>
              <div style={{ height: 170 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                      {pie.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4">
                {pie.map(e => <div key={e.name} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} /><span className="text-xs text-gray-600">{e.name}</span></div>)}
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Year-wise Interest</h3>
              <div className="max-h-52 overflow-y-auto">
                <table className="calc-table">
                  <thead><tr><th>Year</th><th>Deposit</th><th>Interest</th><th>Balance</th></tr></thead>
                  <tbody>{r.yearlyData.map((row: any) => (
                    <tr key={row.year}><td className="text-gray-500">{row.year}</td><td>{fmt(row.deposit)}</td><td className="text-green-600">{fmt(row.interest)}</td><td className="font-bold text-gray-900">{fmt(row.balance)}</td></tr>
                  ))}</tbody>
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
