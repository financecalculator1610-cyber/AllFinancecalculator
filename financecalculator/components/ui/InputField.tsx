'use client'
import { ReactNode } from 'react'

interface InputFieldProps {
  label: string
  value: number
  onChange: (val: number) => void
  min?: number
  max?: number
  step?: number
  prefix?: string
  suffix?: string
  showSlider?: boolean
}

export function InputField({ label, value, onChange, min = 0, max = 100, step = 1, prefix, suffix, showSlider = true }: InputFieldProps) {
  const pct = ((value - min) / (max - min)) * 100
  const sliderBg = `linear-gradient(to right, #16a34a 0%, #16a34a ${pct}%, #d1fae5 ${pct}%, #d1fae5 100%)`

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <div className="flex items-center gap-1 bg-white border-2 border-green-200 rounded-xl px-3 py-1.5 shadow-sm focus-within:border-green-500 focus-within:shadow-green-glow transition-all">
          {prefix && <span className="text-green-600 text-sm font-bold">{prefix}</span>}
          <input
            type="number" value={value}
            onChange={e => {
              const v = Number(e.target.value)
              if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)))
            }}
            className="w-20 bg-transparent text-gray-900 font-bold text-sm text-right outline-none"
            step={step}
          />
          {suffix && <span className="text-gray-500 text-sm font-medium">{suffix}</span>}
        </div>
      </div>
      {showSlider && (
        <input
          type="range" value={value} min={min} max={max} step={step}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-1.5 rounded-full cursor-pointer"
          style={{ background: sliderBg }}
        />
      )}
    </div>
  )
}

interface SelectFieldProps {
  label: string
  value: string
  onChange: (val: string) => void
  options: { value: string; label: string }[]
}

export function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-white border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 outline-none focus:border-green-500 transition-colors cursor-pointer shadow-sm"
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}
