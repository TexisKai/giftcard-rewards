'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Testimonial images (add actual images to public/images/testimonials/)
const testimonials = [
    '/images/testimonials/test1.svg',
    '/images/testimonials/test2.svg',
    '/images/testimonials/test3.svg',
    '/images/testimonials/test4.svg',
    '/images/testimonials/test5.svg',
];

export default function TestimonialsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mb-8">
            <h3
                className="text-center text-lg font-bold mb-2"
                style={{ fontFamily: 'var(--font-arbutus)' }}
            >
                Top winners of the offers
            </h3>
            <p className="text-center text-sm mb-4 text-gray-700">Swipe⬅️</p>

            <div className="overflow-hidden rounded-2xl border-2 border-black shadow-lg">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {testimonials.map((img, index) => (
                        <div key={index} className="min-w-full relative aspect-[3/4]">
                            <Image
                                src={img}
                                alt={`Testimonial ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 600px"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-black w-4' : 'bg-gray-400'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
