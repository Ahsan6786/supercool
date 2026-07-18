"use client";

import SubPageLayout from "@/components/SubPageLayout";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function AboutClient() {
  const { language, t, whatsappLink } = useLanguage();

  // Local Business and Breadcrumb schemas
  const hvacBusinessSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HVACBusiness",
        "@id": "https://supercoolalhasa.shop/#organization",
        "name": "Super Cool Air Conditioning Services",
        "url": "https://supercoolalhasa.shop",
        "logo": "https://supercoolalhasa.shop/images/logo.png",
        "image": "https://supercoolalhasa.shop/images/logo.png",
        "telephone": "+966566706358",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Al Hofuf Road",
          "addressLocality": "Al Hofuf",
          "addressRegion": "Al Ahsa, Eastern Province",
          "addressCountry": "SA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "25.377317",
          "longitude": "49.529815"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Al Ahsa" },
          { "@type": "AdministrativeArea", "name": "Al Hofuf" },
          { "@type": "AdministrativeArea", "name": "Al Qarah" }
        ],
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://supercoolalhasa.shop/about/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": language === "ar" ? "الرئيسية" : "Home",
            "item": "https://supercoolalhasa.shop"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": language === "ar" ? "من نحن" : "About Us",
            "item": "https://supercoolalhasa.shop/about"
          }
        ]
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": language === "ar" 
          ? "ما هي سنوات خبرة شركة سوبر كول للتكييف؟" 
          : "How many years of experience does Super Cool AC Services have?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": language === "ar"
            ? "تمتلك سوبر كول أكثر من ٣٠ عاماً من الخبرة في تركيب وصيانة وتنظيف وإصلاح المكيفات في الهفوف والأحساء."
            : "Super Cool AC Services has over 30 years of trusted local experience providing quality AC services across Al Ahsa and Al Hofuf."
        }
      },
      {
        "@type": "Question",
        "name": language === "ar"
          ? "أين تقدمون خدمات التكييف؟"
          : "Which areas in Saudi Arabia do you serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": language === "ar"
            ? "نحن نخدم كافة مناطق الأحساء، الهفوف، القارة، والمناطق المجاورة في المنطقة الشرقية بالمملكة العربية السعودية."
            : "We serve the entire Al Ahsa region, including Al Hofuf, Al Qarah, and surrounding areas in the Eastern Province, Saudi Arabia."
        }
      }
    ]
  };

  return (
    <SubPageLayout>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hvacBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header Banner */}
      <section className="bg-gradient-to-br from-primary to-primary-light py-16 md:py-24 text-white text-center px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-[28px] sm:text-4xl md:text-5xl font-black font-plus-jakarta leading-tight mb-4">
            {language === "ar" 
              ? "٣٠+ عاماً من خدمات التكييف عالية الجودة في الأحساء والهفوف" 
              : "30+ Years of Quality AC Services in Al\u00a0Ahsa  Al\u00a0Hofuf"}
          </h1>
          <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto">
            {language === "ar"
              ? "تعرّف على قصتنا وخبرتنا الطويلة في تقديم أفضل خدمات التكييف للمنازل والشركات."
              : "Discover our journey and long history of providing elite HVAC services for homes and commercial setups."}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-6">
              {language === "ar" ? "قصة التميز والجودة" : "Our Commitment to Quality"}
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              {language === "ar"
                ? "تأسست سوبر كول في عام ١٩٨٩ كشركة صيانة تكييف محلية في الأحساء. على مر ثلاثة عقود، نمت خدماتنا لتشمل تركيب المكيفات الاسبليت والمركزي، وتمديد أنابيب النحاس الفاخرة، بالإضافة إلى غسيل وتنظيف المكيفات بأحدث الطرق وبأعلى معايير الدقة."
                : "Super Cool was established in 1989 as a dedicated local AC service shop. Over three decades, we have expanded our services to offer split & central AC installation, premium copper piping wrap, and advanced pressure washing cleaning services with absolute precision."}
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-semibold">
              {language === "ar"
                ? "نحن نركز دائماً على تقديم عمل عالي الجودة يدوم طويلاً، ولا نستخدم إلا أفضل قطع الغيار الأصلية وأنابيب النحاس الممتازة لضمان كفاءة التبريد في درجات الحرارة المرتفعة."
                : "We always focus on delivering durable, top-tier work. We only utilize original spare parts and premium copper pipes to guarantee cooling efficiency even under intense Saudi summer heat."}
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 font-bold text-sm text-primary">
                <i className="fa-solid fa-circle-check text-accent" />
                <span>{language === "ar" ? "فنيون معتمدون" : "Certified Team"}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 font-bold text-sm text-primary">
                <i className="fa-solid fa-circle-check text-accent" />
                <span>{language === "ar" ? "عمل عالي الجودة" : "Quality Service"}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 font-bold text-sm text-primary">
                <i className="fa-solid fa-circle-check text-accent" />
                <span>{language === "ar" ? "دعم على مدار الساعة" : "24/7 Support"}</span>
              </div>
            </div>
          </div>

          {/* Cards side by side */}
          <div className="flex flex-col gap-6 items-center">
            {/* Amjad Imam */}
            <div className="flex flex-row items-center bg-[#f8fafc] rounded-2xl p-4 border border-slate-100/70 w-full gap-4 group">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <Image src="/images/amjad.png" alt="Amjad Imam" fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="96px" />
              </div>
              <div>
                <div className="font-extrabold text-primary text-base">Amjad Imam</div>
                <div className="text-xs font-bold text-accent mb-2">30+ Years Experience</div>
                <a href="https://wa.me/966509811258" target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-xs font-black text-whatsapp">
                  <i className="fa-brands fa-whatsapp text-sm" />
                  <span>+966 50 981 1258</span>
                </a>
              </div>
            </div>

            {/* Asgar Imam */}
            <div className="flex flex-row items-center bg-[#f8fafc] rounded-2xl p-4 border border-slate-100/70 w-full gap-4 group">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <Image src="/images/asgar.png" alt="Asgar Imam" fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="96px" />
              </div>
              <div>
                <div className="font-extrabold text-primary text-base">Asgar Imam</div>
                <div className="text-xs font-bold text-accent mb-2">30+ Years Experience</div>
                <a href="https://wa.me/966566706358" target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-xs font-black text-whatsapp">
                  <i className="fa-brands fa-whatsapp text-sm" />
                  <span>+966 56 670 6358</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 bg-slate-50/50 border-t border-b border-slate-100/60 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary text-center mb-10">
            {language === "ar" ? "الأسئلة الشائعة حول خدماتنا" : "Frequently Asked Questions"}
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-extrabold text-primary text-base md:text-lg mb-2">
                {language === "ar"
                  ? "لماذا نعتبر أفضل شركة تكييف في الأحساء؟"
                  : "Why are you considered the best AC service company in Al Ahsa?"}
              </h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {language === "ar"
                  ? "لأننا نوفر خدمة متكاملة بأسعار ممتازة وعمل عالي الجودة يدوم طويلاً، مع ضمان الرضا التام لعملائنا في الهفوف وكافة مدن الأحساء."
                  : "We combine 30+ years of local experience with elite technicians, quick response times, and premium copper piping materials to ensure top quality HVAC service."}
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-extrabold text-primary text-base md:text-lg mb-2">
                {language === "ar"
                  ? "هل توفرون خدمة الطوارئ على مدار الساعة؟"
                  : "Do you offer emergency AC services?"}
              </h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {language === "ar"
                  ? "نعم، فنيونا متاحون على مدار الساعة وطوال أيام الأسبوع لخدمات إصلاح أعطال المكيفات الطارئة وتسريب الفريون."
                  : "Yes, our technicians are available 24/7 to handle critical AC failures, gas leaks, and urgent diagnostic calls across Al Hofuf and Al Ahsa."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="bg-primary py-12 text-white text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            {language === "ar" ? "هل تبحث عن أفضل جودة لخدمات التكييف؟" : "Looking for Elite Quality AC Service?"}
          </h2>
          <p className="text-slate-200 text-sm md:text-base mb-6">
            {language === "ar"
              ? "راسل فنيينا مباشرة للحصول على معاينة وتحديد موعد صيانة أو تركيب سريع."
              : "Chat directly with our AC specialists to book installation, washing, or piping work."}
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-whatsapp hover:bg-emerald-600 text-white font-extrabold rounded-full transition-all duration-300 shadow-md hover:-translate-y-0.5 text-base"
          >
            <i className="fa-brands fa-whatsapp text-xl animate-pulse" />
            <span>{t.whatsAppUs}</span>
          </a>
        </div>
      </section>
    </SubPageLayout>
  );
}
