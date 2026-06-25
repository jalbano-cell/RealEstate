import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-neutral-900 font-sans">
        {children}
      </body>
    </html>
  );
}
