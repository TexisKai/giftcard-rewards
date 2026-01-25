// Meta Pixel tracking helper functions

declare global {
    interface Window {
        fbq: (
            action: string,
            event: string,
            params?: Record<string, unknown>
        ) => void;
    }
}

/**
 * Track email lead submission
 */
export const trackLead = () => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
            content_name: 'Sweepstakes Email Capture',
            value: 0.0,
            currency: 'USD',
        });
    }
};

/**
 * Track offer link click
 */
export const trackOfferClick = (offerName: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'InitiateCheckout', {
            content_name: offerName,
            content_type: 'offer_link',
        });
    }
};

/**
 * Track page view (already handled by Meta Pixel script, but can be called manually)
 */
export const trackPageView = () => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PageView');
    }
};
