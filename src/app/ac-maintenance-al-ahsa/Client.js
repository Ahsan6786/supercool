"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function Client() {
  return <ServicePageTemplate config={{
    heroTitleEn: "AC Maintenance & Tune-Up Service in Al Ahsa",
    heroTitleAr: "خدمة صيانة وضبط المكيفات في الأحساء",
    heroDescEn: "Scheduled AC maintenance in Al Ahsa to prevent costly breakdowns, reduce energy bills, and extend the life of your air conditioner.",
    heroDescAr: "صيانة دورية للمكيفات في الأحساء لمنع الأعطال المكلفة وخفض فواتير الطاقة وإطالة عمر المكيف.",
    h2En: "Preventative AC Maintenance in Al Ahsa",
    h2Ar: "صيانة وقائية للمكيفات في الأحساء",
    bodyEn: "Regular maintenance is the key to trouble-free AC operation in Al Ahsa's extreme summer temperatures. Super Cool's maintenance program covers full system inspection, refrigerant level checks, electrical testing, filter cleaning, and drainage verification.",
    bodyAr: "الصيانة المنتظمة هي مفتاح تشغيل المكيفات بلا مشاكل في درجات الحرارة القصوى في الأحساء. تشمل برنامج صيانة سوبر كول فحص النظام الكامل وفحص مستوى الفريون والاختبار الكهربائي وتنظيف الفلاتر.",
    body2En: "Our preventative maintenance plans save Al Ahsa residents up to 30% on their electricity bills while eliminating unexpected failures during peak summer months.",
    body2Ar: "خطط الصيانة الوقائية لدينا توفر لسكان الأحساء ما يصل إلى ٣٠٪ من فواتير الكهرباء مع إلغاء الأعطال المفاجئة خلال أشهر الصيف.",
    bulletEn: ["Full System Diagnostic","Refrigerant Level Check","Filter & Coil Cleaning","Electrical Safety Check","Drain & Condensate Flush"],
    bulletAr: ["تشخيص شامل للنظام","فحص مستوى الفريون","تنظيف الفلاتر والكويلات","فحص السلامة الكهربائية","تنظيف التصريف والمكثفات"],
    imageSrc: "/supercool-ac-service-vehicle-al-ahsa.webp",
    imageAltEn: "Super Cool AC maintenance service vehicle Al Ahsa Saudi Arabia",
    imageAltAr: "سيارة خدمة صيانة المكيفات سوبر كول في الأحساء",
    ctaTitleEn: "Schedule AC Maintenance in Al Ahsa",
    ctaTitleAr: "احجز موعد صيانة مكيف في الأحساء",
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
          "itemListElement": [{"name":"Home","item":"https://supercoolalhasa.shop"},{"name":"AC Maintenance Al Ahsa","item":"https://supercoolalhasa.shop/ac-maintenance-al-ahsa"}]
        }
      ]
    }
  }} />;
}
