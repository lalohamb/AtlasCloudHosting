"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AtlasLogo from '@/components/atlas-logo';

const navLinks = [
  { href: '/cloud', label: 'Cloud' },
  { href: '/products', label: 'Products' },
  { href: '/web3', label: 'Web3' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full bg-space-blue/95 backdrop-blur-sm border-b border-white/10 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 group-hover:scale-110 transition-transform">
              <AtlasLogo />
            </div>
            <span className="text-xl font-bold text-white">
              Atlas Cloud<span className="text-electric-cyan">.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'text-electric-cyan'
                    : 'text-soft-silver hover:text-electric-cyan'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="https://app.atlascloudhosting.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="text-soft-silver hover:text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold">
                Get Started
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-1 border-t border-white/10 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors ${
                  pathname === link.href ? 'text-electric-cyan' : 'text-soft-silver hover:text-electric-cyan'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <Link href="https://app.atlascloudhosting.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full border-white/20 text-soft-silver hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
