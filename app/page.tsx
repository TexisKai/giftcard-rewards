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
    <main className="min-h-screen bg-gradient-to-b from-[#FFE1E8] to-[#FFC9D9] pb-20">
      <EmailPopup onEmailSubmit={handleEmailSubmit} />

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button className="text-sm flex items-center gap-1 hover:opacity-70 transition-opacity bg-white/50 px-3 py-1.5 rounded-full border border-black/10">
            <span>🔔</span> Subscribe
          </button>
          <button className="text-sm hover:opacity-70 transition-opacity bg-white/50 w-8 h-8 flex items-center justify-center rounded-full border border-black/10">
            📤
          </button>
        </div>

        <Header />
        <OfferLinks />
        <HowToSection />
        <TestimonialsCarousel />

        {/* Footer */}
        <div className="text-center mt-12">
          <a
            href="https://beacons.ai/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span className="font-semibold">Beacons</span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Try for free!
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}
