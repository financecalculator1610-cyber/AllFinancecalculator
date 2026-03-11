'use client'
import { useState, useMemo } from 'react'
import { calculateOvulation } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { Calendar, Heart } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [lastPeriod, setLastPeriodStr] = useState('2026-01-01')
  const [cycleLength, setCycleLength] = useState(28)

  const result = useMemo(() => {
    try { return calculateOvulation(new Date(lastPeriod), cycleLength) as any }
    catch { return null }
  }, [lastPeriod, cycleLength])

  const fmt = (d: Date) => d?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) || '—'

  return (
    <CalculatorLayout title="Ovulation Calculator" description="Calculate your ovulation date and fertile window based on last period date and cycle length." icon="🌸" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Cycle Details</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">First Day of Last Period</label>
              <input type="date" value={lastPeriod} onChange={e => setLastPeriodStr(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium outline-none focus:border-green-500 bg-white" />
            </div>
            <InputField label="Cycle Length (Days)" value={cycleLength} onChange={setCycleLength} min={21} max={45} step={1} suffix="days" />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-pink-50 border border-pink-200 text-center">
            <p className="text-xs text-pink-700 font-bold mb-1">🌸 Ovulation Day</p>
            <p className="text-base font-black text-pink-700">{result ? fmt(result.ovulationDate) : '—'}</p>
          </div>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed">This calculator is for informational purposes. Ovulation varies by individual. Consult a healthcare provider for family planning advice.</p>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {result && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Ovulation Date" value={fmt(result.ovulationDate)} highlight icon={<Heart className="w-4 h-4" />} />
                <ResultCard label="Fertile Window Start" value={fmt(result.fertileWindowStart)} icon={<Calendar className="w-4 h-4" />} />
                <ResultCard label="Fertile Window End" value={fmt(result.fertileWindowEnd)} icon={<Calendar className="w-4 h-4" />} />
              </div>

              <Card>
                <h3 className="text-sm font-bold text-gray-800 mb-4">📅 Cycle Timeline</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Period Starts', date: new Date(lastPeriod), emoji: '🔴', color: 'bg-red-50 border-red-200', text: 'text-red-700' },
                    { label: 'Fertile Window Begins', date: result.fertileWindowStart, emoji: '💚', color: 'bg-green-50 border-green-200', text: 'text-green-700' },
                    { label: '⭐ Peak Ovulation Day', date: result.ovulationDate, emoji: '🌟', color: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-700' },
                    { label: 'Fertile Window Ends', date: result.fertileWindowEnd, emoji: '💛', color: 'bg-amber-50 border-amber-200', text: 'text-amber-700' },
                    { label: 'Next Period (est.)', date: result.nextPeriodDate, emoji: '📅', color: 'bg-gray-50 border-gray-200', text: 'text-gray-700' },
                  ].map(item => (
                    <div key={item.label} className={`flex items-center gap-3 p-3 rounded-xl border ${item.color}`}>
                      <span className="text-lg">{item.emoji}</span>
                      <div className="flex-1 flex items-center justify-between">
                        <span className={`text-sm font-bold ${item.text}`}>{item.label}</span>
                        <span className="text-sm font-semibold text-gray-700">{fmt(item.date)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-sm font-bold text-gray-800 mb-4">Cycle Phase Guide</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { phase: 'Menstrual', days: `Day 1–5`, color: 'bg-red-100 border-red-200', text: 'text-red-700', note: 'Period days' },
                    { phase: 'Follicular', days: `Day 6–${cycleLength - 15}`, color: 'bg-blue-50 border-blue-200', text: 'text-blue-700', note: 'Egg matures' },
                    { phase: 'Ovulation', days: `Day ${cycleLength - 14}`, color: 'bg-green-100 border-green-200', text: 'text-green-700', note: '🌟 Peak fertility' },
                    { phase: 'Luteal', days: `Day ${cycleLength - 13}–${cycleLength}`, color: 'bg-purple-50 border-purple-200', text: 'text-purple-700', note: 'Post-ovulation' },
                  ].map(p => (
                    <div key={p.phase} className={`p-3 rounded-xl border ${p.color}`}>
                      <p className={`font-bold text-xs ${p.text}`}>{p.phase}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.days}</p>
                      <p className="text-xs text-gray-600 mt-1 font-medium">{p.note}</p>
                    </div>
                  ))}
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
