import { MetadataRoute } from 'next'
import { allBlogPosts as blogPosts, blogCategories } from '@/lib/blog/posts'

const BASE = 'https://finanacecalculator.com'
const now = new Date().toISOString()

const financeCalcs = [
  'sip-calculator', 'emi-calculator', 'compound-interest-calculator', 'fd-calculator', 'rd-calculator', 'inflation-calculator', 'retirement-calculator', 'lumpsum-calculator', 'cagr-calculator', 'xirr-calculator', 'loan-prepayment-calculator', 'personal-loan-calculator', 'home-loan-calculator', 'car-loan-calculator', 'savings-goal-calculator', 'net-worth-calculator', 'debt-payoff-calculator', 'swp-calculator', 'step-up-sip-calculator', 'mutual-fund-calculator', 'gst-calculator', 'ppf-calculator', 'nps-calculator', 'gratuity-calculator', 'hra-calculator', 'simple-interest-calculator', 'income-tax-calculator', 'currency-converter', 'salary-calculator', 'break-even-calculator', 'roi-calculator', 'tip-calculator',
]

const healthCalcs = [
  'bmi-calculator', 'calorie-calculator', 'bmr-calculator', 'body-fat-calculator',
  'ideal-weight-calculator', 'water-intake-calculator', 'protein-intake-calculator',
  'sleep-cycle-calculator', 'pregnancy-calculator', 'ovulation-calculator',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Core pages
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/calculators/finance`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE}/calculators/health`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE}/disclaimer`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    // Finance calculators
    ...financeCalcs.map(slug => ({
      url: `${BASE}/calculators/finance/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    // Health calculators
    ...healthCalcs.map(slug => ({
      url: `${BASE}/calculators/health/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    // Blog posts
    ...blogPosts.map(p => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    // Blog categories
    ...blogCategories.map(cat => ({
      url: `${BASE}/blog/category/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]
}
