"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function Client() {
  return <ServicePageTemplate config={{
    heroTitleEn: "AC Installation Al Ahsa | تركيب مكيفات الاحساء",
    heroTitleAr: "تركيب مكيفات الاحساء - سوبر كول",
    heroDescEn: "Expert AC installation Al Ahsa. All brands. Premium copper piping.",
    heroDescAr: "تركيب مكيفات احترافي في الأحساء. جميع الماركات. أنابيب نحاسية فاخرة.",
    h2En: "تركيب مكيفات اسبليت في الأحساء",
    h2Ar: "تركيب مكيفات اسبليت في الأحساء",
    bodyEn: "...",
    bodyAr: "سوبر كول متخصصة في تركيب مكيفات الاسبليت والمركزي والدولابي في الأحساء منذ عام ١٩٨٩. نضمن التركيب الصحيح لجميع الوحدات مع اختبار الضغط بالنيتروجين وتمديد أنابيب النحاس الفاخرة.",
    body2En: "...",
    body2Ar: "نقدم ضماناً على جميع أعمال تركيب المكيفات في الأحساء ونستخدم حصراً مواد ذات جودة عالية.",
    bulletEn: ["Split & Central AC","Premium Copper Piping","Nitrogen Pressure Test","Quality Guarantee","All Brands Installed"],
    bulletAr: ["مكيفات اسبليت ومركزي","تمديد نحاس فاخر","اختبار ضغط النيتروجين","ضمان الجودة","جميع الماركات"],
    imageSrc: "/ac-installation-work-hofuf.webp",
    imageAltEn: "Professional AC installation Al Ahsa Super Cool",
    imageAltAr: "تركيب مكيفات احترافي في الأحساء من سوبر كول",
    ctaTitleEn: "Book AC Installation in Al Ahsa",
    ctaTitleAr: "احجز تركيب مكيف في الأحساء",
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
          "itemListElement": [{"name":"الرئيسية","item":"https://supercoolalhasa.shop"},{"name":"تركيب مكيفات الاحساء","item":"https://supercoolalhasa.shop/ar/تركيب-مكيفات-الاحساء"}]
        }
      ]
    }
  }} />;
}
