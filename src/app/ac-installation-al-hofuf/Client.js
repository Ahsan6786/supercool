"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function Client() {
  return <ServicePageTemplate config={{
    heroTitleEn: "Split AC Installation in Al Hofuf — Quality Guaranteed",
    heroTitleAr: "تركيب مكيفات اسبليت في الهفوف - جودة مضمونة",
    heroDescEn: "Expert AC installation service in Al Hofuf. All brands. Premium copper piping. Nitrogen tested. Starting right the first time.",
    heroDescAr: "خدمة تركيب مكيفات احترافية في الهفوف. جميع الماركات. أنابيب نحاسية فاخرة. اختبار بالنيتروجين. الصواب من المرة الأولى.",
    h2En: "Professional AC Installation Service Al Hofuf",
    h2Ar: "خدمة تركيب مكيفات احترافية في الهفوف",
    bodyEn: "A properly installed AC system lasts longer and runs more efficiently. Super Cool's installation team in Al Hofuf follows strict quality protocols: correct bracket positioning, premium copper piping, proper drain slope, and nitrogen pressure testing before gas charging.",
    bodyAr: "نظام التكييف المركب بشكل صحيح يدوم أطول ويعمل بكفاءة أكبر. يتبع فريق تركيب سوبر كول في الهفوف بروتوكولات جودة صارمة.",
    body2En: "We install all split AC brands including LG, GREE, Samsung, Midea, Carrier, and Daikin across all areas of Al Hofuf and Al Mubarraz.",
    body2Ar: "نركب جميع ماركات الاسبليت بما فيها LG وGREE وسامسونج وميديا وكارير ودايكن في جميع أنحاء الهفوف والمبرز.",
    bulletEn: ["All Split AC Brands","Central & Cassette AC","Premium Copper & Insulation","Bracket & Drain Install","First-Day Performance Check"],
    bulletAr: ["جميع ماركات الاسبليت","التكييف المركزي والكاسيت","نحاس وعزل فاخر","تركيب الحوامل والتصريف","فحص الأداء في اليوم الأول"],
    imageSrc: "/ac-installation-work-hofuf.webp",
    imageAltEn: "Professional AC installation work Al Hofuf Saudi Arabia by Super Cool",
    imageAltAr: "أعمال تركيب مكيفات احترافية في الهفوف من سوبر كول",
    ctaTitleEn: "Book AC Installation in Al Hofuf",
    ctaTitleAr: "احجز تركيب مكيف في الهفوف",
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
          "itemListElement": [{"name":"Home","item":"https://supercoolalhasa.shop"},{"name":"AC Installation Al Hofuf","item":"https://supercoolalhasa.shop/ac-installation-al-hofuf"}]
        }
      ]
    }
  }} />;
}
