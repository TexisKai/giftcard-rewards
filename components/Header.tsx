export default function Header() {
    return (
        <header className="text-center mb-8">
            {/* Dollar Icon - softer styling matching Beacons */}
            <div className="flex justify-center mb-5">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md">
                    <span className="text-4xl" role="img" aria-label="money">
                        💵
                    </span>
                </div>
            </div>

            {/* Main Headline */}
            <h1
                className="text-3xl md:text-4xl font-bold mb-2 text-gray-900"
                style={{ fontFamily: 'var(--font-arbutus)' }}
            >
                Claim Your Reward
            </h1>

            {/* Subheadline */}
            <p
                className="text-sm md:text-base text-gray-700 max-w-sm mx-auto leading-relaxed"
                style={{ fontFamily: 'var(--font-piazzolla)' }}
            >
                Fill Your Details, Install Apps & Get Giftcode Worth $750
            </p>
        </header>
    );
}
