import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";
// Self-hosted Font Awesome — no CDN dependency, always loads
import "@fortawesome/fontawesome-free/css/all.min.css";
// Override webfont paths to use self-hosted fonts in /public/fonts/fa/
import "./fa-override.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL("https://supercoolalhasa.shop"),
  title: "Super Cool AC Services - Al Ahsa  Al Hofuf | 30+ Years Experience",
  description: "Quality AC installation, repair, cleaning, and copper pipe wrapping in Al Ahsa  Al Hofuf, and Eastern Province. 30+ years experience. Call +966 56 670 6358.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Super Cool AC Services - Al Ahsa  Al Hofuf",
    description: "Quality AC installation, repair, cleaning & copper piping in Al Ahsa  Al Hofuf. 30+ years experience. Call +966 56 670 6358.",
    url: "https://supercoolalhasa.shop",
    siteName: "Super Cool AC Services",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "Super Cool AC Services Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Super Cool AC Services - Al Ahsa  Al Hofuf",
    description: "Quality AC installation, repair, cleaning & copper piping in Al Ahsa  Al Hofuf. Call +966 56 670 6358.",
    images: ["/images/logo.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico?v=2",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head />
      <body className="font-outfit text-slate-800 bg-[#f8fafc] min-h-screen">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
