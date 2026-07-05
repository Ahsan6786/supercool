import Client from "./Client";

export const metadata = {
  title: "AC Maintenance Al Ahsa | Scheduled HVAC Service | Super Cool",
  description: "Professional AC maintenance and tune-up services in Al Ahsa. Prevent breakdowns, reduce electricity, extend AC life. Call +966 56 670 6358.",
  alternates: {
    canonical: "/ac-maintenance-al-ahsa",
  },
  openGraph: {
    title: "AC Maintenance Al Ahsa | Scheduled HVAC Service | Super Cool",
    description: "Professional AC maintenance and tune-up services in Al Ahsa. Prevent breakdowns, reduce electricity, extend AC life. Call +966 56 670 6358.",
    url: "https://supercoolalhasa.shop/ac-maintenance-al-ahsa",
  },
};

export default function Page() {
  return <Client />;
}
