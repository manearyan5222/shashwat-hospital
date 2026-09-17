"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  AppointmentRecord,
  SecondOpinionRecord,
  RequestStatus,
  DashboardStats,
  StaffRoleRecord,
  PatientRecord,
  StaffRole,
} from "@/types/database";
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
  Users,
  UserPlus,
  ShieldAlert,
  UserCheck,
  UserX,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminDashboardClientProps {
  initialTab?: "appointments" | "second-opinions" | "doctors";
  userRole?: StaffRole;
}

export function AdminDashboardClient({
  initialTab = "appointments",
  userRole = "admin",
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"appointments" | "second-opinions" | "doctors">(initialTab);
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [secondOpinions, setSecondOpinions] = useState<SecondOpinionRecord[]>([]);
  const [doctorsList, setDoctorsList] = useState<StaffRoleRecord[]>([]);
  const [patientsList, setPatientsList] = useState<PatientRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newArrivalToast, setNewArrivalToast] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [dateRangeFilter, setDateRangeFilter] = useState<"all" | "today" | "week" | "month">("all");

  // Selected request for Slide-Over
  const [selectedRequest, setSelectedRequest] = useState<
    ((AppointmentRecord & { type: "appointment" }) | (SecondOpinionRecord & { type: "second-opinion" })) | null
  >(null);

  // Doctor assignment modal state
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedDoctorForAssign, setSelectedDoctorForAssign] = useState<string>("");
  const [selectedPatientForAssign, setSelectedPatientForAssign] = useState<string>("");

  const fetchData = async (isAutoPoll = false) => {
    try {
      const [aptRes, soRes] = await Promise.all([
        fetch("/api/admin/appointments"),
        fetch("/api/admin/second-opinions"),
      ]);

      if (aptRes.ok) {
        const aptJson = await aptRes.json();
        const incomingApts = aptJson.data || [];
        if (isAutoPoll && incomingApts.length > appointments.length) {
          setNewArrivalToast(`🔔 New patient request received! (${incomingApts.length - appointments.length} new)`);
          setTimeout(() => setNewArrivalToast(null), 5000);
        }
        setAppointments(incomingApts);
      }

      if (soRes.ok) {
        const soJson = await soRes.json();
        setSecondOpinions(soJson.data || []);
      }

      if (userRole === "admin") {
        const docRes = await fetch("/api/admin/doctors");
        if (docRes.ok) {
          const docJson = await docRes.json();
          setDoctorsList(docJson.doctors || []);
          setPatientsList(docJson.patients || []);
        }
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

    // 30-Second Auto-Polling Loop
    const interval = setInterval(() => {
      fetchData(true);
    }, 30000);

    return () => clearInterval(interval);
  }, [userRole]);

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

  // Date filtering helper
  const isDateWithinRange = (dateStr: string) => {
    if (dateRangeFilter === "all") return true;
    const itemDate = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - itemDate.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (dateRangeFilter === "today") return diffHours <= 24;
    if (dateRangeFilter === "week") return diffHours <= 24 * 7;
    if (dateRangeFilter === "month") return diffHours <= 24 * 30;
    return true;
  };

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
      const matchesDept = departmentFilter === "all" || apt.department_id === departmentFilter;
      const matchesSearch =
        !searchQuery ||
        apt.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.patient_phone.includes(searchQuery) ||
        (apt.patient_email && apt.patient_email.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDate = isDateWithinRange(apt.created_at);

      return matchesStatus && matchesDept && matchesSearch && matchesDate;
    });
  }, [appointments, statusFilter, departmentFilter, searchQuery, dateRangeFilter]);

  // Filtered Second Opinions
  const filteredSecondOpinions = useMemo(() => {
    return secondOpinions.filter((so) => {
      const matchesStatus = statusFilter === "all" || so.status === statusFilter;
      const matchesSearch =
        !searchQuery ||
        so.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        so.patient_phone.includes(searchQuery) ||
        (so.patient_email && so.patient_email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        so.condition_category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDate = isDateWithinRange(so.created_at);

      return matchesStatus && matchesSearch && matchesDate;
    });
  }, [secondOpinions, statusFilter, searchQuery, dateRangeFilter]);

  // Status update callback from Slide-Over
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
          prev.map((a) => (a.id === id ? { ...a, status: newStatus, staff_notes: notes ?? a.staff_notes } : a))
        );
      } else {
        setSecondOpinions((prev) =>
          prev.map((so) => (so.id === id ? { ...so, status: newStatus, staff_notes: notes ?? so.staff_notes } : so))
        );
      }
    }
  };

  // CSV Export handler
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (activeTab === "appointments") {
      csvContent += "ID,Patient Name,Phone,Email,Department,Doctor,Requested Date,Time Slot,Status,Submitted At\n";
      filteredAppointments.forEach((a) => {
        csvContent += `"${a.id}","${a.patient_name}","${a.patient_phone}","${a.patient_email || ""}","${a.department_id}","${a.doctor_id || ""}","${a.preferred_date}","${a.preferred_time}","${a.status}","${a.created_at}"\n`;
      });
    } else {
      csvContent += "ID,Patient Name,Phone,Email,Condition Category,Prior Diagnosis,Status,Submitted At\n";
      filteredSecondOpinions.forEach((so) => {
        csvContent += `"${so.id}","${so.patient_name}","${so.patient_phone}","${so.patient_email || ""}","${so.condition_category}","${(so.prior_diagnosis || "").replace(/"/g, '""')}","${so.status}","${so.created_at}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `shashwat_${activeTab}_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAssignDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctorForAssign || !selectedPatientForAssign) return;

    try {
      const res = await fetch("/api/admin/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "assign",
          doctorId: selectedDoctorForAssign,
          patientId: selectedPatientForAssign,
        }),
      });

      if (res.ok) {
        setAssignModalOpen(false);
        fetchData();
      }
    } catch (err) {
      console.error("Assign error:", err);
    }
  };

  const getRelativeTime = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const mins = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);

    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="flex-1 min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Toast Alert for Auto-Polling */}
      {newArrivalToast && (
        <div className="fixed top-4 right-6 z-50 p-4 rounded-2xl bg-teal-600 text-white shadow-2xl font-bold text-sm flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <Bell className="w-5 h-5 text-teal-200 animate-bounce" />
          <span>{newArrivalToast}</span>
        </div>
      )}

      {/* Top Bar Header */}
      <header className="h-16 px-8 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-800/90 p-1 rounded-xl border border-slate-700/80">
            <button
              type="button"
              onClick={() => setActiveTab("appointments")}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                activeTab === "appointments"
                  ? "bg-teal-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              )}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Appointments</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-900 text-[10px] text-teal-300">
                {appointments.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("second-opinions")}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                activeTab === "second-opinions"
                  ? "bg-teal-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              )}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Second Opinions</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-900 text-[10px] text-teal-300">
                {secondOpinions.length}
              </span>
            </button>

            {userRole === "admin" && (
              <button
                type="button"
                onClick={() => setActiveTab("doctors")}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                  activeTab === "doctors"
                    ? "bg-teal-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                )}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Doctor Management</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
            title="Auto-polls every 30s. Click to refresh immediately"
          >
            <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin text-teal-400")} />
          </button>

          {activeTab !== "doctors" && (
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all"
            >
              <Download className="w-4 h-4 text-teal-400" />
              <span>Export CSV</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Metric Summary Cards */}
        {activeTab !== "doctors" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Requests</p>
                <p className="text-2xl font-extrabold text-white mt-1">
                  {activeTab === "appointments" ? stats.totalAppointments : stats.totalSecondOpinions}
                </p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                {activeTab === "appointments" ? <Calendar className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-400">New (Action Required)</p>
                <p className="text-2xl font-extrabold text-blue-300 mt-1">
                  {activeTab === "appointments" ? stats.newAppointments : stats.newSecondOpinions}
                </p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Under Contact</p>
                <p className="text-2xl font-extrabold text-amber-300 mt-1">{stats.contactedCount}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Confirmed / Scheduled</p>
                <p className="text-2xl font-extrabold text-emerald-300 mt-1">{stats.confirmedCount}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}

        {/* TAB 1 & 2: INTAKE REQUESTS (APPOINTMENTS & SECOND OPINIONS) */}
        {activeTab !== "doctors" && (
          <div className="space-y-4">
            {/* Filter & Search Toolbar */}
            <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex-1 min-w-[240px] relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by patient name, mobile number, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex items-center gap-3">
                {/* Status Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as RequestStatus | "all")}
                    className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">🔵 New</option>
                    <option value="contacted">🟡 Contacted</option>
                    <option value="confirmed">🟢 Confirmed</option>
                    <option value="closed">⚪ Closed</option>
                  </select>
                </div>

                {/* Date Range Filter */}
                <select
                  value={dateRangeFilter}
                  onChange={(e) => setDateRangeFilter(e.target.value as "all" | "today" | "week" | "month")}
                  className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today (Last 24h)</option>
                  <option value="week">Past 7 Days</option>
                  <option value="month">Past 30 Days</option>
                </select>
              </div>
            </div>

            {/* Table Container */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/90 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700">
                    <tr>
                      <th className="py-3.5 px-6">Patient Details</th>
                      <th className="py-3.5 px-6">
                        {activeTab === "appointments" ? "Requested Department & Doctor" : "Condition / Diagnosis"}
                      </th>
                      <th className="py-3.5 px-6">
                        {activeTab === "appointments" ? "Preferred Slot" : "Case Status"}
                      </th>
                      <th className="py-3.5 px-6">Status</th>
                      <th className="py-3.5 px-6">Submitted</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-700/60 font-sans">
                    {activeTab === "appointments" ? (
                      filteredAppointments.length > 0 ? (
                        filteredAppointments.map((apt) => {
                          const isNew = apt.status === "new";
                          return (
                            <tr
                              key={apt.id}
                              onClick={() => setSelectedRequest({ ...apt, type: "appointment" })}
                              className={cn(
                                "hover:bg-slate-750/70 transition-colors cursor-pointer group",
                                isNew ? "bg-slate-800/90 border-l-4 border-l-blue-500 font-semibold text-white" : ""
                              )}
                            >
                              <td className="py-4 px-6">
                                <div className="font-bold text-white group-hover:text-teal-300 transition-colors">
                                  {apt.patient_name}
                                </div>
                                <div className="text-[11px] text-slate-400 font-mono mt-0.5">{apt.patient_phone}</div>
                              </td>

                              <td className="py-4 px-6">
                                <div className="font-medium text-slate-200">{apt.department_id}</div>
                                <div className="text-[11px] text-slate-400">{apt.doctor_id || "Any Available"}</div>
                              </td>

                              <td className="py-4 px-6">
                                <div className="text-slate-200">{apt.preferred_date}</div>
                                <div className="text-[11px] text-slate-400">{apt.preferred_time}</div>
                              </td>

                              <td className="py-4 px-6">
                                <span
                                  className={cn(
                                    "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                    apt.status === "new" && "bg-blue-500/10 text-blue-400 border-blue-500/30",
                                    apt.status === "contacted" && "bg-amber-500/10 text-amber-400 border-amber-500/30",
                                    apt.status === "confirmed" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                                    apt.status === "closed" && "bg-slate-700 text-slate-400 border-slate-600"
                                  )}
                                >
                                  {apt.status}
                                </span>
                              </td>

                              <td className="py-4 px-6 text-slate-400">{getRelativeTime(apt.created_at)}</td>

                              <td className="py-4 px-6 text-right">
                                <span className="inline-flex items-center gap-1 text-teal-400 font-bold group-hover:translate-x-0.5 transition-transform">
                                  <span>Review</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-400">
                            No appointments found matching your filters.
                          </td>
                        </tr>
                      )
                    ) : filteredSecondOpinions.length > 0 ? (
                      filteredSecondOpinions.map((so) => {
                        const isNew = so.status === "new";
                        return (
                          <tr
                            key={so.id}
                            onClick={() => setSelectedRequest({ ...so, type: "second-opinion" })}
                            className={cn(
                              "hover:bg-slate-750/70 transition-colors cursor-pointer group",
                              isNew ? "bg-slate-800/90 border-l-4 border-l-blue-500 font-semibold text-white" : ""
                            )}
                          >
                            <td className="py-4 px-6">
                              <div className="font-bold text-white group-hover:text-teal-300 transition-colors">
                                {so.patient_name}
                              </div>
                              <div className="text-[11px] text-slate-400 font-mono mt-0.5">{so.patient_phone}</div>
                            </td>

                            <td className="py-4 px-6">
                              <div className="font-medium text-teal-300">{so.condition_category}</div>
                              <div className="text-[11px] text-slate-400 truncate max-w-xs">{so.prior_diagnosis || "No prior diagnosis"}</div>
                            </td>

                            <td className="py-4 px-6">
                              <div className="text-slate-300 truncate max-w-xs">{so.reports_summary || "Scans available"}</div>
                            </td>

                            <td className="py-4 px-6">
                              <span
                                className={cn(
                                  "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                  so.status === "new" && "bg-blue-500/10 text-blue-400 border-blue-500/30",
                                  so.status === "contacted" && "bg-amber-500/10 text-amber-400 border-amber-500/30",
                                  so.status === "confirmed" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                                  so.status === "closed" && "bg-slate-700 text-slate-400 border-slate-600"
                                )}
                              >
                                {so.status}
                              </span>
                            </td>

                            <td className="py-4 px-6 text-slate-400">{getRelativeTime(so.created_at)}</td>

                            <td className="py-4 px-6 text-right">
                              <span className="inline-flex items-center gap-1 text-teal-400 font-bold group-hover:translate-x-0.5 transition-transform">
                                <span>Review</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400">
                          No second-opinion requests found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DOCTOR MANAGEMENT & PATIENT ACCESS (ADMIN ONLY) */}
        {activeTab === "doctors" && userRole === "admin" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-heading font-bold text-white">Hospital Medical Staff & Patient Access</h2>
                <p className="text-xs text-slate-400">
                  Assign patient clinical records to treating doctors for mobile PWA access.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAssignModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-950/40 flex items-center gap-2 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>Assign Doctor to Patient</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {doctorsList.map((doc) => (
                <div
                  key={doc.user_id}
                  className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl space-y-4 shadow-xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-sm">
                        Dr
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{doc.full_name}</div>
                        <div className="text-[11px] text-slate-400">{doc.email}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                    <div className="text-slate-400 font-medium">Role: Treating Consultant</div>
                    <div className="text-teal-400 font-semibold flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Doctor PWA Active</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Slide-Over Panel for Details */}
      <RequestDetailSlideOver
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Doctor Assignment Modal */}
      {assignModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <h3 className="text-base font-bold text-white">Assign Patient to Consultant</h3>

            <form onSubmit={handleAssignDoctor} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
                  Select Treating Doctor
                </label>
                <select
                  required
                  value={selectedDoctorForAssign}
                  onChange={(e) => setSelectedDoctorForAssign(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Choose a Doctor...</option>
                  {doctorsList.map((d) => (
                    <option key={d.user_id} value={d.user_id}>
                      {d.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
                  Select Patient Record
                </label>
                <select
                  required
                  value={selectedPatientForAssign}
                  onChange={(e) => setSelectedPatientForAssign(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Choose a Patient...</option>
                  {patientsList.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.full_name} ({p.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setAssignModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
