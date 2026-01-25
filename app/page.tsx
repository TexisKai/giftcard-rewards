'use client';

import { useState } from 'react';
import { Share2 } from 'lucide-react';
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
    <>
      <EmailPopup onEmailSubmit={handleEmailSubmit} />

      {/* Page Background - matches Beacons exactly */}
      <div
        style={{
          minHeight: '100vh',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), linear-gradient(rgb(255, 240, 244), rgb(255, 240, 244))',
        }}
      >
        {/* Page Frame */}
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundPosition: '50% 15%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundAttachment: 'scroll',
            backgroundImage: 'linear-gradient(rgb(255, 240, 244), rgb(255, 240, 244))',
          }}
        >
          {/* Container */}
          <div
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              padding: '0px 20px 100px',
              minHeight: '100vh',
              position: 'relative',
            }}
          >
            {/* Top Navigation - Only Share Button */}
            <div style={{ padding: '16px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {/* Share Button */}
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '36px',
                    backgroundColor: 'rgb(243, 244, 246)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  aria-label="launch share profile dialog"
                >
                  <Share2 style={{ width: '20px', height: '20px', color: '#374151' }} />
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div style={{ marginTop: 0, marginBottom: '16px', width: '100%' }}>
              <Header />
            </div>

            <OfferLinks />
            <HowToSection />
            <TestimonialsCarousel />

            {/* Footer - Removed Beacons logo, just empty space */}
            <div style={{ marginTop: '48px', height: '40px' }}></div>
          </div>
        </div>
      </div>
    </>
  );
}
