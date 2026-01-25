export default function HowToSection() {
    return (
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-5 md:p-6 mb-8 shadow-sm">
            <h2
                className="text-center font-bold text-xs mb-4 uppercase tracking-wider text-gray-600"
                style={{ fontFamily: 'var(--font-piazzolla)' }}
            >
                How To Claim Your Giftcard
            </h2>

            <div className="space-y-2.5">
                <p
                    className="text-sm leading-relaxed text-gray-700"
                    style={{ fontFamily: 'var(--font-piazzolla)' }}
                >
                    1️⃣ Choose one or more offers ⬆️ Select the offers you&apos;d like to
                    complete from the list.
                </p>
                <p
                    className="text-sm leading-relaxed text-gray-700"
                    style={{ fontFamily: 'var(--font-piazzolla)' }}
                >
                    2️⃣ Enter your basic info ✍️ This helps verify eligibility and move
                    you forward.
                </p>
                <p
                    className="text-sm leading-relaxed text-gray-700"
                    style={{ fontFamily: 'var(--font-piazzolla)' }}
                >
                    3️⃣ Complete the required steps 📋 Follow the instructions carefully
                    for each selected gift-card.
                </p>
                <p
                    className="text-sm leading-relaxed text-gray-700"
                    style={{ fontFamily: 'var(--font-piazzolla)' }}
                >
                    4️⃣ Claim your gift card(s) 💰 You can claim for multiple gift cards
                    by completing more offers.
                </p>
            </div>
        </div>
    );
}
