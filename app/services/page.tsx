import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Code2,
  Globe,
  Bot,
  Blocks,
  Cpu,
  Wrench,
  Database,
  Layers,
  FlaskConical,
  ArrowRight,
  Check,
} from 'lucide-react';
import GridBackground from '@/components/grid-background';

export const metadata: Metadata = {
  title: 'Services — Atlas Cloud | Custom Development & Engineering',
  description:
    'Custom blockchain development, token testing environments, Next.js web and app development, AI MCP services, API engineering, and bespoke software projects. Built and hosted by Atlas Cloud.',
};

const services = [
  {
    icon: Blocks,
    title: 'Blockchain Development',
    tag: 'Web3',
    tagColor: 'text-electric-cyan bg-electric-cyan/10 border-electric-cyan/30',
    description:
      'Custom smart contract development, dApp architecture, Web3 API integration, blockchain backend services, and on-chain automation. We build production-grade Web3 systems from the ground up.',
    capabilities: [
      'Smart contract development (EVM-compatible)',
      'dApp frontend + backend architecture',
      'Web3 API and RPC infrastructure',
      'Token and NFT contract development',
      'On-chain automation and event listeners',
      'Blockchain data indexing',
      'Wallet integration (MetaMask, WalletConnect)',
      'Audit-ready contract code',
    ],
    cta: 'Discuss Your Project',
  },
  {
    icon: Globe,
    title: 'Next.js Web & App Development',
    tag: 'Web',
    tagColor: 'text-accent-orange bg-accent-orange/10 border-accent-orange/30',
    description:
      'Full-stack Next.js applications built for performance, scalability, and maintainability. From marketing sites to complex SaaS platforms — designed, built, and deployed on Atlas Cloud.',
    capabilities: [
      'Next.js 15 App Router applications',
      'Full-stack TypeScript development',
      'SaaS platform architecture',
      'E-commerce storefronts',
      'Admin dashboards and control panels',
      'API routes and backend services',
      'Supabase / PostgreSQL integration',
      'Stripe billing integration',
      'Deployed and hosted on Atlas Cloud',
    ],
    cta: 'Start Your Project',
  },
  {
    icon: Bot,
    title: 'AI & MCP Services',
    tag: 'AI',
    tagColor: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
    description:
      'Model Context Protocol (MCP) server development, AI-powered application integration, LLM workflow automation, and custom AI tooling. We build the infrastructure that connects your systems to AI.',
    capabilities: [
      'MCP server development and deployment',
      'Custom MCP tool and resource implementation',
      'LLM integration (OpenAI, Anthropic, local models)',
      'AI-powered workflow automation',
      'Retrieval-Augmented Generation (RAG) systems',
      'AI agent architecture',
      'Embedding pipelines and vector databases',
      'AI API development and hosting',
    ],
    cta: 'Explore AI Services',
  },
  {
    icon: Code2,
    title: 'Custom Software Projects',
    tag: 'Custom',
    tagColor: 'text-green-400 bg-green-400/10 border-green-400/30',
    description:
      'Bespoke software built around your specific requirements. Whether you have a detailed spec or just an idea, we scope, architect, and deliver production-ready software.',
    capabilities: [
      'Greenfield application development',
      'Legacy system modernization',
      'API design and development',
      'Third-party integration engineering',
      'Automation and workflow tooling',
      'Internal tools and dashboards',
      'Data pipelines and processing systems',
      'Technical architecture consulting',
    ],
    cta: 'Tell Us What You Need',
  },
  {
    icon: Cpu,
    title: 'Node.js & API Engineering',
    tag: 'Backend',
    tagColor: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    description:
      'Production-grade Node.js services, REST and GraphQL APIs, background workers, and microservice architecture. Built for reliability, performance, and maintainability.',
    capabilities: [
      'REST API design and development',
      'GraphQL API development',
      'Background job and queue systems',
      'Webhook processing services',
      'Real-time services (WebSockets)',
      'Authentication and authorization systems',
      'Rate limiting and security middleware',
      'Hosted on Atlas Cloud infrastructure',
    ],
    cta: 'Build Your API',
  },
  {
    icon: Database,
    title: 'Database Architecture',
    tag: 'Data',
    tagColor: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    description:
      'Database design, schema architecture, query optimization, and managed database infrastructure. We design data models that scale with your application.',
    capabilities: [
      'PostgreSQL schema design and optimization',
      'Supabase architecture and RLS design',
      'Database migration planning',
      'Query performance optimization',
      'Row-Level Security implementation',
      'Redis caching architecture',
      'Data modeling for SaaS multi-tenancy',
      'Managed database hosting on Atlas Cloud',
    ],
    cta: 'Design Your Database',
  },
  {
    icon: Layers,
    title: 'DevOps & Deployment',
    tag: 'DevOps',
    tagColor: 'text-soft-silver bg-white/5 border-white/20',
    description:
      'CI/CD pipeline setup, Docker containerization, deployment automation, and infrastructure configuration. We get your application from code to production reliably.',
    capabilities: [
      'Docker and Docker Compose setup',
      'CI/CD pipeline configuration',
      'Git-based deployment workflows',
      'Environment configuration management',
      'SSL and domain configuration',
      'Monitoring and alerting setup',
      'Infrastructure-as-code',
      'Atlas Cloud deployment and hosting',
    ],
    cta: 'Streamline Your Deployments',
  },
  {
    icon: FlaskConical,
    title: 'Token Testing & Development Environments',
    tag: 'Web3',
    tagColor: 'text-electric-cyan bg-electric-cyan/10 border-electric-cyan/30',
    description:
      'Isolated testnet environments, token contract testing pipelines, and full-stack development environments for blockchain projects. Ship with confidence before you go to mainnet.',
    capabilities: [
      'Dedicated testnet environment setup (Hardhat, Anvil, Foundry)',
      'ERC-20, ERC-721, ERC-1155 token contract testing',
      'Automated test suite development for smart contracts',
      'Local fork environments (mainnet/testnet forking)',
      'Token deployment pipelines (testnet → mainnet)',
      'Contract upgrade and proxy pattern testing',
      'Gas optimization analysis and reporting',
      'Integration testing with frontend dApps',
      'CI/CD pipelines for smart contract projects',
      'Hosted test environments on Atlas Cloud',
    ],
    cta: 'Set Up Your Test Environment',
  },
  {
    icon: Wrench,
    title: 'Technical Consulting',
    tag: 'Consulting',
    tagColor: 'text-soft-silver bg-white/5 border-white/20',
    description:
      'Architecture reviews, technology selection, code audits, and strategic technical guidance. We help you make the right decisions before you build.',
    capabilities: [
      'Application architecture review',
      'Technology stack selection',
      'Security audit and recommendations',
      'Scalability planning',
      'Code quality review',
      'Web3 strategy and feasibility',
      'AI integration roadmapping',
      'Infrastructure cost optimization',
    ],
    cta: 'Book a Consultation',
  },
];

const process = [
  { step: '1', title: 'Discovery',     desc: 'We discuss your requirements, goals, and constraints. No commitment required.' },
  { step: '2', title: 'Scoping',       desc: 'We produce a clear scope of work with deliverables, timeline, and pricing.' },
  { step: '3', title: 'Development',   desc: 'We build your project with regular updates and checkpoints throughout.' },
  { step: '4', title: 'Delivery',      desc: 'Code delivered, tested, documented, and deployed on Atlas Cloud if applicable.' },
];

export default function ServicesPage() {
  return (
    <div className="py-24 relative">
      <GridBackground />
      <div className="container mx-auto px-4 relative z-10">

        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Custom Development &{' '}
            <span className="text-electric-cyan">Engineering Services</span>
          </h1>
          <p className="text-xl text-soft-silver/80 mb-8 max-w-3xl mx-auto">
            Blockchain development, Next.js applications, AI and MCP services, token testing environments, API engineering, and bespoke software projects — built by Blockchain Dev3 Consulting and hosted on Atlas Cloud.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold px-8">
                Start a Project
              </Button>
            </Link>
            <a href="#services">
              <Button size="lg" variant="outline" className="border-electric-cyan text-electric-cyan hover:bg-electric-cyan/10 px-8">
                Explore Services
              </Button>
            </a>
          </div>
        </div>

        {/* Services grid */}
        <div id="services" className="max-w-6xl mx-auto mb-24">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <Card
                key={i}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all hover:border-electric-cyan/20 group"
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-electric-cyan/10 rounded-lg flex items-center justify-center group-hover:bg-electric-cyan/20 transition-colors">
                      <service.icon className="h-6 w-6 text-electric-cyan" />
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${service.tagColor}`}>
                      {service.tag}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-3">{service.title}</h2>
                  <p className="text-soft-silver/80 text-sm leading-relaxed mb-5">{service.description}</p>

                  <ul className="space-y-1.5 mb-6">
                    {service.capabilities.map((cap, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-soft-silver/70">
                        <Check className="h-3.5 w-3.5 text-electric-cyan flex-shrink-0 mt-0.5" />
                        {cap}
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="border-white/20 text-soft-silver hover:text-white hover:border-electric-cyan/50 group-hover:border-electric-cyan/40 transition-colors w-full"
                    >
                      {service.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How we work */}
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            How We <span className="text-electric-cyan">Work</span>
          </h2>
          <p className="text-soft-silver/70 text-center mb-12">
            Every project starts with a conversation. No commitment required.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {process.map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-electric-cyan/10 border border-electric-cyan/30 rounded-full flex items-center justify-center text-electric-cyan font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-soft-silver/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Atlas Cloud hosting note */}
        <div className="max-w-4xl mx-auto mb-24">
          <Card className="bg-gradient-to-br from-electric-cyan/10 to-accent-orange/10 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8 md:p-10">
              <h2 className="text-2xl font-bold text-white mb-3">Built and Hosted on Atlas Cloud</h2>
              <p className="text-soft-silver/80 leading-relaxed mb-4">
                Every project we deliver can be hosted and managed on Atlas Cloud infrastructure. You get the code and the infrastructure — deployed, monitored, backed up, and maintained as a single managed service.
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {['Managed deployment', 'SSL included', 'Automated backups', 'Application monitoring', 'Infrastructure management', 'Platform updates'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-soft-silver/80">
                    <Check className="h-3.5 w-3.5 text-electric-cyan flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Final CTA */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-soft-silver/80 mb-8 text-lg">
            Tell us what you&apos;re building. We&apos;ll scope it, price it, and deliver it.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold px-10 text-lg">
              Start the Conversation
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
