// app/api/conversion-postback/route.js

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendMetaEvent } from '@/lib/metaConversionsAPI';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

export async function GET(request) {
    try {
        // Get parameters from Glitchy postback
        const searchParams = request.nextUrl.searchParams;
        const email = searchParams.get('email');
        const payout = parseFloat(searchParams.get('payout')) || 8.00;
        const offerName = searchParams.get('offer') || 'Unknown';

        // Log the postback received
        console.log('📥 Glitchy Postback Received:', { email, payout, offerName });

        if (!email) {
            console.error('❌ Missing email in postback');
            return NextResponse.json({ error: 'Missing email' }, { status: 400 });
        }

        // 1. Save conversion to Supabase
        const { data, error } = await supabase
            .from('conversions')
            .insert([{
                email,
                payout,
                offer_name: offerName,
                converted_at: new Date(),
                source: 'glitchy'
            }])
            .select();

        if (error) {
            console.error('❌ Supabase error:', error);
        } else {
            console.log('✅ Conversion saved to Supabase:', email);
        }

        // 2. Fire Purchase event to Meta CAPI
        await sendMetaEvent({
            eventName: 'Purchase',
            email: email,
            eventSourceUrl: 'https://sweepstakes-landing-page.vercel.app',
            clientIpAddress: '127.0.0.1', // Server-side postback, no user IP
            clientUserAgent: 'Glitchy-Postback',
            fbp: null,
            fbc: null,
            eventId: null,
            value: payout,
            currency: 'usd',
            contentName: offerName + ' Gift Card Conversion'
        });

        console.log('✅ Purchase event sent to Meta CAPI for:', email);

        // 3. Return success to Glitchy
        return NextResponse.json({
            success: true,
            message: 'Conversion tracked',
            email,
            payout
        });

    } catch (error) {
        console.error('❌ Postback handler error:', error);
        return NextResponse.json({
            error: 'Failed to process postback',
            details: error.message
        }, { status: 500 });
    }
}
