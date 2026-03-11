import Link from "next/link";
import { TrendingUp } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="border-t mt-16"
      style={{ background: "#030712", borderColor: "rgba(34,197,94,0.1)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}
              >
                <TrendingUp size={16} color="#22c55e" />
              </div>
              <span className="font-bold" style={{ color: "#f9fafb" }}>
                Finance<span style={{ color: "#22c55e" }}>Calculator</span>
              </span>
            </div>
            <p className="text-sm" style={{ color: "#64748b" }}>
              Free, accurate calculators for financial planning and health goals.
              Trusted by millions.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "#94a3b8" }}>
              Finance Tools
            </h3>
            <ul className="space-y-2">
              {["SIP Calculator", "EMI Calculator", "FD Calculator", "Retirement Calculator", "CAGR Calculator"].map(
                (name) => (
                  <li key={name}>
                    <Link
                      href={`/calculators/finance/${name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm hover:text-green-400 transition-colors"
                      style={{ color: "#64748b" }}
                    >
                      {name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "#94a3b8" }}>
              Health Tools
            </h3>
            <ul className="space-y-2">
              {["BMI Calculator", "Calorie Calculator", "BMR Calculator", "Body Fat Calculator", "Sleep Cycle Calculator"].map(
                (name) => (
                  <li key={name}>
                    <Link
                      href={`/calculators/health/${name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm hover:text-green-400 transition-colors"
                      style={{ color: "#64748b" }}
                    >
                      {name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "#94a3b8" }}>
              Company
            </h3>
            <ul className="space-y-2">
              {[
                { name: "About", href: "/about" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Contact", href: "/contact" },
                { name: "Sitemap", href: "/sitemap.xml" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-green-400 transition-colors"
                    style={{ color: "#64748b" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-sm" style={{ color: "#475569" }}>
            © {new Date().getFullYear()} FinanaceCalculator.com. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#374151" }}>
            Disclaimer: Calculations are for informational purposes only. Consult a financial advisor for investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
