'use client';

import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { trackLead } from '@/lib/metaPixel';

interface EmailPopupProps {
    onEmailSubmit?: (email: string, leadId: string) => void;
}

export default function EmailPopup({ onEmailSubmit }: EmailPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if email was already submitted
        const leadId = localStorage.getItem('lead_id');
        if (leadId) {
            return; // Don't show popup if already submitted
        }

        // Show popup after 1 second
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        try {
            // Get UTM parameters from URL
            const urlParams = new URLSearchParams(window.location.search);
            const utm_source = urlParams.get('utm_source') || undefined;
            const utm_medium = urlParams.get('utm_medium') || undefined;
            const utm_campaign = urlParams.get('utm_campaign') || undefined;

            const response = await fetch('/api/collect-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    utm_source,
                    utm_medium,
                    utm_campaign,
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Store lead_id in localStorage
                localStorage.setItem('lead_id', data.lead_id);

                // Fire Meta Pixel Lead event
                trackLead();

                // Show success message
                toast.success('Email saved! Continue to offers below.');

                // Close popup
                setIsOpen(false);

                // Callback
                if (onEmailSubmit) {
                    onEmailSubmit(email, data.lead_id);
                }
            } else {
                toast.error(data.error || 'Failed to save email. Please try again.');
            }
        } catch (error) {
            console.error('Submit error:', error);
            toast.error('Failed to save email. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <Toaster position="top-center" />
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl animate-slideUp">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-gray-600 transition"
                        aria-label="Close"
                    >
                        ×
                    </button>

                    <p className="text-xs text-gray-600 mb-2 font-semibold">
                        IMPORTANT DO NOT SKIP
                    </p>
                    <h2
                        className="text-3xl font-bold mb-3"
                        style={{ fontFamily: 'var(--font-arbutus)' }}
                    >
                        Before YOU Continue
                    </h2>
                    <p
                        className="text-sm mb-6 text-gray-700"
                        style={{ fontFamily: 'var(--font-piazzolla)' }}
                    >
                        Enter your email so rewards can be sent if you become eligible.
                        Gift cards are unlocked only after completing the required deals and
                        surveys.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-pink-300"
                            required
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#FFB3C6] text-black font-semibold py-3 rounded-full hover:bg-[#FF9BB3] transition disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Continue to offers'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
