import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const notoDevanagari = Noto_Serif_Devanagari({
  variable: "--font-noto-deva",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Janardhan Aghav (Jandy) | Biology Educator — SRJC, Thane",
  description: "Academic portfolio and teaching archive of Janardhan Aghav (Jandy), Biology Faculty at Shubham Raje Junior College (SRJC), Thane West, Maharashtra. Biology resources, lecture notes and curriculum insights.",
  keywords: ["Janardhan Aghav", "Jandy", "Biology Educator", "SRJC Thane", "Shubham Raje Junior College", "Biology Faculty", "NEET Biology", "Maharashtra HSC Biology", "Academic Portfolio"],
  authors: [{ name: "Janardhan Aghav" }],
  creator: "Janardhan Aghav",
  openGraph: {
    title: "Janardhan Aghav (Jandy) — Biology Educator",
    description: "Curated academic archive, lecture notes, biology resources, and curriculum insights.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} ${notoDevanagari.variable} dark`}
    >
      <body className="min-h-screen bg-ink text-parchment font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
