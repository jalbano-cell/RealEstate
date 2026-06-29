import type { Metadata } from "next";
import { Cinzel, Josefin_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://primerealty.ca"),
  title: {
    default: "PrimeRealty — Toronto's Premier Real Estate Agency",
    template: "%s | PrimeRealty",
  },
  description:
    "Find your dream home in Toronto and the GTA. PrimeRealty connects buyers, sellers, and renters with top-rated agents and premium property listings.",
  keywords: ["real estate", "Toronto", "homes for sale", "condos", "real estate agent"],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://primerealty.ca",
    siteName: "PrimeRealty",
    title: "PrimeRealty — Toronto's Premier Real Estate Agency",
    description:
      "Find your dream home in Toronto and the GTA. PrimeRealty connects buyers, sellers, and renters with top-rated agents and premium listings.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "PrimeRealty" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PrimeRealty — Toronto's Premier Real Estate Agency",
    description: "Find your dream home in Toronto and the GTA.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${josefinSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-neutral-900 font-sans">
        {children}
      </body>
    </html>
  );
}
