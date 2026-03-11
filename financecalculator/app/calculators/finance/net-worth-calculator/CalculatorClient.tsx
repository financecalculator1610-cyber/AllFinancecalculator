'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { calculateNetWorth } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { Plus, Trash2 } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [assets, setAssets] = useState([
    { name: 'Cash & Savings', value: d.mediumAmount * 2 },
    { name: 'Investments', value: d.mediumAmount * 5 },
    { name: 'Real Estate', value: d.homeLoan },
    { name: 'Vehicle', value: d.mediumAmount * 3 },
  ])
  const [liabilities, setLiabilities] = useState([
    { name: 'Home Loan', value: d.homeLoan * 0.7 },
    { name: 'Car Loan', value: d.mediumAmount * 1.5 },
    { name: 'Credit Card', value: d.smallAmount * 3 },
  ])

  const result = useMemo(() => calculateNetWorth(assets, liabilities), [assets, liabilities])

  const assetColors = ['#14b8a6', '#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b', '#ec4899']
  const liabilityColors = ['#ef4444', '#f97316', '#eab308', '#dc2626']

  const updateValue = (list: any[], setList: any, idx: number, val: number) => {
    const next = [...list]; next[idx] = { ...next[idx], value: val }; setList(next)
  }
  const updateName = (list: any[], setList: any, idx: number, name: string) => {
    const next = [...list]; next[idx] = { ...next[idx], name }; setList(next)
  }
  const remove = (list: any[], setList: any, idx: number) => setList(list.filter((_, i) => i !== idx))
  const add = (list: any[], setList: any) => setList([...list, { name: 'New Item', value: 0 }])

  const step = currency.code === 'INR' ? 10000 : 1000

  return (
    <CalculatorLayout title="Net Worth Calculator" description={`Track your total net worth in ${currency.name}. Add assets and liabilities for a complete financial picture.`} icon="⚖️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <ResultCard label="Net Worth" value={fmtCompact(result.netWorth)} subValue={result.netWorth >= 0 ? 'Positive net worth ✅' : 'Work on reducing debt'} highlight />
        <ResultCard label="Total Assets" value={fmtCompact(result.totalAssets)} />
        <ResultCard label="Total Liabilities" value={fmtCompact(result.totalLiabilities)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assets Input */}
        <Card className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Assets</h2>
            <span className="text-xs text-green-600 font-semibold">{fmtCompact(result.totalAssets)}</span>
          </div>
          <div className="space-y-3">
            {assets.map((a, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-1">
                  <input value={a.name} onChange={e => updateName(assets, setAssets, i, e.target.value)}
                    className="w-full bg-transparent text-xs text-gray-500 outline-none mb-1 border-b border-gray-100 pb-0.5" />
                  <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-200">
                    <span className="text-green-600 text-xs">{currency.symbol}</span>
                    <input type="number" value={a.value} onChange={e => updateValue(assets, setAssets, i, Number(e.target.value))}
                      className="bg-transparent text-white text-sm font-semibold w-full outline-none text-right" step={step} />
                  </div>
                </div>
                <button onClick={() => remove(assets, setAssets, i)} className="text-slate-600 hover:text-red-400 transition-colors p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button onClick={() => add(assets, setAssets)} className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-dashed border-green-300 text-green-600 text-sm hover:bg-teal-500/5 transition-all">
              <Plus className="w-4 h-4" /> Add Asset
            </button>
          </div>

          {/* Liabilities */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-red-400 uppercase tracking-wider">Liabilities</h2>
              <span className="text-xs text-red-400 font-semibold">{fmtCompact(result.totalLiabilities)}</span>
            </div>
            <div className="space-y-3">
              {liabilities.map((l, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex-1">
                    <input value={l.name} onChange={e => updateName(liabilities, setLiabilities, i, e.target.value)}
                      className="w-full bg-transparent text-xs text-gray-500 outline-none mb-1 border-b border-gray-100 pb-0.5" />
                    <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-200">
                      <span className="text-red-400 text-xs">{currency.symbol}</span>
                      <input type="number" value={l.value} onChange={e => updateValue(liabilities, setLiabilities, i, Number(e.target.value))}
                        className="bg-transparent text-white text-sm font-semibold w-full outline-none text-right" step={step} />
                    </div>
                  </div>
                  <button onClick={() => remove(liabilities, setLiabilities, i)} className="text-slate-600 hover:text-red-400 transition-colors p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              ))}
              <button onClick={() => add(liabilities, setLiabilities)} className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-dashed border-red-500/30 text-red-500 text-sm hover:bg-red-500/5 transition-all">
                <Plus className="w-4 h-4" /> Add Liability
              </button>
            </div>
          </div>
        </Card>

        {/* Charts */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Assets Breakdown</h3>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={assets.filter(a => a.value > 0)} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} paddingAngle={3}>
                      {assets.map((_, i) => <Cell key={i} fill={assetColors[i % assetColors.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Liabilities Breakdown</h3>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={liabilities.filter(l => l.value > 0)} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} paddingAngle={3}>
                      {liabilities.map((_, i) => <Cell key={i} fill={liabilityColors[i % liabilityColors.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Assets vs Liabilities vs Net Worth</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ name: 'Your Finances', assets: result.totalAssets, liabilities: result.totalLiabilities, netWorth: result.netWorth }]} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={76}
                    tickFormatter={v => currency.code === 'INR' ? v >= 100000 ? `₹${(v / 100000).toFixed(0)}L` : `₹${(v / 1000).toFixed(0)}K` : `${currency.symbol}${(v / 1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="assets" name="Assets" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="liabilities" name="Liabilities" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="netWorth" name="Net Worth" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card>
              <p className="text-xs text-gray-500 mb-1">Debt-to-Asset Ratio</p>
              <p className="text-3xl font-bold font-display" style={{ color: result.debtToAssetRatio < 40 ? '#22c55e' : result.debtToAssetRatio < 60 ? '#f59e0b' : '#ef4444' }}>{result.debtToAssetRatio}%</p>
              <p className="text-xs text-gray-400 mt-1">{result.debtToAssetRatio < 40 ? 'Healthy' : result.debtToAssetRatio < 60 ? 'Moderate' : 'High — reduce debt'}</p>
            </Card>
            <Card>
              <p className="text-xs text-gray-500 mb-1">Net Worth Status</p>
              <p className="text-xl font-bold font-display" style={{ color: result.netWorth >= 0 ? '#22c55e' : '#ef4444' }}>{result.netWorth >= 0 ? '✅ Positive' : '⚠️ Negative'}</p>
              <p className="text-xs text-gray-400 mt-1">{result.netWorth >= 0 ? 'Keep building wealth' : 'Focus on debt payoff'}</p>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
