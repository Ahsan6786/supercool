import Client from "./Client";

export const metadata = {
  title: "صيانة مكيفات الهفوف | فني مكيفات الهفوف | سوبر كول",
  description: "شركة صيانة مكيفات الهفوف - خبرة ٣٠ عاماً. تركيب وإصلاح وتنظيف مكيفات في الهفوف. اتصل +966 56 670 6358.",
  alternates: { canonical: "/ar/siyanat-mukhayyaf-al-hofuf" },
  openGraph: {
    title: "صيانة مكيفات الهفوف | سوبر كول",
    description: "خدمات صيانة مكيفات في الهفوف - خبرة ٣٠ عاماً.",
    url: "https://supercoolalhasa.shop/ar/siyanat-mukhayyaf-al-hofuf",
  },
};

export default function Page() {
  return <Client />;
}
