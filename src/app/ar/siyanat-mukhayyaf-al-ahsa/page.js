import Client from "./Client";

export const metadata = {
  title: "صيانة مكيفات الاحساء | سوبر كول للتكييف",
  description: "شركة صيانة مكيفات بالاحساء والهفوف. فنيون معتمدون - خبرة ٣٠ عاماً. تركيب وإصلاح وتنظيف مكيفات. اتصل الآن +966 56 670 6358.",
  alternates: { canonical: "/ar/siyanat-mukhayyaf-al-ahsa" },
  openGraph: {
    title: "صيانة مكيفات الاحساء | سوبر كول للتكييف",
    description: "شركة صيانة مكيفات بالاحساء والهفوف. فنيون معتمدون - خبرة ٣٠ عاماً.",
    url: "https://supercoolalhasa.shop/ar/siyanat-mukhayyaf-al-ahsa",
  },
};

export default function Page() {
  return <Client />;
}
