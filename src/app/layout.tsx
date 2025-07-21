import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AppProvider } from '@/features/ui/components/AppProvider'
import { fontVariables } from './fonts'

export const metadata: Metadata = {
  title: {
    template: '%s | Harry Potter - Mischief Managed',
    default: 'Harry Potter - Mischief Managed ⚡',
  },
  description:
    'Explore the magical world of Harry Potter. Discover characters, learn spells, choose your Hogwarts house, and immerse yourself in the wizarding world.',
  keywords: [
    'Harry Potter',
    'characters',
    'spells',
    'Hogwarts',
    'magic',
    'wizarding world',
    'students',
    'staff',
    'houses',
    'Gryffindor',
    'Slytherin',
    'Hufflepuff',
    'Ravenclaw',
  ],
  authors: [{ name: 'HP Challenge Team' }],
  creator: 'HP Challenge Team',
  publisher: 'HP Challenge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Harry Potter - Mischief Managed ⚡',
    description:
      'Explore the magical world of Harry Potter. Discover characters, learn spells, and choose your Hogwarts house.',
    siteName: 'Harry Potter - Mischief Managed',
    // images: [
    //   {
    //     url: '/og-image.jpg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Harry Potter - Magical World Explorer',
    //   },
    // ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harry Potter - Mischief Managed ⚡',
    description: 'Explore the magical world of Harry Potter characters, spells, and houses',
    // images: ['/og-image.jpg'],
    creator: '@hp_challenge',
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
    google: process.env.GOOGLE_VERIFICATION_ID,
  },
  category: 'entertainment',
}

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#000000' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Harry Potter - Mischief Managed',
  description: 'Explore the magical world of Harry Potter characters, spells, and houses',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/characters?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <link
          rel="preload"
          href="/fonts/HARRYP__.TTF"
          as="font"
          type="font/truetype"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`antialiased bg-slate-50 dark:bg-slate-900 font-sans`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
