export default function HowToSection() {
    return (
        <div
            style={{
                boxShadow: 'none',
                border: '2px solid rgb(0, 0, 0)',
                borderRadius: '16px',
                padding: '20px',
                backgroundColor: 'rgb(255, 231, 238)', // Same lighter pink as offer cards
                marginBottom: '24px',
            }}
        >
            {/* Title - uppercase BOLD like original */}
            <center
                style={{
                    color: 'rgb(0, 0, 0)',
                    fontFamily: 'Piazzolla, sans-serif',
                    fontWeight: 700,
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '20px',
                }}
            >
                HOW TO CLAIM YOUR GIFTCARD
            </center>

            {/* Steps - exactly like original with proper spacing */}
            <div
                style={{
                    color: 'rgb(0, 0, 0)',
                    fontFamily: 'Piazzolla, sans-serif',
                    fontWeight: 400,
                    fontSize: '15px',
                    lineHeight: 1.7,
                }}
            >
                <p style={{ marginBottom: '20px' }}>
                    1️⃣ Choose one or more offers ⬆️<br />
                    Select the offers you&apos;d like to complete from the list.
                </p>
                <p style={{ marginBottom: '20px' }}>
                    2️⃣ Enter your basic info ✍️<br />
                    This helps verify eligibility and move you forward.
                </p>
                <p style={{ marginBottom: '20px' }}>
                    3️⃣ Complete the required steps<br />
                    Follow the instructions carefully for each selected gift-card.
                </p>
                <p style={{ marginBottom: '0' }}>
                    4️⃣ Claim your gift card(s) 💰<br />
                    You can Claim for multiple gift cards by completing more offers.
                </p>
            </div>
        </div>
    );
}
