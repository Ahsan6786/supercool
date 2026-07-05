"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function Client() {
  return <ServicePageTemplate config={{
    heroTitleEn: "Fast AC Repair Service in Al Ahsa — All Brands Fixed",
    heroTitleAr: "إصلاح مكيفات سريع في الأحساء - جميع الماركات",
    heroDescEn: "Certified AC repair technicians available 24/7 across Al Ahsa. We fix compressors, gas leaks, circuit boards, and water dripping.",
    heroDescAr: "فنيو إصلاح مكيفات معتمدون متاحون على مدار الساعة في الأحساء. نصلح الضواغط وتسربات الغاز ولوحات الدوائر وتسرب المياه.",
    h2En: "Expert AC Repair & Diagnostics Al Ahsa",
    h2Ar: "إصلاح وتشخيص أعطال المكيفات في الأحساء",
    bodyEn: "When your AC breaks down in the Al Ahsa summer heat, Super Cool is ready. Our certified HVAC technicians diagnose and repair all split and central AC systems across Al Hofuf, Al Mubarraz, and Al Qarah. We carry original spare parts for all major brands.",
    bodyAr: "عندما يتعطل مكيفك في حرارة الأحساء، سوبر كول جاهزة. فنيونا المعتمدون يشخصون ويصلحون جميع أنظمة التكييف في الهفوف والمبرز والقارة. لدينا قطع غيار أصلية لجميع الماركات.",
    body2En: "From compressor failures to refrigerant leaks and electrical faults, our team resolves all issues using original spare parts and precision tools.",
    body2Ar: "من أعطال الضاغط إلى تسريبات الفريون والأعطال الكهربائية، يحل فريقنا جميع المشاكل بقطع غيار أصلية وأدوات دقيقة.",
    bulletEn: ["Compressor & Capacitor Repair","Refrigerant Gas Refill (R22/R32/R410)","Water Leak & Drainage Fix","Electrical & PCB Repair","All Brands: LG, GREE, Samsung, Daikin"],
    bulletAr: ["إصلاح الضاغط والكابيسيتر","تعبئة فريون (R22/R32/R410)","إصلاح تسريبات المياه والتصريف","إصلاح كهرباء ولوحة التحكم","جميع الماركات: LG, GREE, سامسونج, دايكن"],
    imageSrc: "/supercool-ac-service-vehicle-al-ahsa.webp",
    imageAltEn: "Super Cool AC repair service vehicle in Al Ahsa Saudi Arabia",
    imageAltAr: "سيارة خدمة إصلاح مكيفات سوبر كول في الأحساء",
    ctaTitleEn: "Get Fast AC Repair in Al Ahsa",
    ctaTitleAr: "احصل على إصلاح مكيفات سريع في الأحساء",
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
          "itemListElement": [{"name":"Home","item":"https://supercoolalhasa.shop"},{"name":"AC Repair Al Ahsa","item":"https://supercoolalhasa.shop/ac-repair-al-ahsa"}]
        }
      ]
    }
  }} />;
}
