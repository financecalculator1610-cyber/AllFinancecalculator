import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Eye, Database, Cookie, Mail, RefreshCw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy — FinanaceCalculator.com',
  description: 'FinanaceCalculator.com privacy policy. We collect zero personal data. No cookies, no tracking, no email required. Your financial data stays on your device.',
  alternates: { canonical: 'https://finanacecalculator.com/privacy-policy' },
}

const lastUpdated = 'January 1, 2026'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-green-600">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900">Privacy Policy</h1>
              <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
            </div>
          </div>

          {/* TL;DR callout */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
            <p className="font-black text-green-800 text-lg mb-2">🔒 The Short Version</p>
            <p className="text-green-700 leading-relaxed">
              <strong>We collect zero personal data.</strong> FinanaceCalculator.com does not use cookies for tracking, 
              does not require account creation, does not collect email addresses, and does not sell or share any data with third parties. 
              All calculations happen in your browser. Your financial numbers never leave your device.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {[
            {
              icon: Database, color: 'bg-blue-100 text-blue-700',
              title: '1. Information We Collect',
              content: `FinanaceCalculator.com does not collect any personally identifiable information (PII). 

We do not ask for:
• Your name, email address, phone number, or any contact information
• Financial account information or bank details
• Location data
• Payment information

The numbers you enter into our calculators (investment amounts, loan values, weight, etc.) are processed entirely in your browser and are never transmitted to our servers.`
            },
            {
              icon: Cookie, color: 'bg-amber-100 text-amber-700',
              title: '2. Cookies & Tracking',
              content: `We do not use tracking cookies. We do not use:
• Google Analytics or similar visitor tracking tools
• Facebook Pixel or other social media tracking
• Advertising networks or retargeting cookies
• Session cookies that identify individual users

We may use minimal technical cookies (e.g., to remember your currency preference) that do not contain personal information and are stored only on your device.`
            },
            {
              icon: Eye, color: 'bg-rose-100 text-rose-700',
              title: '3. How We Use Information',
              content: `Since we collect no personal information, there is nothing to use. 

If you contact us via email (financecalculator1610@gmail.com), we use your email address solely to respond to your inquiry. We do not add you to any mailing list without your explicit consent, and we do not share your email with any third parties.`
            },
            {
              icon: Shield, color: 'bg-green-100 text-green-700',
              title: '4. Third-Party Services',
              content: `Our website may use the following minimal third-party services:
• Web hosting infrastructure (to serve web pages)
• Content Delivery Network (CDN) for fast loading of static assets

None of these services receive your calculation inputs or personal financial data. We do not embed third-party advertising scripts, social media buttons that track you, or any other data-collecting third-party code.`
            },
            {
              icon: RefreshCw, color: 'bg-violet-100 text-violet-700',
              title: '5. Children\'s Privacy',
              content: `FinanaceCalculator.com is intended for users 13 years of age and older. We do not knowingly collect any information from children under 13. If you believe a child under 13 has provided us with personal information, please contact us at financecalculator1610@gmail.com and we will take appropriate action.`
            },
            {
              icon: Mail, color: 'bg-indigo-100 text-indigo-700',
              title: '6. Contact & Data Requests',
              content: `If you have any questions about this Privacy Policy or wish to make a data-related request, please contact us:

Email: financecalculator1610@gmail.com

Since we collect no personal data, there is nothing to access, correct, or delete. However, we are happy to answer any privacy questions you have.`
            },
          ].map(section => {
            const Icon = section.icon
            return (
              <div key={section.title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-black text-gray-900">{section.title}</h2>
                </div>
                <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{section.content}</div>
              </div>
            )
          })}

          {/* Updates */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-black text-gray-900 mb-3">7. Changes to This Policy</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page will reflect any changes. We encourage you to review this policy periodically. Continued use of FinanaceCalculator.com after any changes constitutes acceptance of the updated policy.
            </p>
          </div>

          <div className="text-center text-sm text-gray-400 pt-4">
            <p>Questions? Email us at <a href="mailto:financecalculator1610@gmail.com" className="text-green-600 font-semibold hover:underline">financecalculator1610@gmail.com</a></p>
            <div className="flex justify-center gap-4 mt-3">
              <Link href="/about" className="hover:text-gray-600 hover:underline">About</Link>
              <Link href="/disclaimer" className="hover:text-gray-600 hover:underline">Disclaimer</Link>
              <Link href="/contact" className="hover:text-gray-600 hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
