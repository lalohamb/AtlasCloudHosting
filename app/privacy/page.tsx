import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Privacy <span className="text-electric-cyan">Policy</span>
          </h1>
          <p className="text-soft-silver/80 mb-12">Last updated: October 2025</p>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8 space-y-6 text-soft-silver/90">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                <p>
                  At Atlas Cloud Hosting, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                <p className="mb-2">We collect information that you provide directly to us, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Account information (name, email, billing details)</li>
                  <li>Service usage data and logs</li>
                  <li>Communication preferences</li>
                  <li>Technical information about your hosted applications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                <p className="mb-2">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our hosting services</li>
                  <li>Process your transactions and send related information</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Monitor and analyze trends and usage</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your data. All data is encrypted in transit and at rest, and we maintain strict access controls.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at{' '}
                  <a href="mailto:privacy@atlascloud.hosting" className="text-electric-cyan hover:underline">
                    privacy@atlascloud.hosting
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
