import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { CookieConsent } from "@/components/CookieConsent";
import { routing } from "@/i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const isEn = locale === "en";

  return {
    metadataBase: new URL("https://keystonegym.com"),
    title: {
      default: isEn
        ? "Keystone Gym | Elite Combat Training Montreal"
        : "Keystone Gym | Entraînement de combat d'élite Montréal",
      template: "%s | Keystone Gym",
    },
    description: isEn
      ? "Private martial arts gym in Montreal. Wrestling, Boxing, Kickboxing, Grappling. Real training with coaches from Chechnya and Dagestan. By invitation only."
      : "Gym d'arts martiaux privé à Montréal. Lutte, Boxe, Kickboxing, Grappling. Entraînement authentique avec des coachs de Tchétchénie et du Daghestan. Sur invitation seulement.",
    keywords: isEn
      ? ["martial arts Montreal", "wrestling gym Montreal", "boxing gym Montreal", "kickboxing Montreal", "grappling Montreal", "MMA training Montreal", "combat sports Montreal", "private gym Montreal", "elite martial arts training", "Dagestan wrestling", "Saint Laurent gym"]
      : ["arts martiaux Montréal", "gym de lutte Montréal", "gym de boxe Montréal", "kickboxing Montréal", "grappling Montréal", "entraînement MMA Montréal", "sports de combat Montréal", "gym privé Montréal", "entraînement arts martiaux élite", "lutte Daghestan", "gym Saint-Laurent"],
    authors: [{ name: "Keystone Gym", url: "https://keystonegym.com" }],
    creator: "Keystone Gym",
    publisher: "Keystone Gym",
    category: "Sports & Fitness",
    openGraph: {
      title: isEn ? "Keystone Gym | Elite Combat Training Montreal" : "Keystone Gym | Entraînement de combat d'élite Montréal",
      description: isEn
        ? "Private martial arts gym in Montreal. Real training. Real standards. No shortcuts."
        : "Gym d'arts martiaux privé à Montréal. Entraînement authentique. Vrais standards. Sans compromis.",
      type: "website",
      locale: isEn ? "en_CA" : "fr_CA",
      siteName: "Keystone Gym",
      url: "https://keystonegym.com",
    },
    twitter: {
      card: "summary_large_image",
      title: isEn ? "Keystone Gym | Elite Combat Training Montreal" : "Keystone Gym | Entraînement de combat d'élite Montréal",
      description: isEn
        ? "Private martial arts gym in Montreal. Real training. Real standards. No shortcuts."
        : "Gym d'arts martiaux privé à Montréal. Entraînement authentique. Vrais standards. Sans compromis.",
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
      canonical: `https://keystonegym.com/${locale}`,
      languages: {
        en: "https://keystonegym.com/en",
        fr: "https://keystonegym.com/fr",
      },
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieConsent />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
