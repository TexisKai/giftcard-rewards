'use client';

import { trackOfferClick } from '@/lib/metaPixel';

interface Offer {
    name: string;
    url: string;
    logo: string;
    description: string;
    subdescription: string;
}

const offers: Offer[] = [
    {
        name: 'Claim $750 Amazon gift card',
        url: 'https://unlockrwrd.com/ka68TBg',
        logo: 'https://cdn.beacons.ai/user_content/uRYCVPybe3dWNu289S1CGpgCnZQ2/referenced_images/2f184049-e1ef-4809-96f5-8ccc4373e1e9__link-in-bio__links-block__home__967a2477-7e35-47bf-9815-791528c41c00__4d508702-f9c1-4c5f-a1aa-0bf37b32d1ae__e62f40c5-73ea-4bee-9905-e8caf4d797c6.webp?t=1744088941782',
        description: 'Claim $750 Amazon gift card',
        subdescription: '(Complete survey & 3 Deals)',
    },
    {
        name: 'Claim $750 Shein gift card',
        url: 'https://unlockrwrd.com/31kBHX0SP',
        logo: 'https://cdn.beacons.ai/user_content/uRYCVPybe3dWNu289S1CGpgCnZQ2/referenced_images/b28a6ad5-27e7-4033-8f01-339d0a9871ac__link-in-bio__links-block__home__967a2477-7e35-47bf-9815-791528c41c00__bfe915e1-f152-4699-9931-724146f13512__45e86a6c-62f8-4817-b29d-cd631f18917b.webp?t=1744088804464',
        description: 'Claim $750 Shein gift card',
        subdescription: '(Complete survey & 3 Deals)',
    },
    {
        name: 'Claim $750 Target gift card',
        url: 'https://unlockrwrd.com/V9MPuze',
        logo: 'https://cdn.beacons.ai/user_content/uRYCVPybe3dWNu289S1CGpgCnZQ2/referenced_images/0fd449dd-8ecf-410d-8c2e-cd9a8643b451__link-in-bio__links-block__home__967a2477-7e35-47bf-9815-791528c41c00__b96953e9-f84a-446a-8452-80ba57e5cd15__45613a9b-25a1-464c-bf88-58566de59c9a.webp?t=1744088999907',
        description: 'Claim $750 Target gift card',
        subdescription: '(Complete survey & 2 Deals)',
    },
];

export default function OfferLinks() {
    const handleOfferClick = (offer: Offer) => {
        trackOfferClick(offer.name);
        window.open(offer.url, '_blank');
    };

    return (
        <div className="Links classic" style={{ gridTemplateColumns: 'repeat(1, minmax(0px, 1fr))', gap: '16px' }}>
            {offers.map((offer, index) => (
                <center key={index} className="RowLink relative">
                    <a
                        href={offer.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                            e.preventDefault();
                            handleOfferClick(offer);
                        }}
                        className="flex w-full transition-all duration-200 hover:opacity-80"
                        style={{
                            borderRadius: '36px',
                            backgroundColor: 'rgb(255, 231, 238)',
                            color: 'rgb(0, 0, 0)',
                            fontFamily: 'Piazzolla, sans-serif',
                            textTransform: 'none',
                            boxShadow: 'none',
                            fontSize: '15px',
                            minHeight: '65px',
                            padding: '8px',
                            margin: '16px 0px',
                            border: '2px solid rgba(255, 255, 255, 0)',
                            display: 'flex',
                            pointerEvents: 'auto',
                            textDecoration: 'none',
                        }}
                    >
                        {/* Logo Container - exactly 56px */}
                        <div className="mr-2 flex items-center justify-center" style={{ width: '56px', minWidth: '56px' }}>
                            <img
                                width={45}
                                height={45}
                                alt={offer.name}
                                src={offer.logo}
                                style={{ objectFit: 'cover', borderRadius: '50%' }}
                            />
                        </div>

                        {/* Text Content - centered */}
                        <div className="w-full min-w-0 whitespace-pre-wrap text-center">
                            <div className="text-base">{offer.description}</div>
                            <div className="text-sm opacity-80">{offer.subdescription}</div>
                        </div>

                        {/* Spacer for symmetry */}
                        <div className="ml-2" style={{ width: '56px', minWidth: '56px' }}></div>
                    </a>
                </center>
            ))}
        </div>
    );
}
