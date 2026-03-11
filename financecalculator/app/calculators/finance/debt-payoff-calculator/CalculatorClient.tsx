'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { calculateDebtPayoff } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { Plus, Trash2 } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [debts, setDebts] = useState([
    { name: 'Credit Card', balance: d.smallAmount * 3, rate: 20, minPayment: Math.round(d.smallAmount * 0.2) },
    { name: 'Car Loan', balance: d.mediumAmount * 2, rate: 8, minPayment: Math.round(d.smallAmount * 0.8) },
    { name: 'Personal Loan', balance: d.mediumAmount, rate: 12, minPayment: Math.round(d.smallAmount * 0.4) },
  ])
  const [extraPayment, setExtraPayment] = useState(Math.round(d.smallAmount * 0.5))
  const [method, setMethod] = useState<'avalanche' | 'snowball'>('avalanche')

  const result = useMemo(() => calculateDebtPayoff(debts, extraPayment, method), [debts, extraPayment, method])
  const noExtra = useMemo(() => calculateDebtPayoff(debts, 0, method), [debts, method])

  const update = (idx: number, field: string, val: any) => {
    const next = [...debts]; (next[idx] as any)[field] = val; setDebts(next)
  }
  const remove = (idx: number) => setDebts(debts.filter((_, i) => i !== idx))
  const add = () => setDebts([...debts, { name: 'New Debt', balance: d.smallAmount, rate: 10, minPayment: Math.round(d.smallAmount * 0.1) }])

  const step = currency.code === 'INR' ? 1000 : 100

  return (
    <CalculatorLayout title="Debt Payoff Calculator" description={`Find the fastest way to pay off all your debts using avalanche or snowball method in ${currency.name}.`} icon="🔓" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Strategy</h2>
          {/* Method toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-50 rounded-xl mb-5">
            {(['avalanche', 'snowball'] as const).map(m => (
              <button key={m} onClick={() => setMethod(m)}
                className={`py-2 rounded-xl text-sm font-semibold transition-all capitalize ${method === m ? 'bg-green-600 text-white' : 'text-gray-500 hover:text-white'}`}>
                {m === 'avalanche' ? '🏔️ Avalanche' : '⛄ Snowball'}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mb-5">
            {method === 'avalanche' ? '📉 Highest interest first — saves the most money overall.' : '⬆️ Smallest balance first — quick wins for motivation.'}
          </p>

          {/* Extra payment */}
          <div className="space-y-2 mb-5">
            <label className="text-sm font-medium text-gray-700">Extra Monthly Payment</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-green-600 text-sm">{currency.symbol}</span>
              <input type="number" value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))} step={step}
                className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
          </div>

          {/* Debts list */}
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Your Debts</h3>
          <div className="space-y-4">
            {debts.map((debt, i) => (
              <div key={i} className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                <div className="flex items-center justify-between">
                  <input value={debt.name} onChange={e => update(i, 'name', e.target.value)}
                    className="bg-transparent text-sm font-semibold text-white outline-none flex-1" />
                  <button onClick={() => remove(i)} className="text-slate-600 hover:text-red-400 transition-colors ml-2"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[['Balance', 'balance', step, d.mediumAmount * 10], ['Rate %', 'rate', 0.5, 50], ['Min Pay', 'minPayment', step / 10, d.mediumAmount]].map(([label, field, s, max]) => (
                    <div key={String(field)}>
                      <p className="text-xs text-gray-400 mb-0.5">{String(label)}</p>
                      <input type="number" value={(debt as any)[field as string]} onChange={e => update(i, String(field), Number(e.target.value))} step={Number(s)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-white text-xs font-semibold outline-none text-right" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={add} className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-dashed border-green-300 text-green-600 text-sm hover:bg-teal-500/5 transition-all">
              <Plus className="w-4 h-4" /> Add Debt
            </button>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Debt-Free In" value={`${result.totalMonths} mo`} subValue={`${Math.floor(result.totalMonths / 12)}y ${result.totalMonths % 12}m`} highlight />
            <ResultCard label="Total Interest" value={fmtCompact(result.totalInterest)} />
            <ResultCard label="Interest Saved" value={fmtCompact(noExtra.totalInterest - result.totalInterest)} subValue="vs no extra payment" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Payoff Plan per Debt</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.debts} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={76}
                    tickFormatter={v => v >= 1000 ? `${currency.symbol}${(v / 1000).toFixed(0)}K` : `${currency.symbol}${v}`} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [name === 'Months' ? `${v} months` : fmt(v), name]} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="balance" name="Balance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="totalInterest" name="Total Interest" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Payoff Schedule</h3>
            <table className="calc-table">
              <thead><tr><th>Debt</th><th>Balance</th><th>Rate</th><th>Total Interest</th><th>Paid Off In</th></tr></thead>
              <tbody>
                {result.debts.map((d, i) => (
                  <tr key={i}>
                    <td className="font-medium text-white">{d.name}</td>
                    <td>{fmtCompact(d.balance)}</td>
                    <td className="text-amber-400">{d.rate}%</td>
                    <td className="text-red-400">{fmtCompact(d.totalInterest)}</td>
                    <td className="text-green-600">{d.months} months</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
