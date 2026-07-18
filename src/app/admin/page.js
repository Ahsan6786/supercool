"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { TEMPLATES } from "@/lib/templates";

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
      <div className="min-h-screen bg-black flex flex-col justify-center py-12 px-4 font-sans">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center animate-fade-up">
          {/* Large Logo */}
          <div className="relative w-28 h-28 mx-auto mb-6">
            <Image
              src="/images/logo.png"
              alt="SuperCool Logo"
              fill
              className="object-contain brightness-0 invert"
              sizes="112px"
            />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight font-plus-jakarta">
            SuperCool Console
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            Campaign Command Center
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-neutral-950 border border-neutral-800 py-8 px-6 shadow-2xl rounded-3xl sm:px-10">
            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@supercoolalhasa.shop"
                  className="block w-full px-4 py-3.5 bg-black border border-neutral-800 rounded-xl text-white placeholder-neutral-700 focus:outline-none focus:ring-1 focus:ring-accent focus:border-transparent transition-all text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full px-4 py-3.5 bg-black border border-neutral-800 rounded-xl text-white placeholder-neutral-700 focus:outline-none focus:ring-1 focus:ring-accent focus:border-transparent transition-all text-sm font-medium"
                />
              </div>

              {loginError && (
                <div className="p-3.5 bg-accent/10 border border-accent/20 rounded-xl text-sm font-bold text-accent flex items-center gap-2">
                  <i className="fa-solid fa-triangle-exclamation" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 bg-accent hover:bg-accent-hover text-white font-extrabold rounded-xl shadow-md hover:shadow-accent/10 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer text-sm uppercase tracking-wider"
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
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans select-none overflow-x-hidden">

      {/* Draft Restored Toast */}
      {draftRestoredToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white font-bold px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-fade-up">
          <i className="fa-solid fa-cloud-arrow-down" />
          <span>Draft restored</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-black/80 border-b border-neutral-800/60 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9">
              <Image src="/images/logo.png" alt="SuperCool" fill className="object-contain brightness-0 invert" sizes="36px" />
            </div>
            <span className="font-plus-jakarta font-black text-lg tracking-tight text-white">SuperCool</span>
            <span className="text-[9px] bg-neutral-900 text-neutral-400 px-2 py-0.5 rounded font-black uppercase tracking-widest border border-neutral-800">
              Campaigns
            </span>
          </div>

          <div className="flex items-center gap-3">
            {lastSaved && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Saved {lastSaved}</span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white rounded-lg text-xs font-bold transition-all border border-neutral-800 cursor-pointer"
            >
              <i className="fa-solid fa-arrow-right-from-bracket text-[10px]" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 md:p-6 flex flex-col gap-5">

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white font-plus-jakarta tracking-tight">Campaign Dashboard</h2>
            <p className="text-xs text-neutral-500 mt-0.5">Compose, preview, and dispatch bulk email campaigns</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFullPreview(true)}
              className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-xl text-xs font-bold text-neutral-200 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <i className="fa-solid fa-expand text-[10px]" />
              Full Preview
            </button>
            <button
              onClick={handleSendCampaign}
              disabled={isSending}
              className="px-5 py-2.5 bg-accent hover:bg-accent-hover disabled:bg-neutral-900 disabled:text-neutral-600 rounded-xl text-xs font-black uppercase text-white shadow-lg shadow-accent/20 transition-all hover:scale-[1.01] active:scale-95 disabled:scale-100 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5"
            >
              {isSending ? (
                <>
                  <div className="w-3 h-3 border border-white/20 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane text-[10px]" />
                  Send Campaign
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

          {/* LEFT: Campaign Editor */}
          <div className="lg:col-span-7 space-y-5">

            {/* Template Selection */}
            <div className="bg-neutral-950/60 border border-neutral-800/60 backdrop-blur-md rounded-3xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-plus-jakarta font-black text-xs uppercase tracking-widest text-neutral-400">
                  Template
                </h3>
                {/* Language Toggle */}
                <div className="flex bg-black p-0.5 rounded-lg border border-neutral-800">
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`px-3 py-1 rounded-md text-[10px] font-black tracking-wide transition-all cursor-pointer ${
                      language === "en" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => handleLanguageChange("ar")}
                    className={`px-3 py-1 rounded-md text-[10px] font-black tracking-wide transition-all cursor-pointer ${
                      language === "ar" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    AR
                  </button>
                </div>
              </div>

              {/* Template Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => handleSelectTemplate(tpl.id)}
                    className={`group relative p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[90px] text-left ${
                      selectedTemplateId === tpl.id
                        ? "bg-neutral-900 border-accent/50 shadow-lg shadow-accent/5"
                        : "bg-black/60 border-neutral-800/60 hover:border-neutral-700 hover:bg-neutral-900/50"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs mb-2 transition-colors ${
                      selectedTemplateId === tpl.id ? "bg-accent/20 text-accent" : "bg-neutral-900 text-neutral-500 group-hover:text-neutral-300"
                    }`}>
                      <i className={tpl.icon} />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white leading-tight block truncate">
                        {language === "ar" ? tpl.titleAr : tpl.titleEn}
                      </span>
                      {selectedTemplateId === tpl.id && (
                        <span className="text-[9px] text-accent font-bold uppercase tracking-wide block mt-0.5">Active</span>
                      )}
                    </div>
                    {selectedTemplateId === tpl.id && (
                      <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-accent" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Campaign Content */}
            <div className="bg-neutral-950/60 border border-neutral-800/60 backdrop-blur-md rounded-3xl p-5 md:p-6 shadow-xl space-y-4">
              <h3 className="font-plus-jakarta font-black text-xs uppercase tracking-widest text-neutral-400">
                Campaign Content
              </h3>

              {/* From (Read Only) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">From</label>
                  <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
                <input
                  type="text"
                  disabled
                  value="SuperCool AC Services <info@supercoolalhasa.shop>"
                  className="w-full px-4 py-3 bg-black/60 border border-neutral-900 rounded-xl text-neutral-500 cursor-not-allowed font-medium text-xs"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-500 tracking-wider mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email subject line..."
                  className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-xl text-white placeholder-neutral-700 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all text-sm font-medium"
                />
              </div>

              {/* Recipients */}
              <div>
                <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                  <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">
                    Recipients
                    {parsedRecipientsCount > 0 && (
                      <span className="ml-2 text-white font-black">{parsedRecipientsCount} emails</span>
                    )}
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-[10px] font-bold text-neutral-300 hover:text-white rounded-lg border border-neutral-800 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <i className="fa-solid fa-file-import text-[9px]" />
                      Import
                    </button>
                    <button
                      type="button"
                      onClick={handleLoadSampleRecipients}
                      className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-[10px] font-bold text-neutral-300 hover:text-white rounded-lg border border-neutral-800 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <i className="fa-solid fa-users text-[9px]" />
                      Load 120
                    </button>
                    <button
                      type="button"
                      onClick={() => setToInput("")}
                      className="px-2.5 py-1 bg-accent/10 hover:bg-accent/20 text-[10px] font-bold text-accent rounded-lg border border-accent/20 transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".csv,.txt" className="hidden" />

                <textarea
                  required
                  rows={4}
                  value={toInput}
                  onChange={(e) => setToInput(e.target.value)}
                  placeholder="john@example.com&#10;client2@example.com"
                  className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-xl text-white placeholder-neutral-700 focus:outline-none focus:border-accent/50 transition-all font-mono text-sm leading-relaxed resize-none"
                />
              </div>

              {serverError && (
                <div className="p-4 bg-accent/10 border border-accent/20 rounded-2xl text-sm font-bold text-neutral-200 flex items-center gap-3">
                  <i className="fa-solid fa-triangle-exclamation text-accent" />
                  <span>{serverError}</span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Live Preview */}
          <div className="lg:col-span-5 space-y-5">

            {/* Email Live Preview */}
            <div className="bg-neutral-950/60 border border-neutral-800/60 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl flex flex-col">

              {/* Preview Header */}
              <div className="bg-black/60 px-4 py-3 border-b border-neutral-900 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex bg-neutral-950 p-0.5 rounded-lg border border-neutral-900">
                  <button
                    onClick={() => setPreviewTab("desktop")}
                    className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                      previewTab === "desktop" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    Desktop
                  </button>
                  <button
                    onClick={() => setPreviewTab("mobile")}
                    className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                      previewTab === "mobile" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    Mobile
                  </button>
                </div>
              </div>

              {/* Email Meta */}
              <div className="px-4 py-3 bg-black/40 border-b border-neutral-900 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-neutral-600 font-bold w-12 shrink-0">From</span>
                  <span className="text-white font-medium truncate">SuperCool AC &lt;info@supercoolalhasa.shop&gt;</span>
                </div>
                <div className="flex items-center gap-2 truncate">
                  <span className="text-neutral-600 font-bold w-12 shrink-0">Subject</span>
                  <span className="text-neutral-200 font-semibold truncate">{subject || "(No Subject)"}</span>
                </div>
              </div>

              {/* iframe */}
              <div className="flex-1 flex items-center justify-center bg-black/50 p-4 min-h-[320px] overflow-hidden">
                {previewTab === "desktop" ? (
                  <div className="w-full h-[420px] bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-900">
                    <iframe srcDoc={previewHtmlContent} className="w-full h-full border-none" title="Desktop Preview" />
                  </div>
                ) : (
                  <div className="w-[270px] h-[440px] border-[8px] border-neutral-900 rounded-[32px] bg-white shadow-2xl overflow-hidden">
                    <iframe srcDoc={previewHtmlContent} className="w-full h-full border-none" title="Mobile Preview" />
                  </div>
                )}
              </div>
            </div>

            {/* Campaign Stats */}
            <div className="bg-neutral-950/60 border border-neutral-800/60 backdrop-blur-md rounded-3xl p-5 shadow-xl">
              <h3 className="font-plus-jakarta font-black text-xs uppercase tracking-widest text-neutral-400 mb-4">
                Campaign Summary
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/60 border border-neutral-900 rounded-2xl p-3.5">
                  <span className="block text-[9px] text-neutral-500 font-black uppercase tracking-wider mb-1">Recipients</span>
                  <span className="text-2xl font-black text-white">{parsedRecipientsCount}</span>
                </div>
                <div className="bg-black/60 border border-neutral-900 rounded-2xl p-3.5">
                  <span className="block text-[9px] text-neutral-500 font-black uppercase tracking-wider mb-1">Language</span>
                  <span className="text-lg font-black text-white">{language === "ar" ? "Arabic" : "English"}</span>
                </div>
                <div className="bg-black/60 border border-neutral-900 rounded-2xl p-3.5">
                  <span className="block text-[9px] text-neutral-500 font-black uppercase tracking-wider mb-1">Est. Delivery</span>
                  <span className="text-xs font-bold text-white block mt-1">
                    {parsedRecipientsCount > 0 ? `${(parsedRecipientsCount * 0.8).toFixed(1)}s` : "—"}
                  </span>
                </div>
                <div className="bg-black/60 border border-neutral-900 rounded-2xl p-3.5">
                  <span className="block text-[9px] text-neutral-500 font-black uppercase tracking-wider mb-1">Draft</span>
                  <span className={`text-xs font-bold block mt-1 ${lastSaved ? "text-emerald-400" : "text-neutral-600"}`}>
                    {lastSaved ? `Saved` : "Pending"}
                  </span>
                </div>
              </div>
            </div>

            {/* Dispatch log */}
            {sendStatus && (
              <div className="bg-neutral-950/60 border border-neutral-800/60 backdrop-blur-md rounded-3xl p-5 shadow-xl space-y-4 animate-fade-up">
                <h3 className="font-plus-jakarta font-black text-xs uppercase tracking-widest text-neutral-400">
                  Dispatch Log
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center">
                    <span className="block text-2xl font-black text-emerald-400">{sendStatus.sentCount}</span>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase">Sent</span>
                  </div>
                  <div className="bg-accent/10 border border-accent/20 rounded-xl p-3 text-center">
                    <span className="block text-2xl font-black text-accent">{sendStatus.failedCount}</span>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase">Failed</span>
                  </div>
                </div>
                <div className="max-h-[200px] overflow-y-auto space-y-1.5 pr-1">
                  {sendStatus.results.map((res, index) => (
                    <div
                      key={index}
                      className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs font-semibold ${
                        res.status === "success"
                          ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-300"
                          : "bg-accent/5 border-accent/10 text-accent"
                      }`}
                    >
                      <span className="truncate flex-1">{res.email}</span>
                      <i className={`fa-solid ${res.status === "success" ? "fa-circle-check text-emerald-400" : "fa-circle-xmark text-accent"}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Full Preview Modal */}
      {showFullPreview && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col font-sans select-none overflow-hidden animate-fade-in">
          <div className="bg-neutral-950 border-b border-neutral-800 p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="font-plus-jakarta font-black text-sm text-white">Full Preview</span>
              <div className="flex bg-black p-0.5 rounded-lg border border-neutral-900">
                <button
                  onClick={() => setPreviewTab("desktop")}
                  className={`px-3.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                    previewTab === "desktop" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  Desktop
                </button>
                <button
                  onClick={() => setPreviewTab("mobile")}
                  className={`px-3.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                    previewTab === "mobile" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  Mobile
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowFullPreview(false)}
              className="w-10 h-10 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
          </div>
          <div className="flex-1 bg-neutral-950 p-6 flex items-center justify-center overflow-y-auto">
            {previewTab === "desktop" ? (
              <div className="w-full max-w-4xl h-full max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-800">
                <iframe srcDoc={previewHtmlContent} className="w-full h-full border-none" title="Full Desktop Preview" />
              </div>
            ) : (
              <div className="w-[320px] h-[580px] border-[10px] border-neutral-900 rounded-[38px] bg-white shadow-2xl overflow-hidden">
                <iframe srcDoc={previewHtmlContent} className="w-full h-full border-none" title="Full Mobile Preview" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
