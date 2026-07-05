import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Professional AC Services Al Ahsa & Al Hofuf | Super Cool",
  description: "Explore our range of quality AC services in Al Ahsa & Al Hofuf. Expert AC installation, rapid repair, deep cleaning wash, scheduled maintenance & copper piping.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Professional AC Services - Al Ahsa & Al Hofuf",
    description: "AC installation, repair, cleaning, maintenance & copper piping services in Al Ahsa and Al Hofuf. 30+ years experience. Open 24/7.",
    url: "https://supercoolalhasa.shop/services",
  },
};

export default function Page() {
  return <ServicesClient />;
}
