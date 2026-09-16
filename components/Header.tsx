"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  Calendar,
  AlertCircle,
  ChevronDown,
  Clock,
  MapPin,
  Shield,
} from "lucide-react";
import { hospitalData } from "@/data/hospital";
import { isVerified } from "@/lib/verify";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Orthopaedics",
    href: "/orthopaedics",
    dropdown: [
      { name: "Subspecialties Overview", href: "/orthopaedics" },
      { name: "Treatments & Surgeries", href: "/treatments" },
      { name: "Condition Library", href: "/conditions" },
      { name: "Rehabilitation Journey", href: "/rehabilitation" },
    ],
  },
  { name: "Treatments", href: "/treatments" },
  { name: "Conditions", href: "/conditions" },
  { name: "Doctors", href: "/doctors" },
  { name: "Facilities", href: "/facilities" },
  {
    name: "Patient Care",
    href: "/rehabilitation",
    dropdown: [
      { name: "Rehabilitation & Physiotherapy", href: "/rehabilitation" },
      { name: "Request Second Opinion", href: "/second-opinion" },
      { name: "Patient Experiences", href: "/patient-stories" },
      { name: "Health Education Library", href: "/health-library" },
    ],
  },
  { name: "Health Library", href: "/health-library" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const hasVerifiedPhone = isVerified(hospitalData.contact.primaryPhone);
  const hasVerifiedEmergency = isVerified(hospitalData.contact.emergencyHotline);
  const hasVerifiedOpdHours = isVerified(hospitalData.timings.opdHours);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top utility bar */}
      <div className="bg-[#0B2545] text-slate-200 text-xs py-1.5 border-b border-navy-800/80 hidden md:block">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>
                  {hospitalData.name} · {hospitalData.location.locality}, {hospitalData.location.city}
                </span>
              </div>
              {hasVerifiedOpdHours && (
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>{hospitalData.timings.opdHours}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-5">
              <Link
                href="/second-opinion"
                className="inline-flex items-center gap-1 text-slate-300 hover:text-teal-300 transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Second Opinion</span>
              </Link>
              {hasVerifiedPhone && (
                <a
                  href={`tel:${hospitalData.contact.primaryPhone}`}
                  className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>OPD: {hospitalData.contact.primaryPhone}</span>
                </a>
              )}
              {hasVerifiedEmergency && (
                <Link
                  href="/emergency"
                  className="inline-flex items-center gap-1 font-semibold text-red-400 hover:text-red-300 transition-colors pl-2 border-l border-navy-800"
                >
                  <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
                  <span>24/7 Trauma Emergency</span>
                </Link>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Main navigation header */}
      <div
        className={cn(
          "w-full transition-all duration-200 bg-white",
          isScrolled
            ? "shadow-md border-b border-surface-border py-2.5"
            : "border-b border-surface-border/70 py-3.5"
        )}
      >
        <Container>
          <div className="flex items-center justify-between gap-4">
            {/* Hospital Brand Logo */}
            <Link
              href="/"
              className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#0E7490] rounded-lg p-1"
              aria-label="Shashwat Hospital Homepage"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#0B2545] to-[#0E7490] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                <span className="font-heading tracking-tight">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg sm:text-xl text-[#0B2545] tracking-tight leading-none group-hover:text-[#0E7490] transition-colors">
                  SHASHWAT
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#0E7490] uppercase leading-tight mt-0.5">
                  Hospital • Nerul
                </span>
                <span className="text-[9px] text-surface-muted hidden sm:block">
                  Orthopaedic & Surgical Care
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-2"
              aria-label="Main Navigation"
            >
              {navigationLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                const hasDropdown = !!link.dropdown;

                if (hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative group"
                      onMouseEnter={() => setActiveDropdown(link.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className={cn(
                          "inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          isActive
                            ? "text-[#0E7490] bg-teal-50/70 font-semibold"
                            : "text-slate-700 hover:text-[#0B2545] hover:bg-slate-50"
                        )}
                        aria-expanded={activeDropdown === link.name}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                      </button>

                      {/* Dropdown Menu */}
                      <div className="absolute top-full left-0 w-64 pt-2 hidden group-hover:block transition-all animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="bg-white rounded-xl shadow-xl border border-surface-border p-2 space-y-1">
                          {link.dropdown?.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#0E7490] hover:bg-teal-50 rounded-lg transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "text-[#0E7490] bg-teal-50/70 font-semibold"
                        : "text-slate-700 hover:text-[#0B2545] hover:bg-slate-50"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              <Link
                href="/emergency"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-[#DC2626] hover:bg-red-50 border border-red-200 transition-colors"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Emergency</span>
              </Link>
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0B2545] hover:bg-navy-800 text-white font-semibold text-sm shadow-sm active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:ring-offset-2"
              >
                <Calendar className="w-4 h-4 text-teal-300" />
                <span>Book Appointment</span>
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/appointment"
                className="sm:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0B2545] text-white font-semibold text-xs shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5 text-teal-300" />
                <span>Book</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0E7490]"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-surface-border shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4 duration-200">
          <div className="p-4 space-y-3">
            {/* Quick emergency access on mobile menu if verified */}
            {hasVerifiedEmergency && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#DC2626] uppercase tracking-wider">24/7 Trauma Emergency</div>
                  <div className="text-xs text-red-900 font-medium">{hospitalData.contact.emergencyHotline}</div>
                </div>
                <a
                  href={`tel:${hospitalData.contact.emergencyHotline}`}
                  className="px-3 py-1.5 bg-[#DC2626] text-white font-bold text-xs rounded-lg flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  Call Now
                </a>
              </div>
            )}

            <nav className="space-y-1">
              {navigationLinks.map((link) => (
                <div key={link.name} className="border-b border-slate-100 last:border-0 pb-1">
                  {link.dropdown ? (
                    <div>
                      <div className="px-3 py-2 text-sm font-bold text-[#0B2545]">{link.name}</div>
                      <div className="pl-4 space-y-1">
                        {link.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-3 py-1.5 text-xs text-slate-600 hover:text-[#0E7490] hover:bg-teal-50 rounded-lg"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-3 py-2 rounded-lg text-sm font-medium",
                        pathname === link.href ? "bg-teal-50 text-[#0E7490] font-semibold" : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-200 space-y-2">
              <Link
                href="/appointment"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0B2545] text-white font-semibold text-sm shadow-md"
              >
                <Calendar className="w-4 h-4 text-teal-300" />
                Book an Appointment
              </Link>
              <Link
                href="/second-opinion"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-teal-50 text-teal-900 font-medium text-xs border border-teal-200"
              >
                <Shield className="w-3.5 h-3.5 text-teal-700" />
                Request Specialist Second Opinion
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
