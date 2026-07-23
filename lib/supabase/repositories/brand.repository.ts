import { createClient } from '@/lib/supabase/server';
import { DatabaseError } from '@/lib/errors/DatabaseError';
import { logger } from '@/lib/logger';

export class BrandRepository {
  static async getBrands() {
    const supabase = await createClient();
    const { data } = await supabase.from('brands').select('*').is('deleted_at', null).order('name');
    return data || [];
  }

  static async getBrandById(id: string) {
    const supabase = await createClient();
    const { data } = await supabase.from('brands').select('*').eq('id', id).single();
    return data;
  }

  static async createBrand(data: any) {
    try {
      const supabase = await createClient();
      
      // Check duplicate slug
      const { data: existing } = await supabase.from('brands').select('id').eq('slug', data.slug).single();
      if (existing) {
        throw new Error('A brand with this slug already exists.');
      }

      const { data: newBrand, error } = await supabase.from('brands').insert([data]).select().single();
      if (error) throw new DatabaseError('Failed to create brand');
      return newBrand;
    } catch (error) {
      logger.error('Error creating brand', error);
      throw error;
    }
  }

  static async updateBrand(id: string, data: any) {
    try {
      const supabase = await createClient();
      
      // Check duplicate slug
      const { data: existing } = await supabase.from('brands').select('id').eq('slug', data.slug).neq('id', id).single();
      if (existing) {
        throw new Error('A brand with this slug already exists.');
      }

      const { data: updatedBrand, error } = await supabase.from('brands').update(data).eq('id', id).select().single();
      if (error) throw new DatabaseError('Failed to update brand');
      return updatedBrand;
    } catch (error) {
      logger.error('Error updating brand', error);
      throw error;
    }
  }

  static async deleteBrand(id: string) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from('brands').update({ deleted_at: new Date().toISOString() }).eq('id', id);
      if (error) throw new DatabaseError('Failed to delete brand');
      return true;
    } catch (error) {
      logger.error('Error deleting brand', error);
      throw error;
    }
  }
}
