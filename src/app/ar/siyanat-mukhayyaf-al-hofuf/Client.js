"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function Client() {
  return <ServicePageTemplate config={{
    heroTitleEn: "AC Maintenance Al Hofuf | صيانة مكيفات الهفوف",
    heroTitleAr: "صيانة مكيفات الهفوف - سوبر كول",
    heroDescEn: "Trusted AC maintenance in Al Hofuf. Available 24/7.",
    heroDescAr: "صيانة مكيفات موثوقة في الهفوف. متاحون ٢٤/٧.",
    h2En: "صيانة مكيفات في الهفوف",
    h2Ar: "صيانة مكيفات في الهفوف",
    bodyEn: "...",
    bodyAr: "تقدم سوبر كول خدمات صيانة مكيفات شاملة في الهفوف تشمل الفحص الدوري وتعبئة الفريون وتنظيف الفلاتر والكويلات وإصلاح جميع أنواع الأعطال. فريقنا متاح طوال اليوم للطوارئ.",
    body2En: "...",
    body2Ar: "نحرص على تقديم أفضل خدمة صيانة مكيفات في الهفوف بأسعار تنافسية وشفافة دون رسوم خفية.",
    bulletEn: ["Scheduled Maintenance Plans","Emergency 24/7 Service","All Brands & Models","Gas Refill Specialist","Electrical Diagnostic"],
    bulletAr: ["خطط صيانة دورية","خدمة طوارئ ٢٤/٧","جميع الماركات والموديلات","متخصصون في تعبئة الغاز","تشخيص كهربائي"],
    imageSrc: "/supercool-ac-service-vehicle-al-ahsa.webp",
    imageAltEn: "Super Cool AC service vehicle Al Hofuf Saudi Arabia",
    imageAltAr: "سيارة خدمة مكيفات سوبر كول في الهفوف",
    ctaTitleEn: "Get AC Maintenance in Al Hofuf",
    ctaTitleAr: "احجز صيانة مكيف في الهفوف",
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
          "itemListElement": [{"name":"الرئيسية","item":"https://supercoolalhasa.shop"},{"name":"صيانة مكيفات الهفوف","item":"https://supercoolalhasa.shop/ar/صيانة-مكيفات-الهفوف"}]
        }
      ]
    }
  }} />;
}
