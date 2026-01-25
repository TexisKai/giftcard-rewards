'use client';

import { useState } from 'react';
import { Bell, Share } from 'lucide-react';
import EmailPopup from '@/components/EmailPopup';
import Header from '@/components/Header';
import OfferLinks from '@/components/OfferLinks';
import HowToSection from '@/components/HowToSection';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import GiftCardGrid from '@/components/GiftCardGrid';

export default function Home() {
  const [userEmail, setUserEmail] = useState('');

  const handleEmailSubmit = (email: string, leadId: string) => {
    setUserEmail(email);
    console.log('Email captured:', email, 'Lead ID:', leadId);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFE1E8] to-[#FFC9D9] pb-20">
      <EmailPopup onEmailSubmit={handleEmailSubmit} />

      <div className="max-w-lg mx-auto px-5 py-6">
        {/* Top Navigation - clean text links with icons */}
        <div className="flex justify-between items-center mb-8">
          <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-black hover:bg-white/40 px-3 py-1.5 rounded-full transition-all duration-200">
            <Bell className="w-4 h-4" />
            <span>Subscribe</span>
          </button>
          <button className="inline-flex items-center justify-center w-8 h-8 text-gray-800 hover:text-black hover:bg-white/40 rounded-full transition-all duration-200">
            <Share className="w-4 h-4" />
          </button>
        </div>

        <Header />
        <OfferLinks />
        <HowToSection />
        <GiftCardGrid />
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
