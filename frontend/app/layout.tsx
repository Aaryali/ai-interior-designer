import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans-main",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif-main",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Forma — AI-Powered Virtual Interior Design & Product Visualization",
  description:
    "AI-powered virtual interior design and product visualization system using computer vision and generative AI. Transform spaces, preview real furniture, and explore lighting and multi-angle perspectives.",
  keywords: [
    "AI Interior Design",
    "Computer Vision",
    "Generative AI",
    "Product Visualization",
    "Virtual Staging",
    "Spatial Intelligence"
  ],
  authors: [{ name: "AI Interior Designer Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${cormorantGaramond.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FAF8F5] text-[#181716] flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
