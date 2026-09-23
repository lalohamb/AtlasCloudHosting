import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Clock, Settings, ArrowLeft } from 'lucide-react';
import GridBackground from '@/components/grid-background';
import AtlasHostedBadge from '@/components/atlas-hosted-badge';
import { products } from '@/config/products';
import type { FeatureStatus } from '@/config/products';

export const metadata: Metadata = {
  title: 'Print-on-Demand Storefront — Atlas Products',
  description:
    'Launch your own branded print-on-demand business. A complete Printify-powered e-commerce storefront hosted and managed on Atlas Cloud.',
};

const featureStatusConfig: Record<FeatureStatus, { label: string; icon: typeof Check; color: string }> = {
  available: { label: 'Available', icon: Check, color: 'text-electric-cyan' },
  planned: { label: 'Planned', icon: Clock, color: 'text-soft-silver/50' },
  optional: { label: 'Optional', icon: Settings, color: 'text-accent-orange' },
  requires_configuration: { label: 'Requires configuration', icon: Settings, color: 'text-accent-orange' },
};

export default function PODStorefrontPage() {
  const product = products.find((p) => p.slug === 'pod-storefront');

  if (!product) return null;

  const availableFeatures = product.features.filter((f) => f.status === 'available');
  const configFeatures = product.features.filter((f) => f.status === 'requires_configuration' || f.status === 'optional');
  const plannedFeatures = product.features.filter((f) => f.status === 'planned');

  return (
    <div className="py-24 relative">
      <GridBackground />
      <div className="container mx-auto px-4 relative z-10">

        {/* Back */}
        <div className="max-w-5xl mx-auto mb-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-soft-silver/60 hover:text-electric-cyan transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>

        {/* Hero */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full border text-accent-orange bg-accent-orange/10 border-accent-orange/30 capitalize">
              E-Commerce
            </span>
            {product.badge && (
              <span className="text-xs font-bold bg-accent-orange text-white px-2.5 py-1 rounded-full">
                {product.badge}
              </span>
            )}
            <AtlasHostedBadge />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {product.name}
          </h1>
          <p className="text-2xl text-electric-cyan font-semibold mb-4">{product.shortDescription}</p>
          <p className="text-xl text-soft-silver/80 mb-8 max-w-3xl">{product.longDescription}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={product.ctaHref}>
              <Button size="lg" className="bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold px-8">
                {product.cta}
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white/20 text-soft-silver hover:text-white hover:border-white/40 px-8">
                View Cloud Pricing
              </Button>
            </Link>
          </div>
        </div>

        {/* Pricing */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-2">Pricing</h2>
              <p className="text-soft-silver/70">{product.pricing.priceNote}</p>
              <p className="text-soft-silver/50 text-sm mt-2">
                Product pricing is based on business functionality and includes Atlas Cloud hosting, monitoring, backups, and platform updates.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            What&apos;s <span className="text-electric-cyan">Included</span>
          </h2>
          <p className="text-soft-silver/60 text-sm mb-8">
            Feature availability is clearly indicated below. Only available features are currently active.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Available */}
            <Card className="bg-white/5 border-electric-cyan/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Check className="h-5 w-5 text-electric-cyan" />
                  <h3 className="text-white font-semibold">Available Now</h3>
                </div>
                <ul className="space-y-2">
                  {availableFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-electric-cyan flex-shrink-0 mt-0.5" />
                      <span className="text-soft-silver/90 text-sm">{f.label}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requires configuration */}
            <Card className="bg-white/5 border-accent-orange/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="h-5 w-5 text-accent-orange" />
                  <h3 className="text-white font-semibold">Requires Configuration</h3>
                </div>
                <ul className="space-y-2">
                  {configFeatures.map((f, i) => {
                    const cfg = featureStatusConfig[f.status];
                    return (
                      <li key={i} className="flex items-start gap-2">
                        <cfg.icon className={`h-4 w-4 flex-shrink-0 mt-0.5 ${cfg.color}`} />
                        <span className="text-soft-silver/90 text-sm">{f.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>

            {/* Planned */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm opacity-70">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-soft-silver/50" />
                  <h3 className="text-white font-semibold">Planned</h3>
                </div>
                <ul className="space-y-2">
                  {plannedFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-soft-silver/40 flex-shrink-0 mt-0.5" />
                      <span className="text-soft-silver/50 text-sm">{f.label}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Integrations */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Integrations</h2>
          <div className="flex flex-wrap gap-3">
            {product.integrations.map((integration, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-soft-silver/90 text-sm font-medium">
                {integration}
              </div>
            ))}
          </div>
        </div>

        {/* Customer journey */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Get Early Access', desc: 'Contact Atlas to discuss your storefront requirements.' },
              { step: '2', title: 'Configure Your Store', desc: 'Set up your brand, connect Printify, and configure Stripe.' },
              { step: '3', title: 'Atlas Provisions', desc: 'Atlas deploys your storefront on managed cloud infrastructure.' },
              { step: '4', title: 'Launch', desc: 'Connect your domain and start selling.' },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="w-8 h-8 bg-electric-cyan/10 rounded-full flex items-center justify-center text-electric-cyan font-bold text-sm mb-3">
                  {item.step}
                </div>
                <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                <p className="text-soft-silver/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Launch Your Store?</h2>
          <p className="text-soft-silver/80 mb-8">
            Contact Atlas to get early access to the Print-on-Demand Storefront.
          </p>
          <Link href={product.ctaHref}>
            <Button size="lg" className="bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold px-8">
              {product.cta}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
