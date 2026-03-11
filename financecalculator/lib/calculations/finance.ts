// ============================================================
// FINANCE CALCULATION LIBRARY
// ============================================================

/** SIP Calculator */
export function calculateSIP(monthlyAmount: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12
  const n = years * 12
  const totalInvested = monthlyAmount * n
  const maturityAmount = monthlyAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
  const totalReturns = maturityAmount - totalInvested

  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const months = y * 12
    const val = monthlyAmount * ((Math.pow(1 + r, months) - 1) / r) * (1 + r)
    yearlyData.push({ year: y, invested: monthlyAmount * months, returns: val - monthlyAmount * months, total: Math.round(val) })
  }
  return { totalInvested: Math.round(totalInvested), estimatedReturns: Math.round(totalReturns), totalValue: Math.round(maturityAmount), yearlyData }
}

/** EMI Calculator */
export function calculateEMI(principal: number, annualRate: number, tenureMonths: number) {
  const r = annualRate / 100 / 12
  const emi = principal * r * Math.pow(1 + r, tenureMonths) / (Math.pow(1 + r, tenureMonths) - 1)
  const totalPayment = emi * tenureMonths
  const totalInterest = totalPayment - principal

  const schedule = []
  let balance = principal
  for (let m = 1; m <= tenureMonths; m++) {
    const interest = balance * r
    const principalPaid = emi - interest
    balance -= principalPaid
    schedule.push({ month: m, emi: Math.round(emi), principal: Math.round(principalPaid), interest: Math.round(interest), balance: Math.max(0, Math.round(balance)) })
  }
  return { emi: Math.round(emi), totalPayment: Math.round(totalPayment), totalInterest: Math.round(totalInterest), schedule }
}

/** Compound Interest Calculator */
export function calculateCompoundInterest(principal: number, annualRate: number, years: number, frequency: number) {
  const r = annualRate / 100
  const maturityAmount = principal * Math.pow(1 + r / frequency, frequency * years)
  const totalInterest = maturityAmount - principal

  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const val = principal * Math.pow(1 + r / frequency, frequency * y)
    yearlyData.push({ year: y, invested: principal, returns: Math.round(val - principal), total: Math.round(val) })
  }
  return { principal, maturityAmount: Math.round(maturityAmount), totalInterest: Math.round(totalInterest), yearlyData }
}

/** FD Calculator */
export function calculateFD(principal: number, annualRate: number, years: number, compoundFreq: number = 4) {
  const r = annualRate / 100
  const maturityAmount = principal * Math.pow(1 + r / compoundFreq, compoundFreq * years)
  const totalInterest = maturityAmount - principal

  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const val = principal * Math.pow(1 + r / compoundFreq, compoundFreq * y)
    yearlyData.push({ year: y, invested: principal, returns: Math.round(val - principal), total: Math.round(val) })
  }
  return { invested: principal, maturityAmount: Math.round(maturityAmount), totalInterest: Math.round(totalInterest), yearlyData }
}

/** RD Calculator */
export function calculateRD(monthlyDeposit: number, annualRate: number, months: number) {
  const r = annualRate / 100 / 4
  let maturityAmount = 0
  for (let m = 1; m <= months; m++) {
    const n = Math.ceil(m / 3)
    maturityAmount += monthlyDeposit * Math.pow(1 + r, n)
  }
  const totalInvested = monthlyDeposit * months
  const totalInterest = maturityAmount - totalInvested

  const yearlyData = []
  for (let q = 1; q <= Math.ceil(months / 3); q++) {
    const mEnd = Math.min(q * 3, months)
    let val = 0
    for (let m = 1; m <= mEnd; m++) {
      const n = Math.ceil(m / 3)
      val += monthlyDeposit * Math.pow(1 + r, q - n + 1)
    }
    const year = Math.ceil(q / 4)
    if (q % 4 === 0 || q === Math.ceil(months / 3)) {
      yearlyData.push({ year, invested: monthlyDeposit * mEnd, returns: Math.round(val - monthlyDeposit * mEnd), total: Math.round(val) })
    }
  }
  return { totalInvested: Math.round(totalInvested), maturityAmount: Math.round(maturityAmount), totalInterest: Math.round(totalInterest), yearlyData }
}

/** Inflation Calculator */
export function calculateInflation(currentAmount: number, inflationRate: number, years: number) {
  const futureValue = currentAmount * Math.pow(1 + inflationRate / 100, years)
  const purchasingPower = currentAmount / Math.pow(1 + inflationRate / 100, years)

  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const fv = currentAmount * Math.pow(1 + inflationRate / 100, y)
    const pp = currentAmount / Math.pow(1 + inflationRate / 100, y)
    yearlyData.push({ year: y, invested: currentAmount, returns: Math.round(fv - currentAmount), total: Math.round(fv), purchasingPower: Math.round(pp) })
  }
  return { currentAmount, futureValue: Math.round(futureValue), purchasingPower: Math.round(purchasingPower), yearlyData }
}

/** Retirement Calculator */
export function calculateRetirement(currentAge: number, retirementAge: number, monthlyExpense: number, currentSavings: number, expectedReturn: number, inflationRate: number) {
  const yearsToRetirement = retirementAge - currentAge
  const retirementDuration = 25
  const inflationAdjustedExpense = monthlyExpense * Math.pow(1 + inflationRate / 100, yearsToRetirement)
  const annualExpenseAtRetirement = inflationAdjustedExpense * 12
  const realReturn = (expectedReturn - inflationRate) / 100
  const corpusRequired = annualExpenseAtRetirement * ((1 - Math.pow(1 + realReturn, -retirementDuration)) / realReturn)
  const currentSavingsGrown = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement)
  const additionalRequired = Math.max(0, corpusRequired - currentSavingsGrown)
  const monthlyRate = expectedReturn / 100 / 12
  const months = yearsToRetirement * 12
  const monthlySIPRequired = additionalRequired * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1)

  const yearlyData = []
  for (let y = 1; y <= yearsToRetirement; y++) {
    const savings = currentSavings * Math.pow(1 + expectedReturn / 100, y)
    yearlyData.push({ year: currentAge + y, invested: Math.round(savings * 0.6), returns: Math.round(savings * 0.4), total: Math.round(savings) })
  }
  return { corpusRequired: Math.round(corpusRequired), currentSavingsGrown: Math.round(currentSavingsGrown), additionalRequired: Math.round(additionalRequired), monthlySIPRequired: Math.round(monthlySIPRequired), yearlyData }
}

/** Lumpsum Calculator */
export function calculateLumpsum(principal: number, annualRate: number, years: number) {
  const maturityAmount = principal * Math.pow(1 + annualRate / 100, years)
  const totalReturns = maturityAmount - principal

  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const val = principal * Math.pow(1 + annualRate / 100, y)
    yearlyData.push({ year: y, invested: principal, returns: Math.round(val - principal), total: Math.round(val) })
  }
  return { principal, maturityAmount: Math.round(maturityAmount), totalReturns: Math.round(totalReturns), yearlyData }
}

/** CAGR Calculator */
export function calculateCAGR(initialValue: number, finalValue: number, years: number) {
  const cagr = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100
  const absoluteReturn = ((finalValue - initialValue) / initialValue) * 100

  const yearlyData = []
  for (let y = 0; y <= years; y++) {
    const val = initialValue * Math.pow(1 + cagr / 100, y)
    yearlyData.push({ year: y, invested: initialValue, returns: Math.round(val - initialValue), total: Math.round(val) })
  }
  return { cagr: parseFloat(cagr.toFixed(2)), absoluteReturn: parseFloat(absoluteReturn.toFixed(2)), initialValue, finalValue, yearlyData }
}

/** XIRR (approximation using Newton-Raphson) */
export function calculateXIRR(cashflows: { date: Date; amount: number }[]) {
  let rate = 0.1
  for (let i = 0; i < 100; i++) {
    let npv = 0
    let dnpv = 0
    const t0 = cashflows[0].date.getTime()
    for (const cf of cashflows) {
      const t = (cf.date.getTime() - t0) / (365.25 * 24 * 3600 * 1000)
      npv += cf.amount / Math.pow(1 + rate, t)
      dnpv -= t * cf.amount / Math.pow(1 + rate, t + 1)
    }
    const newRate = rate - npv / dnpv
    if (Math.abs(newRate - rate) < 1e-10) break
    rate = newRate
  }
  return { xirr: parseFloat((rate * 100).toFixed(2)) }
}

/** Loan Prepayment Calculator */
export function calculateLoanPrepayment(principal: number, annualRate: number, tenureMonths: number, prepaymentAmount: number, prepaymentAfterMonth: number) {
  const r = annualRate / 100 / 12
  const emi = principal * r * Math.pow(1 + r, tenureMonths) / (Math.pow(1 + r, tenureMonths) - 1)

  let balance = principal
  let totalInterest = 0
  let monthsPaid = 0
  for (let m = 1; m <= tenureMonths; m++) {
    const interest = balance * r
    const principalPaid = emi - interest
    balance -= principalPaid
    totalInterest += interest
    monthsPaid++
    if (m === prepaymentAfterMonth && prepaymentAmount > 0) balance = Math.max(0, balance - prepaymentAmount)
    if (balance <= 0) break
  }

  const originalInterest = emi * tenureMonths - principal
  const interestSaved = originalInterest - totalInterest
  const monthsSaved = tenureMonths - monthsPaid

  return { originalInterest: Math.round(originalInterest), reducedInterest: Math.round(totalInterest), interestSaved: Math.round(interestSaved), monthsSaved, newTenure: monthsPaid }
}

/** Savings Goal Calculator */
export function calculateSavingsGoal(goalAmount: number, currentSavings: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12
  const months = years * 12
  const currentSavingsGrown = currentSavings * Math.pow(1 + r, months)
  const remaining = Math.max(0, goalAmount - currentSavingsGrown)
  const monthlySIP = remaining * r / (Math.pow(1 + r, months) - 1)

  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const m = y * 12
    const savings = currentSavings * Math.pow(1 + r, m) + monthlySIP * ((Math.pow(1 + r, m) - 1) / r) * (1 + r)
    yearlyData.push({ year: y, invested: Math.round(currentSavings + monthlySIP * m), returns: Math.round(savings - currentSavings - monthlySIP * m), total: Math.round(savings) })
  }
  return { goalAmount, currentSavings, monthlySIPRequired: Math.round(monthlySIP), currentSavingsGrown: Math.round(currentSavingsGrown), yearlyData }
}

/** SWP (Systematic Withdrawal Plan) Calculator */
export function calculateSWP(investmentAmount: number, monthlyWithdrawal: number, annualReturn: number, years: number) {
  const r = annualReturn / 100 / 12
  const months = years * 12
  let balance = investmentAmount
  const monthlyData = []
  let totalWithdrawn = 0

  for (let m = 1; m <= months; m++) {
    const returns = balance * r
    balance = balance + returns - monthlyWithdrawal
    totalWithdrawn += monthlyWithdrawal
    if (m % 12 === 0 || m === months) {
      monthlyData.push({ year: Math.ceil(m / 12), invested: investmentAmount, returns: Math.round(totalWithdrawn), total: Math.max(0, Math.round(balance)) })
    }
    if (balance <= 0) break
  }
  return { investmentAmount, totalWithdrawn: Math.round(totalWithdrawn), finalBalance: Math.max(0, Math.round(balance)), yearlyData: monthlyData }
}

/** Step-Up SIP Calculator */
export function calculateStepUpSIP(initialMonthly: number, annualStepUp: number, annualReturn: number, years: number) {
  const r = annualReturn / 100 / 12
  let totalInvested = 0
  let corpus = 0
  const yearlyData = []

  for (let y = 1; y <= years; y++) {
    const monthly = initialMonthly * Math.pow(1 + annualStepUp / 100, y - 1)
    for (let m = 1; m <= 12; m++) {
      corpus = (corpus + monthly) * (1 + r)
      totalInvested += monthly
    }
    yearlyData.push({ year: y, invested: Math.round(totalInvested), returns: Math.round(corpus - totalInvested), total: Math.round(corpus) })
  }
  return { totalInvested: Math.round(totalInvested), estimatedReturns: Math.round(corpus - totalInvested), totalValue: Math.round(corpus), yearlyData }
}

/** Debt Payoff Calculator (Avalanche/Snowball) */
export function calculateDebtPayoff(debts: { name: string; balance: number; rate: number; minPayment: number }[], extraPayment: number, method: 'avalanche' | 'snowball') {
  const sorted = [...debts].sort((a, b) => method === 'avalanche' ? b.rate - a.rate : a.balance - b.balance)
  let totalMonths = 0
  let totalInterest = 0

  const results = sorted.map(debt => {
    const r = debt.rate / 100 / 12
    let balance = debt.balance
    let months = 0
    let interest = 0
    const payment = debt.minPayment + extraPayment / sorted.length
    while (balance > 0) {
      const monthInterest = balance * r
      interest += monthInterest
      balance = balance + monthInterest - payment
      months++
      if (months > 600) break
    }
    totalMonths = Math.max(totalMonths, months)
    totalInterest += interest
    return { ...debt, months, totalInterest: Math.round(interest) }
  })

  return { debts: results, totalMonths, totalInterest: Math.round(totalInterest) }
}

/** Net Worth Calculator */
export function calculateNetWorth(assets: { name: string; value: number }[], liabilities: { name: string; value: number }[]) {
  const totalAssets = assets.reduce((s, a) => s + a.value, 0)
  const totalLiabilities = liabilities.reduce((s, l) => s + l.value, 0)
  const netWorth = totalAssets - totalLiabilities
  return { totalAssets, totalLiabilities, netWorth, debtToAssetRatio: totalAssets > 0 ? parseFloat((totalLiabilities / totalAssets * 100).toFixed(1)) : 0 }
}

/** Mutual Fund Return Calculator */
export function calculateMutualFundReturn(investmentAmount: number, expectedReturn: number, years: number, expenseRatio: number) {
  const netReturn = expectedReturn - expenseRatio
  const grossMaturity = investmentAmount * Math.pow(1 + expectedReturn / 100, years)
  const netMaturity = investmentAmount * Math.pow(1 + netReturn / 100, years)
  const expenseImpact = grossMaturity - netMaturity

  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const val = investmentAmount * Math.pow(1 + netReturn / 100, y)
    yearlyData.push({ year: y, invested: investmentAmount, returns: Math.round(val - investmentAmount), total: Math.round(val) })
  }
  return { investmentAmount, netMaturity: Math.round(netMaturity), grossMaturity: Math.round(grossMaturity), expenseImpact: Math.round(expenseImpact), yearlyData }
}

export const formatCurrency = (amount: number, compact = false): string => {
  if (compact && amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`
  if (compact && amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`
  if (compact && amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}

export const formatNumber = (n: number): string => new Intl.NumberFormat('en-IN').format(Math.round(n))

/** ── NEW CALCULATORS ── **/

/** GST Calculator */
export function calculateGST(amount: number, gstRate: number, type: 'exclusive' | 'inclusive') {
  if (type === 'exclusive') {
    const gstAmount = (amount * gstRate) / 100
    const totalAmount = amount + gstAmount
    const cgst = gstAmount / 2
    const sgst = gstAmount / 2
    return { originalAmount: Math.round(amount), gstAmount: Math.round(gstAmount), totalAmount: Math.round(totalAmount), cgst: Math.round(cgst), sgst: Math.round(sgst), igst: Math.round(gstAmount), gstRate }
  } else {
    const originalAmount = (amount * 100) / (100 + gstRate)
    const gstAmount = amount - originalAmount
    const cgst = gstAmount / 2
    const sgst = gstAmount / 2
    return { originalAmount: Math.round(originalAmount), gstAmount: Math.round(gstAmount), totalAmount: Math.round(amount), cgst: Math.round(cgst), sgst: Math.round(sgst), igst: Math.round(gstAmount), gstRate }
  }
}

/** PPF (Public Provident Fund) Calculator */
export function calculatePPF(yearlyDeposit: number, years: number, interestRate: number = 7.1) {
  const r = interestRate / 100
  let balance = 0
  const yearlyData = []
  let totalDeposited = 0
  for (let y = 1; y <= years; y++) {
    const openingBalance = balance
    balance += yearlyDeposit
    const interest = balance * r
    balance += interest
    totalDeposited += yearlyDeposit
    yearlyData.push({ year: y, deposit: yearlyDeposit, interest: Math.round(interest), balance: Math.round(balance), totalDeposited })
  }
  const totalInterest = balance - totalDeposited
  return { maturityAmount: Math.round(balance), totalDeposited: Math.round(totalDeposited), totalInterest: Math.round(totalInterest), yearlyData }
}

/** NPS (National Pension System) Calculator */
export function calculateNPS(monthlyContribution: number, years: number, expectedReturn: number, annuityRate: number, annuityPercent: number) {
  const r = expectedReturn / 100 / 12
  const n = years * 12
  const totalContributed = monthlyContribution * n
  const maturityAmount = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
  const lumpsum = maturityAmount * (1 - annuityPercent / 100)
  const annuityCorpus = maturityAmount * (annuityPercent / 100)
  const monthlyPension = (annuityCorpus * annuityRate) / 100 / 12
  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const months = y * 12
    const val = monthlyContribution * ((Math.pow(1 + r, months) - 1) / r) * (1 + r)
    yearlyData.push({ year: y, contributed: monthlyContribution * months, total: Math.round(val), returns: Math.round(val - monthlyContribution * months) })
  }
  return { maturityAmount: Math.round(maturityAmount), totalContributed: Math.round(totalContributed), totalReturns: Math.round(maturityAmount - totalContributed), lumpsum: Math.round(lumpsum), annuityCorpus: Math.round(annuityCorpus), monthlyPension: Math.round(monthlyPension), yearlyData }
}

/** Gratuity Calculator */
export function calculateGratuity(lastSalary: number, yearsOfService: number, type: 'covered' | 'uncovered') {
  let gratuity = 0
  if (type === 'covered') {
    // Covered under Gratuity Act: (Last Salary × 15/26 × Years of Service)
    gratuity = (lastSalary * 15 * yearsOfService) / 26
  } else {
    // Not covered: (Last Salary × 15/30 × Years of Service)
    gratuity = (lastSalary * 15 * yearsOfService) / 30
  }
  const taxFreeLimit = 2000000 // ₹20 lakhs tax-free
  const taxableGratuity = Math.max(0, gratuity - taxFreeLimit)
  return { gratuity: Math.round(gratuity), taxFreeAmount: Math.round(Math.min(gratuity, taxFreeLimit)), taxableGratuity: Math.round(taxableGratuity), perYearGratuity: Math.round(gratuity / Math.max(1, yearsOfService)) }
}

/** HRA (House Rent Allowance) Exemption Calculator */
export function calculateHRA(basicSalary: number, hra: number, actualRentPaid: number, isMetro: boolean) {
  const metroPercent = isMetro ? 0.5 : 0.4
  const condition1 = hra // Actual HRA received
  const condition2 = actualRentPaid - basicSalary * 0.1 // Rent paid minus 10% of basic
  const condition3 = basicSalary * metroPercent // 50% or 40% of basic
  const hraExemption = Math.max(0, Math.min(condition1, condition2, condition3))
  const taxableHRA = Math.max(0, hra - hraExemption)
  return { hraExemption: Math.round(hraExemption), taxableHRA: Math.round(taxableHRA), condition1: Math.round(condition1), condition2: Math.round(Math.max(0, condition2)), condition3: Math.round(condition3) }
}

/** Simple Interest Calculator */
export function calculateSimpleInterest(principal: number, rate: number, years: number) {
  const simpleInterest = (principal * rate * years) / 100
  const totalAmount = principal + simpleInterest
  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const interest = (principal * rate * y) / 100
    yearlyData.push({ year: y, interest: Math.round(interest), total: Math.round(principal + interest) })
  }
  return { principal, simpleInterest: Math.round(simpleInterest), totalAmount: Math.round(totalAmount), yearlyData }
}

/** Income Tax Calculator (India FY 2026-27) */
export function calculateIncomeTax(grossIncome: number, regime: 'old' | 'new', deductions: { sec80C: number; sec80D: number; hra: number; lta: number; stdDeduction: number }) {
  const stdDeduction = regime === 'new' ? 75000 : deductions.stdDeduction || 50000
  let taxableIncome = grossIncome - stdDeduction
  if (regime === 'old') {
    taxableIncome -= Math.min(deductions.sec80C, 150000)
    taxableIncome -= Math.min(deductions.sec80D, 25000)
    taxableIncome -= deductions.hra
    taxableIncome -= deductions.lta
  }
  taxableIncome = Math.max(0, taxableIncome)

  let tax = 0
  let breakdown: { slab: string; rate: string; taxAmount: number }[] = []
  if (regime === 'new') {
    // New regime FY2026-27
    const slabs = [[400000, 0], [400000, 5], [400000, 10], [400000, 15], [400000, 20], [Infinity, 30]] as [number, number][]
    let remaining = taxableIncome
    let from = 0
    for (const [limit, rate] of slabs) {
      const taxable = Math.min(remaining, limit)
      const slabTax = (taxable * rate) / 100
      if (taxable > 0) breakdown.push({ slab: `₹${(from/100000).toFixed(0)}L – ₹${limit === Infinity ? '∞' : ((from + limit)/100000).toFixed(0)}L`, rate: `${rate}%`, taxAmount: Math.round(slabTax) })
      tax += slabTax
      remaining -= taxable
      from += limit
      if (remaining <= 0) break
    }
  } else {
    // Old regime
    const slabs = [[250000, 0], [250000, 5], [500000, 20], [Infinity, 30]] as [number, number][]
    let remaining = taxableIncome
    let from = 0
    for (const [limit, rate] of slabs) {
      const taxable = Math.min(remaining, limit)
      const slabTax = (taxable * rate) / 100
      if (taxable > 0) breakdown.push({ slab: `₹${(from/100000).toFixed(0)}L – ₹${limit === Infinity ? '∞' : ((from + limit)/100000).toFixed(0)}L`, rate: `${rate}%`, taxAmount: Math.round(slabTax) })
      tax += slabTax
      remaining -= taxable
      from += limit
      if (remaining <= 0) break
    }
  }
  const surcharge = taxableIncome > 5000000 ? tax * (taxableIncome > 10000000 ? 0.15 : 0.10) : 0
  const cess = (tax + surcharge) * 0.04
  const totalTax = tax + surcharge + cess
  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0
  return { taxableIncome: Math.round(taxableIncome), incomeTax: Math.round(tax), surcharge: Math.round(surcharge), cess: Math.round(cess), totalTax: Math.round(totalTax), effectiveRate: Math.round(effectiveRate * 100) / 100, breakdown, netIncome: Math.round(grossIncome - totalTax) }
}

/** Currency Converter (static base rates, updated values) */
export function convertCurrency(amount: number, from: string, to: string) {
  // Base rates vs USD (approximate 2026 rates)
  const rates: Record<string, number> = {
    USD: 1, INR: 84.5, EUR: 0.92, GBP: 0.79, JPY: 150.2, CAD: 1.36,
    AUD: 1.54, CHF: 0.89, CNY: 7.24, SGD: 1.34, AED: 3.67, MYR: 4.72,
    THB: 35.1, HKD: 7.82, SEK: 10.45, NOK: 10.72, NZD: 1.63, ZAR: 18.6, BRL: 4.97, MXN: 17.2
  }
  const fromRate = rates[from] || 1
  const toRate = rates[to] || 1
  const inUSD = amount / fromRate
  const converted = inUSD * toRate
  const exchangeRate = toRate / fromRate
  return { converted: Math.round(converted * 10000) / 10000, exchangeRate: Math.round(exchangeRate * 100000) / 100000, inUSD: Math.round(inUSD * 10000) / 10000, from, to }
}

/** Salary (CTC to In-Hand) Calculator */
export function calculateSalary(ctc: number, basicPercent: number, hraPercent: number, specialAllowancePercent: number) {
  const basic = (ctc * basicPercent) / 100 / 12
  const hra = (basic * hraPercent) / 100
  const specialAllowance = (ctc * specialAllowancePercent) / 100 / 12
  const employerPF = Math.min(basic * 0.12, 1800)
  const employeePF = Math.min(basic * 0.12, 1800)
  const professionalTax = 200
  const monthlyCTC = ctc / 12
  // Rough tax (new regime, no deductions)
  const annualTaxable = Math.max(0, ctc - 75000 - employeePF * 12)
  const annualTax = calculateIncomeTax(ctc, 'new', { sec80C: 0, sec80D: 0, hra: 0, lta: 0, stdDeduction: 75000 }).totalTax
  const monthlyTax = annualTax / 12
  const grossMonthly = basic + hra + specialAllowance
  const inHandMonthly = grossMonthly - employeePF - professionalTax - monthlyTax
  const annualInHand = inHandMonthly * 12
  return {
    ctc, annualCTC: ctc, monthly: { grossMonthly: Math.round(grossMonthly), basic: Math.round(basic), hra: Math.round(hra), specialAllowance: Math.round(specialAllowance), employeePF: Math.round(employeePF), professionalTax, tds: Math.round(monthlyTax), inHand: Math.round(inHandMonthly) },
    annual: { grossAnnual: Math.round(grossMonthly * 12), employerPF: Math.round(employerPF * 12), employeePF: Math.round(employeePF * 12), incomeTax: Math.round(annualTax), inHand: Math.round(annualInHand) },
    takeHomePercent: Math.round((inHandMonthly / monthlyCTC) * 100)
  }
}

/** Break-Even Analysis Calculator */
export function calculateBreakEven(fixedCosts: number, variableCostPerUnit: number, sellingPricePerUnit: number) {
  if (sellingPricePerUnit <= variableCostPerUnit) return { breakEvenUnits: Infinity, breakEvenRevenue: Infinity, contributionMargin: 0, contributionMarginRatio: 0, profitAtScenarios: [] }
  const contributionMargin = sellingPricePerUnit - variableCostPerUnit
  const contributionMarginRatio = (contributionMargin / sellingPricePerUnit) * 100
  const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin)
  const breakEvenRevenue = breakEvenUnits * sellingPricePerUnit
  const profitAtScenarios = [0.5, 0.75, 1, 1.25, 1.5, 2, 3].map(mult => {
    const units = Math.round(breakEvenUnits * mult)
    const revenue = units * sellingPricePerUnit
    const totalCost = fixedCosts + units * variableCostPerUnit
    const profit = revenue - totalCost
    return { units, revenue: Math.round(revenue), totalCost: Math.round(totalCost), profit: Math.round(profit), label: `${Math.round(mult * 100)}% BEP` }
  })
  return { breakEvenUnits, breakEvenRevenue: Math.round(breakEvenRevenue), contributionMargin: Math.round(contributionMargin), contributionMarginRatio: Math.round(contributionMarginRatio * 100) / 100, profitAtScenarios }
}

/** ROI (Return on Investment) Calculator */
export function calculateROI(initialInvestment: number, finalValue: number, years: number, additionalCosts: number = 0) {
  const totalCost = initialInvestment + additionalCosts
  const netProfit = finalValue - totalCost
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0
  const annualizedROI = years > 0 ? (Math.pow(finalValue / totalCost, 1 / years) - 1) * 100 : roi
  const multiplier = totalCost > 0 ? finalValue / totalCost : 0
  return {
    roi: Math.round(roi * 100) / 100,
    annualizedROI: Math.round(annualizedROI * 100) / 100,
    netProfit: Math.round(netProfit),
    totalCost: Math.round(totalCost),
    multiplier: Math.round(multiplier * 100) / 100,
    finalValue: Math.round(finalValue),
  }
}

/** Tip Calculator */
export function calculateTip(billAmount: number, tipPercent: number, numPeople: number) {
  const tipAmount = (billAmount * tipPercent) / 100
  const totalAmount = billAmount + tipAmount
  const perPerson = totalAmount / Math.max(1, numPeople)
  const tipPerPerson = tipAmount / Math.max(1, numPeople)
  const billPerPerson = billAmount / Math.max(1, numPeople)
  const commonTips = [10, 15, 18, 20, 25].map(pct => ({
    pct,
    tip: Math.round((billAmount * pct) / 100 * 100) / 100,
    total: Math.round((billAmount * (1 + pct / 100)) * 100) / 100,
    perPerson: Math.round((billAmount * (1 + pct / 100)) / Math.max(1, numPeople) * 100) / 100,
  }))
  return { tipAmount: Math.round(tipAmount * 100) / 100, totalAmount: Math.round(totalAmount * 100) / 100, perPerson: Math.round(perPerson * 100) / 100, tipPerPerson: Math.round(tipPerPerson * 100) / 100, billPerPerson: Math.round(billPerPerson * 100) / 100, commonTips }
}
