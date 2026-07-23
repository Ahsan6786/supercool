"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { TEMPLATES } from "@/lib/templates";
import AdminLeadManagement from "@/components/AdminLeadManagement";

// Default placeholder resolver
const resolvePlaceholders = (text, lang) => {
  if (!text) return "";
  const isAr = lang === "ar";
  return text
    .replace(/{{customer_name}}/g, "")
    .replace(/{{service_type}}/g, isAr ? "غسيل مكيف سبليت" : "Split AC Deep Cleaning")
    .replace(/{{booking_date}}/g, isAr ? "٢٠ يوليو ٢٠٢٦" : "July 20, 2026")
    .replace(/{{phone}}/g, "056 670 6358")
    .replace(/{{location}}/g, isAr ? "الهفوف، المدينة الصناعية" : "Al Hofuf, Hofuf Industrial");
};

export default function AdminPortal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Theme state: "dark" or "light"
  const [theme, setTheme] = useState("dark");
  const isDark = theme === "dark";

  // Navigation Tab: "leads" or "campaigns"
  const [adminTab, setAdminTab] = useState("leads");

  const [language, setLanguage] = useState("en");
  const [selectedTemplateId, setSelectedTemplateId] = useState("announcement");
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [toInput, setToInput] = useState("");

  const [lastSaved, setLastSaved] = useState("");
  const [draftRestoredToast, setDraftRestoredToast] = useState(false);

  const [previewTab, setPreviewTab] = useState("desktop");
  const [showFullPreview, setShowFullPreview] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);
  const [serverError, setServerError] = useState("");

  const fileInputRef = useRef(null);

  // Load theme preference on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("supercool_admin_theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      }
    } catch (e) {}
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      localStorage.setItem("supercool_admin_theme", nextTheme);
    } catch (e) {}
  };

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("supercool_draft_campaign");
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setLanguage(draft.language || "en");
        setSelectedTemplateId(draft.templateId || "announcement");
        setSubject(draft.subject || "");
        setHtml(draft.html || "");
        setToInput(draft.toInput || "");
        setDraftRestoredToast(true);
        setTimeout(() => setDraftRestoredToast(false), 4000);
      } catch (e) {
        console.error("Failed to restore draft", e);
      }
    } else {
      const defaultTpl = TEMPLATES.find((t) => t.id === "announcement");
      if (defaultTpl) {
        setSubject(defaultTpl.subjectEn);
        setHtml(defaultTpl.htmlEn);
      }
    }
  }, []);

  // Sync templates on language change
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    const activeTpl = TEMPLATES.find((t) => t.id === selectedTemplateId);
    if (activeTpl) {
      setSubject(lang === "ar" ? activeTpl.subjectAr : activeTpl.subjectEn);
      setHtml(lang === "ar" ? activeTpl.htmlAr : activeTpl.htmlEn);
    }
  };

  const handleSelectTemplate = (tplId) => {
    setSelectedTemplateId(tplId);
    const activeTpl = TEMPLATES.find((t) => t.id === tplId);
    if (activeTpl) {
      setSubject(language === "ar" ? activeTpl.subjectAr : activeTpl.subjectEn);
      setHtml(language === "ar" ? activeTpl.htmlAr : activeTpl.htmlEn);
    }
  };

  // Auto-saver
  useEffect(() => {
    if (!isLoggedIn) return;
    const delayDebounceFn = setTimeout(() => {
      const draftObj = { language, templateId: selectedTemplateId, subject, html, toInput };
      localStorage.setItem("supercool_draft_campaign", JSON.stringify(draftObj));
      const now = new Date();
      setLastSaved(now.toLocaleTimeString());
    }, 1500);
    return () => clearTimeout(delayDebounceFn);
  }, [language, selectedTemplateId, subject, html, toInput, isLoggedIn]);

  // Authenticate user
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "ahsanimamkhan06@gmail.com" && password === "123") {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials. Please try again.");
    }
  };

  const parsedRecipientsCount = useMemo(() => {
    return toInput
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0 && item.includes("@")).length;
  }, [toInput]);

  const handleSendCampaign = async (e) => {
    e?.preventDefault();
    setServerError("");
    setSendStatus(null);

    const toArray = toInput
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0 && item.includes("@"));

    if (toArray.length === 0) {
      setServerError("Please enter at least one valid recipient email address.");
      return;
    }
    if (!subject.trim()) {
      setServerError("Please enter a subject.");
      return;
    }
    if (!html.trim()) {
      setServerError("Please write a message body.");
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch("/api/admin/send-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, to: toArray, subject, html }),
      });
      const data = await response.json();
      if (response.ok) {
        setSendStatus(data);
        localStorage.removeItem("supercool_draft_campaign");
      } else {
        setServerError(data.error || "An error occurred while sending campaign emails.");
      }
    } catch (err) {
      setServerError("Network error: Failed to connect to campaign email server.");
    } finally {
      setIsSending(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const foundEmails = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi) || [];
      if (foundEmails.length > 0) {
        const uniqueUploaded = Array.from(new Set(foundEmails.map((x) => x.trim())));
        const current = toInput.split(/[\n,]+/).map((x) => x.trim()).filter((x) => x.length > 0 && x.includes("@"));
        setToInput(Array.from(new Set([...current, ...uniqueUploaded])).join("\n"));
      } else {
        alert("No valid email addresses found in the uploaded file.");
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsText(file);
  };

  const handleLoadSampleRecipients = () => {
    const samples = [];
    for (let i = 1; i <= 120; i++) samples.push(`customer${i}@supercoolalhasa.shop`);
    setToInput(samples.join("\n"));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setSendStatus(null);
    setServerError("");
  };

  const previewHtmlContent = useMemo(() => resolvePlaceholders(html, language), [html, language]);

  // ─── LOGIN SCREEN ───────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen flex flex-col justify-center py-12 px-4 font-sans transition-colors duration-200 ${
        isDark ? "bg-black text-white" : "bg-[#eef2f7] text-slate-900"
      }`}>
        {/* Theme Toggle on Login Screen */}
        <div className="absolute top-6 right-6">
          <button
            onClick={toggleTheme}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              isDark
                ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-amber-400"
                : "bg-white hover:bg-slate-100 border-slate-200 text-indigo-600 shadow-sm"
            }`}
          >
            {isDark ? <i className="fa-solid fa-sun text-base" /> : <i className="fa-solid fa-moon text-base" />}
          </button>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center animate-fade-up">
          {/* Logo */}
          <div className="relative w-24 h-24 mx-auto mb-5">
            <Image
              src="/images/logo.png"
              alt="SuperCool Logo"
              fill
              className={`object-contain ${isDark ? "brightness-0 invert" : ""}`}
              sizes="96px"
            />
          </div>
          <h2 className={`text-2xl sm:text-3xl font-black tracking-tight font-plus-jakarta ${isDark ? "text-white" : "text-slate-900"}`}>
            SuperCool Admin Portal
          </h2>
          <p className={`mt-1.5 text-xs sm:text-sm font-medium ${isDark ? "text-neutral-500" : "text-slate-500"}`}>
            Lead Management & Campaign Center
          </p>
        </div>

        <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-md">
          <div className={`border py-8 px-6 shadow-2xl rounded-3xl sm:px-10 transition-all ${
            isDark ? "bg-neutral-950 border-neutral-800" : "bg-white border-slate-200/90 shadow-slate-200/60"
          }`}>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${isDark ? "text-neutral-400" : "text-slate-600"}`}>
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@supercoolalhasa.shop"
                  className={`block w-full px-4 py-3 border rounded-xl text-sm font-medium outline-none transition-all ${
                    isDark
                      ? "bg-black border-neutral-800 text-white placeholder-neutral-700 focus:border-accent"
                      : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-accent"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${isDark ? "text-neutral-400" : "text-slate-600"}`}>
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`block w-full px-4 py-3 border rounded-xl text-sm font-medium outline-none transition-all ${
                    isDark
                      ? "bg-black border-neutral-800 text-white placeholder-neutral-700 focus:border-accent"
                      : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-accent"
                  }`}
                />
              </div>

              {loginError && (
                <div className="p-3 bg-accent/10 border border-accent/20 rounded-xl text-xs font-bold text-accent flex items-center gap-2">
                  <i className="fa-solid fa-triangle-exclamation" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 bg-accent hover:bg-accent-hover text-white font-extrabold rounded-xl shadow-md transition-all hover:scale-[1.01] active:scale-95 cursor-pointer text-xs uppercase tracking-wider"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ─── MAIN CONSOLE ────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen flex flex-col font-sans select-none overflow-x-hidden transition-colors duration-200 ${
      isDark ? "bg-black text-neutral-100" : "bg-[#eef2f7] text-slate-800"
    }`}>

      {/* Draft Restored Toast */}
      {draftRestoredToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-fade-up text-xs">
          <i className="fa-solid fa-cloud-arrow-down" />
          <span>Draft restored</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className={`border-b sticky top-0 z-40 backdrop-blur-md transition-colors ${
        isDark ? "bg-black/80 border-neutral-800/60" : "bg-white/90 border-slate-200 shadow-xs"
      }`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8">
                <Image src="/images/logo.png" alt="SuperCool" fill className={`object-contain ${isDark ? "brightness-0 invert" : ""}`} sizes="32px" />
              </div>
              <span className={`font-plus-jakarta font-black text-lg tracking-tight hidden sm:inline ${isDark ? "text-white" : "text-slate-900"}`}>
                SuperCool
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className={`flex items-center gap-1 p-1 rounded-xl border transition-colors ${
              isDark ? "bg-neutral-950 border-neutral-800/80" : "bg-slate-100 border-slate-200"
            }`}>
              <button
                onClick={() => setAdminTab("leads")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  adminTab === "leads"
                    ? "bg-accent text-white shadow-md shadow-accent/20"
                    : isDark
                    ? "text-neutral-400 hover:text-white hover:bg-neutral-900"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <i className="fa-solid fa-users text-[11px]" />
                <span>Lead Management</span>
              </button>

              <button
                onClick={() => setAdminTab("campaigns")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  adminTab === "campaigns"
                    ? "bg-accent text-white shadow-md shadow-accent/20"
                    : isDark
                    ? "text-neutral-400 hover:text-white hover:bg-neutral-900"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <i className="fa-solid fa-paper-plane text-[11px]" />
                <span>Email Campaigns</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Day / Night Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isDark
                  ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-amber-400"
                  : "bg-white hover:bg-slate-100 border-slate-200 text-indigo-600 shadow-xs"
              }`}
            >
              {isDark ? <i className="fa-solid fa-sun text-sm" /> : <i className="fa-solid fa-moon text-sm" />}
            </button>

            {lastSaved && adminTab === "campaigns" && (
              <div className={`hidden sm:flex items-center gap-1.5 text-xs ${isDark ? "text-neutral-500" : "text-slate-500"}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Saved {lastSaved}</span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                isDark
                  ? "bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white border-neutral-800"
                  : "bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200 shadow-xs"
              }`}
            >
              <i className="fa-solid fa-arrow-right-from-bracket text-[10px]" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 md:p-6">
        {adminTab === "leads" ? (
          /* LEAD MANAGEMENT MODULE */
          <AdminLeadManagement theme={theme} />
        ) : (
          /* EMAIL CAMPAIGN MODULE */
          <div className="flex flex-col gap-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className={`text-2xl sm:text-3xl font-black font-plus-jakarta tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                  Email Campaign Center
                </h2>
                <p className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                  Compose, preview in real-time, and dispatch bulk marketing email campaigns
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setShowFullPreview(true)}
                  className={`h-10 px-4 border rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    isDark
                      ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-200 hover:text-white"
                      : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700 shadow-xs"
                  }`}
                >
                  <i className="fa-solid fa-expand text-xs" />
                  <span>Full Preview</span>
                </button>

                <button
                  onClick={handleSendCampaign}
                  disabled={isSending}
                  className="h-10 px-5 bg-accent hover:bg-accent-hover disabled:opacity-50 rounded-xl text-xs sm:text-sm font-black text-white shadow-md transition-all hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  {isSending ? (
                    <>
                      <i className="fa-solid fa-circle-notch animate-spin text-sm" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane text-xs" />
                      <span>Send Campaign</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Server Error / Success Banners */}
            {serverError && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-500 font-bold text-xs sm:text-sm flex items-center gap-2.5">
                <i className="fa-solid fa-triangle-exclamation text-base flex-shrink-0" />
                <span>{serverError}</span>
              </div>
            )}
            {sendStatus && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 font-bold text-xs sm:text-sm flex items-center gap-2.5">
                <i className="fa-solid fa-circle-check text-base flex-shrink-0" />
                <span>{sendStatus.message || "Campaign sent successfully!"}</span>
              </div>
            )}

            {/* 2-Column Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT: Campaign Editor (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Template Selection Card */}
                <div className={`border rounded-[20px] p-5.5 shadow-md transition-all ${
                  isDark ? "bg-neutral-950 border-neutral-800/80" : "bg-white border-slate-200/90 shadow-slate-200/40"
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-plus-jakarta font-black text-xs sm:text-sm uppercase tracking-wider ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                      Select Campaign Template
                    </h3>
                    {/* Language Switcher */}
                    <div className={`flex p-1 rounded-xl border ${isDark ? "bg-black border-neutral-800" : "bg-slate-100 border-slate-200"}`}>
                      <button
                        type="button"
                        onClick={() => handleLanguageChange("en")}
                        className={`px-3 py-1 rounded-lg text-xs font-black tracking-wide transition-all cursor-pointer ${
                          language === "en"
                            ? "bg-accent text-white shadow"
                            : isDark ? "text-neutral-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        ENGLISH
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLanguageChange("ar")}
                        className={`px-3 py-1 rounded-lg text-xs font-black tracking-wide transition-all cursor-pointer ${
                          language === "ar"
                            ? "bg-accent text-white shadow"
                            : isDark ? "text-neutral-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        ARABIC (عربي)
                      </button>
                    </div>
                  </div>

                  {/* Template Cards Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {TEMPLATES.map((tpl) => (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => handleSelectTemplate(tpl.id)}
                        className={`group relative p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[96px] ${
                          selectedTemplateId === tpl.id
                            ? isDark
                              ? "bg-neutral-900 border-accent text-white ring-2 ring-accent/30"
                              : "bg-blue-50/70 border-accent text-slate-900 ring-2 ring-accent/20"
                            : isDark
                            ? "bg-black/60 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/50"
                            : "bg-slate-50 border-slate-200/80 hover:bg-slate-100/80"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm mb-2 transition-colors ${
                          selectedTemplateId === tpl.id ? "bg-accent text-white" : isDark ? "bg-neutral-900 text-neutral-400" : "bg-white text-slate-600 shadow-xs border border-slate-200"
                        }`}>
                          <i className={tpl.icon} />
                        </div>
                        <div>
                          <span className={`text-xs font-bold leading-tight block truncate ${
                            selectedTemplateId === tpl.id ? "text-accent" : isDark ? "text-white" : "text-slate-900"
                          }`}>
                            {language === "ar" ? tpl.titleAr : tpl.titleEn}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Subject & Body Editor Card */}
                <div className={`border rounded-[20px] p-5.5 shadow-md space-y-4 transition-all ${
                  isDark ? "bg-neutral-950 border-neutral-800/80" : "bg-white border-slate-200/90 shadow-slate-200/40"
                }`}>
                  <div>
                    <label className={`block text-xs font-black uppercase tracking-wider mb-2 ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                      Email Subject Line
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. 30% Off Summer AC Deep Cleaning Offer"
                      className={`w-full h-11 px-4 border rounded-xl text-sm font-semibold outline-none transition-all ${
                        isDark
                          ? "bg-black border-neutral-800 text-white focus:border-accent"
                          : "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-accent"
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-black uppercase tracking-wider mb-2 ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                      Email HTML Body Code
                    </label>
                    <textarea
                      rows={12}
                      value={html}
                      onChange={(e) => setHtml(e.target.value)}
                      className={`w-full p-4 border rounded-xl text-xs font-mono outline-none transition-all leading-relaxed ${
                        isDark
                          ? "bg-black border-neutral-800 text-neutral-200 focus:border-accent"
                          : "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-accent"
                      }`}
                    />
                  </div>
                </div>

                {/* 3. Recipients Card */}
                <div className={`border rounded-[20px] p-5.5 shadow-md space-y-3 transition-all ${
                  isDark ? "bg-neutral-950 border-neutral-800/80" : "bg-white border-slate-200/90 shadow-slate-200/40"
                }`}>
                  <div className="flex items-center justify-between">
                    <label className={`block text-xs font-black uppercase tracking-wider ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                      Recipients List ({parsedRecipientsCount})
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleLoadSampleRecipients}
                        className="text-xs font-bold text-accent hover:underline cursor-pointer"
                      >
                        + Load Samples
                      </button>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={`text-xs font-bold cursor-pointer ${isDark ? "text-neutral-400 hover:text-white" : "text-slate-500 hover:text-slate-800"}`}
                      >
                        + Upload File (.txt/.csv)
                      </button>
                      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".txt,.csv" className="hidden" />
                    </div>
                  </div>

                  <textarea
                    rows={4}
                    value={toInput}
                    onChange={(e) => setToInput(e.target.value)}
                    placeholder="Enter recipient email addresses (one per line or comma-separated)"
                    className={`w-full p-3.5 border rounded-xl text-xs font-mono outline-none transition-all ${
                      isDark
                        ? "bg-black border-neutral-800 text-neutral-200 focus:border-accent"
                        : "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-accent"
                    }`}
                  />
                </div>
              </div>

              {/* RIGHT: Live Preview (PROPERLY FORMATTED & NO COLLAPSE) */}
              <div className={`lg:col-span-5 border rounded-[20px] p-5.5 shadow-xl sticky top-24 space-y-4 transition-all ${
                isDark ? "bg-neutral-950 border-neutral-800/80" : "bg-white border-slate-200/90 shadow-slate-200/40"
              }`}>
                <div className={`flex items-center justify-between pb-3.5 border-b ${isDark ? "border-neutral-800" : "border-slate-200"}`}>
                  <div>
                    <h3 className={`font-plus-jakarta font-black text-xs sm:text-sm uppercase tracking-wider ${isDark ? "text-neutral-400" : "text-slate-500"}`}>
                      Live Email Preview
                    </h3>
                  </div>

                  <div className={`flex p-1 rounded-xl border ${isDark ? "bg-black border-neutral-800" : "bg-slate-100 border-slate-200"}`}>
                    <button
                      type="button"
                      onClick={() => setPreviewTab("desktop")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        previewTab === "desktop"
                          ? "bg-accent text-white shadow"
                          : isDark ? "text-neutral-500 hover:text-neutral-300" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Desktop
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTab("mobile")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        previewTab === "mobile"
                          ? "bg-accent text-white shadow"
                          : isDark ? "text-neutral-500 hover:text-neutral-300" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Mobile
                    </button>
                  </div>
                </div>

                {/* Preview Window Box */}
                <div className={`mx-auto rounded-2xl overflow-hidden border shadow-xl transition-all duration-300 w-full ${
                  previewTab === "mobile" ? "max-w-[340px]" : "w-full"
                } ${isDark ? "border-neutral-800" : "border-slate-300"}`}>
                  
                  {/* Email Header Bar */}
                  <div className="p-3.5 bg-slate-900 text-white text-xs space-y-1">
                    <p className="font-bold truncate text-slate-100">
                      Subject: <span className="text-white">{subject || "No Subject"}</span>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      From: <span className="text-slate-300 font-mono">info@supercoolalhasa.shop</span>
                    </p>
                  </div>

                  {/* Rendered Body HTML Container with explicit height */}
                  <div
                    className="p-4 sm:p-5 overflow-y-auto h-[500px] bg-white text-slate-900 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: previewHtmlContent }}
                  />
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

    </div>
  );
}
