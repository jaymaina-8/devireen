import { z } from 'zod';

export const seoSchema = z.object({
  id: z.string().optional(),
  entity_type: z.string().min(1),
  entity_id: z.string().uuid().optional().nullable(),
  slug: z.string().optional().nullable(),
  page_title: z.string().min(1, 'Page title is required'),
  meta_description: z.string().optional().nullable(),
  og_title: z.string().optional().nullable(),
  og_description: z.string().optional().nullable(),
  og_image: z.string().url().optional().nullable().or(z.literal('')),
  canonical_url: z.string().url().optional().nullable().or(z.literal('')),
  robots_settings: z.string().optional().nullable(),
  keywords: z.string().optional().nullable(),
});

export type SeoFormData = z.infer<typeof seoSchema>;
