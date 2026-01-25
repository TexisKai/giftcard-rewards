import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import type { CollectEmailRequest, CollectEmailResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
    try {
        const body: CollectEmailRequest = await request.json();
        const { email, utm_source, utm_medium, utm_campaign } = body;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return NextResponse.json<CollectEmailResponse>(
                { success: false, error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Extract user agent and IP
        const userAgent = request.headers.get('user-agent') || undefined;
        const forwardedFor = request.headers.get('x-forwarded-for');
        const realIp = request.headers.get('x-real-ip');
        const ipAddress = forwardedFor?.split(',')[0] || realIp || undefined;

        const supabase = createServerSupabaseClient();

        // Check if Supabase is configured
        if (!supabase) {
            // Return success with a mock lead_id when database is not configured
            // This allows the frontend to work during development
            console.warn('Supabase not configured, returning mock response');
            return NextResponse.json<CollectEmailResponse>({
                success: true,
                lead_id: crypto.randomUUID(),
            });
        }

        // Check if email already exists
        const { data: existingLead } = await supabase
            .from('leads')
            .select('id')
            .eq('email', email.toLowerCase())
            .single();

        if (existingLead) {
            return NextResponse.json<CollectEmailResponse>({
                success: true,
                lead_id: existingLead.id,
                existing: true,
            });
        }

        // Insert new lead
        const { data: newLead, error } = await supabase
            .from('leads')
            .insert({
                email: email.toLowerCase(),
                source: 'landing_page',
                utm_source,
                utm_medium,
                utm_campaign,
                user_agent: userAgent,
                ip_address: ipAddress,
            })
            .select('id')
            .single();

        if (error) {
            console.error('Supabase insert error:', error);
            return NextResponse.json<CollectEmailResponse>(
                { success: false, error: 'Failed to save email' },
                { status: 500 }
            );
        }

        return NextResponse.json<CollectEmailResponse>({
            success: true,
            lead_id: newLead.id,
        });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json<CollectEmailResponse>(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
