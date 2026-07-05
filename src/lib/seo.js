// Shared NAP (Name, Address, Phone) data for all schema injections
export const NAP = {
  name: "Super Cool Air Conditioning Services",
  telephone: "+966566706358",
  url: "https://supercoolalhasa.shop",
  logo: "https://supercoolalhasa.shop/images/logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Al Hofuf Road",
    addressLocality: "Al Hofuf",
    addressRegion: "Al Ahsa, Eastern Province",
    postalCode: "31982",
    addressCountry: "SA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "25.377317",
    longitude: "49.529815",
  },
  areaServed: [
    { "@type": "City", "name": "Al Ahsa" },
    { "@type": "City", "name": "Al Hofuf" },
    { "@type": "City", "name": "Al Mubarraz" },
    { "@type": "AdministrativeArea", "name": "Eastern Province" },
  ],
  openingHours: "Mo-Su 00:00-23:59",
  priceRange: "$$",
  foundingYear: "1989",
};

export function buildBusinessSchema(pagePath) {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${NAP.url}/#organization`,
    name: NAP.name,
    url: NAP.url,
    logo: NAP.logo,
    image: NAP.logo,
    telephone: NAP.telephone,
    priceRange: NAP.priceRange,
    foundingYear: NAP.foundingYear,
    description:
      "Super Cool Air Conditioning Services - 30+ years of professional AC installation, maintenance, repair, cleaning and copper piping in Al Ahsa, Al Hofuf, Eastern Province Saudi Arabia.",
    address: NAP.address,
    geo: NAP.geo,
    areaServed: NAP.areaServed,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AC Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AC Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AC Maintenance" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AC Cleaning" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AC Repair" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Copper Pipe Installation" } },
      ],
    },
  };
}

export function buildBreadcrumb(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function buildFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

// ─── Global FAQ items ─────────────────────────────────────────────────────────
export const GLOBAL_FAQS_EN = [
  {
    q: "What is the best AC service company in Al Ahsa?",
    a: "Super Cool Air Conditioning Services is widely considered the best AC service company in Al Ahsa with over 30 years of trusted local experience, serving thousands of homes and businesses across Al Hofuf and the Eastern Province."
  },
  {
    q: "How much does AC maintenance cost in Al Hofuf?",
    a: "AC maintenance costs vary depending on the service type. Super Cool offers competitive and transparent pricing for all services including periodic maintenance, gas refills, and cleaning. Contact us via WhatsApp for a free estimate."
  },
  {
    q: "Do you provide copper pipe installation for AC units?",
    a: "Yes. We specialize in premium American and Korean copper pipe installation, extension, and leakage repair using nitrogen pressure testing to ensure zero gas loss."
  },
  {
    q: "Do you repair split AC units in Al Ahsa?",
    a: "Absolutely. We repair all major split AC brands including LG, GREE, Samsung, Daikin, Carrier, and York across all areas of Al Ahsa, Al Hofuf, and Al Mubarraz."
  },
  {
    q: "Do you provide emergency AC service in Al Hofuf?",
    a: "Yes. Our emergency AC repair team is available 24 hours a day, 7 days a week across Al Hofuf, Al Ahsa, and surrounding areas in Eastern Province."
  },
];

export const GLOBAL_FAQS_AR = [
  {
    q: "ما هي أفضل شركة صيانة مكيفات في الأحساء؟",
    a: "سوبر كول هي الأفضل في مجال خدمات التكييف في الأحساء بخبرة تمتد لأكثر من ٣٠ عاماً، تخدم آلاف المنازل والشركات في الهفوف والمنطقة الشرقية."
  },
  {
    q: "كم تكلفة صيانة المكيف في الهفوف؟",
    a: "تختلف التكلفة حسب نوع الخدمة. سوبر كول تقدم أسعاراً تنافسية وشفافة لجميع خدمات الصيانة الدورية وتعبئة الفريون والتنظيف. تواصل معنا عبر الواتساب للحصول على عرض سعر مجاني."
  },
  {
    q: "هل تقدمون خدمة تمديد أنابيب النحاس للمكيفات؟",
    a: "نعم. نتخصص في تمديد أنابيب النحاس الأمريكي والكوري الفاخرة مع اختبار ضغط النيتروجين لضمان عدم تسرب الغاز."
  },
  {
    q: "هل تصلحون مكيفات الاسبليت في الأحساء؟",
    a: "بالتأكيد. نصلح جميع ماركات المكيفات في الأحساء والهفوف والمبرز."
  },
  {
    q: "هل تقدمون خدمة طوارئ التكييف في الهفوف؟",
    a: "نعم. فريق طوارئنا متاح على مدار الساعة في الهفوف والأحساء وجميع مناطق المنطقة الشرقية."
  },
];
