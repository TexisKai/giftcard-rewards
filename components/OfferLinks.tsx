'use client';

import Image from 'next/image';
import { trackOfferClick } from '@/lib/metaPixel';

interface Offer {
    name: string;
    logo: string;
    url: string;
    requirements: string;
}

const offers: Offer[] = [
    {
        name: 'Claim $750 Amazon gift card',
        logo: '/images/amazon-logo.svg',
        url: 'https://unlockrwrd.com/ka68TBg',
        requirements: '(Complete survey & 3 Deals)',
    },
    {
        name: 'Claim $750 Shein gift card',
        logo: '/images/shein-logo.svg',
        url: 'https://unlockrwrd.com/31kBHX0SP',
        requirements: '(Complete survey & 3 Deals)',
    },
    {
        name: 'Claim $750 Target gift card',
        logo: '/images/target-logo.svg',
        url: 'https://unlockrwrd.com/V9MPuze',
        requirements: '(Complete survey & 2 Deals)',
    },
];

export default function OfferLinks() {
    const handleOfferClick = async (offer: Offer) => {
        // Track with Meta Pixel
        trackOfferClick(offer.name);

        // Track in database
        const leadId = localStorage.getItem('lead_id');
        try {
            await fetch('/api/track-click', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lead_id: leadId || null,
                    offer_name: offer.name,
                    offer_url: offer.url,
                }),
            });
        } catch (error) {
            console.error('Failed to track click:', error);
        }

        // Open offer URL
        window.open(offer.url, '_blank');
    };

    return (
        <div className="space-y-4 mb-8">
            {offers.map((offer, index) => (
                <button
                    key={index}
                    onClick={() => handleOfferClick(offer)}
                    className="w-full bg-white/70 backdrop-blur-sm rounded-3xl p-3 md:p-4 flex items-center gap-4 
                     hover:bg-white/90 hover:scale-[1.02] hover:shadow-xl
                     active:scale-[0.98]
                     transition-all duration-200 ease-out
                     shadow-md min-h-[80px] group"
                >
                    {/* Circular logo container - 64px x 64px white frame with shadow */}
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
                        <div className="w-10 h-10 relative flex items-center justify-center">
                            <Image
                                src={offer.logo}
                                alt={offer.name}
                                width={40}
                                height={40}
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Text content */}
                    <div className="text-left flex-1">
                        <p
                            className="font-semibold text-[15px] md:text-base leading-tight text-gray-900 mb-1"
                            style={{ fontFamily: 'var(--font-inter)' }}
                        >
                            {offer.name}
                        </p>
                        <p
                            className="text-xs text-gray-500"
                            style={{ fontFamily: 'var(--font-inter)' }}
                        >
                            {offer.requirements}
                        </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0">
                        <svg
                            className="w-5 h-5 hidden sm:block"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                </button>
            ))}
        </div>
    );
}
