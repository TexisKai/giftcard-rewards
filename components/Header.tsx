'use client';

export default function Header() {
    return (
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
            <div style={{ marginTop: '16px' }}>
                <div
                    style={{
                        fontSize: '48px',
                        color: 'rgb(0, 0, 0)',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        fontFamily: '"Arbutus Slab", sans-serif',
                    }}
                >
                    <div
                        style={{
                            fontWeight: 700,
                            fontFamily: '"Arbutus Slab", sans-serif',
                            textAlign: 'center',
                        }}
                    >
                        Claim Your Reward
                    </div>
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
                        paddingLeft: '40px',
                        paddingRight: '40px',
                    }}
                >
                    Fill Your Details,Install Apps &amp; Get Giftcode Worth $750
                </div>
            </div>
        </div>
    );
}
