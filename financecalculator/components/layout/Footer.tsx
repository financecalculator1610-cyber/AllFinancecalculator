import Link from 'next/link'
import { TrendingUp, Heart, Mail, Shield, FileText, Info, BookOpen, ExternalLink } from 'lucide-react'

export function Footer() {
  const year = 2026
  return (
    <footer className="bg-gray-950 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-white text-lg">Finanace<span className="text-green-500">Calculator</span></span>
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              30 free finance and health calculators. No signup, no ads, no data tracking. 
              SIP, EMI, BMI, TDEE, retirement planning and more — instant results with charts.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-green-500 flex-shrink-0" />
              <a href="mailto:financecalculator1610@gmail.com" className="hover:text-white transition-colors text-green-400 font-semibold">
                financecalculator1610@gmail.com
              </a>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {['$ USD', '₹ INR', '€ EUR'].map(c => (
                <span key={c} className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400 font-semibold">{c}</span>
              ))}
            </div>
          </div>

          {/* Finance */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-green-500" /> Finance
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ['SIP Calculator', '/calculators/finance/sip-calculator'],
                ['EMI Calculator', '/calculators/finance/emi-calculator'],
                ['FD Calculator', '/calculators/finance/fd-calculator'],
                ['RD Calculator', '/calculators/finance/rd-calculator'],
                ['Compound Interest', '/calculators/finance/compound-interest-calculator'],
                ['CAGR Calculator', '/calculators/finance/cagr-calculator'],
                ['XIRR Calculator', '/calculators/finance/xirr-calculator'],
                ['Retirement Calculator', '/calculators/finance/retirement-calculator'],
                ['Home Loan Calculator', '/calculators/finance/home-loan-calculator'],
                ['Car Loan Calculator', '/calculators/finance/car-loan-calculator'],
                ['SWP Calculator', '/calculators/finance/swp-calculator'],
                ['View All 20 →', '/calculators/finance'],
              ].map(([name, href]) => (
                <li key={href}><Link href={href} className="hover:text-white hover:text-green-400 transition-colors">{name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Health */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500" /> Health
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ['BMI Calculator', '/calculators/health/bmi-calculator'],
                ['Calorie Calculator', '/calculators/health/calorie-calculator'],
                ['BMR Calculator', '/calculators/health/bmr-calculator'],
                ['Body Fat Calculator', '/calculators/health/body-fat-calculator'],
                ['Ideal Weight', '/calculators/health/ideal-weight-calculator'],
                ['Water Intake', '/calculators/health/water-intake-calculator'],
                ['Protein Intake', '/calculators/health/protein-intake-calculator'],
                ['Sleep Cycle', '/calculators/health/sleep-cycle-calculator'],
                ['Pregnancy Calculator', '/calculators/health/pregnancy-calculator'],
                ['Ovulation Calculator', '/calculators/health/ovulation-calculator'],
                ['View All 10 →', '/calculators/health'],
              ].map(([name, href]) => (
                <li key={href}><Link href={href} className="hover:text-white hover:text-rose-400 transition-colors">{name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company + Blog */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-400" /> Blog & Company
            </h3>
            <ul className="space-y-2.5 text-sm mb-6">
              {[
                ['Blog Home', '/blog'],
                ['Investment Guides', '/blog/category/investment'],
                ['Loan & EMI Tips', '/blog/category/loans'],
                ['Retirement Planning', '/blog/category/retirement'],
                ['Health & Fitness', '/blog/category/health'],
                ['Personal Finance', '/blog/category/personal-finance'],
              ].map(([name, href]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-colors">{name}</Link></li>
              ))}
            </ul>
            <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-gray-400" /> Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ['About Us', '/about'],
                ['Contact Us', '/contact'],
                ['Privacy Policy', '/privacy-policy'],
                ['Disclaimer', '/disclaimer'],
              ].map(([name, href]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-colors">{name}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEO keyword-rich text block */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <p className="text-xs text-gray-600 leading-relaxed max-w-5xl">
            <strong className="text-gray-500">FinanaceCalculator.com</strong> — Free online calculators for personal finance and health. 
            Calculate <Link href="/calculators/finance/sip-calculator" className="text-gray-500 hover:text-gray-400">SIP returns</Link>, 
            <Link href="/calculators/finance/emi-calculator" className="text-gray-500 hover:text-gray-400"> EMI</Link>, 
            <Link href="/calculators/finance/fd-calculator" className="text-gray-500 hover:text-gray-400"> FD maturity</Link>, 
            <Link href="/calculators/finance/rd-calculator" className="text-gray-500 hover:text-gray-400"> RD interest</Link>, 
            <Link href="/calculators/finance/compound-interest-calculator" className="text-gray-500 hover:text-gray-400"> compound interest</Link>, 
            <Link href="/calculators/finance/cagr-calculator" className="text-gray-500 hover:text-gray-400"> CAGR</Link>, 
            <Link href="/calculators/finance/xirr-calculator" className="text-gray-500 hover:text-gray-400"> XIRR</Link>, 
            <Link href="/calculators/finance/retirement-calculator" className="text-gray-500 hover:text-gray-400"> retirement corpus</Link>, 
            <Link href="/calculators/finance/home-loan-calculator" className="text-gray-500 hover:text-gray-400"> home loan</Link>, 
            <Link href="/calculators/health/bmi-calculator" className="text-gray-500 hover:text-gray-400"> BMI</Link>, 
            <Link href="/calculators/health/calorie-calculator" className="text-gray-500 hover:text-gray-400"> daily calories (TDEE)</Link>, 
            <Link href="/calculators/health/sleep-cycle-calculator" className="text-gray-500 hover:text-gray-400"> sleep cycles</Link> and more. 
            Supports USD ($), INR (₹), EUR (€). 100% free, no signup, no ads.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {year} FinanaceCalculator.com — All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white flex items-center gap-1"><Shield className="w-3 h-3" /> Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-white flex items-center gap-1"><FileText className="w-3 h-3" /> Disclaimer</Link>
            <Link href="/about" className="hover:text-white flex items-center gap-1"><Info className="w-3 h-3" /> About</Link>
            <Link href="/contact" className="hover:text-white flex items-center gap-1"><Mail className="w-3 h-3" /> Contact</Link>
          </div>
          <p className="text-gray-700">For informational use only. Not financial or medical advice.</p>
        </div>
      </div>
    </footer>
  )
}
