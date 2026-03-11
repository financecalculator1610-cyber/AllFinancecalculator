'use client'
import { useState, useMemo } from 'react'
import { calculateSleepCycle } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { Moon, Sun, Clock } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

const TIMES = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2)
  const m = i % 2 === 0 ? '00' : '30'
  const label = `${h === 0 ? 12 : h > 12 ? h - 12 : h}:${m} ${h < 12 ? 'AM' : 'PM'}`
  const value = `${String(h).padStart(2, '0')}:${m}`
  return { value, label }
})

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [mode, setMode] = useState<'wake' | 'bed'>('wake')
  const [time, setTime] = useState('06:30')

  const result = useMemo(() => calculateSleepCycle(time, mode), [time, mode])
  const r = result as any

  const sleepStages = [
    { stage: 'Stage 1 (NREM)', duration: '5-10 min', desc: 'Light sleep, easy to wake', color: '#bfdbfe' },
    { stage: 'Stage 2 (NREM)', duration: '20 min', desc: 'Heart rate slows, temp drops', color: '#60a5fa' },
    { stage: 'Stage 3 (Deep)', duration: '30-40 min', desc: 'Deep sleep, hardest to wake', color: '#2563eb' },
    { stage: 'REM Sleep', duration: '10-60 min', desc: 'Dreaming, memory consolidation', color: '#7c3aed' },
  ]

  const bedtimes = r.bedtimes || r.wakeupTimes || []

  return (
    <CalculatorLayout title="Sleep Cycle Calculator" description="Find the best bedtimes or wake-up times based on 90-minute sleep cycles. Wake up refreshed, not groggy." icon="😴" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Sleep Planner</h2>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-2">
              {[{ key: 'wake', label: '⏰ I want to wake at', icon: Sun },
                { key: 'bed', label: '🛏️ I want to sleep at', icon: Moon }].map(opt => (
                <button key={opt.key} onClick={() => setMode(opt.key as any)}
                  className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${mode === opt.key ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  {opt.key === 'wake' ? '⏰ Wake At' : '🛏️ Sleep At'}
                </button>
              ))}
            </div>
            <SelectField
              label={mode === 'wake' ? 'Wake-Up Time' : 'Bedtime'}
              value={time}
              onChange={setTime}
              options={TIMES}
            />
          </div>

          <div className="mt-5 p-4 rounded-xl bg-indigo-50 border border-indigo-200">
            <p className="text-xs text-indigo-700 font-bold mb-2">💡 Sleep Science Tip</p>
            <p className="text-xs text-indigo-600 leading-relaxed">Each sleep cycle = 90 minutes. It takes ~15 min to fall asleep. Wake up between cycles to feel refreshed — not in the middle of deep sleep.</p>
          </div>

          <div className="mt-3 space-y-2">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-500 font-semibold">Recommended sleep</p>
              <p className="text-sm font-black text-gray-900">7-9 hours (5-6 cycles)</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ResultCard label="Optimal Cycles" value="5-6 cycles" highlight icon={<Moon className="w-4 h-4" />} />
            <ResultCard label="Each Cycle" value="90 minutes" icon={<Clock className="w-4 h-4" />} />
            <ResultCard label="Target Sleep" value="7.5 - 9 hrs" icon={<Sun className="w-4 h-4" />} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">
              {mode === 'wake' ? `⏰ Best Bedtimes to Wake at ${TIMES.find(t => t.value === time)?.label}` : `🛏️ Best Wake Times if Sleeping at ${TIMES.find(t => t.value === time)?.label}`}
            </h3>
            <div className="space-y-3">
              {bedtimes.slice(0, 6).reverse().map((t: any, i: number, arr: any[]) => {
                const cycleNum = arr.length - i
                const isOptimal = cycleNum >= 4 && cycleNum <= 6
                return (
                  <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${isOptimal ? 'border-green-300 bg-green-50' : 'border-gray-100 bg-gray-50'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 ${isOptimal ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{cycleNum}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-black text-lg text-gray-900">{typeof t === 'string' ? t : t.time || t}</p>
                        {isOptimal && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-600 text-white">✓ Optimal</span>}
                      </div>
                      <p className="text-xs text-gray-500">{cycleNum} cycle{cycleNum !== 1 ? 's' : ''} · {(cycleNum * 1.5).toFixed(1)} hours sleep</p>
                    </div>
                    <div className={`text-2xl`}>{cycleNum >= 5 ? '😊' : cycleNum === 4 ? '🙂' : cycleNum === 3 ? '😐' : '😴'}</div>
                  </div>
                )
              })}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">🌙 Sleep Stage Breakdown (per 90-min cycle)</h3>
            <div className="space-y-2">
              {sleepStages.map(stage => (
                <div key={stage.stage} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: stage.color }} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-gray-800">{stage.stage}</span>
                      <span className="text-xs font-bold text-gray-600">{stage.duration}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{stage.desc}</p>
                  </div>
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
