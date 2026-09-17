"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import { StaffRole } from "@/types/database";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"appointments" | "second-opinions" | "doctors">("appointments");
  const [staffEmail, setStaffEmail] = useState("staff@shashwathospital.com");
  const [userRole, setUserRole] = useState<StaffRole>("admin");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("shashwat_staff_user");
      if (stored) {
        const userObj = JSON.parse(stored);
        if (userObj.email) {
          setStaffEmail(userObj.email);
          if (userObj.email.includes("reception")) {
            setUserRole("receptionist");
          } else {
            setUserRole("admin");
          }
        }
      }
    } catch {}
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100 antialiased font-sans">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        staffEmail={staffEmail}
        userRole={userRole}
      />
      <AdminDashboardClient
        initialTab={activeTab}
        userRole={userRole}
        key={`${activeTab}-${userRole}`}
      />
    </div>
  );
}
