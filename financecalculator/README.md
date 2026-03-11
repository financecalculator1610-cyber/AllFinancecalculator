# FinanceCalculator.com - Complete Project

A production-ready Next.js 14 calculator platform with 30 calculators (20 finance + 10 health).

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (dark mode)
- **Recharts** (interactive charts)
- **Mobile-first responsive design**

## Features
- ✅ 30 Calculators (20 Finance + 10 Health)
- ✅ Interactive inputs with sliders
- ✅ Recharts visualizations
- ✅ Year-wise breakdown tables
- ✅ FAQ sections with accordion
- ✅ SEO metadata for all pages
- ✅ JSON-LD structured data (FAQPage + WebApplication)
- ✅ Sitemap.xml auto-generated
- ✅ Robots.txt
- ✅ OpenGraph + Twitter cards
- ✅ Canonical URLs
- ✅ Dark fintech UI (Groww-inspired)
- ✅ Mobile-first layout
- ✅ Web manifest (PWA ready)

## Project Structure
```
app/
  page.tsx                          # Homepage
  layout.tsx                        # Root layout
  sitemap.ts                        # Dynamic sitemap
  robots.ts                         # Robots.txt
  calculators/
    finance/
      sip-calculator/               # SIP: Full implementation
      emi-calculator/               # EMI: Full amortization schedule
      compound-interest-calculator/ # CI: Multiple compounding frequencies
      fd-calculator/                # FD: Full implementation
      rd-calculator/                # RD: Full implementation
      inflation-calculator/         # Inflation: Full implementation
      retirement-calculator/        # Retirement: Full corpus calculator
      lumpsum-calculator/           # Lumpsum: Full implementation
      cagr-calculator/              # CAGR: Full implementation
      swp-calculator/               # SWP: Full implementation
      step-up-sip-calculator/       # Step-Up SIP: Full implementation
      home-loan-calculator/         # Home Loan: Full with down payment
      car-loan-calculator/          # Car Loan: Full amortization
      personal-loan-calculator/     # Personal Loan: Full
      + 6 more calculators
    health/
      bmi-calculator/               # BMI: Full with scale visualization
      calorie-calculator/           # Calorie: Full with macros chart
      + 8 more health calculators

components/
  layout/
    Header.tsx                      # Sticky header with dropdowns
    Footer.tsx                      # Full footer with all links
  ui/
    Card.tsx                        # Card + ResultCard components
    InputField.tsx                  # Input + Slider + Select fields
    FAQSection.tsx                  # Accordion FAQ component
    CalculatorLayout.tsx            # Reusable calculator page layout
    Breadcrumb.tsx                  # Breadcrumb navigation
    ChartWrapper.tsx                # Recharts wrapper utilities

lib/
  calculations/
    finance.ts                      # All 20 finance calculation functions
    health.ts                       # All 10 health calculation functions
  seo/
    metadata.ts                     # SEO metadata generators
  utils.ts                          # cn(), formatCurrency(), formatNumber()

types/
  index.ts                          # TypeScript type definitions
```

## Installation

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
npm start
```

## SEO Strategy
Each calculator page includes:
- Unique meta title and description
- OpenGraph and Twitter card tags
- Canonical URL
- JSON-LD: FAQPage schema
- JSON-LD: WebApplication schema
- JSON-LD: BreadcrumbList schema
- Auto-generated sitemap.xml
- Robots.txt

## Calculation Functions
All calculation logic is in `/lib/calculations/`:
- `calculateSIP()` - Systematic Investment Plan
- `calculateEMI()` - Equated Monthly Installment
- `calculateCompoundInterest()` - Compound interest
- `calculateFD()` - Fixed Deposit
- `calculateRD()` - Recurring Deposit
- `calculateInflation()` - Inflation adjusted value
- `calculateRetirement()` - Retirement corpus
- `calculateLumpsum()` - One-time investment
- `calculateCAGR()` - CAGR
- `calculateXIRR()` - XIRR (Newton-Raphson)
- `calculateLoanPrepayment()` - Loan prepayment savings
- `calculateSavingsGoal()` - Goal-based savings
- `calculateSWP()` - Systematic Withdrawal Plan
- `calculateStepUpSIP()` - Step-Up SIP
- `calculateDebtPayoff()` - Avalanche/Snowball debt
- `calculateNetWorth()` - Net worth
- `calculateMutualFundReturn()` - MF returns
- `calculateBMI()` - Body Mass Index
- `calculateBMR()` - Basal Metabolic Rate
- `calculateCalories()` - Daily calorie needs
- `calculateBodyFat()` - Body fat (Navy Method)
- `calculateIdealWeight()` - Ideal weight formulas
- `calculateWaterIntake()` - Water intake
- `calculateProteinIntake()` - Protein needs
- `calculatePregnancyDueDate()` - Due date
- `calculateOvulation()` - Ovulation window
- `calculateSleepCycle()` - Sleep cycles
