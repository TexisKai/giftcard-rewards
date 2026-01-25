export default function Header() {
    return (
        <header className="text-center mb-8">
            {/* Dollar Icon */}
            <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full border-4 border-black bg-white flex items-center justify-center shadow-lg">
                    <span className="text-5xl font-bold">$</span>
                </div>
            </div>

            {/* Main Headline */}
            <h1
                className="text-4xl md:text-5xl font-bold mb-3"
                style={{ fontFamily: 'var(--font-arbutus)' }}
            >
                Claim Your Reward
            </h1>

            {/* Subheadline */}
            <p
                className="text-base md:text-lg text-gray-800"
                style={{ fontFamily: 'var(--font-piazzolla)' }}
            >
                Fill Your Details, Install Apps & Get Giftcode Worth $750
            </p>
        </header>
    );
}
