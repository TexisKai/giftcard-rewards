'use client';

import { useState } from 'react';

const TESTIMONIALS = [
    {
        name: 'Sarah M.',
        active: 'Active now',
        message: 'OMG I just received my Amazon gift card!! 🎉🎁 $750 is REAL!',
        subMessage: 'About 3 days after completing the deals. Totally worth it! 💯',
        color: 'bg-blue-500',
        initial: 'S',
    },
    {
        name: 'Jessica K.',
        active: 'Active 2m ago',
        message: "Just got my SHEIN gift card! Can't believe this actually works 😍",
        subMessage: 'Shopping spree here I come! 🛍️',
        color: 'bg-pink-500',
        initial: 'J',
    },
    {
        name: 'Mike R.',
        active: 'Active 5m ago',
        message: 'Target gift card came through! Thanks for the recommend! 🙏',
        subMessage: "Just bought a new TV with it. Best thing I've done all year!",
        color: 'bg-blue-600',
        initial: 'M',
    },
    {
        name: 'Emily T.',
        active: 'Active now',
        message: 'Update: Got ALL THREE cards! 🎊 Amazon + Shein + Target',
        subMessage: "That's $2250 total!! 💰💰💰",
        color: 'bg-purple-500',
        initial: 'E',
    },
    {
        name: 'David L.',
        active: 'Active 1h ago',
        message: 'Just want to say THANK YOU! 🙌 This changed my month honestly',
        subMessage: 'Started with Amazon, doing Target next week! 🎧',
        color: 'bg-blue-500',
        initial: 'D',
    },
];

export default function TestimonialsCarousel() {
    return (
        <div className="mb-12">
            <h3
                className="text-center text-xl font-bold mb-6 text-gray-900"
                style={{ fontFamily: 'var(--font-arbutus)' }}
            >
                Top winners of the offers
            </h3>

            {/* Snap Scroll Container */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                {TESTIMONIALS.map((t, index) => (
                    <div
                        key={index}
                        className="snap-center shrink-0 w-[85vw] md:w-[350px] bg-white rounded-3xl p-6 shadow-lg border-2 border-black flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-lg border-2 border-black`}>
                                {t.initial}
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">{t.name}</p>
                                <p className="text-xs text-gray-500">{t.active}</p>
                            </div>
                            <div className="ml-auto bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                                VERIFIED
                            </div>
                        </div>

                        {/* Message Bubbles */}
                        <div className="space-y-3">
                            <div className="bg-blue-500 text-white p-4 rounded-2xl rounded-tl-none text-sm md:text-base leading-relaxed shadow-sm">
                                {t.message}
                            </div>
                            {t.subMessage && (
                                <div className="bg-blue-500 text-white p-4 rounded-2xl rounded-tl-none text-sm md:text-base leading-relaxed shadow-sm">
                                    {t.subMessage}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-2">Swipe to see more ⬅️➡️</p>
        </div>
    );
}
