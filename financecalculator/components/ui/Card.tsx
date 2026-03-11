import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  glow?: boolean
  gradient?: boolean
}

export function Card({ children, className, glow = true, gradient = false }: CardProps) {
  return (
    <div className={cn(
      'rounded-2xl bg-white p-6',
      'border border-gray-100 shadow-card',
      glow && 'transition-all duration-300 hover:border-green-200 hover:shadow-card-hover',
      gradient && 'bg-gradient-to-br from-green-50 to-white border-green-100',
      className
    )}>
      {children}
    </div>
  )
}

interface ResultCardProps {
  label: string
  value: string
  subValue?: string
  highlight?: boolean
  icon?: ReactNode
  color?: string
}

export function ResultCard({ label, value, subValue, highlight, icon, color }: ResultCardProps) {
  return (
    <div className={cn(
      'rounded-xl p-4 border transition-all duration-200',
      highlight
        ? 'bg-gradient-to-br from-green-50 to-green-100/60 border-green-200 shadow-sm'
        : 'bg-gray-50 border-gray-100 hover:border-gray-200'
    )}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">{label}</p>
          <p className={cn('text-lg font-bold font-display truncate', highlight ? 'gradient-text' : 'text-gray-900')}>{value}</p>
          {subValue && <p className="text-xs text-gray-400 mt-0.5 truncate">{subValue}</p>}
        </div>
        {icon && (
          <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', highlight ? 'bg-green-100' : 'bg-gray-100')}>
            <span style={{ color: color || (highlight ? '#16a34a' : '#9ca3af') }}>{icon}</span>
          </div>
        )}
      </div>
    </div>
  )
}
