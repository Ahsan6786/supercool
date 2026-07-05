"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function Client() {
  return <ServicePageTemplate config={{
    heroTitleEn: "Emergency AC Repair Al Hofuf — 24/7 Available",
    heroTitleAr: "إصلاح مكيفات طارئ في الهفوف - متاح ٢٤/٧",
    heroDescEn: "Super Cool's HVAC repair team covers all of Al Hofuf 24 hours a day. Fast diagnosis and repair of all AC brands and systems.",
    heroDescAr: "فريق إصلاح تكييف سوبر كول يغطي جميع أنحاء الهفوف على مدار الساعة. تشخيص وإصلاح سريع لجميع ماركات وأنظمة التكييف.",
    h2En: "Certified AC Repair Technicians Al Hofuf",
    h2Ar: "فنيو إصلاح مكيفات معتمدون في الهفوف",
    bodyEn: "When your AC stops working in Al Hofuf's extreme summer heat, Super Cool responds fast. Our certified technicians carry original spare parts for all major brands and diagnose faults accurately on the first visit, saving you time and money.",
    bodyAr: "عندما يتوقف مكيفك في حرارة الهفوف الشديدة، تستجيب سوبر كول بسرعة. يحمل فنيونا المعتمدون قطع غيار أصلية لجميع الماركات الرئيسية.",
    body2En: "From minor thermostat faults to major compressor replacements, no AC repair job in Al Hofuf is too big or too small for Super Cool.",
    body2Ar: "من أعطال الثرموستات البسيطة إلى استبدال الضواغط الكبيرة، لا توجد مهمة إصلاح مكيفات في الهفوف كبيرة أو صغيرة بالنسبة لسوبر كول.",
    bulletEn: ["Emergency Repair Within Hours","Original Spare Parts Stock","All Brands Covered","Gas Refill & Leak Seal","Electrical Fault Diagnosis"],
    bulletAr: ["إصلاح طارئ في غضون ساعات","مخزون قطع الغيار الأصلية","جميع الماركات","تعبئة غاز وإصلاح التسريبات","تشخيص الأعطال الكهربائية"],
    imageSrc: "/supercool-ac-service-vehicle-al-ahsa.webp",
    imageAltEn: "Super Cool AC repair service vehicle in Al Hofuf Saudi Arabia",
    imageAltAr: "سيارة خدمة إصلاح مكيفات سوبر كول في الهفوف",
    ctaTitleEn: "Get AC Repair in Al Hofuf Now",
    ctaTitleAr: "احصل على إصلاح مكيفات في الهفوف الآن",
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
          "itemListElement": [{"name":"Home","item":"https://supercoolalhasa.shop"},{"name":"AC Repair Al Hofuf","item":"https://supercoolalhasa.shop/ac-repair-al-hofuf"}]
        }
      ]
    }
  }} />;
}
