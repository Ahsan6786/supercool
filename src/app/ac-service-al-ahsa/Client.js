"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function Client() {
  return <ServicePageTemplate config={{
    heroTitleEn: "Professional AC Service in Al Ahsa — 30+ Years of Quality",
    heroTitleAr: "خدمات تكييف احترافية في الأحساء - ٣٠+ عاماً من الجودة",
    heroDescEn: "Super Cool is the most trusted HVAC service provider in Al Ahsa. We deliver fast, quality AC installation, repair, and maintenance.",
    heroDescAr: "سوبر كول هي شركة التكييف الأكثر ثقة في الأحساء. نقدم تركيباً وإصلاحاً وصيانة سريعة وعالية الجودة.",
    h2En: "Complete AC Services Across Al Ahsa",
    h2Ar: "خدمات تكييف متكاملة في جميع أنحاء الأحساء",
    bodyEn: "Super Cool Air Conditioning Services has served Al Ahsa since 1989, providing split AC installation, central AC maintenance, emergency repair, deep cleaning, and premium copper piping to homes and businesses across Al Hofuf, Al Mubarraz, and Eastern Province.",
    bodyAr: "تخدم سوبر كول الأحساء منذ عام ١٩٨٩، تقدم تركيب مكيفات اسبليت، صيانة مكيفات مركزية، إصلاح طارئ، تنظيف عميق، وتمديد أنابيب نحاسية فاخرة للمنازل والشركات.",
    body2En: "Every service is backed by 30+ years of local expertise, certified technicians, and a commitment to quality workmanship using only premium materials.",
    body2Ar: "كل خدمة مدعومة بأكثر من ٣٠ عاماً من الخبرة المحلية وفنيين معتمدين وقيوداً على الجودة باستخدام أفضل المواد.",
    bulletEn: ["Split & Central AC Installation","AC Repair & Gas Refill","Deep Pressure Wash Cleaning","Premium Copper Pipe Laying","24/7 Emergency Response"],
    bulletAr: ["تركيب مكيفات اسبليت ومركزي","إصلاح المكيفات وتعبئة الفريون","تنظيف بالغسيل العميق بالضغط","تمديد أنابيب نحاس فاخرة","طوارئ على مدار الساعة"],
    imageSrc: "/ac-installation-work-hofuf.webp",
    imageAltEn: "Professional AC service work Al Ahsa Saudi Arabia by Super Cool technicians",
    imageAltAr: "أعمال تكييف احترافية في الأحساء من فنيي سوبر كول",
    ctaTitleEn: "Book AC Service in Al Ahsa Today",
    ctaTitleAr: "احجز خدمة تكييف في الأحساء الآن",
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
          "itemListElement": [{"name":"Home","item":"https://supercoolalhasa.shop"},{"name":"AC Service Al Ahsa","item":"https://supercoolalhasa.shop/ac-service-al-ahsa"}]
        }
      ]
    }
  }} />;
}
