import Client from "./Client";

export const metadata = {
  title: "AC Cleaning Service Al Ahsa | Deep Wash | Super Cool",
  description: "Professional AC deep cleaning and pressure wash service in Al Ahsa. Fresh air, better cooling, reduced electricity. Call +966 56 670 6358.",
  alternates: {
    canonical: "/ac-cleaning-al-ahsa",
  },
  openGraph: {
    title: "AC Cleaning Service Al Ahsa | Deep Wash | Super Cool",
    description: "Professional AC deep cleaning and pressure wash service in Al Ahsa. Fresh air, better cooling, reduced electricity. Call +966 56 670 6358.",
    url: "https://supercoolalhasa.shop/ac-cleaning-al-ahsa",
  },
};

export default function Page() {
  return <Client />;
}
