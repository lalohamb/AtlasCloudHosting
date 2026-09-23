import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { OrganizationSchema, ServiceSchema } from '@/components/structured-data';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Atlas Cloud — Managed Cloud Infrastructure',
  description:
    'Deploy applications, APIs, containers, databases, SaaS platforms, and Web3 workloads on managed cloud infrastructure. Atlas Cloud handles provisioning, deployment, SSL, monitoring, and backups.',
  keywords: [
    'managed cloud hosting',
    'application hosting',
    'Docker hosting',
    'Next.js hosting',
    'Node.js hosting',
    'API hosting',
    'SaaS hosting',
    'managed cloud infrastructure',
    'developer cloud hosting',
    'Web3 hosting',
    'dApp hosting',
    'managed DevOps',
    'application deployment',
    'Atlas Cloud',
  ],
  openGraph: {
    title: 'Atlas Cloud — Managed Cloud Infrastructure',
    description:
      'Deploy applications, APIs, containers, databases, SaaS platforms, and Web3 workloads on managed cloud infrastructure.',
    type: 'website',
    siteName: 'Atlas Cloud',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atlas Cloud — Managed Cloud Infrastructure',
    description:
      'Deploy applications, APIs, containers, databases, SaaS platforms, and Web3 workloads on managed cloud infrastructure.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
