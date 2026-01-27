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
        url: 'https://texiskai.github.io',
        logo: 'https://cdn.beacons.ai/user_content/uRYCVPybe3dWNu289S1CGpgCnZQ2/referenced_images/2f184049-e1ef-4809-96f5-8ccc4373e1e9__link-in-bio__links-block__home__967a2477-7e35-47bf-9815-791528c41c00__4d508702-f9c1-4c5f-a1aa-0bf37b32d1ae__e62f40c5-73ea-4bee-9905-e8caf4d797c6.webp?t=1744088941782',
        description: 'Claim $750 Amazon gift card',
        subdescription: '(Complete survey & 3 Deals)',
    },
    {
        name: 'Claim $750 Shein gift card',
        url: 'https://texiskai.github.io',
        logo: 'https://cdn.beacons.ai/user_content/uRYCVPybe3dWNu289S1CGpgCnZQ2/referenced_images/b28a6ad5-27e7-4033-8f01-339d0a9871ac__link-in-bio__links-block__home__967a2477-7e35-47bf-9815-791528c41c00__bfe915e1-f152-4699-9931-724146f13512__45e86a6c-62f8-4817-b29d-cd631f18917b.webp?t=1744088804464',
        description: 'Claim $750 Shein gift card',
        subdescription: '(Complete survey & 3 Deals)',
    },
    {
        name: 'Claim $750 Target gift card',
        url: 'https://texiskai.github.io/target',
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
        <>
            {/* CSS for wobble animation with 3.4s rest */}
            <style jsx>{`
        @keyframes wobble {
          0% { transform: rotate(0deg); }
          4% { transform: rotate(-3deg); }
          8% { transform: rotate(3deg); }
          12% { transform: rotate(-3deg); }
          16% { transform: rotate(3deg); }
          20% { transform: rotate(-1deg); }
          24% { transform: rotate(1deg); }
          28% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .wobble-animation {
          animation: wobble 5s ease-in-out infinite;
        }
      `}</style>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                {offers.map((offer, index) => (
                    <div key={index} style={{ textAlign: 'center' }}>
                        <a
                            href={offer.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                                e.preventDefault();
                                handleOfferClick(offer);
                            }}
                            className={index === 0 ? 'wobble-animation' : ''}
                            style={{
                                display: 'flex',
                                width: '100%',
                                borderRadius: '36px',
                                backgroundColor: 'rgb(255, 231, 238)',
                                color: 'rgb(0, 0, 0)',
                                fontFamily: 'Piazzolla, sans-serif',
                                textTransform: 'none',
                                boxShadow: 'none',
                                fontSize: '15px',
                                minHeight: '65px',
                                padding: '8px',
                                border: '2px solid rgba(255, 255, 255, 0)',
                                pointerEvents: 'auto',
                                textDecoration: 'none',
                                transition: 'opacity 0.2s',
                            }}
                        >
                            {/* Logo Container */}
                            <div style={{ marginRight: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', minWidth: '56px' }}>
                                <img
                                    width={45}
                                    height={45}
                                    alt={offer.name}
                                    src={offer.logo}
                                    loading="lazy"
                                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                                />
                            </div>

                            {/* Text Content */}
                            <div style={{ width: '100%', minWidth: 0, whiteSpace: 'pre-wrap', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ fontSize: '16px' }}>{offer.description}</div>
                                <div style={{ fontSize: '14px', opacity: 0.8 }}>{offer.subdescription}</div>
                            </div>

                            {/* Spacer for symmetry */}
                            <div style={{ marginLeft: '8px', width: '56px', minWidth: '56px' }}></div>
                        </a>
                    </div>
                ))}
            </div>
        </>
    );
}
