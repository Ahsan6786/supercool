import GalleryClient from "./GalleryClient";

export const metadata = {
  title: "AC Service Gallery Al Ahsa  Al Hofuf | Super Cool",
  description: "View our portfolio of professional AC installations, copper piping lay outs, and service vehicles in Al Ahsa, Al Hofuf, and Al Qarah, Saudi Arabia.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Our Work Gallery - Super Cool AC Services",
    description: "Browse split AC installations, central cooling projects, and premium copper piping work in Al Ahsa.",
    url: "https://supercoolalhasa.shop/gallery",
  },
};

export default function Page() {
  return <GalleryClient />;
}
