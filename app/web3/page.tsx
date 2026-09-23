import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Code2, Server, Network, Database, Cpu } from 'lucide-react';
import GridBackground from '@/components/grid-background';

export const metadata: Metadata = {
  title: 'Atlas Cloud — Web3 Infrastructure',
  description:
    'Deploy dApps, Web3 APIs, blockchain backend services, RPC infrastructure, and decentralized workloads on Atlas Cloud managed infrastructure.',
};

const services = [
  {
    icon: Globe,
    title: 'dApp Hosting',
    description: 'Deploy decentralized application frontends and backends on managed infrastructure with SSL, monitoring, and automated deployments.',
  },
  {
    icon: Code2,
    title: 'Web3 APIs',
    description: 'Host Web3 API services, indexers, and data layers that power your decentralized applications.',
  },
  {
    icon: Server,
    title: 'Blockchain Backend Services',
    description: 'Run backend services that interact with blockchain networks — transaction processors, event listeners, and automation services.',
  },
  {
    icon: Network,
    title: 'RPC Infrastructure',
    description: 'Dedicated RPC endpoint infrastructure for blockchain network access with reliability and performance.',
  },
  {
    icon: Database,
    title: 'Blockchain Nodes',
    description: 'Run and manage blockchain nodes on dedicated Atlas infrastructure with private networking and monitoring.',
  },
  {
    icon: Cpu,
    title: 'Smart Contract Backend',
    description: 'Infrastructure for smart contract interaction services, oracles, and on-chain automation backends.',
  },
];

export default function Web3Page() {
  return (
    <div className="py-24 relative">
      <GridBackground />
      <div className="container mx-auto px-4 relative z-10">

        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan text-sm font-medium px-4 py-2 rounded-full mb-6">
            Advanced Atlas Capability
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Web3 <span className="text-electric-cyan">Infrastructure</span>
          </h1>
          <p className="text-xl text-soft-silver/80 mb-8">
            Deploy dApps, Web3 APIs, blockchain backend services, and specialized decentralized infrastructure on Atlas Cloud.
          </p>
          <p className="text-soft-silver/60 text-sm mb-8">
            Web3 infrastructure is available on Dedicated Cloud and Enterprise plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold px-8">
                Discuss Your Project
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-electric-cyan text-electric-cyan hover:bg-electric-cyan/10 px-8">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>

        {/* Services */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Web3 <span className="text-electric-cyan">Services</span>
          </h2>
          <p className="text-soft-silver/70 text-center mb-12 max-w-2xl mx-auto">
            Atlas provides managed infrastructure for Web3 workloads. Only advertised capabilities are currently available — contact us to discuss your specific requirements.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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

        {/* Positioning note */}
        <div className="max-w-3xl mx-auto mb-24">
          <Card className="bg-white/5 border-electric-cyan/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-white mb-3">Web3 infrastructure available from Atlas</h3>
              <p className="text-soft-silver/80 leading-relaxed">
                Web3 capabilities are available as part of Dedicated Cloud and Enterprise plans. Not every service is included with every package — Atlas will scope your Web3 infrastructure requirements and recommend the appropriate configuration.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Building on Web3?</h2>
          <p className="text-soft-silver/80 mb-8">
            Tell us about your project and we will design the right infrastructure for your workload.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold px-8">
              Contact Atlas
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
