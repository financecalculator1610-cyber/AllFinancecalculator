'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateGratuity } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { Briefcase, Calendar, DollarSign, Shield } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [lastSalary, setLastSalary] = useState(50000)
  const [yearsOfService, setYearsOfService] = useState(10)
  const [type, setType] = useState<'covered' | 'uncovered'>('covered')

  const r = useMemo(() => calculateGratuity(lastSalary, yearsOfService, type), [lastSalary, yearsOfService, type])

  const chartData = [5, 10, 15, 20, 25, 30].map(y => ({
    years: `${y}Y`,
    gratuity: Math.round(calculateGratuity(lastSalary, y, type).gratuity)
  }))

  return (
    <CalculatorLayout title="Gratuity Calculator" description="Calculate gratuity amount for employees covered and not covered under the Payment of Gratuity Act 1972." icon="🤝" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Gratuity Details</h2>
          <div className="space-y-5">
            <InputField label="Last Drawn Monthly Salary (Basic + DA)" value={lastSalary} onChange={setLastSalary} min={1000} max={1000000} step={1000} prefix={currency.symbol} />
            <InputField label="Years of Service" value={yearsOfService} onChange={setYearsOfService} min={5} max={40} step={1} suffix="Yr" />
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Employment Type</label>
              <div className="space-y-2">
                {(['covered', 'uncovered'] as const).map(t => (
                  <button key={t} onClick={() => setType(t)}
                    className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold border-2 text-left transition-all ${type === t ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    {t === 'covered' ? '✅ Covered under Gratuity Act' : '⚠️ Not Covered (Govt formula)'}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">{type === 'covered' ? 'Formula: (Salary × 15 × Years) ÷ 26' : 'Formula: (Salary × 15 × Years) ÷ 30'}</p>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700">
            <p className="font-bold mb-1">📌 Key Info</p>
            <p>Minimum 5 years of service required. Up to ₹20 Lakh is tax-free.</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Gratuity Amount" value={fmt(r.gratuity)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Tax-Free Amount" value={fmt(r.taxFreeAmount)} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="Taxable Gratuity" value={fmt(r.taxableGratuity)} icon={<Briefcase className="w-4 h-4" />} />
            <ResultCard label="Per Year Earned" value={fmt(r.perYearGratuity)} icon={<Calendar className="w-4 h-4" />} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Gratuity by Years of Service</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="years" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={65} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number) => [fmt(v), 'Gratuity']} />
                  <Bar dataKey="gratuity" name="Gratuity" fill="#16a34a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Gratuity Calculation Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                  <p className="text-xs text-green-600 font-semibold mb-1">Formula Used</p>
                  <p className="text-sm font-bold text-green-700">(Salary × 15 × Years) ÷ {type === 'covered' ? '26' : '30'}</p>
                  <p className="text-xs text-green-600 mt-2">= ({fmt(lastSalary)} × 15 × {yearsOfService}) ÷ {type === 'covered' ? '26' : '30'}</p>
                  <p className="text-sm font-black text-green-800 mt-1">= {fmt(r.gratuity)}</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <p className="text-xs text-blue-600 font-semibold mb-1">Tax Treatment</p>
                  <div className="space-y-1 text-xs text-blue-700">
                    <div className="flex justify-between"><span>Tax-Free Limit</span><span className="font-bold">₹20,00,000</span></div>
                    <div className="flex justify-between"><span>Your Gratuity</span><span className="font-bold">{fmt(r.gratuity)}</span></div>
                    <div className="flex justify-between"><span>Tax-Free Portion</span><span className="font-bold text-green-700">{fmt(r.taxFreeAmount)}</span></div>
                    <div className="flex justify-between"><span>Taxable Portion</span><span className="font-bold text-red-600">{fmt(r.taxableGratuity)}</span></div>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <p className="text-xs text-gray-600 font-semibold mb-3">Eligibility Check</p>
                <div className="space-y-2">
                  {[
                    { check: yearsOfService >= 5, label: 'Min 5 years service', ok: '✅', fail: '❌' },
                    { check: true, label: 'Continuous employment', ok: '✅', fail: '❌' },
                    { check: r.taxableGratuity === 0, label: 'Fully tax-free', ok: '✅', fail: '⚠️' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2 text-sm">
                      <span>{item.check ? item.ok : item.fail}</span>
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">Gratuity is payable on resignation, retirement, death, or disablement.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
