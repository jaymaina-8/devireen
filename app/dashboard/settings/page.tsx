import { SettingsRepository } from '@/lib/supabase/repositories/settings.repository';
import { SettingsForm } from '@/components/dashboard/settings/SettingsForm';
import { Settings } from 'lucide-react';

export const metadata = {
  title: 'Enterprise Settings | Devireen Enterprise OS',
};

export default async function SettingsPage() {
  const settings = (await SettingsRepository.getSettings()) || {};

  return (
    <div className="max-w-5xl space-y-6">
      <div className="border-b border-slate-200/80 pb-5">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
          <Settings className="h-6 w-6 text-slate-700" /> Enterprise Operations
          Settings
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Configure company profiles, KRA tax credentials, operating hours, and
          quotation defaults.
        </p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  );
}
