export type BillingCycle = 'monthly' | 'yearly';

export interface PlanFeature {
  label: string;
  included: boolean | string;
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: { monthly: number; yearly: number } | null;
  badge?: string;
  cta: string;
  ctaHref: string;
  features: string[];
  notIncluded?: string[];
  highlighted?: boolean;
}

export interface AddOn {
  id: string;
  label: string;
  description: string;
  priceNote: string;
}

export interface ComparisonRow {
  name: string;
  developer: boolean | string;
  professional: boolean | string;
  business: boolean | string;
  dedicated: boolean | string;
}

export const plans: Plan[] = [
  {
    id: 'developer',
    name: 'Developer',
    tagline: 'For developers, prototypes, and lightweight applications.',
    price: { monthly: 15, yearly: 144 },
    cta: 'Start Building',
    ctaHref: '/contact',
    features: [
      '1 Application',
      '1 GB RAM allocation',
      'Shared compute',
      '10 GB storage',
      '50 GB bandwidth',
      'Docker deployment',
      'Next.js / Node.js',
      'API & backend hosting',
      '1 Database',
      'Git-based deployment',
      'Custom domain + SSL',
      'Daily backups',
      'Basic monitoring',
      'Email support',
    ],
    notIncluded: ['Staging environment', 'Private networking', 'Web3 workloads'],
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'For production applications and growing projects.',
    price: { monthly: 39, yearly: 374 },
    badge: 'MOST POPULAR',
    cta: 'Deploy Now',
    ctaHref: '/contact',
    highlighted: true,
    features: [
      'Up to 3 Applications',
      '1 vCPU compute allocation',
      '2 GB RAM',
      '50 GB storage',
      '250 GB bandwidth',
      'Docker / Next.js / Node.js',
      'APIs & backend services',
      'Up to 2 Databases',
      'Git deployments',
      'Staging environment',
      'Custom domains + SSL',
      'Daily backups',
      'Application monitoring',
      'Priority support',
    ],
    notIncluded: ['Private networking', 'Web3 workloads'],
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'For SaaS products, APIs, and business applications.',
    price: { monthly: 79, yearly: 758 },
    cta: 'Deploy on Atlas',
    ctaHref: '/contact',
    features: [
      'Up to 8 Applications',
      '2 vCPU compute allocation',
      '4 GB RAM',
      '100 GB storage',
      '1 TB bandwidth',
      'Docker / Next.js / Node.js',
      'API & backend hosting',
      'Up to 5 Databases',
      'Private application networking',
      'Staging environments',
      'Git deployments',
      'Advanced monitoring',
      'Automated backups',
      'Deployment assistance',
      'Priority technical support',
    ],
  },
  {
    id: 'dedicated',
    name: 'Dedicated Cloud',
    tagline: 'For advanced applications, Web3 workloads, and dedicated resources.',
    price: { monthly: 149, yearly: 1430 },
    cta: 'Configure Cloud',
    ctaHref: '/contact',
    features: [
      'Dedicated compute options',
      '4+ vCPU',
      '8+ GB RAM',
      '250+ GB storage',
      'Configurable bandwidth',
      'Multiple applications',
      'Docker workloads',
      'Private networking',
      'Advanced monitoring',
      'Configurable backups',
      'Web3 workloads',
      'Managed deployment assistance',
      'Priority technical support',
    ],
  },
];

export const comparisonRows: ComparisonRow[] = [
  { name: 'Applications', developer: '1', professional: '3', business: '8', dedicated: 'Custom' },
  { name: 'RAM', developer: '1 GB', professional: '2 GB', business: '4 GB', dedicated: '8+ GB' },
  { name: 'vCPU', developer: 'Shared', professional: '1 vCPU', business: '2 vCPU', dedicated: '4+ vCPU' },
  { name: 'Storage', developer: '10 GB', professional: '50 GB', business: '100 GB', dedicated: '250+ GB' },
  { name: 'Bandwidth', developer: '50 GB', professional: '250 GB', business: '1 TB', dedicated: 'Configurable' },
  { name: 'Databases', developer: '1', professional: '2', business: '5', dedicated: 'Custom' },
  { name: 'Docker Deployment', developer: true, professional: true, business: true, dedicated: true },
  { name: 'Git Deployment', developer: true, professional: true, business: true, dedicated: true },
  { name: 'SSL + Custom Domain', developer: true, professional: true, business: true, dedicated: true },
  { name: 'Daily Backups', developer: true, professional: true, business: false, dedicated: false },
  { name: 'Automated Backups', developer: false, professional: false, business: true, dedicated: true },
  { name: 'Staging Environment', developer: false, professional: true, business: true, dedicated: true },
  { name: 'Private Networking', developer: false, professional: false, business: true, dedicated: true },
  { name: 'Web3 Workloads', developer: false, professional: false, business: false, dedicated: true },
  { name: 'Dedicated Resources', developer: false, professional: false, business: false, dedicated: true },
];

export const addOns: AddOn[] = [
  { id: 'extra-app', label: 'Additional Application', description: 'Add more application slots to your plan.', priceNote: 'Contact for pricing' },
  { id: 'extra-db', label: 'Additional Database', description: 'Add managed database instances.', priceNote: 'Contact for pricing' },
  { id: 'extra-storage', label: 'Additional Storage', description: 'Expand your storage allocation.', priceNote: 'Contact for pricing' },
  { id: 'managed-devops', label: 'Managed DevOps', description: 'Dedicated DevOps engineering support.', priceNote: 'Contact for pricing' },
  { id: 'web3-infra', label: 'Web3 Infrastructure', description: 'dApp, RPC, and blockchain backend services.', priceNote: 'Contact for pricing' },
  { id: 'dedicated-ip', label: 'Dedicated IP', description: 'Static dedicated IP address for your environment.', priceNote: 'Contact for pricing' },
];

export const faqs = [
  {
    question: 'What runtimes does Atlas support?',
    answer: 'Atlas currently supports Next.js, Node.js, and Docker-based applications. Additional runtimes are planned — contact us if you have a specific requirement.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes. You can change your plan at any time. Changes take effect at the next billing cycle and we will prorate any credits.',
  },
  {
    question: 'What is included in all plans?',
    answer: 'All plans include SSL certificates, custom domain support, Git-based deployment, automated backups, and access to Atlas support.',
  },
  {
    question: 'What is Dedicated Cloud?',
    answer: 'Dedicated Cloud provides isolated compute resources rather than shared allocation. It is suitable for production workloads requiring stronger resource guarantees, Web3 infrastructure, and advanced networking.',
  },
  {
    question: 'Do you offer a money-back guarantee?',
    answer: 'Yes. We offer a 30-day money-back guarantee on all paid plans.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards and wire transfers for Enterprise plans. Payments are processed securely.',
  },
];
