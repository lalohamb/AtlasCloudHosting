"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Percent, Users, Rocket, DollarSign, Award, Headphones } from 'lucide-react';
import GridBackground from '@/components/grid-background';

export default function PartnersPage() {
  const benefits = [
    {
      icon: Percent,
      title: '5-10% Recurring Commissions',
      description: 'Earn competitive commissions on every customer you refer, for as long as they remain a customer.',
    },
    {
      icon: Users,
      title: 'White-Label Solutions',
      description: 'Rebrand our hosting services as your own. Perfect for agencies and resellers.',
    },
    {
      icon: Rocket,
      title: 'Marketing Support',
      description: 'Access to co-branded marketing materials, banners, landing pages, and promotional content.',
    },
    {
      icon: DollarSign,
      title: 'Transparent Tracking',
      description: 'Real-time dashboard to track referrals, commissions, and customer activity.',
    },
    {
      icon: Award,
      title: 'Tier-Based Rewards',
      description: 'Unlock higher commission rates and exclusive perks as you grow your referral network.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description: 'Priority partner support channel with dedicated account management for high-volume partners.',
    },
  ];

  const programs = [
    {
      name: 'Affiliate Program',
      description: 'Perfect for content creators, bloggers, and influencers',
      commission: '5-7%',
      features: [
        'Unique referral links',
        'Cookie tracking (90 days)',
        'Monthly payouts via PayPal or bank transfer',
        'Marketing assets library',
        'Performance analytics dashboard',
      ],
    },
    {
      name: 'Reseller Program',
      description: 'Ideal for web agencies and freelance developers',
      commission: '7-10%',
      features: [
        'White-label dashboard',
        'Custom pricing control',
        'Bulk account management',
        'Priority technical support',
        'Co-branded invoicing',
        'Dedicated partner portal',
      ],
    },
    {
      name: 'Enterprise Partnership',
      description: 'Custom solutions for large organizations',
      commission: 'Custom',
      features: [
        'Volume-based pricing',
        'Custom integration support',
        'Dedicated account manager',
        'Joint marketing opportunities',
        'Custom SLA agreements',
        'Revenue sharing models',
      ],
    },
  ];

  return (
    <div className="py-24 relative">
      <GridBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Partner <span className="text-electric-cyan">Programs</span>
          </h1>
          <p className="text-xl text-soft-silver/80 leading-relaxed mb-8">
            Join our partner ecosystem and earn recurring revenue while helping businesses succeed with world-class hosting.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold text-lg px-8">
              Become a Partner
            </Button>
          </Link>
        </div>

        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Why Partner with <span className="text-electric-cyan">Atlas Cloud</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-electric-cyan/10 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-electric-cyan" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                  <p className="text-soft-silver/80">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Choose Your <span className="text-electric-cyan">Partnership Level</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {programs.map((program, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{program.name}</CardTitle>
                  <p className="text-soft-silver/70">{program.description}</p>
                  <div className="pt-4">
                    <div className="text-3xl font-bold text-electric-cyan">
                      {program.commission}
                    </div>
                    <div className="text-sm text-soft-silver/70">recurring commission</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-electric-cyan rounded-full mt-2 flex-shrink-0" />
                        <span className="text-soft-silver/90 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <Button className="w-full bg-white/10 hover:bg-white/20 text-white">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-electric-cyan/10 to-accent-orange/10 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">How It Works</h2>
              <div className="grid md:grid-cols-4 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-electric-cyan/20 rounded-full flex items-center justify-center text-2xl font-bold text-electric-cyan mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Apply</h3>
                  <p className="text-soft-silver/80 text-sm">
                    Submit your partnership application and tell us about your business.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-electric-cyan/20 rounded-full flex items-center justify-center text-2xl font-bold text-electric-cyan mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Get Approved</h3>
                  <p className="text-soft-silver/80 text-sm">
                    Our team reviews your application, typically within 48 hours.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-electric-cyan/20 rounded-full flex items-center justify-center text-2xl font-bold text-electric-cyan mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Start Referring</h3>
                  <p className="text-soft-silver/80 text-sm">
                    Access your partner portal and start sharing your unique links.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-electric-cyan/20 rounded-full flex items-center justify-center text-2xl font-bold text-electric-cyan mx-auto mb-4">
                    4
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Earn Commissions</h3>
                  <p className="text-soft-silver/80 text-sm">
                    Receive recurring monthly payments for every active customer.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-24">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-soft-silver/80 max-w-2xl mx-auto mb-8">
            Join hundreds of partners who are already earning recurring income with Atlas Cloud. Whether you&apos;re an affiliate, agency, or enterprise, we have a program that fits your needs.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent-orange hover:bg-accent-orange/90 text-white font-semibold text-lg px-8">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
