"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function Client() {
  return <ServicePageTemplate config={{
    heroTitleEn: "Copper Pipe AC Installation | تمديد نحاس مكيفات",
    heroTitleAr: "تمديد نحاس مكيفات فاخر - سوبر كول",
    heroDescEn: "Premium copper pipe installation for AC units in Al Ahsa.",
    heroDescAr: "تمديد أنابيب نحاسية فاخرة للمكيفات في الأحساء والهفوف.",
    h2En: "تمديد أنابيب نحاس للمكيفات في الأحساء والهفوف",
    h2Ar: "تمديد أنابيب نحاس للمكيفات في الأحساء والهفوف",
    bodyEn: "...",
    bodyAr: "تعتمد سوبر كول على أنابيب النحاس الأمريكي الفاخر عالي النقاء في جميع عمليات تمديد وتأسيس مكيفات الاحساء والهفوف. تستخدم أنابيب Mueller الأمريكية ذات الجدار السميك التي تتحمل الضغط العالي ودرجات الحرارة الشديدة في السعودية.",
    body2En: "...",
    body2Ar: "جميع تمديدات النحاس تُغلف بعازل Armaflex الحراري الفاخر وشريط واقٍ مقاوم للأشعة فوق البنفسجية لضمان تشغيل بدون تسريبات لسنوات طويلة.",
    bulletEn: ["American Mueller Copper Pipes","Armaflex Thermal Wrap","Nitrogen Leak Test","Pipe Extension & Relocation","Leak Repair & Sealing"],
    bulletAr: ["أنابيب نحاس أمريكي Mueller","عزل Armaflex الحراري","اختبار تسرب بالنيتروجين","تمديد ونقل الأنابيب","إصلاح وإغلاق التسريبات"],
    imageSrc: "/premium-copper-pipe-ac-installation.webp",
    imageAltEn: "Premium copper pipe used for AC installation Al Ahsa Saudi Arabia",
    imageAltAr: "أنابيب نحاسية فاخرة لتمديد مكيفات في الأحساء",
    ctaTitleEn: "Get Copper Pipe Installation",
    ctaTitleAr: "احجز تمديد نحاس مكيفات",
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
          "itemListElement": [{"name":"الرئيسية","item":"https://supercoolalhasa.shop"},{"name":"تمديد نحاس مكيفات","item":"https://supercoolalhasa.shop/ar/تمديد-نحاس-مكيفات"}]
        }
      ]
    }
  }} />;
}
