import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact Super Cool AC Services | Al Ahsa & Al Hofuf | +966 56 670 6358",
  description: "Contact Super Cool Air Conditioning Services in Al Ahsa and Al Hofuf. WhatsApp, phone, or message us for AC installation, repair, maintenance, and cleaning. 24/7 available.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Super Cool AC Services | Al Ahsa & Al Hofuf",
    description: "Reach Super Cool AC Services in Al Ahsa. WhatsApp us for a free quote on AC installation, maintenance, cleaning, or emergency repair.",
    url: "https://supercoolalhasa.shop/contact",
  },
};

export default function Page() {
  return <ContactClient />;
}
