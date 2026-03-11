export interface CalculatorMeta {
  title: string
  description: string
  slug: string
  category: 'finance' | 'health'
  icon: string
  color: string
  tags: string[]
}

export interface YearlyData {
  year: number
  invested: number
  returns: number
  total: number
}

export interface MonthlyData {
  month: number
  principal: number
  interest: number
  balance: number
  totalPaid: number
}

export interface FAQ {
  question: string
  answer: string
}
