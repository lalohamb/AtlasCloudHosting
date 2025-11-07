"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Calendar, Linkedin, Github, Twitter } from 'lucide-react';
import GridBackground from '@/components/grid-background';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', website: '', message: '' });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="py-24 relative">
      <GridBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get in <span className="text-electric-cyan">Touch</span>
          </h1>
          <p className="text-xl text-soft-silver/80 leading-relaxed">
            Have questions about our hosting plans? Need custom solutions? Our team is here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
                {submitted ? (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
                    <div className="text-green-500 text-lg font-semibold mb-2">Message Sent!</div>
                    <p className="text-soft-silver/80 text-sm">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                        <p className="text-red-500 text-sm">{error}</p>
                      </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-soft-silver mb-2 block">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-soft-silver/50"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-soft-silver mb-2 block">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-soft-silver/50"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="website" className="text-soft-silver mb-2 block">
                        Website
                      </Label>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleChange}
                        className="bg-white/5 border-white/10 text-white placeholder:text-soft-silver/50"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-soft-silver mb-2 block">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="bg-white/5 border-white/10 text-white placeholder:text-soft-silver/50"
                        placeholder="Tell us about your project or questions..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Calendar className="h-5 w-5 text-electric-cyan" />
                  <div>
                    <h3 className="text-white font-semibold">Schedule a Consultation</h3>
                    <p className="text-soft-silver/70 text-sm">Book a video call with our team</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-electric-cyan text-electric-cyan hover:bg-electric-cyan/10"
                  onClick={() => window.open('https://calendly.com', '_blank')}
                >
                  Book on Calendly
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-electric-cyan flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Email</h3>
                      <a
                        href="mailto:support@atlascloud.hosting"
                        className="text-soft-silver/80 hover:text-electric-cyan transition-colors"
                      >
                        support@atlascloudhosting.com
                      </a>
                      <p className="text-soft-silver/60 text-sm mt-1">Response within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-electric-cyan flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Headquarters</h3>
                      <p className="text-soft-silver/80">Prestige Holdings Enterprise Group</p>
                      <p className="text-soft-silver/60 text-sm mt-1">Global Operations</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Connect With Us</h2>
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 flex items-center justify-center gap-2 transition-all group"
                  >
                    <Linkedin className="h-5 w-5 text-electric-cyan group-hover:scale-110 transition-transform" />
                    <span className="text-soft-silver/80 group-hover:text-white text-sm">LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 flex items-center justify-center gap-2 transition-all group"
                  >
                    <Github className="h-5 w-5 text-electric-cyan group-hover:scale-110 transition-transform" />
                    <span className="text-soft-silver/80 group-hover:text-white text-sm">GitHub</span>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 flex items-center justify-center gap-2 transition-all group"
                  >
                    <Twitter className="h-5 w-5 text-electric-cyan group-hover:scale-110 transition-transform" />
                    <span className="text-soft-silver/80 group-hover:text-white text-sm">Twitter</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-electric-cyan/10 to-accent-orange/10 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-3">Enterprise Solutions</h3>
                <p className="text-soft-silver/80 mb-4">
                  Need custom infrastructure, dedicated resources, or white-label solutions? Our enterprise team can help design a solution that fits your exact requirements.
                </p>
                <Button className="bg-accent-orange hover:bg-accent-orange/90 text-white font-semibold">
                  Contact Enterprise Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
