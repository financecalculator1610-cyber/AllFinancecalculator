'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateSalary } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { DollarSign, Briefcase, TrendingDown, Percent } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt } = useCurrency()
  const [ctc, setCtc] = useState(1200000)
  const [basicPct, setBasicPct] = useState(50)
  const [hraPct, setHraPct] = useState(50)

  const r = useMemo(() => calculateSalary(ctc, basicPct, hraPct, 100 - basicPct - 10), [ctc, basicPct, hraPct])

  const deductionPie = [
    { name: 'Net In-Hand', value: r.monthly.inHand, color: '#16a34a' },
    { name: 'PF (Employee)', value: r.monthly.employeePF, color: '#3b82f6' },
    { name: 'TDS (Tax)', value: r.monthly.tds, color: '#f87171' },
    { name: 'Prof. Tax', value: r.monthly.professionalTax, color: '#f59e0b' },
  ]

  const compBar = [
    { name: 'Basic', value: r.monthly.basic },
    { name: 'HRA', value: r.monthly.hra },
    { name: 'Special Allow.', value: r.monthly.specialAllowance },
  ]

  return (
    <CalculatorLayout title="Salary / CTC Calculator" description="Calculate your in-hand salary from CTC. Breakdown of basic, HRA, PF, TDS, professional tax, and net take-home salary." icon="💼" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Salary Details</h2>
          <div className="space-y-5">
            <InputField label="Annual CTC" value={ctc} onChange={setCtc} min={100000} max={50000000} step={50000} prefix="₹" />
            <InputField label="Basic % of CTC" value={basicPct} onChange={setBasicPct} min={30} max={70} step={5} suffix="%" />
            <InputField label="HRA % of Basic" value={hraPct} onChange={setHraPct} min={30} max={60} step={5} suffix="%" />
          </div>
          <div className="mt-5 p-4 rounded-2xl bg-green-600 text-white text-center">
            <p className="text-sm opacity-80">Monthly In-Hand Salary</p>
            <p className="text-3xl font-black mt-1">{fmt(r.monthly.inHand)}</p>
            <p className="text-sm opacity-80 mt-1">{r.takeHomePercent}% of Monthly CTC</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Monthly In-Hand" value={fmt(r.monthly.inHand)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Annual In-Hand" value={fmt(r.annual.inHand)} icon={<Briefcase className="w-4 h-4" />} />
            <ResultCard label="Monthly TDS" value={fmt(r.monthly.tds)} icon={<TrendingDown className="w-4 h-4" />} />
            <ResultCard label="Take-Home %" value={`${r.takeHomePercent}%`} icon={<Percent className="w-4 h-4" />} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Monthly Salary Components</h3>
              <div className="space-y-2">
                {[
                  { label: 'Basic Salary', value: r.monthly.basic, color: 'text-blue-700' },
                  { label: 'HRA', value: r.monthly.hra, color: 'text-purple-700' },
                  { label: 'Special Allowance', value: r.monthly.specialAllowance, color: 'text-amber-700' },
                  { label: 'Gross Salary', value: r.monthly.grossMonthly, color: 'text-gray-900 font-black' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-xs text-gray-500">{item.label}</span>
                    <span className={`text-sm font-bold ${item.color}`}>{fmt(item.value)}</span>
                  </div>
                ))}
                <div className="pt-1 space-y-1.5">
                  <p className="text-xs font-bold text-red-500 uppercase">Deductions</p>
                  {[
                    { label: 'Employee PF (12%)', value: r.monthly.employeePF },
                    { label: 'Professional Tax', value: r.monthly.professionalTax },
                    { label: 'TDS (Income Tax)', value: r.monthly.tds },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center py-1.5 border-b border-gray-50">
                      <span className="text-xs text-gray-500">{item.label}</span>
                      <span className="text-sm font-bold text-red-600">- {fmt(item.value)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-2 rounded-lg bg-green-50 px-3 mt-1">
                    <span className="text-sm font-black text-green-700">Net In-Hand</span>
                    <span className="text-sm font-black text-green-700">{fmt(r.monthly.inHand)}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">In-Hand Breakdown</h3>
              <div style={{ height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={deductionPie} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={2}>
                      {deductionPie.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => [fmt(v), '']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-1 mt-1">
                {deductionPie.map(e => <div key={e.name} className="flex items-center gap-1.5 text-xs"><div className="w-2 h-2 rounded-full" style={{ background: e.color }} />{e.name}</div>)}
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Annual Salary Summary</h3>
            <div style={{ height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Annual CTC', value: ctc },
                  { name: 'Gross Annual', value: r.annual.grossAnnual },
                  { name: 'Net In-Hand', value: r.annual.inHand },
                ]} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={65} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number) => [fmt(v), '']} />
                  <Bar dataKey="value" fill="#16a34a" radius={[6, 6, 0, 0]} />
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
