'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { calculateNPS } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { Shield, TrendingUp, DollarSign, Briefcase } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [monthly, setMonthly] = useState(5000)
  const [years, setYears] = useState(30)
  const [returns, setReturns] = useState(10)
  const [annuityRate, setAnnuityRate] = useState(6)
  const [annuityPct, setAnnuityPct] = useState(40)

  const r = useMemo(() => calculateNPS(monthly, years, returns, annuityRate, annuityPct), [monthly, years, returns, annuityRate, annuityPct])

  const pie = [
    { name: 'Lump Sum (Tax-Free)', value: r.lumpsum, color: '#16a34a' },
    { name: 'Annuity Corpus', value: r.annuityCorpus, color: '#3b82f6' },
    { name: 'Total Contributed', value: r.totalContributed, color: '#e5e7eb' },
  ]

  return (
    <CalculatorLayout title="NPS Calculator" description="Calculate National Pension System corpus, lump sum, and monthly pension at retirement." icon="👴" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">NPS Details</h2>
          <div className="space-y-4">
            <InputField label="Monthly Contribution" value={monthly} onChange={setMonthly} min={500} max={500000} step={500} prefix={currency.symbol} />
            <InputField label="Investment Period (Years)" value={years} onChange={setYears} min={5} max={40} step={1} suffix="Yr" />
            <InputField label="Expected Annual Return" value={returns} onChange={setReturns} min={6} max={16} step={0.5} suffix="%" />
            <InputField label="Annuity Rate" value={annuityRate} onChange={setAnnuityRate} min={4} max={9} step={0.5} suffix="%" />
            <InputField label="Annuity Purchase %" value={annuityPct} onChange={setAnnuityPct} min={40} max={100} step={5} suffix="%" />
          </div>
          <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-700">
            <p className="font-bold mb-1">📌 NPS Rules</p>
            <p>Min 40% must be used for annuity. Remaining 60% lump sum is tax-free.</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Maturity Corpus" value={fmt(r.maturityAmount)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Monthly Pension" value={fmt(r.monthlyPension)} icon={<Briefcase className="w-4 h-4" />} />
            <ResultCard label="Lump Sum (60%)" value={fmt(r.lumpsum)} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Total Contributed" value={fmt(r.totalContributed)} icon={<Shield className="w-4 h-4" />} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">NPS Corpus Growth</h3>
            <div style={{ height: 230 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={r.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="npsT" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.15}/><stop offset="95%" stopColor="#16a34a" stopOpacity={0}/></linearGradient>
                    <linearGradient id="npsC" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y}`} />
                  <Area type="monotone" dataKey="contributed" name="Contributed" stroke="#3b82f6" fill="url(#npsC)" strokeWidth={1.5} dot={false} />
                  <Area type="monotone" dataKey="total" name="Total Value" stroke="#16a34a" fill="url(#npsT)" strokeWidth={2.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Corpus Split at Retirement</h3>
              <div style={{ height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ name: 'Lump Sum', value: r.lumpsum, color: '#16a34a' }, { name: 'Annuity', value: r.annuityCorpus, color: '#3b82f6' }]} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                      {[{ color: '#16a34a' }, { color: '#3b82f6' }].map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4">
                {[{ label: 'Lump Sum', color: '#16a34a' }, { label: 'Annuity', color: '#3b82f6' }].map(e => (
                  <div key={e.label} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} /><span className="text-xs text-gray-600">{e.label}</span></div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Retirement Summary</h3>
              <div className="space-y-2.5">
                {[
                  { label: 'Total Maturity Corpus', value: fmt(r.maturityAmount), color: 'text-gray-900' },
                  { label: `Lump Sum (${100 - annuityPct}% tax-free)`, value: fmt(r.lumpsum), color: 'text-green-700' },
                  { label: `Annuity Corpus (${annuityPct}%)`, value: fmt(r.annuityCorpus), color: 'text-blue-700' },
                  { label: 'Monthly Pension', value: fmt(r.monthlyPension), color: 'text-purple-700' },
                  { label: 'Total Contributed', value: fmt(r.totalContributed), color: 'text-gray-600' },
                  { label: 'Total Returns', value: fmt(r.totalReturns), color: 'text-green-600' },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-500">{row.label}</span>
                    <span className={`text-sm font-bold ${row.color}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
