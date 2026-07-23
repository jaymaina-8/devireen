import { createClient } from '@/lib/supabase/server';
import { DatabaseError } from '@/lib/errors/DatabaseError';
import { logger } from '@/lib/logger';

export class SettingsRepository {
  static async getSettings() {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) {
        throw new DatabaseError('Failed to fetch settings');
      }

      return data;
    } catch (error) {
      logger.error('Error fetching settings', error);
      throw error;
    }
  }

  static async updateSettings(settingsData: any) {
    try {
      const supabase = await createClient();
      
      const { data: existing } = await supabase.from('settings').select('id').limit(1).maybeSingle();

      let error;
      if (existing) {
        const { error: updateError } = await supabase
          .from('settings')
          .update(settingsData)
          .eq('id', existing.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('settings')
          .insert([settingsData]);
        error = insertError;
      }

      if (error) {
        throw new DatabaseError('Failed to update settings');
      }

      return true;
    } catch (error) {
      logger.error('Error updating settings', error);
      throw error;
    }
  }
}
