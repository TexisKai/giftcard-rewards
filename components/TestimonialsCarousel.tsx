'use client';

// Testimonial images from the original Beacons site
const testimonialImages = [
    'https://cdn.beacons.ai/user_content/uRYCVPybe3dWNu289S1CGpgCnZQ2/referenced_images/a6253208-d290-4a84-8b04-377ab8901c96__link-in-bio__image-block__home__62975818-7e85-415b-91e8-a0ad2f67ec33__455bb864-5fae-46a0-b730-43d9209a256f.jpg?t=1750349202477',
    'https://cdn.beacons.ai/user_content/uRYCVPybe3dWNu289S1CGpgCnZQ2/referenced_images/7de1c444-2ac9-4265-beec-7de9dbe15017__link-in-bio__image-block__home__62975818-7e85-415b-91e8-a0ad2f67ec33__1ed744b9-27a4-49bb-b8eb-89c6e6f7869e.jpg?t=1750349191891',
    'https://cdn.beacons.ai/user_content/uRYCVPybe3dWNu289S1CGpgCnZQ2/referenced_images/4730aad6-7077-4a57-999b-66c41b0af36e__link-in-bio__image-block__home__62975818-7e85-415b-91e8-a0ad2f67ec33__54c3b58d-4447-4003-bd93-2704cd01c468.jpg?t=1750349179905',
    'https://cdn.beacons.ai/user_content/uRYCVPybe3dWNu289S1CGpgCnZQ2/referenced_images/8649227f-2364-492b-919d-ccea3671229e__link-in-bio__image-block__home__62975818-7e85-415b-91e8-a0ad2f67ec33__a854d20e-cd15-4b0f-9f15-339f2954dd12.jpg?t=1750349163951',
    'https://cdn.beacons.ai/user_content/uRYCVPybe3dWNu289S1CGpgCnZQ2/referenced_images/f69fbdfd-3850-4836-8552-7961fa985e6d__link-in-bio__image-block__home__62975818-7e85-415b-91e8-a0ad2f67ec33__acb329cd-21d9-48f7-9431-c46fc7b7136e.jpg?t=1744090880743',
    'https://cdn.beacons.ai/user_content/uRYCVPybe3dWNu289S1CGpgCnZQ2/referenced_images/65b45fc7-07ec-4e22-b19d-b4853639f941__link-in-bio__image-block__home__62975818-7e85-415b-91e8-a0ad2f67ec33__b6161475-821a-461e-bbaa-2a81ed54be7d.jpg?t=1744090851721',
    'https://cdn.beacons.ai/user_content/uRYCVPybe3dWNu289S1CGpgCnZQ2/referenced_images/84f99ff6-e90d-4acb-92a9-4bd187cf5cbd__link-in-bio__image-block__home__62975818-7e85-415b-91e8-a0ad2f67ec33__19431c06-dc0f-4c1a-a990-3a48a02edb78.jpg?t=1744090804765',
    'https://cdn.beacons.ai/user_content/uRYCVPybe3dWNu289S1CGpgCnZQ2/referenced_images/c0a9f99b-b33d-40d0-9320-992a06553670__link-in-bio__image-block__home__62975818-7e85-415b-91e8-a0ad2f67ec33__2faf071f-0cd0-41cd-888b-d428800af973.jpg?t=1744090507842',
];

export default function TestimonialsCarousel() {
    return (
        <div style={{ marginBottom: '32px' }}>
            {/* Header - exactly like original */}
            <div
                style={{
                    textAlign: 'center',
                    marginBottom: '16px',
                    color: 'rgb(0, 0, 0)',
                    fontFamily: 'Piazzolla, sans-serif',
                }}
            >
                {/* Title - bold like original */}
                <div style={{ fontWeight: 700, fontSize: '18px', marginBottom: '4px' }}>
                    Top winners of the offers
                </div>
                {/* Swipe text with left arrow emoji like original */}
                <div style={{ fontWeight: 400, fontSize: '14px' }}>
                    Swipe⬅️
                </div>
            </div>

            {/* Horizontal Scroll Container - exactly like Beacons */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    overflowX: 'auto',
                    paddingBottom: '8px',
                }}
                className="scrollbar-hide"
            >
                {testimonialImages.map((src, index) => (
                    <a
                        key={index}
                        tabIndex={0}
                        role="button"
                        aria-label="link"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexShrink: 0,
                            color: 'inherit',
                            minWidth: '90%',
                            width: '90%',
                        }}
                    >
                        <img
                            aria-label="block image"
                            src={src}
                            alt={`Winner testimonial ${index + 1}`}
                            loading="lazy"
                            style={{
                                width: '100%',
                                objectFit: 'cover',
                                borderRadius: '25px',
                            }}
                        />
                    </a>
                ))}
            </div>
        </div>
    );
}
