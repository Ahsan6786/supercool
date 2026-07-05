import Client from "./Client";

export const metadata = {
  title: "AC Service Al Ahsa | Best Air Conditioning Company | Super Cool",
  description: "Top-rated AC service in Al Ahsa Saudi Arabia. Super Cool offers AC installation, repair, cleaning & maintenance. 30+ years experience. Call +966 56 670 6358.",
  alternates: {
    canonical: "/ac-service-al-ahsa",
  },
  openGraph: {
    title: "AC Service Al Ahsa | Best Air Conditioning Company | Super Cool",
    description: "Top-rated AC service in Al Ahsa Saudi Arabia. Super Cool offers AC installation, repair, cleaning & maintenance. 30+ years experience. Call +966 56 670 6358.",
    url: "https://supercoolalhasa.shop/ac-service-al-ahsa",
  },
};

export default function Page() {
  return <Client />;
}
