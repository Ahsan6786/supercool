"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function Client() {
  return <ServicePageTemplate config={{
    heroTitleEn: "Premium AC Copper Pipe Installation in Al Ahsa",
    heroTitleAr: "تمديد أنابيب نحاسية فاخرة للمكيفات في الأحساء",
    heroDescEn: "High-density American and Korean copper pipe installation with Armaflex insulation. Zero gas leaks guaranteed for Al Ahsa homes and businesses.",
    heroDescAr: "تمديد أنابيب نحاسية أمريكية وكورية عالية الكثافة مع عزل Armaflex. مضمون بدون تسريبات لمنازل وأعمال الأحساء.",
    h2En: "American Premium Copper Pipe — Al Ahsa Specialists",
    h2Ar: "نحاس أمريكي فاخر - متخصصون في الأحساء",
    bodyEn: "Using thin or low-grade copper pipes leads to refrigerant leaks, compressor damage, and costly repairs. Super Cool exclusively uses high-purity American Mueller copper pipes with thick walls that withstand Saudi Arabia's extreme heat and pressure cycles.",
    bodyAr: "استخدام أنابيب النحاس الرفيعة أو رديئة الجودة يؤدي إلى تسريبات الفريون وتلف الضاغط وإصلاحات مكلفة. تستخدم سوبر كول حصراً أنابيب نحاس أمريكية Mueller عالية النقاء.",
    body2En: "All runs are wrapped with premium Armaflex closed-cell insulation and protective UV-resistant tape, ensuring decades of leak-free operation.",
    body2Ar: "جميع التمديدات مغلفة بعزل Armaflex خلوي مغلق فاخر وشريط واقٍ مقاوم للأشعة فوق البنفسجية، مما يضمن تشغيلاً بدون تسرب لعقود.",
    bulletEn: ["American Mueller Premium Copper","Armaflex Thermal Insulation","Nitrogen Pressure Leak Test","UV-Resistant Protective Tape","Extension & Relocation Work"],
    bulletAr: ["نحاس أمريكي Mueller فاخر","عزل حراري Armaflex","اختبار تسرب ضغط النيتروجين","شريط واقٍ مقاوم للأشعة فوق البنفسجية","أعمال التمديد والنقل"],
    imageSrc: "/premium-copper-pipe-ac-installation.webp",
    imageAltEn: "Premium copper pipe used for AC installation Al Ahsa Saudi Arabia",
    imageAltAr: "أنابيب نحاسية فاخرة لتركيب مكيفات في الأحساء",
    ctaTitleEn: "Get Copper Pipe Installation in Al Ahsa",
    ctaTitleAr: "احصل على تمديد نحاس في الأحساء",
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
          "itemListElement": [{"name":"Home","item":"https://supercoolalhasa.shop"},{"name":"AC Copper Piping Al Ahsa","item":"https://supercoolalhasa.shop/ac-copper-piping-al-ahsa"}]
        }
      ]
    }
  }} />;
}
