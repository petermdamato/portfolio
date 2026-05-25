import type { Metadata } from "next";
import { Instrument_Serif, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-body",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const displayFont = Instrument_Serif({
  variable: "--font-display",
  weight: ["400"],
  subsets: ["latin"],
});

const metaFont = IBM_Plex_Mono({
  variable: "--font-meta",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peter D'Amato — Data Storyteller",
  description:
    "Portfolio of Peter D'Amato — data visualization, full-stack development, and AI engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} ${metaFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
