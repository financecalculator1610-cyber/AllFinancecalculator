'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { calculateROI } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { TrendingUp, DollarSign, Percent, Zap } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [initial, setInitial] = useState(100000)
  const [finalValue, setFinalValue] = useState(175000)
  const [years, setYears] = useState(3)
  const [extraCosts, setExtraCosts] = useState(0)

  const r = useMemo(() => calculateROI(initial, finalValue, years, extraCosts), [initial, finalValue, years, extraCosts])

  const pie = [
    { name: 'Initial Investment', value: r.totalCost, color: '#93c5fd' },
    { name: 'Net Profit', value: Math.max(0, r.netProfit), color: '#16a34a' },
  ]
  if (r.netProfit < 0) pie[1] = { name: 'Net Loss', value: Math.abs(r.netProfit), color: '#f87171' }

  const scenarios = [
    { label: 'Conservative (−20%)', value: finalValue * 0.8 },
    { label: 'Expected', value: finalValue },
    { label: 'Optimistic (+20%)', value: finalValue * 1.2 },
  ].map(s => {
    const res = calculateROI(initial, s.value, years, extraCosts)
    return { label: s.label, roi: res.roi, profit: res.netProfit }
  })

  return (
    <CalculatorLayout title="ROI Calculator" description="Calculate Return on Investment (ROI), annualized ROI, net profit, and investment multiplier for any investment type." icon="📈" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Investment Details</h2>
          <div className="space-y-5">
            <InputField label="Initial Investment" value={initial} onChange={setInitial} min={1} max={1000000000} step={1000} prefix={currency.symbol} />
            <InputField label="Final Value / Sale Price" value={finalValue} onChange={setFinalValue} min={0} max={1000000000} step={1000} prefix={currency.symbol} />
            <InputField label="Investment Duration" value={years} onChange={setYears} min={0.1} max={50} step={0.5} suffix="Years" />
            <InputField label="Additional Costs (fees, taxes)" value={extraCosts} onChange={setExtraCosts} min={0} max={100000000} step={100} prefix={currency.symbol} />
          </div>
          <div className={`mt-5 p-4 rounded-2xl text-center ${r.roi >= 0 ? 'bg-green-600' : 'bg-red-500'} text-white`}>
            <p className="text-sm opacity-80">Total ROI</p>
            <p className="text-4xl font-black mt-1">{r.roi >= 0 ? '+' : ''}{r.roi}%</p>
            <p className="text-sm opacity-80 mt-1">{r.annualizedROI}% per year (CAGR)</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Total ROI" value={`${r.roi >= 0 ? '+' : ''}${r.roi}%`} highlight icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Net Profit" value={fmt(r.netProfit)} icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Annualized ROI" value={`${r.annualizedROI}%`} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Money Multiplier" value={`${r.multiplier}×`} icon={<Zap className="w-4 h-4" />} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Investment vs Return</h3>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                      {pie.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => [fmt(v), '']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4">
                {pie.map(e => <div key={e.name} className="flex items-center gap-1.5 text-xs"><div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />{e.name}</div>)}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">ROI Scenarios</h3>
              <div className="space-y-2.5">
                {scenarios.map((s, i) => (
                  <div key={i} className={`p-3 rounded-xl border ${i === 1 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-600">{s.label}</span>
                      <span className={`text-sm font-black ${s.roi >= 0 ? 'text-green-700' : 'text-red-600'}`}>{s.roi >= 0 ? '+' : ''}{s.roi}%</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">Profit: {s.profit >= 0 ? '+' : ''}{fmt(s.profit)}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Compare With Other ROI Benchmarks</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Your Investment', roi: r.roi },
                  { name: 'FD (7%/yr)', roi: years > 0 ? Math.round((Math.pow(1.07, years) - 1) * 10000) / 100 : 7 },
                  { name: 'Nifty 50 (12%/yr)', roi: years > 0 ? Math.round((Math.pow(1.12, years) - 1) * 10000) / 100 : 12 },
                  { name: 'S&P 500 (10%/yr)', roi: years > 0 ? Math.round((Math.pow(1.10, years) - 1) * 10000) / 100 : 10 },
                ]} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} width={45} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number) => [`${v}%`, 'ROI']} />
                  <Bar dataKey="roi" radius={[6, 6, 0, 0]}>
                    {[r.roi, 0, 0, 0].map((val, i) => <Cell key={i} fill={i === 0 ? (val >= 0 ? '#16a34a' : '#f87171') : '#93c5fd'} />)}
                  </Bar>
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
