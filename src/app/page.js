"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import Lightbox from "@/components/Lightbox";

const GALLERY_IMAGES = [
  {
    src: "/s2.png",
    category: "installation",
    altEn: "Super Cool AC installation work Al Ahsa",
    altAr: "أعمال تركيب مكيفات سوبر كول في الأحساء",
    width: 1086,
    height: 1448
  },
  {
    src: "/s1.png",
    category: "pipes",
    altEn: "Premium copper pipe for AC installation Hofuf",
    altAr: "أنابيب نحاسية ممتازة لتركيب المكيفات في الهفوف",
    width: 1016,
    height: 1355
  },
  {
    src: "/s3.png",
    category: "installation",
    altEn: "Super Cool AC installation work Al Ahsa",
    altAr: "أعمال تركيب مكيفات سوبر كول في الأحساء",
    width: 1086,
    height: 1448
  },
  {
    src: "/s4.mp4",
    category: "installation",
    isVideo: true,
    altEn: "Super Cool AC installation work video Al Ahsa",
    altAr: "فيديو أعمال تركيب مكيفات سوبر كول في الأحساء",
    width: 478,
    height: 850
  },
  {
    src: "/c1.png",
    category: "vehicles",
    altEn: "Super Cool AC service vehicle Saudi Arabia",
    altAr: "سيارات الخدمة سوبر كول في السعودية",
    width: 1672,
    height: 941
  },
  {
    src: "/c2.png",
    category: "vehicles",
    altEn: "Super Cool AC service vehicle Saudi Arabia",
    altAr: "سيارات الخدمة سوبر كول في السعودية",
    width: 941,
    height: 1672
  },
  {
    src: "/c3.png",
    category: "vehicles",
    altEn: "Super Cool AC service vehicle Saudi Arabia",
    altAr: "سيارات الخدمة سوبر كول في السعودية",
    width: 1536,
    height: 1024
  }
];

export default function Home() {
  const { language, setLanguage, t, whatsappLink } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showCallModal, setShowCallModal] = useState(false);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState("all");
  
  // New States for Splash Screen & Language Popup
  const [showSplash, setShowSplash] = useState(true);
  const [splashFade, setSplashFade] = useState(false);
  const [showLangPopup, setShowLangPopup] = useState(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState(-1);
  const [activeValueIndex, setActiveValueIndex] = useState(-1);
  const [lightboxData, setLightboxData] = useState({ items: [], index: null });

  // Rotating Hero Text State
  const [heroTextIndex, setHeroTextIndex] = useState(0);
  const [textFade, setTextFade] = useState(true);

  const rotatingTexts = useMemo(() => language === "ar" ? [
    [
      { text: "تكييف عالي الجودة ", color: "text-[#164085]" },
      { text: "لأكثر من ٣٠ عاماً.", color: "text-accent" }
    ],
    [
      { text: "الأفضل جودة في ", color: "text-[#164085]" },
      { text: "الأحساء، الهفوف، والقارة.", color: "text-accent" }
    ],
    [
      { text: "خبرة وجودة ", color: "text-[#164085]" },
      { text: "لأكثر من ٣٠+ عاماً.", color: "text-accent" }
    ]
  ] : [
    [
      { text: "Quality AC Work ", color: "text-[#164085]" },
      { text: "For More Than ", color: "text-[#164085]" },
      { text: "30 Years.", color: "text-accent" }
    ],
    [
      { text: "Best Quality ", color: "text-accent" },
      { text: "in ", color: "text-[#164085]" },
      { text: "Al\u00a0Ahsa  Al\u00a0Hofuf.", color: "text-accent" }
    ],
    [
      { text: "30+ Years ", color: "text-accent" },
      { text: "Quality Service.", color: "text-[#164085]" }
    ]
  ], [language]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextFade(false);
      setTimeout(() => {
        setHeroTextIndex((prev) => (prev + 1) % rotatingTexts.length);
        setTextFade(true);
      }, 300);
    }, 3800);
    return () => clearInterval(timer);
  }, [rotatingTexts.length]);

  // Handle Splash Screen Timer
  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      setShowSplash(false);
      setShowLangPopup(false);
      return;
    }

    // Start splash screen fade out after 1.5 seconds
    const fadeTimer = setTimeout(() => {
      setSplashFade(true);
    }, 1500);

    // Completely remove splash screen and show language popup after 2 seconds
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
      setShowLangPopup(true);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Track scroll position to change header background
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

  // Scroll spy to highlight active nav link
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
        }
      });
    };
    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // Mobile scroll-to-hover card trigger (on viewport centering)
  useEffect(() => {
    const handleScrollHover = () => {
      if (window.innerWidth >= 768) {
        return;
      }
      const viewportCenter = window.innerHeight / 2;

      // 1. Service Cards
      const serviceCards = document.querySelectorAll("[data-service-card]");
      let closestServiceIdx = -1;
      let minServiceDist = Infinity;
      serviceCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const dist = Math.abs(cardCenter - viewportCenter);
        if (dist < minServiceDist && rect.top < window.innerHeight && rect.bottom > 0) {
          minServiceDist = dist;
          closestServiceIdx = parseInt(card.getAttribute("data-service-card") || "-1", 10);
        }
      });
      if (minServiceDist < 250) {
        setActiveServiceIndex(closestServiceIdx);
      } else {
        setActiveServiceIndex(-1);
      }

      // 2. Value Cards
      const valueCards = document.querySelectorAll("[data-value-card]");
      let closestValueIdx = -1;
      let minValueDist = Infinity;
      valueCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const dist = Math.abs(cardCenter - viewportCenter);
        if (dist < minValueDist && rect.top < window.innerHeight && rect.bottom > 0) {
          minValueDist = dist;
          closestValueIdx = parseInt(card.getAttribute("data-value-card") || "-1", 10);
        }
      });
      if (minValueDist < 220) {
        setActiveValueIndex(closestValueIdx);
      } else {
        setActiveValueIndex(-1);
      }
    };

    window.addEventListener("scroll", handleScrollHover, { passive: true });
    handleScrollHover();
    return () => window.removeEventListener("scroll", handleScrollHover);
  }, []);

  const navItems = [
    { label: t.navHome, href: "#home", id: "home" },
    { label: t.navAbout, href: "#about", id: "about" },
    { label: t.navServices, href: "#services", id: "services" },
    { label: t.navContact, href: "#contact", id: "contact" },
  ];

  const services = [
    {
      title: t.installTitle,
      desc: t.installDesc,
      icon: "fa-solid fa-snowflake",
      color: "from-blue-500 to-sky-400",
      textColor: "bg-blue-50/60 border-blue-100 text-blue-500",
    },
    {
      title: t.repairTitle,
      desc: t.repairDesc,
      icon: "fa-solid fa-screwdriver-wrench",
      color: "from-red-500 to-orange-400",
      textColor: "bg-red-50/60 border-red-100 text-red-500",
    },
    {
      title: t.cleaningTitle,
      desc: t.cleaningDesc,
      icon: "fa-solid fa-droplet",
      color: "from-teal-500 to-cyan-400",
      textColor: "bg-teal-50/60 border-teal-100 text-teal-500",
    },
    {
      title: t.maintenanceTitle,
      desc: t.maintenanceDesc,
      icon: "fa-solid fa-gear",
      color: "from-indigo-500 to-purple-400",
      textColor: "bg-indigo-50/60 border-indigo-100 text-indigo-500",
    },
    {
      title: t.pipingTitle,
      desc: t.pipingDesc,
      icon: "fa-solid fa-toolbox",
      color: "from-emerald-500 to-teal-400",
      textColor: "bg-emerald-50/60 border-emerald-100 text-emerald-500",
    },
    {
      title: t.homeServiceTitle,
      desc: t.homeServiceDesc,
      icon: "fa-solid fa-house-user",
      color: "from-orange-500 to-amber-400",
      textColor: "bg-orange-50/60 border-orange-100 text-orange-500",
    },
  ];

  const stats = [
    { number: t.statExpVal, label: t.statExpLabel, icon: "fa-solid fa-award" },
    { number: t.statCustVal, label: t.statCustLabel, icon: "fa-solid fa-users" },
    { number: t.statServingVal, label: t.statServingLabel, icon: "fa-solid fa-location-dot" },
    { number: t.statEmergencyVal, label: t.statEmergencyLabel, icon: "fa-solid fa-clock" },
  ];

  const values = [
    {
      title: t.valTechTitle,
      desc: t.valTechDesc,
      icon: "fa-solid fa-user-shield",
      textColor: "bg-sky-50/60 border-sky-100 text-sky-500",
    },
    {
      title: t.valRespTitle,
      desc: t.valRespDesc,
      icon: "fa-solid fa-bolt",
      textColor: "bg-amber-50/60 border-amber-100 text-amber-500",
    },
    {
      title: t.valQualTitle,
      desc: t.valQualDesc,
      icon: "fa-solid fa-medal",
      textColor: "bg-emerald-50/60 border-emerald-100 text-emerald-500",
    },
    {
      title: t.valPriceTitle,
      desc: t.valPriceDesc,
      icon: "fa-solid fa-tag",
      textColor: "bg-rose-50/60 border-rose-100 text-rose-500",
    },
  ];

  return (
    <div className={`flex flex-col min-h-screen overflow-x-hidden ${language === "ar" ? "font-sans text-right" : "text-left"}`}>
      
      {/* 1. Splash Screen */}
      {showSplash && (
        <div 
          className={`fixed inset-0 z-[999] flex items-center justify-center bg-white transition-all duration-500 ease-out ${
            splashFade ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="relative w-40 h-40 animate-pulse">
            <Image 
              src="/images/logo.png" 
              alt="Super Cool Logo symbol" 
              fill 
              className="object-contain" 
              priority
              sizes="160px"
            />
          </div>
        </div>
      )}

      {/* 2. Language Choice Popup */}
      {showLangPopup && (
        <div className="fixed inset-0 z-[998] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-slate-100/50 flex flex-col items-center">
            
            {/* Logo in popup */}
            <div className="relative w-16 h-16 mb-4">
              <Image src="/images/logo.png" alt="Super Cool Logo symbol" fill className="object-contain" sizes="64px" />
            </div>

            <h3 className="font-plus-jakarta font-extrabold text-2xl text-primary mb-1">
              Choose Language
            </h3>
            <h3 className="font-plus-jakarta font-extrabold text-xl text-accent mb-4">
              اختر اللغة
            </h3>
            
            <p className="text-sm text-slate-500 mb-8 max-w-xs leading-relaxed">
              Please choose a language to continue to the website.<br />
              يرجى اختيار اللغة للمتابعة للموقع.
            </p>

            <div className="grid grid-cols-2 gap-4 w-full">
              <button 
                onClick={() => {
                  setLanguage("en");
                  setShowLangPopup(false);
                }}
                className="py-4 bg-primary hover:bg-primary-light text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-lg font-plus-jakarta"
              >
                English
              </button>
              <button 
                onClick={() => {
                  setLanguage("ar");
                  setShowLangPopup(false);
                }}
                className="py-4 bg-accent hover:bg-accent-hover text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-lg font-plus-jakarta"
              >
                العربية
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header / Navbar (formatted to be thinner) */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-2.5" 
            : "bg-white/80 backdrop-blur-sm border-b border-slate-100/50 py-3.5"
        }`}
      >
        {/* Desktop Header */}
        <div className="hidden md:flex max-w-7xl mx-auto px-6 items-center justify-between w-full">
          {/* Logo container using symbol logo */}
          <a href="#home" className={`flex items-center group ${language === "ar" ? "md:-mr-8 lg:-mr-14" : "md:-ml-8 lg:-ml-14"}`}>
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
          </a>

          {/* Desktop Nav Links */}
          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`font-plus-jakarta text-base font-bold relative py-1 transition-colors duration-200 ${
                  activeSection === item.id 
                    ? "text-primary font-black" 
                    : "text-slate-600 hover:text-primary"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-6 h-0.5 bg-accent rounded-full animate-pulse" />
                )}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons & Language Switcher */}
          <div className="flex items-center gap-4">
            {/* Quick Language Toggle */}
            <button 
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
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
              <i className="fa-brands fa-whatsapp text-lg" />
            </a>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between w-full px-6">
          {/* Logo (Left) */}
          <a href="#home" className={`flex items-center group ${language === "ar" ? "-mr-2" : "-ml-2"}`}>
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
          </a>

          {/* Lang Switcher & Hamburger Menu (Right) */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200/60 hover:bg-slate-100 text-xs font-black text-slate-700 cursor-pointer transition-all duration-200 leading-none"
            >
              {language === "en" ? "عربي" : "EN"}
            </button>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-primary text-xl flex items-center justify-center w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 cursor-pointer transition-colors"
              aria-label="Toggle navigation menu"
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
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`font-plus-jakarta text-lg font-bold py-2 transition-colors ${
                  activeSection === item.id 
                    ? "text-primary border-l-2 border-accent pl-3" 
                    : language === "ar" ? "text-slate-600 pr-3" : "text-slate-600 pl-3"
                }`}
              >
                {item.label}
              </a>
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

      <main className="flex-grow">
        
        {/* Hero Section */}
        <section id="home" className="relative min-h-[580px] h-[100svh] md:h-[90vh] md:min-h-[700px] flex items-start pt-10 md:pt-24 bg-white overflow-hidden border-b border-slate-100">
          
          {/* Mobile Background Image (b.png - full height and width) */}
          <div className="absolute inset-0 z-0 block md:hidden">
            <Image 
              src="/images/b.png" 
              alt="Super Cool Hero Background Mobile" 
              fill 
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, 1px"
            />
          </div>

          {/* Desktop Ambient Radial Glow Background */}
          <div className="absolute inset-0 z-0 hidden md:block overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] right-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-sky-200/25 blur-3xl" />
            <div className="absolute top-[30%] left-[20%] w-[250px] md:w-[450px] h-[250px] md:h-[450px] rounded-full bg-blue-100/20 blur-3xl" />
          </div>

          {/* Desktop Swirl lines on the right side */}
          <div className="absolute top-0 end-0 bottom-0 w-[55%] z-0 hidden md:block pointer-events-none opacity-60">
            <svg className="w-full h-full" viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              {/* Soft Swirl Curve Backdrop */}
              <path 
                d="M 150,0 C 250,200 450,450 500,800" 
                stroke="url(#swirl-grad-1)" 
                strokeWidth="80" 
                strokeLinecap="round"
                opacity="0.12" 
              />
              <path 
                d="M 170,0 C 270,180 430,420 500,800" 
                stroke="url(#swirl-grad-2)" 
                strokeWidth="3" 
                className="airflow-line-1"
              />
              <path 
                d="M 220,0 C 300,160 410,380 500,800" 
                stroke="url(#swirl-grad-2)" 
                strokeWidth="1.2" 
                className="airflow-line-2"
              />
              <path 
                d="M 100,0 C 200,220 460,490 500,800" 
                stroke="url(#swirl-grad-3)" 
                strokeWidth="1.5" 
                className="airflow-line-3"
              />
              <defs>
                <linearGradient id="swirl-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="swirl-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                  <stop offset="40%" stopColor="#0ea5e9" stopOpacity="0.6" />
                  <stop offset="80%" stopColor="#0284c7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="swirl-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Desktop floating cooling particles */}
          <div className="absolute inset-0 z-0 hidden md:block overflow-hidden pointer-events-none opacity-20">
            <span className="absolute top-[12%] left-[25%] text-sky-400/20 text-base animate-snow-1">❄</span>
            <span className="absolute top-[28%] left-[78%] text-sky-300/25 text-xs animate-snow-2">❄</span>
            <span className="absolute top-[52%] left-[12%] text-sky-200/20 text-xs animate-snow-3">❄</span>
            <span className="absolute top-[68%] left-[68%] text-sky-400/15 text-sm animate-snow-1" style={{ animationDelay: '-5s' }}>❄</span>
          </div>

          {/* Content Layout (Everything aligned to the start/left with max-width 360px) */}
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full flex justify-start md:justify-center pt-2 md:pt-0 animate-blur-reveal">
            <div className="w-full max-w-[360px] md:max-w-2xl flex flex-col items-start text-start md:items-center md:text-center">
              
              {/* RAHMA Estd. Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 border border-slate-200/60 shadow-sm mb-5 animate-fade-up">
                <span className="text-xs font-black tracking-wider text-primary uppercase font-plus-jakarta">
                  {language === "ar" ? "مؤسسة رحمة" : "RAHMA Estd."}
                </span>
              </div>

              {/* 30+ YEARS OF TRUST (Navy) */}
              <div className="flex flex-col items-start md:items-center gap-1 mb-6 animate-fade-up">
                <span className="text-sm font-black tracking-widest text-primary uppercase">
                  {t.yearsOfTrust}
                </span>
                <span className="w-8 h-[2px] bg-primary rounded-full" />
              </div>

              {/* Headline: Rotating Texts */}
              <h1 className="text-[32px] sm:text-4xl md:text-5xl font-black leading-[1.1] tracking-tight mb-5 min-h-[120px] md:min-h-[140px] w-full animate-fade-up">
                <span 
                  className={`inline-block transition-all duration-300 transform ${
                    textFade 
                      ? "opacity-100 translate-y-0 scale-100" 
                      : "opacity-0 -translate-y-2 scale-95"
                  }`}
                >
                  {rotatingTexts[heroTextIndex].map((part, pIdx) => (
                    <span key={pIdx} className={part.color}>
                      {part.text}
                    </span>
                  ))}
                </span>
              </h1>

              {/* Bullet list card divider styling */}
              <div className="border-s-2 md:border-s-0 border-sky-400/80 ps-4 md:ps-0 text-slate-500 font-semibold text-sm md:text-base leading-relaxed mb-12 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                {t.acBullet1}<br />
                {t.acBullet2}
              </div>

              {/* Navigation Action CTA Buttons */}
              <div className="flex flex-col gap-3.5 w-full md:max-w-xs animate-fade-up" style={{ animationDelay: '0.5s' }}>
                {/* Call Support Dial Button */}
                <button 
                  onClick={() => setShowCallModal(true)}
                  className="flex items-center justify-between p-4 bg-primary hover:bg-[#164085] text-white font-extrabold rounded-2xl w-full text-start shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-phone text-sm text-white" />
                    </div>
                    <span className="text-sm font-black tracking-wide text-white">
                      {language === "ar" ? "اتصل الآن" : "Call Now"} <span dir="ltr" className="opacity-80">056 / 050</span>
                    </span>
                  </div>
                  <i className={`fa-solid ${language === "ar" ? "fa-arrow-left" : "fa-arrow-right"} text-xs text-white/70`} />
                </button>

                {/* WhatsApp Chat Support Link */}
                <a 
                  href={whatsappLink}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between p-4 bg-primary hover:bg-[#164085] text-white rounded-2xl w-full text-start shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#25d366] flex items-center justify-center flex-shrink-0">
                      <i className="fa-brands fa-whatsapp text-white text-base" />
                    </div>
                    <span className="text-sm font-black text-white">{t.whatsAppUs}</span>
                  </div>
                  <i className={`fa-solid ${language === "ar" ? "fa-arrow-left" : "fa-arrow-right"} text-xs text-white/70`} />
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
              {t.completeAcSolutions}
            </h2>
            <div className="flex gap-1 justify-center my-3 mb-10">
              <span className="w-10 h-1 bg-primary rounded-full" />
              <span className="w-6 h-1 bg-accent rounded-full" />
            </div>
            <p className="text-slate-500 font-medium text-base mb-12">
              {t.subtext}
            </p>

            {/* Premium Dynamic Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div 
                  key={index}
                  data-service-card={index}
                  className={`group relative flex flex-row sm:flex-col items-center bg-white border rounded-2xl p-4 sm:p-6 text-start sm:text-center transition-all duration-300 overflow-hidden gap-4 sm:gap-0 ${
                    index === activeServiceIndex 
                      ? 'border-slate-300/80 shadow-md scale-[1.02]' 
                      : 'border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl sm:hover:-translate-y-2'
                  }`}
                >
                  {/* Top hover accent bar */}
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-slate-50 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-colors duration-300 hidden sm:block" />
                  
                  {/* Decorative corner glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent opacity-0 group-hover:opacity-100 rounded-tr-2xl transition-opacity duration-300 hidden sm:block" />
                  
                  {/* Styled Premium Icon Container */}
                  <div className={`relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 flex items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-300 shadow-sm ${
                    index === activeServiceIndex 
                      ? 'bg-primary text-white scale-110' 
                      : `${service.textColor || 'bg-slate-50 border border-slate-100 text-primary'} group-hover:bg-primary group-hover:text-white group-hover:scale-110`
                  }`}>
                    <i className={`${service.icon} text-lg sm:text-2xl transition-all duration-300 ${
                      index === activeServiceIndex ? 'text-white rotate-12' : 'group-hover:text-white group-hover:rotate-12'
                    }`} />
                  </div>

                  {/* Text content wrapper */}
                  <div className="flex-grow flex flex-col items-start sm:items-center">
                    <h3 className={`font-plus-jakarta font-extrabold text-primary sm:mb-2 group-hover:text-primary transition-colors text-start sm:text-center ${
                       language === "ar" ? "text-base sm:text-lg md:text-xl font-bold" : "text-sm sm:text-base"
                     }`}>
                      {service.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed sm:mb-6 text-start sm:text-center text-sm font-semibold">
                      {service.desc}
                    </p>
                  </div>
                  
                  {/* Slide-in arrow indicator */}
                  <div className="hidden sm:flex items-center justify-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-accent transition-colors duration-300 cursor-pointer">
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      {language === "ar" ? "احجز الآن" : "Book Now"}
                    </span>
                    <i className={`fa-solid ${language === "ar" ? "fa-arrow-left" : "fa-arrow-right"} text-[10px] transition-transform duration-300 group-hover:translate-x-1`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Banner Section */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative bg-primary rounded-3xl p-8 md:p-12 shadow-xl shadow-primary/10 overflow-hidden">
              {/* Background gradient design details */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-[200px] h-[200px] bg-accent/10 rounded-full blur-2xl" />

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 text-center text-white">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="flex flex-row sm:flex-col justify-center sm:justify-start items-center gap-4 sm:gap-2 group p-5 rounded-2xl hover:bg-white/8 transition-all duration-300"
                  >
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white/15 rounded-2xl group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300" style={{width:'48px',height:'48px'}}>
                      <i className={`${stat.icon} text-xl text-white`} />
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="text-xl sm:text-3xl md:text-4xl font-extrabold font-plus-jakarta tracking-tight text-white block">
                        {stat.number}
                      </div>
                      <div className="text-[11px] sm:text-xs font-bold text-white/70 uppercase tracking-wider text-center block">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="about" className="py-20 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
              {t.comfortPriority}
            </h2>
            <div className="flex gap-1 justify-center my-3 mb-10">
              <span className="w-10 h-1 bg-primary rounded-full" />
              <span className="w-6 h-1 bg-accent rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {values.map((val, index) => (
                <div 
                  key={index}
                  data-value-card={index}
                  className={`group relative flex flex-row sm:flex-col items-center bg-white border rounded-2xl p-4 sm:p-8 text-start sm:text-center transition-all duration-300 overflow-hidden gap-4 sm:gap-0 ${
                    index === activeValueIndex 
                      ? 'border-slate-300/80 shadow-md scale-[1.02]' 
                      : 'border-slate-100 hover:border-slate-200/80 shadow-sm hover:shadow-xl sm:hover:-translate-y-2'
                  }`}
                >
                  {/* Top hover accent bar */}
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-slate-50 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-colors duration-300 hidden sm:block" />
                  
                  {/* Icon Container */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center rounded-xl sm:rounded-2xl sm:mb-6 transition-all duration-300 shadow-sm ${
                    index === activeValueIndex 
                      ? 'bg-primary text-white rotate-6' 
                      : `${val.textColor || 'bg-slate-50 border border-slate-100 text-primary'} group-hover:bg-primary group-hover:text-white group-hover:rotate-6`
                  }`}>
                    <i className={`${val.icon} text-base sm:text-lg transition-colors duration-300 ${
                      index === activeValueIndex ? 'text-white' : 'group-hover:text-white'
                    }`} />
                  </div>
                  
                  {/* Text content wrapper */}
                  <div className="flex-grow flex flex-col items-start sm:items-center">
                    <h3 className={`font-plus-jakarta font-extrabold text-primary sm:mb-2 group-hover:text-primary transition-colors text-start sm:text-center ${
                       language === "ar" ? "text-base sm:text-lg md:text-xl font-bold" : "text-sm sm:text-base"
                     }`}>
                      {val.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-start sm:text-center text-sm font-semibold">
                      {val.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* A Legacy of Trust Section */}
        <section id="legacy" className="py-20 md:py-28 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            
            {/* Left Column: Rounded featured images (amjad.png on top, asgar.png below) */}
            <div className="lg:col-span-5 flex flex-col items-center text-center animate-fade-up gap-10">
              
              <h3 className="text-2xl md:text-3xl font-black text-primary leading-tight">
                {language === "ar" ? "الثقة التي بُنيت عبر السنين" : "Behind SuperCool"}
              </h3>

              {/* 1. Amjad Imam */}
              <div className="flex flex-col items-center text-center w-full max-w-sm bg-[#f8fafc]/80 hover:bg-white rounded-3xl p-5 border border-slate-100/70 hover:border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="relative w-full aspect-[4/5] rounded-[18px] overflow-hidden mb-4 shadow-sm">
                  <Image 
                    src="/images/amjad.png" 
                    alt="Amjad Imam" 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    sizes="(max-width: 768px) 100vw, 380px"
                  />
                </div>
                <div className="font-extrabold text-primary text-xl leading-tight group-hover:text-primary-light transition-colors">
                  Amjad Imam
                </div>
                <div className="text-sm font-bold text-accent mt-1">
                  {language === "ar" ? "خبرة ٣٠+ عاماً" : "30+ Years Experience"}
                </div>
                <a 
                  href="https://wa.me/966509811258"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp inline-flex items-center gap-2 mt-3 px-5 py-2.5 rounded-full bg-[#25d366] hover:bg-[#1fb955] text-white transition-all duration-300 text-xs font-black shadow-md"
                >
                  <i className="fa-brands fa-whatsapp text-base text-white" />
                  <span dir="ltr">+966 50 981 1258</span>
                </a>
              </div>

              {/* 2. Asgar Imam */}
              <div className="flex flex-col items-center text-center w-full max-w-sm bg-[#f8fafc]/80 hover:bg-white rounded-3xl p-5 border border-slate-100/70 hover:border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="relative w-full aspect-[4/5] rounded-[18px] overflow-hidden mb-4 shadow-sm">
                  <Image 
                    src="/images/asgar.png" 
                    alt="Asgar Imam" 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    sizes="(max-width: 768px) 100vw, 380px"
                  />
                </div>
                <div className="font-extrabold text-primary text-xl leading-tight group-hover:text-primary-light transition-colors">
                  Asgar Imam
                </div>
                <div className="text-sm font-bold text-accent mt-1">
                  {language === "ar" ? "خبرة ٣٠+ عاماً" : "30+ Years Experience"}
                </div>
                <a 
                  href="https://wa.me/966566706358"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp inline-flex items-center gap-2 mt-3 px-5 py-2.5 rounded-full bg-[#25d366] hover:bg-[#1fb955] text-white transition-all duration-300 text-xs font-black shadow-md"
                >
                  <i className="fa-brands fa-whatsapp text-base text-white" />
                  <span dir="ltr">+966 56 670 6358</span>
                </a>
              </div>

            </div>

            {/* Right Column: Copy & Trust Stats */}
            <div className="lg:col-span-7 flex flex-col items-start text-start lg:items-start lg:text-start animate-fade-up w-full" style={{ animationDelay: '0.2s' }}>
              {/* Subheading */}
              <p className="text-primary font-bold text-base md:text-lg leading-relaxed mb-6">
                {language === "ar" 
                  ? "نقدم حلول تكييف موثوقة في الأحساء والهفوف لأكثر من ثلاثة عقود." 
                  : "Delivering Reliable Air Conditioning Solutions Across Al\u00a0Ahsa  Al\u00a0Hofuf for More Than Three Decades."}
              </p>

              {/* Description */}
              <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed mb-8">
                {language === "ar" 
                  ? "لأكثر من ٣٠ عاماً، تلتزم سوبر كول بتقديم خدمات تركيب وصيانة المكيفات، أنظمة التكييف المركزي، تمديد أنابيب النحاس، التنظيف والإصلاح. يعكس كل مشروع التزامنا بجودة العمل والخدمة الصادقة ورضا العملاء على المدى الطويل." 
                  : "For over 30 years, SuperCool has been providing professional air conditioning installation, maintenance, central AC systems, copper piping, cleaning and repair services. Every project reflects our commitment to quality workmanship, honest service and long-term customer satisfaction."}
              </p>

              {/* Trust Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-6 border-t border-slate-100 justify-items-start">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-50 text-sky-500 border border-slate-100 flex items-center justify-center text-sm flex-shrink-0">
                    <i className="fa-solid fa-check" />
                  </div>
                  <span className="text-sm font-extrabold text-primary text-start">
                    {language === "ar" ? "٣٠+ عاماً من الخبرة" : "30+ Years Experience"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-50 text-sky-500 border border-slate-100 flex items-center justify-center text-sm flex-shrink-0">
                    <i className="fa-solid fa-check" />
                  </div>
                  <span className="text-sm font-extrabold text-primary text-start">
                    {language === "ar" ? "خدمة ١٥,٠٠٠+ عميل" : "15,000+ Clients Served"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-50 text-sky-500 border border-slate-100 flex items-center justify-center text-sm flex-shrink-0">
                    <i className="fa-solid fa-check" />
                  </div>
                  <span className="text-sm font-extrabold text-primary text-start">
                    {language === "ar" ? "أخصائيو تكييف محترفون" : "Professional AC Specialists"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-50 text-sky-500 border border-slate-100 flex items-center justify-center text-sm flex-shrink-0">
                    <i className="fa-solid fa-check" />
                  </div>
                  <span className="text-sm font-extrabold text-primary text-start">
                    {language === "ar" ? "موثوقون في الأحساء، الهفوف، والقارة" : "Trusted Across Al Ahsa, Al Hofuf & Al Qarah"}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-12 md:py-20 bg-slate-50/50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-3 md:px-6 text-center">
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
              {t.galleryTitle}
            </h2>
            <div className="flex gap-1 justify-center my-3 mb-6 md:mb-10">
              <span className="w-10 h-1 bg-primary rounded-full" />
              <span className="w-6 h-1 bg-accent rounded-full" />
            </div>

            {/* Gallery Category Filter Buttons */}
            <div className="grid grid-cols-2 gap-2 max-w-[340px] mx-auto mb-8 md:flex md:flex-wrap md:justify-center md:gap-3 md:mb-12">
              {[
                { id: "all", label: t.filterAll },
                { id: "installation", label: t.filterInstallation },
                { id: "pipes", label: t.filterPipes },
                { id: "vehicles", label: t.filterVehicles }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedGalleryCategory(filter.id)}
                  className={`px-3 py-2.5 md:px-5 md:py-2.5 rounded-full text-[11px] md:text-sm font-bold transition-all duration-300 cursor-pointer text-center whitespace-normal leading-tight flex items-center justify-center min-h-[44px] md:min-h-0 ${
                    selectedGalleryCategory === filter.id
                      ? "bg-primary text-white shadow-md shadow-primary/15 border border-primary"
                      : "bg-white text-slate-600 hover:text-primary hover:bg-slate-50 border border-slate-200/80 shadow-sm"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Desktop View: Clean 3-column balanced grid */}
            <div className="hidden md:grid md:grid-cols-3 md:gap-6 items-start">
              {(() => {
                const desktopGalleryImages = GALLERY_IMAGES.filter(
                  (item) => selectedGalleryCategory === "all" || item.category === selectedGalleryCategory
                );
                return desktopGalleryImages.map((item, idx) => {
                  const isLandscape = item.width > item.height;
                  return (
                    <div
                      key={idx}
                      className="w-full overflow-hidden rounded-xl cursor-pointer relative group"
                      onClick={() => setLightboxData({ items: desktopGalleryImages, index: idx })}
                    >
                      {item.isVideo ? (
                        <div className={`relative w-full rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center ${
                          isLandscape ? "aspect-[3/2]" : "aspect-[3/4]"
                        }`}>
                          <Image
                            src="/s3.png"
                            alt={language === "ar" ? item.altAr : item.altEn}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            sizes="(max-width: 1200px) 50vw, 33vw"
                          />
                          {/* Play button overlay */}
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-xl group-hover:scale-110 transition-all duration-300">
                              <i className="fa-solid fa-play" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={item.src}
                          alt={language === "ar" ? item.altAr : item.altEn}
                          width={item.width}
                          height={item.height}
                          className={`w-full block transition-transform duration-500 hover:scale-[1.02] rounded-xl ${
                            isLandscape ? "aspect-[3/2] object-cover" : "aspect-[3/4] object-cover"
                          }`}
                          sizes="(max-width: 1200px) 50vw, 33vw"
                          loading="lazy"
                        />
                      )}
                      {/* Hover overlay search icon */}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl pointer-events-none">
                        <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white text-sm scale-75 group-hover:scale-100 transition-all duration-300">
                          <i className={`fa-solid ${item.isVideo ? "fa-play" : "fa-magnifying-glass-plus"}`} />
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Mobile View: Dynamic grid based on orientation pairing */}
            <div className="block md:hidden grid grid-cols-2 gap-3">
              {(() => {
                const filtered = GALLERY_IMAGES.filter(
                  (item) => selectedGalleryCategory === "all" || item.category === selectedGalleryCategory
                );
                const itemsWithSpans = [];
                const itemsCopy = [...filtered];
                let i = 0;
                while (i < itemsCopy.length) {
                  const current = itemsCopy[i];
                  const isLandscape = current.width > current.height;
                  
                  if (isLandscape) {
                    itemsWithSpans.push({ ...current, colSpan: "col-span-2" });
                    i++;
                  } else {
                    let pairedIndex = -1;
                    for (let j = i + 1; j < itemsCopy.length; j++) {
                      if (itemsCopy[j].width <= itemsCopy[j].height) {
                        pairedIndex = j;
                        break;
                      }
                    }
                    
                    if (pairedIndex !== -1) {
                      const pairedItem = itemsCopy[pairedIndex];
                      itemsWithSpans.push({ ...current, colSpan: "col-span-1" });
                      itemsCopy.splice(pairedIndex, 1);
                      itemsWithSpans.push({ ...pairedItem, colSpan: "col-span-1" });
                      i++;
                    } else {
                      itemsWithSpans.push({ ...current, colSpan: "col-span-2" });
                      i++;
                    }
                  }
                }

                return itemsWithSpans.map((item, idx) => (
                  <div
                    key={idx}
                    className={`overflow-hidden rounded-xl cursor-pointer relative group ${item.colSpan}`}
                    onClick={() => setLightboxData({ items: itemsWithSpans, index: idx })}
                  >
                    {item.isVideo ? (
                      <div className={`relative w-full rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center ${
                        item.colSpan === "col-span-1" ? "aspect-[3/4]" : "aspect-[3/2] h-[200px]"
                      }`}>
                        <Image
                          src="/s3.png"
                          alt={language === "ar" ? item.altAr : item.altEn}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          sizes={item.colSpan === "col-span-2" ? "100vw" : "50vw"}
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-base group-hover:scale-110 transition-all duration-300">
                            <i className="fa-solid fa-play" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={item.src}
                        alt={language === "ar" ? item.altAr : item.altEn}
                        width={item.width}
                        height={item.height}
                        className={`w-full block rounded-xl transition-transform duration-500 hover:scale-[1.02] ${
                          item.colSpan === "col-span-1" ? "aspect-[3/4] object-cover" : "h-auto object-cover"
                        }`}
                        sizes={item.colSpan === "col-span-2" ? "100vw" : "50vw"}
                        loading="lazy"
                      />
                    )}
                  </div>
                ));
              })()}
            </div>

          </div>
        </section>



        {/* Call To Action Section - Using boy.png for NEED AC SERVICE */}
        <section id="contact" className="py-16 md:py-24 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-6 pt-10 md:pt-16">
            <div className="relative bg-primary rounded-3xl shadow-xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left/Right Column: Technician visual (using boy.png) based on RTL/LTR layout */}
              <div className={`lg:col-span-5 relative min-h-[320px] lg:min-h-full ${language === "ar" ? "lg:order-last" : ""}`}>
                <img 
                  src="/images/boy.png" 
                  alt="Super Cool Friendly Technician"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto h-[120%] max-w-none object-contain object-bottom z-10"
                />
              </div>

              {/* Right/Left Column: CTA content */}
              <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-white">
                <span className="text-sky-400 font-bold uppercase tracking-widest text-xs mb-3">
                  {t.needAcService}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-plus-jakarta leading-tight mb-4">
                  {t.callAway}
                </h2>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg mb-8">
                  {t.ctaDesc}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                  <button 
                    onClick={() => setShowCallModal(true)}
                    className="flex items-center justify-center gap-3 px-7 py-4 bg-white text-primary font-extrabold rounded-full hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-black/10 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-phone text-primary text-sm" />
                    </div>
                    <span>{t.callSupportLines}</span>
                  </button>
                  <a 
                    href={whatsappLink}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-whatsapp flex items-center justify-center gap-2.5 px-7 py-4 bg-[#25d366] hover:bg-[#1fb955] text-white font-extrabold rounded-full transition-all duration-300 shadow-xl shadow-black/10 hover:-translate-y-0.5"
                  >
                    <i className="fa-brands fa-whatsapp text-white text-xl" />
                    <span>{t.whatsAppUs}</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Service Area Map Section */}
        <section className="py-10 bg-slate-50/30 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="w-full h-[320px] md:h-[420px] rounded-3xl overflow-hidden shadow-lg border border-slate-100 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115162.2471644783!2d49.529815049511115!3d25.377317772714073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e37f7a1f5dc0f89%3A0xf63989c6807eb326!2sAl%20Hofuf%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SuperCool Service Area Map"
                className="filter contrast-[1.05]"
              />
            </div>
          </div>
        </section>

      </main>

      {/* Footer Info Bar */}
      <footer className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo element on the left */}
          <div className="flex items-center">
            <div className="relative w-80 h-40">
              <Image src="/images/l2.png" alt="Super Cool Logo symbol" fill className="object-contain brightness-0 invert" sizes="320px" />
            </div>
          </div>

          {/* Core Info Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm text-white/80 font-medium">
            <div className="flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap">
              <i className="fa-solid fa-location-dot text-white/60" />
              <span>{t.location}</span>
            </div>
            <div className="hidden sm:block w-[1px] h-3.5 bg-white/20" />
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-envelope text-white/60" />
              <a href="mailto:supercoolalhasa.acservices@gmail.com" className="hover:text-accent hover:underline text-white">
                supercoolalhasa.acservices@gmail.com
              </a>
            </div>
          </div>

          {/* Copyright text */}
          <span className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {t.copyright}
          </span>
        </div>
      </footer>

      {/* Call Lines Modal Dialog */}
      {showCallModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-slate-100 flex flex-col items-center animate-pulse-slow">
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
        aria-label="Scroll to top of the page"
      >
        <i className="fa-solid fa-chevron-up text-sm" />
      </button>

      <Lightbox
        items={lightboxData.items}
        activeIndex={lightboxData.index}
        onClose={() => setLightboxData({ items: [], index: null })}
      />
    </div>
  );
}
