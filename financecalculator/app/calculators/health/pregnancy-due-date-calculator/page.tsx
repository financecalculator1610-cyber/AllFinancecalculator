import type { Metadata } from "next";
import { GenericHealthCalculator } from "@/components/calculators/GenericHealthCalculator";
import { generateFAQSchema, generateWebAppSchema } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "Pregnancy Due Date Calculator – EDD Calculator | FinanaceCalculator.com",
  description: "Calculate your pregnancy due date based on last menstrual period. Track weeks, trimester, and key milestones.",
  keywords: ["pregnancy due date calculator,edd calculator,pregnancy calculator,baby due date calculator"],
  alternates: { canonical: "https://www.finanacecalculator.com/calculators/health/pregnancy-due-date-calculator" },
};

const faqs = [
  { question: "How does the Pregnancy Due Date Calculator work?", answer: "This calculator uses scientifically validated formulas to compute results based on your personal measurements and inputs." },
  { question: "Is this calculator accurate?", answer: "Results are mathematically accurate based on the inputs. For medical decisions, always consult a qualified healthcare professional." },
  { question: "Is my data private?", answer: "Completely private. All calculations happen in your browser — no data is sent to our servers or stored anywhere." },
  { question: "Should I consult a doctor?", answer: "This calculator is for informational purposes. For health concerns or medical decisions, please consult a qualified doctor or healthcare professional." },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }} />
      <GenericHealthCalculator 
        title="Pregnancy Due Date Calculator"
        slug="pregnancy-due-date-calculator"
        icon="🤱"
        description="Calculate your pregnancy due date based on last menstrual period. Track weeks, trimester, and key milestones."
        faqs={faqs}
      />
    </>
  );
}
