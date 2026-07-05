"use client";

import SubPageLayout from "@/components/SubPageLayout";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";

/**
 * Reusable template for all city-specific service pages.
 * Props:
 *  - config: { heroTitleEn, heroTitleAr, heroDescEn, heroDescAr,
 *               h2En, h2Ar, bodyEn, bodyAr, bulletEn[], bulletAr[],
 *               imageSrc, imageAlt, faqs[{ qEn, qAr, aEn, aAr }],
 *               schema: JSON-LD object, ctaTitleEn, ctaTitleAr }
 */
export default function ServicePageTemplate({ config }) {
  const { language, t, whatsappLink } = useLanguage();
  const isAr = language === "ar";

  return (
    <SubPageLayout>
      {/* Schema */}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(config.schema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-light py-16 md:py-24 text-white text-center px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-5xl font-black font-plus-jakarta leading-tight mb-4">
            {isAr ? config.heroTitleAr : config.heroTitleEn}
          </h1>
          <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto">
            {isAr ? config.heroDescAr : config.heroDescEn}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={config.imageFirst ? "order-last md:order-first" : ""}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-6">
              {isAr ? config.h2Ar : config.h2En}
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              {isAr ? config.bodyAr : config.bodyEn}
            </p>
            {config.body2En && (
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-semibold">
                {isAr ? config.body2Ar : config.body2En}
              </p>
            )}
            <div className="space-y-3 mb-6">
              {(isAr ? config.bulletAr : config.bulletEn).map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-xs flex-shrink-0">
                    <i className="fa-solid fa-check" />
                  </div>
                  <span className="text-slate-700 text-sm font-bold">{b}</span>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {[
                isAr ? "٣٠+ عاماً خبرة" : "30+ Years Experience",
                isAr ? "فنيون معتمدون" : "Certified Technicians",
                isAr ? "متاحون ٢٤/٧" : "Available 24/7",
              ].map((badge, i) => (
                <span key={i} className="px-3 py-1.5 bg-primary/5 text-primary text-xs font-bold rounded-full border border-primary/10">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-100">
            <Image src={config.imageSrc} alt={isAr ? config.imageAltAr : config.imageAltEn}
              fill className="object-cover"
              sizes="(max-width: 768px) 100vw, 480px" />
          </div>
        </div>
      </section>

      {/* Why Choose Super Cool */}
      <section className="py-14 bg-slate-50/60 border-t border-slate-100 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold text-primary text-center mb-10">
            {isAr ? "لماذا تختار سوبر كول؟" : "Why Choose Super Cool?"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "fa-award", titleEn: "30+ Years", descEn: "Trusted local experience", titleAr: "٣٠+ عاماً", descAr: "خبرة محلية موثوقة" },
              { icon: "fa-users", titleEn: "10,000+", descEn: "Happy customers", titleAr: "١٥,٠٠٠+", descAr: "عميل سعيد" },
              { icon: "fa-bolt", titleEn: "Fast Service", descEn: "Quick response times", titleAr: "استجابة سريعة", descAr: "وقت استجابة فوري" },
              { icon: "fa-shield-halved", titleEn: "Quality Work", descEn: "Premium materials only", titleAr: "عمل عالي الجودة", descAr: "مواد فاخرة فقط" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 text-center border border-slate-100 shadow-sm">
                <div className="w-11 h-11 bg-primary/5 text-primary rounded-full flex items-center justify-center text-lg mx-auto mb-3">
                  <i className={`fa-solid ${item.icon}`} />
                </div>
                <div className="font-extrabold text-primary text-base mb-1">{isAr ? item.titleAr : item.titleEn}</div>
                <div className="text-xs text-slate-500 font-medium">{isAr ? item.descAr : item.descEn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-12 bg-white px-6 border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-extrabold text-primary mb-4">
            {isAr ? "مناطق الخدمة" : "Areas We Serve"}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Al Hofuf", "Al Ahsa", "Al Mubarraz", "Al Qarah", "Al Uyun", "Hofuf Industrial", "Eastern Province"].map(area => (
              <span key={area} className="px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-sm font-semibold text-slate-700">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50/50 border-t border-slate-100 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary text-center mb-10">
            {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </h2>
          <div className="space-y-4">
            {config.faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-extrabold text-primary text-base mb-2">{isAr ? faq.qAr : faq.qEn}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{isAr ? faq.aAr : faq.aEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-14 text-white text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            {isAr ? (config.ctaTitleAr || "تواصل معنا الآن") : (config.ctaTitleEn || "Book Your Service Now")}
          </h2>
          <p className="text-slate-200 text-sm mb-6">
            {isAr
              ? "راسل فنيينا على الواتساب للحصول على معاينة وعرض سعر مجاني."
              : "Chat with our AC specialists for a free quote and fast response."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-whatsapp hover:bg-emerald-600 text-white font-extrabold rounded-full transition-all duration-300 shadow-md">
              <i className="fa-brands fa-whatsapp text-xl animate-pulse" />
              <span>{t.whatsAppUs}</span>
            </a>
            <a href="tel:0566706358"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-extrabold rounded-full border border-white/20 transition-all duration-300">
              <i className="fa-solid fa-phone" />
              <span dir="ltr">056 670 6358</span>
            </a>
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
