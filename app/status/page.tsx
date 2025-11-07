import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Activity } from 'lucide-react';
import GridBackground from '@/components/grid-background';

export default function StatusPage() {
  const services = [
    { name: 'WordPress Hosting', status: 'operational', uptime: '99.98%' },
    { name: 'Web3 Infrastructure', status: 'operational', uptime: '99.95%' },
    { name: 'API Services', status: 'operational', uptime: '99.99%' },
    { name: 'Database Systems', status: 'operational', uptime: '99.97%' },
    { name: 'CDN Network', status: 'operational', uptime: '99.99%' },
    { name: 'Email Services', status: 'operational', uptime: '99.96%' },
  ];

  return (
    <div className="py-24 relative">
      <GridBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            System <span className="text-electric-cyan">Status</span>
          </h1>
          <p className="text-xl text-soft-silver/80 leading-relaxed">
            Real-time monitoring of all Atlas Cloud services and infrastructure.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-12">
          <Card className="bg-gradient-to-br from-green-500/10 to-electric-cyan/10 border-green-500/20 backdrop-blur-sm">
            <CardContent className="p-8 flex items-center justify-center gap-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <h2 className="text-2xl font-bold text-white">All Systems Operational</h2>
                <p className="text-soft-silver/80">No incidents reported in the last 30 days</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Service Status</h2>
          <div className="space-y-4">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                        <p className="text-sm text-green-500 capitalize">{service.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-soft-silver/70">30-day uptime</div>
                      <div className="text-xl font-bold text-electric-cyan">{service.uptime}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <Activity className="h-6 w-6 text-electric-cyan flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Grafana Monitoring Dashboard</h2>
                  <p className="text-soft-silver/80 mb-6">
                    For detailed real-time metrics, performance graphs, and system analytics, access our Grafana monitoring dashboard.
                  </p>
                </div>
              </div>

              <div className="bg-space-blue/50 rounded-lg p-12 border border-white/10 text-center">
                <Activity className="h-16 w-16 text-electric-cyan/50 mx-auto mb-4" />
                <p className="text-soft-silver/70 mb-4">Grafana Dashboard Placeholder</p>
                <p className="text-sm text-soft-silver/50">
                  Live monitoring dashboard will be embedded here
                </p>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-electric-cyan mb-1">99.97%</div>
                  <div className="text-sm text-soft-silver/70">Overall Uptime</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-electric-cyan mb-1">&lt;50ms</div>
                  <div className="text-sm text-soft-silver/70">Avg Response Time</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-electric-cyan mb-1">24/7</div>
                  <div className="text-sm text-soft-silver/70">Monitoring</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto mt-12">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Incident History</h2>
              <p className="text-soft-silver/80 mb-6">No incidents to report in the last 90 days.</p>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="text-green-500 font-semibold">Perfect Track Record</p>
                <p className="text-soft-silver/70 text-sm mt-2">
                  Our infrastructure has maintained exceptional stability with zero critical incidents.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <p className="text-soft-silver/70">
            System uptime monitored by <span className="text-electric-cyan font-semibold">Atlas Cloud Monitoring</span>
          </p>
          <p className="text-soft-silver/50 text-sm mt-2">
            Powered by DigitalOcean infrastructure with 24/7 automated monitoring
          </p>
        </div>
      </div>
    </div>
  );
}
