"use client";

import { useState } from "react";
import SubPageLayout from "@/components/SubPageLayout";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const GALLERY_IMAGES = [
  {
    src: "/ac-installation-work-hofuf.webp",
    category: "installation",
    altEn: "Professional AC installation work Al Ahsa by Super Cool technicians",
    altAr: "أعمال تركيب مكيفات احترافية في الأحساء من سوبر كول",
    width: 1086,
    height: 1448
  },
  {
    src: "/premium-copper-pipe-ac-installation.webp",
    category: "pipes",
    altEn: "Premium copper pipe used for AC installation Al Hofuf Saudi Arabia",
    altAr: "أنابيب نحاسية ممتازة لتركيب المكيفات في الهفوف",
    width: 1016,
    height: 1355
  },
  {
    src: "/s3.png",
    category: "installation",
    altEn: "Super Cool AC installation work Al Ahsa Saudi Arabia",
    altAr: "أعمال تركيب مكيفات سوبر كول في الأحساء",
    width: 1086,
    height: 1448
  },
  {
    src: "/s4.mp4",
    category: "installation",
    isVideo: true,
    altEn: "Super Cool AC installation work video Al Ahsa",
    altAr: "فيديو أعمال تركيب مكيفات سوبر كول في الأحساء",
    width: 478,
    height: 850
  },
  {
    src: "/supercool-ac-service-vehicle-al-ahsa.webp",
    category: "vehicles",
    altEn: "Super Cool AC service vehicle in Al Ahsa Saudi Arabia",
    altAr: "سيارة خدمة مكيفات سوبر كول في الأحساء",
    width: 1672,
    height: 941
  },
  {
    src: "/c2.png",
    category: "vehicles",
    altEn: "Super Cool AC service vehicle Saudi Arabia",
    altAr: "سيارات الخدمة سوبر كول في السعودية",
    width: 941,
    height: 1672
  },
  {
    src: "/c3.png",
    category: "vehicles",
    altEn: "Super Cool AC service vehicle Saudi Arabia",
    altAr: "سيارات الخدمة سوبر كول في السعودية",
    width: 1536,
    height: 1024
  }
];

export default function GalleryClient() {
  const { language, t, whatsappLink } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HVACBusiness",
        "@id": "https://supercoolalhasa.shop/#organization",
        "name": "Super Cool Air Conditioning Services",
        "url": "https://supercoolalhasa.shop",
        "telephone": "+966566706358",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Al Hofuf",
          "addressRegion": "Al Ahsa, Eastern Province",
          "addressCountry": "SA"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://supercoolalhasa.shop" },
          { "@type": "ListItem", "position": 2, "name": "Gallery", "item": "https://supercoolalhasa.shop/gallery" }
        ]
      }
    ]
  };

  const filters = [
    { id: "all", labelEn: "All", labelAr: "الكل" },
    { id: "installation", labelEn: "AC Installation", labelAr: "أعمال التركيب" },
    { id: "pipes", labelEn: "Copper Pipes", labelAr: "أنابيب النحاس" },
    { id: "vehicles", labelEn: "Our Vehicles", labelAr: "سيارات الخدمة" }
  ];

  return (
    <SubPageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="bg-gradient-to-br from-primary to-primary-light py-16 md:py-24 text-white text-center px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-5xl font-black font-plus-jakarta leading-tight mb-4">
            {language === "ar" ? "معرض أعمال تكييف سوبر كول في الأحساء والهفوف" : "AC Service Work Gallery — Al Ahsa & Al Hofuf"}
          </h1>
          <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto">
            {language === "ar"
              ? "شاهد جودة أعمالنا الحقيقية في تركيب المكيفات وتمديد النحاس وسيارات الخدمة."
              : "Real photos from our AC installation, copper piping, and service vehicle fleet in Al Ahsa."}
          </p>
        </div>
      </section>

      <section className="py-12 bg-white px-3 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedCategory(f.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                  selectedCategory === f.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary"
                }`}
              >
                {language === "ar" ? f.labelAr : f.labelEn}
              </button>
            ))}
          </div>

          {/* Desktop: 3-col */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-6">
            {GALLERY_IMAGES.filter(i => selectedCategory === "all" || i.category === selectedCategory).map((item, idx) => {
              const isLandscape = item.width > item.height;
              return (
                <div key={idx} className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
                  {item.isVideo ? (
                    <video src={item.src} poster="/s3.png" controls playsInline preload="metadata"
                      className={`w-full block ${isLandscape ? "aspect-[3/2]" : "aspect-[3/4]"} object-cover`} />
                  ) : (
                    <Image src={item.src} alt={language === "ar" ? item.altAr : item.altEn}
                      width={item.width} height={item.height}
                      className={`w-full block ${isLandscape ? "aspect-[3/2]" : "aspect-[3/4]"} object-cover`}
                      sizes="(max-width: 1200px) 50vw, 33vw" loading="lazy" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile: smart pairing */}
          <div className="block md:hidden grid grid-cols-2 gap-3">
            {(() => {
              const filtered = GALLERY_IMAGES.filter(i => selectedCategory === "all" || i.category === selectedCategory);
              const result = [];
              const copy = [...filtered];
              let i = 0;
              while (i < copy.length) {
                const cur = copy[i];
                const isLandscape = cur.width > cur.height;
                if (isLandscape) {
                  result.push({ ...cur, span: "col-span-2" });
                  i++;
                } else {
                  let pIdx = -1;
                  for (let j = i + 1; j < copy.length; j++) {
                    if (copy[j].width <= copy[j].height) { pIdx = j; break; }
                  }
                  if (pIdx !== -1) {
                    result.push({ ...cur, span: "col-span-1" });
                    result.push({ ...copy[pIdx], span: "col-span-1" });
                    copy.splice(pIdx, 1);
                    i++;
                  } else {
                    result.push({ ...cur, span: "col-span-2" });
                    i++;
                  }
                }
              }
              return result.map((item, idx) => (
                <div key={idx} className={`overflow-hidden rounded-xl border border-slate-100 ${item.span}`}>
                  {item.isVideo ? (
                    <video src={item.src} poster="/s3.png" controls playsInline preload="metadata"
                      className={`w-full block ${item.span === "col-span-1" ? "aspect-[3/4] object-cover" : "h-auto"}`} />
                  ) : (
                    <Image src={item.src} alt={language === "ar" ? item.altAr : item.altEn}
                      width={item.width} height={item.height}
                      className={`w-full block ${item.span === "col-span-1" ? "aspect-[3/4] object-cover" : "h-auto"}`}
                      sizes={item.span === "col-span-2" ? "100vw" : "50vw"} loading="lazy" />
                  )}
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      <section className="bg-primary py-12 text-white text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            {language === "ar" ? "تريد عملاً متقناً لبيتك؟" : "Want Quality AC Service Like This?"}
          </h2>
          <p className="text-slate-200 text-sm mb-6">
            {language === "ar" ? "راسلنا عبر الواتساب لحجز موعد فوري." : "Book your AC installation or service in Al Ahsa now."}
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-whatsapp hover:bg-emerald-600 text-white font-extrabold rounded-full transition-all duration-300 shadow-md">
            <i className="fa-brands fa-whatsapp text-xl" />
            <span>{t.whatsAppUs}</span>
          </a>
        </div>
      </section>
    </SubPageLayout>
  );
}
