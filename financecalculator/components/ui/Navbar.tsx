"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, TrendingUp, Heart, ChevronDown } from "lucide-react";

const financeCalcs = [
  { name: "SIP Calculator", slug: "sip-calculator" },
  { name: "EMI Calculator", slug: "emi-calculator" },
  { name: "Compound Interest", slug: "compound-interest-calculator" },
  { name: "FD Calculator", slug: "fd-calculator" },
  { name: "RD Calculator", slug: "rd-calculator" },
  { name: "Inflation Calculator", slug: "inflation-calculator" },
  { name: "Retirement Calculator", slug: "retirement-calculator" },
  { name: "Lumpsum Calculator", slug: "lumpsum-calculator" },
  { name: "CAGR Calculator", slug: "cagr-calculator" },
  { name: "XIRR Calculator", slug: "xirr-calculator" },
  { name: "Loan Prepayment", slug: "loan-prepayment-calculator" },
  { name: "Personal Loan", slug: "personal-loan-calculator" },
  { name: "Home Loan", slug: "home-loan-calculator" },
  { name: "Car Loan", slug: "car-loan-calculator" },
  { name: "Savings Goal", slug: "savings-goal-calculator" },
  { name: "Net Worth", slug: "net-worth-calculator" },
  { name: "Debt Payoff", slug: "debt-payoff-calculator" },
  { name: "SWP Calculator", slug: "swp-calculator" },
  { name: "Step-Up SIP", slug: "step-up-sip-calculator" },
  { name: "Mutual Fund Returns", slug: "mutual-fund-return-calculator" },
];

const healthCalcs = [
  { name: "BMI Calculator", slug: "bmi-calculator" },
  { name: "Calorie Calculator", slug: "calorie-calculator" },
  { name: "BMR Calculator", slug: "bmr-calculator" },
  { name: "Body Fat Calculator", slug: "body-fat-calculator" },
  { name: "Ideal Weight", slug: "ideal-weight-calculator" },
  { name: "Water Intake", slug: "water-intake-calculator" },
  { name: "Protein Intake", slug: "protein-intake-calculator" },
  { name: "Pregnancy Due Date", slug: "pregnancy-due-date-calculator" },
  { name: "Ovulation Calculator", slug: "ovulation-calculator" },
  { name: "Sleep Cycle", slug: "sleep-cycle-calculator" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [financeOpen, setFinanceOpen] = useState(false);
  const [healthOpen, setHealthOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(3,7,18,0.95)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(34,197,94,0.12)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}
            >
              <TrendingUp size={16} color="#22c55e" />
            </div>
            <span className="font-bold text-lg" style={{ color: "#f9fafb" }}>
              Finance<span style={{ color: "#22c55e" }}>Calculator</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {/* Finance Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setFinanceOpen(true)}
              onMouseLeave={() => setFinanceOpen(false)}
            >
              <button
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ color: financeOpen ? "#22c55e" : "#94a3b8" }}
              >
                <TrendingUp size={15} />
                Finance
                <ChevronDown size={14} className={`transition-transform ${financeOpen ? "rotate-180" : ""}`} />
              </button>
              {financeOpen && (
                <div
                  className="absolute top-full left-0 w-56 rounded-xl py-2 shadow-2xl"
                  style={{
                    background: "#0d1425",
                    border: "1px solid rgba(34,197,94,0.15)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                  }}
                >
                  {financeCalcs.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/calculators/finance/${c.slug}`}
                      className="block px-4 py-2 text-sm transition-colors"
                      style={{ color: "#94a3b8" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#22c55e")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Health Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setHealthOpen(true)}
              onMouseLeave={() => setHealthOpen(false)}
            >
              <button
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ color: healthOpen ? "#22c55e" : "#94a3b8" }}
              >
                <Heart size={15} />
                Health
                <ChevronDown size={14} className={`transition-transform ${healthOpen ? "rotate-180" : ""}`} />
              </button>
              {healthOpen && (
                <div
                  className="absolute top-full left-0 w-56 rounded-xl py-2 shadow-2xl"
                  style={{
                    background: "#0d1425",
                    border: "1px solid rgba(34,197,94,0.15)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                  }}
                >
                  {healthCalcs.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/calculators/health/${c.slug}`}
                      className="block px-4 py-2 text-sm transition-colors"
                      style={{ color: "#94a3b8" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#22c55e")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/calculators"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ color: "#94a3b8" }}
            >
              All Calculators
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "#94a3b8" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{ background: "#0a0f1e", borderColor: "rgba(34,197,94,0.1)" }}
        >
          <div className="px-4 py-4 space-y-1 max-h-96 overflow-y-auto">
            <p className="text-xs font-semibold px-2 py-1" style={{ color: "#22c55e" }}>
              💰 FINANCE CALCULATORS
            </p>
            {financeCalcs.map((c) => (
              <Link
                key={c.slug}
                href={`/calculators/finance/${c.slug}`}
                className="block px-2 py-1.5 text-sm rounded"
                style={{ color: "#94a3b8" }}
                onClick={() => setMobileOpen(false)}
              >
                {c.name}
              </Link>
            ))}
            <p className="text-xs font-semibold px-2 py-1 mt-3" style={{ color: "#22c55e" }}>
              ❤️ HEALTH CALCULATORS
            </p>
            {healthCalcs.map((c) => (
              <Link
                key={c.slug}
                href={`/calculators/health/${c.slug}`}
                className="block px-2 py-1.5 text-sm rounded"
                style={{ color: "#94a3b8" }}
                onClick={() => setMobileOpen(false)}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
