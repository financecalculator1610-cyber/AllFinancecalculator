'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { calculateCompoundInterest } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CompoundCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const [principal, setPrincipal] = useState(currency.defaultValues.mediumAmount)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(10)
  const [freq, setFreq] = useState('12')

  const result = useMemo(() => calculateCompoundInterest(principal, rate, years, Number(freq)), [principal, rate, years, freq])

  // Compare different frequencies
  const freqComparison = [1, 2, 4, 12, 365].map(f => {
    const r = calculateCompoundInterest(principal, rate, years, f)
    return { freq: { 1: 'Annual', 2: 'Semi-Annual', 4: 'Quarterly', 12: 'Monthly', 365: 'Daily' }[f]!, total: r.maturityAmount, interest: r.totalInterest }
  })

  const tickFmt = (v: number) => {
    if (currency.code === 'INR') return v >= 100000 ? `₹${(v / 100000).toFixed(0)}L` : `₹${(v / 1000).toFixed(0)}K`
    return v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(1)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`
  }

  return (
    <CalculatorLayout title="Compound Interest Calculator" description={`See the power of compounding in ${currency.name}. Compare daily, monthly, quarterly & annual compounding with interactive charts.`} icon="💰" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Investment Details</h2>
          <div className="space-y-5">
            <InputField label={`Principal Amount (${currency.symbol})`} value={principal} onChange={setPrincipal}
              min={currency.code === 'INR' ? 1000 : 100}
              max={currency.code === 'INR' ? 10000000 : 1000000}
              step={currency.code === 'INR' ? 1000 : 100}
              prefix={currency.symbol}
            />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
            <InputField label="Time Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yrs" />
            <SelectField label="Compounding Frequency" value={freq} onChange={setFreq}
              options={[{ value: '1', label: 'Annually (1x/year)' }, { value: '2', label: 'Semi-Annually (2x/year)' }, { value: '4', label: 'Quarterly (4x/year)' }, { value: '12', label: 'Monthly (12x/year)' }, { value: '365', label: 'Daily (365x/year)' }]}
            />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-transparent border border-green-200">
            <p className="text-xs text-gray-500 mb-2">Effective Annual Rate (EAR)</p>
            <p className="text-2xl font-bold font-display text-green-700">
              {((Math.pow(1 + rate / 100 / Number(freq), Number(freq)) - 1) * 100).toFixed(3)}%
            </p>
            <p className="text-xs text-gray-400 mt-1">vs nominal {rate}% p.a.</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Maturity Amount" value={fmtCompact(result.maturityAmount)} subValue={fmt(result.maturityAmount)} highlight />
            <ResultCard label="Principal" value={fmtCompact(result.principal)} />
            <ResultCard label="Interest Earned" value={fmtCompact(result.totalInterest)} subValue={`${((result.totalInterest / result.principal) * 100).toFixed(1)}% gain`} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Compound Growth Chart</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ciPrincipal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                    <linearGradient id="ciTotal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} /><stop offset="95%" stopColor="#14b8a6" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={72} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                  <Area type="monotone" dataKey="invested" name="Principal" stroke="#3b82f6" fill="url(#ciPrincipal)" strokeWidth={2} />
                  <Area type="monotone" dataKey="total" name="Total Value" stroke="#14b8a6" fill="url(#ciTotal)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Frequency comparison */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Compounding Frequency Comparison ({years} years)</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={freqComparison} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="freq" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} width={72} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                  <Bar dataKey="interest" name="Interest Earned" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <Card>
          <h2 className="text-xl font-bold font-display text-white mb-4">Compound Interest Formula</h2>
          <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm text-gray-700 border border-gray-100">
            A = P × (1 + r/n)^(n×t)
            <div className="mt-3 space-y-1 text-xs text-gray-400 font-sans">
              <p>P = {fmt(principal)}, r = {rate}%, n = {freq} (compounding/year), t = {years} years</p>
              <p className="text-white mt-2">→ A = <span className="text-green-700 font-bold">{fmt(result.maturityAmount)}</span></p>
            </div>
          </div>
        </Card>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
