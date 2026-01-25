import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if we have valid Supabase configuration
const isValidConfig = supabaseUrl.startsWith('http') && supabaseAnonKey.length > 0;

// Client-side Supabase client (only create if valid config)
export const supabase: SupabaseClient | null = isValidConfig
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Server-side Supabase client (can be used in API routes)
export const createServerSupabaseClient = (): SupabaseClient | null => {
    if (!isValidConfig) {
        console.warn('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
        return null;
    }
    return createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: false,
        },
    });
};
