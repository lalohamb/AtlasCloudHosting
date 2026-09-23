"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Server, Globe, Gauge, Package, GitBranch, Shield, Database, Activity } from 'lucide-react';
import AnimatedBackground from '@/components/animated-background';
import AtlasLogo from '@/components/atlas-logo';

const capabilities = [
  {
    icon: Server,
    title: 'Application Cloud',
    description: 'Deploy modern applications, APIs, backend services, and containerized workloads on managed infrastructure.',
    href: '/cloud',
  },
  {
    icon: Shield,
    title: 'Managed Infrastructure',
    description: 'Atlas handles provisioning, networking, SSL, monitoring, backups, and deployment operations.',
    href: '/cloud',
  },
  {
    icon: Globe,
    title: 'Web3 Ready',
    description: 'Deploy dApps, Web3 APIs, blockchain backend services, and specialized decentralized infrastructure.',
    href: '/web3',
  },
  {
    icon: Package,
    title: 'Atlas Products',
    description: 'Launch ready-made business applications already optimized and hosted on Atlas Cloud.',
    href: '/products',
    cta: 'Explore Products',
  },
];

const trustIndicators = [
  { icon: Shield, label: 'Managed Infrastructure' },
  { icon: Package, label: 'Container Deployment' },
  { icon: Globe, label: 'Automated SSL' },
  { icon: Database, label: 'Managed Databases' },
  { icon: Activity, label: 'Application Monitoring' },
  { icon: GitBranch, label: 'Git Deployment' },
  { icon: Server, label: 'Private Networking' },
  { icon: Gauge, label: 'Automated Backups' },
];

export default function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-space-blue via-space-blue to-electric-cyan/10" />
        <AnimatedBackground />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-electric-cyan rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-orange rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="w-48 h-48 mx-auto mb-8">
            <AtlasLogo />
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Cloud Infrastructure{' '}
              <span className="text-gradient">Without the Complexity</span>
            </h1>
            <p className="text-xl md:text-2xl text-soft-silver/90 mb-4">
              Deploy applications, APIs, containers, databases, SaaS platforms, and Web3 workloads on managed cloud infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/contact">
                <Button size="lg" className="bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold text-lg px-8">
                  Deploy Your App
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-electric-cyan text-electric-cyan hover:bg-electric-cyan/10 font-semibold text-lg px-8">
                  Explore Cloud Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-space-blue to-transparent" />
      </section>

      {/* Capabilities */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            The <span className="text-electric-cyan">Atlas Platform</span>
          </h2>
          <p className="text-soft-silver/70 text-center mb-16 max-w-2xl mx-auto">
            Atlas is the managed layer between your application and the underlying infrastructure.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {capabilities.map((cap, i) => (
              <Link key={i} href={cap.href} className="group">
                <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-electric-cyan/30">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-electric-cyan/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-electric-cyan/20 transition-colors">
                      <cap.icon className="h-6 w-6 text-electric-cyan" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{cap.title}</h3>
                    <p className="text-soft-silver/80 text-sm leading-relaxed">{cap.description}</p>
                    {cap.cta && (
                      <p className="text-electric-cyan text-sm font-medium mt-4 group-hover:underline">{cap.cta} →</p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust indicators — capability-based, no fake stats */}
      <section className="py-24 relative bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Infrastructure <span className="text-electric-cyan">Included</span>
          </h2>
          <p className="text-soft-silver/70 text-center mb-16 max-w-2xl mx-auto">
            Every Atlas deployment comes with the operational layer built in.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {trustIndicators.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-electric-cyan/30 transition-colors">
                <item.icon className="h-7 w-7 text-electric-cyan" />
                <span className="text-soft-silver/90 text-sm font-medium text-center">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two journeys CTA */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-electric-cyan/10 rounded-lg flex items-center justify-center mb-4">
                  <Server className="h-6 w-6 text-electric-cyan" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Bring Your Application</h3>
                <p className="text-soft-silver/80 mb-6">
                  Deploy your own Next.js, Node.js, Docker, or API workload. Atlas manages the infrastructure so you focus on your code.
                </p>
                <Link href="/cloud">
                  <Button className="bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold">
                    Explore Cloud
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-accent-orange" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Buy an Atlas Product</h3>
                <p className="text-soft-silver/80 mb-6">
                  Launch a ready-made business application. Atlas provisions the environment, manages the infrastructure, and keeps it running.
                </p>
                <Link href="/products">
                  <Button className="bg-accent-orange hover:bg-accent-orange/90 text-white font-semibold">
                    Explore Products
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
