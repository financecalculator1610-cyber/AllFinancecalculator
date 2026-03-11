'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

export type CurrencyCode = 'USD' | 'INR' | 'EUR'

export interface Currency {
  code: CurrencyCode
  symbol: string
  name: string
  flag: string
  locale: string
  defaultValues: {
    smallAmount: number
    mediumAmount: number
    largeAmount: number
    monthlyIncome: number
    monthlyExpense: number
    loanAmount: number
    homeLoan: number
  }
}

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: {
    code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', locale: 'en-US',
    defaultValues: { smallAmount: 500, mediumAmount: 10000, largeAmount: 100000, monthlyIncome: 5000, monthlyExpense: 3000, loanAmount: 25000, homeLoan: 350000 }
  },
  INR: {
    code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', locale: 'en-IN',
    defaultValues: { smallAmount: 5000, mediumAmount: 50000, largeAmount: 500000, monthlyIncome: 50000, monthlyExpense: 30000, loanAmount: 500000, homeLoan: 5000000 }
  },
  EUR: {
    code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', locale: 'de-DE',
    defaultValues: { smallAmount: 500, mediumAmount: 10000, largeAmount: 100000, monthlyIncome: 4000, monthlyExpense: 2500, loanAmount: 20000, homeLoan: 300000 }
  },
}

interface CurrencyContextType {
  currency: Currency
  setCurrency: (code: CurrencyCode) => void
  fmt: (amount: number, compact?: boolean) => string
  fmtCompact: (amount: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | null>(null)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('USD')
  const currency = CURRENCIES[currencyCode]

  const fmt = (amount: number, compact = false): string => {
    const absAmount = Math.abs(amount)
    const sign = amount < 0 ? '-' : ''
    if (compact) {
      if (currencyCode === 'INR') {
        if (absAmount >= 10000000) return `${sign}${currency.symbol}${(absAmount / 10000000).toFixed(2)}Cr`
        if (absAmount >= 100000) return `${sign}${currency.symbol}${(absAmount / 100000).toFixed(2)}L`
        if (absAmount >= 1000) return `${sign}${currency.symbol}${(absAmount / 1000).toFixed(1)}K`
      } else {
        if (absAmount >= 1000000) return `${sign}${currency.symbol}${(absAmount / 1000000).toFixed(2)}M`
        if (absAmount >= 1000) return `${sign}${currency.symbol}${(absAmount / 1000).toFixed(1)}K`
      }
    }
    try {
      return new Intl.NumberFormat(currency.locale, {
        style: 'currency', currency: currencyCode, maximumFractionDigits: 0,
      }).format(amount)
    } catch {
      return `${currency.symbol}${Math.round(amount).toLocaleString()}`
    }
  }

  const fmtCompact = (amount: number) => fmt(amount, true)

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: setCurrencyCode, fmt, fmtCompact }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider')
  return ctx
}
