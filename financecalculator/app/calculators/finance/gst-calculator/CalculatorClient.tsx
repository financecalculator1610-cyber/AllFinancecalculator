'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateGST } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { Receipt, Percent, DollarSign, ArrowUpDown } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

const GST_RATES = [{ value: '5', label: '5% — Essential goods' }, { value: '12', label: '12% — Standard goods' }, { value: '18', label: '18% — Most services' }, { value: '28', label: '28% — Luxury goods' }, { value: '3', label: '3% — Gold & jewellery' }, { value: '0.25', label: '0.25% — Rough diamonds' }]

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [amount, setAmount] = useState(10000)
  const [gstRate, setGstRate] = useState('18')
  const [type, setType] = useState<'exclusive' | 'inclusive'>('exclusive')

  const r = useMemo(() => calculateGST(amount, Number(gstRate), type), [amount, gstRate, type])

  const pie = [
    { name: 'Base Amount', value: r.originalAmount, color: '#93c5fd' },
    { name: 'GST Amount', value: r.gstAmount, color: '#16a34a' },
  ]

  const rateComparison = [5, 12, 18, 28].map(rate => {
    const res = calculateGST(amount, rate, type)
    return { rate: `${rate}%`, gst: res.gstAmount, total: res.totalAmount }
  })

  return (
    <CalculatorLayout title="GST Calculator" description="Calculate GST (Goods & Services Tax) for any amount. Compute GST-exclusive and GST-inclusive amounts with CGST, SGST, IGST breakdown." icon="🧾" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">GST Details</h2>
          <div className="space-y-5">
            <InputField label="Amount" value={amount} onChange={setAmount} min={1} max={100000000} step={100} prefix={currency.symbol} />
            <SelectField label="GST Rate" value={gstRate} onChange={setGstRate} options={GST_RATES} />
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Calculation Type</label>
              <div className="grid grid-cols-2 gap-2">
                {(['exclusive', 'inclusive'] as const).map(t => (
                  <button key={t} onClick={() => setType(t)}
                    className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${type === t ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    {t === 'exclusive' ? '+ Add GST' : 'GST Included'}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">{type === 'exclusive' ? 'GST added on top of amount entered' : 'Amount entered already includes GST'}</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
              <p className="text-xs text-blue-600 font-semibold">Base Amount</p>
              <p className="text-sm font-black text-blue-700 mt-0.5">{fmt(r.originalAmount)}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-center">
              <p className="text-xs text-green-600 font-semibold">Total Amount</p>
              <p className="text-sm font-black text-green-700 mt-0.5">{fmt(r.totalAmount)}</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Total (with GST)" value={fmt(r.totalAmount)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="GST Amount" value={fmt(r.gstAmount)} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="CGST (50%)" value={fmt(r.cgst)} icon={<Receipt className="w-4 h-4" />} />
            <ResultCard label="SGST (50%)" value={fmt(r.sgst)} icon={<Receipt className="w-4 h-4" />} />
          </div>

          {/* IGST vs CGST+SGST Info */}
          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">GST Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-3">Intra-State (CGST + SGST)</p>
                <div className="space-y-2">
                  {[{ label: 'Base Amount', value: r.originalAmount, color: 'text-blue-700 bg-blue-50 border-blue-200' }, { label: `CGST @ ${Number(gstRate) / 2}%`, value: r.cgst, color: 'text-green-700 bg-green-50 border-green-200' }, { label: `SGST @ ${Number(gstRate) / 2}%`, value: r.sgst, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' }, { label: 'Total Amount', value: r.totalAmount, color: 'text-gray-900 bg-gray-50 border-gray-300 font-black' }].map(row => (
                    <div key={row.label} className={`flex items-center justify-between p-3 rounded-xl border ${row.color}`}>
                      <span className="text-sm font-semibold">{row.label}</span>
                      <span className="text-sm font-bold">{fmt(row.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-3">Inter-State (IGST)</p>
                <div className="space-y-2">
                  {[{ label: 'Base Amount', value: r.originalAmount, color: 'text-blue-700 bg-blue-50 border-blue-200' }, { label: `IGST @ ${gstRate}%`, value: r.igst, color: 'text-purple-700 bg-purple-50 border-purple-200' }, { label: 'Total Amount', value: r.totalAmount, color: 'text-gray-900 bg-gray-50 border-gray-300 font-black' }].map(row => (
                    <div key={row.label} className={`flex items-center justify-between p-3 rounded-xl border ${row.color}`}>
                      <span className="text-sm font-semibold">{row.label}</span>
                      <span className="text-sm font-bold">{fmt(row.value)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-xs text-gray-500 leading-relaxed">IGST is applicable for inter-state transactions. CGST+SGST is for intra-state. Both result in the same total tax burden.</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Base vs GST</h3>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                      {pie.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-1">
                {pie.map(e => <div key={e.name} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} /><span className="text-xs text-gray-600">{e.name}</span></div>)}
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">GST by Rate — Same Amount</h3>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rateComparison} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="rate" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={55} />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number) => [fmt(v), '']} />
                    <Bar dataKey="gst" name="GST Amount" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
