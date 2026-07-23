import { z } from 'zod';

export const brandSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with dashes'),
  logo_url: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
});

export type BrandFormData = z.infer<typeof brandSchema>;
