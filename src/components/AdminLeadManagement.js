"use client";

import { useState, useEffect, useMemo } from "react";

export default function AdminLeadManagement({ theme = "dark" }) {
  const isDark = theme === "dark";

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("ALL");
  const [selectedSource, setSelectedSource] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("newest");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Detail Modal & Consent Toggle
  const [selectedLead, setSelectedLead] = useState(null);
  const [showConsentText, setShowConsentText] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  // Fetch leads from API
  const fetchLeads = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (res.ok && data.leads) {
        setLeads(data.leads);
      } else {
        setError(data.message || "Failed to load leads");
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
      setError("Network error fetching lead records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Filter & Sort Leads
  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => {
        const q = searchTerm.toLowerCase().trim();
        const matchesSearch =
          !q ||
          (lead.fullName && lead.fullName.toLowerCase().includes(q)) ||
          (lead.mobileNumber && lead.mobileNumber.toLowerCase().includes(q)) ||
          (lead.email && lead.email.toLowerCase().includes(q)) ||
          (lead.location && lead.location.toLowerCase().includes(q));

        const matchesService =
          selectedService === "ALL" || lead.serviceType === selectedService;

        const matchesSource =
          selectedSource === "ALL" || lead.source === selectedSource;

        return matchesSearch && matchesService && matchesSource;
      })
      .sort((a, b) => {
        const timeA = new Date(a.createdAt || a.consentTimestamp || 0).getTime();
        const timeB = new Date(b.createdAt || b.consentTimestamp || 0).getTime();
        return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
      });
  }, [leads, searchTerm, selectedService, selectedSource, sortOrder]);

  // Paginated Data
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage) || 1;
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLeads.slice(start, start + itemsPerPage);
  }, [filteredLeads, currentPage, itemsPerPage]);

  // Stats
  const stats = useMemo(() => {
    const total = leads.length;
    const withEmail = leads.filter((l) => l.email && l.email.includes("@")).length;
    const today = leads.filter((l) => {
      const d = new Date(l.createdAt || l.consentTimestamp);
      const now = new Date();
      return d.toDateString() === now.toDateString();
    }).length;
    return { total, withEmail, today };
  }, [leads]);

  // Copy helper
  const copyToClipboard = (text, label) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label}`);
  };

  // Export CSV
  const exportToCSV = () => {
    if (filteredLeads.length === 0) {
      alert("No leads available to export.");
      return;
    }

    const headers = [
      "Lead ID",
      "Full Name",
      "WhatsApp Number",
      "Email Address",
      "Area / Location",
      "Service Required",
      "Source",
      "Consent Status",
      "Consent Date & Time",
      "Submission Date"
    ];

    const rows = filteredLeads.map((l) => [
      `"${l.id || ""}"`,
      `"${l.fullName || ""}"`,
      `"${l.mobileNumber || ""}"`,
      `"${l.email || ""}"`,
      `"${l.location || ""}"`,
      `"${l.serviceType || ""}"`,
      `"${l.source || ""}"`,
      `"${l.consent ? "Accepted" : "Not Accepted"}"`,
      `"${l.consentTimestamp ? new Date(l.consentTimestamp).toLocaleString() : ""}"`,
      `"${l.createdAt ? new Date(l.createdAt).toLocaleString() : ""}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `SuperCool_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exported to CSV successfully!");
  };

  return (
    <div className="space-y-6">

      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 font-bold px-4.5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-fade-up text-xs sm:text-sm ${
            isDark
              ? "bg-neutral-900 border border-neutral-700 text-white"
              : "bg-slate-900 border border-slate-700 text-white shadow-slate-900/20"
          }`}
        >
          <i className="fa-solid fa-circle-check text-emerald-400 text-base" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl sm:text-3xl font-black tracking-tight font-plus-jakarta ${isDark ? "text-white" : "text-slate-900"}`}>
            Leads Dashboard
          </h2>
          <p className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
            Manage real-time customer bookings, WhatsApp contacts, and consent records
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className={`h-10 px-4 border rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              isDark
                ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white"
                : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700 shadow-xs"
            }`}
          >
            <i className={`fa-solid fa-rotate-right text-xs ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={exportToCSV}
            className="h-10 px-4.5 bg-accent hover:bg-accent-hover text-white font-black rounded-xl shadow-md text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <i className="fa-solid fa-file-excel text-sm" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* EXACT REFERENCE CARD GRID - 2 CARDS PER ROW ON MOBILE VIEW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4.5">
        
        {/* Card 1: Total Leads (Blue) */}
        <div className={`relative overflow-hidden rounded-[20px] p-3.5 sm:p-5 border transition-all duration-300 ${
          isDark
            ? "bg-neutral-950 border-neutral-800/80 hover:border-neutral-700 shadow-xl"
            : "bg-white border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]"
        }`}>
          {/* Fading Dotted Pattern on Right Side */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 pointer-events-none overflow-hidden rounded-r-[20px]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(${isDark ? "rgba(59, 130, 246, 0.4)" : "rgba(37, 99, 235, 0.35)"} 1.5px, transparent 1.5px)`,
                backgroundSize: "9px 9px",
                maskImage: "radial-gradient(circle at 85% 60%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)",
                WebkitMaskImage: "radial-gradient(circle at 85% 60%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)"
              }}
            />
          </div>

          {/* Top Row: Title & Top-Right White Icon Box */}
          <div className="relative z-10 flex items-start justify-between gap-1">
            <span className={`text-xs sm:text-[13px] font-bold tracking-tight leading-snug ${isDark ? "text-neutral-400" : "text-[#475569]"}`}>
              Total Leads
            </span>

            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-base shadow-xs border flex-shrink-0 ${
              isDark
                ? "bg-neutral-900 border-neutral-800 text-blue-400"
                : "bg-white border-blue-100 text-[#2563eb]"
            }`}>
              <i className="fa-solid fa-users" />
            </div>
          </div>

          {/* Bottom Row: Large Number */}
          <div className="relative z-10 mt-3 sm:mt-5">
            <span className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-[#0f172a]"}`}>
              {stats.total}
            </span>
          </div>
        </div>

        {/* Card 2: WhatsApp Leads (Navy/Blue) */}
        <div className={`relative overflow-hidden rounded-[20px] p-3.5 sm:p-5 border transition-all duration-300 ${
          isDark
            ? "bg-neutral-950 border-neutral-800/80 hover:border-neutral-700 shadow-xl"
            : "bg-white border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]"
        }`}>
          {/* Fading Dotted Pattern on Right Side */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 pointer-events-none overflow-hidden rounded-r-[20px]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(${isDark ? "rgba(59, 130, 246, 0.4)" : "rgba(30, 58, 138, 0.35)"} 1.5px, transparent 1.5px)`,
                backgroundSize: "9px 9px",
                maskImage: "radial-gradient(circle at 85% 60%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)",
                WebkitMaskImage: "radial-gradient(circle at 85% 60%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)"
              }}
            />
          </div>

          <div className="relative z-10 flex items-start justify-between gap-1">
            <span className={`text-xs sm:text-[13px] font-bold tracking-tight leading-snug ${isDark ? "text-neutral-400" : "text-[#475569]"}`}>
              WhatsApp Leads
            </span>

            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-base shadow-xs border flex-shrink-0 ${
              isDark
                ? "bg-neutral-900 border-neutral-800 text-blue-400"
                : "bg-white border-slate-200 text-[#1e3a8a]"
            }`}>
              <i className="fa-brands fa-whatsapp" />
            </div>
          </div>

          <div className="relative z-10 mt-3 sm:mt-5">
            <span className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-[#0f172a]"}`}>
              {stats.total}
            </span>
          </div>
        </div>

        {/* Card 3: Email Collected (Orange Pattern) */}
        <div className={`relative overflow-hidden rounded-[20px] p-3.5 sm:p-5 border transition-all duration-300 ${
          isDark
            ? "bg-neutral-950 border-neutral-800/80 hover:border-neutral-700 shadow-xl"
            : "bg-white border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]"
        }`}>
          {/* Fading Orange Dotted Pattern on Right Side */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 pointer-events-none overflow-hidden rounded-r-[20px]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(${isDark ? "rgba(249, 115, 22, 0.45)" : "rgba(234, 88, 12, 0.35)"} 1.5px, transparent 1.5px)`,
                backgroundSize: "9px 9px",
                maskImage: "radial-gradient(circle at 85% 60%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)",
                WebkitMaskImage: "radial-gradient(circle at 85% 60%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)"
              }}
            />
          </div>

          <div className="relative z-10 flex items-start justify-between gap-1">
            <span className={`text-xs sm:text-[13px] font-bold tracking-tight leading-snug ${isDark ? "text-neutral-400" : "text-[#475569]"}`}>
              Email Collected
            </span>

            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-base shadow-xs border flex-shrink-0 ${
              isDark
                ? "bg-neutral-900 border-neutral-800 text-orange-400"
                : "bg-white border-orange-100 text-[#ea580c]"
            }`}>
              <i className="fa-solid fa-layer-group" />
            </div>
          </div>

          <div className="relative z-10 mt-3 sm:mt-5">
            <span className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-[#0f172a]"}`}>
              {stats.withEmail}
            </span>
          </div>
        </div>

        {/* Card 4: Today's Bookings (Green Pattern) */}
        <div className={`relative overflow-hidden rounded-[20px] p-3.5 sm:p-5 border transition-all duration-300 ${
          isDark
            ? "bg-neutral-950 border-neutral-800/80 hover:border-neutral-700 shadow-xl"
            : "bg-white border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]"
        }`}>
          {/* Fading Green Dotted Pattern on Right Side */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 pointer-events-none overflow-hidden rounded-r-[20px]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(${isDark ? "rgba(16, 185, 129, 0.45)" : "rgba(22, 163, 74, 0.35)"} 1.5px, transparent 1.5px)`,
                backgroundSize: "9px 9px",
                maskImage: "radial-gradient(circle at 85% 60%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)",
                WebkitMaskImage: "radial-gradient(circle at 85% 60%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)"
              }}
            />
          </div>

          <div className="relative z-10 flex items-start justify-between gap-1">
            <span className={`text-xs sm:text-[13px] font-bold tracking-tight leading-snug ${isDark ? "text-neutral-400" : "text-[#475569]"}`}>
              Today's Bookings
            </span>

            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-base shadow-xs border flex-shrink-0 ${
              isDark
                ? "bg-neutral-900 border-neutral-800 text-emerald-400"
                : "bg-white border-emerald-100 text-[#16a34a]"
            }`}>
              <i className="fa-solid fa-shield-halved" />
            </div>
          </div>

          <div className="relative z-10 mt-3 sm:mt-5">
            <span className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-[#0f172a]"}`}>
              {stats.today}
            </span>
          </div>
        </div>

      </div>

      {/* Search & Filter Controls Bar */}
      <div className={`border rounded-2xl p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between transition-all ${
        isDark
          ? "bg-neutral-950 border-neutral-800/80"
          : "bg-white border-slate-200/90 shadow-md shadow-slate-200/40"
      }`}>
        <div className="relative flex-1">
          <i className={`fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-sm ${isDark ? "text-neutral-500" : "text-slate-400"}`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search leads by name, WhatsApp, email, or area..."
            className={`w-full h-10 sm:h-11 pl-9.5 pr-4 border rounded-xl text-sm font-semibold outline-none transition-all ${
              isDark
                ? "bg-black border-neutral-800 text-white placeholder-neutral-600 focus:border-neutral-700"
                : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-slate-300"
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedService}
            onChange={(e) => {
              setSelectedService(e.target.value);
              setCurrentPage(1);
            }}
            className={`h-10 sm:h-11 px-3.5 border rounded-xl text-xs sm:text-sm font-bold outline-none cursor-pointer ${
              isDark ? "bg-black border-neutral-800 text-neutral-300" : "bg-slate-50 border-slate-200 text-slate-800"
            }`}
          >
            <option value="ALL">All Services</option>
            <option value="Installation">Installation</option>
            <option value="Repair">Repair</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Piping">Piping</option>
            <option value="Customer Registration">Registration</option>
          </select>

          <select
            value={selectedSource}
            onChange={(e) => {
              setSelectedSource(e.target.value);
              setCurrentPage(1);
            }}
            className={`h-10 sm:h-11 px-3.5 border rounded-xl text-xs sm:text-sm font-bold outline-none cursor-pointer ${
              isDark ? "bg-black border-neutral-800 text-neutral-300" : "bg-slate-50 border-slate-200 text-slate-800"
            }`}
          >
            <option value="ALL">All Sources</option>
            <option value="Hero Lead Capture Form">Hero Form</option>
            <option value="Existing Customer Form">Customer Form</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={`h-10 sm:h-11 px-3.5 border rounded-xl text-xs sm:text-sm font-bold outline-none cursor-pointer ${
              isDark ? "bg-black border-neutral-800 text-neutral-300" : "bg-slate-50 border-slate-200 text-slate-800"
            }`}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Clean CRM Table */}
      <div className={`border rounded-2xl overflow-hidden transition-all ${
        isDark
          ? "bg-neutral-950 border-neutral-800/80 shadow-lg"
          : "bg-white border-slate-200/90 shadow-md shadow-slate-200/40"
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-xs font-black uppercase tracking-wider ${
                isDark
                  ? "bg-neutral-900/70 border-neutral-800 text-neutral-400"
                  : "bg-slate-100/90 border-slate-200 text-slate-600"
              }`}>
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">WhatsApp</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Area / Location</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Consent</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className={`divide-y text-xs sm:text-sm ${isDark ? "divide-neutral-800/60" : "divide-slate-100"}`}>
              {loading ? (
                <tr>
                  <td colSpan="8" className={`py-12 text-center font-bold ${isDark ? "text-neutral-500" : "text-slate-400"}`}>
                    <i className="fa-solid fa-circle-notch animate-spin text-lg mb-2 block text-accent" />
                    Loading lead records...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-red-500 font-bold">
                    {error}
                  </td>
                </tr>
              ) : paginatedLeads.length === 0 ? (
                <tr>
                  <td colSpan="8" className={`py-12 text-center font-semibold ${isDark ? "text-neutral-500" : "text-slate-400"}`}>
                    No lead records match your search query.
                  </td>
                </tr>
              ) : (
                paginatedLeads.map((lead) => (
                  <tr key={lead.id} className={`transition-colors ${isDark ? "hover:bg-neutral-900/50" : "hover:bg-slate-50/80"}`}>
                    
                    {/* Name */}
                    <td className={`py-3.5 px-4 font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {lead.fullName}
                    </td>

                    {/* WhatsApp */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-emerald-500 font-bold">{lead.mobileNumber}</span>
                        <button
                          onClick={() => copyToClipboard(lead.mobileNumber, "Number")}
                          title="Copy Number"
                          className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                            isDark ? "bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900"
                          }`}
                        >
                          <i className="fa-solid fa-copy text-[10px]" />
                        </button>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4">
                      {lead.email ? (
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold truncate max-w-[170px] ${isDark ? "text-sky-300" : "text-sky-600"}`}>{lead.email}</span>
                          <button
                            onClick={() => copyToClipboard(lead.email, "Email")}
                            title="Copy Email"
                            className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                              isDark ? "bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900"
                            }`}
                          >
                            <i className="fa-solid fa-copy text-[10px]" />
                          </button>
                        </div>
                      ) : (
                        <span className={isDark ? "text-neutral-600" : "text-slate-400"}>—</span>
                      )}
                    </td>

                    {/* Area */}
                    <td className={`py-3.5 px-4 font-semibold ${isDark ? "text-neutral-300" : "text-slate-700"}`}>
                      {lead.location}
                    </td>

                    {/* Service */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-accent/15 text-accent border border-accent/20 text-xs font-black">
                        {lead.serviceType}
                      </span>
                    </td>

                    {/* Consent */}
                    <td className="py-3.5 px-4">
                      {lead.consent ? (
                        <span className="inline-flex items-center gap-1 text-emerald-500 text-xs font-extrabold">
                          <i className="fa-solid fa-check text-[11px]" />
                          Accepted
                        </span>
                      ) : (
                        <span className="text-red-500 text-xs font-extrabold">
                          Not Accepted
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className={`py-3.5 px-4 text-xs font-medium ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                      {lead.createdAt || lead.consentTimestamp
                        ? new Date(lead.createdAt || lead.consentTimestamp).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })
                        : "—"}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedLead(lead);
                          setShowConsentText(false);
                        }}
                        className={`px-3 py-1.5 border rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isDark
                            ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-200 hover:text-white"
                            : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700"
                        }`}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Clean Pagination Footer */}
        <div className={`px-4 py-3.5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm ${
          isDark ? "bg-neutral-950 border-neutral-800/80 text-neutral-400" : "bg-slate-50 border-slate-200 text-slate-600"
        }`}>
          <div>
            Showing <span className={`font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>{filteredLeads.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span>–
            <span className={`font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>{Math.min(currentPage * itemsPerPage, filteredLeads.length)}</span> of{" "}
            <span className={`font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>{filteredLeads.length}</span> leads
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className={`w-8 h-8 rounded-lg border disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center cursor-pointer ${
                  isDark ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-white" : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700"
                }`}
              >
                <i className="fa-solid fa-chevron-left text-xs" />
              </button>
              <span className={`px-2.5 font-bold ${isDark ? "text-neutral-300" : "text-slate-700"}`}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className={`w-8 h-8 rounded-lg border disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center cursor-pointer ${
                  isDark ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-white" : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700"
                }`}
              >
                <i className="fa-solid fa-chevron-right text-xs" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MINIMAL LEAD DETAILS POPUP */}
      {selectedLead && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in ${
          isDark ? "bg-black/80 backdrop-blur-xs" : "bg-slate-900/40 backdrop-blur-xs"
        }`}>
          <div className={`border rounded-2xl p-6 max-w-md w-full shadow-2xl text-left space-y-4 ${
            isDark ? "bg-neutral-950 border-neutral-800 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            
            {/* Header */}
            <div className={`flex items-center justify-between pb-3 border-b ${isDark ? "border-neutral-800" : "border-slate-200"}`}>
              <div>
                <h3 className={`font-black text-lg ${isDark ? "text-white" : "text-slate-900"}`}>{selectedLead.fullName}</h3>
                <p className={`text-xs font-mono mt-0.5 ${isDark ? "text-neutral-500" : "text-slate-400"}`}>ID: {selectedLead.id?.slice(0, 14)}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                  isDark ? "bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800"
                }`}
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            {/* Customer Information */}
            <div className="space-y-2 text-xs sm:text-sm">
              <h4 className={`text-xs font-extrabold uppercase tracking-wider ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                Customer Information
              </h4>

              <div className={`rounded-xl p-3.5 border space-y-2.5 ${
                isDark ? "bg-black/70 border-neutral-900" : "bg-slate-50 border-slate-200/80"
              }`}>
                <div className="flex justify-between items-center">
                  <span className={isDark ? "text-neutral-400 font-semibold" : "text-slate-500 font-semibold"}>Name:</span>
                  <span className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{selectedLead.fullName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={isDark ? "text-neutral-400 font-semibold" : "text-slate-500 font-semibold"}>WhatsApp:</span>
                  <span className="font-mono font-bold text-emerald-500">{selectedLead.mobileNumber}</span>
                </div>
                {selectedLead.email && (
                  <div className="flex justify-between items-center">
                    <span className={isDark ? "text-neutral-400 font-semibold" : "text-slate-500 font-semibold"}>Email:</span>
                    <span className={`font-semibold ${isDark ? "text-sky-300" : "text-sky-600"}`}>{selectedLead.email}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className={isDark ? "text-neutral-400 font-semibold" : "text-slate-500 font-semibold"}>Area / Location:</span>
                  <span className={`font-semibold ${isDark ? "text-neutral-200" : "text-slate-800"}`}>{selectedLead.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={isDark ? "text-neutral-400 font-semibold" : "text-slate-500 font-semibold"}>Service Required:</span>
                  <span className="font-extrabold text-accent">{selectedLead.serviceType}</span>
                </div>
              </div>
            </div>

            {/* Consent Section */}
            <div className="space-y-2 text-xs sm:text-sm">
              <h4 className={`text-xs font-extrabold uppercase tracking-wider ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                Consent
              </h4>

              <div className={`rounded-xl p-3.5 border space-y-2 ${
                isDark ? "bg-black/70 border-neutral-900" : "bg-slate-50 border-slate-200/80"
              }`}>
                <div className="flex justify-between items-center">
                  <span className={isDark ? "text-neutral-400 font-semibold" : "text-slate-500 font-semibold"}>Status:</span>
                  <span className="font-extrabold text-emerald-500 flex items-center gap-1.5">
                    <i className="fa-solid fa-check text-xs" /> Customer consent received
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className={isDark ? "text-neutral-400 font-semibold" : "text-slate-500 font-semibold"}>Date & Time:</span>
                  <span className={`font-mono font-medium ${isDark ? "text-neutral-300" : "text-slate-700"}`}>
                    {selectedLead.consentTimestamp
                      ? new Date(selectedLead.consentTimestamp).toLocaleString()
                      : selectedLead.createdAt
                      ? new Date(selectedLead.createdAt).toLocaleString()
                      : "—"}
                  </span>
                </div>

                {/* Optional View Consent text toggle */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowConsentText(!showConsentText)}
                    className={`text-xs font-bold underline cursor-pointer ${
                      isDark ? "text-neutral-400 hover:text-white" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {showConsentText ? "Hide Consent Statement" : "View Consent Statement"}
                  </button>
                  {showConsentText && (
                    <p className={`mt-1.5 text-xs italic p-2.5 rounded-xl leading-relaxed ${
                      isDark ? "bg-neutral-900 text-neutral-300" : "bg-white text-slate-700 border border-slate-200"
                    }`}>
                      "{selectedLead.consentStatement || "I agree to receive WhatsApp service updates and offers."}"
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-1 flex flex-wrap gap-2.5">
              <a
                href={`https://wa.me/${(selectedLead.cleanMobile || selectedLead.mobileNumber).replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: "#25d366", color: "#ffffff" }}
                className="flex-1 h-11 px-4 bg-[#25d366] hover:bg-[#20bd5a] text-white font-extrabold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <i className="fa-brands fa-whatsapp text-base" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => copyToClipboard(selectedLead.mobileNumber, "Number")}
                className={`h-11 px-3.5 border font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer ${
                  isDark ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-200" : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700"
                }`}
              >
                <i className="fa-solid fa-copy text-xs" />
                <span>Copy Number</span>
              </button>

              {selectedLead.email && (
                <button
                  type="button"
                  onClick={() => copyToClipboard(selectedLead.email, "Email")}
                  className={`h-11 px-3.5 border font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer ${
                    isDark ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-200" : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700"
                  }`}
                >
                  <i className="fa-solid fa-envelope text-xs" />
                  <span>Copy Email</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className={`h-11 px-4 border font-bold rounded-xl text-xs sm:text-sm cursor-pointer ${
                  isDark ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-400 hover:text-white" : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600"
                }`}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
