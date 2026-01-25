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
                    className="w-full bg-white/80 backdrop-blur-sm border-2 border-black rounded-2xl p-4 flex items-center gap-4 hover:bg-white hover:scale-[1.02] transition-all shadow-md"
                >
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0 border-2 border-gray-200">
                        <Image
                            src={offer.logo}
                            alt={offer.name}
                            width={48}
                            height={48}
                            className="object-contain"
                        />
                    </div>
                    <div className="text-left flex-1">
                        <p
                            className="font-semibold text-base md:text-lg"
                            style={{ fontFamily: 'var(--font-piazzolla)' }}
                        >
                            {offer.name}
                        </p>
                        <p className="text-sm text-gray-600">{offer.requirements}</p>
                    </div>
                </button>
            ))}
        </div>
    );
}
