export default function HowToSection() {
    return (
        <div
            className="mb-6"
            style={{
                boxShadow: 'none',
                border: '2px solid rgb(0, 0, 0)',
                borderRadius: '16px',
                padding: '16px',
            }}
        >
            {/* Title */}
            <div
                className="text-center text-xs font-semibold uppercase mb-4"
                style={{
                    borderRadius: '36px',
                    color: 'rgb(0, 0, 0)',
                    fontFamily: 'Piazzolla, sans-serif',
                }}
            >
                How to claim your Giftcard
            </div>

            {/* Steps */}
            <div
                className="space-y-3"
                style={{
                    borderRadius: '36px',
                    color: 'rgb(0, 0, 0)',
                    fontFamily: 'Piazzolla, sans-serif',
                    fontWeight: 400,
                }}
            >
                <p>
                    1️⃣ Choose one or more offers ⬆️<br />
                    Select the offers you&apos;d like to complete from the list.
                </p>
                <p>
                    2️⃣ Enter your basic info ✍️<br />
                    This helps verify eligibility and move you forward.
                </p>
                <p>
                    3️⃣ Complete the required steps<br />
                    Follow the instructions carefully for each selected gift-card.
                </p>
                <p>
                    4️⃣ Claim your gift card(s) 💰<br />
                    You can Claim for multiple gift cards by completing more offers.
                </p>
            </div>
        </div>
    );
}
