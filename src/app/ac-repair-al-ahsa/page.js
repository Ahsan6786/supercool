import Client from "./Client";

export const metadata = {
  title: "AC Repair Al Ahsa | Fast AC Technician | Super Cool",
  description: "Fast professional AC repair service in Al Ahsa. All brands repaired. Gas refill, compressor, water leak. Available 24/7. Call +966 56 670 6358.",
  alternates: {
    canonical: "/ac-repair-al-ahsa",
  },
  openGraph: {
    title: "AC Repair Al Ahsa | Fast AC Technician | Super Cool",
    description: "Fast professional AC repair service in Al Ahsa. All brands repaired. Gas refill, compressor, water leak. Available 24/7. Call +966 56 670 6358.",
    url: "https://supercoolalhasa.shop/ac-repair-al-ahsa",
  },
};

export default function Page() {
  return <Client />;
}
