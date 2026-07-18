"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const content = {
  en: {
    navHome: "Home",
    navAbout: "About Us",
    navServices: "Services",
    navContact: "Contact Us",
    callSupport: "Call Support",
    callSupportLines: "Call Support Lines",
    whatsappSupport: "WhatsApp",
    servingBadge: "Serving Al Ahsa for 30+ Years",
    badgeTop: "Serving Al\u00a0Ahsa  Al\u00a0Hofuf",
    badgeBottom: "30+ Years Experience",
    heroTitle1: "Quality AC Services,",
    heroTitle2: "Every Season.",
    heroDesc: "Quality AC installation, repair, and cleaning for homes and businesses.",
    heroDescNew: "Quality AC Installation, Repair, Cleaning & Copper Piping.",
    trust1: "30+ Years",
    trust2: "Fast Service",
    trust3: "Home & Business",
    trust4: "Al\u00a0Ahsa  Al\u00a0Hofuf",
    est1989: "EST. 1989",
    yearsOfTrust: "30+ YEARS OF SERVICE",
    cooling: "Cooling",
    yourWorld: "Your World.",
    proAcServices: "Quality AC Services",
    youCan: "You Can",
    relyOn: "Rely On.",
    acBullet1: "AC Repair, Cleaning, Piping",
    acBullet2: "and Installation.",
    pillInstall: "Installation",
    pillMaint: "Maintenance",
    pillClean: "Cleaning",
    pillPiping: "Piping",
    pillCentral: "Central AC",
    callNow: "Call Now 056 / 050",
    whatsAppUs: "WhatsApp Us",
    ourServices: "SERVICES",
    completeAcSolutions: "Our AC Services",
    subtext: "Fast and Reliable.",
    installTitle: "AC Installation",
    installDesc: "We install all types of AC units quickly and correctly.",
    repairTitle: "AC Repair",
    repairDesc: "Quick repair for all brands of ACs.",
    cleaningTitle: "AC Cleaning",
    cleaningDesc: "Deep wash for clean air and better cooling.",
    maintenanceTitle: "AC Maintenance",
    maintenanceDesc: "Regular checkups to save power and avoid leaks.",
    pipingTitle: "AC Piping",
    pipingDesc: "Quality copper pipes and leak fixes.",
    homeServiceTitle: "Home Service",
    homeServiceDesc: "AC repair at your home anytime.",
    statExpVal: "30+",
    statExpLabel: "Years Experience",
    statCustVal: "15000+",
    statCustLabel: "Customers Served",
    statServingVal: "Al\u00a0Ahsa  Al\u00a0Hofuf",
    statServingLabel: "Proudly Serving",
    statEmergencyVal: "24/7",
    statEmergencyLabel: "Emergency Service",
    whyChooseUs: "ABOUT US",
    comfortPriority: "Why Choose Us",
    valTechTitle: "Expert Team",
    valTechDesc: "Trained workers with modern tools.",
    valRespTitle: "Fast Service",
    valRespDesc: "Quick service in Al\u00a0Ahsa  Al\u00a0Hofuf.",
    valQualTitle: "Best Quality",
    valQualDesc: "High quality work and happy customers.",
    valPriceTitle: "Good Prices",
    valPriceDesc: "Fair prices with no hidden fees.",
    needAcService: "CONTACT",
    callAway: "Call Us Anytime!",
    ctaDesc: "Need AC install, cleaning, or repair? Call our team for fast service.",
    location: "Al Ahsa, Hofuf, Saudi Arabia",
    openHours: "Open 24/7",
    copyright: "SuperCool. All rights reserved.",
    modalTitle: "Call SuperCool",
    modalDesc: "Click a number to call our AC service team:",
    cancel: "Cancel",
    galleryTitle: "Our Work",
    gallerySubtitle: "GALLERY",
    filterAll: "All",
    filterInstallation: "AC Installation",
    filterPipes: "Copper Pipes",
    filterVehicles: "Our Vehicles"
  },
  ar: {
    navHome: "الرئيسية",
    navAbout: "من نحن",
    navServices: "خدماتنا",
    navContact: "اتصل بنا",
    callSupport: "اتصل بالدعم",
    callSupportLines: "أرقام الاتصال بالدعم",
    whatsappSupport: "راسلنا عبر الواتساب",
    servingBadge: "نخدم الأحساء، الهفوف، والقارة منذ 30+ عاماً",
    badgeTop: "نخدم الأحساء، الهفوف، والقارة",
    badgeBottom: "٣٠+ عاماً من الخبرة الموثوقة",
    heroTitle1: "تبريد عالمك،",
    heroTitle2: "في كل الفصول.",
    heroDesc: "خدمات احترافية لتركيب وصيانة وإصلاح التكييف للمنازل والمكاتب والمنشآت التجارية.",
    heroDescNew: "تركيب وصيانة وتنظيف المكيفات، أنظمة التكييف المركزي، وتمديد أنابيب النحاس للمنازل والمشاريع التجارية.",
    trust1: "٣٠+ عاماً",
    trust2: "استجابة سريعة",
    trust3: "سكني وتجاري",
    trust4: "الأحساء، الهفوف، والقارة",
    est1989: "تأسس عام ١٩٨٩",
    yearsOfTrust: "٣٠+ عاماً من الثقة",
    cooling: "تبريد",
    yourWorld: "عالمك.",
    proAcServices: "خدمات تكييف احترافية",
    youCan: "يمكنك",
    relyOn: "الاعتماد عليها.",
    acBullet1: "صيانة، غسيل، وتمديد أنابيب",
    acBullet2: "خدمات التكييف المتكاملة وأكثر.",
    pillInstall: "تركيب المكيفات",
    pillMaint: "صيانة المكيفات",
    pillClean: "تنظيف المكيفات",
    pillPiping: "تمديد أنابيب النحاس",
    pillCentral: "تكييف مركزي",
    callNow: "اتصل الآن 056 / 050",
    whatsAppUs: "راسلنا عبر الواتساب",
    ourServices: "خدماتنا",
    completeAcSolutions: "حلول تكييف متكاملة",
    subtext: "خدمة موثوقة • استجابة سريعة • أسعار منافسة",
    installTitle: "تركيب المكيفات",
    installDesc: "تركيب احترافي لجميع أنواع المكيفات لضمان أفضل أداء منذ اليوم الأول.",
    repairTitle: "إصلاح المكيفات",
    repairDesc: "صيانة وإصلاح أعطال المكيفات لجميع الماركات بقطع غيار أصلية.",
    cleaningTitle: "تنظيف المكيفات",
    cleaningDesc: "تنظيف عميق بأحدث المضخات لضمان هواء نقي خالي من الأتربة وقوة دفع مثالية.",
    maintenanceTitle: "صيانة المكيفات",
    maintenanceDesc: "فحص وصيانة دورية لإطالة عمر الجهاز وتفادي الأعطال المفاجئة وتوفير الكهرباء.",
    pipingTitle: "تمديد أنابيب النحاس",
    pipingDesc: "تركيب احترافي وتغليف لأنابيب النحاس وإصلاح التسريبات لمكيفات الاسبليت والمركزية.",
    homeServiceTitle: "خدمات منزلية",
    homeServiceDesc: "تشخيص في الموقع، فحص التبريد، وإصلاح المكيفات المنزلية عند باب بيتك.",
    statExpVal: "30+",
    statExpLabel: "عاماً من الخبرة",
    statCustVal: "15000+",
    statCustLabel: "عميل سعيد",
    statServingVal: "الأحساء، الهفوف، والقارة",
    statServingLabel: "فخورون بخدمتكم",
    statEmergencyVal: "24/7",
    statEmergencyLabel: "طوارئ على مدار الساعة",
    whyChooseUs: "لماذا تختار سوبر كول؟",
    comfortPriority: "راحتكم هي أولويتنا",
    valTechTitle: "كادر فني متخصص",
    valTechDesc: "فنيون مؤهلون ومعتمدون لتشخيص وإصلاح كافة المشاكل بدقة.",
    valRespTitle: "استجابة سريعة",
    valRespDesc: "استجابة فورية لخدمات الطوارئ في الأحساء، الهفوف، والقارة.",
    valQualTitle: "عمل عالي الجودة",
    valQualDesc: "ضمان الرضا بنسبة 100% على جميع أعمال الصيانة.",
    valPriceTitle: "أسعار مناسبة",
    valPriceDesc: "أسعار صادقة وتنافسية وعروض أسعار واضحة ومسبقة.",
    needAcService: "هل تحتاج خدمة تكييف؟",
    callAway: "نحن على بعد اتصال واحد!",
    ctaDesc: "من خدمات إصلاح التسريبات الطارئة والصيانة الدورية إلى تركيب مكيفات اسبليت الجديدة، فريقنا جاهز لتقديم خدمات سريعة ونتائج ممتازة.",
    location: "الأحساء، الهفوف، ، القارة، المملكة العربية السعودية",
    openHours: "مفتوح على مدار الساعة 24/7",
    copyright: "سوبر كول. جميع الحقوق محفوظة.",
    modalTitle: "اتصل بمؤسسة رحمة",
    modalDesc: "اختر أحد خطوطنا للتواصل مع فريق خدمات التكييف:",
    cancel: "إلغاء",
    galleryTitle: "معرض أعمالنا المتميزة",
    gallerySubtitle: "معرض الصور",
    filterAll: "الكل",
    filterInstallation: "أعمال تركيب المكيفات",
    filterPipes: "أنابيب النحاس الفاخرة",
    filterVehicles: "سيارات الخدمة"
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  // Global ChunkLoadError / Script Load Failure Recovery Handler
  useEffect(() => {
    const handleError = (e) => {
      const errorMsg = e.message || "";
      const isChunkError = 
        errorMsg.includes("ChunkLoadError") || 
        errorMsg.includes("Loading chunk") || 
        errorMsg.includes("Failed to load script") ||
        errorMsg.includes("CSS chunk");
        
      if (isChunkError) {
        const lastReload = sessionStorage.getItem("lastChunkReload");
        const now = Date.now();
        // Prevent infinite loops (limit reload to once every 10 seconds)
        if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
          sessionStorage.setItem("lastChunkReload", now.toString());
          
          // Clear service worker caches if supported
          if (typeof window !== "undefined" && "caches" in window) {
            caches.keys().then((keys) => {
              keys.forEach((key) => caches.delete(key));
            });
          }
          
          window.location.reload(true);
        }
      }
    };

    window.addEventListener("error", handleError, true);
    
    const handleRejection = (e) => {
      if (e.reason && (
        e.reason.name === "ChunkLoadError" ||
        e.reason.message?.includes("Loading chunk") ||
        e.reason.message?.includes("Failed to load script")
      )) {
        handleError({ message: e.reason.message });
      }
    };
    
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError, true);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  // Global Service Worker Register with Auto-Update Check
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((reg) => {
        // Reg updatefound triggers whenever there's a byte change in sw.js
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                // New build detected. Force reload to get updated static bundle references
                window.location.reload();
              }
            });
          }
        });
      }).catch((err) => {
        console.error("ServiceWorker registration failed: ", err);
      });
    }
  }, []);

  const t = content[language];
  const whatsappLink = "https://wa.me/966566706358";

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t, whatsappLink }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
