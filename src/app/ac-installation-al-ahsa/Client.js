"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function Client() {
  return <ServicePageTemplate config={{
    heroTitleEn: "Professional AC Installation Service in Al Ahsa",
    heroTitleAr: "خدمة تركيب مكيفات احترافية في الأحساء",
    heroDescEn: "Best split AC and central AC installation in Al Ahsa. Quality copper piping, certified setup, and performance verification.",
    heroDescAr: "أفضل تركيب مكيفات اسبليت ومركزي في الأحساء. تمديد نحاس جودة وتركيب معتمد وتحقق من الأداء.",
    h2En: "Split AC Installation Specialists in Al Ahsa",
    h2Ar: "متخصصون في تركيب مكيفات الاسبليت في الأحساء",
    bodyEn: "Super Cool installs all types of split and central air conditioning systems in Al Ahsa. Our certified technicians ensure correct bracket mounting, premium copper pipe routing, nitrogen pressure testing, and optimal gas charging for peak performance from day one.",
    bodyAr: "تركّب سوبر كول جميع أنواع المكيفات الاسبليت والمركزي في الأحساء. يضمن فنيونا المعتمدون التركيب الصحيح للحوامل وتمديد أنابيب النحاس الفاخرة واختبار ضغط النيتروجين.",
    body2En: "We use only American and Korean premium copper pipes with Armaflex thermal insulation for maximum efficiency and longevity in Saudi Arabia's harsh climate.",
    body2Ar: "نستخدم فقط أنابيب النحاس الأمريكي والكوري الفاخرة مع عزل Armaflex الحراري لتحقيق أقصى كفاءة وطول عمر في المناخ السعودي القاسي.",
    bulletEn: ["All Split AC Brands Installed","Premium Copper Pipe & Insulation","Nitrogen Pressure Testing","Bracket & Drain Installation","Performance Verification"],
    bulletAr: ["تركيب جميع ماركات الاسبليت","أنابيب نحاس وعزل فاخر","اختبار ضغط بالنيتروجين","تركيب حوامل وتصريف","تحقق من الأداء"],
    imageSrc: "/ac-installation-work-hofuf.webp",
    imageAltEn: "Professional AC installation work Al Ahsa by Super Cool",
    imageAltAr: "أعمال تركيب مكيفات احترافية في الأحساء من سوبر كول",
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
          "itemListElement": [{"name":"Home","item":"https://supercoolalhasa.shop"},{"name":"AC Installation Al Ahsa","item":"https://supercoolalhasa.shop/ac-installation-al-ahsa"}]
        }
      ]
    }
  }} />;
}
