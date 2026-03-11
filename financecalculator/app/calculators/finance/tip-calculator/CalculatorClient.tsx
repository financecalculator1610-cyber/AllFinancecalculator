'use client'
import { useState, useMemo } from 'react'
import { calculateTip } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { Users, DollarSign, Percent, Receipt } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [bill, setBill] = useState(1200)
  const [tipPct, setTipPct] = useState(15)
  const [people, setPeople] = useState(4)

  const r = useMemo(() => calculateTip(bill, tipPct, people), [bill, tipPct, people])

  const quickTips = [10, 15, 18, 20, 25]

  return (
    <CalculatorLayout title="Tip Calculator" description="Calculate tip amount, total bill, and split per person. Quick tip buttons for 10%, 15%, 18%, 20%, and 25%." icon="🍽️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Bill Details</h2>
          <div className="space-y-5">
            <InputField label="Bill Amount" value={bill} onChange={setBill} min={1} max={100000} step={10} prefix={currency.symbol} />
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Tip Percentage</label>
              <div className="flex gap-2 flex-wrap mb-2">
                {quickTips.map(pct => (
                  <button key={pct} onClick={() => setTipPct(pct)}
                    className={`px-3 py-1.5 rounded-xl text-sm font-bold border-2 transition-all ${tipPct === pct ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    {pct}%
                  </button>
                ))}
              </div>
              <InputField label="" value={tipPct} onChange={setTipPct} min={0} max={100} step={1} suffix="%" />
            </div>
            <InputField label="Number of People" value={people} onChange={setPeople} min={1} max={50} step={1} suffix="ppl" />
          </div>

          <div className="mt-5 p-4 rounded-2xl bg-green-600 text-white text-center">
            <p className="text-sm opacity-80">Per Person Total</p>
            <p className="text-4xl font-black mt-1">{fmt(r.perPerson)}</p>
            <p className="text-sm opacity-80 mt-1">Including {fmt(r.tipPerPerson)} tip each</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Tip Amount" value={fmt(r.tipAmount)} highlight icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Total Bill" value={fmt(r.totalAmount)} icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Per Person" value={fmt(r.perPerson)} icon={<Users className="w-4 h-4" />} />
            <ResultCard label="Tip Per Person" value={fmt(r.tipPerPerson)} icon={<Receipt className="w-4 h-4" />} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-4">Bill Summary</h3>
              <div className="space-y-3">
                {[
                  { label: 'Bill Amount', value: fmt(bill), color: 'text-gray-900' },
                  { label: `Tip (${tipPct}%)`, value: `+ ${fmt(r.tipAmount)}`, color: 'text-green-700' },
                  { label: 'Total Amount', value: fmt(r.totalAmount), color: 'text-gray-900 font-black text-base' },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">{row.label}</span>
                    <span className={`font-bold ${row.color}`}>{row.value}</span>
                  </div>
                ))}
                {people > 1 && (
                  <div className="pt-2 space-y-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Split Between {people} People</p>
                    {[
                      { label: 'Bill per person', value: fmt(r.billPerPerson) },
                      { label: 'Tip per person', value: fmt(r.tipPerPerson) },
                      { label: 'Total per person', value: fmt(r.perPerson) },
                    ].map(row => (
                      <div key={row.label} className="flex justify-between items-center py-1.5 border-b border-gray-50">
                        <span className="text-xs text-gray-500">{row.label}</span>
                        <span className="text-sm font-bold text-green-700">{row.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-4">All Tip Options — {people} {people === 1 ? 'Person' : 'People'}</h3>
              <div className="space-y-2">
                {r.commonTips.map(tip => (
                  <div key={tip.pct} onClick={() => setTipPct(tip.pct)}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${tipPct === tip.pct ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-black w-10 ${tipPct === tip.pct ? 'text-green-700' : 'text-gray-700'}`}>{tip.pct}%</span>
                      <div>
                        <p className="text-xs text-gray-500">Tip: {fmt(tip.tip)}</p>
                        <p className="text-xs text-gray-400">Total: {fmt(tip.total)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-gray-900">{fmt(tip.perPerson)}</p>
                      <p className="text-xs text-gray-400">per person</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Tipping Guide</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { pct: '10%', label: 'Average', color: 'bg-gray-100 text-gray-700' },
                { pct: '15%', label: 'Good', color: 'bg-blue-100 text-blue-700' },
                { pct: '18%', label: 'Very Good', color: 'bg-indigo-100 text-indigo-700' },
                { pct: '20%', label: 'Excellent', color: 'bg-green-100 text-green-700' },
                { pct: '25%+', label: 'Exceptional', color: 'bg-emerald-100 text-emerald-700' },
              ].map(g => (
                <div key={g.pct} className={`p-3 rounded-xl text-center ${g.color}`}>
                  <p className="text-lg font-black">{g.pct}</p>
                  <p className="text-xs font-semibold mt-0.5">{g.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
