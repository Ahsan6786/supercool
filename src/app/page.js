"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import Lightbox from "@/components/Lightbox";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import CustomerRegisterForm from "@/components/CustomerRegisterForm";

const GALLERY_IMAGES = [
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
  },
  {
    src: "/w1.png",
    category: "installation",
    altEn: "Super Cool AC installation project Al Ahsa",
    altAr: "مشروع تركيب مكيفات سوبر كول في الأحساء",
    width: 1080,
    height: 1440
  },
  {
    src: "/w2.png",
    category: "installation",
    altEn: "Professional split AC mounting Al Hofuf",
    altAr: "تركيب مكيفات سبلت احترافي في الهفوف",
    width: 1080,
    height: 1440
  },
  {
    src: "/w4.png",
    category: "installation",
    altEn: "AC unit installation & outdoor mounting Al Ahsa",
    altAr: "تركيب وتثبيت مكيفات خارجية في الأحساء",
    width: 1080,
    height: 1440
  },
  {
    src: "/w5.png",
    category: "installation",
    altEn: "Completed AC installation work Super Cool",
    altAr: "أعمال تركيب مكيفات مكتملة من سوبر كول",
    width: 1080,
    height: 1440
  },
  {
    src: "/w6.png",
    category: "installation",
    altEn: "AC unit installation & indoor mounting Al Ahsa",
    altAr: "تركيب مكيفات دقيقة داخلية في الأحساء",
    width: 1080,
    height: 1440
  },
  {
    src: "/w7.png",
    category: "installation",
    altEn: "Professional AC installation project Super Cool",
    altAr: "مشروع تركيب مكيفات متكامل في الأحساء",
    width: 1080,
    height: 1440
  },
  {
    src: "/w10.png",
    category: "installation",
    altEn: "Super Cool AC installation project Al Ahsa",
    altAr: "مشروع تركيب مكيفات سوبر كول في الأحساء",
    width: 1080,
    height: 1440
  },
  {
    src: "/w11.png",
    category: "installation",
    altEn: "Professional split AC mounting Al Hofuf",
    altAr: "تركيب مكيفات سبلت احترافي في الهفوف",
    width: 1080,
    height: 1440
  },
  {
    src: "/w12.png",
    category: "installation",
    altEn: "AC unit installation & outdoor mounting Al Ahsa",
    altAr: "تركيب وتثبيت مكيفات خارجية في الأحساء",
    width: 1080,
    height: 1440
  },
  {
    src: "/w13.png",
    category: "installation",
    altEn: "Completed AC installation work Super Cool",
    altAr: "أعمال تركيب مكيفات مكتملة من سوبر كول",
    width: 1080,
    height: 1440
  },
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
  }
];

export default function Home() {
  const { language, setLanguage, t, whatsappLink } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showCallModal, setShowCallModal] = useState(false);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState("all");
  
  // States for Splash Screen & Language Popup
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
      { text: "Al\u00a0Ahsa, Al\u00a0Hofuf.", color: "text-accent" }
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

    const fadeTimer = setTimeout(() => {
      setSplashFade(true);
    }, 1500);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
      setShowLangPopup(true);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Track scroll position
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
      const scrollPosition = window.scrollY + 200;
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

  // Mobile scroll-to-hover card trigger
  useEffect(() => {
    const handleScrollHover = () => {
      if (window.innerWidth >= 768) return;
      const viewportCenter = window.innerHeight / 2;

      // Service Cards
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

      // Value Cards
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
      title: t.valCustTitle,
      desc: t.valCustDesc,
      icon: "fa-solid fa-smile",
      textColor: "bg-blue-50/60 border-blue-100 text-blue-500",
    },
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
  ];

  return (
    <div className={`flex flex-col min-h-screen overflow-x-hidden ${language === "ar" ? "font-sans text-right" : "text-left"}`}>
      
      {/* Splash Screen */}
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

      {/* Language Choice Popup */}
      {showLangPopup && (
        <div className="fixed inset-0 z-[998] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border border-slate-100/50 flex flex-col items-center">
            <div className="relative w-16 h-16 mb-4">
              <Image src="/images/logo.png" alt="Super Cool Logo symbol" fill className="object-contain" sizes="64px" />
            </div>

            <h3 className="font-plus-jakarta font-extrabold text-2xl text-primary mb-1">
              Choose Language
            </h3>
            <h3 className="font-plus-jakarta font-extrabold text-xl text-accent mb-4">
              اختر اللغة
            </h3>
            
            <p className="text-sm text-slate-500 mb-6 max-w-xs leading-relaxed">
              Please choose a language to continue to the website.<br />
              يرجى اختيار اللغة للمتابعة للموقع.
            </p>

            <div className="grid grid-cols-2 gap-4 w-full">
              <button 
                onClick={() => {
                  setLanguage("en");
                  setShowLangPopup(false);
                }}
                className="py-3.5 bg-primary hover:bg-primary-light text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-base sm:text-lg font-plus-jakarta"
              >
                English
              </button>
              <button 
                onClick={() => {
                  setLanguage("ar");
                  setShowLangPopup(false);
                }}
                className="py-3.5 bg-accent hover:bg-accent-hover text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-base sm:text-lg font-plus-jakarta"
              >
                العربية
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header / Navbar */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-2.5" 
            : "bg-white/80 backdrop-blur-sm border-b border-slate-100/50 py-3.5"
        }`}
      >
        {/* Desktop Header */}
        <div className="hidden md:flex max-w-7xl mx-auto px-4 sm:px-6 md:px-8 items-center justify-between w-full">
          <a href="#home" className="flex items-center group">
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

          {/* Action Buttons & Language Switcher */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-sm font-extrabold text-slate-700 cursor-pointer transition-colors"
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
        <div className="flex md:hidden items-center justify-between w-full px-4 sm:px-6">
          <a href="#home" className="flex items-center group">
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

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/60 hover:bg-slate-100 text-xs font-black text-slate-700 cursor-pointer transition-all duration-200 leading-none"
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
        
        {/* Hero Section - Exactly 100% Viewport Height With Header */}
        <section id="home" className="relative min-h-[calc(100dvh-64px)] md:min-h-[calc(100vh-80px)] pt-1 sm:pt-2 md:pt-4 pb-12 sm:pb-16 md:pb-20 flex items-center justify-center bg-white overflow-hidden border-b border-slate-100/80">
          
          {/* Mobile Background Image */}
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

          {/* Content Layout - Shifted Further Upwards */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full flex justify-start -mt-8 sm:-mt-12 md:-mt-16 animate-blur-reveal">
            <div className="w-full max-w-xl md:max-w-3xl flex flex-col items-start text-start">
              
              {/* RAHMA Estd. Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 border border-slate-200/60 shadow-sm mb-2.5 sm:mb-3.5 animate-fade-up">
                <span className="text-xs font-black tracking-wider text-primary uppercase font-plus-jakarta">
                  {language === "ar" ? "مؤسسة رحمة" : "RAHMA Estd."}
                </span>
              </div>

              {/* 30+ YEARS OF TRUST */}
              <div className="flex flex-col items-start gap-1 mb-3.5 sm:mb-4 animate-fade-up">
                <span className="text-xs sm:text-sm font-black tracking-widest text-primary uppercase">
                  {t.yearsOfTrust}
                </span>
                <span className="w-8 h-[2px] bg-primary rounded-full" />
              </div>

              {/* Headline: Rotating Texts */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black leading-[1.15] tracking-tight mb-3 sm:mb-4 min-h-[85px] sm:min-h-[110px] md:min-h-[120px] w-full text-start animate-fade-up">
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

              {/* Bullet list subtext */}
              <div className="text-slate-500 font-semibold text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-7 max-w-xl text-start animate-fade-up" style={{ animationDelay: '0.4s' }}>
                {t.acBullet1}<br />
                {t.acBullet2}
              </div>

              {/* Navigation Action CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 w-full max-w-md sm:max-w-lg justify-start animate-fade-up mb-2 sm:mb-4" style={{ animationDelay: '0.5s' }}>
                {/* Call Support Dial Button */}
                <button 
                  onClick={() => setShowCallModal(true)}
                  className="flex-1 flex items-center justify-between p-3.5 sm:p-4 bg-primary hover:bg-[#164085] text-white font-extrabold rounded-2xl text-start shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-phone text-sm text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-black tracking-wide text-white">
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
                  className="flex-1 flex items-center justify-between p-3.5 sm:p-4 bg-primary hover:bg-[#164085] text-white rounded-2xl text-start shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#25d366] flex items-center justify-center flex-shrink-0">
                      <i className="fa-brands fa-whatsapp text-white text-base" />
                    </div>
                    <span className="text-xs sm:text-sm font-black text-white">{t.whatsAppUs}</span>
                  </div>
                  <i className={`fa-solid ${language === "ar" ? "fa-arrow-left" : "fa-arrow-right"} text-xs text-white/70`} />
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* Separate Independent Services Section Below Hero */}
        <section id="services" className="py-16 md:py-24 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary">
              {t.completeAcSolutions}
            </h2>
            <div className="flex gap-1 justify-center my-3 mb-8 md:mb-10">
              <span className="w-10 h-1 bg-primary rounded-full" />
              <span className="w-6 h-1 bg-accent rounded-full" />
            </div>
            <p className="text-slate-500 font-semibold text-xs sm:text-sm md:text-base max-w-2xl mx-auto mb-10 md:mb-12">
              {t.subtext}
            </p>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
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
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-slate-50 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-colors duration-300 hidden sm:block" />
                  
                  <div className={`relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 flex items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-300 shadow-sm ${
                    index === activeServiceIndex 
                      ? 'bg-primary text-white scale-110' 
                      : `${service.textColor || 'bg-slate-50 border border-slate-100 text-primary'} group-hover:bg-primary group-hover:text-white group-hover:scale-110`
                  }`}>
                    <i className={`${service.icon} text-lg sm:text-2xl transition-all duration-300 ${
                      index === activeServiceIndex ? 'text-white rotate-12' : 'group-hover:text-white group-hover:rotate-12'
                    }`} />
                  </div>

                  <div className="flex-grow flex flex-col items-start sm:items-center">
                    <h3 className={`font-plus-jakarta font-extrabold text-primary sm:mb-2 group-hover:text-primary transition-colors text-start sm:text-center ${
                       language === "ar" ? "text-base sm:text-lg md:text-xl font-bold" : "text-sm sm:text-base md:text-lg"
                     }`}>
                      {service.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed sm:mb-6 text-start sm:text-center text-xs sm:text-sm font-semibold">
                      {service.desc}
                    </p>
                  </div>
                  
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

        {/* Dedicated Book a Service Section */}
        <section id="book-service" className="py-14 sm:py-18 bg-slate-50/60 border-t border-slate-100">
          <div className="max-w-xl md:max-w-2xl mx-auto px-4 sm:px-6">
            <LeadCaptureForm />
          </div>
        </section>

        {/* Stats Banner Section */}
        <section className="bg-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="relative bg-primary rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl shadow-primary/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-[200px] h-[200px] bg-accent/10 rounded-full blur-2xl" />

              <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center text-white">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center justify-center gap-2 p-3 sm:p-5 rounded-2xl hover:bg-white/8 transition-all duration-300"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center bg-white/15 rounded-2xl group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                      <i className={`${stat.icon} text-base sm:text-xl text-white`} />
                    </div>
                    <div className="flex flex-col items-center gap-0.5 text-center">
                      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold font-plus-jakarta tracking-tight text-white block">
                        {stat.number}
                      </div>
                      <div className="text-[10px] sm:text-xs font-bold text-white/80 uppercase tracking-wider text-center block">
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
        <section id="about" className="py-16 md:py-24 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary">
              {t.comfortPriority}
            </h2>
            <div className="flex gap-1 justify-center my-3 mb-8 md:mb-10">
              <span className="w-10 h-1 bg-primary rounded-full" />
              <span className="w-6 h-1 bg-accent rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-8 md:mt-12">
              {values.map((val, index) => (
                <div 
                  key={index}
                  data-value-card={index}
                  className={`group relative flex flex-row sm:flex-col items-center bg-white border rounded-2xl p-4 sm:p-6 md:p-8 text-start sm:text-center transition-all duration-300 overflow-hidden gap-4 sm:gap-0 ${
                    index === activeValueIndex 
                      ? 'border-slate-300/80 shadow-md scale-[1.02]' 
                      : 'border-slate-100 hover:border-slate-200/80 shadow-sm hover:shadow-xl sm:hover:-translate-y-2'
                  }`}
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-slate-50 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-colors duration-300 hidden sm:block" />
                  
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center rounded-xl sm:rounded-2xl sm:mb-6 transition-all duration-300 shadow-sm ${
                    index === activeValueIndex 
                      ? 'bg-primary text-white rotate-6' 
                      : `${val.textColor || 'bg-slate-50 border border-slate-100 text-primary'} group-hover:bg-primary group-hover:text-white group-hover:rotate-6`
                  }`}>
                    <i className={`${val.icon} text-base sm:text-lg transition-colors duration-300 ${
                      index === activeValueIndex ? 'text-white' : 'group-hover:text-white'
                    }`} />
                  </div>
                  
                  <div className="flex-grow flex flex-col items-start sm:items-center">
                    <h3 className={`font-plus-jakarta font-extrabold text-primary sm:mb-2 group-hover:text-primary transition-colors text-start sm:text-center ${
                       language === "ar" ? "text-base sm:text-lg font-bold" : "text-sm sm:text-base font-bold"
                      }`}>
                      {val.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-start sm:text-center text-xs sm:text-sm font-semibold">
                      {val.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FULLY RESPONSIVE OWNER PHOTOS & LEGACY OF TRUST SECTION */}
        <section id="legacy" className="py-16 md:py-24 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full flex flex-col gap-10 md:gap-14">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary leading-tight mb-2">
                {language === "ar" ? "الثقة التي بُنيت عبر السنين" : "Behind SuperCool"}
              </h2>
              <div className="flex gap-1 justify-center my-3 mb-4">
                <span className="w-10 h-1 bg-primary rounded-full" />
                <span className="w-6 h-1 bg-accent rounded-full" />
              </div>
              <p className="text-slate-500 font-semibold text-xs sm:text-sm md:text-base leading-relaxed">
                {language === "ar" 
                  ? "لأكثر من ٣٠ عاماً، نلتزم بتقديم أفضل خدمات التكييف برعاية كادرنا الإداري والفني المعتمد." 
                  : "Dedicated leadership with over 30 years of hands-on expertise serving homes and businesses across Al Ahsa."}
              </p>
            </div>

            {/* Responsive 2-Column Grid (Owners Side-by-Side on Tablet/Desktop) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              
              {/* Owner Cards Container (Side-by-side on sm/md/lg) */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 w-full">
                
                {/* 1. Amjad Imam */}
                <div className="flex flex-col items-center text-center w-full bg-[#f8fafc] hover:bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-4 shadow-sm bg-slate-100">
                    <Image 
                      src="/images/amjad.png" 
                      alt="Amjad Imam - SuperCool Founder" 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                  </div>
                  <div className="font-extrabold text-primary text-lg sm:text-xl leading-tight group-hover:text-primary-light transition-colors">
                    Amjad Imam
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-accent mt-1">
                    {language === "ar" ? "خبرة ٣٠+ عاماً" : "30+ Years Experience"}
                  </div>
                  <a 
                    href="https://wa.me/966509811258"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp inline-flex items-center gap-2 mt-3.5 px-4 py-2.5 rounded-full bg-[#25d366] hover:bg-[#1fb955] text-white transition-all duration-300 text-xs font-black shadow-md w-full justify-center"
                  >
                    <i className="fa-brands fa-whatsapp text-sm text-white" />
                    <span dir="ltr">+966 50 981 1258</span>
                  </a>
                </div>

                {/* 2. Asgar Imam */}
                <div className="flex flex-col items-center text-center w-full bg-[#f8fafc] hover:bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-4 shadow-sm bg-slate-100">
                    <Image 
                      src="/images/asgar.png" 
                      alt="Asgar Imam - SuperCool Technical Director" 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                  </div>
                  <div className="font-extrabold text-primary text-lg sm:text-xl leading-tight group-hover:text-primary-light transition-colors">
                    Asgar Imam
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-accent mt-1">
                    {language === "ar" ? "خبرة ٣٠+ عاماً" : "30+ Years Experience"}
                  </div>
                  <a 
                    href="https://wa.me/966566706358"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp inline-flex items-center gap-2 mt-3.5 px-4 py-2.5 rounded-full bg-[#25d366] hover:bg-[#1fb955] text-white transition-all duration-300 text-xs font-black shadow-md w-full justify-center"
                  >
                    <i className="fa-brands fa-whatsapp text-sm text-white" />
                    <span dir="ltr">+966 56 670 6358</span>
                  </a>
                </div>

              </div>

              {/* Story Column */}
              <div className="lg:col-span-6 flex flex-col items-start text-start animate-fade-up w-full">
                <p className="text-primary font-bold text-base sm:text-lg md:text-xl leading-relaxed mb-4">
                  {language === "ar" 
                    ? "نقدم حلول تكييف موثوقة في الأحساء والهفوف لأكثر من ثلاثة عقود." 
                    : "Delivering Reliable Air Conditioning Solutions Across Al\u00a0Ahsa, Al\u00a0Hofuf for More Than Three Decades."}
                </p>

                <p className="text-slate-500 font-medium text-xs sm:text-sm md:text-base leading-relaxed mb-6">
                  {language === "ar" 
                    ? "لأكثر من ٣٠ عاماً، تلتزم سوبر كول بتقديم خدمات تركيب وصيانة المكيفات، أنظمة التكييف المركزي، تمديد أنابيب النحاس، التنظيف والإصلاح. يعكس كل مشروع التزامنا بجودة العمل والخدمة الصادقة ورضا العملاء على المدى الطويل." 
                    : "For over 30 years, SuperCool has been providing professional air conditioning installation, maintenance, central AC systems, copper piping, cleaning and repair services. Every project reflects our commitment to quality workmanship, honest service and long-term customer satisfaction."}
                </p>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-primary border border-blue-100 flex items-center justify-center text-xs flex-shrink-0">
                      <i className="fa-solid fa-check" />
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-primary">
                      {language === "ar" ? "٣٠+ عاماً من الخبرة" : "30+ Years Experience"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-primary border border-blue-100 flex items-center justify-center text-xs flex-shrink-0">
                      <i className="fa-solid fa-check" />
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-primary">
                      {language === "ar" ? "خدمة ١٥,٠٠٠+ عميل" : "15,000+ Clients Served"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-primary border border-blue-100 flex items-center justify-center text-xs flex-shrink-0">
                      <i className="fa-solid fa-check" />
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-primary">
                      {language === "ar" ? "أخصائيو تكييف محترفون" : "Professional AC Specialists"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-primary border border-blue-100 flex items-center justify-center text-xs flex-shrink-0">
                      <i className="fa-solid fa-check" />
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-primary">
                      {language === "ar" ? "تغطية شاملة في الأحساء" : "Full Al Ahsa Coverage"}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-16 md:py-24 bg-slate-50/50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary">
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
                  className={`px-3 py-2.5 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer text-center whitespace-normal leading-tight flex items-center justify-center min-h-[44px] md:min-h-0 ${
                    selectedGalleryCategory === filter.id
                      ? "bg-primary text-white shadow-md shadow-primary/15 border border-primary"
                      : "bg-white text-slate-600 hover:text-primary hover:bg-slate-50 border border-slate-200/80 shadow-sm"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Desktop View Grid */}
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

            {/* Mobile View Grid */}
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

        {/* Existing Customer Registration Section */}
        <CustomerRegisterForm />

        {/* Call To Action Section - 3D Pop-Out Mobile & Responsive Styling */}
        <section id="contact" className="pt-20 sm:pt-28 pb-16 md:pb-24 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="relative bg-primary rounded-3xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-center">
              
              {/* Technician Column with 3D Cap Pop-Out above card top edge */}
              <div className={`lg:col-span-5 relative h-[240px] sm:h-[300px] lg:h-[400px] w-full flex items-end justify-center ${language === "ar" ? "lg:order-last" : ""}`}>
                <img 
                  src="/images/boy.png" 
                  alt="Super Cool Friendly Technician"
                  className="absolute -top-12 sm:-top-16 lg:-top-20 bottom-0 left-1/2 -translate-x-1/2 h-[290px] sm:h-[370px] lg:h-[480px] w-auto max-w-none object-contain object-bottom z-20 drop-shadow-2xl"
                />
              </div>

              {/* CTA Content Column - Explicit Requested Text & Prominent Buttons */}
              <div className="lg:col-span-7 p-6 sm:p-8 md:p-12 lg:p-14 flex flex-col justify-center text-white z-20">
                <span className="text-sky-400 font-bold uppercase tracking-widest text-xs sm:text-sm mb-2 sm:mb-3">
                  {language === "ar" ? "اتصل بنا" : "CONTACT"}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-plus-jakarta leading-tight mb-3 sm:mb-4 text-white">
                  {language === "ar" ? "اتصل بنا في أي وقت!" : "Call Us Anytime!"}
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg mb-6 sm:mb-8 font-medium">
                  {language === "ar" ? "هل تحتاج إلى تركيب أو تنظيف أو إصلاح المكيف؟ اتصل بفريقنا للحصول على خدمة سريعة." : "Need AC install, cleaning, or repair? Call our team for fast service."}
                </p>

                {/* Original High Contrast Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center">
                  <button 
                    onClick={() => setShowCallModal(true)}
                    className="flex items-center justify-center gap-3 px-6 py-3.5 sm:py-4 bg-white hover:bg-slate-50 text-primary font-extrabold rounded-full transition-all duration-300 shadow-xl shadow-black/10 cursor-pointer text-xs sm:text-sm active:scale-[0.98]"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-phone text-primary text-xs sm:text-sm" />
                    </div>
                    <span className="truncate">{t.callSupportLines}</span>
                  </button>
                  <a 
                    href={whatsappLink}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-whatsapp flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 bg-[#25d366] hover:bg-[#1fb955] text-white font-extrabold rounded-full transition-all duration-300 shadow-xl shadow-black/10 text-xs sm:text-sm active:scale-[0.98]"
                  >
                    <i className="fa-brands fa-whatsapp text-white text-lg sm:text-xl flex-shrink-0" />
                    <span className="truncate">{t.whatsAppUs}</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Service Area Map Section */}
        <section className="py-10 bg-slate-50/30 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="w-full h-[280px] sm:h-[350px] md:h-[420px] rounded-3xl overflow-hidden shadow-lg border border-slate-100 relative">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <div className="relative w-64 sm:w-80 h-24 sm:h-32">
              <Image src="/images/l2.png" alt="Super Cool Logo symbol" fill className="object-contain brightness-0 invert" sizes="(max-width: 640px) 256px, 320px" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-xs sm:text-sm text-white/80 font-semibold text-center">
            <div className="flex items-center gap-2 whitespace-nowrap">
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

          <span className="text-xs text-white/50 text-center">
            &copy; {new Date().getFullYear()} {t.copyright}
          </span>
        </div>
      </footer>

      {/* Call Lines Modal Dialog */}
      {showCallModal && (
        <div 
          onClick={() => setShowCallModal(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border border-slate-100 flex flex-col items-center animate-scale-up"
          >
            {/* Top-Right Close Button */}
            <button
              onClick={() => setShowCallModal(false)}
              className="absolute top-4 end-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <i className="fa-solid fa-xmark text-base" />
            </button>

            <div className="w-14 h-14 bg-primary/5 text-primary rounded-full flex items-center justify-center text-xl mb-3 mt-1">
              <i className="fa-solid fa-phone-volume" />
            </div>
            <h3 className="font-plus-jakarta font-extrabold text-xl text-primary mb-1.5">
              {t.modalTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              {t.modalDesc}
            </p>
            <div className="flex flex-col gap-3 w-full">
              <a 
                href="tel:0566706358"
                className="flex items-center justify-center gap-3 py-3.5 bg-primary hover:bg-primary-light text-white font-bold rounded-xl shadow-md transition-all duration-200 text-sm"
              >
                <i className="fa-solid fa-phone" />
                <span dir="ltr">056 670 6358</span>
              </a>
              <a 
                href="tel:0509811258"
                className="flex items-center justify-center gap-3 py-3.5 bg-slate-100 hover:bg-slate-200 text-primary font-bold rounded-xl transition-all duration-200 text-sm"
              >
                <i className="fa-solid fa-phone" />
                <span dir="ltr">050 981 1258</span>
              </a>
            </div>
            <button 
              onClick={() => setShowCallModal(false)}
              className="w-full mt-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-xl transition-colors cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-xmark text-sm" />
              <span>{language === "ar" ? "إغلاق النافذة" : "Close Window"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 end-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-xl border border-white/10 hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-300 transform cursor-pointer ${
          scrolled ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-75 pointer-events-none"
        }`}
        aria-label="Scroll to top of the page"
      >
        <i className="fa-solid fa-chevron-up text-xs sm:text-sm" />
      </button>

      <Lightbox
        items={lightboxData.items}
        activeIndex={lightboxData.index}
        onClose={() => setLightboxData({ items: [], index: null })}
      />
    </div>
  );
}
