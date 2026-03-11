"use client";
import React from "react";

// ============================================================
// INPUT COMPONENTS
// ============================================================

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  prefix?: string;
  onChange: (value: number) => void;
  formatValue?: (v: number) => string;
}

export function SliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  prefix,
  onChange,
  formatValue,
}: SliderInputProps) {
  const displayValue = formatValue ? formatValue(value) : value.toLocaleString("en-IN");

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium" style={{ color: "#94a3b8" }}>
          {label}
        </label>
        <div
          className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold"
          style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}
        >
          {prefix && <span>{prefix}</span>}
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              if (!isNaN(v) && v >= min && v <= max) onChange(v);
            }}
            className="w-20 text-right bg-transparent outline-none"
            style={{ color: "#22c55e" }}
          />
          {unit && <span>{unit}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
        style={{
          background: `linear-gradient(to right, #22c55e ${((value - min) / (max - min)) * 100}%, #1e293b ${((value - min) / (max - min)) * 100}%)`,
        }}
      />
      <div className="flex justify-between text-xs" style={{ color: "#475569" }}>
        <span>
          {prefix}{min.toLocaleString("en-IN")}{unit}
        </span>
        <span>
          {prefix}{max.toLocaleString("en-IN")}{unit}
        </span>
      </div>
    </div>
  );
}

interface SelectInputProps {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}

export function SelectInput({ label, value, options, onChange }: SelectInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium" style={{ color: "#94a3b8" }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-3 rounded-xl text-sm font-medium outline-none border transition-colors"
        style={{
          background: "#111827",
          border: "1px solid rgba(34,197,94,0.15)",
          color: "#f9fafb",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(34,197,94,0.15)")}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ background: "#111827" }}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface TextInputProps {
  label: string;
  value: string | number;
  type?: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  onChange: (value: string) => void;
}

export function TextInput({ label, value, type = "text", placeholder, prefix, suffix, onChange }: TextInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium" style={{ color: "#94a3b8" }}>
        {label}
      </label>
      <div
        className="flex items-center rounded-xl border overflow-hidden transition-colors"
        style={{ background: "#111827", border: "1px solid rgba(34,197,94,0.15)" }}
        onFocusWithin={(e: any) => (e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(34,197,94,0.15)")}
      >
        {prefix && (
          <span className="px-3 py-3 text-sm font-medium" style={{ color: "#22c55e", background: "rgba(34,197,94,0.05)" }}>
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-3 text-sm outline-none bg-transparent"
          style={{ color: "#f9fafb" }}
        />
        {suffix && (
          <span className="px-3 py-3 text-sm" style={{ color: "#64748b" }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

// ============================================================
// RESULT CARD
// ============================================================

interface ResultCardProps {
  label: string;
  value: string;
  subValue?: string;
  color?: string;
  icon?: React.ReactNode;
}

export function ResultCard({ label, value, subValue, color = "#22c55e", icon }: ResultCardProps) {
  return (
    <div
      className="p-4 rounded-xl border"
      style={{
        background: "rgba(13,20,37,0.8)",
        border: `1px solid ${color}20`,
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: "#64748b" }}>
            {label}
          </p>
          <p className="text-xl font-bold" style={{ color }}>
            {value}
          </p>
          {subValue && (
            <p className="text-xs mt-1" style={{ color: "#475569" }}>
              {subValue}
            </p>
          )}
        </div>
        {icon && (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `${color}15` }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// SECTION COMPONENTS
// ============================================================

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSection({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="rounded-xl border overflow-hidden"
          style={{
            background: "#0d1425",
            border: openIndex === index ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="text-sm font-medium pr-4" style={{ color: "#e2e8f0" }}>
              {faq.question}
            </span>
            <span
              className="text-lg flex-shrink-0 transition-transform"
              style={{
                color: "#22c55e",
                transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              +
            </span>
          </button>
          {openIndex === index && (
            <div className="px-5 pb-4">
              <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

interface KeyTakeawayProps {
  points: string[];
}

export function KeyTakeaways({ points }: KeyTakeawayProps) {
  return (
    <div
      className="rounded-xl p-5 border"
      style={{
        background: "rgba(34,197,94,0.05)",
        border: "1px solid rgba(34,197,94,0.15)",
      }}
    >
      <h3 className="font-semibold mb-3" style={{ color: "#22c55e" }}>
        🎯 Key Takeaways
      </h3>
      <ul className="space-y-2">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#94a3b8" }}>
            <span style={{ color: "#22c55e" }}>✓</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold" style={{ color: "#f9fafb" }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm mt-1" style={{ color: "#64748b" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function CalculatorShell({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #030712 0%, #0a0f1e 50%, #030712 100%)" }}
    >
      {/* Hero */}
      <div
        className="border-b"
        style={{ borderColor: "rgba(34,197,94,0.1)", background: "rgba(13,20,37,0.5)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}
            >
              {icon}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "#f9fafb" }}>
                {title}
              </h1>
              <p className="mt-2 text-sm md:text-base max-w-2xl" style={{ color: "#64748b" }}>
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}

export function DataTable({
  headers,
  rows,
  maxRows = 12,
}: {
  headers: string[];
  rows: Array<Array<string | number>>;
  maxRows?: number;
}) {
  const [showAll, setShowAll] = React.useState(false);
  const displayRows = showAll ? rows : rows.slice(0, maxRows);

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
        <table className="data-table">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length > maxRows && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 text-sm font-medium transition-colors"
          style={{ color: "#22c55e" }}
        >
          {showAll ? "Show Less ↑" : `Show All ${rows.length} rows ↓`}
        </button>
      )}
    </div>
  );
}

export function GenderToggle({
  value,
  onChange,
}: {
  value: "male" | "female";
  onChange: (v: "male" | "female") => void;
}) {
  return (
    <div
      className="flex rounded-xl p-1 gap-1"
      style={{ background: "#111827", border: "1px solid rgba(34,197,94,0.1)" }}
    >
      {(["male", "female"] as const).map((g) => (
        <button
          key={g}
          onClick={() => onChange(g)}
          className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all capitalize"
          style={{
            background: value === g ? "rgba(34,197,94,0.15)" : "transparent",
            color: value === g ? "#22c55e" : "#64748b",
            border: value === g ? "1px solid rgba(34,197,94,0.3)" : "1px solid transparent",
          }}
        >
          {g === "male" ? "👨 Male" : "👩 Female"}
        </button>
      ))}
    </div>
  );
}
