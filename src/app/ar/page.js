import ArHomeClient from "./ArHomeClient";

export const metadata = {
  title: "سوبر كول لخدمات التكييف - الأحساء والهفوف | Super Cool AC Al Ahsa",
  description: "سوبر كول أفضل شركة خدمات تكييف في الأحساء والهفوف. تركيب وإصلاح وتنظيف وصيانة مكيفات بخبرة ٣٠ عاماً. اتصل +966 56 670 6358.",
  alternates: {
    canonical: "/ar",
    languages: {
      "en": "/",
      "ar": "/ar",
    },
  },
  openGraph: {
    title: "سوبر كول لخدمات التكييف - الأحساء والهفوف",
    description: "أفضل شركة تكييف في الأحساء. تركيب وإصلاح وصيانة وتنظيف مكيفات بأعلى معايير الجودة.",
    url: "https://supercoolalhasa.shop/ar",
    locale: "ar_SA",
  },
};

export default function Page() {
  return <ArHomeClient />;
}
