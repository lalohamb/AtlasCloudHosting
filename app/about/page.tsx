import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Target, Award } from 'lucide-react';
import GridBackground from '@/components/grid-background';

export const metadata: Metadata = {
  title: 'About Atlas Cloud — Infrastructure Built Around Your Application',
  description:
    'Atlas Cloud provides managed infrastructure for developers, businesses, SaaS platforms, and Web3 applications. Operated by Blockchain Dev3 Consulting under Prestige Holdings Enterprise Group.',
};

const values = [
  {
    icon: Shield,
    title: 'Transparency',
    description: 'Clear pricing, honest communication, and no hidden fees. What you see is what you get.',
  },
  {
    icon: Users,
    title: 'Developer First',
    description: 'We build for developers, engineers, and businesses who value reliable infrastructure and operational clarity.',
  },
  {
    icon: Target,
    title: 'Operational Excellence',
    description: 'Managed infrastructure with monitoring, backups, SSL, and deployment operations handled by Atlas.',
  },
  {
    icon: Award,
    title: 'Honest Capability',
    description: 'We only advertise what Atlas actually supports. No inflated claims, no unsupported promises.',
  },
];

export default function AboutPage() {
  return (
    <div className="py-24 relative">
      <GridBackground />
      <div className="container mx-auto px-4 relative z-10">

        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Infrastructure Built Around{' '}
            <span className="text-electric-cyan">Your Application</span>
          </h1>
          <p className="text-xl text-soft-silver/80 leading-relaxed">
            Atlas Cloud provides managed infrastructure for developers, businesses, SaaS platforms, and Web3 applications.
          </p>
        </div>

        {/* Who we are */}
        <div className="max-w-5xl mx-auto mb-24">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-6">Who We Are</h2>
              <div className="space-y-4 text-soft-silver/90 text-lg leading-relaxed">
                <p>
                  Atlas Cloud is a managed cloud infrastructure service operated by{' '}
                  <span className="text-electric-cyan font-semibold">Blockchain Dev3 Consulting</span>, under the{' '}
                  <span className="text-electric-cyan font-semibold">Prestige Holdings Enterprise Group</span>.
                </p>
                <p>
                  We combine application deployment, cloud infrastructure, monitoring, backups, security, and operational tooling into a unified managed platform. From a single application to dedicated multi-server environments, Atlas is designed to make cloud deployment accessible without requiring every customer to become an infrastructure engineer.
                </p>
                <p>
                  Atlas also offers ready-to-launch software products through{' '}
                  <span className="text-electric-cyan font-semibold">Atlas Products</span> — pre-built business applications hosted and managed on Atlas Cloud infrastructure.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mission */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white text-center mb-4">Our Mission</h2>
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl text-soft-silver/90 italic leading-relaxed border-l-4 border-electric-cyan pl-6 py-4 text-left">
              &ldquo;Make cloud infrastructure accessible to every developer and business — without requiring them to become infrastructure engineers.&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Our <span className="text-electric-cyan">Values</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {values.map((value, i) => (
              <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-electric-cyan/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <value.icon className="h-6 w-6 text-electric-cyan" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                      <p className="text-soft-silver/80">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Part of larger vision */}
        <div className="max-w-5xl mx-auto mb-24">
          <Card className="bg-gradient-to-br from-electric-cyan/10 to-accent-orange/10 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Part of a Larger Vision</h2>
              <p className="text-soft-silver/90 text-lg leading-relaxed">
                Atlas Cloud is part of the{' '}
                <span className="text-electric-cyan font-semibold">Prestige Holdings Enterprise Group</span> — a collective of technology companies committed to building ethical, sustainable, and innovative solutions for the digital economy.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Deploy on Atlas?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cloud">
              <Button size="lg" className="bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold px-8">
                Explore Cloud
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-electric-cyan text-electric-cyan hover:bg-electric-cyan/10 px-8">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
