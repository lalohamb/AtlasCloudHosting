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
              Scalable hosting for the modern web — from WordPress to Web3. Powered by DigitalOcean. Managed by Blockchain Dev3 Consulting.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-soft-silver hover:text-electric-cyan transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-soft-silver hover:text-electric-cyan transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-soft-silver hover:text-electric-cyan transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/plans" className="text-soft-silver/80 hover:text-electric-cyan transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-soft-silver/80 hover:text-electric-cyan transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-soft-silver/80 hover:text-electric-cyan transition-colors">
                  System Status
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-soft-silver/80 hover:text-electric-cyan transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-soft-silver/80 hover:text-electric-cyan transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-soft-silver/80 hover:text-electric-cyan transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-soft-silver/80 hover:text-electric-cyan transition-colors">
                  Partner Program
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-soft-silver/60 text-sm">
            © {currentYear} Atlas Cloud Hosting. A service by Prestige Holdings Enterprise Group.
          </p>
          <p className="text-soft-silver/60 text-sm">
            Powered by <span className="text-electric-cyan">DigitalOcean</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
