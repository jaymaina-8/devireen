import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/Toaster";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

import { SettingsRepository } from "@/lib/supabase/repositories/settings.repository";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await SettingsRepository.getSettings() || {};
  return {
    title: {
      default: settings.default_seo_title || siteConfig.name,
      template: `%s | ${settings.company_name || siteConfig.name}`,
    },
    description: settings.default_seo_description || siteConfig.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await SettingsRepository.getSettings() || {};

  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-text-body font-sans" suppressHydrationWarning>
        {children}
        <ScrollToTop />
        <FloatingWhatsApp />
        <Toaster />
      </body>
    </html>
  );
}
