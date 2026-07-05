import Client from "./Client";

export const metadata = {
  title: "AC Service Al Hofuf | Best HVAC Technician | Super Cool",
  description: "Trusted AC service company in Al Hofuf Saudi Arabia. 30+ years serving Al Hofuf with AC installation, repair, cleaning & maintenance. Call +966 56 670 6358.",
  alternates: {
    canonical: "/ac-service-al-hofuf",
  },
  openGraph: {
    title: "AC Service Al Hofuf | Best HVAC Technician | Super Cool",
    description: "Trusted AC service company in Al Hofuf Saudi Arabia. 30+ years serving Al Hofuf with AC installation, repair, cleaning & maintenance. Call +966 56 670 6358.",
    url: "https://supercoolalhasa.shop/ac-service-al-hofuf",
  },
};

export default function Page() {
  return <Client />;
}
