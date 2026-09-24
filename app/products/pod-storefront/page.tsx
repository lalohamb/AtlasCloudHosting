import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Clock, Settings, ArrowLeft, X } from 'lucide-react';
import GridBackground from '@/components/grid-background';
import AtlasHostedBadge from '@/components/atlas-hosted-badge';
import { products } from '@/config/products';
import type { FeatureStatus } from '@/config/products';

export const metadata: Metadata = {
  title: 'Print-on-Demand Storefront — Atlas Products',
  description:
    'Your Printify store, live in days. No servers required. A complete branded storefront hosted and managed on Atlas Cloud — $79/month.',
};

const featureStatusConfig: Record<FeatureStatus, { label: string; icon: typeof Check; color: string }> = {
  available:              { label: 'Available',              icon: Check,    color: 'text-electric-cyan' },
  planned:                { label: 'Planned',                icon: Clock,    color: 'text-soft-silver/50' },
  optional:               { label: 'Optional',               icon: Settings, color: 'text-accent-orange' },
  requires_configuration: { label: 'Requires configuration', icon: Settings, color: 'text-accent-orange' },
};

const whatYouGet = [
  {
    emoji: '🖨️',
    title: 'Printify Integration',
    body: 'Your entire Printify catalog synced to your storefront. Products, variants, pricing, and shipping profiles pulled directly from Printify. Add a new product on Printify, sync it from your admin panel, and it\'s live.',
  },
  {
    emoji: '💳',
    title: 'Stripe Checkout',
    body: 'Stripe\'s hosted checkout handles payments. Orders are automatically forwarded to Printify for fulfillment the moment a customer pays. You connect your own Stripe account — your revenue goes directly to you.',
  },
  {
    emoji: '🎛️',
    title: 'Admin Dashboard',
    body: 'Manage your store without touching code. Products, orders, settings, and SEO — all from a browser.',
    bullets: ['Products — curate, feature, organize by collection and category', 'Orders — view status, fulfillment tracking, shipping details', 'Settings — storefront appearance, announcement bar, hero content', 'SEO — sitemap, Open Graph, product schema'],
  },
  {
    emoji: '🔒',
    title: 'Security Included',
    body: '',
    bullets: ['Printify API key never exposed to the browser', 'Stripe webhooks cryptographically verified', 'Row-Level Security on all database tables', 'Admin routes protected by session authentication', 'Input validation and security hardening built in'],
  },
  {
    emoji: '📦',
    title: 'Zero Inventory',
    body: 'Every order is made fresh. Products ship directly from Printify\'s global fulfillment network. You never touch inventory, packaging, or shipping.',
  },
  {
    emoji: '📱',
    title: 'Mobile-First Storefront',
    body: 'Responsive design built for shoppers on any device. Sticky header, slide-out cart, touch-friendly product gallery with color swatches and size selectors.',
  },
  {
    emoji: '🔍',
    title: 'SEO Built In',
    body: 'Dynamic XML sitemap, robots.txt, per-product JSON-LD schema, Open Graph tags, canonical URLs — all configured and maintained as part of your hosted environment.',
  },
  {
    emoji: '☁️',
    title: 'Hosted on Atlas Cloud',
    body: 'Your storefront runs on Atlas Cloud managed infrastructure. SSL provisioned automatically. Daily backups included. Application monitoring active. Platform updates applied by Atlas. You never log into a server.',
  },
];

const atlasHandles = [
  { task: 'Server provisioning',     who: 'Atlas Cloud' },
  { task: 'Deployment',              who: 'Atlas Cloud' },
  { task: 'SSL certificate',         who: 'Atlas Cloud' },
  { task: 'Database management',     who: 'Atlas Cloud' },
  { task: 'Automated backups',       who: 'Atlas Cloud' },
  { task: 'Application monitoring',  who: 'Atlas Cloud' },
  { task: 'Platform updates',        who: 'Atlas Cloud' },
  { task: 'Security patching',       who: 'Atlas Cloud' },
  { task: 'Printify integration',    who: 'You configure once' },
  { task: 'Stripe account',          who: 'You connect yours' },
  { task: 'Custom domain',           who: 'You point yours' },
  { task: 'Products & content',      who: 'You manage via admin' },
];

const steps = [
  { step: '1', title: 'Get Started',                    desc: 'Contact Atlas Cloud. We confirm your requirements and set up your account.' },
  { step: '2', title: 'Atlas Provisions Your Environment', desc: 'Atlas deploys your storefront on managed infrastructure. SSL provisioned. Database configured. Monitoring active.' },
  { step: '3', title: 'Connect Your Services',          desc: 'From your admin dashboard, connect your Printify API key and your Stripe account. Takes minutes.' },
  { step: '4', title: 'Sync Your Catalog',              desc: 'Hit "Sync from Printify." Your entire catalog — every product, variant, and price — appears instantly.' },
  { step: '5', title: 'Point Your Domain',              desc: 'Update your DNS to point to your Atlas Cloud environment. SSL is provisioned automatically.' },
  { step: '6', title: 'Go Live',                        desc: 'Switch Stripe from test mode to live mode. Your store is open for business.' },
];

const faqs = [
  { q: 'Do I need to know how to code?',         a: 'No. The admin dashboard handles everything. You connect your Printify and Stripe accounts, manage your products, and run your store — all from a browser.' },
  { q: 'Do I need to manage a server?',          a: 'No. Atlas Cloud handles all infrastructure. You never log into a server, run a deployment script, or think about SSL certificates.' },
  { q: 'What does the monthly subscription cover?', a: 'Hosting, managed infrastructure, SSL, automated backups, application monitoring, and platform updates. Your storefront runs on Atlas Cloud — we keep it running.' },
  { q: 'Do I own my customer data?',             a: 'Yes. Your customer data lives in your dedicated database environment on Atlas Cloud. It is not shared with other customers.' },
  { q: 'Can I use my own domain?',               a: 'Yes. Point your domain\'s DNS to your Atlas Cloud environment. SSL is provisioned automatically.' },
  { q: 'Does it work with my existing Printify account?', a: 'Yes. You connect with your Printify API key. Your existing products, variants, and pricing sync immediately.' },
  { q: 'What happens when I add a new product on Printify?', a: 'Click "Sync from Printify" in your admin panel. New products appear immediately.' },
  { q: 'Do you take a cut of my revenue?',       a: 'No. Your Stripe account receives payments directly. Atlas Cloud charges a subscription fee for hosting and infrastructure — not a percentage of your sales.' },
  { q: 'What if I want to cancel?',              a: 'Contact Atlas Cloud. We will provide your data and assist with any transition.' },
  { q: 'Is this the same as buying the source code?', a: 'No. This is a hosted service — Atlas Cloud runs the infrastructure and manages the application. If you want to self-host the source code on your own server, that is a separate product offering.' },
];

export default function PODStorefrontPage() {
  const product = products.find((p) => p.slug === 'pod-storefront');
  if (!product) return null;

  const availableFeatures = product.features.filter((f) => f.status === 'available');
  const configFeatures    = product.features.filter((f) => f.status === 'requires_configuration' || f.status === 'optional');
  const plannedFeatures   = product.features.filter((f) => f.status === 'planned');

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
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full border text-accent-orange bg-accent-orange/10 border-accent-orange/30">
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
            Your Printify Store. Live in Days.<br />
            <span className="text-electric-cyan">No Servers Required.</span>
          </h1>
          <p className="text-xl text-soft-silver/80 mb-8 max-w-3xl">
            A complete, branded print-on-demand storefront — fully integrated with Printify and Stripe, hosted and managed on Atlas Cloud. You focus on your products and your customers. We handle everything else.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-3 mb-8">
            {['Hosted on Atlas Cloud', 'Managed infrastructure', 'SSL included', 'Automated backups', 'No servers to manage'].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-electric-cyan/5 border border-electric-cyan/20 rounded-full px-3 py-1.5 text-xs text-electric-cyan font-medium">
                <Check className="h-3 w-3" />
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={product.ctaHref}>
              <Button size="lg" className="bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold px-8">
                {product.cta}
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="border-white/20 text-soft-silver hover:text-white hover:border-white/40 px-8">
                See How It Works
              </Button>
            </a>
          </div>
        </div>

        {/* Pricing */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="bg-gradient-to-br from-electric-cyan/10 to-accent-orange/10 border-electric-cyan/20 backdrop-blur-sm">
            <CardContent className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="text-soft-silver/60 text-sm mb-1">Atlas Cloud hosted subscription</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">$79</span>
                    <span className="text-soft-silver/60 text-lg">/month</span>
                  </div>
                  <p className="text-soft-silver/60 text-sm mt-2">No transaction fees. No revenue share. No hidden costs.</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['Managed hosting', 'SSL certificate', 'Daily backups', 'App monitoring', 'Platform updates', 'Infrastructure mgmt'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-soft-silver/80">
                      <Check className="h-3.5 w-3.5 text-electric-cyan flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-soft-silver/40 text-xs mt-6">
                Stripe processing fees (2.9% + 30¢/transaction) are between you and Stripe — Atlas does not take a cut of your revenue.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* The Problem */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">
            The <span className="text-electric-cyan">Problem</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="text-white font-semibold">Shopify</h3>
                </div>
                <p className="text-soft-silver/70 text-sm">$39–$399/month, transaction fees on top of Stripe fees, app fees for features that should be standard, and a platform that owns your storefront.</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="text-white font-semibold">Raw Printify Pop-Up Store</h3>
                </div>
                <p className="text-soft-silver/70 text-sm">No custom domain, no real brand, no checkout you control, no customer data you own.</p>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-electric-cyan/5 border-electric-cyan/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-electric-cyan flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Atlas Cloud POD Storefront</h3>
                  <p className="text-soft-silver/80 text-sm">A real branded storefront, built for Printify, hosted on managed cloud infrastructure — without the complexity of running your own server or the ongoing cost of a bloated SaaS platform.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What You Get */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            What You <span className="text-electric-cyan">Get</span>
          </h2>
          <p className="text-soft-silver/70 mb-10">A complete, production-ready storefront with everything wired together — hosted, monitored, backed up, and maintained by Atlas Cloud.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {whatYouGet.map((item, i) => (
              <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                <CardContent className="p-6">
                  <div className="text-2xl mb-3">{item.emoji}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  {item.body && <p className="text-soft-silver/80 text-sm mb-3">{item.body}</p>}
                  {item.bullets && (
                    <ul className="space-y-1.5">
                      {item.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-soft-silver/70">
                          <Check className="h-3.5 w-3.5 text-electric-cyan flex-shrink-0 mt-0.5" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* What Atlas Handles */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            What <span className="text-electric-cyan">Atlas Handles</span>
          </h2>
          <p className="text-soft-silver/70 mb-8">You should never need to think about any of this.</p>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-soft-silver/60 text-sm font-medium">Responsibility</th>
                  <th className="text-left p-4 text-soft-silver/60 text-sm font-medium">Who Handles It</th>
                </tr>
              </thead>
              <tbody>
                {atlasHandles.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="p-4 text-soft-silver/90 text-sm">{row.task}</td>
                    <td className="p-4 text-sm">
                      <span className={row.who === 'Atlas Cloud' ? 'text-electric-cyan font-medium' : 'text-soft-silver/60'}>
                        {row.who}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What You Need */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            What You <span className="text-electric-cyan">Need</span>
          </h2>
          <p className="text-soft-silver/70 mb-8">You bring the accounts. Atlas Cloud wires them together and keeps everything running.</p>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-4">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-soft-silver/60 text-sm font-medium">Service</th>
                  <th className="text-left p-4 text-soft-silver/60 text-sm font-medium">Cost</th>
                  <th className="text-left p-4 text-soft-silver/60 text-sm font-medium">What It's For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { service: 'Atlas Cloud subscription', cost: '$79/month',              purpose: 'Hosting, infrastructure, management' },
                  { service: 'Stripe account',           cost: '2.9% + 30¢/transaction', purpose: 'Payments (revenue goes directly to you)' },
                  { service: 'Printify account',         cost: 'Free',                   purpose: 'Product fulfillment' },
                  { service: 'Custom domain',            cost: '~$12/yr',                purpose: 'Your store\'s URL' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="p-4 text-white text-sm font-medium">{row.service}</td>
                    <td className="p-4 text-electric-cyan text-sm font-medium">{row.cost}</td>
                    <td className="p-4 text-soft-silver/70 text-sm">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-soft-silver/50 text-sm">No server to rent. No deployment scripts to run. No infrastructure to manage.</p>
        </div>

        {/* How It Works */}
        <div id="how-it-works" className="max-w-5xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-white mb-10">
            How It <span className="text-electric-cyan">Works</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map((item, i) => (
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

        {/* Feature Status */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            What&apos;s <span className="text-electric-cyan">Included</span>
          </h2>
          <p className="text-soft-silver/60 text-sm mb-8">
            We believe in being honest about what&apos;s available now versus what&apos;s coming.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
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

        {/* Who It's For */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">
            Who This Is <span className="text-electric-cyan">For</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-electric-cyan/5 border-electric-cyan/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-4">✅ Right for you if:</h3>
                <ul className="space-y-2">
                  {[
                    'You sell on Printify and want a real branded storefront',
                    'You want managed infrastructure — no servers, no deployments, no maintenance',
                    'You want to own your customer data and your brand',
                    'You want a storefront that runs on professional cloud infrastructure without the complexity',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-soft-silver/80">
                      <Check className="h-4 w-4 text-electric-cyan flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-4">❌ Not right for you if:</h3>
                <ul className="space-y-2">
                  {[
                    'You want to self-host and manage your own server',
                    'You need a fully DIY solution with access to the raw codebase',
                    'You need features not yet on our roadmap',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-soft-silver/60">
                      <X className="h-4 w-4 text-soft-silver/40 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-10">
            Frequently Asked <span className="text-electric-cyan">Questions</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                  <p className="text-soft-silver/70 text-sm leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Your Printify Store. Professionally Hosted.<br />
            <span className="text-electric-cyan">Zero Infrastructure Headaches.</span>
          </h2>
          <p className="text-soft-silver/80 mb-8 text-lg">
            A complete branded storefront, integrated with Printify and Stripe, hosted and managed on Atlas Cloud. You run your business. We run the infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={product.ctaHref}>
              <Button size="lg" className="bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold px-10 text-lg">
                {product.cta}
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/20 text-soft-silver hover:text-white hover:border-white/40 px-10">
                Talk to Us First
              </Button>
            </Link>
          </div>
          <p className="text-soft-silver/40 text-xs mt-6">$79/month · Hosted on Atlas Cloud · Cancel anytime</p>
        </div>

      </div>
    </div>
  );
}
