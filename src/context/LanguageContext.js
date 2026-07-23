"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const content = {
  en: {
    navHome: "Home",
    navAbout: "About Us",
    navServices: "Services",
    navContact: "Contact",
    callSupport: "Call Support",
    callSupportLines: "Call Support Lines",
    whatsappSupport: "WhatsApp Support",

    // Hero Section
    yearsOfTrust: "30+ Years of Quality Work",
    acBullet1: "• AC Installation, Repair, Wash & Maintenance",
    acBullet2: "• Certified Specialists in Al Ahsa & Al Hofuf",
    whatsAppUs: "WhatsApp Us",

    // Services Section
    completeAcSolutions: "Complete AC Solutions in Al Ahsa, Al Hofuf",
    subtext: "Over 30 years of experience delivering reliable, fast air conditioning services for homes and businesses.",
    installTitle: "AC Installation & Mounting",
    installDesc: "Expert installation for Split, Package, and Central AC units with optimal placement.",
    repairTitle: "Fast AC Repair & Diagnostics",
    repairDesc: "Quick troubleshooting for gas leaks, compressor issues, cooling loss, and electrical faults.",
    cleaningTitle: "Deep AC Cleaning & Wash",
    cleaningDesc: "High-pressure jet washing for indoor/outdoor coils, filters, and drain lines for max cooling.",
    maintenanceTitle: "Preventative Maintenance",
    maintenanceDesc: "Comprehensive seasonal inspection, gas top-ups, and tune-ups to extend AC life.",
    pipingTitle: "Copper Piping Installation",
    pipingDesc: "High-grade copper tube piping with thermal insulation and leak-proof testing.",
    homeServiceTitle: "On-Demand Home Service",
    homeServiceDesc: "Equipped mobile service fleet arriving quickly at your home or workplace.",

    // Stats
    statExpVal: "30+",
    statExpLabel: "Years Experience",
    statCustVal: "10,000+",
    statCustLabel: "Happy Customers",
    statServingVal: "Al Ahsa, Al Hofuf",
    statServingLabel: "Coverage Area",
    statEmergencyVal: "24/7",
    statEmergencyLabel: "Emergency Callout",

    // Values / Features
    valCustTitle: "Customer Satisfaction First",
    valCustDesc: "We prioritize long-term customer trust with transparent communication and quality guarantee.",
    valTechTitle: "Expert Technicians",
    valTechDesc: "Fully trained & certified specialists diagnosing and fixing issues with accuracy.",
    valRespTitle: "Fast Response",
    valRespDesc: "Quick turnaround for emergency service calls in Al Ahsa, Al Hofuf, Al Qarah.",
    valQualTitle: "Best Quality Work",
    valQualDesc: "100% satisfaction guarantee on all service calls and replacement parts.",
    valPriceTitle: "Fair & Honest Prices",
    valPriceDesc: "Upfront pricing with no hidden charges or unexpected fees.",

    // Contact Section
    contactTitle: "Get In Touch",
    contactSubtitle: "Our team is ready 24/7 to solve all your cooling and air conditioning needs.",
    callUsDirect: "Call Us Directly",
    callUsDirectSub: "Immediate support without waiting queues",
    whatsappUsSub: "Direct chat for booking & quotes",
    locationTitle: "Service Coverage Area",
    locationDesc: "Serving all districts across Al Ahsa, Al Hofuf, Al Qarah, and surrounding areas.",
    copyright: "All Rights Reserved © SuperCool - RAHMA Establishment.",

    // Gallery
    galleryTitle: "Service Gallery",
    gallerySubtitle: "SERVICE GALLERY",
    filterAll: "All",
    filterInstallation: "AC Installation",
    filterPipes: "Copper Pipes",
    filterVehicles: "Our Vehicles",

    // Form Exact Reference Match Strings
    formHeaderTitle: "Book a Service",
    formHeaderSubtitle: "Fill in your details and we'll contact you shortly.",
    fullNameLabel: "Full Name",
    fullNamePlaceholder: "e.g. Abdullah Al-Mansoor",
    mobileLabel: "Mobile / WhatsApp Number",
    mobilePlaceholder: "e.g. 056 670 6358",
    emailLabel: "Email Address",
    emailPlaceholder: "name@example.com",
    serviceRequiredLabel: "Service Required",
    serviceOptionSelect: "-- Select Required Service --",
    serviceInstall: "AC Installation",
    serviceRepair: "AC Repair",
    serviceCleaning: "AC Cleaning & Wash",
    serviceMaintenance: "AC Maintenance",
    servicePiping: "Copper Piping",
    bookServiceBtn: "Book Service",
    submitting: "Submitting...",
    heroConsentLabel: "I agree to receive WhatsApp & Email service updates and offers.",
    securityText: "Your information is safe and secure.",
    heroSuccessMessage: "Thank you! Your request has been received. We will contact you shortly.",
    whatsappQuickConnect: "Send Details via WhatsApp",
    submitAnother: "Book Another Service",

    // Existing Customer Form
    existingCustomerTitle: "Already Our Customer?",
    existingCustomerSubtitle: "Register for warranty, service reminders and exclusive offers.",
    nameOptionalLabel: "Full Name (Optional)",
    nameOptionalPlaceholder: "e.g. Abdullah Al-Mansoor",
    registerBtn: "Register",
    customerConsentLabel: "I agree to receive WhatsApp & Email reminders and offers.",
    registerSuccessMessage: "Thank you! Your registration is complete. You will now receive warranty and service updates via WhatsApp and Email.",
    registerAnother: "Register Another Number",

    // Errors
    errNameRequired: "Please enter your full name",
    errMobileRequired: "Please enter a valid mobile number (e.g., 056XXXXXXX)",
    errEmailRequired: "Please enter a valid email address (e.g. name@example.com)",
    errServiceRequired: "Please select a service type",
    errConsentRequired: "You must agree to proceed",
    errDuplicate: "You have already submitted a request recently. Our team is contacting you shortly!"
  },
  ar: {
    navHome: "الرئيسية",
    navAbout: "من نحن",
    navServices: "خدماتنا",
    navContact: "اتصل بنا",
    callSupport: "اتصل بالدعم",
    callSupportLines: "أرقام الاتصال بالدعم",
    whatsappSupport: "دعم الواتساب",

    // Hero Section
    yearsOfTrust: "خبرة وجودة لأكثر من ٣٠+ عاماً",
    acBullet1: "• تركيب، صيانة، إصلاح، وتغسيل المكيفات",
    acBullet2: "• فنيون معتمدون في الأحساء والهفوف",
    whatsAppUs: "تواصل عبر الواتساب",

    // Services Section
    completeAcSolutions: "خدمات تكييف متكاملة في الأحساء والهفوف",
    subtext: "خبرة تفوق ٣٠ عاماً في تقديم حلول التكييف الموثوقة والسريعة للأسر والشركات.",
    installTitle: "تركيب وتثبيت المكيفات",
    installDesc: "تركيب متقن لمكيفات السبلت، المركبي، والمركزية بأعلى مستويات الدقة.",
    repairTitle: "إصلاح وعلاج أعطال المكيفات",
    repairDesc: "تشخيص ومعالجة تسريب الفريون، مشاكل الضاغط (الكمبروسر)، وضعف التبريد.",
    cleaningTitle: "تنظيف وغسيل عميق",
    cleaningDesc: "غسيل عالي الضغط للمبخر والمكثف والفلاتر لإعادة التبريد لأقصى كفاءة.",
    maintenanceTitle: "صيانة وقائية دورية",
    maintenanceDesc: "فحص شامل وتفقد غاز التبريد لتفادي الأعطال المفاجئة وتمديد عمر المكيف.",
    pipingTitle: "تمديد أنابيب النحاس",
    pipingDesc: "تمديد أنابيب نحاس عالية الجودة مع العزل الحراري وااختبارات التسريب.",
    homeServiceTitle: "خدمة منازل سريعة",
    homeServiceDesc: "أسطول صيانة جوال مجهز بالكامل للوصول الفوري لمنزلك أو منشأتك.",

    // Stats
    statExpVal: "٣٠+",
    statExpLabel: "عاماً من الخبرة",
    statCustVal: "١٠,000+",
    statCustLabel: "عميل سعيد",
    statServingVal: "الأحساء والهفوف",
    statServingLabel: "تغطية شاملة",
    statEmergencyVal: "٢٤/٧",
    statEmergencyLabel: "خدمة طوارئ",

    // Values / Features
    valCustTitle: "رضا العملاء أولويتنا",
    valCustDesc: "نضع ثقة العملاء في المقدمة من خلال الشفافية والجودة العالية.",
    valTechTitle: "كادر فني متخصص",
    valTechDesc: "فنيون مؤهلون ومعتمدون لتشخيص وإصلاح كافة المشاكل بدقة.",
    valRespTitle: "استجابة سريعة",
    valRespDesc: "استجابة فورية لخدمات الطوارئ في الأحساء، الهفوف، والقارة.",
    valQualTitle: "عمل عالي الجودة",
    valQualDesc: "ضمان الرضا بنسبة 100% على جميع أعمال الصيانة.",
    valPriceTitle: "أسعار مناسبة",
    valPriceDesc: "أسعار صادقة وتنافسية وعروض أسعار واضحة ومسبقة.",

    // Contact Section
    contactTitle: "تواصل معنا",
    contactSubtitle: "فريقنا المعتمد على أتم الاستعداد لمساعدتك ٢٤/٧.",
    callUsDirect: "اتصال مباشر",
    callUsDirectSub: "خدمة فورية وبدون تكرار قائمة انتظار",
    whatsappUsSub: "استجابة مباشرة وحجز مواعيد",
    locationTitle: "مناطق التغطية والخدمة",
    locationDesc: "نغطي كافة أحياء الأحساء، الهفوف، والمناطق المجاورة.",
    copyright: "جميع الحقوق محفوظة © سوبر كول - مؤسسة رحمة.",

    // Gallery
    galleryTitle: "معرض الخدمات",
    gallerySubtitle: "معرض الخدمات",
    filterAll: "الكل",
    filterInstallation: "أعمال تركيب المكيفات",
    filterPipes: "أنابيب النحاس الفاخرة",
    filterVehicles: "سيارات الخدمة",

    // Form Exact Reference Match Strings
    formHeaderTitle: "حجز خدمة تكييف",
    formHeaderSubtitle: "أدخل بياناتك وسنتواصل معك في أقرب وقت.",
    fullNameLabel: "الاسم الكامل",
    fullNamePlaceholder: "مثال: عبد الله المنصور",
    mobileLabel: "رقم الجوال / الواتساب",
    mobilePlaceholder: "مثال: 056 670 6358",
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "name@example.com",
    serviceRequiredLabel: "الخدمة المطلوبة",
    serviceOptionSelect: "-- اختر الخدمة المطلوبة --",
    serviceInstall: "تركيب مكيفات",
    serviceRepair: "إصلاح وعلاج الأعطال",
    serviceCleaning: "تنظيف وغسيل عميق",
    serviceMaintenance: "صيانة وتفقد التبريد",
    servicePiping: "تمديد أنابيب النحاس",
    bookServiceBtn: "حجز الخدمة",
    submitting: "جاري الإرسال...",
    heroConsentLabel: "أوافق على تلقي تحديثات الخدمة والعروض عبر الواتساب والبريد الإلكتروني.",
    securityText: "معلوماتك آمنة ومحمية تماماً.",
    heroSuccessMessage: "شكراً لك! تم استلام طلبك بنجاح. وسنتواصل معك في أقرب وقت.",
    whatsappQuickConnect: "إرسال التفاصيل عبر الواتساب",
    submitAnother: "حجز خدمة أخرى",

    // Existing Customer Form
    existingCustomerTitle: "هل أنت عميل سابق؟",
    existingCustomerSubtitle: "سجل للحصول على الضمان وتذكيرات الصيانة والعروض الحصرية.",
    nameOptionalLabel: "الاسم الكامل (اختياري)",
    nameOptionalPlaceholder: "مثال: عبد الله المنصور",
    registerBtn: "تسجيل",
    customerConsentLabel: "أوافق على تلقي تذكيرات الصيانة والعروض عبر الواتساب والبريد الإلكتروني.",
    registerSuccessMessage: "شكراً لك! تم تسجيل حسابك بنجاح. ستصلك تحديثات الصيانة والضمان عبر الواتساب والبريد الإلكتروني.",
    registerAnother: "تسجيل رقم آخر",

    // Errors
    errNameRequired: "يرجى إدخال الاسم الكامل",
    errMobileRequired: "يرجى إدخال رقم جوال صحيح (مثال: 05xxxxxxxx)",
    errEmailRequired: "يرجى إدخال بريد إلكتروني صحيح (مثال: name@example.com)",
    errServiceRequired: "يرجى اختيار نوع الخدمة",
    errConsentRequired: "يجب الموافقة للمتابعة",
    errDuplicate: "لقد قدمت طلب فحص مؤخراً برقم الجوال هذا. فريقنا يتواصل معك حالياً!"
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("ar");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("language");
      if (savedLang && (savedLang === "ar" || savedLang === "en")) {
        setLanguageState(savedLang);
      }
    } catch (e) {
      console.error("Failed to read language preference:", e);
    }
  }, []);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("language", lang);
    } catch (e) {
      console.error("Failed to save language preference:", e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const t = content[language] || content.ar;
  const whatsappLink = "https://wa.me/966566706358";

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t, whatsappLink }}>
      <div dir={language === "ar" ? "rtl" : "ltr"} className={language === "ar" ? "font-cairo" : "font-plus-jakarta"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
