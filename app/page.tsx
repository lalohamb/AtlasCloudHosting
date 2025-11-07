"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Server, Globe, Gauge } from 'lucide-react';
import AnimatedBackground from '@/components/animated-background';
import AtlasLogo from '@/components/atlas-logo';

export default function Home() {
  const features = [
    {
      icon: Server,
      title: 'Fast & Secure WordPress Hosting',
      description: 'Lightning-fast WordPress hosting with automated backups, SSL certificates, and 99.9% uptime guarantee.',
    },
    {
      icon: Globe,
      title: 'Blockchain-Ready Cloud Infrastructure',
      description: 'Deploy Web3 applications, smart contracts, and blockchain nodes with enterprise-grade infrastructure.',
    },
    {
      icon: Gauge,
      title: '24/7 Monitoring + SLA Support',
      description: 'Real-time monitoring with Grafana dashboards and expert support when you need it most.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Founder, TechStartup',
      content: 'Atlas Cloud made migrating our WordPress sites seamless. The performance improvement was immediate and impressive.',
      avatar: 'SC',
    },
    {
      name: 'Michael Rodriguez',
      role: 'Blockchain Developer',
      content: 'Finally, a hosting provider that understands Web3. Our dApp infrastructure has never been more reliable.',
      avatar: 'MR',
    },
    {
      name: 'Emily Watson',
      role: 'Digital Agency Owner',
      content: 'The white-label program has been a game-changer for our agency. Great margins and even better support.',
      avatar: 'EW',
    },
  ];

  return (
    <div className="relative">
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
              Scalable Hosting for the{' '}
              <span className="text-gradient">Modern Web</span>
            </h1>
            <p className="text-xl md:text-2xl text-soft-silver mb-4">
              From WordPress to Web3.
            </p>
            <p className="text-lg text-soft-silver/80 mb-8">
              Powered by DigitalOcean. Managed by Dev3 Consulting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/plans">
                <Button size="lg" className="bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold text-lg px-8">
                  View Plans
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-electric-cyan text-electric-cyan hover:bg-electric-cyan/10 font-semibold text-lg px-8">
                  Launch Your Project
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-space-blue to-transparent" />
      </section>

      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            Why Choose <span className="text-electric-cyan">Atlas Cloud</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-electric-cyan/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-electric-cyan" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-soft-silver/80">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Trusted by <span className="text-electric-cyan">Innovators</span>
          </h2>
          <p className="text-soft-silver/80 text-center mb-16 max-w-2xl mx-auto">
            Join thousands of developers and businesses who trust Atlas Cloud for their hosting needs.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <p className="text-soft-silver/90 mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-electric-cyan/20 rounded-full flex items-center justify-center text-electric-cyan font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-soft-silver/70 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Where WordPress Meets <span className="text-gradient">Web3</span>
            </h2>
            <p className="text-xl text-soft-silver/80 mb-8">
              From cPanel to Cloud, We&apos;ve Got You Covered.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-accent-orange hover:bg-accent-orange/90 text-white font-semibold text-lg px-8">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
