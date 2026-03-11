import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CurrencyProvider } from '@/context/CurrencyContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const viewport: Viewport = {
  themeColor: '#16a34a',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://finanacecalculator.com'),
  title: {
    default: 'FinanaceCalculator.com — 30 Free Finance & Health Calculators 2026',
    template: '%s | FinanaceCalculator.com',
  },
  description: 'Free online calculators for SIP, EMI, FD, RD, CAGR, XIRR, SWP, compound interest, retirement, home loan, car loan, BMI, TDEE, BMR, water intake, sleep cycle and more. No signup required. Supports $ USD, ₹ INR, € EUR.',
  keywords: [
    'SIP calculator', 'EMI calculator', 'FD calculator', 'RD calculator', 'compound interest calculator',
    'CAGR calculator', 'XIRR calculator', 'SWP calculator', 'step up SIP calculator', 'retirement calculator',
    'home loan calculator', 'mortgage calculator', 'car loan calculator', 'personal loan calculator',
    'loan prepayment calculator', 'debt payoff calculator', 'net worth calculator', 'savings goal calculator',
    'inflation calculator', 'mutual fund return calculator', 'lumpsum calculator',
    'BMI calculator', 'calorie calculator', 'TDEE calculator', 'BMR calculator',
    'body fat calculator', 'ideal weight calculator', 'water intake calculator',
    'protein intake calculator', 'sleep cycle calculator', 'pregnancy calculator', 'ovulation calculator',
    'free financial calculator India', 'free health calculator', 'finance calculator 2026',
    'finanacecalculator', 'finanacecalculator.com',
  ],
  authors: [{ name: 'FinanaceCalculator Team', url: 'https://finanacecalculator.com' }],
  creator: 'FinanaceCalculator.com',
  publisher: 'FinanaceCalculator.com',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://finanacecalculator.com',
    siteName: 'FinanaceCalculator.com',
    title: 'FinanaceCalculator.com — 30 Free Finance & Health Calculators',
    description: 'Free SIP, EMI, FD, BMI, Calorie calculators with live charts. Supports USD, INR, EUR. No signup needed.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FinanaceCalculator.com - Free Finance & Health Calculators' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinanaceCalculator.com — 30 Free Finance & Health Calculators',
    description: 'Free SIP, EMI, BMI, TDEE calculators. Interactive charts. Supports $, ₹, €. No signup.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://finanacecalculator.com' },
  verification: { google: 'finanacecalculator-google-verification' },
  category: 'finance, health, calculators',
}

// Global Organization schema for AI search engines
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FinanaceCalculator.com',
  alternateName: ['Finanace Calculator', 'FinanaceCalculator'],
  url: 'https://finanacecalculator.com',
  description: 'Free online finance and health calculators. SIP, EMI, FD, BMI, Calorie, Retirement, Loan calculators with live charts. No signup. Supports USD, INR, EUR.',
  email: 'financecalculator1610@gmail.com',
  foundingDate: '2026',
  knowsAbout: [
    'SIP Calculator', 'EMI Calculator', 'FD Calculator', 'CAGR Calculator', 'XIRR Calculator',
    'Retirement Planning Calculator', 'BMI Calculator', 'Calorie Calculator', 'TDEE Calculator',
    'BMR Calculator', 'Compound Interest Calculator', 'Mortgage Calculator', 'Debt Payoff Calculator',
    'Personal Finance', 'Health Calculators', 'Investment Planning', 'Loan Calculators',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: '30 free online calculators for finance and health',
  },
  sameAs: ['https://finanacecalculator.com'],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'FinanaceCalculator.com',
  url: 'https://finanacecalculator.com',
  description: 'Free finance and health calculators — SIP, EMI, FD, BMI, TDEE, Retirement and 25 more. No signup, no ads, instant results.',
  potentialAction: [
    { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: 'https://finanacecalculator.com/calculators/finance/{search_term_string}' }, 'query-input': 'required name=search_term_string' }
  ],
  inLanguage: 'en-US',
  copyrightYear: '2026',
  isAccessibleForFree: true,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* AI/LLM discoverability meta tags */}
        <meta name="ai-description" content="FinanaceCalculator.com provides 30 free finance and health calculators including SIP, EMI, FD, RD, CAGR, XIRR, SWP, compound interest, retirement planning, home loan, car loan, BMI, TDEE, BMR, body fat, water intake, protein intake, sleep cycle, pregnancy due date, and ovulation calculators. All free, no signup required. Supports USD, INR, and EUR currencies." />
        <meta name="subject" content="Free Finance and Health Calculators" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="English" />
        {/* Schema.org structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <CurrencyProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CurrencyProvider>
      </body>
    </html>
  )
}
