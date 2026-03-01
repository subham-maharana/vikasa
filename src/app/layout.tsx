import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vikasa.online'),
  title: {
    default: 'Vikasa — Free AI Chatbots for UK Home Businesses',
    template: '%s | Vikasa',
  },
  description:
    'Vikasa sets up a free AI chatbot on your website that captures every lead 24/7 — automatically saved to your CRM while you sleep. No monthly retainers.',
  keywords: [
    'AI chatbot UK',
    'free chatbot for small business',
    'lead capture chatbot',
    'UK home business AI',
    'AI chatbot website',
    'automatic lead generation UK',
  ],
  authors: [{ name: 'Vikasa', url: 'https://www.vikasa.online' }],
  creator: 'Vikasa',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://www.vikasa.online',
  },
  openGraph: {
    title: 'Vikasa — Free AI Chatbots for UK Home Businesses',
    description:
      'Free AI chatbot setup. Captures every lead 24/7 and saves them to your CRM automatically.',
    url: 'https://www.vikasa.online',
    siteName: 'Vikasa',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/og-image.png',  // add a 1200×630 screenshot here before launch
        width: 1200,
        height: 630,
        alt: 'Vikasa — AI Chatbots for UK Home Businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vikasa — Free AI Chatbots for UK Home Businesses',
    description:
      'Free AI chatbot. Captures every lead from your website, 24/7, automatically.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/Logo.svg',
    shortcut: '/Logo.svg',
    apple: '/Logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
