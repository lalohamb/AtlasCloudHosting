"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LogOut, Mail, ExternalLink, Calendar, User } from 'lucide-react';
import GridBackground from '@/components/grid-background';

interface Submission {
  id: string;
  name: string;
  email: string;
  website: string | null;
  message: string;
  created_at: string;
  ip_address: string | null;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/submissions');

      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch submissions');
      }

      setSubmissions(data.submissions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="py-24 relative min-h-screen">
      <GridBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Admin <span className="text-electric-cyan">Dashboard</span>
              </h1>
              <p className="text-soft-silver/80">Manage contact form submissions</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-white/10 text-soft-silver hover:bg-white/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-soft-silver/70 font-normal">
                  Total Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{submissions.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-soft-silver/70 font-normal">
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {submissions.filter(s => {
                    const submissionDate = new Date(s.created_at);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return submissionDate > weekAgo;
                  }).length}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-soft-silver/70 font-normal">
                  Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {submissions.filter(s => {
                    const submissionDate = new Date(s.created_at);
                    const today = new Date();
                    return submissionDate.toDateString() === today.toDateString();
                  }).length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Contact Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-electric-cyan"></div>
                  <p className="text-soft-silver/70 mt-4">Loading submissions...</p>
                </div>
              ) : submissions.length === 0 ? (
                <div className="text-center py-12">
                  <Mail className="h-12 w-12 text-soft-silver/30 mx-auto mb-4" />
                  <p className="text-soft-silver/70">No submissions yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="text-soft-silver/70">Date</TableHead>
                        <TableHead className="text-soft-silver/70">Name</TableHead>
                        <TableHead className="text-soft-silver/70">Email</TableHead>
                        <TableHead className="text-soft-silver/70">Message</TableHead>
                        <TableHead className="text-soft-silver/70">Website</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissions.map((submission) => (
                        <TableRow key={submission.id} className="border-white/10 hover:bg-white/5">
                          <TableCell className="text-soft-silver/90">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-electric-cyan" />
                              <span className="text-sm">{formatDate(submission.created_at)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-soft-silver/90">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-electric-cyan" />
                              <span className="font-medium">{submission.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <a
                              href={`mailto:${submission.email}`}
                              className="text-electric-cyan hover:text-electric-cyan/80 flex items-center gap-1"
                            >
                              <Mail className="h-4 w-4" />
                              <span className="text-sm">{submission.email}</span>
                            </a>
                          </TableCell>
                          <TableCell className="max-w-md">
                            <p className="text-soft-silver/90 text-sm line-clamp-2">
                              {submission.message}
                            </p>
                          </TableCell>
                          <TableCell>
                            {submission.website ? (
                              <a
                                href={submission.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-electric-cyan hover:text-electric-cyan/80 flex items-center gap-1"
                              >
                                <ExternalLink className="h-4 w-4" />
                                <span className="text-sm">Visit</span>
                              </a>
                            ) : (
                              <span className="text-soft-silver/50 text-sm">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
