import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Us - Super Cool AC Services Al Ahsa  Al Hofuf",
  description: "Learn more about Super Cool AC Services. Over 30 years of trusted HVAC service experience in Al Ahsa, Al Hofuf, and Eastern Province, Saudi Arabia.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us - Super Cool AC Services",
    description: "Over 30 years of trusted HVAC service experience in Al Ahsa, Al Hofuf, and Eastern Province, Saudi Arabia.",
    url: "https://supercoolalhasa.shop/about",
  },
};

export default function Page() {
  return <AboutClient />;
}
