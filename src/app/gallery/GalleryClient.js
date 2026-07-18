"use client";

import { useState } from "react";
import SubPageLayout from "@/components/SubPageLayout";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";

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
  const [lightboxData, setLightboxData] = useState({ items: [], index: null });

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
          <h1 className="text-[28px] sm:text-4xl md:text-5xl font-black font-plus-jakarta leading-tight mb-4">
            {language === "ar" ? "معرض أعمال تكييف سوبر كول في الأحساء والهفوف" : "AC Service Work Gallery — Al\u00a0Ahsa  Al\u00a0Hofuf"}
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

          {/* Masonry Columns Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {(() => {
              const filteredGallery = GALLERY_IMAGES.filter(
                (item) => selectedCategory === "all" || item.category === selectedCategory
              );
              return filteredGallery.map((item, idx) => {
                const categoryLabel = filters.find((f) => f.id === item.category);
                return (
                  <div
                    key={idx}
                    onClick={() => setLightboxData({ items: filteredGallery, index: idx })}
                    className="break-inside-avoid mb-6 relative overflow-hidden rounded-3xl border border-slate-100 shadow-sm bg-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
                  >
                    {/* Media Content */}
                    {item.isVideo ? (
                      <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-slate-900 flex items-center justify-center">
                        <Image
                          src="/s3.png"
                          alt={language === "ar" ? item.altAr : item.altEn}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-xl group-hover:scale-110 transition-all duration-300">
                            <i className="fa-solid fa-play" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={item.src}
                        alt={language === "ar" ? item.altAr : item.altEn}
                        width={item.width}
                        height={item.height}
                        className="w-full h-auto block object-cover rounded-3xl"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                    )}

                    {/* Category Pill Overlay */}
                    {categoryLabel && (
                      <div className="absolute top-4 left-4 z-10 bg-white/85 backdrop-blur-md text-primary text-xs font-black px-3 py-1.5 rounded-full shadow-sm">
                        {language === "ar" ? categoryLabel.labelAr : categoryLabel.labelEn}
                      </div>
                    )}

                    {/* Dynamic Hover Details Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl">
                      <div className="text-white">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-3">
                          <i className={`fa-solid ${item.isVideo ? "fa-play" : "fa-magnifying-glass-plus"} text-xs`} />
                        </div>
                        <p className="text-sm font-bold leading-snug">
                          {language === "ar" ? item.altAr : item.altEn}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              });
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
      <Lightbox
        items={lightboxData.items}
        activeIndex={lightboxData.index}
        onClose={() => setLightboxData({ items: [], index: null })}
      />
    </SubPageLayout>
  );
}
