'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { convertCurrency } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ArrowLeftRight, Globe, TrendingUp, DollarSign } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

const CURRENCIES = [
  { value: 'USD', label: '🇺🇸 USD — US Dollar' }, { value: 'INR', label: '🇮🇳 INR — Indian Rupee' },
  { value: 'EUR', label: '🇪🇺 EUR — Euro' }, { value: 'GBP', label: '🇬🇧 GBP — British Pound' },
  { value: 'JPY', label: '🇯🇵 JPY — Japanese Yen' }, { value: 'CAD', label: '🇨🇦 CAD — Canadian Dollar' },
  { value: 'AUD', label: '🇦🇺 AUD — Australian Dollar' }, { value: 'CHF', label: '🇨🇭 CHF — Swiss Franc' },
  { value: 'CNY', label: '🇨🇳 CNY — Chinese Yuan' }, { value: 'SGD', label: '🇸🇬 SGD — Singapore Dollar' },
  { value: 'AED', label: '🇦🇪 AED — UAE Dirham' }, { value: 'MYR', label: '🇲🇾 MYR — Malaysian Ringgit' },
  { value: 'HKD', label: '🇭🇰 HKD — Hong Kong Dollar' }, { value: 'BRL', label: '🇧🇷 BRL — Brazilian Real' },
  { value: 'MXN', label: '🇲🇽 MXN — Mexican Peso' }, { value: 'ZAR', label: '🇿🇦 ZAR — South African Rand' },
  { value: 'SEK', label: '🇸🇪 SEK — Swedish Krona' }, { value: 'NOK', label: '🇳🇴 NOK — Norwegian Krone' },
  { value: 'NZD', label: '🇳🇿 NZD — New Zealand Dollar' }, { value: 'THB', label: '🇹🇭 THB — Thai Baht' },
]
const SYMBOLS: Record<string, string> = { USD: '$', INR: '₹', EUR: '€', GBP: '£', JPY: '¥', CAD: 'CA$', AUD: 'A$', CHF: 'Fr', CNY: '¥', SGD: 'S$', AED: 'د.إ', MYR: 'RM', HKD: 'HK$', BRL: 'R$', MXN: 'MX$', ZAR: 'R', SEK: 'kr', NOK: 'kr', NZD: 'NZ$', THB: '฿' }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [amount, setAmount] = useState(1000)
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('INR')

  const r = useMemo(() => convertCurrency(amount, from, to), [amount, from, to])

  const comparisonData = ['INR', 'EUR', 'GBP', 'JPY', 'AED', 'SGD']
    .filter(c => c !== from)
    .slice(0, 6)
    .map(c => {
      const res = convertCurrency(amount, from, c)
      return { currency: c, rate: res.exchangeRate }
    })

  const swapCurrencies = () => { setFrom(to); setTo(from) }

  return (
    <CalculatorLayout title="Currency Converter" description="Convert between 20+ world currencies with up-to-date exchange rates. USD, INR, EUR, GBP, JPY and more." icon="💱" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Convert Currency</h2>
          <div className="space-y-4">
            <InputField label="Amount" value={amount} onChange={setAmount} min={0.01} max={999999999} step={100} />
            <SelectField label="From Currency" value={from} onChange={setFrom} options={CURRENCIES} />
            <div className="flex justify-center">
              <button onClick={swapCurrencies} className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-green-200 bg-green-50 text-green-700 font-bold text-sm hover:bg-green-100 transition-all">
                <ArrowLeftRight className="w-4 h-4" /> Swap Currencies
              </button>
            </div>
            <SelectField label="To Currency" value={to} onChange={setTo} options={CURRENCIES} />
          </div>
          <div className="mt-5 p-4 rounded-2xl bg-green-600 text-white text-center">
            <p className="text-sm opacity-80">{amount.toLocaleString()} {from} =</p>
            <p className="text-3xl font-black mt-1">{SYMBOLS[to] || ''}{r.converted.toLocaleString()}</p>
            <p className="text-sm opacity-80 mt-1">{to}</p>
            <p className="text-xs opacity-60 mt-2">1 {from} = {r.exchangeRate} {to}</p>
          </div>
          <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700">
            <p className="font-bold">⚠️ Indicative Rates</p>
            <p className="mt-0.5">Rates are approximate. Use a forex broker for actual transactions.</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Converted Amount" value={`${SYMBOLS[to] || ''}${r.converted.toLocaleString()}`} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Exchange Rate" value={`${r.exchangeRate}`} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="In USD (Base)" value={`$${r.inUSD.toLocaleString()}`} icon={<Globe className="w-4 h-4" />} />
            <ResultCard label="Currencies" value="20+" icon={<ArrowLeftRight className="w-4 h-4" />} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Exchange Rate vs Major Currencies (1 {from})</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="currency" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number) => [`${v.toFixed(4)} ${comparisonData.find(d => d.rate === v)?.currency || ''}`, `1 ${from}`]} />
                  <Bar dataKey="rate" name={`1 ${from} =`} fill="#16a34a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Quick Conversion Table — {from} to {to}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[1, 10, 50, 100, 500, 1000, 5000, 10000, 100000].map(amt => {
                const res = convertCurrency(amt, from, to)
                return (
                  <div key={amt} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 border border-gray-100 text-xs">
                    <span className="font-semibold text-gray-600">{SYMBOLS[from] || ''}{amt.toLocaleString()} {from}</span>
                    <span className="font-bold text-gray-900">{SYMBOLS[to] || ''}{res.converted.toLocaleString()}</span>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
