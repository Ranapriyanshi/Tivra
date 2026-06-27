import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Tivra — Websites for Startups & Small Businesses",
  description:
    "Building intelligent software that works at the speed of thought. Get a stunning, high-performance website for your startup or small business.",
  openGraph: {
    title: "Tivra — Websites for Startups & Small Businesses",
    description:
      "We build beautiful, high-performance websites for startups and small businesses — fast.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geist.variable} font-[family-name:var(--font-geist)] antialiased min-h-full`}
      >
        {children}
      </body>
    </html>
  );
}
