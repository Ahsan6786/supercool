"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function LeadCaptureForm() {
  const { language, t, whatsappLink } = useLanguage();
  const isAr = language === "ar";

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    serviceType: "Installation",
    consent: true,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [duplicateMessage, setDuplicateMessage] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t.errNameRequired || "Full Name is required";
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = t.errMobileRequired || "Mobile Number is required";
    } else {
      const cleanMobile = formData.mobileNumber.replace(/\D/g, "");
      if (cleanMobile.length < 8) {
        newErrors.mobileNumber = t.errMobileRequired || "Please enter a valid mobile number";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = t.errEmailRequired || "Email Address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = t.errEmailRequired || "Please enter a valid email address";
      }
    }

    if (!formData.serviceType) {
      newErrors.serviceType = t.errServiceRequired || "Service Required is required";
    }

    if (!formData.consent) {
      newErrors.consent = t.errConsentRequired || "Consent is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDuplicateMessage("");

    if (!validate()) return;

    setIsSubmitting(true);
    const cleanMobile = formData.mobileNumber.replace(/\D/g, "");

    // Check duplicate in localStorage
    try {
      const savedLeads = JSON.parse(localStorage.getItem("supercool_submitted_leads") || "[]");
      const recentDup = savedLeads.find((lead) => {
        const leadMobile = (lead.mobileNumber || "").replace(/\D/g, "");
        const leadTime = new Date(lead.consentTimestamp).getTime();
        return leadMobile === cleanMobile && Date.now() - leadTime < 24 * 60 * 60 * 1000;
      });

      if (recentDup) {
        setDuplicateMessage(t.errDuplicate || "You have already submitted a request recently.");
        setIsSubmitting(false);
        return;
      }
    } catch (e) {
      console.error("Local storage error:", e);
    }

    const payload = {
      fullName: formData.fullName.trim(),
      mobileNumber: formData.mobileNumber.trim(),
      email: formData.email.trim(),
      location: "Al Ahsa",
      serviceType: formData.serviceType,
      contactMethod: "WhatsApp",
      consent: formData.consent,
      source: "Hero Lead Capture Form",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409 || data.error === "DuplicateSubmission") {
          setDuplicateMessage(t.errDuplicate || "You have already submitted a request recently.");
        } else {
          setErrors({ submit: data.message || "Failed to submit. Please try again." });
        }
        setIsSubmitting(false);
        return;
      }

      const newLeadRecord = {
        ...payload,
        id: data.lead?.id || `lead_${Date.now()}`,
        consentTimestamp: data.lead?.consentTimestamp || new Date().toISOString(),
      };

      try {
        const savedLeads = JSON.parse(localStorage.getItem("supercool_submitted_leads") || "[]");
        savedLeads.unshift(newLeadRecord);
        localStorage.setItem("supercool_submitted_leads", JSON.stringify(savedLeads));
      } catch (e) {
        console.error("LocalStorage write error:", e);
      }

      setSubmittedData(newLeadRecord);
    } catch (err) {
      console.error("Lead submission error:", err);
      const newLeadRecord = {
        ...payload,
        id: `lead_${Date.now()}`,
        consentTimestamp: new Date().toISOString(),
      };
      try {
        const savedLeads = JSON.parse(localStorage.getItem("supercool_submitted_leads") || "[]");
        savedLeads.unshift(newLeadRecord);
        localStorage.setItem("supercool_submitted_leads", JSON.stringify(savedLeads));
      } catch (e) {}

      setSubmittedData(newLeadRecord);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setDuplicateMessage("");
    setErrors({});
    setFormData({
      fullName: "",
      mobileNumber: "",
      email: "",
      serviceType: "Installation",
      consent: true,
    });
  };

  const getWhatsAppMessage = () => {
    if (!submittedData) return whatsappLink;
    const msgText = isAr
      ? `مرحباً سوبر كول، أود تأكيد طلب حجز الخدمة:\n• الاسم: ${submittedData.fullName}\n• الجوال: ${submittedData.mobileNumber}\n• البريد: ${submittedData.email}\n• الخدمة: ${submittedData.serviceType}`
      : `Hello SuperCool, I would like to confirm my service booking:\n• Name: ${submittedData.fullName}\n• Mobile: ${submittedData.mobileNumber}\n• Email: ${submittedData.email}\n• Service: ${submittedData.serviceType}`;
    return `https://wa.me/966566706358?text=${encodeURIComponent(msgText)}`;
  };

  const servicesList = [
    { value: "Installation", labelEn: "AC Installation", labelAr: "تركيب مكيفات" },
    { value: "Repair", labelEn: "AC Repair", labelAr: "إصلاح الأعطال" },
    { value: "Cleaning", labelEn: "AC Cleaning & Wash", labelAr: "تنظيف وغسيل" },
    { value: "Maintenance", labelEn: "AC Maintenance", labelAr: "صيانة وتفقد" },
    { value: "Piping", labelEn: "Copper Piping", labelAr: "تمديد النحاس" },
  ];

  return (
    <div className="w-full mt-4 sm:mt-6 md:mt-8 max-w-full overflow-hidden animate-fade-up">
      {/* CLEAN PREMIUM DESIGN CARD */}
      <div className="w-full bg-white rounded-2xl sm:rounded-[28px] p-4 sm:p-7 md:p-8 border border-slate-200/80 shadow-2xl shadow-slate-200/70 text-start box-border">
        {submittedData ? (
          /* SUCCESS VIEW */
          <div className="flex flex-col items-center text-center py-2 animate-fade-in">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-3 sm:mb-4 text-xl sm:text-2xl shadow-sm">
              <i className="fa-solid fa-circle-check" />
            </div>

            <h4 className="text-lg sm:text-xl font-black text-slate-900 mb-1">
              {isAr ? "تم استلام طلبك بنجاح!" : "Request Confirmed!"}
            </h4>

            <p className="text-xs sm:text-sm font-medium text-slate-500 mb-4 sm:mb-5 max-w-sm leading-relaxed">
              {t.heroSuccessMessage || "Thank you! Your request has been received. We will contact you shortly."}
            </p>

            <div className="w-full bg-slate-50 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-slate-200/70 mb-4 sm:mb-5 text-start text-xs space-y-2">
              <div className="flex justify-between items-center gap-2">
                <span className="font-medium text-slate-500 flex-shrink-0">{t.fullNameLabel}:</span>
                <span className="font-bold text-slate-900 truncate">{submittedData.fullName}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="font-medium text-slate-500 flex-shrink-0">Email:</span>
                <span className="font-bold text-blue-600 truncate">{submittedData.email}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="font-medium text-slate-500 flex-shrink-0">{t.serviceRequiredLabel}:</span>
                <span className="font-bold text-blue-600 truncate">{submittedData.serviceType}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 sm:gap-3 w-full">
              <a
                href={getWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: "#25d366", color: "#ffffff" }}
                className="w-full h-12 sm:h-13 px-4 bg-[#25d366] hover:bg-[#20bd5a] text-white font-extrabold rounded-xl sm:rounded-2xl shadow-md flex items-center justify-between text-xs sm:text-sm cursor-pointer border-0"
              >
                <div className="flex items-center gap-2">
                  <i className="fa-brands fa-whatsapp text-lg text-white" />
                  <span className="font-extrabold text-white truncate">
                    {t.whatsappQuickConnect || "Send Details via WhatsApp"}
                  </span>
                </div>
                <i className={`fa-solid ${isAr ? "fa-arrow-left" : "fa-arrow-right"} text-xs text-white/90`} />
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full h-11 sm:h-12 px-4 rounded-xl sm:rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all text-xs cursor-pointer"
              >
                {t.submitAnother || "Book Another Service"}
              </button>
            </div>
          </div>
        ) : (
          /* FORM VIEW - CLEAN NO INNER ICONS */
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 sm:gap-5 w-full">
            
            {/* Header Row: Blue Icon + Title */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#2563eb] flex items-center justify-center text-white text-lg sm:text-xl flex-shrink-0 shadow-md shadow-blue-500/20">
                <i className="fa-solid fa-calendar-check" />
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="font-plus-jakarta font-black text-lg sm:text-2xl text-slate-900 tracking-tight leading-tight truncate">
                  {t.formHeaderTitle || "Book a Service"}
                </h3>
              </div>
            </div>

            {/* Subtle Divider Line */}
            <div className="w-full h-[1px] bg-slate-100" />

            {duplicateMessage && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-medium flex items-center gap-2">
                <i className="fa-solid fa-circle-info text-amber-600 text-sm flex-shrink-0" />
                <span>{duplicateMessage}</span>
              </div>
            )}

            {/* 1. Full Name * */}
            <div className="flex flex-col w-full">
              <label htmlFor="hero-fullName" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5 leading-none">
                {t.fullNameLabel || "Full Name"} <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                id="hero-fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: null });
                }}
                placeholder={t.fullNamePlaceholder || "e.g. Abdullah Al-Mansoor"}
                className={`w-full h-12 sm:h-[52px] px-4 sm:px-4.5 rounded-xl sm:rounded-2xl border text-xs sm:text-sm font-medium outline-none transition-all ${
                  isAr ? "text-right" : "text-left"
                } ${
                  errors.fullName
                    ? "border-red-400 bg-red-50/30 text-red-900"
                    : "border-slate-200/90 bg-white text-slate-800 focus:border-[#2563eb] focus:ring-4 focus:ring-blue-500/10"
                }`}
              />
              {errors.fullName && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.fullName}</p>}
            </div>

            {/* 2. Mobile / WhatsApp Number * */}
            <div className="flex flex-col w-full">
              <label htmlFor="hero-mobileNumber" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5 leading-none">
                {t.mobileLabel || "Mobile / WhatsApp Number"} <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                id="hero-mobileNumber"
                type="tel"
                dir="ltr"
                value={formData.mobileNumber}
                onChange={(e) => {
                  setFormData({ ...formData, mobileNumber: e.target.value });
                  if (errors.mobileNumber) setErrors({ ...errors, mobileNumber: null });
                }}
                placeholder={t.mobilePlaceholder || "e.g. 056 670 6358"}
                className={`w-full h-12 sm:h-[52px] px-4 sm:px-4.5 rounded-xl sm:rounded-2xl border text-xs sm:text-sm font-medium outline-none transition-all ${
                  isAr ? "text-right" : "text-left"
                } ${
                  errors.mobileNumber
                    ? "border-red-400 bg-red-50/30 text-red-900"
                    : "border-slate-200/90 bg-white text-slate-800 focus:border-[#2563eb] focus:ring-4 focus:ring-blue-500/10"
                }`}
              />
              {errors.mobileNumber && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.mobileNumber}</p>}
            </div>

            {/* 3. Email Address * */}
            <div className="flex flex-col w-full">
              <label htmlFor="hero-email" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5 leading-none">
                {t.emailLabel || "Email Address"} <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                id="hero-email"
                type="email"
                dir="ltr"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                placeholder={t.emailPlaceholder || "name@example.com"}
                className={`w-full h-12 sm:h-[52px] px-4 sm:px-4.5 rounded-xl sm:rounded-2xl border text-xs sm:text-sm font-medium outline-none transition-all ${
                  isAr ? "text-right" : "text-left"
                } ${
                  errors.email
                    ? "border-red-400 bg-red-50/30 text-red-900"
                    : "border-slate-200/90 bg-white text-slate-800 focus:border-[#2563eb] focus:ring-4 focus:ring-blue-500/10"
                }`}
              />
              {errors.email && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* 4. Service Required * */}
            <div className="flex flex-col w-full">
              <label htmlFor="hero-serviceType" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5 leading-none">
                {t.serviceRequiredLabel || "Service Required"} <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="relative flex items-center w-full">
                <select
                  id="hero-serviceType"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className={`w-full h-12 sm:h-[52px] ${
                    isAr ? "pr-4 pl-10 text-right" : "pl-4 pr-10 text-left"
                  } rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white text-slate-800 font-medium text-xs sm:text-sm outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer appearance-none truncate`}
                >
                  {servicesList.map((svc) => (
                    <option key={svc.value} value={svc.value}>
                      {isAr ? svc.labelAr : svc.labelEn}
                    </option>
                  ))}
                </select>
                <i 
                  className={`fa-solid fa-chevron-down absolute ${
                    isAr ? "left-3.5" : "right-3.5"
                  } text-slate-400 text-xs sm:text-sm pointer-events-none z-10`} 
                />
              </div>
            </div>

            {/* 5. Consent Card Box */}
            <div className="pt-0.5 w-full">
              <label
                htmlFor="hero-consent"
                className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer select-none ${
                  errors.consent 
                    ? "bg-red-50/50 border-red-300" 
                    : "bg-[#f8fafc] border-slate-200/80 hover:bg-slate-100/70"
                }`}
              >
                <input
                  id="hero-consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => {
                    setFormData({ ...formData, consent: e.target.checked });
                    if (errors.consent) setErrors({ ...errors, consent: null });
                  }}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-md text-[#2563eb] bg-white border-slate-300 focus:ring-[#2563eb] accent-[#2563eb] cursor-pointer flex-shrink-0"
                />
                <span className="text-[11px] sm:text-xs text-slate-700 font-semibold leading-relaxed">
                  {t.heroConsentLabel || "I agree to receive WhatsApp & Email service updates and offers."}
                </span>
              </label>
              {errors.consent && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.consent}</p>}
            </div>

            {/* 6. Prominent Blue Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 sm:h-14 bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.99] text-white font-extrabold text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-lg shadow-blue-600/25 transition-all duration-200 flex items-center justify-center gap-2.5 sm:gap-3 font-plus-jakarta cursor-pointer disabled:opacity-50 mt-1"
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-circle-notch animate-spin text-base sm:text-lg" />
                  <span>{t.submitting || "Submitting..."}</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-calendar-check text-base sm:text-lg" />
                  <span>{t.bookServiceBtn || "Book Service"}</span>
                  <i className={`fa-solid ${isAr ? "fa-arrow-left" : "fa-arrow-right"} text-sm sm:text-base`} />
                </>
              )}
            </button>

            {/* 7. Footer Security Badge */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-slate-400 font-semibold pt-0.5">
              <i className="fa-solid fa-shield-halved text-slate-400 text-xs" />
              <span>{t.securityText || "Your information is safe and secure."}</span>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
