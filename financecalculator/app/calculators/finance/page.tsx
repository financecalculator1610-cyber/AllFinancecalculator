import type { Metadata } from 'next'
import Link from 'next/link'
import { TrendingUp, ChevronRight, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Finance Calculators 2026 — 30 Free Tools: SIP, EMI, GST, Tax, PPF, NPS & More',
  description: '30 free finance calculators: SIP, EMI, FD, RD, CAGR, XIRR, GST, Income Tax, PPF, NPS, Gratuity, HRA, Salary, Currency Converter, ROI, Break-Even & more. Instant results with charts.',
  keywords: ['finance calculators', 'SIP calculator', 'EMI calculator', 'GST calculator', 'income tax calculator India 2026', 'PPF calculator', 'NPS calculator', 'gratuity calculator', 'HRA calculator', 'salary calculator', 'currency converter', 'ROI calculator'],
  alternates: { canonical: 'https://finanacecalculator.com/calculators/finance' },
}

const calculators = [
  // Investment
  { name: 'SIP Calculator', desc: 'Monthly SIP returns with year-wise growth charts', href: '/calculators/finance/sip-calculator', icon: '📈', tag: 'Investment', popular: true },
  { name: 'Lumpsum Calculator', desc: 'One-time investment growth projections', href: '/calculators/finance/lumpsum-calculator', icon: '💼', tag: 'Investment', popular: false },
  { name: 'CAGR Calculator', desc: 'Compound annual growth rate with Rule of 72', href: '/calculators/finance/cagr-calculator', icon: '📉', tag: 'Investment', popular: false },
  { name: 'XIRR Calculator', desc: 'True annualized returns for SIP cashflows', href: '/calculators/finance/xirr-calculator', icon: '📐', tag: 'Advanced', popular: false },
  { name: 'Step-Up SIP', desc: 'SIP with annual increment — build far more wealth', href: '/calculators/finance/step-up-sip-calculator', icon: '🚀', tag: 'Investment', popular: false },
  { name: 'Mutual Fund Returns', desc: 'MF returns adjusted for expense ratio', href: '/calculators/finance/mutual-fund-calculator', icon: '📊', tag: 'Investment', popular: false },
  { name: 'ROI Calculator', desc: 'Return on investment, annualized ROI & multiplier', href: '/calculators/finance/roi-calculator', icon: '📈', tag: 'Investment', popular: false },
  // Loans
  { name: 'EMI Calculator', desc: 'Loan EMI & full amortization schedule', href: '/calculators/finance/emi-calculator', icon: '🏦', tag: 'Loan', popular: true },
  { name: 'Home Loan Calculator', desc: 'Mortgage EMI with amortization schedule', href: '/calculators/finance/home-loan-calculator', icon: '🏠', tag: 'Loan', popular: true },
  { name: 'Car Loan Calculator', desc: 'Auto loan EMI, total interest & schedule', href: '/calculators/finance/car-loan-calculator', icon: '🚗', tag: 'Loan', popular: false },
  { name: 'Personal Loan Calculator', desc: 'Personal loan true cost & amortization', href: '/calculators/finance/personal-loan-calculator', icon: '💳', tag: 'Loan', popular: false },
  { name: 'Loan Prepayment', desc: 'Interest saved & tenure cut by prepaying', href: '/calculators/finance/loan-prepayment-calculator', icon: '⚡', tag: 'Loan', popular: false },
  // Savings
  { name: 'FD / CD Calculator', desc: 'Fixed deposit maturity & interest earned', href: '/calculators/finance/fd-calculator', icon: '🏛️', tag: 'Savings', popular: false },
  { name: 'RD Calculator', desc: 'Recurring deposit maturity & interest', href: '/calculators/finance/rd-calculator', icon: '🏧', tag: 'Savings', popular: false },
  { name: 'PPF Calculator', desc: 'Public Provident Fund with EEE tax benefits', href: '/calculators/finance/ppf-calculator', icon: '🏛️', tag: 'Savings', popular: false },
  { name: 'Savings Goal', desc: 'Monthly savings needed to hit your goal', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', tag: 'Planning', popular: false },
  // Interest
  { name: 'Compound Interest', desc: 'Daily, monthly, quarterly or annual compounding', href: '/calculators/finance/compound-interest-calculator', icon: '💰', tag: 'Interest', popular: false },
  { name: 'Simple Interest', desc: 'SI formula with SI vs CI comparison', href: '/calculators/finance/simple-interest-calculator', icon: '📐', tag: 'Interest', popular: false },
  // Retirement & Planning
  { name: 'Retirement Calculator', desc: 'Corpus needed for a comfortable retirement', href: '/calculators/finance/retirement-calculator', icon: '🌅', tag: 'Planning', popular: true },
  { name: 'NPS Calculator', desc: 'National Pension System corpus & monthly pension', href: '/calculators/finance/nps-calculator', icon: '👴', tag: 'Retirement', popular: false },
  { name: 'SWP Calculator', desc: 'Systematic withdrawal plan for retirement', href: '/calculators/finance/swp-calculator', icon: '💸', tag: 'Retirement', popular: false },
  { name: 'Inflation Calculator', desc: 'Future purchasing power of money', href: '/calculators/finance/inflation-calculator', icon: '📊', tag: 'Planning', popular: false },
  // Tax & Salary
  { name: 'Income Tax Calculator', desc: 'New vs Old regime tax comparison FY 2026-27', href: '/calculators/finance/income-tax-calculator', icon: '🏛️', tag: 'Tax', popular: true },
  { name: 'GST Calculator', desc: 'CGST, SGST, IGST for all GST rates', href: '/calculators/finance/gst-calculator', icon: '🧾', tag: 'Tax', popular: false },
  { name: 'HRA Calculator', desc: 'House rent allowance tax exemption', href: '/calculators/finance/hra-calculator', icon: '🏠', tag: 'Tax', popular: false },
  { name: 'Salary Calculator', desc: 'CTC to in-hand salary breakdown India', href: '/calculators/finance/salary-calculator', icon: '💼', tag: 'Salary', popular: false },
  { name: 'Gratuity Calculator', desc: 'Gratuity for 5, 10, 15, 20+ years service', href: '/calculators/finance/gratuity-calculator', icon: '🤝', tag: 'Salary', popular: false },
  // Debt & Business
  { name: 'Net Worth Calculator', desc: 'Assets minus liabilities — your snapshot', href: '/calculators/finance/net-worth-calculator', icon: '⚖️', tag: 'Tracking', popular: false },
  { name: 'Debt Payoff Calculator', desc: 'Avalanche & snowball debt elimination', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', tag: 'Debt', popular: false },
  { name: 'Break-Even Calculator', desc: 'Break-even units, revenue & profit analysis', href: '/calculators/finance/break-even-calculator', icon: '⚖️', tag: 'Business', popular: false },
  // Utility
  { name: 'Currency Converter', desc: 'Convert between 20+ world currencies', href: '/calculators/finance/currency-converter', icon: '💱', tag: 'Utility', popular: false },
  { name: 'Tip Calculator', desc: 'Tip amount and bill split per person', href: '/calculators/finance/tip-calculator', icon: '🍽️', tag: 'Utility', popular: false },
]

const tagColors: Record<string, string> = {
  Investment: 'bg-emerald-100 text-emerald-700', Loan: 'bg-blue-100 text-blue-700',
  Savings: 'bg-cyan-100 text-cyan-700', Planning: 'bg-violet-100 text-violet-700',
  Retirement: 'bg-amber-100 text-amber-700', Advanced: 'bg-rose-100 text-rose-700',
  Tracking: 'bg-indigo-100 text-indigo-700', Debt: 'bg-orange-100 text-orange-700',
  Tax: 'bg-red-100 text-red-700', Salary: 'bg-pink-100 text-pink-700',
  Interest: 'bg-teal-100 text-teal-700', Business: 'bg-purple-100 text-purple-700',
  Utility: 'bg-gray-100 text-gray-700',
}

const structured = {
  '@context': 'https://schema.org', '@type': 'ItemList',
  name: 'Finance Calculators — 30 Free Tools',
  url: 'https://finanacecalculator.com/calculators/finance',
  numberOfItems: calculators.length,
  itemListElement: calculators.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, description: c.desc, url: `https://finanacecalculator.com${c.href}` })),
}

export default function FinancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <nav className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/" className="text-gray-500 hover:text-green-600">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold">Finance Calculators</span>
          </nav>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900">Finance Calculators</h1>
                <p className="text-green-600 font-semibold text-sm mt-0.5">30 Free Tools · No Signup · Instant Results</p>
              </div>
            </div>
            <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
              30 free finance calculators for <strong>SIP</strong>, <strong>EMI</strong>, <strong>GST</strong>, <strong>Income Tax</strong>, <strong>PPF</strong>, <strong>NPS</strong>, <strong>Gratuity</strong>, <strong>HRA</strong>, <strong>Currency</strong>, <strong>ROI</strong> and more. All free, no login.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              {[{ label: '30 Calculators', icon: '🧮' }, { label: 'Live Charts', icon: '📊' }, { label: 'Multi-Currency', icon: '💱' }, { label: '100% Free', icon: '✅' }].map(s => (
                <div key={s.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-green-200 shadow-sm text-sm font-semibold text-gray-700">
                  <span>{s.icon}</span> {s.label}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">⭐ Most Popular</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {calculators.filter(c => c.popular).map(calc => (
                <Link key={calc.href} href={calc.href} className="flex items-center gap-3 p-4 rounded-2xl bg-white border-2 border-green-200 hover:border-green-500 hover:shadow-lg transition-all group shadow-sm">
                  <span className="text-2xl">{calc.icon}</span>
                  <div>
                    <p className="font-bold text-sm text-gray-900 group-hover:text-green-700">{calc.name}</p>
                    <p className="text-xs text-green-600 font-semibold flex items-center gap-0.5 mt-0.5">Open <ArrowRight className="w-3 h-3" /></p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">All 30 Finance Calculators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {calculators.map(calc => (
                <Link key={calc.href} href={calc.href}
                  className="group bg-white rounded-2xl border border-gray-200 hover:border-green-400 hover:shadow-xl transition-all duration-200 p-5 flex flex-col shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center text-2xl group-hover:bg-green-100 transition-colors">{calc.icon}</div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${tagColors[calc.tag] || 'bg-gray-100 text-gray-600'}`}>{calc.tag}</span>
                  </div>
                  <h2 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors mb-1.5">{calc.name}</h2>
                  <p className="text-xs text-gray-500 flex-1 leading-relaxed">{calc.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs font-bold text-green-600 group-hover:gap-2 transition-all">
                    Open Calculator <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 p-8 rounded-3xl bg-white border border-gray-100 shadow-sm">
            <h2 className="text-xl font-black text-gray-900 mb-4">About Our 30 Finance Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-600 leading-relaxed">
              <div><h3 className="font-bold text-gray-800 mb-2">Tax Calculators</h3><p>Our <strong>income tax calculator</strong> compares New vs Old regime for FY 2026-27. The <strong>GST calculator</strong> handles all rates (5%, 12%, 18%, 28%) with CGST/SGST/IGST breakdown. The <strong>HRA calculator</strong> finds your maximum tax exemption.</p></div>
              <div><h3 className="font-bold text-gray-800 mb-2">Salary & Employee Benefits</h3><p>The <strong>salary/CTC calculator</strong> breaks down your in-hand pay from CTC with PF, TDS, and professional tax. The <strong>gratuity calculator</strong> calculates your payout after 5+ years. The <strong>NPS calculator</strong> estimates retirement corpus and monthly pension.</p></div>
              <div><h3 className="font-bold text-gray-800 mb-2">Investment Calculators</h3><p>Our <strong>PPF calculator</strong> shows EEE (triple tax-free) returns at 7.1%. The <strong>ROI calculator</strong> measures your investment return against benchmarks like Nifty 50 and S&P 500. The <strong>XIRR calculator</strong> gives true annualized returns for SIPs.</p></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
