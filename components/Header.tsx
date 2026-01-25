'use client';

import Image from 'next/image';
import { Bell, Share2 } from 'lucide-react';

export default function Header() {
    return (
        <div className="text-center">
            {/* Profile Image - exactly 96x96 with 2px black border */}
            <div className="flex justify-center mb-4">
                <div
                    className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden"
                    style={{ border: '2px solid rgb(0, 0, 0)' }}
                >
                    {/* Dollar sign icon styled like the original */}
                    <span
                        className="text-5xl font-bold text-black"
                        style={{ fontFamily: 'var(--font-arbutus)' }}
                    >
                        $
                    </span>
                </div>
            </div>

            {/* Title - Arbutus Slab, 48px equivalent */}
            <h1
                className="text-4xl md:text-5xl font-bold text-black mb-2"
                style={{ fontFamily: '"Arbutus Slab", sans-serif' }}
            >
                Claim Your Reward
            </h1>

            {/* Subtitle - Piazzolla, 16px */}
            <p
                className="text-base text-black mb-6 px-10"
                style={{ fontFamily: 'Piazzolla, sans-serif' }}
            >
                Fill Your Details,Install Apps &amp; Get Giftcode Worth $750
            </p>
        </div>
    );
}
