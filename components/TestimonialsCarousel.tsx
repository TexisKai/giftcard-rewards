'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

// Testimonial images
const testimonials = [
    '/images/testimonials/test1.svg',
    '/images/testimonials/test2.svg',
    '/images/testimonials/test3.svg',
    '/images/testimonials/test4.svg',
    '/images/testimonials/test5.svg',
];

export default function TestimonialsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const goToPrev = useCallback(() => {
        setCurrentIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
    }, []);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(goToNext, 4000);
        return () => clearInterval(interval);
    }, [isPaused, goToNext]);

    return (
        <div className="mb-8">
            {/* Section heading */}
            <h3
                className="text-center text-base font-bold mb-1 text-gray-900"
                style={{ fontFamily: 'var(--font-arbutus)' }}
            >
                Top winners of the offers
            </h3>
            <p className="text-center text-xs mb-3 text-gray-500">
                Swipe to see more ⬅️➡️
            </p>

            {/* Carousel container - softer styling */}
            <div
                className="relative overflow-hidden rounded-2xl shadow-md bg-white/50"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Slides */}
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {testimonials.map((img, index) => (
                        <div key={index} className="min-w-full relative aspect-[3/4]">
                            <Image
                                src={img}
                                alt={`Winner testimonial ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 600px"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation arrows */}
                <button
                    onClick={goToPrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm
                     flex items-center justify-center shadow-md
                     hover:bg-white transition-colors"
                    aria-label="Previous testimonial"
                >
                    <svg
                        className="w-4 h-4 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm
                     flex items-center justify-center shadow-md
                     hover:bg-white transition-colors"
                    aria-label="Next testimonial"
                >
                    <svg
                        className="w-4 h-4 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-1.5 mt-3">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'w-4 bg-gray-800'
                                : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
