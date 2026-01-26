'use client';

import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

interface EmailPopupProps {
    onEmailSubmit: (email: string, leadId: string) => void;
}

export default function EmailPopup({ onEmailSubmit }: EmailPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const hasSubmitted = localStorage.getItem('emailSubmitted');
        if (!hasSubmitted) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/collect-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                // Fire pixel with same event_id for deduplication
                if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq && data.eventId) {
                    (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', 'Lead', {}, {
                        eventID: data.eventId // CRITICAL: Same ID as CAPI
                    });
                }

                localStorage.setItem('emailSubmitted', 'true');
                onEmailSubmit(email, data.lead_id || data.id);
                setIsOpen(false);
                toast.success('Email saved! Continue to claims.');
            } else {
                toast.error(data.error || 'Something went wrong');
            }
        } catch {
            toast.error('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return <Toaster position="top-center" />;

    return (
        <>
            <Toaster position="top-center" />

            {/* Full screen overlay with solid dark background */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                }}
            >
                {/* White Modal Card - SOLID white background, mobile optimized */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '380px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '24px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
                        padding: '28px 24px',
                        margin: '0 auto',
                    }}
                >
                    {/* Small close button - top right */}
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#9CA3AF',
                            fontSize: '18px',
                            padding: 0,
                        }}
                        aria-label="Close popup"
                    >
                        ×
                    </button>
                    {/* Pre-heading - small uppercase BOLD */}
                    <p
                        style={{
                            fontFamily: 'Piazzolla, sans-serif',
                            fontWeight: 700,
                            fontSize: '11px',
                            color: '#1F2937',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            marginBottom: '8px',
                        }}
                    >
                        IMPORTANT DO NOT SKIP
                    </p>

                    {/* Main Heading - VERY bold like original */}
                    <h2
                        style={{
                            fontFamily: 'Georgia, "Times New Roman", serif',
                            fontSize: '32px',
                            fontWeight: 900,
                            color: '#000000',
                            marginBottom: '16px',
                            lineHeight: 1.2,
                        }}
                    >
                        Before YOU Continue
                    </h2>

                    {/* Subtitle/Description */}
                    <p
                        style={{
                            fontFamily: 'Piazzolla, sans-serif',
                            fontSize: '15px',
                            color: '#4B5563',
                            marginBottom: '24px',
                            lineHeight: 1.6,
                        }}
                    >
                        Enter your email so rewards can be sent if you become eligible. Gift cards are unlocked only after completing the required deals and surveys.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: '1px solid #D1D5DB',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontFamily: 'Piazzolla, sans-serif',
                                marginBottom: '16px',
                                outline: 'none',
                                boxSizing: 'border-box',
                                backgroundColor: '#FFFFFF',
                            }}
                        />

                        {/* Submit Button - pink rounded, full width */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                backgroundColor: '#F472B6',
                                color: '#FFFFFF',
                                borderRadius: '36px',
                                fontFamily: 'Piazzolla, sans-serif',
                                padding: '14px 24px',
                                fontSize: '16px',
                                fontWeight: 600,
                                border: 'none',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                opacity: isLoading ? 0.5 : 1,
                                transition: 'opacity 0.2s',
                            }}
                        >
                            {isLoading ? 'Saving...' : 'Continue to offers'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
