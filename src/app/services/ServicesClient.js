"use client";

import SubPageLayout from "@/components/SubPageLayout";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function ServicesClient() {
  const { language, t, whatsappLink } = useLanguage();

  const hvacBusinessSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HVACBusiness",
        "@id": "https://supercoolalhasa.shop/#organization",
        "name": "Super Cool Air Conditioning Services",
        "url": "https://supercoolalhasa.shop",
        "logo": "https://supercoolalhasa.shop/images/logo.png",
        "telephone": "+966566706358",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Al Hofuf Road",
          "addressLocality": "Al Hofuf",
          "addressRegion": "Al Ahsa, Eastern Province",
          "addressCountry": "SA"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://supercoolalhasa.shop/services/#breadcrumb",
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
            "name": language === "ar" ? "خدماتنا" : "Services",
            "item": "https://supercoolalhasa.shop/services"
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
          ? "ما هي الخدمات التي تقدمها سوبر كول؟"
          : "What AC services do you offer in Al Ahsa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": language === "ar"
            ? "نحن نقدم خدمات تركيب المكيفات الاسبليت والمركزي، صيانة وإصلاح المكيفات، تنظيف وغسيل المكيفات، وتمديد أنابيب النحاس في الهفوف والأحساء."
            : "We provide comprehensive AC services including split & central AC installation, quick repairs, high-pressure washing cleaning, preventative maintenance, and premium copper piping wrap."
        }
      },
      {
        "@type": "Question",
        "name": language === "ar"
          ? "هل تعملون على كافة ماركات التكييف؟"
          : "Do you service all AC brands?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": language === "ar"
            ? "نعم، نحن نقوم بصيانة وتركيب جميع ماركات وأنواع التكييف بما في ذلك إل جي، جري، سامسونج، دايو، وغيرها."
            : "Yes, our certified technicians are fully equipped to install and repair all major AC brands, including LG, GREE, Samsung, Daikin, Carrier, and York."
        }
      }
    ]
  };

  const serviceItems = [
    {
      title: t.installTitle,
      desc: t.installDesc,
      icon: "fa-solid fa-snowflake",
      href: "/ac-installation",
      color: "from-blue-500 to-sky-400"
    },
    {
      title: t.repairTitle,
      desc: t.repairDesc,
      icon: "fa-solid fa-screwdriver-wrench",
      href: "/ac-maintenance",
      color: "from-emerald-500 to-teal-400"
    },
    {
      title: t.cleaningTitle,
      desc: t.cleaningDesc,
      icon: "fa-solid fa-wind",
      href: "/ac-cleaning",
      color: "from-indigo-500 to-purple-400"
    },
    {
      title: t.maintenanceTitle,
      desc: t.maintenanceDesc,
      icon: "fa-solid fa-chart-line",
      href: "/ac-maintenance",
      color: "from-amber-500 to-orange-400"
    },
    {
      title: t.pipingTitle,
      desc: t.pipingDesc,
      icon: "fa-solid fa-circle-nodes",
      href: "/copper-piping",
      color: "from-red-500 to-rose-400"
    },
    {
      title: t.homeServiceTitle,
      desc: t.homeServiceDesc,
      icon: "fa-solid fa-house-laptop",
      href: "/contact",
      color: "from-sky-500 to-cyan-400"
    }
  ];

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
          <h1 className="text-3xl md:text-5xl font-black font-plus-jakarta leading-tight mb-4">
            {language === "ar"
              ? "حلول تكييف متكاملة في الأحساء والهفوف"
              : "Complete Quality AC Solutions in Al Ahsa & Al Hofuf"}
          </h1>
          <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto">
            {language === "ar"
              ? "نحن نوفر خدمات تكييف احترافية للمنازل والشركات بأعلى معايير الجودة والضمان."
              : "We provide professional AC services for homes and commercial locations with top quality and warranties."}
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceItems.map((item, idx) => (
              <div 
                key={idx}
                className="group relative bg-white border border-slate-100/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} text-white rounded-2xl flex items-center justify-center text-lg mb-6 shadow-md shadow-primary/10`}>
                    <i className={item.icon} />
                  </div>
                  <h2 className="text-xl font-extrabold text-primary mb-3">
                    {item.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>
                <Link 
                  href={item.href}
                  className="inline-flex items-center gap-2 text-sm font-black text-primary hover:text-accent transition-colors"
                >
                  <span>{language === "ar" ? "تفاصيل الخدمة" : "Service Details"}</span>
                  <i className={`fa-solid ${language === "ar" ? "fa-arrow-left" : "fa-arrow-right"} text-xs`} />
                </Link>
              </div>
            ))}
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
                  ? "كم يستغرق تركيب مكيف اسبليت جديد؟"
                  : "How long does a split AC installation take?"}
              </h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {language === "ar"
                  ? "يستغرق تركيب مكيف اسبليت العادي عادة من ساعة إلى ساعتين، تحت إشراف فنيينا لضمان أفضل عزل وأعلى أداء تبريد."
                  : "Usually, a standard split AC installation takes about 1 to 2 hours. Our certified technicians verify gas levels, insulation wrap, and bracket stability during installation."}
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-extrabold text-primary text-base md:text-lg mb-2">
                {language === "ar"
                  ? "ما هي طريقة تنظيف المكيفات لديكم؟"
                  : "What is your AC cleaning process?"}
              </h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {language === "ar"
                  ? "نحن نستخدم طريقة غسيل بمضخات الضغط العالي مع حماية الجدران والأثاث بأكياس بلاستيكية مخصصة لضمان إزالة الأتربة والروائح تماماً."
                  : "We use a specialized high-pressure wash technique with protective wall plastic jackets, deep pressure washing the coil and blower to restore complete airflow without making a mess."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="bg-primary py-12 text-white text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            {language === "ar" ? "جاهزون لخدمتكم بأفضل جودة" : "Ready to Experience Quality Service?"}
          </h2>
          <p className="text-slate-200 text-sm md:text-base mb-6">
            {language === "ar"
              ? "اضغط على زر الواتساب للتواصل وتحديد موعد صيانة أو تركيب فوري."
              : "Click the WhatsApp button to chat directly with our technician and get an instant quote."}
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
