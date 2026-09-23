import Link from 'next/link';
import { Linkedin, Github, Twitter } from 'lucide-react';
import AtlasLogo from '@/components/atlas-logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-space-blue border-t border-white/10 mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10">
                <AtlasLogo />
              </div>
              <span className="text-xl font-bold text-white">
                Atlas Cloud<span className="text-electric-cyan">.</span>
              </span>
            </Link>
            <p className="text-soft-silver/80 max-w-md mb-4">
              Managed cloud infrastructure for modern applications, APIs, containers, SaaS platforms, and Web3 workloads. Powered by Blockchain Dev3 Consulting.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-soft-silver hover:text-electric-cyan transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-soft-silver hover:text-electric-cyan transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-soft-silver hover:text-electric-cyan transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              {[
                { href: '/cloud', label: 'Cloud' },
                { href: '/products', label: 'Products' },
                { href: '/web3', label: 'Web3' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/status', label: 'System Status' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-soft-silver/80 hover:text-electric-cyan transition-colors text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About' },
                { href: '/partners', label: 'Partner Program' },
                { href: '/contact', label: 'Contact' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-soft-silver/80 hover:text-electric-cyan transition-colors text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-soft-silver/60 text-sm">
            © {currentYear} Atlas Cloud Hosting. A service by Prestige Holdings Enterprise Group.
          </p>
          <p className="text-soft-silver/60 text-sm">
            Built by <span className="text-electric-cyan">Blockchain Dev3 Consulting</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
