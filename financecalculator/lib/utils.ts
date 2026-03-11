import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount: number, compact = false): string => {
  if (compact && amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`
  if (compact && amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`
  if (compact && amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}

export const formatNumber = (n: number): string => new Intl.NumberFormat('en-IN').format(Math.round(n))
