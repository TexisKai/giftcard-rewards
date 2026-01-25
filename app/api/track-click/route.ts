import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import type { TrackClickRequest, TrackClickResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
    try {
        const body: TrackClickRequest = await request.json();
        const { lead_id, offer_name, offer_url } = body;

        // Validate required fields
        if (!offer_name || !offer_url) {
            return NextResponse.json<TrackClickResponse>(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const supabase = createServerSupabaseClient();

        // Check if Supabase is configured
        if (!supabase) {
            // Return success when database is not configured
            // This allows the frontend to work during development
            console.warn('Supabase not configured, skipping click tracking');
            return NextResponse.json<TrackClickResponse>({ success: true });
        }

        // Insert click record
        const { error } = await supabase.from('offer_clicks').insert({
            lead_id: lead_id || null,
            offer_name,
            offer_url,
        });

        if (error) {
            console.error('Supabase insert error:', error);
            return NextResponse.json<TrackClickResponse>(
                { success: false, error: 'Failed to track click' },
                { status: 500 }
            );
        }

        return NextResponse.json<TrackClickResponse>({ success: true });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json<TrackClickResponse>(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
