import { createClient } from '@/lib/supabase/server';
import { DatabaseError } from '@/lib/errors/DatabaseError';
import { logger } from '@/lib/logger';

export class SeoRepository {
  static async getSeoMetadata(entityType: string, entityId?: string, slug?: string) {
    try {
      const supabase = await createClient();
      let query = supabase.from('seo_metadata').select('*').eq('entity_type', entityType);

      if (entityId) {
        query = query.eq('entity_id', entityId);
      } else if (slug) {
        query = query.eq('slug', slug);
      }

      const { data, error } = await query.maybeSingle();

      if (error) {
        throw new DatabaseError('Failed to fetch SEO metadata');
      }

      return data;
    } catch (error) {
      logger.error('Error fetching SEO metadata', error);
      throw error;
    }
  }

  static async getAllSeoMetadata() {
    const supabase = await createClient();
    const { data } = await supabase.from('seo_metadata').select('*').order('created_at', { ascending: false });
    return data || [];
  }

  static async upsertSeoMetadata(seoData: any) {
    try {
      const supabase = await createClient();
      
      const { error } = await supabase
        .from('seo_metadata')
        .upsert(seoData, { onConflict: 'id' });

      if (error) {
        throw new DatabaseError('Failed to upsert SEO metadata');
      }

      return true;
    } catch (error) {
      logger.error('Error upserting SEO metadata', error);
      throw error;
    }
  }
}
