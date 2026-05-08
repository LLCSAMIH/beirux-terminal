import type { Metadata } from "next";
import { Anton, Space_Mono, Sora, Urbanist, JetBrains_Mono, Playfair_Display, Source_Serif_4 } from "next/font/google";
import LenisProvider from "@/providers/LenisProvider";
import "./globals.scss";

const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400", display: "swap" });
const spaceMono = Space_Mono({ variable: "--font-space-mono", subsets: ["latin"], weight: ["400", "700"], display: "swap" });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], display: "swap" });
const urbanist = Urbanist({ variable: "--font-urbanist", subsets: ["latin"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });
const playfairDisplay = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });
const sourceSerif = Source_Serif_4({ variable: "--font-source-serif", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "BEIRUX | We build. We ship. We show the work.",
  description: "Digital agency that ships real products with AI-powered systems.",
};

const fontVars = [
  anton, spaceMono, sora, urbanist, jetbrainsMono, playfairDisplay, sourceSerif,
].map(f => f.variable).join(" ");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVars}>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
