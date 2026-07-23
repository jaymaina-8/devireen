import { z } from 'zod';

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("Must be a valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "Anon key is required"),
  NEXT_PUBLIC_SITE_URL: z.string().url("Must be a valid URL").default('http://localhost:3000'),
  NEXT_PUBLIC_COMPANY_NAME: z.string().min(1).default('Devireen Enterprise'),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().min(1).default('+254708037929'),
});

const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "Service role key is required"),
});

const processEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME,
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  ...(typeof window === 'undefined' ? { SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY } : {}),
};

const parsedClientEnv = clientSchema.safeParse(processEnv);

if (!parsedClientEnv.success) {
  console.log('processEnv debug:', processEnv);
  console.error('Invalid client environment variables:', parsedClientEnv.error.format());
  throw new Error('Invalid client env: ' + JSON.stringify(parsedClientEnv.error.format()) + ' env: ' + JSON.stringify(processEnv));
}

let parsedServerEnv = null;
if (typeof window === 'undefined') {
  parsedServerEnv = serverSchema.safeParse(processEnv);
  if (!parsedServerEnv.success) {
    console.error('Invalid server environment variables:', parsedServerEnv.error.format());
    // Fallback or warning instead of crashing build if they don't have it locally,
    // but the prompt explicitly states: "Fail immediately if any required variable is missing or invalid."
    throw new Error('Invalid server environment variables');
  }
}

export const env = {
  ...parsedClientEnv.data,
  ...(parsedServerEnv ? parsedServerEnv.data : { SUPABASE_SERVICE_ROLE_KEY: '' }),
};
