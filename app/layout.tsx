import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

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
    <html lang="en" className={`${display.variable} h-full`}>
      <body className="antialiased min-h-full">
        {children}
      </body>
    </html>
  );
}
