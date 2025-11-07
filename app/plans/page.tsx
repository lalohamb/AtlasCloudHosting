"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, X } from 'lucide-react';
import GridBackground from '@/components/grid-background';

export default function PlansPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      price: { monthly: 15, yearly: 144 },
      description: 'Perfect for personal websites and small blogs',
      features: [
        '1 WordPress Site',
        '10 GB SSD Storage',
        'Free SSL Certificate',
        '50 GB Bandwidth',
        'Daily Backups',
        'Email Support',
      ],
      notIncluded: ['Custom DevOps', 'Web3 Infrastructure', 'Priority Support'],
    },
    {
      name: 'Professional',
      price: { monthly: 35, yearly: 336 },
      description: 'Ideal for growing businesses and developers',
      popular: true,
      features: [
        'Up to 3 WordPress Sites',
        '50 GB SSD Storage',
        'Free SSL Certificates',
        '200 GB Bandwidth',
        'Daily Backups',
        'Staging Environment',
        'Priority Email Support',
        'Performance Optimization',
      ],
      notIncluded: ['Web3 Infrastructure', 'Dedicated Resources'],
    },
    {
      name: 'Business + Web3',
      price: { monthly: 75, yearly: 720 },
      description: 'Full-stack hosting for modern applications',
      features: [
        'Unlimited WordPress Sites',
        '200 GB SSD Storage',
        'Web3 & Blockchain App Hosting',
        'API & dApp Deployment',
        '1 TB Bandwidth',
        'Grafana Monitoring',
        'Hourly Backups',
        '24/7 Priority Support',
        'Custom Domain Configuration',
      ],
      notIncluded: ['Dedicated Kubernetes Cluster'],
    },
    {
      name: 'Enterprise',
      price: { monthly: 0, yearly: 0 },
      description: 'Custom solutions for enterprise needs',
      custom: true,
      features: [
        'Dedicated Kubernetes Infrastructure',
        'Custom Resource Allocation',
        'Full DevOps Support',
        'Custom SLA Contract',
        'White-label Options',
        'Dedicated Account Manager',
        'Advanced Security Features',
        'Custom Integrations',
        'Multi-region Deployment',
      ],
      notIncluded: [],
    },
  ];

  const faqs = [
    {
      question: 'What is included in all plans?',
      answer: 'All plans include free SSL certificates, DDoS protection, automated daily backups, 99.9% uptime guarantee, and access to our customer support team.',
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we will prorate any charges or credits.',
    },
    {
      question: 'What is Web3 hosting?',
      answer: 'Web3 hosting includes infrastructure for blockchain applications, smart contracts, decentralized apps (dApps), and API services. We provide DigitalOcean-powered servers optimized for blockchain nodes and Web3 technologies.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee on all paid plans. If you\'re not satisfied with our service within the first 30 days, we\'ll provide a full refund.',
    },
    {
      question: 'How does the Enterprise plan work?',
      answer: 'Enterprise plans are fully customized based on your specific requirements. Contact our sales team to discuss your needs, and we\'ll create a tailored solution with dedicated resources, custom SLAs, and enterprise-grade support.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and wire transfers for Enterprise plans. All payments are processed securely through Stripe.',
    },
  ];

  const comparisonFeatures = [
    { name: 'WordPress Sites', starter: '1', professional: '3', business: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Storage', starter: '10 GB', professional: '50 GB', business: '200 GB', enterprise: 'Custom' },
    { name: 'Bandwidth', starter: '50 GB', professional: '200 GB', business: '1 TB', enterprise: 'Unlimited' },
    { name: 'SSL Certificates', starter: true, professional: true, business: true, enterprise: true },
    { name: 'Daily Backups', starter: true, professional: true, business: false, enterprise: false },
    { name: 'Hourly Backups', starter: false, professional: false, business: true, enterprise: true },
    { name: 'Web3 Hosting', starter: false, professional: false, business: true, enterprise: true },
    { name: 'Grafana Monitoring', starter: false, professional: false, business: true, enterprise: true },
    { name: 'Staging Environment', starter: false, professional: true, business: true, enterprise: true },
    { name: 'Priority Support', starter: false, professional: true, business: true, enterprise: true },
    { name: 'Dedicated Resources', starter: false, professional: false, business: false, enterprise: true },
    { name: 'Custom SLA', starter: false, professional: false, business: false, enterprise: true },
  ];

  return (
    <div className="py-24 relative">
      <GridBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Choose Your <span className="text-electric-cyan">Perfect Plan</span>
          </h1>
          <p className="text-xl text-soft-silver/80 max-w-2xl mx-auto mb-8">
            Transparent pricing for every stage of your journey. From startups to enterprises.
          </p>

          <div className="inline-flex items-center gap-2 bg-white/5 p-1 rounded-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-electric-cyan text-space-blue font-semibold'
                  : 'text-soft-silver hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-electric-cyan text-space-blue font-semibold'
                  : 'text-soft-silver hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-accent-orange/20 text-accent-orange px-2 py-1 rounded">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all ${
                plan.popular ? 'ring-2 ring-electric-cyan' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-electric-cyan text-space-blue text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                <CardDescription className="text-soft-silver/70">{plan.description}</CardDescription>
                <div className="pt-4">
                  {plan.custom ? (
                    <div className="text-4xl font-bold text-white">Custom</div>
                  ) : (
                    <>
                      <div className="text-4xl font-bold text-white">
                        ${plan.price[billingCycle]}
                        <span className="text-lg text-soft-silver/70 font-normal">
                          /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <div className="text-sm text-soft-silver/70 mt-1">
                          ${(plan.price.yearly / 12).toFixed(2)}/month billed annually
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-electric-cyan flex-shrink-0 mt-0.5" />
                      <span className="text-soft-silver/90 text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 opacity-40">
                      <X className="h-5 w-5 text-soft-silver/50 flex-shrink-0 mt-0.5" />
                      <span className="text-soft-silver/50 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {plan.custom ? 'Contact Sales' : 'Get Started'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Compare <span className="text-electric-cyan">Features</span>
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white font-semibold">Feature</th>
                  <th className="text-center p-4 text-white font-semibold">Starter</th>
                  <th className="text-center p-4 text-white font-semibold">Professional</th>
                  <th className="text-center p-4 text-white font-semibold">Business</th>
                  <th className="text-center p-4 text-white font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className="border-b border-white/5">
                    <td className="p-4 text-soft-silver/90">{feature.name}</td>
                    <td className="p-4 text-center text-soft-silver/90">
                      {typeof feature.starter === 'boolean' ? (
                        feature.starter ? (
                          <Check className="h-5 w-5 text-electric-cyan mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-soft-silver/30 mx-auto" />
                        )
                      ) : (
                        feature.starter
                      )}
                    </td>
                    <td className="p-4 text-center text-soft-silver/90">
                      {typeof feature.professional === 'boolean' ? (
                        feature.professional ? (
                          <Check className="h-5 w-5 text-electric-cyan mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-soft-silver/30 mx-auto" />
                        )
                      ) : (
                        feature.professional
                      )}
                    </td>
                    <td className="p-4 text-center text-soft-silver/90">
                      {typeof feature.business === 'boolean' ? (
                        feature.business ? (
                          <Check className="h-5 w-5 text-electric-cyan mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-soft-silver/30 mx-auto" />
                        )
                      ) : (
                        feature.business
                      )}
                    </td>
                    <td className="p-4 text-center text-soft-silver/90">
                      {typeof feature.enterprise === 'boolean' ? (
                        feature.enterprise ? (
                          <Check className="h-5 w-5 text-electric-cyan mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-soft-silver/30 mx-auto" />
                        )
                      ) : (
                        feature.enterprise
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Frequently Asked <span className="text-electric-cyan">Questions</span>
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white/5 backdrop-blur-sm border-white/10 rounded-lg px-6"
              >
                <AccordionTrigger className="text-white hover:text-electric-cyan">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-soft-silver/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
