import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Claim Your $750 Reward - Free Gift Cards',
  description:
    'Fill your details, install apps & get gift codes worth $750. Claim Amazon, Shein, and Target gift cards by completing simple surveys and deals.',
  keywords: [
    'free gift cards',
    'amazon gift card',
    'shein gift card',
    'target gift card',
    'sweepstakes',
    'rewards',
  ],
  openGraph: {
    title: 'Claim Your $750 Reward - Free Gift Cards',
    description:
      'Fill your details, install apps & get gift codes worth $750.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="en">
      <head>
        {/* Preload fonts for faster rendering */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Arbutus+Slab:wght@400;700&family=Piazzolla:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Meta Pixel Code */}
        {pixelId && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${pixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: 'Piazzolla, Georgia, serif' }}>
        {children}
      </body>
    </html>
  );
}
