'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQ { question: string; answer: string }

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-card overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-green-50">
        <h2 className="text-lg font-bold font-display text-gray-900">Frequently Asked Questions</h2>
      </div>
      <div className="divide-y divide-gray-50">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-green-50/50 transition-colors"
            >
              <span className="font-semibold text-gray-800 text-sm leading-relaxed">{faq.question}</span>
              <ChevronDown className={`w-4 h-4 text-green-600 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && (
              <div className="px-6 pb-4">
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
