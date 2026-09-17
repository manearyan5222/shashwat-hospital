"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AppointmentRecord, SecondOpinionRecord, RequestStatus, DashboardStats } from "@/types/database";
import { departmentsData } from "@/data/departments";
import { doctorsData } from "@/data/doctors";
import { RequestDetailSlideOver } from "./RequestDetailSlideOver";
import {
  Calendar,
  FileText,
  Search,
  Filter,
  RefreshCw,
  Download,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  User,
  Building,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminDashboardClientProps {
  initialTab?: "appointments" | "second-opinions";
}

export function AdminDashboardClient({ initialTab = "appointments" }: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"appointments" | "second-opinions">(initialTab);
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [secondOpinions, setSecondOpinions] = useState<SecondOpinionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");

  // Selected request for Slide-Over
  const [selectedRequest, setSelectedRequest] = useState<
    ((AppointmentRecord & { type: "appointment" }) | (SecondOpinionRecord & { type: "second-opinion" })) | null
  >(null);

  const fetchData = async () => {
    try {
      const [aptRes, soRes] = await Promise.all([
        fetch("/api/admin/appointments"),
        fetch("/api/admin/second-opinions"),
      ]);

      if (aptRes.ok) {
        const aptJson = await aptRes.json();
        setAppointments(aptJson.data || []);
      }
      if (soRes.ok) {
        const soJson = await soRes.json();
        setSecondOpinions(soJson.data || []);
      }
    } catch (err) {
      console.error("Failed to load dashboard requests:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  // Metrics calculation
  const stats: DashboardStats = useMemo(() => {
    const totalAppointments = appointments.length;
    const totalSecondOpinions = secondOpinions.length;
    const newAppointments = appointments.filter((a) => a.status === "new").length;
    const newSecondOpinions = secondOpinions.filter((so) => so.status === "new").length;
    const contactedCount =
      appointments.filter((a) => a.status === "contacted").length +
      secondOpinions.filter((so) => so.status === "contacted").length;
    const confirmedCount =
      appointments.filter((a) => a.status === "confirmed").length +
      secondOpinions.filter((so) => so.status === "confirmed").length;
    const closedCount =
      appointments.filter((a) => a.status === "closed").length +
      secondOpinions.filter((so) => so.status === "closed").length;

    return {
      totalAppointments,
      totalSecondOpinions,
      newAppointments,
      newSecondOpinions,
      contactedCount,
      confirmedCount,
      closedCount,
    };
  }, [appointments, secondOpinions]);

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => {
      const matchesStatus = statusFilter === "all" || a.status === statusFilter;
      const matchesDept = departmentFilter === "all" || a.department_id === departmentFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        a.patient_name.toLowerCase().includes(query) ||
        a.patient_phone.includes(query) ||
        (a.patient_email && a.patient_email.toLowerCase().includes(query)) ||
        (a.symptoms_description && a.symptoms_description.toLowerCase().includes(query));

      return matchesStatus && matchesDept && matchesSearch;
    });
  }, [appointments, statusFilter, departmentFilter, searchQuery]);

  // Filtered Second Opinions
  const filteredSecondOpinions = useMemo(() => {
    return secondOpinions.filter((so) => {
      const matchesStatus = statusFilter === "all" || so.status === statusFilter;
      const matchesDept = departmentFilter === "all" || so.condition_category.toLowerCase().includes(departmentFilter.toLowerCase());
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        so.patient_name.toLowerCase().includes(query) ||
        so.patient_phone.includes(query) ||
        (so.patient_email && so.patient_email.toLowerCase().includes(query)) ||
        (so.prior_diagnosis && so.prior_diagnosis.toLowerCase().includes(query)) ||
        (so.reports_summary && so.reports_summary.toLowerCase().includes(query));

      return matchesStatus && matchesDept && matchesSearch;
    });
  }, [secondOpinions, statusFilter, departmentFilter, searchQuery]);

  // Handle updating status & staff notes from Slide-Over
  const handleUpdateStatus = async (
    id: string,
    type: "appointment" | "second-opinion",
    newStatus: RequestStatus,
    notes?: string
  ) => {
    const endpoint = type === "appointment" ? "/api/admin/appointments" : "/api/admin/second-opinions";
    const res = await fetch(endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus, staff_notes: notes }),
    });

    if (res.ok) {
      if (type === "appointment") {
        setAppointments((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus, staff_notes: notes } : item))
        );
      } else {
        setSecondOpinions((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus, staff_notes: notes } : item))
        );
      }
      if (selectedRequest && selectedRequest.id === id) {
        setSelectedRequest((prev) => (prev ? { ...prev, status: newStatus, staff_notes: notes } : null));
      }
    }
  };

  // Relative time helper
  const getRelativeTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
  };

  // CSV Export
  const handleExportCSV = () => {
    const isAppt = activeTab === "appointments";
    const items = isAppt ? filteredAppointments : filteredSecondOpinions;
    if (items.length === 0) return;

    const headers = isAppt
      ? ["ID", "Patient Name", "Phone", "Email", "Department", "Doctor ID", "Preferred Date", "Preferred Time", "Status", "Staff Notes", "Created At"]
      : ["ID", "Patient Name", "Phone", "Email", "Condition Category", "Prior Diagnosis", "Reports Summary", "Status", "Staff Notes", "Created At"];

    const rows = items.map((item: any) =>
      isAppt
        ? [
            item.id,
            `"${item.patient_name.replace(/"/g, '""')}"`,
            item.patient_phone,
            item.patient_email || "",
            item.department_id,
            item.doctor_id || "",
            item.preferred_date,
            item.preferred_time,
            item.status,
            `"${(item.staff_notes || "").replace(/"/g, '""')}"`,
            item.created_at,
          ]
        : [
            item.id,
            `"${item.patient_name.replace(/"/g, '""')}"`,
            item.patient_phone,
            item.patient_email || "",
            `"${item.condition_category.replace(/"/g, '""')}"`,
            `"${(item.prior_diagnosis || "").replace(/"/g, '""')}"`,
            `"${(item.reports_summary || "").replace(/"/g, '""')}"`,
            item.status,
            `"${(item.staff_notes || "").replace(/"/g, '""')}"`,
            item.created_at,
          ]
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `shashwat_${activeTab}_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentList = activeTab === "appointments" ? filteredAppointments : filteredSecondOpinions;

  return (
    <div className="flex-1 min-w-0 bg-slate-50/50 min-h-screen">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200 px-6 sm:px-8 py-4 sticky top-0 z-30 flex items-center justify-between shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-navy-950 tracking-tight">
            Patient Request Triage
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time outpatient consultation & second opinion management
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors"
          >
            <RefreshCw className={cn("w-3.5 h-3.5 text-slate-500", isRefreshing && "animate-spin")} />
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-teal-300" />
            <span>Export CSV</span>
          </button>
        </div>
      </header>

      <main className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                New Unreviewed
              </span>
              <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
                <AlertCircle className="w-4 h-4 animate-pulse" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950">
                {stats.newAppointments + stats.newSecondOpinions}
              </span>
              <span className="text-xs font-semibold text-blue-600">Needs Intake</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {stats.newAppointments} Appointments · {stats.newSecondOpinions} Second Opinions
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Contacted
              </span>
              <span className="p-2 rounded-xl bg-amber-50 text-amber-700">
                <Phone className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950">
                {stats.contactedCount}
              </span>
              <span className="text-xs font-semibold text-amber-600">In Progress</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Follow-ups & Scan Verifications
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Confirmed
              </span>
              <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950">
                {stats.confirmedCount}
              </span>
              <span className="text-xs font-semibold text-emerald-600">Scheduled</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              OPD Slots Finalized
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Submissions
              </span>
              <span className="p-2 rounded-xl bg-slate-100 text-slate-700">
                <Calendar className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950">
                {stats.totalAppointments + stats.totalSecondOpinions}
              </span>
              <span className="text-xs font-semibold text-slate-500">All Time</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {stats.closedCount} Closed / Archive
            </div>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab("appointments");
              setStatusFilter("all");
            }}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
              activeTab === "appointments"
                ? "bg-navy-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:text-navy-950 hover:bg-slate-100 border border-slate-200"
            )}
          >
            <Calendar className="w-4 h-4 text-teal-300" />
            <span>Appointments</span>
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-[11px] font-extrabold",
                activeTab === "appointments" ? "bg-teal-500 text-navy-950" : "bg-slate-100 text-slate-700"
              )}
            >
              {appointments.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("second-opinions");
              setStatusFilter("all");
            }}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
              activeTab === "second-opinions"
                ? "bg-navy-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:text-navy-950 hover:bg-slate-100 border border-slate-200"
            )}
          >
            <FileText className="w-4 h-4 text-teal-300" />
            <span>Second Opinions</span>
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-[11px] font-extrabold",
                activeTab === "second-opinions" ? "bg-teal-500 text-navy-950" : "bg-slate-100 text-slate-700"
              )}
            >
              {secondOpinions.length}
            </span>
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Box */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search patient name, phone number, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700 text-navy-950"
              />
            </div>

            {/* Department / Category Filter */}
            <div className="md:col-span-4">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white text-navy-950"
              >
                <option value="all">All Departments / Categories</option>
                {activeTab === "appointments" ? (
                  departmentsData.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Knee">Knee / Joint Replacement</option>
                    <option value="Hip">Hip Replacement / AVN</option>
                    <option value="Arthroscopy">Arthroscopy / Sports Injury</option>
                    <option value="Spine">Spine Surgery / Slipped Disc</option>
                    <option value="Fracture">Complex Fracture</option>
                  </>
                )}
              </select>
            </div>

            {/* Status Tabs in toolbar */}
            <div className="md:col-span-3 flex items-center gap-1 overflow-x-auto">
              {(["all", "new", "contacted", "confirmed", "closed"] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors",
                    statusFilter === st
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Request Table Component */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Patient Name</th>
                  <th className="py-3.5 px-4">Contact Phone</th>
                  <th className="py-3.5 px-4">
                    {activeTab === "appointments" ? "Requested Date & Time" : "Condition Category"}
                  </th>
                  <th className="py-3.5 px-4">
                    {activeTab === "appointments" ? "Department / Doctor" : "Prior Advised Surgery"}
                  </th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Submitted</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      Loading patient requests...
                    </td>
                  </tr>
                ) : currentList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400 space-y-2">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                        <Search className="w-5 h-5" />
                      </div>
                      <p className="font-semibold text-slate-600">No matching requests found.</p>
                      <p className="text-[11px] text-slate-400">Try clearing filters or search terms.</p>
                    </td>
                  </tr>
                ) : (
                  currentList.map((item: any) => {
                    const isAppt = activeTab === "appointments";
                    const dept = isAppt ? departmentsData.find((d) => d.id === item.department_id) : null;
                    const doc = isAppt && item.doctor_id ? doctorsData.find((d) => d.id === item.doctor_id) : null;

                    return (
                      <tr
                        key={item.id}
                        onClick={() =>
                          setSelectedRequest({
                            ...item,
                            type: isAppt ? "appointment" : "second-opinion",
                          })
                        }
                        className="hover:bg-teal-50/40 cursor-pointer transition-colors group"
                      >
                        {/* Patient Name */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-navy-950 group-hover:text-teal-900 transition-colors">
                            {item.patient_name}
                          </div>
                          {item.patient_email && (
                            <div className="text-[11px] text-slate-400 truncate max-w-[160px]">
                              {item.patient_email}
                            </div>
                          )}
                        </td>

                        {/* Phone */}
                        <td className="py-3.5 px-4 font-mono font-medium text-slate-800">
                          {item.patient_phone}
                        </td>

                        {/* Requested Date/Time or Category */}
                        <td className="py-3.5 px-4">
                          {isAppt ? (
                            <div>
                              <div className="font-semibold text-navy-900">{item.preferred_date}</div>
                              <div className="text-[11px] text-slate-500">{item.preferred_time}</div>
                            </div>
                          ) : (
                            <span className="font-semibold text-teal-900 bg-teal-50 px-2 py-0.5 rounded border border-teal-100 inline-block">
                              {item.condition_category}
                            </span>
                          )}
                        </td>

                        {/* Department / Specialist / Prior Diagnosis */}
                        <td className="py-3.5 px-4 max-w-[200px] truncate">
                          {isAppt ? (
                            <div>
                              <span className="font-medium text-slate-800 block truncate">
                                {dept?.title || item.department_id}
                              </span>
                              <span className="text-[11px] text-slate-400 block truncate">
                                {doc ? `${doc.salutation} ${doc.name}` : "Any Consultant"}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-600 block truncate">
                              {item.prior_diagnosis || item.reports_summary || "Clinical scan evaluation"}
                            </span>
                          )}
                        </td>

                        {/* Status Badge */}
                        <td className="py-3.5 px-4">
                          <span
                            className={cn(
                              "px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border inline-flex items-center gap-1",
                              item.status === "new" && "bg-blue-50 text-blue-700 border-blue-200",
                              item.status === "contacted" && "bg-amber-50 text-amber-700 border-amber-200",
                              item.status === "confirmed" && "bg-emerald-50 text-emerald-700 border-emerald-200",
                              item.status === "closed" && "bg-slate-100 text-slate-600 border-slate-200"
                            )}
                          >
                            <span
                              className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                item.status === "new" && "bg-blue-500 animate-pulse",
                                item.status === "contacted" && "bg-amber-500",
                                item.status === "confirmed" && "bg-emerald-500",
                                item.status === "closed" && "bg-slate-400"
                              )}
                            />
                            {item.status}
                          </span>
                        </td>

                        {/* Relative Time */}
                        <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                          {getRelativeTime(item.created_at)}
                        </td>

                        {/* Action Column */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRequest({
                                ...item,
                                type: isAppt ? "appointment" : "second-opinion",
                              });
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-navy-900 hover:text-white text-slate-700 text-xs font-semibold transition-all"
                          >
                            Review & Triage →
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>
              Showing {currentList.length} of {activeTab === "appointments" ? appointments.length : secondOpinions.length} {activeTab}
            </span>
            <span className="text-[11px] text-slate-400">
              Click any row to open full patient details & record staff notes
            </span>
          </div>
        </div>
      </main>

      {/* Detail Slide-Over Panel */}
      <RequestDetailSlideOver
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
