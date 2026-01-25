export default function Header() {
    return (
        <header className="text-center mb-10">
            {/* Dollar Icon - Black circle with $ symbol */}
            <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-black flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <span className="text-5xl font-bold font-sans tracking-tighter" style={{ fontFamily: 'var(--font-inter)' }}>$</span>
                </div>
            </div>

            {/* Main Headline */}
            <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-gray-900 tracking-tight"
                style={{ fontFamily: 'var(--font-arbutus)' }}
            >
                Claim Your Reward
            </h1>

            {/* Subheadline */}
            <p
                className="text-base md:text-lg text-gray-800 max-w-sm mx-auto leading-relaxed"
                style={{ fontFamily: 'var(--font-inter)' }}
            >
                Fill Your Details, Install Apps & Get Giftcode Worth $750
            </p>
        </header>
    );
}
