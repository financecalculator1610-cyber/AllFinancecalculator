'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { calculateXIRR } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { Plus, Trash2, Percent, TrendingUp } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }
interface CashflowEntry { date: string; amount: number; id: number }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt } = useCurrency()
  const [entries, setEntries] = useState<CashflowEntry[]>([
    { id: 1, date: '2021-01-01', amount: -100000 },
    { id: 2, date: '2022-01-01', amount: -50000 },
    { id: 3, date: '2023-01-01', amount: -50000 },
    { id: 4, date: '2024-06-01', amount: 280000 },
  ])
  const [nextId, setNextId] = useState(5)

  const xirr = useMemo(() => {
    try {
      const cashflows = entries.map(e => ({ date: new Date(e.date), amount: e.amount }))
      return calculateXIRR(cashflows) as any
    } catch { return { xirr: null, error: 'Need at least one positive and one negative cashflow' } }
  }, [entries])

  const addEntry = () => {
    const lastDate = entries[entries.length - 1]?.date || '2024-01-01'
    const d = new Date(lastDate); d.setFullYear(d.getFullYear() + 1)
    setEntries([...entries, { id: nextId, date: d.toISOString().split('T')[0], amount: 0 }])
    setNextId(nextId + 1)
  }
  const removeEntry = (id: number) => setEntries(entries.filter(e => e.id !== id))
  const updateEntry = (id: number, field: 'date' | 'amount', value: string | number) =>
    setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e))

  const totalInvested = entries.filter(e => e.amount < 0).reduce((s, e) => s + Math.abs(e.amount), 0)
  const totalReturned = entries.filter(e => e.amount > 0).reduce((s, e) => s + e.amount, 0)
  const chartData = entries.map(e => ({
    label: new Date(e.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
    amount: e.amount,
  }))

  return (
    <CalculatorLayout title="XIRR Calculator" description="Calculate Extended Internal Rate of Return (XIRR) for irregular cashflows — mutual funds, SIPs, and property investments." icon="📐" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-base font-bold text-gray-900 mb-4">Cashflow Entries</h2>
          <p className="text-xs text-gray-500 mb-4 bg-amber-50 p-2 rounded-lg border border-amber-200">Use <strong>negative</strong> for investments/outflows and <strong>positive</strong> for returns/redemptions.</p>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {entries.map(e => (
              <div key={e.id} className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border border-gray-100">
                <input type="date" value={e.date} onChange={ev => updateEntry(e.id, 'date', ev.target.value)}
                  className="flex-1 text-xs bg-white border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-green-500 min-w-0" />
                <input type="number" value={e.amount} onChange={ev => updateEntry(e.id, 'amount', Number(ev.target.value))}
                  className={`w-28 text-xs bg-white border rounded-lg px-2 py-1.5 outline-none focus:border-green-500 text-right font-bold ${e.amount < 0 ? 'text-red-600 border-red-200' : 'text-green-600 border-green-200'}`} />
                <button onClick={() => removeEntry(e.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
          <button onClick={addEntry} className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-green-300 text-green-600 text-sm font-bold hover:bg-green-50 transition-colors">
            <Plus className="w-4 h-4" /> Add Cashflow
          </button>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-center">
              <p className="text-xs text-red-600 font-semibold">Total Invested</p>
              <p className="text-sm font-black text-red-700 mt-0.5">{fmt(totalInvested, true)}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50 border border-green-100 text-center">
              <p className="text-xs text-green-600 font-semibold">Total Returns</p>
              <p className="text-sm font-black text-green-700 mt-0.5">{fmt(totalReturned, true)}</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <ResultCard label="XIRR (Annual Return)" value={xirr.xirr != null ? `${(xirr.xirr * 100).toFixed(2)}%` : 'N/A'} highlight icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Absolute Gain/Loss" value={fmt(totalReturned - totalInvested)} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Total Return %" value={totalInvested > 0 ? `${((totalReturned - totalInvested) / totalInvested * 100).toFixed(1)}%` : '—'} icon={<TrendingUp className="w-4 h-4" />} />
          </div>

          {xirr.error && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-sm text-amber-700 font-semibold">⚠️ {xirr.error}</p>
            </div>
          )}

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Cashflow Visualization</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="label" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(Math.abs(v), true)} width={65} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => [fmt(Math.abs(v)), v < 0 ? '🔴 Investment' : '🟢 Return']} />
                  <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, i) => <Cell key={i} fill={entry.amount < 0 ? '#fca5a5' : '#16a34a'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-300" /><span className="text-xs text-gray-600">Investment (outflow)</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-600" /><span className="text-xs text-gray-600">Return (inflow)</span></div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">XIRR vs CAGR: What's the Difference?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <p className="font-bold text-blue-700 text-sm mb-1">CAGR</p>
                <p className="text-xs text-blue-600 leading-relaxed">Single lump-sum investment, fixed start and end date. Simple compound growth calculation.</p>
              </div>
              <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                <p className="font-bold text-green-700 text-sm mb-1">XIRR (recommended)</p>
                <p className="text-xs text-green-600 leading-relaxed">Multiple cashflows on different dates. The correct way to measure SIP and portfolio returns.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
