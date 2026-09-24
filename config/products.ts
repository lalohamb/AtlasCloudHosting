export type ProductStatus = 'available' | 'planned' | 'coming_soon';
export type ProductCategory = 'e-commerce' | 'ai' | 'automation' | 'saas' | 'web3' | 'business';
export type FeatureStatus = 'available' | 'planned' | 'optional' | 'requires_configuration';

export interface ProductFeature {
  label: string;
  status: FeatureStatus;
}

export interface ProductPricing {
  model: 'subscription' | 'setup_plus_subscription' | 'custom';
  setupFee?: number | null;
  monthlyPrice?: number | null;
  priceNote?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: ProductCategory;
  pricing: ProductPricing;
  features: ProductFeature[];
  integrations: string[];
  status: ProductStatus;
  featured: boolean;
  cta: string;
  ctaHref: string;
  docsUrl?: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: 'pod-storefront',
    slug: 'pod-storefront',
    name: 'Print-on-Demand Storefront',
    shortDescription: 'Launch your own branded print-on-demand business.',
    longDescription:
      'A complete e-commerce storefront designed for Printify-powered businesses, hosted and managed on Atlas Cloud. Everything you need to sell custom products online — without building the technology yourself.',
    category: 'e-commerce',
    pricing: {
      model: 'subscription',
      setupFee: null,
      monthlyPrice: 79,
      priceNote: '$79/month — includes hosting, SSL, backups, monitoring, and platform updates.',
    },
    features: [
      { label: 'Branded storefront', status: 'available' },
      { label: 'Printify API integration', status: 'available' },
      { label: 'Product synchronization', status: 'available' },
      { label: 'Product collections & categories', status: 'available' },
      { label: 'Shopping cart & checkout', status: 'available' },
      { label: 'Stripe payment integration', status: 'requires_configuration' },
      { label: 'Order management', status: 'available' },
      { label: 'Printify order workflow', status: 'available' },
      { label: 'Customer accounts', status: 'planned' },
      { label: 'Admin dashboard', status: 'available' },
      { label: 'Custom domain + SSL', status: 'available' },
      { label: 'Atlas Cloud hosting', status: 'available' },
      { label: 'Database', status: 'available' },
      { label: 'Automated backups', status: 'available' },
      { label: 'Application monitoring', status: 'available' },
      { label: 'Platform updates', status: 'available' },
    ],
    integrations: ['Printify', 'Stripe'],
    status: 'available',
    featured: true,
    cta: 'Get Started — $79/month',
    ctaHref: '/contact',
    badge: 'New',
  },
];

export const productCategories: { id: ProductCategory; label: string }[] = [
  { id: 'e-commerce', label: 'E-Commerce' },
  { id: 'ai', label: 'AI' },
  { id: 'automation', label: 'Automation' },
  { id: 'saas', label: 'SaaS' },
  { id: 'web3', label: 'Web3' },
  { id: 'business', label: 'Business' },
];
