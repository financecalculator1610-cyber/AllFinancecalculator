import Link from 'next/link'
import { Calculator, TrendingUp, Heart, ChevronRight, Zap, BarChart3, Shield, Globe, BookOpen, ArrowRight, Star } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FinanaceCalculator.com — Free Finance & Health Calculators ($, ₹, €)',
  description: 'Free finance calculators (SIP, EMI, Mortgage, Compound Interest, Retirement) and health calculators (BMI, Calorie, BMR). Supports USD, INR, EUR. Instant results with charts.',
  alternates: { canonical: 'https://finanacecalculator.com' },
}

const financeCalcs = [
  { name: 'SIP Calculator', desc: 'Monthly SIP returns & growth', href: '/calculators/finance/sip-calculator', icon: '📈', badge: 'Popular' },
  { name: 'EMI Calculator', desc: 'Loan EMI & amortization', href: '/calculators/finance/emi-calculator', icon: '🏦', badge: 'Popular' },
  { name: 'Compound Interest', desc: 'Power of compounding', href: '/calculators/finance/compound-interest-calculator', icon: '💰', badge: null },
  { name: 'FD / CD Calculator', desc: 'Fixed deposit returns', href: '/calculators/finance/fd-calculator', icon: '🏛️', badge: null },
  { name: 'RD Calculator', desc: 'Recurring deposit maturity', href: '/calculators/finance/rd-calculator', icon: '🏧', badge: null },
  { name: 'Lumpsum Calculator', desc: 'One-time investment growth', href: '/calculators/finance/lumpsum-calculator', icon: '💼', badge: null },
  { name: 'Inflation Calculator', desc: 'Future purchasing power', href: '/calculators/finance/inflation-calculator', icon: '📊', badge: null },
  { name: 'Retirement Calculator', desc: 'Plan your retirement corpus', href: '/calculators/finance/retirement-calculator', icon: '🌅', badge: 'Popular' },
  { name: 'Home Loan / Mortgage', desc: 'Mortgage EMI planner', href: '/calculators/finance/home-loan-calculator', icon: '🏠', badge: 'Popular' },
  { name: 'Car Loan Calculator', desc: 'Auto loan EMI & schedule', href: '/calculators/finance/car-loan-calculator', icon: '🚗', badge: null },
  { name: 'Personal Loan', desc: 'Personal loan true cost', href: '/calculators/finance/personal-loan-calculator', icon: '💳', badge: null },
  { name: 'CAGR Calculator', desc: 'Investment annual growth rate', href: '/calculators/finance/cagr-calculator', icon: '📈', badge: null },
  { name: 'XIRR Calculator', desc: 'True SIP & portfolio returns', href: '/calculators/finance/xirr-calculator', icon: '📐', badge: null },
  { name: 'SWP Calculator', desc: 'Retirement withdrawal plan', href: '/calculators/finance/swp-calculator', icon: '💸', badge: null },
  { name: 'Step-Up SIP', desc: 'Annual SIP increment calculator', href: '/calculators/finance/step-up-sip-calculator', icon: '🚀', badge: null },
  { name: 'Mutual Fund Returns', desc: 'Expense ratio adjusted returns', href: '/calculators/finance/mutual-fund-calculator', icon: '📊', badge: null },
  { name: 'Loan Prepayment', desc: 'Interest saved by prepaying', href: '/calculators/finance/loan-prepayment-calculator', icon: '💰', badge: null },
  { name: 'Savings Goal', desc: 'Goal-based saving plan', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', badge: null },
  { name: 'Net Worth Calculator', desc: 'Assets & liabilities tracker', href: '/calculators/finance/net-worth-calculator', icon: '⚖️', badge: null },
  { name: 'Debt Payoff Calculator', desc: 'Avalanche & snowball methods', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', badge: null },
]

const healthCalcs = [
  { name: 'BMI Calculator', desc: 'Body mass index with scale', href: '/calculators/health/bmi-calculator', icon: '⚖️', badge: 'Popular' },
  { name: 'Calorie Calculator', desc: 'Daily TDEE & macros', href: '/calculators/health/calorie-calculator', icon: '🔥', badge: 'Popular' },
  { name: 'BMR Calculator', desc: 'Basal metabolic rate', href: '/calculators/health/bmr-calculator', icon: '❤️', badge: null },
  { name: 'Body Fat Calculator', desc: 'US Navy method body fat %', href: '/calculators/health/body-fat-calculator', icon: '💪', badge: null },
  { name: 'Ideal Weight Calculator', desc: '4 formula comparison', href: '/calculators/health/ideal-weight-calculator', icon: '🏋️', badge: null },
  { name: 'Water Intake Calculator', desc: 'Daily hydration needs', href: '/calculators/health/water-intake-calculator', icon: '💧', badge: null },
  { name: 'Protein Intake', desc: 'Daily protein by goal', href: '/calculators/health/protein-intake-calculator', icon: '🥩', badge: null },
  { name: 'Sleep Cycle Calculator', desc: 'Best bedtime & wake times', href: '/calculators/health/sleep-cycle-calculator', icon: '😴', badge: null },
  { name: 'Pregnancy Calculator', desc: 'Due date & trimester guide', href: '/calculators/health/pregnancy-calculator', icon: '🤰', badge: null },
  { name: 'Ovulation Calculator', desc: 'Fertile window tracker', href: '/calculators/health/ovulation-calculator', icon: '🌸', badge: null },
]

const recentBlogs = [
  { title: 'SIP Calculator Guide: Grow Wealth with Systematic Investment', href: '/blog/sip-calculator-guide-how-to-grow-wealth-with-systematic-investment', category: 'Investment', readTime: '8 min' },
  { title: 'Retirement Planning 2025 — How Much Do You Really Need?', href: '/blog/retirement-planning-guide-how-much-do-you-need-to-retire', category: 'Retirement', readTime: '12 min' },
  { title: 'Debt Payoff: Avalanche vs Snowball — Which Saves More?', href: '/blog/debt-payoff-strategies-avalanche-vs-snowball-method', category: 'Personal Finance', readTime: '8 min' },
]

const features = [
  { icon: <Globe className="w-5 h-5" />, title: 'Multi-Currency', desc: 'Switch between $ USD, ₹ INR, € EUR instantly', color: 'text-green-600 bg-green-100' },
  { icon: <Zap className="w-5 h-5" />, title: 'Instant Results', desc: 'Real-time calc as you adjust sliders', color: 'text-yellow-600 bg-yellow-100' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Interactive Charts', desc: 'Area, bar, pie charts with tooltips', color: 'text-blue-600 bg-blue-100' },
  { icon: <Shield className="w-5 h-5" />, title: '100% Free', desc: 'No signup, no ads, no data tracking', color: 'text-purple-600 bg-purple-100' },
]

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'FinanaceCalculator.com',
  url: 'https://finanacecalculator.com',
  description: 'Free finance and health calculators supporting USD, INR, and EUR.',
  potentialAction: { '@type': 'SearchAction', target: 'https://finanacecalculator.com/calculators/finance/{search_term_string}', 'query-input': 'required name=search_term_string' },
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/80 to-white pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-12 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 text-green-700 text-sm font-bold mb-6">
            <Globe className="w-4 h-4" />
            Supports <strong>$ USD</strong> · <strong>₹ INR</strong> · <strong>€ EUR</strong> — Switch in Header
          </div>

          <h1 className="text-4xl md:text-6xl font-black font-display text-gray-900 mb-5 leading-tight">
            Smart <span className="gradient-text">Finance</span> &<br />Health Calculators
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            30 free calculators for investments, loans, retirement, and health tracking. Interactive charts, instant results, no signup.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link href="/calculators/finance"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-green-200 hover:shadow-green-300 hover:-translate-y-0.5">
              <Calculator className="w-4 h-4" /> Finance Calculators
            </Link>
            <Link href="/calculators/health"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-bold rounded-2xl border border-gray-200 hover:border-gray-300 transition-all shadow-card hover:-translate-y-0.5">
              <Heart className="w-4 h-4 text-red-500" /> Health Calculators
            </Link>
            <Link href="/blog"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-bold rounded-2xl border border-gray-200 hover:border-gray-300 transition-all shadow-card hover:-translate-y-0.5">
              <BookOpen className="w-4 h-4 text-blue-500" /> Read Our Blog
            </Link>
          </div>

          {/* Currency cards */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[{ s: '$', n: 'US Dollar', c: 'text-green-700', bg: 'bg-green-50 border-green-200' },
              { s: '₹', n: 'Indian Rupee', c: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' },
              { s: '€', n: 'Euro', c: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' }].map(c => (
              <div key={c.s} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${c.bg} border text-sm font-semibold`}>
                <span className={`font-black text-base ${c.c}`}>{c.s}</span>
                <span className="text-gray-600">{c.n}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Use Our Calculators — clear label so users know these are features, not tools */}
      <section className="max-w-5xl mx-auto px-4 mb-12">
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Why FinanaceCalculator.com?</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col gap-3 p-5 rounded-2xl bg-white border border-gray-100 shadow-card cursor-default select-none">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.color}`}>{f.icon}</div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{f.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Finance Calculators */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-black font-display text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-600" /> Finance Calculators
            </h2>
            <p className="text-gray-500 text-sm mt-1">20 tools · Works in $, ₹, €</p>
          </div>
          <Link href="/calculators/finance" className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1 font-bold">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {financeCalcs.map(calc => (
            <Link key={calc.href} href={calc.href}
              className="group relative p-4 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-green-200 hover:shadow-card-hover transition-all duration-200">
              {calc.badge && (
                <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">
                  {calc.badge}
                </span>
              )}
              <div className="text-2xl mb-2">{calc.icon}</div>
              <p className="font-bold text-gray-900 text-sm group-hover:text-green-700 transition-colors leading-tight">{calc.name}</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{calc.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Health Calculators */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-black font-display text-gray-900 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" /> Health Calculators
            </h2>
            <p className="text-gray-500 text-sm mt-1">10 tools · Metric & Imperial</p>
          </div>
          <Link href="/calculators/health" className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 font-bold">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {healthCalcs.map(calc => (
            <Link key={calc.href} href={calc.href}
              className="group relative p-4 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-red-200 hover:shadow-card-hover transition-all duration-200">
              {calc.badge && (
                <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                  {calc.badge}
                </span>
              )}
              <div className="text-2xl mb-2">{calc.icon}</div>
              <p className="font-bold text-gray-900 text-sm group-hover:text-red-600 transition-colors leading-tight">{calc.name}</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{calc.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-black font-display text-gray-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" /> From Our Blog
            </h2>
            <p className="text-gray-500 text-sm mt-1">Expert guides to smarter financial decisions</p>
          </div>
          <Link href="/blog" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-bold">
            All articles <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentBlogs.map(blog => (
            <Link key={blog.href} href={blog.href}
              className="group p-5 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-blue-200 hover:shadow-card-hover transition-all">
              <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200 mb-3">{blog.category}</span>
              <h3 className="font-black text-gray-900 text-sm leading-tight group-hover:text-blue-700 transition-colors mb-2">{blog.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{blog.readTime} read</span>
                <span className="text-xs text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Read <ArrowRight className="w-3 h-3" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
