import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/config/supabase'
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
  )
}