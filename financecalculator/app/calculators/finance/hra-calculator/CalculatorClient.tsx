'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateHRA } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { Home, DollarSign, Shield, Percent } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [basicSalary, setBasicSalary] = useState(40000)
  const [hra, setHra] = useState(20000)
  const [rentPaid, setRentPaid] = useState(18000)
  const [isMetro, setIsMetro] = useState(true)

  const r = useMemo(() => calculateHRA(basicSalary, hra, rentPaid, isMetro), [basicSalary, hra, rentPaid, isMetro])

  const conditions = [
    { name: 'Actual HRA Received', value: r.condition1, color: '#3b82f6' },
    { name: 'Rent - 10% Basic', value: r.condition2, color: '#f59e0b' },
    { name: `${isMetro ? '50' : '40'}% of Basic`, value: r.condition3, color: '#8b5cf6' },
  ]

  return (
    <CalculatorLayout title="HRA Calculator" description="Calculate your HRA (House Rent Allowance) tax exemption based on salary, rent paid, and city." icon="🏠" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">HRA Details</h2>
          <div className="space-y-4">
            <InputField label="Basic Monthly Salary" value={basicSalary} onChange={setBasicSalary} min={1000} max={500000} step={1000} prefix={currency.symbol} />
            <InputField label="HRA Received (Monthly)" value={hra} onChange={setHra} min={0} max={300000} step={500} prefix={currency.symbol} />
            <InputField label="Actual Rent Paid (Monthly)" value={rentPaid} onChange={setRentPaid} min={0} max={300000} step={500} prefix={currency.symbol} />
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">City Type</label>
              <div className="grid grid-cols-2 gap-2">
                {[true, false].map(metro => (
                  <button key={String(metro)} onClick={() => setIsMetro(metro)}
                    className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${isMetro === metro ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    {metro ? '🏙️ Metro (50%)' : '🏘️ Non-Metro (40%)'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-green-50 border border-green-200">
            <p className="text-xs font-bold text-green-700 mb-2">HRA Exemption = Least of 3 conditions</p>
            <div className="space-y-1">
              {conditions.map((c, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{i+1}. {c.name}</span>
                  <span className={`font-bold ${c.value === r.hraExemption ? 'text-green-700' : 'text-gray-600'}`}>{fmt(c.value)}{c.value === r.hraExemption ? ' ✅' : ''}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="HRA Exemption" value={fmt(r.hraExemption)} highlight icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="Taxable HRA" value={fmt(r.taxableHRA)} icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Annual Savings" value={fmt(r.hraExemption * 12)} icon={<Home className="w-4 h-4" />} />
            <ResultCard label="Exemption %" value={`${hra > 0 ? Math.round((r.hraExemption / hra) * 100) : 0}%`} icon={<Percent className="w-4 h-4" />} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Three Conditions Compared</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conditions} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={65} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number) => [fmt(v), '']} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {conditions.map((e, i) => (
                      <rect key={i} fill={e.value === r.hraExemption ? '#16a34a' : e.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-center text-gray-400 mt-2">✅ Green bar = minimum value (your HRA exemption)</p>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Monthly & Annual HRA Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Monthly', items: [['HRA Received', fmt(hra)], ['HRA Exemption', fmt(r.hraExemption)], ['Taxable HRA', fmt(r.taxableHRA)], ['Rent Paid', fmt(rentPaid)]] },
                { title: 'Annual', items: [['HRA Received', fmt(hra * 12)], ['HRA Exemption', fmt(r.hraExemption * 12)], ['Taxable HRA', fmt(r.taxableHRA * 12)], ['Rent Paid', fmt(rentPaid * 12)]] },
              ].map(sec => (
                <div key={sec.title}>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{sec.title}</p>
                  <div className="space-y-1.5">
                    {sec.items.map(([label, value]) => (
                      <div key={label} className="flex justify-between items-center py-1.5 border-b border-gray-50">
                        <span className="text-xs text-gray-500">{label}</span>
                        <span className="text-sm font-bold text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
