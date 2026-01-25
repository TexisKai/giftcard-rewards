export default function HowToSection() {
    return (
        <div className="bg-pink-200/60 border-2 border-black rounded-3xl p-6 md:p-8 mb-8 shadow-md">
            <h2
                className="text-center font-bold text-2xl md:text-3xl mb-6 text-gray-900"
                style={{ fontFamily: 'var(--font-arbutus)' }}
            >
                How To Claim Your Giftcard
            </h2>

            <div className="space-y-4">
                <p
                    className="text-base md:text-lg leading-relaxed text-gray-900"
                    style={{ fontFamily: 'var(--font-inter)' }}
                >
                    1️⃣ Choose one or more offers ⬆️ Select the offers you&apos;d like to
                    complete from the list.
                </p>
                <p
                    className="text-base md:text-lg leading-relaxed text-gray-900"
                    style={{ fontFamily: 'var(--font-inter)' }}
                >
                    2️⃣ Enter your basic info ✍️ This helps verify eligibility and move
                    you forward.
                </p>
                <p
                    className="text-base md:text-lg leading-relaxed text-gray-900"
                    style={{ fontFamily: 'var(--font-inter)' }}
                >
                    3️⃣ Complete the required steps 📋 Follow the instructions carefully
                    for each selected gift-card.
                </p>
                <p
                    className="text-base md:text-lg leading-relaxed text-gray-900"
                    style={{ fontFamily: 'var(--font-inter)' }}
                >
                    4️⃣ Claim your gift card(s) 💰 You can claim for multiple gift cards
                    by completing more offers.
                </p>
            </div>
        </div>
    );
}
