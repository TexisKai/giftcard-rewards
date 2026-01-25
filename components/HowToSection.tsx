export default function HowToSection() {
    return (
        <div
            className="MuiCard-root"
            style={{
                boxShadow: 'none',
                border: '2px solid rgb(0, 0, 0)',
                borderRadius: '16px',
                padding: '16px',
                backgroundColor: 'rgb(255, 231, 238)', // Light pink like offer cards
            }}
        >
            {/* Title - uppercase like original */}
            <center
                className="text-xs font-semibold uppercase"
                style={{
                    borderRadius: '36px',
                    color: 'rgb(0, 0, 0)',
                    fontFamily: 'Piazzolla, sans-serif',
                    fontWeight: 400,
                }}
            >
                How to claim your Giftcard
            </center>

            {/* Steps */}
            <div
                className="mt-4"
                style={{
                    borderRadius: '36px',
                    color: 'rgb(0, 0, 0)',
                    fontFamily: 'Piazzolla, sans-serif',
                    fontWeight: 400,
                }}
            >
                <div className="space-y-4">
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
        </div>
    );
}
