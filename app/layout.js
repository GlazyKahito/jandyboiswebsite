import { Cormorant_Garamond, Lora, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const notoDevanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Janardhan Aghav (Jandy) | Biology Educator — SRJC, Thane",
  description: "Academic portfolio and teaching archive of Janardhan Aghav (Jandy), Biology Faculty at SRJC, Thane, Maharashtra. Vintage dark academia portfolio with educational resources and curriculum notes.",
  keywords: ["Janardhan Aghav", "Jandy", "Biology Educator", "SRJC Thane", "Biology Faculty", "NEET Biology", "Maharashtra HSC Biology", "Academic Portfolio"],
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
      className={`${cormorant.variable} ${lora.variable} ${notoDevanagari.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#211711] text-[#E8DCC5] font-serif antialiased selection:bg-[#A67C52] selection:text-[#211711]">
        {children}
      </body>
    </html>
  );
}
