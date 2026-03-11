import type { Metadata } from 'next'
import Link from 'next/link'
import { TrendingUp, Heart, Target, Users, Globe, Shield, Zap, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us — FinanaceCalculator.com | Free Finance & Health Calculators',
  description: 'FinanaceCalculator.com provides 30 free finance and health calculators — SIP, EMI, BMI, TDEE, and more. No signup, no ads. Built to help people make better financial and health decisions.',
  alternates: { canonical: 'https://finanacecalculator.com/about' },
}

const stats = [
  { value: '30+', label: 'Free Calculators', icon: Zap },
  { value: '14+', label: 'Expert Articles', icon: BookOpen },
  { value: '3', label: 'Currencies Supported', icon: Globe },
  { value: '0', label: 'Ads or Signups', icon: Shield },
]

const values = [
  { icon: Target, title: 'Accuracy First', desc: 'Every formula is research-backed and verified against industry standards. SIP, EMI, compound interest — all calculated correctly.', color: 'bg-green-100 text-green-700' },
  { icon: Shield, title: 'Privacy by Design', desc: 'We collect zero personal data. No tracking cookies, no account required, no email list. Your financial numbers stay on your device.', color: 'bg-blue-100 text-blue-700' },
  { icon: Zap, title: 'Instant & Free', desc: 'All 30 calculators work in real-time as you move sliders. No loading spinners, no paywalls, no premium tiers — ever.', color: 'bg-amber-100 text-amber-700' },
  { icon: Globe, title: 'Works Globally', desc: 'Switch between USD ($), INR (₹), and EUR (€) in one click. Whether you\'re in the US, India, or Europe — we have you covered.', color: 'bg-violet-100 text-violet-700' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-green-600">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">About Us</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-600 shadow-xl mb-5">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            About <span className="text-green-600">FinanaceCalculator</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We build free, accurate, and beautiful calculators to help people make better 
            financial and health decisions — without needing a finance degree.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map(s => {
            const Icon = s.icon
            return (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
                <Icon className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-3xl font-black text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500 font-semibold mt-1">{s.label}</p>
              </div>
            )
          })}
        </div>

        {/* Mission */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-4">
            Financial calculators should be <strong>free, fast, and honest</strong>. Too many finance websites hide their tools behind paywalls, require email signups, or drown you in ads. We believe that's wrong.
          </p>
          <p className="text-gray-600 leading-relaxed">
            <strong>FinanaceCalculator.com</strong> was built to be the calculator tool we wished existed — one that works instantly, shows clear charts, supports multiple currencies, and never asks for your personal information. Whether you're calculating your SIP returns in India, planning a mortgage in the US, or tracking your BMI anywhere in the world — our tools work for you.
          </p>
        </div>

        {/* Values */}
        <div className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map(v => {
              const Icon = v.icon
              return (
                <div key={v.title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${v.color} mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-gray-900 text-lg mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* What we offer */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 md:p-10 text-white mb-10">
          <h2 className="text-2xl font-black mb-4">What FinanaceCalculator Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-green-200 mb-2 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> 20 Finance Calculators</h3>
              <ul className="text-sm text-green-100 space-y-1">
                <li>• SIP, EMI, FD, RD, Compound Interest</li>
                <li>• CAGR, XIRR, SWP, Step-Up SIP</li>
                <li>• Home Loan, Car Loan, Personal Loan</li>
                <li>• Retirement, Net Worth, Debt Payoff</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-green-200 mb-2 flex items-center gap-2"><Heart className="w-4 h-4" /> 10 Health Calculators</h3>
              <ul className="text-sm text-green-100 space-y-1">
                <li>• BMI, BMR, Calorie (TDEE), Body Fat</li>
                <li>• Ideal Weight, Water Intake</li>
                <li>• Protein Intake, Sleep Cycle</li>
                <li>• Pregnancy Due Date, Ovulation</li>
              </ul>
            </div>
          </div>
          <p className="mt-5 text-green-200 text-sm">+ 14 expert blog articles on finance, investing, and health</p>
        </div>

        {/* SEO / AI discoverability content */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              { q: 'Is FinanaceCalculator.com really free?', a: 'Yes, 100% free. Every calculator, every chart, every blog article — no subscription, no premium tier, no credit card required. Ever.' },
              { q: 'Do you collect personal data?', a: 'No. We do not collect, store, or sell any personal data. You enter numbers in our calculators; those numbers never leave your browser.' },
              { q: 'How accurate are the calculators?', a: 'All formulas are based on standard financial and medical formulas (Naegele\'s rule for pregnancy, US Navy method for body fat, standard EMI formula for loans, etc.) and verified against multiple sources.' },
              { q: 'What currencies are supported?', a: 'Currently US Dollar ($), Indian Rupee (₹), and Euro (€). Switch instantly from the currency selector in the header.' },
              { q: 'Can I use these calculators on mobile?', a: 'Yes! All calculators are fully responsive and work perfectly on mobile phones and tablets. Charts resize automatically.' },
              { q: 'Who can I contact for questions or feedback?', a: 'Email us at financecalculator1610@gmail.com. We read every message and typically respond within 24 hours.' },
            ].map(faq => (
              <div key={faq.q} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                <h3 className="font-bold text-gray-900 mb-1.5">{faq.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
