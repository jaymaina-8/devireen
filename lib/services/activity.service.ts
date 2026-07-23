import { createClient } from '@/lib/supabase/server';

export type ActivityAction = 'created' | 'updated' | 'deleted' | 'blocked' | 'approved' | 'rejected' | 'fulfilled';
export type EntityType = 'product' | 'quote' | 'order' | 'customer' | 'testimonial' | 'settings';

export class ActivityService {
  static async logActivity(action: ActivityAction, entityType: EntityType, entityId?: string, details?: any) {
    const supabase = await createClient();
    
    // Get current user doing the action
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase.from('activity_logs').insert({
      user_id: user?.id,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details: details || {}
    });

    if (error) {
      console.error('Failed to log activity:', error);
    }
  }

  static async getRecentActivity(limit = 10) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*, profiles:user_id(full_name, email)')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Failed to fetch activity logs:', error);
      return [];
    }
    return data;
  }
}

export class NotificationService {
  static async createNotification(userId: string, title: string, message: string, link?: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('notifications').insert({
      user_id: userId,
      title,
      message,
      link
    });

    if (error) {
      console.error('Failed to create notification:', error);
    }
  }

  static async getUnreadNotifications() {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('is_read', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch notifications:', error);
      return [];
    }
    return data;
  }

  static async markAsRead(notificationId: string) {
    const supabase = await createClient();
    await supabase.from('notifications').update({ is_read: true }).eq('id', notificationId);
  }
}
