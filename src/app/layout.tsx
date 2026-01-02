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
  metadataBase: new URL("https://keystonegym.com"),
  title: {
    default: "Keystone Gym | Elite Combat Training Montreal",
    template: "%s | Keystone Gym",
  },
  description: "Private martial arts gym in Montreal. Wrestling, Boxing, Kickboxing, Grappling. Real training with coaches from Chechnya and Dagestan. By invitation only.",
  keywords: [
    "martial arts Montreal",
    "wrestling gym Montreal",
    "boxing gym Montreal",
    "kickboxing Montreal",
    "grappling Montreal",
    "MMA training Montreal",
    "combat sports Montreal",
    "private gym Montreal",
    "elite martial arts training",
    "Dagestan wrestling",
    "Saint Laurent gym",
  ],
  authors: [{ name: "Keystone Gym", url: "https://keystonegym.com" }],
  creator: "Keystone Gym",
  publisher: "Keystone Gym",
  category: "Sports & Fitness",
  openGraph: {
    title: "Keystone Gym | Elite Combat Training Montreal",
    description: "Private martial arts gym in Montreal. Real training. Real standards. No shortcuts. Wrestling, Boxing, Kickboxing, Grappling.",
    type: "website",
    locale: "en_CA",
    siteName: "Keystone Gym",
    url: "https://keystonegym.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keystone Gym | Elite Combat Training Montreal",
    description: "Private martial arts gym in Montreal. Real training. Real standards. No shortcuts.",
    creator: "@keystonegym",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://keystonegym.com",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
