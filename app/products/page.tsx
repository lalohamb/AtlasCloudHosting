import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package, ArrowRight } from 'lucide-react';
import GridBackground from '@/components/grid-background';
import AtlasHostedBadge from '@/components/atlas-hosted-badge';
import { products } from '@/config/products';

export const metadata: Metadata = {
  title: 'Atlas Products — Ready-to-Launch Business Applications',
  description:
    'Launch production-ready web applications without building the technology yourself. Atlas Products combines application software, managed hosting, deployment, monitoring, and infrastructure.',
};

const categoryColors: Record<string, string> = {
  'e-commerce': 'text-accent-orange bg-accent-orange/10 border-accent-orange/30',
  ai: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  automation: 'text-green-400 bg-green-400/10 border-green-400/30',
  saas: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  web3: 'text-electric-cyan bg-electric-cyan/10 border-electric-cyan/30',
  business: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
};

export default function ProductsPage() {
  const activeProducts = products.filter((p) => p.status !== 'planned');

  return (
    <div className="py-24 relative">
      <GridBackground />
      <div className="container mx-auto px-4 relative z-10">

        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Package className="h-4 w-4" />
            Atlas Products
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready-to-Launch{' '}
            <span className="text-gradient">Business Applications</span>
          </h1>
          <p className="text-xl text-soft-silver/80 mb-8 max-w-3xl mx-auto">
            Launch production-ready web applications without building the technology yourself. Atlas Products combines application software, managed hosting, deployment, monitoring, updates, and infrastructure.
          </p>
          <AtlasHostedBadge />
        </div>

        {/* What makes Products different */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Bring Your Application</h3>
                <p className="text-soft-silver/70 text-sm">You build it. Atlas deploys and manages the infrastructure.</p>
                <Link href="/cloud" className="text-electric-cyan text-sm font-medium mt-3 inline-flex items-center gap-1 hover:underline">
                  Explore Cloud <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-accent-orange/5 border-accent-orange/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">Buy an Atlas Product</h3>
                <p className="text-soft-silver/70 text-sm">Atlas builds it, hosts it, and manages it. You configure your business and launch.</p>
                <span className="text-accent-orange text-sm font-medium mt-3 inline-block">You are here</span>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product catalog */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Available <span className="text-electric-cyan">Products</span>
          </h2>

          {activeProducts.length === 0 ? (
            <div className="text-center text-soft-silver/60 py-16">No products available yet. Check back soon.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {activeProducts.map((product) => (
                <Card key={product.id} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all hover:border-electric-cyan/30 group">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${categoryColors[product.category] ?? 'text-soft-silver bg-white/5 border-white/10'}`}>
                        {product.category.replace('-', ' ')}
                      </span>
                      {product.badge && (
                        <span className="text-xs font-bold bg-accent-orange text-white px-2.5 py-1 rounded-full">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-soft-silver/80 text-sm leading-relaxed mb-4 flex-1">{product.shortDescription}</p>

                    <div className="mb-4">
                      <AtlasHostedBadge />
                    </div>

                    <div className="mb-4">
                      {product.pricing.priceNote ? (
                        <p className="text-soft-silver/60 text-xs">{product.pricing.priceNote}</p>
                      ) : product.pricing.monthlyPrice ? (
                        <p className="text-white font-bold text-lg">${product.pricing.monthlyPrice}<span className="text-soft-silver/60 text-sm font-normal">/mo</span></p>
                      ) : null}
                    </div>

                    <Link href={`/products/${product.slug}`}>
                      <Button className="w-full bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold group-hover:shadow-lg group-hover:shadow-electric-cyan/20 transition-all">
                        {product.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* More coming */}
        <div className="max-w-3xl mx-auto text-center">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">More Products Coming</h3>
              <p className="text-soft-silver/80 mb-6">
                Atlas Products is expanding. Future categories include AI tools, automation services, SaaS platforms, Web3 applications, and business operations software.
              </p>
              <Link href="/contact">
                <Button variant="outline" className="border-electric-cyan text-electric-cyan hover:bg-electric-cyan/10">
                  Request a Product
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
