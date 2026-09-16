import React from "react";
import { PatientStory } from "@/data/testimonials";
import { UserCheck, Activity, Award, CheckCircle2 } from "lucide-react";

export function PatientStoryCard({ story }: { story: PatientStory }) {
  return (
    <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-card hover:shadow-hover transition-all duration-200 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center font-bold text-sm border border-teal-200">
              {story.patientInitials}
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-navy-950">
                {story.patientInitials} ({story.ageGroup})
              </h4>
              <p className="text-xs text-slate-500">{story.locality}</p>
            </div>
          </div>

          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            Case Study
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
          <div className="font-semibold text-navy-900">Condition: {story.conditionTreated}</div>
          <div className="text-teal-800 font-medium">Procedure: {story.procedurePerformed}</div>
        </div>

        <p className="text-xs sm:text-sm text-surface-muted leading-relaxed italic">
          &ldquo;{story.summary}&rdquo;
        </p>

        <p className="text-xs text-slate-600 leading-relaxed">
          {story.storyDetails}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 space-y-2">
        <div className="flex items-start gap-1.5 text-xs text-teal-800 font-medium">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <span>Milestone: {story.recoveryMilestone}</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Supervised by: {story.treatingSpecialistDesignation}
        </p>
      </div>
    </div>
  );
}
