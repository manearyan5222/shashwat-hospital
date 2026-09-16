import React from "react";
import Link from "next/link";
import { Condition } from "@/data/conditions";
import { ArrowRight, Activity, AlertCircle, ChevronRight } from "lucide-react";

export function ConditionCard({ condition }: { condition: Condition }) {
  return (
    <div className="group bg-white rounded-2xl border border-surface-border p-6 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {condition.bodyRegion} Care
          </span>
          <Activity className="w-4 h-4 text-teal-600 opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>

        <h3 className="font-heading font-bold text-lg text-navy-950 mb-2 group-hover:text-teal-800 transition-colors">
          {condition.title}
        </h3>

        <p className="text-xs sm:text-sm text-surface-muted leading-relaxed mb-4 line-clamp-3">
          {condition.shortDescription}
        </p>

        {/* Symptoms preview */}
        <div className="space-y-1.5 mb-4">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Common Signs:
          </div>
          <ul className="space-y-1">
            {condition.commonSymptoms.slice(0, 2).map((symptom, idx) => (
              <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                <span className="w-1 h-1 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                <span className="line-clamp-1">{symptom}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <Link
          href={`/conditions/${condition.slug}`}
          className="font-bold text-navy-900 group-hover:text-teal-800 inline-flex items-center gap-1 transition-colors"
        >
          <span>Understand Condition</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
        <Link
          href={`/appointment`}
          className="text-slate-500 hover:text-navy-900 hover:underline"
        >
          Book Consult
        </Link>
      </div>
    </div>
  );
}
