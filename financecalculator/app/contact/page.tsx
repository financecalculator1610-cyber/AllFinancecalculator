import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MessageSquare, Clock, CheckCircle, HelpCircle, Bug, Lightbulb, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us — FinanaceCalculator.com',
  description: 'Contact FinanaceCalculator.com for questions, feedback, calculator requests, or to report bugs. Email us at financecalculator1610@gmail.com.',
  alternates: { canonical: 'https://finanacecalculator.com/contact' },
}

const contactReasons = [
  { icon: HelpCircle, title: 'General Questions', desc: 'Questions about how a calculator works or how to interpret results', color: 'bg-blue-100 text-blue-700' },
  { icon: Bug, title: 'Report a Bug', desc: 'Found a calculation error or something isn\'t working? Let us know.', color: 'bg-red-100 text-red-700' },
  { icon: Lightbulb, title: 'Feature Requests', desc: 'Want a new calculator or a feature added? We love suggestions.', color: 'bg-amber-100 text-amber-700' },
  { icon: Globe, title: 'Business / Media', desc: 'Press inquiries, partnerships, or business collaboration opportunities.', color: 'bg-green-100 text-green-700' },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-green-600">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">Contact Us</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-600 shadow-xl mb-5">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
            Have a question, found a bug, or want to suggest a new calculator? We'd love to hear from you.
          </p>
        </div>

        {/* Main contact card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 mb-5">
            <Mail className="w-7 h-7 text-green-700" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Email Us</h2>
          <p className="text-gray-500 mb-5">The fastest way to reach us. We read and respond to every email.</p>
          <a href="mailto:financecalculator1610@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl text-lg transition-colors shadow-lg shadow-green-200">
            <Mail className="w-5 h-5" />
            financecalculator1610@gmail.com
          </a>
          <div className="flex items-center justify-center gap-2 mt-5 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>We typically respond within <strong>24 hours</strong></span>
          </div>
        </div>

        {/* What to contact about */}
        <div className="mb-8">
          <h2 className="text-xl font-black text-gray-900 mb-5 text-center">What Can We Help With?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactReasons.map(r => {
              const Icon = r.icon
              return (
                <div key={r.title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${r.color} mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{r.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{r.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Response commitment */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white">
          <h2 className="text-xl font-black mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Our Response Commitment
          </h2>
          <ul className="space-y-3 text-sm text-green-100">
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-300" />We respond to all emails within 24 hours (often much sooner)</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-300" />Bug reports are investigated and fixed as quickly as possible</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-300" />Feature requests are tracked — popular ones get built first</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-300" />We never share your email address with anyone, ever</li>
          </ul>
        </div>

        {/* Quick links */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm mb-4">Before emailing, you might find your answer here:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/about" className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:border-green-400 transition-colors">About Us</Link>
            <Link href="/privacy-policy" className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:border-green-400 transition-colors">Privacy Policy</Link>
            <Link href="/disclaimer" className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:border-green-400 transition-colors">Disclaimer</Link>
            <Link href="/blog" className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:border-green-400 transition-colors">Blog & Guides</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
