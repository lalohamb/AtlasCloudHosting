"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AtlasLogo from '@/components/atlas-logo';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/plans', label: 'Plans' },
    { href: '/about', label: 'About' },
    { href: '/partners', label: 'Partners' },
    { href: '/status', label: 'Status' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-space-blue/95 backdrop-blur-sm border-b border-white/10 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 group-hover:scale-110 transition-transform">
              <AtlasLogo />
            </div>
            <span className="text-xl font-bold text-white">
              Atlas Cloud Hosting<span className="text-electric-cyan">.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-soft-silver hover:text-electric-cyan transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Button className="bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold">
              Get Started
            </Button>
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
          <div className="md:hidden pb-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-soft-silver hover:text-electric-cyan transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <Button className="w-full bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold mt-2">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
