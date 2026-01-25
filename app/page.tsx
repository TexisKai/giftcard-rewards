'use client';

import { useState } from 'react';
import EmailPopup from '@/components/EmailPopup';
import Header from '@/components/Header';
import OfferLinks from '@/components/OfferLinks';
import HowToSection from '@/components/HowToSection';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';

export default function Home() {
  const [userEmail, setUserEmail] = useState('');

  const handleEmailSubmit = (email: string, leadId: string) => {
    setUserEmail(email);
    console.log('Email captured:', email, 'Lead ID:', leadId);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFE1E8] to-[#FFC9D9] pb-16">
      <EmailPopup onEmailSubmit={handleEmailSubmit} />

      <div className="max-w-lg mx-auto px-4 py-5">
        {/* Top Navigation - lightweight link-style buttons */}
        <div className="flex justify-between items-center mb-5">
          <button className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <span>🔔</span>
            <span className="underline-offset-2 hover:underline">
              Subscribe
            </span>
          </button>
          <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            📤
          </button>
        </div>

        <Header />
        <OfferLinks />
        <HowToSection />
        <TestimonialsCarousel />

        {/* Footer - cleaner styling */}
        <div className="text-center mt-10">
          <a
            href="https://beacons.ai/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            <span>Powered by</span>
            <span className="font-semibold">Beacons</span>
          </a>
        </div>
      </div>
    </main>
  );
}
