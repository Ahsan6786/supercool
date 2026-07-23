"use client";

import SubPageLayout from "@/components/SubPageLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactClient() {
  const { language, t, whatsappLink } = useLanguage();
  const isAr = language === "ar";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HVACBusiness",
        "@id": "https://supercoolalhasa.shop/#organization",
        "name": "Super Cool Air Conditioning Services",
        "url": "https://supercoolalhasa.shop",
        "telephone": "+966566706358",
        "email": "info@supercoolalhasa.shop",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Al Hofuf",
          "addressRegion": "Al Ahsa, Eastern Province",
          "addressCountry": "SA",
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59",
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://supercoolalhasa.shop" },
          { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://supercoolalhasa.shop/contact" },
        ],
      },
    ],
  };

  const contacts = [
    {
      icon: "fa-brands fa-whatsapp",
      color: "bg-whatsapp/10 text-whatsapp",
      labelEn: "WhatsApp Us",
      labelAr: "واتساب",
      valueEn: "Direct chat with our AC specialists",
      valueAr: "تحدث مباشرة مع فنيينا",
      href: whatsappLink,
      btnEn: "Open WhatsApp",
      btnAr: "افتح واتساب",
      external: true,
    },
    {
      icon: "fa-solid fa-phone",
      color: "bg-primary/10 text-primary",
      labelEn: "Call Us",
      labelAr: "اتصل بنا",
      valueEn: "056 670 6358",
      valueAr: "056 670 6358",
      href: "tel:0566706358",
      btnEn: "Call Now",
      btnAr: "اتصل الآن",
      external: false,
    },
    {
      icon: "fa-solid fa-location-dot",
      color: "bg-red-50 text-red-500",
      labelEn: "Location",
      labelAr: "الموقع",
      valueEn: "Al Hofuf, Al Ahsa, Eastern Province, Saudi Arabia",
      valueAr: "الهفوف، الأحساء، المنطقة الشرقية، المملكة العربية السعودية",
      href: "https://maps.google.com/?q=Al+Hofuf+Al+Ahsa+Saudi+Arabia",
      btnEn: "Open Map",
      btnAr: "افتح الخريطة",
      external: true,
    },
    {
      icon: "fa-solid fa-envelope",
      color: "bg-sky-50 text-sky-500",
      labelEn: "Email Us",
      labelAr: "البريد الإلكتروني",
      valueEn: "supercoolalhasa.acservices@gmail.com",
      valueAr: "supercoolalhasa.acservices@gmail.com",
      href: "mailto:supercoolalhasa.acservices@gmail.com",
      btnEn: "Send Email",
      btnAr: "أرسل بريداً",
      external: false,
    },
  ];

  const areas = [
    "Al Hofuf", "Al Mubarraz", "Al Qarah", "Al Uyun", "Hofuf Industrial",
    "Al Ahsa Airport Rd", "Al Muntazah", "Eastern Province"
  ];

  return (
    <SubPageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-light py-16 md:py-24 text-white text-center px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-[28px] sm:text-4xl md:text-5xl font-black font-plus-jakarta leading-tight mb-4">
            {isAr ? "تواصل مع سوبر كول في الأحساء والهفوف" : "Contact Super Cool AC Services — Al\u00a0Ahsa, Al\u00a0Hofuf"}
          </h1>
          <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto">
            {isAr
              ? "فريقنا جاهز للإجابة على استفساراتك وتقديم خدمة سريعة في الأحساء والهفوف."
              : "Our team is ready to answer your questions and provide fast AC service across Al\u00a0Ahsa, Al\u00a0Hofuf."}
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contacts.map((c, i) => (
              <div key={i} className="border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-4 ${c.color}`}>
                  <i className={c.icon} />
                </div>
                <div className="font-extrabold text-primary text-lg mb-1.5">
                  {isAr ? c.labelAr : c.labelEn}
                </div>
                <p className="text-slate-600 text-sm mb-5" dir={i === 1 ? "ltr" : "auto"}>
                  {isAr ? c.valueAr : c.valueEn}
                </p>
                {c.href && c.btnEn && (
                  <a href={c.href}
                    target={c.external ? "_blank" : "_self"}
                    rel={c.external ? "noopener noreferrer" : ""}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                      i === 0
                        ? "bg-whatsapp text-white hover:bg-emerald-600"
                        : "bg-primary text-white hover:bg-primary-dark"
                    }`}>
                    <i className={c.icon} />
                    {isAr ? c.btnAr : c.btnEn}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-12 bg-slate-50/60 border-t border-slate-100 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-extrabold text-primary mb-6">
            {isAr ? "مناطق الخدمة في الأحساء" : "Areas We Serve in Al Ahsa"}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {areas.map(a => (
              <span key={a} className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-700 shadow-sm">
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Map embed */}
      <section className="py-0 bg-white border-t border-slate-100">
        <div className="w-full h-[350px] md:h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.3!2d49.529815!3d25.377317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e36056e5db25657%3A0x20a93ffc6b7e2b13!2sAl%20Hofuf%2C%20Al%20Ahsa%2C%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa"
            width="100%" height="100%" style={{ border: 0 }}
            allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title="Super Cool AC Services Location Al Hofuf Al Ahsa" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-14 text-white text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            {isAr ? "جاهز لحجز خدمة التكييف؟" : "Ready to Book AC Service?"}
          </h2>
          <p className="text-slate-200 text-sm mb-6">
            {isAr
              ? "تواصل معنا عبر الواتساب لحصص معاينة وعرض سعر مجاني في الأحساء والهفوف."
              : "Chat with us on WhatsApp for a free consultation and fast service in Al\u00a0Ahsa, Al\u00a0Hofuf."}
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-whatsapp hover:bg-emerald-600 text-white font-extrabold rounded-full transition-all duration-300 shadow-md">
            <i className="fa-brands fa-whatsapp text-xl animate-pulse" />
            <span>{t.whatsAppUs}</span>
          </a>
        </div>
      </section>
    </SubPageLayout>
  );
}
