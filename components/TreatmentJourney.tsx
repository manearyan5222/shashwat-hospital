import React from "react";
import { TreatmentJourneyStep } from "@/data/treatments";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface TreatmentJourneyProps {
  steps: TreatmentJourneyStep[];
  title?: string;
  subtitle?: string;
}

export function TreatmentJourney({
  steps,
  title = "The 6-Step Clinical Treatment Journey",
  subtitle = "A transparent, structured pathway guiding you from initial assessment through complete functional recovery.",
}: TreatmentJourneyProps) {
  return (
    <div className="py-4">
      {title && (
        <div className="mb-8">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-navy-950">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-surface-muted mt-1.5">{subtitle}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative">
        {steps.map((step) => (
          <div
            key={step.stepNumber}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-surface-border shadow-card flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-3xl flex items-start justify-end p-3 text-teal-800 font-heading font-extrabold text-lg">
              0{step.stepNumber}
            </div>

            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-navy-100 text-navy-900 mb-3">
                {step.timeline || `Phase ${step.stepNumber}`}
              </div>

              <h4 className="font-heading font-bold text-base sm:text-lg text-navy-950 mb-2 pr-12">
                {step.title}
              </h4>

              <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs text-teal-700 font-medium gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Coordinated Clinical Milestones</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
