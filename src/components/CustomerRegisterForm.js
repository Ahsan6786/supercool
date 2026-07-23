"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function CustomerRegisterForm() {
  const { language, t } = useLanguage();
  const isAr = language === "ar";

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    consent: true,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [duplicateMessage, setDuplicateMessage] = useState("");

  const validate = () => {
    const newErrors = {};

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
      const savedLeads = JSON.parse(localStorage.getItem("supercool_customer_registrations") || "[]");
      const recentDup = savedLeads.find((lead) => {
        const leadMobile = (lead.mobileNumber || "").replace(/\D/g, "");
        const leadTime = new Date(lead.consentTimestamp).getTime();
        return leadMobile === cleanMobile && Date.now() - leadTime < 24 * 60 * 60 * 1000;
      });

      if (recentDup) {
        setDuplicateMessage(t.errDuplicate || "You have already registered recently.");
        setIsSubmitting(false);
        return;
      }
    } catch (e) {
      console.error("Local storage error:", e);
    }

    const payload = {
      fullName: formData.fullName.trim() || "Existing Customer",
      mobileNumber: formData.mobileNumber.trim(),
      email: formData.email.trim(),
      location: "Al Ahsa",
      serviceType: "Customer Registration",
      contactMethod: "WhatsApp",
      consent: formData.consent,
      source: "Existing Customer Form",
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
          setDuplicateMessage(t.errDuplicate || "You have already registered recently.");
        } else {
          setErrors({ submit: data.message || "Failed to register. Please try again." });
        }
        setIsSubmitting(false);
        return;
      }

      const newRecord = {
        ...payload,
        id: data.lead?.id || `cust_${Date.now()}`,
        consentTimestamp: data.lead?.consentTimestamp || new Date().toISOString(),
      };

      try {
        const savedLeads = JSON.parse(localStorage.getItem("supercool_customer_registrations") || "[]");
        savedLeads.unshift(newRecord);
        localStorage.setItem("supercool_customer_registrations", JSON.stringify(savedLeads));
      } catch (e) {}

      setSubmitted(true);
    } catch (err) {
      console.error("Customer registration error:", err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setDuplicateMessage("");
    setErrors({});
    setFormData({
      fullName: "",
      mobileNumber: "",
      email: "",
      consent: true,
    });
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        {/* CLEAN PREMIUM CARD */}
        <div className="bg-white rounded-2xl sm:rounded-[28px] p-4 sm:p-7 md:p-8 border border-slate-200/80 shadow-2xl shadow-slate-200/70 text-start box-border">
          
          {/* Header Row: Blue Icon + Title */}
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#2563eb] flex items-center justify-center text-white text-lg sm:text-xl flex-shrink-0 shadow-md shadow-blue-500/20">
              <i className="fa-solid fa-user-check" />
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="font-plus-jakarta font-black text-lg sm:text-2xl text-slate-900 tracking-tight leading-tight truncate">
                {t.existingCustomerTitle || "Already Our Customer?"}
              </h3>
            </div>
          </div>

          <div className="w-full h-[1px] bg-slate-100 my-3 sm:my-4" />

          {submitted ? (
            /* SUCCESS VIEW */
            <div className="flex flex-col items-center text-center py-4 animate-fade-in">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-4 text-xl sm:text-2xl">
                <i className="fa-solid fa-circle-check" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-800 mb-5 max-w-sm leading-relaxed">
                {t.registerSuccessMessage || "Thank you! Your registration is complete. You will now receive warranty and service updates via WhatsApp & Email."}
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="py-3 px-5 rounded-xl sm:rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all text-xs cursor-pointer"
              >
                {t.registerAnother || "Register Another Number"}
              </button>
            </div>
          ) : (
            /* FORM VIEW - CLEAN NO INNER ICONS */
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 sm:gap-4.5 w-full">
              {duplicateMessage && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-medium flex items-center gap-2">
                  <i className="fa-solid fa-circle-info text-amber-600 text-sm flex-shrink-0" />
                  <span>{duplicateMessage}</span>
                </div>
              )}

              {/* Full Name */}
              <div className="flex flex-col w-full">
                <label htmlFor="reg-fullName" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5 leading-none">
                  {t.nameOptionalLabel || "Full Name (Optional)"}
                </label>
                <input
                  id="reg-fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder={t.fullNamePlaceholder || "e.g. Abdullah Al-Mansoor"}
                  className={`w-full h-12 sm:h-[52px] px-4 sm:px-4.5 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white text-slate-800 font-medium text-xs sm:text-sm outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-blue-500/10 transition-all ${
                    isAr ? "text-right" : "text-left"
                  }`}
                />
              </div>

              {/* Mobile / WhatsApp Number * */}
              <div className="flex flex-col w-full">
                <label htmlFor="reg-mobileNumber" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5 leading-none">
                  {t.mobileLabel || "Mobile / WhatsApp Number"} <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  id="reg-mobileNumber"
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

              {/* Email Address * */}
              <div className="flex flex-col w-full">
                <label htmlFor="reg-email" className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5 leading-none">
                  {t.emailLabel || "Email Address"} <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  id="reg-email"
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

              {/* Consent Box */}
              <div className="pt-0.5 w-full">
                <label
                  htmlFor="reg-consent"
                  className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer select-none ${
                    errors.consent 
                      ? "bg-red-50/50 border-red-300" 
                      : "bg-[#f8fafc] border-slate-200/80 hover:bg-slate-100/70"
                  }`}
                >
                  <input
                    id="reg-consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => {
                      setFormData({ ...formData, consent: e.target.checked });
                      if (errors.consent) setErrors({ ...errors, consent: null });
                    }}
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-md text-[#2563eb] bg-white border-slate-300 focus:ring-[#2563eb] accent-[#2563eb] cursor-pointer flex-shrink-0"
                  />
                  <span className="text-[11px] sm:text-xs text-slate-700 font-semibold leading-relaxed">
                    {t.customerConsentLabel || "I agree to receive WhatsApp & Email reminders and offers."}
                  </span>
                </label>
                {errors.consent && <p className="text-[11px] font-bold text-red-500 mt-1">{errors.consent}</p>}
              </div>

              {/* Submit Button */}
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
                    <i className="fa-solid fa-user-check text-base sm:text-lg" />
                    <span>{t.registerBtn || "Register"}</span>
                  </>
                )}
              </button>

              {/* Security Text */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-slate-400 font-semibold pt-0.5">
                <i className="fa-solid fa-shield-halved text-slate-400 text-xs" />
                <span>{t.securityText || "Your information is safe and secure."}</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
