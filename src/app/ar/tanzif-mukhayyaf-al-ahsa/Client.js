"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function Client() {
  return <ServicePageTemplate config={{
    heroTitleEn: "AC Cleaning Al Ahsa | تنظيف مكيفات الاحساء",
    heroTitleAr: "تنظيف مكيفات الاحساء بالضغط العالي",
    heroDescEn: "Deep AC cleaning service Al Ahsa. Fresh air, energy savings.",
    heroDescAr: "تنظيف مكيفات عميق في الأحساء. هواء نقي ووفر في الكهرباء.",
    h2En: "تنظيف مكيفات بالضغط العالي في الأحساء",
    h2Ar: "تنظيف مكيفات بالضغط العالي في الأحساء",
    bodyEn: "...",
    bodyAr: "تتراكم الأتربة والعفن على كويلات المكيف في بيئة الأحساء المغبرة مما يقلل الكفاءة ويؤثر على جودة الهواء. تقدم سوبر كول تنظيف مكيفات عميقاً بمضخات الضغط العالي مع حماية الجدران والأثاث.",
    body2En: "...",
    body2Ar: "نستخدم أكياس غسيل بلاستيكية متخصصة تجمع الماء وتحميها من الجدران والأرضيات، مما يضمن تنظيفاً مثالياً بدون أي فوضى.",
    bulletEn: ["High-Pressure Coil Wash","Blower Wheel Clean","Drain Sanitize","Odor Removal","No-Mess Service"],
    bulletAr: ["غسيل كويل بضغط عالٍ","تنظيف عجلة النفخ","تعقيم التصريف","إزالة الروائح","خدمة بدون فوضى"],
    imageSrc: "/ac-installation-work-hofuf.webp",
    imageAltEn: "AC cleaning service Al Ahsa deep wash Super Cool",
    imageAltAr: "تنظيف مكيفات في الأحساء بالغسيل العميق من سوبر كول",
    ctaTitleEn: "Book AC Cleaning in Al Ahsa",
    ctaTitleAr: "احجز تنظيف مكيف في الأحساء",
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
          "itemListElement": [{"name":"الرئيسية","item":"https://supercoolalhasa.shop"},{"name":"تنظيف مكيفات الاحساء","item":"https://supercoolalhasa.shop/ar/تنظيف-مكيفات-الاحساء"}]
        }
      ]
    }
  }} />;
}
