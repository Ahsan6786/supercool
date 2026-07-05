"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function Client() {
  return <ServicePageTemplate config={{
    heroTitleEn: "Best AC Service Company in Al Hofuf — 30+ Years Local",
    heroTitleAr: "أفضل شركة خدمات تكييف في الهفوف - ٣٠+ عاماً محلية",
    heroDescEn: "Super Cool is Al Hofuf's most trusted air conditioning services company. Established 1989. Fast response, quality work guaranteed.",
    heroDescAr: "سوبر كول هي شركة خدمات التكييف الأكثر ثقة في الهفوف. تأسست عام ١٩٨٩. استجابة سريعة وعمل عالي الجودة مضمون.",
    h2En: "Complete AC Solutions for Al Hofuf Homes & Businesses",
    h2Ar: "حلول تكييف متكاملة لمنازل وأعمال الهفوف",
    bodyEn: "Based in Al Hofuf since 1989, Super Cool serves thousands of residential and commercial clients across Al Hofuf, Al Mubarraz, and the wider Al Ahsa area. Our team of experienced HVAC technicians provides same-day service for most AC issues.",
    bodyAr: "مقرها في الهفوف منذ عام ١٩٨٩، تخدم سوبر كول آلاف العملاء السكنيين والتجاريين في الهفوف والمبرز وجميع أنحاء الأحساء.",
    body2En: "Whether you need emergency AC repair, routine maintenance, or a new installation, Super Cool delivers consistent, high-quality results every time.",
    body2Ar: "سواء كنت تحتاج إصلاح مكيفات طارئ أو صيانة روتينية أو تركيب جديد، تقدم سوبر كول نتائج عالية الجودة في كل مرة.",
    bulletEn: ["All AC Services in One Place","Same-Day Emergency Response","Residential & Commercial","30+ Years Al Hofuf Experience","Transparent Pricing"],
    bulletAr: ["جميع خدمات التكييف في مكان واحد","استجابة طوارئ في نفس اليوم","سكني وتجاري","٣٠+ عاماً خبرة الهفوف","أسعار شفافة"],
    imageSrc: "/supercool-ac-service-vehicle-al-ahsa.webp",
    imageAltEn: "Super Cool AC service vehicle in Al Hofuf Saudi Arabia",
    imageAltAr: "سيارة خدمة مكيفات سوبر كول في الهفوف",
    ctaTitleEn: "Book AC Service in Al Hofuf",
    ctaTitleAr: "احجز خدمة تكييف في الهفوف",
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
          "itemListElement": [{"name":"Home","item":"https://supercoolalhasa.shop"},{"name":"AC Service Al Hofuf","item":"https://supercoolalhasa.shop/ac-service-al-hofuf"}]
        }
      ]
    }
  }} />;
}
