"use client";

import React, { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { Locale } from "@/lib/i18n/translations";

export function LanguageSwitcher() {
  const [currentLocale, setCurrentLocale] = useState<Locale>("en");

  useEffect(() => {
    try {
      const savedLocale = (localStorage.getItem("shashwat_locale") as Locale) || "en";
      setCurrentLocale(savedLocale);
    } catch {}
  }, []);

  const handleChangeLocale = (locale: Locale) => {
    setCurrentLocale(locale);
    try {
      localStorage.setItem("shashwat_locale", locale);
      window.dispatchEvent(new CustomEvent("shashwat_locale_change", { detail: locale }));
    } catch {}
  };

  return (
    <div className="flex items-center gap-1.5 text-xs font-semibold">
      <Globe className="w-3.5 h-3.5 text-teal-600 shrink-0" />
      <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
        <button
          type="button"
          onClick={() => handleChangeLocale("en")}
          className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
            currentLocale === "en"
              ? "bg-white text-navy-950 shadow-xs"
              : "text-slate-600 hover:text-navy-950"
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => handleChangeLocale("hi")}
          className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
            currentLocale === "hi"
              ? "bg-white text-navy-950 shadow-xs"
              : "text-slate-600 hover:text-navy-950"
          }`}
          aria-label="Switch to Hindi"
        >
          हिं
        </button>
        <button
          type="button"
          onClick={() => handleChangeLocale("mr")}
          className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
            currentLocale === "mr"
              ? "bg-white text-navy-950 shadow-xs"
              : "text-slate-600 hover:text-navy-950"
          }`}
          aria-label="Switch to Marathi"
        >
          मरा
        </button>
      </div>
    </div>
  );
}
