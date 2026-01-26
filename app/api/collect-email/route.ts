import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { sendMetaEvent } from '@/lib/metaConversionsAPI';
import { v4 as uuidv4 } from 'uuid';
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
        const userAgent = request.headers.get('user-agent') || 'unknown';
        const forwardedFor = request.headers.get('x-forwarded-for');
        const realIp = request.headers.get('x-real-ip');
        const ipAddress = forwardedFor?.split(',')[0]?.trim() || realIp || '127.0.0.1';
        const eventSourceUrl = request.headers.get('referer') || process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.vercel.app';

        // Extract cookies for Meta deduplication
        const cookies = request.headers.get('cookie') || '';
        const fbp = cookies.match(/_fbp=([^;]+)/)?.[1] || null;
        const fbc = cookies.match(/_fbc=([^;]+)/)?.[1] || null;

        // Generate unique event ID for deduplication
        const eventId = uuidv4();

        const supabase = createServerSupabaseClient();

        // Check if Supabase is configured
        if (!supabase) {
            // Return success with a mock lead_id when database is not configured
            // This allows the frontend to work during development
            console.warn('Supabase not configured, returning mock response');

            // Still send Meta CAPI event even without database
            await sendMetaEvent({
                eventName: 'Lead',
                email: email,
                eventSourceUrl: eventSourceUrl,
                clientIpAddress: ipAddress,
                clientUserAgent: userAgent,
                fbp: fbp,
                fbc: fbc,
                eventId: eventId,
            });

            return NextResponse.json<CollectEmailResponse>({
                success: true,
                lead_id: crypto.randomUUID(),
                eventId: eventId,
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

        // Send to Meta Conversions API
        await sendMetaEvent({
            eventName: 'Lead',
            email: email,
            eventSourceUrl: eventSourceUrl,
            clientIpAddress: ipAddress,
            clientUserAgent: userAgent,
            fbp: fbp,
            fbc: fbc,
            eventId: eventId,
        });

        return NextResponse.json<CollectEmailResponse>({
            success: true,
            lead_id: newLead.id,
            eventId: eventId,
        });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json<CollectEmailResponse>(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
