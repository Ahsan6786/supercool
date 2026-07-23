import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Professional AC Services Al Ahsa, Al Hofuf | Super Cool",
  description: "Explore our range of quality AC services in Al Ahsa, Al Hofuf. Expert AC installation, rapid repair, deep cleaning wash, scheduled maintenance, and copper piping.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Professional AC Services - Al Ahsa, Al Hofuf",
    description: "AC installation, repair, cleaning, maintenance, and copper piping services in Al Ahsa, Al Hofuf. 30+ years experience.",
    url: "https://supercoolalhasa.shop/services",
  },
};

export default function Page() {
  return <ServicesClient />;
}
