'use client'
import { useState, useMemo } from 'react'
import { calculatePregnancyDueDate } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { Calendar, Heart, Baby } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [lmpDate, setLmpDate] = useState('2025-10-01')

  const result = useMemo(() => {
    try { return calculatePregnancyDueDate(new Date(lmpDate)) as any }
    catch { return null }
  }, [lmpDate])

  const trimesters = [
    { name: 'First Trimester', weeks: '1–12', key: [], emoji: '🌱', color: 'bg-green-50 border-green-200', text: 'text-green-700', milestones: ['Heart begins beating (Week 6)', 'All major organs forming (Week 8)', 'Baby is now a fetus (Week 10)', 'Fingernails form (Week 11)'] },
    { name: 'Second Trimester', weeks: '13–26', emoji: '🌿', color: 'bg-blue-50 border-blue-200', text: 'text-blue-700', milestones: ['Baby moves (Week 16–20)', 'Gender visible on ultrasound (Week 18–20)', 'Baby can hear (Week 18)', 'Brain developing rapidly (Week 24)'] },
    { name: 'Third Trimester', weeks: '27–40', emoji: '🌸', color: 'bg-purple-50 border-purple-200', text: 'text-purple-700', milestones: ['Lungs mature (Week 28–32)', 'Baby turns head-down (Week 32–36)', 'Baby gains weight rapidly (Week 35)', 'Full term (Week 37–40)'] },
  ]

  const maxDate = new Date(); maxDate.setDate(maxDate.getDate() - 1)
  const minDate = new Date(); minDate.setDate(minDate.getDate() - 280)

  return (
    <CalculatorLayout title="Pregnancy Due Date Calculator" description="Calculate your expected due date (EDD) based on your last menstrual period (LMP). See trimester milestones and week-by-week timeline." icon="🤰" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Enter LMP Date</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Last Menstrual Period (LMP)</label>
              <input type="date" value={lmpDate} onChange={e => setLmpDate(e.target.value)}
                max={maxDate.toISOString().split('T')[0]}
                min={minDate.toISOString().split('T')[0]}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium outline-none focus:border-green-500 transition-colors bg-white" />
            </div>
            <p className="text-xs text-gray-500 leading-relaxed bg-green-50 p-3 rounded-xl border border-green-200">Calculated using Naegele's Rule: LMP + 280 days (40 weeks). Actual delivery may vary by 2 weeks.</p>
          </div>

          {result && (
            <div className="mt-5 p-4 rounded-xl bg-pink-50 border border-pink-200 text-center">
              <p className="text-xs text-pink-700 font-bold mb-1">🎉 Expected Due Date</p>
              <p className="text-xl font-black text-pink-700">{result.dueDate?.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              {result.currentWeek > 0 && <p className="text-xs text-pink-600 mt-1">Currently: Week {result.currentWeek}, Day {result.currentDay || 0}</p>}
            </div>
          )}
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {result && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <ResultCard label="Due Date" value={result.dueDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) || '—'} highlight icon={<Calendar className="w-4 h-4" />} />
              <ResultCard label="Current Week" value={result.currentWeek > 0 ? `Week ${result.currentWeek}` : 'Before LMP'} icon={<Baby className="w-4 h-4" />} />
              <ResultCard label="Trimester" value={result.currentWeek <= 12 ? '1st' : result.currentWeek <= 26 ? '2nd' : '3rd'} icon={<Heart className="w-4 h-4" />} />
              <ResultCard label="Weeks Remaining" value={result.weeksRemaining >= 0 ? `${result.weeksRemaining} wks` : 'Past due'} icon={<Calendar className="w-4 h-4" />} />
            </div>
          )}

          {result && result.dueDate && (
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-4">📅 Important Dates</h3>
              <div className="space-y-2">
                {[
                  { label: 'LMP Date', date: new Date(lmpDate), emoji: '📌' },
                  { label: 'End of 1st Trimester', date: new Date(new Date(lmpDate).getTime() + 84 * 86400000), emoji: '🌱' },
                  { label: 'End of 2nd Trimester', date: new Date(new Date(lmpDate).getTime() + 182 * 86400000), emoji: '🌿' },
                  { label: 'Full Term (37 weeks)', date: new Date(new Date(lmpDate).getTime() + 259 * 86400000), emoji: '⭐' },
                  { label: '🎉 Due Date (40 weeks)', date: result.dueDate, emoji: '🎉' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-lg">{item.emoji}</span>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-800">{item.label}</span>
                      <span className="text-sm font-bold text-gray-600">{item.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {trimesters.map(t => (
              <Card key={t.name} className={`${t.color} border`} glow={false}>
                <div className="text-2xl mb-2">{t.emoji}</div>
                <p className={`font-black text-sm mb-1 ${t.text}`}>{t.name}</p>
                <p className="text-xs text-gray-500 mb-3">Weeks {t.weeks}</p>
                <ul className="space-y-1">
                  {t.milestones.map(m => <li key={m} className="text-xs text-gray-600 flex items-start gap-1.5"><span className="mt-0.5 text-green-500 flex-shrink-0">•</span>{m}</li>)}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
