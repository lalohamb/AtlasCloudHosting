import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Target, Award } from 'lucide-react';
import GridBackground from '@/components/grid-background';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Transparency',
      description: 'Clear pricing, honest communication, and no hidden fees. What you see is what you get.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We build for developers, creators, and businesses who value independence and innovation.',
    },
    {
      icon: Target,
      title: 'Performance',
      description: 'Enterprise-grade infrastructure with 99.9% uptime backed by DigitalOcean\'s global network.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Expert DevOps support and managed services that scale with your success.',
    },
  ];

  return (
    <div className="py-24 relative">
      <GridBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-electric-cyan">Atlas Cloud</span>
          </h1>
          <p className="text-xl text-soft-silver/80 leading-relaxed">
            We&apos;re not just another hosting provider. We&apos;re your infrastructure partner for the modern web.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-24">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-6">Who We Are</h2>
              <div className="space-y-4 text-soft-silver/90 text-lg leading-relaxed">
                <p>
                  Atlas Cloud Hosting is a managed hosting service powered by{' '}
                  <span className="text-electric-cyan font-semibold">Blockchain Dev3 Consulting</span>, operating under the{' '}
                  <span className="text-electric-cyan font-semibold">Prestige Holdings Enterprise Group</span>.
                </p>
                <p>
                  We bridge the gap between traditional web hosting and the emerging Web3 ecosystem. Whether you&apos;re running a WordPress blog or deploying a decentralized application, we provide the infrastructure, expertise, and support you need to succeed.
                </p>
                <p>
                  Built on <span className="text-electric-cyan font-semibold">DigitalOcean&apos;s</span> industry-leading cloud infrastructure, we combine enterprise reliability with developer-friendly tools and transparent pricing.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white text-center mb-4">Our Mission</h2>
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl text-soft-silver/90 italic leading-relaxed border-l-4 border-electric-cyan pl-6 py-4">
              &ldquo;Empowering creators and businesses to host freely, securely, and independently.&rdquo;
            </blockquote>
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Our <span className="text-electric-cyan">Values</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
              >
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

        <div className="max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-electric-cyan/10 to-accent-orange/10 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-6">Why Choose Atlas Cloud?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-electric-cyan mb-3">Ethical Hosting</h3>
                  <p className="text-soft-silver/90">
                    We believe in fair pricing, data privacy, and sustainable infrastructure. No lock-in contracts, no surprise fees.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-electric-cyan mb-3">Expert Support</h3>
                  <p className="text-soft-silver/90">
                    Our team consists of seasoned DevOps engineers and blockchain developers ready to assist you 24/7.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-electric-cyan mb-3">Future-Proof</h3>
                  <p className="text-soft-silver/90">
                    From traditional WordPress to cutting-edge Web3 applications, we support the full spectrum of modern web technologies.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-electric-cyan mb-3">Proven Infrastructure</h3>
                  <p className="text-soft-silver/90">
                    Built on DigitalOcean&apos;s global network with 99.9% uptime SLA and enterprise-grade security.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-24">
          <h2 className="text-3xl font-bold text-white mb-4">Part of a Larger Vision</h2>
          <p className="text-soft-silver/80 max-w-3xl mx-auto mb-8">
            Atlas Cloud Hosting is proudly part of the <span className="text-electric-cyan font-semibold">Prestige Holdings Enterprise Group</span>,
            a collective of technology companies committed to building ethical, sustainable, and innovative solutions for the digital economy.
          </p>
        </div>
      </div>
    </div>
  );
}
