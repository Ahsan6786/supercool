import Client from "./Client";

export const metadata = {
  title: "تنظيف مكيفات الاحساء | غسيل بالضغط | سوبر كول",
  description: "تنظيف مكيفات عميق في الاحساء بالضغط العالي. هواء نقي وتوفير الكهرباء. بدون فوضى. اتصل +966 56 670 6358.",
  alternates: { canonical: "/ar/tanzif-mukhayyaf-al-ahsa" },
  openGraph: {
    title: "تنظيف مكيفات الاحساء | سوبر كول",
    description: "تنظيف مكيفات عميق بالضغط العالي في الأحساء.",
    url: "https://supercoolalhasa.shop/ar/tanzif-mukhayyaf-al-ahsa",
  },
};

export default function Page() {
  return <Client />;
}
