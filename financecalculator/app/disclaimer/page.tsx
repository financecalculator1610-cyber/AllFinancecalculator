import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, Info, TrendingUp, Heart, Scale, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disclaimer — FinanaceCalculator.com',
  description: 'Important disclaimer for FinanaceCalculator.com. Our calculators provide estimates for informational purposes only and do not constitute financial, medical, or legal advice.',
  alternates: { canonical: 'https://finanacecalculator.com/disclaimer' },
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-green-600">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">Disclaimer</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900">Disclaimer</h1>
              <p className="text-gray-500 text-sm">Please read this carefully before using our calculators</p>
            </div>
          </div>

          {/* Key warning */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6">
            <p className="font-black text-amber-800 text-lg mb-2">⚠️ Important Notice</p>
            <p className="text-amber-700 leading-relaxed">
              The calculators and information on FinanaceCalculator.com are provided for <strong>informational and educational purposes only</strong>. 
              They do not constitute financial advice, medical advice, or professional recommendations. 
              Always consult a qualified professional before making financial or health decisions.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {[
            {
              icon: TrendingUp, color: 'bg-green-100 text-green-700',
              title: 'Financial Calculator Disclaimer',
              content: [
                'All financial calculations (SIP, EMI, compound interest, CAGR, XIRR, retirement, etc.) are estimates based on the inputs you provide and standard mathematical formulas.',
                'Results assume constant rates of return, which real-world investments do not guarantee. Actual market returns will vary and may be significantly higher or lower than projected.',
                'Past performance of mutual funds, stocks, or any investment does not guarantee future results.',
                'Loan calculations assume fixed interest rates. Variable-rate loans will produce different results.',
                'FinanaceCalculator.com is not a registered financial advisor, broker, or investment firm. Nothing on this website constitutes personalized financial advice.',
                'Before making any investment, loan, or retirement planning decision, consult a qualified Certified Financial Planner (CFP), Registered Investment Advisor (RIA), or licensed financial professional.',
              ]
            },
            {
              icon: Heart, color: 'bg-rose-100 text-rose-700',
              title: 'Health Calculator Disclaimer',
              content: [
                'All health calculations (BMI, BMR, calorie needs, body fat, ideal weight, water intake, protein, sleep, pregnancy, ovulation) are estimates based on population-level research and scientific formulas.',
                'Individual results will vary significantly based on genetics, medical conditions, medications, and other personal factors not captured by these calculators.',
                'BMI is a screening tool, not a diagnostic measure. It does not account for muscle mass, bone density, or fat distribution.',
                'Calorie and protein calculations are starting estimates — individual metabolism varies widely.',
                'Pregnancy and ovulation calculators provide estimates based on average cycle lengths. Actual dates vary significantly.',
                'Nothing on this website constitutes medical advice or replaces the guidance of a qualified healthcare provider, doctor, dietitian, or certified health professional.',
                'If you have a medical condition or health concern, always consult your physician before making health or dietary changes.',
              ]
            },
            {
              icon: Info, color: 'bg-blue-100 text-blue-700',
              title: 'General Information Disclaimer',
              content: [
                'FinanaceCalculator.com makes every effort to ensure the accuracy of our calculators, but we cannot guarantee that all calculations are free from errors.',
                'We are not responsible for any financial losses, health outcomes, or decisions made based on the use of our calculators.',
                'Blog articles and guides on this website are for educational purposes only and should not be used as the sole basis for any decision.',
                'Tax implications of investments, loans, or financial decisions are highly jurisdiction-specific. Consult a tax professional for tax advice.',
                'We reserve the right to modify, update, or discontinue any calculator or content without notice.',
              ]
            },
            {
              icon: Scale, color: 'bg-violet-100 text-violet-700',
              title: 'Limitation of Liability',
              content: [
                'To the maximum extent permitted by applicable law, FinanaceCalculator.com and its operators shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of our calculators or website.',
                'By using FinanaceCalculator.com, you agree that you are using the tools at your own risk and that the website is provided "as is" without warranties of any kind.',
                'This disclaimer is governed by and construed in accordance with applicable laws.',
              ]
            },
          ].map(section => {
            const Icon = section.icon
            return (
              <div key={section.title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-black text-gray-900">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                      <span className="text-amber-500 font-black mt-0.5 flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}

          {/* Encouragement to consult professionals */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white">
            <h2 className="text-xl font-black mb-3">✅ We Encourage You To:</h2>
            <ul className="space-y-2 text-sm text-green-100">
              <li className="flex items-start gap-2"><span className="text-green-300 font-black">→</span> Use our calculators as a starting point for research and understanding</li>
              <li className="flex items-start gap-2"><span className="text-green-300 font-black">→</span> Consult a Certified Financial Planner (CFP) for investment decisions</li>
              <li className="flex items-start gap-2"><span className="text-green-300 font-black">→</span> Work with a licensed loan officer for mortgage and loan decisions</li>
              <li className="flex items-start gap-2"><span className="text-green-300 font-black">→</span> See a registered dietitian or doctor for personalized health guidance</li>
              <li className="flex items-start gap-2"><span className="text-green-300 font-black">→</span> Consult an OB-GYN for pregnancy and reproductive health matters</li>
            </ul>
          </div>

          <div className="text-center text-sm text-gray-400 pt-4">
            <p>Questions? <a href="mailto:financecalculator1610@gmail.com" className="text-green-600 font-semibold hover:underline">financecalculator1610@gmail.com</a></p>
            <div className="flex justify-center gap-4 mt-3">
              <Link href="/about" className="hover:text-gray-600 hover:underline">About</Link>
              <Link href="/privacy-policy" className="hover:text-gray-600 hover:underline">Privacy Policy</Link>
              <Link href="/contact" className="hover:text-gray-600 hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
