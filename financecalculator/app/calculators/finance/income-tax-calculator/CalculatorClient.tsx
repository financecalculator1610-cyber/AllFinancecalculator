'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { calculateIncomeTax } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { DollarSign, Percent, TrendingDown, Shield } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [income, setIncome] = useState(1200000)
  const [regime, setRegime] = useState<'old' | 'new'>('new')
  const [sec80C, setSec80C] = useState(150000)
  const [sec80D, setSec80D] = useState(25000)
  const [hra, setHra] = useState(0)

  const r = useMemo(() => calculateIncomeTax(income, regime, { sec80C, sec80D, hra, lta: 0, stdDeduction: 50000 }), [income, regime, sec80C, sec80D, hra])
  const rOther = useMemo(() => calculateIncomeTax(income, regime === 'new' ? 'old' : 'new', { sec80C, sec80D, hra, lta: 0, stdDeduction: 50000 }), [income, regime, sec80C, sec80D, hra])

  const pie = [
    { name: 'Net In-Hand', value: r.netIncome, color: '#16a34a' },
    { name: 'Income Tax', value: r.incomeTax, color: '#f87171' },
    { name: 'Cess (4%)', value: r.cess, color: '#fbbf24' },
    ...(r.surcharge > 0 ? [{ name: 'Surcharge', value: r.surcharge, color: '#a78bfa' }] : []),
  ]

  return (
    <CalculatorLayout title="Income Tax Calculator" description="Calculate income tax under New and Old regime for FY 2026-27. Compare both regimes to find which saves more tax." icon="🏛️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Tax Details — FY 2026-27</h2>
          <div className="space-y-4">
            <InputField label="Annual Gross Income (CTC)" value={income} onChange={setIncome} min={100000} max={50000000} step={50000} prefix="₹" />
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Tax Regime</label>
              <div className="grid grid-cols-2 gap-2">
                {(['new', 'old'] as const).map(t => (
                  <button key={t} onClick={() => setRegime(t)}
                    className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${regime === t ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    {t === 'new' ? '✨ New Regime' : '📋 Old Regime'}
                  </button>
                ))}
              </div>
            </div>
            {regime === 'old' && (
              <div className="space-y-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                <p className="text-xs font-bold text-gray-600">Old Regime Deductions</p>
                <InputField label="Section 80C (max ₹1.5L)" value={sec80C} onChange={setSec80C} min={0} max={150000} step={5000} prefix="₹" />
                <InputField label="Section 80D (Health Insurance)" value={sec80D} onChange={setSec80D} min={0} max={50000} step={1000} prefix="₹" />
                <InputField label="HRA Exemption" value={hra} onChange={setHra} min={0} max={500000} step={5000} prefix="₹" />
              </div>
            )}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-xs font-bold text-amber-700 mb-1">💡 Regime Comparison</p>
            <div className="text-xs text-amber-700 space-y-1">
              <div className="flex justify-between"><span>New Regime Tax</span><span className="font-bold">{regime === 'new' ? fmt(r.totalTax) : fmt(rOther.totalTax)}</span></div>
              <div className="flex justify-between"><span>Old Regime Tax</span><span className="font-bold">{regime === 'old' ? fmt(r.totalTax) : fmt(rOther.totalTax)}</span></div>
              <div className="flex justify-between border-t border-amber-300 pt-1"><span>You Save (with {r.totalTax < rOther.totalTax ? regime : (regime === 'new' ? 'old' : 'new')} regime)</span><span className="font-bold text-green-700">{fmt(Math.abs(r.totalTax - rOther.totalTax))}</span></div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Total Tax Payable" value={fmt(r.totalTax)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Net In-Hand" value={fmt(r.netIncome)} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="Effective Rate" value={`${r.effectiveRate}%`} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Taxable Income" value={fmt(r.taxableIncome)} icon={<TrendingDown className="w-4 h-4" />} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Tax Breakdown</h3>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={2}>
                      {pie.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => [fmt(v), '']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-1 mt-1">
                {pie.map(e => <div key={e.name} className="flex items-center gap-1.5 text-xs"><div className="w-2 h-2 rounded-full" style={{ background: e.color }} />{e.name}</div>)}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Slab-wise Tax</h3>
              <div className="space-y-2 max-h-52 overflow-y-auto">
                {r.breakdown.map((row, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100 text-xs">
                    <div>
                      <p className="font-semibold text-gray-700">{row.slab}</p>
                      <p className="text-gray-400">@ {row.rate}</p>
                    </div>
                    <p className="font-bold text-gray-900">{fmt(row.taxAmount)}</p>
                  </div>
                ))}
                {r.cess > 0 && (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50 border border-amber-100 text-xs">
                    <p className="font-semibold text-amber-700">Health & Education Cess (4%)</p>
                    <p className="font-bold text-amber-700">{fmt(r.cess)}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">New vs Old Regime</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { regime: 'New Regime', tax: regime === 'new' ? r.totalTax : rOther.totalTax, inhand: regime === 'new' ? r.netIncome : rOther.netIncome },
                  { regime: 'Old Regime', tax: regime === 'old' ? r.totalTax : rOther.totalTax, inhand: regime === 'old' ? r.netIncome : rOther.netIncome },
                ]} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="regime" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number) => [fmt(v), '']} />
                  <Bar dataKey="tax" name="Tax Payable" fill="#f87171" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="inhand" name="In-Hand" fill="#16a34a" radius={[4, 4, 0, 0]} />
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
