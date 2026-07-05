"use client";

import SubPageLayout from "@/components/SubPageLayout";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";

const arServices = [
  { icon: "fa-wrench", titleAr: "صيانة مكيفات", titleEn: "AC Maintenance", href: "/ar/صيانة-مكيفات-الاحساء", descAr: "فحص شامل وصيانة دورية لجميع الماركات" },
  { icon: "fa-screwdriver-wrench", titleAr: "تركيب مكيفات", titleEn: "AC Installation", href: "/ar/تركيب-مكيفات-الاحساء", descAr: "تركيب احترافي لجميع أنواع المكيفات" },
  { icon: "fa-shower", titleAr: "تنظيف مكيفات", titleEn: "AC Cleaning", href: "/ar/تنظيف-مكيفات-الاحساء", descAr: "غسيل عميق بالضغط العالي بدون فوضى" },
  { icon: "fa-pipe-valve", titleAr: "تمديد نحاس", titleEn: "Copper Piping", href: "/ar/تمديد-نحاس-مكيفات", descAr: "أنابيب نحاسية فاخرة مع اختبار النيتروجين" },
];

const arStats = [
  { valueAr: "٣٠+", labelAr: "عاماً من الخبرة" },
  { valueAr: "١٥,٠٠٠+", labelAr: "عميل راضٍ" },
  { valueAr: "٢٤/٧", labelAr: "خدمة طوارئ" },
  { valueAr: "١٠٠٪", labelAr: "ضمان الجودة" },
];

const arFaqs = [
  { q: "ما هي أفضل شركة صيانة مكيفات في الأحساء؟", a: "سوبر كول هي الأفضل في الأحساء والهفوف بخبرة تمتد لأكثر من ٣٠ عاماً منذ عام ١٩٨٩." },
  { q: "كم تكلفة تنظيف مكيفات في الهفوف؟", a: "الأسعار تنافسية وتختلف حسب حجم الوحدة. تواصل معنا عبر الواتساب للحصول على عرض سعر مجاني." },
  { q: "هل تقدمون طوارئ مكيفات ليلاً في الأحساء؟", a: "نعم، فريقنا متاح ٢٤ ساعة يومياً ٧ أيام في الأسبوع في جميع أنحاء الأحساء والهفوف والمبرز." },
];

const arSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HVACBusiness",
      "@id": "https://supercoolalhasa.shop/#organization",
      "name": "سوبر كول لخدمات التكييف",
      "alternateName": "Super Cool Air Conditioning Services",
      "url": "https://supercoolalhasa.shop",
      "telephone": "+966566706358",
      "priceRange": "$$",
      "foundingYear": "1989",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "الهفوف",
        "addressRegion": "الأحساء، المنطقة الشرقية",
        "addressCountry": "SA",
      },
      "areaServed": [
        { "@type": "City", "name": "الأحساء" },
        { "@type": "City", "name": "الهفوف" },
        { "@type": "City", "name": "المبرز" },
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": arFaqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
  ],
};

export default function ArHomeClient() {
  const { whatsappLink, t } = useLanguage();

  return (
    <SubPageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(arSchema) }} />

      {/* Hero - Arabic */}
      <section dir="rtl" className="bg-gradient-to-br from-primary to-primary-light py-16 md:py-24 text-white text-center px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold text-white/90 mb-6 border border-white/20">
            <i className="fa-solid fa-star text-yellow-400" />
            <span>خبرة ٣٠+ عاماً في الأحساء والهفوف</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-plus-jakarta leading-tight mb-4">
            سوبر كول لخدمات التكييف
            <span className="block text-accent mt-1">الأحساء والهفوف</span>
          </h1>
          <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto mb-8">
            أفضل شركة صيانة وتركيب وتنظيف مكيفات في الأحساء والهفوف. فنيون معتمدون — استجابة سريعة — جودة مضمونة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-whatsapp hover:bg-emerald-600 text-white font-extrabold rounded-full transition-all duration-300 shadow-md">
              <i className="fa-brands fa-whatsapp text-xl" />
              <span>واتساب الآن</span>
            </a>
            <a href="tel:0566706358"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-extrabold rounded-full border border-white/20 transition-all duration-300">
              <i className="fa-solid fa-phone" />
              <span dir="ltr">056 670 6358</span>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section dir="rtl" className="py-10 bg-white border-b border-slate-100 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {arStats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-primary mb-1">{s.valueAr}</div>
              <div className="text-sm font-bold text-slate-500">{s.labelAr}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section dir="rtl" className="py-16 bg-slate-50/60 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary text-center mb-3">خدماتنا في الأحساء والهفوف</h2>
          <p className="text-slate-500 text-center text-sm mb-10">جميع خدمات التكييف تحت سقف واحد</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {arServices.map((s, i) => (
              <Link key={i} href={s.href}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group block">
                <div className="w-12 h-12 bg-primary/5 group-hover:bg-primary text-primary group-hover:text-white rounded-2xl flex items-center justify-center text-xl mb-4 transition-all duration-300">
                  <i className={`fa-solid ${s.icon}`} />
                </div>
                <h3 className="font-extrabold text-primary text-base mb-1.5">{s.titleAr}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{s.descAr}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Image */}
      <section dir="rtl" className="py-16 bg-white px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-4">لماذا تختار سوبر كول؟</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              تأسست سوبر كول عام ١٩٨٩ في الهفوف وخدمت أكثر من ١٥,٠٠٠ عميل في الأحساء والهفوف والمبرز والقارة والمنطقة الشرقية.
              فنيونا المعتمدون يستخدمون فقط أجود المواد ويضمنون الجودة في كل مشروع.
            </p>
            <div className="space-y-3 mb-8">
              {["فنيون معتمدون ذوو خبرة عالية", "أنابيب نحاس أمريكي فاخرة", "استجابة طوارئ في غضون ساعات", "أسعار شفافة بدون رسوم خفية", "ضمان على جميع الأعمال"].map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-xs flex-shrink-0">
                    <i className="fa-solid fa-check" />
                  </div>
                  <span className="text-slate-700 text-sm font-bold">{b}</span>
                </div>
              ))}
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-whatsapp hover:bg-emerald-600 text-white font-extrabold rounded-full transition-all duration-300 text-sm">
              <i className="fa-brands fa-whatsapp text-lg" />
              <span>احصل على معاينة مجانية</span>
            </a>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-100">
            <Image src="/ac-installation-work-hofuf.webp"
              alt="أعمال تركيب مكيفات احترافية في الأحساء من سوبر كول"
              fill className="object-cover"
              sizes="(max-width: 768px) 100vw, 480px" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section dir="rtl" className="py-16 bg-slate-50/50 border-t border-slate-100 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-primary text-center mb-10">الأسئلة الشائعة</h2>
          <div className="space-y-4">
            {arFaqs.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-extrabold text-primary text-base mb-2">{faq.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section dir="rtl" className="bg-primary py-14 text-white text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">تواصل معنا الآن للحصول على عرض سعر مجاني</h2>
          <p className="text-slate-200 text-sm mb-6">
            راسلنا على الواتساب أو اتصل بنا لأي استفسار عن خدمات التكييف في الأحساء والهفوف.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-whatsapp hover:bg-emerald-600 text-white font-extrabold rounded-full transition-all duration-300 shadow-md">
              <i className="fa-brands fa-whatsapp text-xl animate-pulse" />
              <span>واتساب الآن</span>
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
