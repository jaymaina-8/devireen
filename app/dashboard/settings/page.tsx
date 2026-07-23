import { SettingsRepository } from '@/lib/supabase/repositories/settings.repository';
import { updateSettingsAction } from '@/actions/settings.actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { SettingsForm } from '@/components/dashboard/settings/SettingsForm';

export const metadata = {
  title: 'Settings | Devireen Enterprise',
};

export default async function SettingsPage() {
  const settings = await SettingsRepository.getSettings() || {};

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Enterprise Settings</h1>
        <p className="text-gray-500">Manage your core business operations, contact information, and tax settings.</p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  );
}
