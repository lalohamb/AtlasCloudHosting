import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { OrganizationSchema, ServiceSchema } from '@/components/structured-data';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Atlas Cloud Hosting - Scalable Hosting from WordPress to Web3',
  description: 'Professional web hosting powered by DigitalOcean. WordPress hosting, Web3 infrastructure, Blockchain apps, and custom DevOps solutions. Managed by Blockchain Dev3 Consulting.',
  keywords: ['Web3 Hosting', 'WordPress Hosting', 'Atlas Cloud Hosting', 'DigitalOcean Partner Hosting', 'Blockchain Hosting', 'Blockchain Consulting', 'Cloud Infrastructure', 'DevOps'],
  openGraph: {
    title: 'Atlas Cloud Hosting - Scalable Hosting from WordPress to Web3',
    description: 'Professional web hosting powered by DigitalOcean. From WordPress to Web3 infrastructure.',
    type: 'website',
    siteName: 'Atlas Cloud Hosting',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atlas Cloud Hosting - Scalable Hosting from WordPress to Web3',
    description: 'Professional web hosting powered by DigitalOcean. From WordPress to Web3 infrastructure.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <OrganizationSchema />
        <ServiceSchema />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
