import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { QuoteCartContainer } from '@/components/cart/QuoteCartContainer';
import { SettingsRepository } from '@/lib/supabase/repositories/settings.repository';
import { fetchCategories } from '@/actions/category.actions';

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, categoriesResult] = await Promise.all([
    SettingsRepository.getSettings(),
    fetchCategories(),
  ]);
  const categories = categoriesResult.success
    ? categoriesResult.data || []
    : [];

  return (
    <>
      <Navbar settings={settings || {}} categories={categories} />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer settings={settings} />
      <QuoteCartContainer />
    </>
  );
}
