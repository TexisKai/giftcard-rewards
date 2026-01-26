// lib/metaConversionsAPI.ts

import bizSdk from 'facebook-nodejs-business-sdk';
import crypto from 'crypto';

const Content = bizSdk.Content;
const CustomData = bizSdk.CustomData;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;

const access_token = process.env.META_CAPI_TOKEN || '';
const pixel_id = '1223033783118414';

// Initialize API only if token exists
if (access_token) {
    bizSdk.FacebookAdsApi.init(access_token);
}

interface MetaEventParams {
    eventName: string;
    email?: string | null;
    eventSourceUrl: string;
    clientIpAddress: string;
    clientUserAgent: string;
    fbp?: string | null;
    fbc?: string | null;
    eventId?: string | null;
    value?: number | null;
    currency?: string;
    contentName?: string | null;
}

export async function sendMetaEvent({
    eventName,
    email = null,
    eventSourceUrl,
    clientIpAddress,
    clientUserAgent,
    fbp = null,
    fbc = null,
    eventId = null,
    value = null,
    currency = 'usd',
    contentName = null,
}: MetaEventParams): Promise<{ success: boolean; response?: unknown; error?: string }> {

    // Skip if no access token configured
    if (!access_token) {
        console.warn('⚠️ META_CAPI_TOKEN not configured, skipping CAPI event');
        return { success: false, error: 'META_CAPI_TOKEN not configured' };
    }

    try {
        // Hash email for privacy
        const hashedEmail = email ?
            crypto.createHash('sha256').update(email.toLowerCase().trim()).digest('hex')
            : null;

        // Build user data
        const userData = new UserData()
            .setClientIpAddress(clientIpAddress)
            .setClientUserAgent(clientUserAgent);

        if (hashedEmail) userData.setEmails([hashedEmail]);
        if (fbp) userData.setFbp(fbp);
        if (fbc) userData.setFbc(fbc);

        // Build custom data
        const customData = new CustomData();
        if (value) customData.setValue(value).setCurrency(currency);
        if (contentName) customData.setContentName(contentName);

        // Create server event
        const serverEvent = new ServerEvent()
            .setEventName(eventName)
            .setEventTime(Math.floor(Date.now() / 1000))
            .setUserData(userData)
            .setCustomData(customData)
            .setEventSourceUrl(eventSourceUrl)
            .setActionSource('website');

        if (eventId) serverEvent.setEventId(eventId);

        // Send to Meta
        const eventRequest = new EventRequest(access_token, pixel_id)
            .setEvents([serverEvent]);

        const response = await eventRequest.execute();

        console.log('✅ Meta CAPI Event Sent:', eventName);
        return { success: true, response };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('❌ Meta CAPI Error:', errorMessage);
        return { success: false, error: errorMessage };
    }
}
