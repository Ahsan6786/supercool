"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function Client() {
  return <ServicePageTemplate config={{
    heroTitleEn: "AC Maintenance Al Ahsa | شركة صيانة مكيفات بالاحساء",
    heroTitleAr: "صيانة مكيفات الاحساء - سوبر كول ٣٠+ عاماً",
    heroDescEn: "Best AC maintenance company in Al Ahsa. Fast service, certified technicians.",
    heroDescAr: "أفضل شركة صيانة مكيفات في الأحساء. خدمة سريعة وفنيون معتمدون. تأسست ١٩٨٩.",
    h2En: "شركة صيانة مكيفات بالاحساء والهفوف",
    h2Ar: "شركة صيانة مكيفات بالاحساء والهفوف",
    bodyEn: "...",
    bodyAr: "سوبر كول هي شركة متخصصة في صيانة مكيفات الاحساء والهفوف منذ عام ١٩٨٩. نقدم خدمات صيانة مكيفات الاسبليت والمركزي والدولابي للمنازل والمشاريع التجارية في الأحساء والهفوف والمبرز والقارة وجميع مناطق المنطقة الشرقية.",
    body2En: "...",
    body2Ar: "فنيو صيانة المكيفات لدينا معتمدون وذوو خبرة عالية في التعامل مع جميع أعطال التكييف بما فيها تعبئة الفريون وإصلاح الضاغط وتنظيف الكويلات وإصلاح تسريبات المياه.",
    bulletEn: ["All AC Brands Serviced","30+ Years Al Ahsa Experience","Fast Same-Day Response","Original Spare Parts","24/7 Emergency Available"],
    bulletAr: ["صيانة جميع ماركات المكيفات","خبرة ٣٠+ عاماً في الأحساء","استجابة سريعة في نفس اليوم","قطع غيار أصلية","طوارئ ٢٤/٧"],
    imageSrc: "/supercool-ac-service-vehicle-al-ahsa.webp",
    imageAltEn: "Super Cool AC maintenance service vehicle Al Ahsa Saudi Arabia",
    imageAltAr: "سيارة خدمة صيانة مكيفات سوبر كول في الأحساء",
    ctaTitleEn: "Get AC Maintenance in Al Ahsa",
    ctaTitleAr: "احجز صيانة مكيف في الأحساء",
    faqs: [],
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "HVACBusiness",
          "@id": "https://supercoolalhasa.shop/#organization",
          "name": "Super Cool Air Conditioning Services",
          "url": "https://supercoolalhasa.shop",
          "telephone": "+966566706358",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Al Hofuf",
            "addressRegion": "Al Ahsa, Eastern Province",
            "addressCountry": "SA"
          },
          "areaServed": [
            {"@type": "City", "name": "Al Ahsa"},
            {"@type": "City", "name": "Al Hofuf"}
          ],
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
            "opens": "00:00",
            "closes": "23:59"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [{"name":"الرئيسية","item":"https://supercoolalhasa.shop"},{"name":"صيانة مكيفات الاحساء","item":"https://supercoolalhasa.shop/ar/صيانة-مكيفات-الاحساء"}]
        }
      ]
    }
  }} />;
}
