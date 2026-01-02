import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { CookieConsent } from "@/components/CookieConsent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Keystone Gym | Elite Combat Training Montreal",
  description: "Private martial arts gym in Montreal. Wrestling, Boxing, Kickboxing, Grappling. By invitation only.",
  keywords: ["martial arts", "wrestling", "boxing", "kickboxing", "grappling", "Montreal", "gym", "combat training"],
  authors: [{ name: "Keystone Gym" }],
  openGraph: {
    title: "Keystone Gym",
    description: "Elite Combat Training in Montreal. Real training. Real standards. No shortcuts.",
    type: "website",
    locale: "en_CA",
    siteName: "Keystone Gym",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keystone Gym",
    description: "Elite Combat Training in Montreal",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
