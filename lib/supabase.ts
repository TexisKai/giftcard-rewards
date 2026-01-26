import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

// Check if we have valid Supabase configuration
const isValidConfig = supabaseUrl.startsWith('http') && supabaseAnonKey.length > 0;
const isServerConfigValid = supabaseUrl.startsWith('http') && supabaseServiceKey.length > 0;

// Client-side Supabase client (only create if valid config)
export const supabase: SupabaseClient | null = isValidConfig
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Server-side Supabase client with SERVICE ROLE KEY (bypasses RLS)
// Use this in API routes for insert/update/delete operations
export const createServerSupabaseClient = (): SupabaseClient | null => {
    if (!isServerConfigValid) {
        // Fall back to anon key if service key not available
        if (isValidConfig) {
            console.warn('SUPABASE_SERVICE_KEY not configured, using anon key (RLS will apply)');
            return createClient(supabaseUrl, supabaseAnonKey, {
                auth: {
                    persistSession: false,
                },
            });
        }
        console.warn('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY');
        return null;
    }
    return createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            persistSession: false,
        },
    });
};
