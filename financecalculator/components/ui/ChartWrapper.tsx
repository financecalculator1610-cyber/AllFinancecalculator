'use client'
import { ReactNode } from 'react'
import { ResponsiveContainer } from 'recharts'

interface ChartWrapperProps {
  children: ReactNode
  height?: number
  title?: string
}

export function ChartWrapper({ children, height = 300, title }: ChartWrapperProps) {
  return (
    <div className="space-y-3">
      {title && <h3 className="text-sm font-semibold text-slate-300">{title}</h3>}
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export const chartColors = {
  invested: '#3b82f6',
  returns: '#14b8a6',
  total: '#8b5cf6',
  interest: '#f59e0b',
  principal: '#22c55e',
  balance: '#ec4899',
}

export const chartTheme = {
  cartesianGrid: { strokeDasharray: '3 3', stroke: 'rgba(148,163,184,0.1)' },
  xAxis: { tick: { fill: '#64748b', fontSize: 12 }, axisLine: { stroke: 'rgba(148,163,184,0.1)' }, tickLine: false },
  yAxis: { tick: { fill: '#64748b', fontSize: 12 }, axisLine: false, tickLine: false, width: 60 },
  tooltip: { contentStyle: { background: '#1e293b', border: '1px solid rgba(20,184,166,0.2)', borderRadius: 8, color: '#e2e8f0' }, cursor: { fill: 'rgba(20,184,166,0.05)' } },
  legend: { wrapperStyle: { paddingTop: 16, fontSize: 12 } },
}
