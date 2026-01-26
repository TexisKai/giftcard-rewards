'use client';

export default function Header() {
    return (
        <>
            <style jsx>{`
                .header-title {
                    font-size: 36px;
                    font-weight: 700;
                    font-family: "Arbutus Slab", sans-serif;
                    text-align: center;
                    color: rgb(0, 0, 0);
                }
                @media (min-width: 480px) {
                    .header-title {
                        font-size: 48px;
                    }
                }
            `}</style>
            <div className="text-center">
                {/* Profile Image - Using the provided dollar sign logo */}
                <div className="flex justify-center mb-4">
                    <div
                        style={{
                            width: '96px',
                            height: '96px',
                            borderRadius: '10000px',
                            border: '2px solid rgb(0, 0, 0)',
                            overflow: 'hidden',
                            backgroundColor: '#FFFFFF',
                        }}
                    >
                        <img
                            src="/images/dollar-logo.jpg"
                            alt="Dollar Sign Logo"
                            width={96}
                            height={96}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                </div>

                {/* Title */}
                <div style={{ marginTop: '16px', paddingLeft: '16px', paddingRight: '16px' }}>
                    <div className="header-title">
                        Claim Your Reward
                    </div>
                </div>

                {/* Subtitle */}
                <div style={{ marginTop: '8px' }}>
                    <div
                        style={{
                            color: 'rgb(0, 0, 0)',
                            fontFamily: 'Piazzolla, sans-serif',
                            fontWeight: 400,
                            fontSize: '16px',
                            marginBottom: '8px',
                            paddingLeft: '24px',
                            paddingRight: '24px',
                        }}
                    >
                        Fill Your Details,Install Apps &amp; Get Giftcode Worth $750
                    </div>
                </div>
            </div>
        </>
    );
}
