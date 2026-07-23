import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { QuoteCartContainer } from "@/components/cart/QuoteCartContainer";
import { SettingsRepository } from "@/lib/supabase/repositories/settings.repository";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await SettingsRepository.getSettings() || {};

  return (
    <>
      <Navbar settings={settings} />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer settings={settings} />
      <QuoteCartContainer />
    </>
  );
}
