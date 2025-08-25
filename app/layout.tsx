import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LaundryZone Mongolia - Self-Service Laundry',
  description: 'Premium self-service laundry with LG/Samsung equipment, 08:00 - 00:00 operation, and cashless payment across Ulaanbaatar.',
  keywords: 'laundry, self-service, Ulaanbaatar, Mongolia, wash, dry, 08:00 - 00:00',
  authors: [{ name: 'LaundryZone Mongolia' }],
  creator: 'LaundryZone Mongolia',
  publisher: 'LaundryZone Mongolia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://laundryzone.mn'),
  alternates: {
    canonical: '/',
    languages: {
      'mn': '/mn',
      'en': '/en',
      'kr': '/kr',
    },
  },
  icons: {
    icon: [
      { url: '/images/favicon.png', type: 'image/png', sizes: 'any' },
    ],
    apple: [
      { url: '/images/favicon.png', type: 'image/png', sizes: 'any' },
    ],
    shortcut: '/images/favicon.png',
  },
  manifest: '/site.webmanifest',
  themeColor: '#f97316',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LaundryZone',
  },
  openGraph: {
    title: 'LaundryZone Mongolia - Self-Service Laundry',
    description: 'Premium self-service laundry with LG/Samsung equipment, 08:00 - 00:00 operation, and cashless payment across Ulaanbaatar.',
    url: 'https://laundryzone.mn',
    siteName: 'LaundryZone Mongolia',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LaundryZone Mongolia',
      },
    ],
    locale: 'mn_MN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LaundryZone Mongolia - Self-Service Laundry',
    description: 'Premium self-service laundry with LG/Samsung equipment, 08:00 - 00:00 operation, and cashless payment across Ulaanbaatar.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
