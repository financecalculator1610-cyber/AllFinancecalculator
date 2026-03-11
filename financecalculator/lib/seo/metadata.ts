import type { Metadata } from 'next'

const BASE_URL = 'https://finanacecalculator.com'

export function generateCalculatorMetadata(params: {
  title: string
  description: string
  slug: string
  category: 'finance' | 'health'
  keywords: string[]
}): Metadata {
  const { title, description, slug, category, keywords } = params
  const url = `${BASE_URL}/calculators/${category}/${slug}`

  // Enhanced keywords for AI search engines (ChatGPT, Claude, Perplexity, Gemini)
  const allKeywords = [
    ...keywords,
    'free calculator',
    'online calculator 2026',
    'finanacecalculator.com',
    'finanace calculator',
    category === 'finance' ? 'free financial calculator India' : 'free health calculator',
    category === 'finance' ? 'personal finance tool' : 'health tracking tool',
  ]

  const fullTitle = `${title} 2026 — Free Online Calculator`

  return {
    title: fullTitle,
    description: `${description} Free, no signup, instant results. Supports $, ₹, €. FinanaceCalculator.com`,
    keywords: allKeywords,
    alternates: { canonical: url },
    authors: [{ name: 'FinanaceCalculator Team', url: BASE_URL }],
    creator: 'FinanaceCalculator.com',
    publisher: 'FinanaceCalculator.com',
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'FinanaceCalculator.com',
      type: 'website',
      locale: 'en_US',
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: `${title} — FinanaceCalculator.com` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${BASE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
    },
    other: {
      // AI-friendly metadata for ChatGPT, Perplexity, Claude, Gemini, xAI
      'ai-summary': `${title}: ${description} Available free at ${url}`,
      'tool-type': category === 'finance' ? 'financial-calculator' : 'health-calculator',
      'is-free': 'true',
      'requires-signup': 'false',
      'supports-currencies': 'USD, INR, EUR',
    },
  }
}

export function generateFAQStructuredData(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return {}
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function generateWebAppStructuredData(params: {
  name: string
  description: string
  url: string
  category: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: params.name,
    description: params.description,
    url: params.url,
    applicationCategory: params.category,
    operatingSystem: 'Web Browser',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: ['Free to use', 'No signup required', 'Interactive charts', 'Multi-currency (USD, INR, EUR)', 'Mobile responsive', 'Instant results'],
    author: { '@type': 'Organization', name: 'FinanaceCalculator.com', url: BASE_URL, email: 'financecalculator1610@gmail.com' },
    publisher: { '@type': 'Organization', name: 'FinanaceCalculator.com', url: BASE_URL },
    isAccessibleForFree: true,
    inLanguage: 'en-US',
  }
}

export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  }
}

export function generateCalculatorSchema(params: {
  name: string
  description: string
  url: string
  howToUse?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use ${params.name}`,
    description: params.description,
    url: params.url,
    step: (params.howToUse || [
      'Enter your values in the input fields',
      'Adjust sliders to see real-time results',
      'View interactive charts for visual breakdown',
      'Use the detailed table for year-by-year analysis',
    ]).map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: s,
    })),
    tool: { '@type': 'HowToTool', name: params.name },
    isAccessibleForFree: true,
  }
}
