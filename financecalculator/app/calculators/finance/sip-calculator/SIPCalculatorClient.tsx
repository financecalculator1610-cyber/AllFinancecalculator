'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { calculateSIP } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { TrendingUp, DollarSign, PiggyBank, BarChart2 } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function SIPCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [monthly, setMonthly] = useState(d.smallAmount)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(10)

  // Reset defaults when currency changes
  const monthly_ = monthly
  const result = useMemo(() => calculateSIP(monthly_, rate, years), [monthly_, rate, years])

  const pieData = [
    { name: 'Invested', value: result.totalInvested, color: '#3b82f6' },
    { name: 'Returns', value: result.estimatedReturns, color: '#14b8a6' },
  ]

  const RADIAN = Math.PI / 180
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const r = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + r * Math.cos(-midAngle * RADIAN)
    const y = cy + r * Math.sin(-midAngle * RADIAN)
    return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>{`${(percent * 100).toFixed(0)}%`}</text>
  }

  return (
    <CalculatorLayout title="SIP Calculator" description={`Calculate your SIP (Systematic Investment Plan) returns in ${currency.name} (${currency.symbol}) with interactive charts.`} icon="📈" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Investment Details
          </h2>
          <div className="space-y-6">
            <InputField
              label={`Monthly Investment (${currency.symbol})`}
              value={monthly} onChange={setMonthly}
              min={currency.code === 'INR' ? 500 : 50}
              max={currency.code === 'INR' ? 500000 : 50000}
              step={currency.code === 'INR' ? 500 : 50}
              prefix={currency.symbol}
            />
            <InputField label="Expected Annual Return" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yrs" />
          </div>
          {/* Summary box */}
          <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200">
            <p className="text-xs text-gray-500 mb-2 font-medium">Quick Summary</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Monthly</span><span className="text-gray-900 font-semibold">{fmt(monthly)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Duration</span><span className="text-gray-900 font-semibold">{years} years ({years*12} months)</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Rate</span><span className="text-gray-900 font-semibold">{rate}% p.a.</span></div>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <ResultCard label="Total Value" value={fmtCompact(result.totalValue)} subValue={fmt(result.totalValue)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Invested Amount" value={fmtCompact(result.totalInvested)} subValue={`${years}y × ${fmt(monthly)}/mo`} icon={<PiggyBank className="w-4 h-4" />} />
            <ResultCard label="Wealth Gain" value={fmtCompact(result.estimatedReturns)} subValue={`${((result.estimatedReturns / result.totalInvested) * 100).toFixed(1)}% return`} icon={<BarChart2 className="w-4 h-4" />} />
          </div>

          {/* Area Chart */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Wealth Growth Over Time</h3>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sipInvested" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sipTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} /><stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Year', fill: '#475569', fontSize: 11, position: 'insideBottomRight', offset: -5 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={72}
                    tickFormatter={v => {
                      if (currency.code === 'INR') return v >= 10000000 ? `₹${(v / 10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v / 100000).toFixed(0)}L` : `₹${(v / 1000).toFixed(0)}K`
                      return v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(1)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`
                    }}
                  />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, color: '#111827', fontSize: 13, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                  <Area type="monotone" dataKey="invested" name="Invested Amount" stroke="#3b82f6" fill="url(#sipInvested)" strokeWidth={2} />
                  <Area type="monotone" dataKey="total" name="Total Value" stroke="#14b8a6" fill="url(#sipTotal)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pie Chart */}
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Investment Breakdown</h3>
              <div style={{ height: 210 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={58} outerRadius={82} paddingAngle={4} dataKey="value" labelLine={false} label={renderLabel}>
                      {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Table */}
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Year-wise Breakdown</h3>
              <div className="overflow-y-auto max-h-[210px]">
                <table className="calc-table">
                  <thead><tr><th>Yr</th><th>Invested</th><th>Returns</th><th>Total</th></tr></thead>
                  <tbody>
                    {result.yearlyData.map(row => (
                      <tr key={row.year}>
                        <td className="text-gray-500">{row.year}</td>
                        <td>{fmtCompact(row.invested)}</td>
                        <td className="text-green-600">{fmtCompact(row.returns)}</td>
                        <td className="font-semibold text-white">{fmtCompact(row.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-8 space-y-6">
        <Card>
          <h2 className="text-xl font-bold font-display text-white mb-5">How SIP Calculator Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-green-600 font-semibold mb-3">SIP Formula</h3>
              <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm text-gray-700 border border-gray-100">
                M = P × ({'{'} [1+i]ⁿ − 1 {'}'} / i) × (1+i)
                <div className="mt-3 space-y-1 text-xs text-gray-400 font-sans">
                  <p><span className="text-green-600">M</span> = Maturity Amount</p>
                  <p><span className="text-green-600">P</span> = Monthly Investment ({fmt(monthly)})</p>
                  <p><span className="text-green-600">i</span> = Monthly Rate ({(rate / 12).toFixed(3)}%)</p>
                  <p><span className="text-green-600">n</span> = Total Months ({years * 12})</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              {[
                ['Monthly SIP', fmt(monthly)],
                ['Annual Return', `${rate}%`],
                ['Duration', `${years} years`],
                ['Total Invested', fmt(result.totalInvested)],
                ['Wealth Gain', fmt(result.estimatedReturns)],
                ['Maturity Value', fmt(result.totalValue)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">{k}</span>
                  <span className="text-gray-900 font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold font-display text-white mb-4">Key Takeaways</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { e: '⏰', t: 'Start Early', d: 'Investing 5 years earlier can nearly double your final corpus through compounding.' },
              { e: '📊', t: 'Stay the Course', d: 'SIP averages your cost through ups and downs — rupee/dollar cost averaging works.' },
              { e: '🔼', t: 'Step Up Annually', d: 'Increasing SIP by 10% each year can boost wealth by 40–50% over 20 years.' },
              { e: '🎯', t: 'Goal-Based Approach', d: 'Map your SIP to specific milestones: retirement, home down payment, education.' },
            ].map(tip => (
              <div key={tip.t} className="flex gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-2xl">{tip.e}</span>
                <div><p className="font-semibold text-white text-sm">{tip.t}</p><p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{tip.d}</p></div>
              </div>
            ))}
          </div>
        </Card>

        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
