import Client from "./Client";

export const metadata = {
  title: "تركيب مكيفات الاحساء | تركيب اسبليت احترافي | سوبر كول",
  description: "تركيب مكيفات اسبليت ومركزي في الأحساء والهفوف. أنابيب نحاس فاخرة. ضمان جودة التركيب. اتصل +966 56 670 6358.",
  alternates: { canonical: "/ar/tarkib-mukhayyaf-al-ahsa" },
  openGraph: {
    title: "تركيب مكيفات الاحساء | سوبر كول",
    description: "تركيب مكيفات احترافي في الأحساء. جميع الماركات.",
    url: "https://supercoolalhasa.shop/ar/tarkib-mukhayyaf-al-ahsa",
  },
};

export default function Page() {
  return <Client />;
}
