"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function Client() {
  return <ServicePageTemplate config={{
    heroTitleEn: "AC Deep Cleaning Service in Al Ahsa — Dust-Free Cooling",
    heroTitleAr: "خدمة تنظيف مكيفات عميقة في الأحساء - تبريد خالٍ من الغبار",
    heroDescEn: "Professional high-pressure AC wash in Al Ahsa. Removes dust, mold, and odors for cleaner air and up to 30% energy savings.",
    heroDescAr: "غسيل مكيفات بالضغط العالي في الأحساء. يزيل الغبار والعفن والروائح لهواء أنظف ووفر يصل إلى ٣٠٪ في الكهرباء.",
    h2En: "High-Pressure AC Washing Al Ahsa — No Mess Guaranteed",
    h2Ar: "غسيل مكيفات بالضغط العالي في الأحساء - مضمون بدون فوضى",
    bodyEn: "Over time, Al Ahsa's dusty environment clogs AC coils and filters, reducing performance and air quality. Super Cool's professional pressure wash service completely eliminates dust, bacteria, and mold using specialized drainage bags that protect your walls and furniture.",
    bodyAr: "بمرور الوقت، تسد بيئة الأحساء المغبرة كويلات المكيف والفلاتر، مما يقلل الأداء وجودة الهواء. تزيل خدمة الغسيل بالضغط من سوبر كول الغبار والبكتيريا والعفن باستخدام أكياس تصريف متخصصة.",
    body2En: "We use protective plastic drainage jackets to ensure your walls, carpets, and furniture stay completely dry and clean throughout the process.",
    body2Ar: "نستخدم أغطية تصريف بلاستيكية واقية لضمان بقاء جدرانك وسجادك وأثاثك جافًا ونظيفًا تمامًا طوال العملية.",
    bulletEn: ["Evaporator Coil Pressure Wash","Blower Wheel Deep Clean","Drain Tray Sanitize","Outdoor Condenser Wash","No-Mess Guaranteed"],
    bulletAr: ["غسيل كويل التبخير بالضغط","تنظيف عميق لعجلة النفخ","تعقيم صينية التصريف","غسيل المكثف الخارجي","مضمون بدون فوضى"],
    imageSrc: "/ac-installation-work-hofuf.webp",
    imageAltEn: "AC deep cleaning service Al Ahsa professional pressure wash by Super Cool",
    imageAltAr: "تنظيف مكيفات عميق في الأحساء بالغسيل بالضغط من سوبر كول",
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
          "itemListElement": [{"name":"Home","item":"https://supercoolalhasa.shop"},{"name":"AC Cleaning Al Ahsa","item":"https://supercoolalhasa.shop/ac-cleaning-al-ahsa"}]
        }
      ]
    }
  }} />;
}
