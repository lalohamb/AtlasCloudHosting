"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';
import GridBackground from '@/components/grid-background';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen py-24 relative flex items-center justify-center">
      <GridBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-electric-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-electric-cyan" />
              </div>
              <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
              <CardDescription className="text-soft-silver/70">
                Access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-soft-silver mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-soft-silver/50"
                    placeholder="admin@atlascloud.hosting"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-soft-silver mb-2 block">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-soft-silver/50"
                    placeholder="Enter your password"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-electric-cyan hover:bg-electric-cyan/90 text-space-blue font-semibold"
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-white/5 rounded-lg">
                <p className="text-soft-silver/60 text-xs text-center mb-2">Default credentials:</p>
                <p className="text-soft-silver/80 text-sm font-mono text-center">
                  admin@atlascloud.hosting
                </p>
                <p className="text-soft-silver/80 text-sm font-mono text-center">
                  admin123
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
