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
                {/* Modal - rounded-3xl with border */}
                <div className="bg-white rounded-3xl border-2 border-black w-[90%] max-w-md p-6 md:p-8 relative shadow-2xl animate-slideUp">
                    {/* Close button - cleaner styling */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full 
                       text-gray-400 hover:text-gray-600 hover:bg-gray-100 
                       transition-colors"
                        aria-label="Close"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    {/* Label */}
                    <p className="text-xs text-gray-500 mb-2 font-bold uppercase tracking-wide text-center">
                        Important — Do Not Skip
                    </p>

                    {/* Heading */}
                    <h2
                        className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 text-center"
                        style={{ fontFamily: 'var(--font-arbutus)' }}
                    >
                        Before YOU Continue
                    </h2>

                    {/* Description */}
                    <p
                        className="text-base mb-6 text-gray-700 leading-relaxed text-center"
                        style={{ fontFamily: 'var(--font-inter)' }}
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
                            className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl mb-4 
                         text-gray-900 placeholder-gray-500
                         focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-black
                         transition-all text-base"
                            required
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#FFB3C6] text-black font-bold py-3.5 rounded-xl border-2 border-black
                         hover:bg-[#FF9BB3] hover:shadow-lg hover:scale-[1.02]
                         active:scale-[0.98]
                         transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed
                         min-h-[52px] shadow-md"
                        >
                            {isLoading ? 'Saving...' : 'Continue to offers'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
