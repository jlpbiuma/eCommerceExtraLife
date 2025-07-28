import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL) {
  throw new Error('Missing SUPABASE_URL environment variable');
}

if (!process.env.SUPABASE_API_KEY) {
  throw new Error('Missing SUPABASE_API_KEY environment variable');
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  }
); 