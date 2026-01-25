export default function HowToSection() {
    const steps = [
        {
            emoji: '1️⃣',
            text: 'Choose one or more offers ⬆️ Select the offers you\'d like to complete from the list.',
        },
        {
            emoji: '2️⃣',
            text: 'Enter your basic info ✍️ This helps verify eligibility and move you forward.',
        },
        {
            emoji: '3️⃣',
            text: 'Complete the required steps Follow the instructions carefully for each selected gift-card.',
        },
        {
            emoji: '4️⃣',
            text: 'Claim your gift card(s) 💰 You can Claim for multiple gift cards by completing more offers.',
        },
    ];

    return (
        <div className="bg-pink-200/60 border-2 border-black rounded-3xl p-6 mb-8">
            <h2
                className="text-center font-bold text-sm mb-4 uppercase tracking-wide"
                style={{ fontFamily: 'var(--font-piazzolla)' }}
            >
                How To Claim Your Giftcard
            </h2>

            <div className="space-y-3">
                {steps.map((step, index) => (
                    <p
                        key={index}
                        className="text-sm leading-relaxed"
                        style={{ fontFamily: 'var(--font-piazzolla)' }}
                    >
                        {step.text}
                    </p>
                ))}
            </div>
        </div>
    );
}
