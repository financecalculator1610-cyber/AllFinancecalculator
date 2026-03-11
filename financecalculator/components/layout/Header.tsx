'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Calculator, Heart, ChevronDown, BookOpen } from 'lucide-react'
import { useCurrency, CURRENCIES, type CurrencyCode } from '@/context/CurrencyContext'

const financeCalcs = [
  { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈' },
  { name: 'EMI Calculator', href: '/calculators/finance/emi-calculator', icon: '🏦' },
  { name: 'Income Tax Calculator', href: '/calculators/finance/income-tax-calculator', icon: '🏛️' },
  { name: 'GST Calculator', href: '/calculators/finance/gst-calculator', icon: '🧾' },
  { name: 'PPF Calculator', href: '/calculators/finance/ppf-calculator', icon: '🛡️' },
  { name: 'NPS Calculator', href: '/calculators/finance/nps-calculator', icon: '👴' },
  { name: 'Salary / CTC Calculator', href: '/calculators/finance/salary-calculator', icon: '💼' },
  { name: 'Gratuity Calculator', href: '/calculators/finance/gratuity-calculator', icon: '🤝' },
  { name: 'HRA Calculator', href: '/calculators/finance/hra-calculator', icon: '🏠' },
  { name: 'ROI Calculator', href: '/calculators/finance/roi-calculator', icon: '📈' },
  { name: 'Currency Converter', href: '/calculators/finance/currency-converter', icon: '💱' },
  { name: 'Compound Interest', href: '/calculators/finance/compound-interest-calculator', icon: '💰' },
  { name: 'Simple Interest', href: '/calculators/finance/simple-interest-calculator', icon: '📐' },
  { name: 'FD / CD Calculator', href: '/calculators/finance/fd-calculator', icon: '🏛️' },
  { name: 'RD Calculator', href: '/calculators/finance/rd-calculator', icon: '🏧' },
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🌅' },
  { name: 'Home Loan / Mortgage', href: '/calculators/finance/home-loan-calculator', icon: '🏠' },
  { name: 'Car Loan Calculator', href: '/calculators/finance/car-loan-calculator', icon: '🚗' },
  { name: 'CAGR Calculator', href: '/calculators/finance/cagr-calculator', icon: '📈' },
  { name: 'XIRR Calculator', href: '/calculators/finance/xirr-calculator', icon: '📐' },
  { name: 'SWP Calculator', href: '/calculators/finance/swp-calculator', icon: '💸' },
  { name: 'Step-Up SIP', href: '/calculators/finance/step-up-sip-calculator', icon: '🚀' },
  { name: 'Mutual Fund Returns', href: '/calculators/finance/mutual-fund-calculator', icon: '📊' },
  { name: 'Loan Prepayment', href: '/calculators/finance/loan-prepayment-calculator', icon: '💰' },
  { name: 'Break-Even Calc', href: '/calculators/finance/break-even-calculator', icon: '⚖️' },
  { name: 'Tip Calculator', href: '/calculators/finance/tip-calculator', icon: '🍽️' },
  { name: 'Debt Payoff', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓' },
  { name: 'Net Worth', href: '/calculators/finance/net-worth-calculator', icon: '⚖️' },
  { name: 'Savings Goal', href: '/calculators/finance/savings-goal-calculator', icon: '🎯' },
  { name: 'Inflation Calculator', href: '/calculators/finance/inflation-calculator', icon: '📊' },
]

const healthCalcs = [
  { name: 'BMI Calculator', href: '/calculators/health/bmi-calculator', icon: '⚖️' },
  { name: 'Calorie Calculator', href: '/calculators/health/calorie-calculator', icon: '🔥' },
  { name: 'BMR Calculator', href: '/calculators/health/bmr-calculator', icon: '❤️' },
  { name: 'Body Fat %', href: '/calculators/health/body-fat-calculator', icon: '💪' },
  { name: 'Ideal Weight', href: '/calculators/health/ideal-weight-calculator', icon: '🏋️' },
  { name: 'Water Intake', href: '/calculators/health/water-intake-calculator', icon: '💧' },
  { name: 'Protein Intake', href: '/calculators/health/protein-intake-calculator', icon: '🥩' },
  { name: 'Sleep Cycle', href: '/calculators/health/sleep-cycle-calculator', icon: '😴' },
  { name: 'Pregnancy Calculator', href: '/calculators/health/pregnancy-calculator', icon: '🤰' },
  { name: 'Ovulation Calculator', href: '/calculators/health/ovulation-calculator', icon: '🌸' },
]

const blogCategories = [
  { name: 'Investment Guides', href: '/blog/category/investment', icon: '📈' },
  { name: 'Loan & EMI Tips', href: '/blog/category/loans', icon: '🏦' },
  { name: 'Retirement Planning', href: '/blog/category/retirement', icon: '🌅' },
  { name: 'Health & Fitness', href: '/blog/category/health', icon: '💪' },
  { name: 'Personal Finance 101', href: '/blog/category/personal-finance', icon: '💡' },
  { name: 'View All Posts', href: '/blog', icon: '📚' },
]

function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-50 border border-green-200 hover:border-green-400 hover:bg-green-100 transition-all text-sm font-bold text-gray-800"
      >
        <span className="text-base">{currency.flag}</span>
        <span className="text-green-700 font-mono font-bold">{currency.symbol}</span>
        <span className="text-gray-600 hidden sm:inline text-xs">{currency.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden w-52">
            <div className="p-3 border-b border-gray-100 bg-green-50">
              <p className="text-xs font-bold text-green-700 uppercase tracking-wider">Select Currency</p>
            </div>
            {(Object.values(CURRENCIES) as typeof CURRENCIES[CurrencyCode][]).map((cur) => (
              <button
                key={cur.code}
                onClick={() => { setCurrency(cur.code as CurrencyCode); setOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-green-50 ${currency.code === cur.code ? 'bg-green-50 text-green-700' : 'text-gray-700'}`}
              >
                <span className="text-xl w-7 text-center">{cur.flag}</span>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-gray-900">{cur.symbol}</span>
                    <span className="font-semibold">{cur.code}</span>
                  </div>
                  <p className="text-xs text-gray-400">{cur.name}</p>
                </div>
                {currency.code === cur.code && <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function NavDropdown({ label, items, icon, accentColor = 'green' }: { label: string; items: { name: string; href: string; icon: string }[]; icon: React.ReactNode; accentColor?: string }) {
  const [open, setOpen] = useState(false)
  const hoverBg = accentColor === 'red' ? 'hover:bg-red-50' : 'hover:bg-green-50'
  const textColor = accentColor === 'red' ? 'text-red-600' : 'text-green-600'
  const borderColor = accentColor === 'red' ? 'border-red-100' : 'border-green-100'
  const bgHeader = accentColor === 'red' ? 'bg-red-50' : 'bg-green-50'
  const labelColor = accentColor === 'red' ? 'text-red-600' : 'text-green-600'

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all text-sm font-semibold">
        {icon}
        {label}
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className={`absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl p-2 z-50`}>
          <p className={`text-xs font-bold ${labelColor} uppercase tracking-wider px-3 py-2 ${bgHeader} rounded-xl mb-1`}>{label}</p>
          {items.map(item => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:text-gray-900 ${hoverBg} transition-colors font-medium`}>
              <span className="text-base">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo — matches Image 2 exactly */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center shadow-md group-hover:bg-green-700 transition-colors">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-gray-900 font-display text-xl tracking-tight">
              Finance<span className="text-green-600">Calculator</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            <NavDropdown
              label="Finance"
              icon={<Calculator className="w-4 h-4 text-green-600" />}
              items={financeCalcs}
              accentColor="green"
            />
            <NavDropdown
              label="Health"
              icon={<Heart className="w-4 h-4 text-red-500" />}
              items={healthCalcs}
              accentColor="red"
            />
            <NavDropdown
              label="Blog"
              icon={<BookOpen className="w-4 h-4 text-blue-600" />}
              items={blogCategories}
              accentColor="green"
            />
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <CurrencySelector />
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 py-3 max-h-[75vh] overflow-y-auto">
            {[
              { key: 'finance', label: '💰 Finance', items: financeCalcs },
              { key: 'health', label: '❤️ Health', items: healthCalcs },
              { key: 'blog', label: '📚 Blog', items: blogCategories },
            ].map(section => (
              <div key={section.key}>
                <button onClick={() => setMobileSection(mobileSection === section.key ? null : section.key)}
                  className="w-full flex items-center justify-between px-3 py-3 font-bold text-sm text-gray-800 hover:bg-gray-50 rounded-xl">
                  {section.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileSection === section.key ? 'rotate-180' : ''}`} />
                </button>
                {mobileSection === section.key && (
                  <div className="ml-3 space-y-0.5 mb-2">
                    {section.items.map(item => (
                      <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:text-gray-900 hover:bg-green-50 font-medium transition-colors">
                        <span>{item.icon}</span>{item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
