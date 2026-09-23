"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, X } from 'lucide-react';
import GridBackground from '@/components/grid-background';
import { plans, comparisonRows, addOns, faqs, type BillingCycle } from '@/config/plans';

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>('monthly');

  return (
    <div className="py-24 relative">
      <GridBackground />
      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Simple, <span className="text-electric-cyan">Transparent Pricing</span>
          </h1>
          <p className="text-xl text-soft-silver/80 max-w-2xl mx-auto mb-8">
            Managed cloud infrastructure for every stage of your project.
          </p>

          <div className="inline-flex items-center gap-2 bg-white/5 p-1 rounded-lg">
            {(['monthly', 'yearly'] as BillingCycle[]).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBilling(cycle)}
                className={`px-6 py-2 rounded-md transition-all capitalize ${
                  billing === cycle
                    ? 'bg-electric-cyan text-space-blue font-semibold'
                    : 'text-soft-silver hover:text-white'
                }`}
              >
                {cycle}
                {cycle === 'yearly' && (
                  <span className="ml-2 text-xs bg-accent-orange/20 text-accent-orange px-2 py-0.5 rounded">
                    Save ~20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all ${
                plan.highlighted ? 'ring-2 ring-electric-cyan' : ''
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-electric-cyan text-space-blue text-xs font-bold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                <CardDescription className="text-soft-silver/70">{plan.tagline}</CardDescription>
                <div className="pt-4">
                  {plan.price ? (
                    <>
                      <div className="text-4xl font-bold text-white">
                        ${plan.price[billing]}
                        <span className="text-lg text-soft-silver/70 font-normal">
                          /{billing === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      </div>
                      {billing === 'yearly' && (
                        <div className="text-sm text-soft-silver/60 mt-1">
                          ${(plan.price.yearly / 12).toFixed(0)}/month billed annually
                        </div>
                      )}
                      {plan.id === 'dedicated' && (
                        <div className="text-xs text-soft-silver/50 mt-1">Starting at</div>
                      )}
                    </>
                  ) : (
                    <div className="text-4xl font-bold text-white">Custom</div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-electric-cyan flex-shrink-0 mt-0.5" />
                      <span className="text-soft-silver/90 text-sm">{f}</span>
                    </li>
                  ))}
                  {plan.notIncluded?.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 opacity-40">
                      <X className="h-4 w-4 text-soft-silver/50 flex-shrink-0 mt-0.5" />
                      <span className="text-soft-silver/50 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.ctaHref}>
                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? 'bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enterprise callout */}
        <div className="max-w-4xl mx-auto mb-24">
          <Card className="bg-gradient-to-br from-electric-cyan/10 to-accent-orange/10 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-2">Need More Infrastructure?</h2>
              <h3 className="text-xl text-electric-cyan font-semibold mb-4">Atlas Enterprise</h3>
              <p className="text-soft-silver/80 mb-6">
                Custom infrastructure for demanding workloads — dedicated servers, Kubernetes, load balancing, high availability, multi-region architecture, managed databases, advanced security, and custom SLA.
              </p>
              <Link href="/contact">
                <Button className="bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold">
                  Contact Atlas
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Comparison table */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Compare <span className="text-electric-cyan">Plans</span>
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white font-semibold">Feature</th>
                  {plans.map((p) => (
                    <th key={p.id} className="text-center p-4 text-white font-semibold">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="p-4 text-soft-silver/90 text-sm">{row.name}</td>
                    {(['developer', 'professional', 'business', 'dedicated'] as const).map((key) => (
                      <td key={key} className="p-4 text-center text-soft-silver/90 text-sm">
                        {typeof row[key] === 'boolean' ? (
                          row[key] ? (
                            <Check className="h-4 w-4 text-electric-cyan mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-soft-silver/30 mx-auto" />
                          )
                        ) : (
                          row[key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add-ons */}
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Add-<span className="text-electric-cyan">Ons</span>
          </h2>
          <p className="text-soft-silver/70 text-center mb-10">Extend your plan with additional resources. Contact us for pricing.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {addOns.map((addon) => (
              <div key={addon.id} className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{addon.label}</p>
                  <p className="text-soft-silver/70 text-xs mt-1">{addon.description}</p>
                </div>
                <span className="text-electric-cyan text-xs font-medium whitespace-nowrap">{addon.priceNote}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Frequently Asked <span className="text-electric-cyan">Questions</span>
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-white/5 backdrop-blur-sm border-white/10 rounded-lg px-6"
              >
                <AccordionTrigger className="text-white hover:text-electric-cyan text-left">
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
