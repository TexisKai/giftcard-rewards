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
            {/* Overlay - softer blur matching Beacons */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                {/* Modal - rounded-3xl, no harsh border */}
                <div className="bg-white rounded-3xl w-[90%] max-w-md p-6 relative shadow-2xl animate-slideUp">
                    {/* Close button - cleaner styling */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full 
                       text-gray-400 hover:text-gray-600 hover:bg-gray-100 
                       transition-colors"
                        aria-label="Close"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    {/* Label */}
                    <p className="text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wide">
                        Important — Do Not Skip
                    </p>

                    {/* Heading */}
                    <h2
                        className="text-2xl md:text-3xl font-bold mb-2 text-gray-900"
                        style={{ fontFamily: 'var(--font-arbutus)' }}
                    >
                        Before YOU Continue
                    </h2>

                    {/* Description */}
                    <p
                        className="text-sm mb-5 text-gray-600 leading-relaxed"
                        style={{ fontFamily: 'var(--font-piazzolla)' }}
                    >
                        Enter your email so rewards can be sent if you become eligible.
                        Gift cards are unlocked only after completing the required deals and
                        surveys.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl mb-3 
                         text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent
                         transition-all"
                            required
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#FFB3C6] text-gray-900 font-semibold py-3.5 rounded-full 
                         hover:bg-[#FFA0B8] hover:shadow-md
                         active:scale-[0.98]
                         transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed
                         min-h-[48px]"
                        >
                            {isLoading ? 'Saving...' : 'Continue to offers'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
