'use client';

import { useState } from 'react';
import { Bell, Share } from 'lucide-react';
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
    <main className="min-h-screen bg-[#FDF2F5] py-8 md:py-12 flex items-center justify-center">
      <EmailPopup onEmailSubmit={handleEmailSubmit} />

      {/* Main Beacons-style Container */}
      <div className="w-full max-w-[440px] bg-transparent mx-auto relative">
        {/* Glow/Border Effect Container */}
        <div className="bg-[#FFE1E8] rounded-[40px] border-[8px] border-[#E8F0FE] shadow-[0_0_20px_rgba(232,240,254,0.6)] overflow-hidden min-h-[800px] p-5 md:p-6 relative">

          {/* Top Navigation - clean text links with icons */}
          <div className="flex justify-between items-center mb-8 px-2">
            <button className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:opacity-70 transition-opacity">
              <Bell className="w-5 h-5" />
              <span style={{ fontFamily: 'var(--font-arbutus)' }}>Subscribe</span>
            </button>
            <button className="inline-flex items-center justify-center w-8 h-8 text-gray-900 hover:opacity-70 transition-opacity">
              <Share className="w-5 h-5" />
            </button>
          </div>

          <Header />
          <OfferLinks />
          <HowToSection />
          <TestimonialsCarousel />

          {/* Footer */}
          <div className="text-center mt-12 pb-4">
            <a
              href="https://beacons.ai/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors"
            >
              <div className="w-4 h-4 bg-black rounded-full text-white flex items-center justify-center font-bold text-[8px]">b</div>
              <span className="font-semibold">Beacons</span>
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}
