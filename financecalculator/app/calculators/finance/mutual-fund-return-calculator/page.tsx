import type { Metadata } from "next";
import { GenericFinanceCalculator } from "@/components/calculators/GenericFinanceCalculator";
import { generateFAQSchema, generateWebAppSchema } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "Mutual Fund Return Calculator – NAV Based Returns | FinanaceCalculator.com",
  description: "Calculate mutual fund returns based on NAV. Find absolute returns, CAGR, and profit/loss on your MF investment.",
  keywords: ["mutual fund return calculator,mutual fund nav calculator,mf return calculator"],
  alternates: { canonical: "https://www.finanacecalculator.com/calculators/finance/mutual-fund-return-calculator" },
};

const faqs = [
  { question: "How does the Mutual Fund Return Calculator work?", answer: "This calculator uses financial formulas to compute accurate results based on your inputs. All calculations happen instantly in your browser." },
  { question: "Is this calculator free to use?", answer: "Yes, completely free! No registration required. Use it as many times as you want." },
  { question: "How accurate are the results?", answer: "Results are mathematically accurate based on the inputs provided. Actual returns may vary due to market conditions, taxes, and other factors." },
  { question: "Can I use this for tax planning?", answer: "This calculator gives pre-tax estimates. Consult a tax advisor for tax implications specific to your situation." },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }} />
      <GenericFinanceCalculator 
        title="Mutual Fund Return Calculator"
        slug="mutual-fund-return-calculator"
        icon="📋"
        description="Calculate mutual fund returns based on NAV. Find absolute returns, CAGR, and profit/loss on your MF investment."
        faqs={faqs}
      />
    </>
  );
}
