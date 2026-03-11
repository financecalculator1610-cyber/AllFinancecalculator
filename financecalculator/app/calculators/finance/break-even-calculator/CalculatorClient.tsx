'use client'
import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts'
import { calculateBreakEven } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { Target, TrendingUp, DollarSign, Percent } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [fixedCosts, setFixedCosts] = useState(100000)
  const [variableCost, setVariableCost] = useState(150)
  const [sellingPrice, setSellingPrice] = useState(250)

  const r = useMemo(() => calculateBreakEven(fixedCosts, variableCost, sellingPrice), [fixedCosts, variableCost, sellingPrice])

  const isValid = sellingPrice > variableCost

  const chartData = isValid ? Array.from({ length: 11 }, (_, i) => {
    const units = Math.round((r.breakEvenUnits * i * 2) / 10)
    return {
      units,
      revenue: units * sellingPrice,
      totalCost: fixedCosts + units * variableCost,
      profit: units * sellingPrice - (fixedCosts + units * variableCost),
    }
  }) : []

  return (
    <CalculatorLayout title="Break-Even Calculator" description="Calculate break-even point in units and revenue. Essential for business planning, pricing strategy, and profit analysis." icon="⚖️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Business Costs</h2>
          <div className="space-y-5">
            <InputField label="Total Fixed Costs" value={fixedCosts} onChange={setFixedCosts} min={0} max={100000000} step={1000} prefix={currency.symbol} />
            <InputField label="Variable Cost per Unit" value={variableCost} onChange={setVariableCost} min={0} max={1000000} step={10} prefix={currency.symbol} />
            <InputField label="Selling Price per Unit" value={sellingPrice} onChange={setSellingPrice} min={1} max={1000000} step={10} prefix={currency.symbol} />
          </div>
          {!isValid && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              ⚠️ Selling price must be higher than variable cost per unit.
            </div>
          )}
          {isValid && (
            <div className="mt-5 space-y-2">
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-center">
                <p className="text-xs text-green-600 font-semibold">Break-Even Units</p>
                <p className="text-2xl font-black text-green-700">{r.breakEvenUnits.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
                <p className="text-xs text-blue-600 font-semibold">Break-Even Revenue</p>
                <p className="text-xl font-black text-blue-700">{fmt(r.breakEvenRevenue)}</p>
              </div>
            </div>
          )}
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Break-Even Units" value={isValid ? r.breakEvenUnits.toLocaleString() : '—'} highlight icon={<Target className="w-4 h-4" />} />
            <ResultCard label="Break-Even Revenue" value={isValid ? fmt(r.breakEvenRevenue) : '—'} icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Contribution Margin" value={isValid ? fmt(r.contributionMargin) : '—'} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Margin Ratio" value={isValid ? `${r.contributionMarginRatio}%` : '—'} icon={<Percent className="w-4 h-4" />} />
          </div>

          {isValid && (
            <>
              <Card>
                <h3 className="text-sm font-bold text-gray-800 mb-4">Revenue vs Cost — Break-Even Analysis</h3>
                <div style={{ height: 230 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                      <XAxis dataKey="units" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => v.toLocaleString()} />
                      <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                      <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }} formatter={(v: number) => [fmt(v), '']} labelFormatter={u => `${u.toLocaleString()} units`} />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <ReferenceLine x={r.breakEvenUnits} stroke="#16a34a" strokeDasharray="4 4" label={{ value: 'BEP', position: 'top', fill: '#16a34a', fontSize: 12 }} />
                      <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                      <Line type="monotone" dataKey="totalCost" name="Total Cost" stroke="#f87171" strokeWidth={2.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card>
                <h3 className="text-sm font-bold text-gray-800 mb-3">Profit at Different Sales Levels</h3>
                <div className="max-h-56 overflow-y-auto">
                  <table className="calc-table">
                    <thead><tr><th>Sales Level</th><th>Units</th><th>Revenue</th><th>Total Cost</th><th>Profit / Loss</th></tr></thead>
                    <tbody>{r.profitAtScenarios.map((row, i) => (
                      <tr key={i}>
                        <td className="text-gray-500 font-semibold">{row.label}</td>
                        <td>{row.units.toLocaleString()}</td>
                        <td>{fmt(row.revenue)}</td>
                        <td>{fmt(row.totalCost)}</td>
                        <td className={row.profit >= 0 ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>{row.profit >= 0 ? '+' : ''}{fmt(row.profit)}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
