import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Terms of <span className="text-electric-cyan">Service</span>
          </h1>
          <p className="text-soft-silver/80 mb-12">Last updated: October 2025</p>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8 space-y-6 text-soft-silver/90">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
                <p>
                  By accessing or using Atlas Cloud Hosting services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Service Description</h2>
                <p>
                  Atlas Cloud Hosting provides web hosting, cloud infrastructure, and related services powered by DigitalOcean. We offer various hosting plans including WordPress hosting, Web3 infrastructure, and enterprise solutions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Account Responsibilities</h2>
                <p className="mb-2">You are responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Maintaining the security of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Compliance with all applicable laws and regulations</li>
                  <li>Content hosted on our infrastructure</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Acceptable Use Policy</h2>
                <p className="mb-2">You agree not to use our services to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Distribute malware or conduct malicious activities</li>
                  <li>Engage in spam or phishing activities</li>
                  <li>Overload or disrupt our infrastructure</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Payment Terms</h2>
                <p>
                  All fees are payable in advance based on your chosen billing cycle. We accept major credit cards and PayPal. Enterprise customers may arrange alternative payment terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Service Level Agreement</h2>
                <p>
                  We maintain a 99.9% uptime guarantee for all paid plans. If we fail to meet this guarantee, you may be eligible for service credits as outlined in your specific plan agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
                <p>
                  We reserve the right to suspend or terminate your account if you violate these terms. You may cancel your account at any time through your account dashboard.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p>
                  If you have questions about these Terms of Service, please contact us at{' '}
                  <a href="mailto:legal@atlascloud.hosting" className="text-electric-cyan hover:underline">
                    legal@atlascloud.hosting
                  </a>
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
