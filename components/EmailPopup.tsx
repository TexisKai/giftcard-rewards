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
        // Check if user has already submitted email
        const hasSubmitted = localStorage.getItem('emailSubmitted');
        if (!hasSubmitted) {
            // Show popup after 1 second
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
                localStorage.setItem('emailSubmitted', 'true');
                onEmailSubmit(email, data.id);
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

    if (!isOpen) return null;

    return (
        <>
            <Toaster position="top-center" />

            {/* Overlay */}
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
                {/* Modal - styled like Beacons popup */}
                <div
                    className="relative w-full max-w-md bg-white p-6"
                    style={{
                        borderRadius: '24px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        aria-label="close pop-up"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Label */}
                    <p
                        className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide"
                        style={{ fontFamily: 'Piazzolla, sans-serif' }}
                    >
                        Important — Do Not Skip
                    </p>

                    {/* Heading */}
                    <h2
                        className="text-2xl font-bold mb-3 text-black"
                        style={{ fontFamily: '"Arbutus Slab", sans-serif' }}
                    >
                        Before YOU Continue
                    </h2>

                    {/* Description */}
                    <p
                        className="text-sm mb-5 text-gray-600 leading-relaxed"
                        style={{ fontFamily: 'Piazzolla, sans-serif' }}
                    >
                        Enter your email so rewards can be sent if you become eligible.
                        Gift cards are unlocked only after completing the required deals and surveys.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl mb-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all"
                            required
                            disabled={isLoading}
                            style={{ fontFamily: 'Piazzolla, sans-serif' }}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                backgroundColor: 'rgb(255, 182, 193)', // Light pink
                                color: 'rgb(0, 0, 0)',
                                borderRadius: '36px',
                                fontFamily: 'Piazzolla, sans-serif',
                                minHeight: '48px',
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
