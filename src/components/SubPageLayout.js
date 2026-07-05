"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function SubPageLayout({ children }) {
  const { language, toggleLanguage, t, whatsappLink } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();

  const navItems = [
    { label: t.navHome, href: "/" },
    { label: t.navAbout, href: "/about" },
    { label: t.navServices, href: "/services" },
    { label: t.filterInstallation, href: "/ac-installation" },
    { label: t.navContact, href: "/contact" },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-outfit text-slate-800 bg-[#f8fafc] selection:bg-primary selection:text-white`}>
      
      {/* Header / Navbar */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-2.5" 
            : "bg-white/80 backdrop-blur-sm border-b border-slate-100/50 py-3.5"
        }`}
      >
        {/* Desktop Header */}
        <div className="hidden md:flex max-w-7xl mx-auto px-6 items-center justify-between w-full">
          <Link href="/" className={`flex items-center group ${language === "ar" ? "md:-mr-8 lg:-mr-14" : "md:-ml-8 lg:-ml-14"}`}>
            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:rotate-12 flex-shrink-0">
              <Image 
                src="/images/logo.png" 
                alt="Super Cool Symbol" 
                fill 
                className="object-contain"
                priority
                sizes="40px"
              />
            </div>
            <span className={`font-plus-jakarta font-black text-xl text-primary tracking-tight transition-colors duration-300 group-hover:text-accent ${language === "ar" ? "mr-3" : "ml-3"}`}>
              {language === "ar" ? "سوبر كول" : "SuperCool"}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-plus-jakarta text-sm lg:text-base font-bold relative py-1 transition-colors duration-200 ${
                  pathname === item.href 
                    ? "text-primary font-black" 
                    : "text-slate-600 hover:text-primary"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-0 w-6 h-0.5 bg-accent rounded-full animate-pulse" />
                )}
              </Link>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="px-4 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-sm font-extrabold text-slate-700 cursor-pointer transition-colors"
            >
              {language === "en" ? "العربية" : "English"}
            </button>

            <a 
              href={whatsappLink}
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center w-10 h-10 bg-primary hover:bg-accent text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="Chat on WhatsApp"
            >
              <i className="fa-brands fa-whatsapp text-xl" />
            </a>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between w-full px-6">
          <Link href="/" className={`flex items-center group ${language === "ar" ? "-mr-2" : "-ml-2"}`}>
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image 
                src="/images/logo.png" 
                alt="Super Cool Symbol" 
                fill 
                className="object-contain"
                priority
                sizes="32px"
              />
            </div>
            <span className={`font-plus-jakarta font-black text-lg text-primary tracking-tight transition-colors duration-300 ${language === "ar" ? "mr-2" : "ml-2"}`}>
              {language === "ar" ? "سوبر كول" : "SuperCool"}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button 
              onClick={toggleLanguage}
              className="px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200/60 hover:bg-slate-100 text-xs font-black text-slate-700 cursor-pointer transition-all duration-200 leading-none"
            >
              {language === "en" ? "عربي" : "EN"}
            </button>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-primary text-xl flex items-center justify-center w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 cursor-pointer transition-colors"
              aria-label="Toggle menu"
            >
              <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav Menu */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl transition-all duration-300 ease-in-out ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`font-plus-jakarta text-lg font-bold py-2 transition-colors ${
                  pathname === item.href 
                    ? "text-primary border-l-2 border-accent pl-3" 
                    : language === "ar" ? "text-slate-600 pr-3" : "text-slate-600 pl-3"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
              <button 
                onClick={() => { setMenuOpen(false); setShowCallModal(true); }}
                className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-primary text-white font-bold cursor-pointer shadow-md active:scale-[0.98] transition-all duration-200"
              >
                <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
                  <i className="fa-solid fa-phone text-sm text-white" />
                </div>
                <span>{t.callSupportLines}</span>
              </button>
              <a 
                href={whatsappLink}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-whatsapp flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-[#25d366] text-white font-bold shadow-md active:scale-[0.98] transition-all duration-200"
              >
                <i className="fa-brands fa-whatsapp text-xl text-white" />
                <span>{t.whatsappSupport}</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <div className="relative w-80 h-40">
              <Image src="/images/l2.png" alt="Super Cool Logo symbol" fill className="object-contain" sizes="320px" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap">
              <i className="fa-solid fa-location-dot text-slate-400" />
              <span>{t.location}</span>
            </div>
            <div className="hidden sm:block w-[1px] h-3.5 bg-slate-200" />
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-envelope text-slate-400" />
              <a href="mailto:supercool.acservices@gmail.com" className="hover:text-primary hover:underline">
                supercool.acservices@gmail.com
              </a>
            </div>
            <div className="hidden sm:block w-[1px] h-3.5 bg-slate-200" />
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-clock text-slate-400" />
              <span>{t.openHours}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link href="/sitemap" className="text-slate-400 hover:text-primary font-bold">
              {language === "ar" ? "خريطة الموقع" : "Sitemap"}
            </Link>
            <span className="text-slate-400 font-xs">
              &copy; {new Date().getFullYear()} {t.copyright}
            </span>
          </div>
        </div>
      </footer>

      {/* Call Lines Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-slate-100 flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/5 text-primary rounded-full flex items-center justify-center text-2xl mb-4">
              <i className="fa-solid fa-phone-volume" />
            </div>
            <h3 className="font-plus-jakarta font-extrabold text-xl text-primary mb-2">
              {t.modalTitle}
            </h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              {t.modalDesc}
            </p>
            <div className="flex flex-col gap-3 w-full">
              <a 
                href="tel:0566706358"
                className="flex items-center justify-center gap-3 py-3.5 bg-primary hover:bg-primary-light text-white font-bold rounded-xl shadow-md transition-all duration-200"
              >
                <i className="fa-solid fa-phone" />
                <span dir="ltr">056 670 6358</span>
              </a>
              <a 
                href="tel:0509811258"
                className="flex items-center justify-center gap-3 py-3.5 bg-slate-100 hover:bg-slate-200 text-primary font-bold rounded-xl transition-all duration-200"
              >
                <i className="fa-solid fa-phone" />
                <span dir="ltr">050 981 1258</span>
              </a>
            </div>
            <button 
              onClick={() => setShowCallModal(false)}
              className="mt-6 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {t.cancel}
            </button>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 end-6 z-40 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-xl border border-white/10 hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-300 transform cursor-pointer ${
          scrolled ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-75 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <i className="fa-solid fa-chevron-up text-sm" />
      </button>

    </div>
  );
}
