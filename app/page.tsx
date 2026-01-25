'use client';

import { useState } from 'react';
import { Bell, Share2 } from 'lucide-react';
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
        className="min-h-screen"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), linear-gradient(rgb(255, 240, 244), rgb(255, 240, 244))',
        }}
      >
        {/* Page Frame */}
        <div
          className="w-full h-full"
          style={{
            backgroundPosition: '50% 15%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundAttachment: 'scroll',
            backgroundImage: 'linear-gradient(rgb(255, 240, 244), rgb(255, 240, 244))',
          }}
        >
          {/* Container - max-width small like MuiContainer */}
          <div
            className="mx-auto relative"
            style={{
              maxWidth: '600px',
              padding: '0px 20px 100px',
              minHeight: '100vh',
            }}
          >
            {/* Top Navigation */}
            <div className="py-4">
              <div className="flex">
                {/* Subscribe Button */}
                <div className="mr-2">
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium"
                    style={{
                      minHeight: 'initial',
                      borderRadius: '36px',
                      fontFamily: 'Piazzolla, sans-serif',
                      backgroundColor: 'rgb(243, 244, 246)', // bg-gray-100
                    }}
                  >
                    <Bell className="w-5 h-5 text-gray-700" />
                    <span className="text-sm font-medium text-gray-700">Subscribe</span>
                  </button>
                </div>

                {/* Share Button */}
                <div className="ml-auto">
                  <button
                    className="flex items-center justify-center w-8 h-8 hover:opacity-70"
                    style={{
                      borderRadius: '36px',
                      backgroundColor: 'rgb(243, 244, 246)',
                    }}
                    aria-label="launch share profile dialog"
                  >
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="mt-0 mb-4 w-full">
              <Header />
            </div>

            <OfferLinks />
            <HowToSection />
            <TestimonialsCarousel />

            {/* Footer - Beacons Logo */}
            <div className="mt-12 flex justify-center">
              <a
                href="https://account.beacons.ai/signup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="home"
                style={{ color: 'inherit' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 998 277"
                  style={{ fill: 'rgb(0, 0, 0)', height: '35px' }}
                >
                  <path d="M105.425 135.901c37.547 0 67.984-30.377 67.984-67.847S142.972.207 105.425.207 37.441 30.583 37.441 68.054 67.878 135.9 105.425 135.9M227.599 92.636c18.864 0 34.157-15.261 34.157-34.087S246.463 24.46 227.599 24.46s-34.156 15.262-34.156 34.088 15.293 34.087 34.156 34.087M34.156 193.259c18.864 0 34.157-15.261 34.157-34.088 0-18.825-15.293-34.087-34.157-34.087S0 140.346 0 159.171c0 18.827 15.292 34.088 34.156 34.088M219.06 252.584c39.179 0 70.94-31.697 70.94-70.797s-31.761-70.797-70.94-70.797-70.94 31.698-70.94 70.797c0 39.1 31.761 70.797 70.94 70.797M97.871 277.167c23.58 0 42.696-19.077 42.696-42.609 0-23.533-19.116-42.61-42.696-42.61s-42.695 19.077-42.695 42.61 19.115 42.609 42.695 42.609M415.75 134.3q8.85 1.65 14.55 8.85t5.7 16.5q0 8.4-4.2 14.85-4.05 6.3-11.85 9.9T401.5 188h-45.15V83.3h43.2q10.65 0 18.3 3.45 7.8 3.45 11.7 9.6 4.05 6.15 4.05 13.95 0 9.15-4.95 15.3-4.8 6.15-12.9 8.7m-38.4-7.8h19.2q7.5 0 11.55-3.3 4.05-3.45 4.05-9.75t-4.05-9.75-11.55-3.45h-19.2zm21.15 44.4q7.65 0 11.85-3.6 4.35-3.6 4.35-10.2 0-6.75-4.5-10.5-4.5-3.9-12.15-3.9h-20.7v28.2zM529.987 144.65q0 4.5-.6 8.1h-60.75q.75 9 6.3 14.1t13.65 5.1q11.7 0 16.65-10.05h22.65q-3.6 12-13.8 19.8-10.2 7.65-25.05 7.65-12 0-21.6-5.25-9.45-5.4-14.85-15.15-5.25-9.75-5.25-22.5 0-12.9 5.25-22.65t14.7-15 21.75-5.25q11.85 0 21.15 5.1 9.45 5.1 14.55 14.55 5.25 9.3 5.25 21.45m-21.75-6q-.15-8.1-5.85-12.9-5.7-4.95-13.95-4.95-7.8 0-13.2 4.8-5.25 4.65-6.45 13.05zM539.915 146.15q0-12.6 4.95-22.35 5.1-9.75 13.65-15 8.7-5.25 19.35-5.25 9.3 0 16.2 3.75 7.05 3.75 11.25 9.45V104.9h21.15V188h-21.15v-12.15q-4.05 5.85-11.25 9.75-7.05 3.75-16.35 3.75-10.5 0-19.2-5.4-8.55-5.4-13.65-15.15-4.95-9.9-4.95-22.65m65.4.3q0-7.65-3-13.05-3-5.55-8.1-8.4-5.1-3-10.95-3t-10.8 2.85-8.1 8.4q-3 5.4-3 12.9t3 13.2q3.15 5.55 8.1 8.55 5.1 3 10.8 3 5.85 0 10.95-2.85 5.1-3 8.1-8.4 3-5.55 3-13.2M641.575 146.45q0-12.9 5.25-22.5 5.25-9.75 14.55-15 9.3-5.4 21.3-5.4 15.45 0 25.5 7.8 10.2 7.65 13.65 21.6h-22.65q-1.8-5.4-6.15-8.4-4.2-3.15-10.5-3.15-9 0-14.25 6.6-5.25 6.45-5.25 18.45 0 11.85 5.25 18.45 5.25 6.45 14.25 6.45 12.75 0 16.65-11.4h22.65q-3.45 13.5-13.65 21.45t-25.5 7.95q-12 0-21.3-5.25-9.3-5.4-14.55-15-5.25-9.75-5.25-22.65M774.109 189.35q-12 0-21.6-5.25-9.6-5.4-15.15-15.15-5.4-9.75-5.4-22.5t5.55-22.5q5.7-9.75 15.45-15 9.75-5.4 21.75-5.4t21.75 5.4q9.75 5.25 15.3 15 5.7 9.75 5.7 22.5t-5.85 22.5q-5.7 9.75-15.6 15.15-9.75 5.25-21.9 5.25m0-18.3q5.7 0 10.65-2.7 5.1-2.85 8.1-8.4t3-13.5q0-11.85-6.3-18.15-6.15-6.45-15.15-6.45t-15.15 6.45q-6 6.3-6 18.15t5.85 18.3q6 6.3 15 6.3M878.914 103.7q14.85 0 24 9.45 9.15 9.3 9.15 26.1V188h-21v-45.9q0-9.9-4.95-15.15-4.95-5.4-13.5-5.4-8.7 0-13.8 5.4-4.95 5.25-4.95 15.15V188h-21v-83.1h21v10.35q4.2-5.4 10.65-8.4 6.6-3.15 14.4-3.15M963.834 189.35q-10.2 0-18.3-3.6-8.1-3.75-12.9-10.05-4.65-6.3-5.1-13.95h21.15q.6 4.8 4.65 7.95 4.2 3.15 10.35 3.15 6 0 9.3-2.4 3.45-2.4 3.45-6.15 0-4.05-4.2-6-4.05-2.1-13.05-4.5-9.3-2.25-15.3-4.65-5.85-2.4-10.2-7.35-4.2-4.95-4.2-13.35 0-6.9 3.9-12.6 4.05-5.7 11.4-9 7.5-3.3 17.55-3.3 14.85 0 23.7 7.5 8.85 7.35 9.75 19.95h-20.1q-.45-4.95-4.2-7.8-3.6-3-9.75-3-5.7 0-8.85 2.1-3 2.1-3 5.85 0 4.2 4.2 6.45 4.2 2.1 13.05 4.35 9 2.25 14.85 4.65t10.05 7.5q4.35 4.95 4.5 13.2 0 7.2-4.05 12.9-3.9 5.7-11.4 9-7.35 3.15-17.25 3.15"></path>
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
