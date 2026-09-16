import React from "react";
import Link from "next/link";
import { Calendar, Stethoscope, Activity, AlertCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const quickActions = [
  {
    title: "Book Appointment",
    description: "Request an OPD consultation with our orthopaedic specialists.",
    href: "/appointment",
    icon: Calendar,
    color: "bg-navy-900 text-white hover:bg-navy-800",
    iconBg: "bg-teal-500/20 text-teal-300",
    highlight: true,
  },
  {
    title: "Find a Doctor",
    description: "Explore consultants by clinical subspecialty & availability.",
    href: "/doctors",
    icon: Stethoscope,
    color: "bg-white text-navy-950 hover:border-teal-500",
    iconBg: "bg-teal-50 text-teal-800",
    highlight: false,
  },
  {
    title: "Explore Treatments",
    description: "Joint replacement, keyhole arthroscopy, spine & trauma care.",
    href: "/treatments",
    icon: Activity,
    color: "bg-white text-navy-950 hover:border-teal-500",
    iconBg: "bg-blue-50 text-navy-900",
    highlight: false,
  },
  {
    title: "24/7 Emergency Care",
    description: "Immediate triage & surgical fixation for acute fractures & trauma.",
    href: "/emergency",
    icon: AlertCircle,
    color: "bg-white text-emergency hover:border-red-400",
    iconBg: "bg-red-50 text-emergency",
    highlight: false,
  },
];

export function QuickActionGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5",
        className
      )}
    >
      {quickActions.map((action) => {
        const IconComponent = action.icon;
        return (
          <Link
            key={action.title}
            href={action.href}
            className={cn(
              "group relative p-5 sm:p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between shadow-card hover:shadow-hover hover:-translate-y-1",
              action.highlight
                ? "bg-navy-900 text-white border-navy-800 ring-1 ring-navy-700/50"
                : "bg-white border-surface-border text-navy-950"
            )}
          >
            <div>
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                  action.iconBg
                )}
              >
                <IconComponent className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg mb-1.5 flex items-center justify-between">
                <span>{action.title}</span>
                <ArrowRight
                  className={cn(
                    "w-4 h-4 transition-transform group-hover:translate-x-1",
                    action.highlight ? "text-teal-300" : "text-teal-800"
                  )}
                />
              </h3>
              <p
                className={cn(
                  "text-xs sm:text-sm leading-relaxed",
                  action.highlight ? "text-slate-300" : "text-surface-muted"
                )}
              >
                {action.description}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100/10 flex items-center text-xs font-semibold">
              <span
                className={action.highlight ? "text-teal-300" : "text-teal-800"}
              >
                Access Service →
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
