'use client';

export default function Header() {
    return (
        <div className="text-center">
            {/* Profile Image - exactly 96x96 with 2px black border like original */}
            <div className="flex justify-center mb-4">
                <div
                    className="w-24 h-24 rounded-full bg-white flex items-center justify-center"
                    style={{
                        border: '2px solid rgb(0, 0, 0)',
                        width: '96px',
                        height: '96px',
                        borderRadius: '10000px',
                    }}
                >
                    {/* Large Dollar sign - matching original */}
                    <span
                        className="font-bold text-black"
                        style={{
                            fontFamily: '"Arbutus Slab", sans-serif',
                            fontSize: '48px',
                            lineHeight: 1,
                        }}
                    >
                        $
                    </span>
                </div>
            </div>

            {/* Title - Arbutus Slab, 48px equivalent */}
            <div
                className="w-full"
                style={{ marginTop: '16px' }}
            >
                <div
                    className="box-border w-full"
                    style={{
                        fontSize: '48px',
                        color: 'rgb(0, 0, 0)',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        fontFamily: '"Arbutus Slab", sans-serif',
                        borderRadius: '36px',
                    }}
                >
                    <div
                        className="w-full"
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

            {/* Subtitle - Piazzolla, 16px */}
            <div style={{ marginTop: '8px' }}>
                <div
                    style={{
                        borderRadius: '36px',
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
