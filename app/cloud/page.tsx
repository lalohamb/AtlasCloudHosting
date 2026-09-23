import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Server, Container, Code2, Database, Activity, HardDrive, Network, Cpu } from 'lucide-react';
import GridBackground from '@/components/grid-background';

export const metadata: Metadata = {
  title: 'Atlas Cloud — Managed Application Infrastructure',
  description:
    'Deploy Next.js, Node.js, Docker, APIs, and backend services on managed cloud infrastructure. Atlas handles provisioning, SSL, monitoring, backups, and deployment.',
};

const services = [
  {
    icon: Code2,
    title: 'Application Hosting',
    description: 'Deploy modern web applications and backend services. Supports Next.js, Node.js, and custom runtimes via Docker.',
  },
  {
    icon: Container,
    title: 'Container Hosting',
    description: 'Deploy Docker-based applications with managed container orchestration, networking, and lifecycle management.',
  },
  {
    icon: Server,
    title: 'API & Backend Hosting',
    description: 'Run APIs, workers, services, and backend workloads with configurable compute and memory allocation.',
  },
  {
    icon: Database,
    title: 'Database Services',
    description: 'Managed database architecture for your applications. Provisioned, backed up, and monitored by Atlas.',
  },
  {
    icon: Activity,
    title: 'Monitoring',
    description: 'Application and infrastructure health monitoring with alerting and visibility into your deployment.',
  },
  {
    icon: HardDrive,
    title: 'Backups',
    description: 'Automated backup and recovery options included on all plans. Configurable retention on higher tiers.',
  },
  {
    icon: Network,
    title: 'Private Networking',
    description: 'Isolated private networking available for Business and Dedicated Cloud environments.',
  },
  {
    icon: Cpu,
    title: 'Dedicated Infrastructure',
    description: 'Dedicated compute and networking for advanced workloads requiring stronger resource isolation.',
  },
];

const runtimes = [
  { label: 'Next.js', available: true },
  { label: 'Node.js', available: true },
  { label: 'Docker', available: true },
  { label: 'REST APIs', available: true },
  { label: 'Background Workers', available: true },
  { label: 'Python', available: false, note: 'Coming soon' },
  { label: 'Go', available: false, note: 'Coming soon' },
];

export default function CloudPage() {
  return (
    <div className="py-24 relative">
      <GridBackground />
      <div className="container mx-auto px-4 relative z-10">

        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Managed <span className="text-electric-cyan">Application Infrastructure</span>
          </h1>
          <p className="text-xl text-soft-silver/80 mb-8">
            Deploy your application. Atlas handles the infrastructure — provisioning, networking, SSL, monitoring, backups, and deployment operations.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold text-lg px-8">
              Deploy on Atlas
            </Button>
          </Link>
        </div>

        {/* How it works */}
        <div className="max-w-3xl mx-auto mb-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">How Atlas Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-soft-silver/80">
            {['Your Application', 'Atlas Cloud', 'Provisioning & Management', 'Infrastructure', 'Running Application'].map((step, i, arr) => (
              <div key={i} className="flex items-center gap-4">
                <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm font-medium text-white whitespace-nowrap">
                  {step}
                </div>
                {i < arr.length - 1 && <span className="text-electric-cyan font-bold hidden md:block">→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Services grid */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            What&apos;s <span className="text-electric-cyan">Included</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((service, i) => (
              <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all hover:border-electric-cyan/30">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-electric-cyan/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-electric-cyan" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-soft-silver/80 text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Supported runtimes */}
        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Supported <span className="text-electric-cyan">Runtimes</span>
          </h2>
          <p className="text-soft-silver/70 text-center mb-10">Atlas currently supports the following application types.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {runtimes.map((rt, i) => (
              <div key={i} className={`p-4 rounded-lg border text-center ${rt.available ? 'bg-electric-cyan/5 border-electric-cyan/30' : 'bg-white/5 border-white/10 opacity-60'}`}>
                <p className={`font-semibold text-sm ${rt.available ? 'text-electric-cyan' : 'text-soft-silver/60'}`}>{rt.label}</p>
                {rt.note && <p className="text-xs text-soft-silver/50 mt-1">{rt.note}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Deploy?</h2>
          <p className="text-soft-silver/80 mb-8">Start with a Developer plan or contact us to discuss your requirements.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" className="bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold px-8">
                View Pricing
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-electric-cyan text-electric-cyan hover:bg-electric-cyan/10 px-8">
                Talk to Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
