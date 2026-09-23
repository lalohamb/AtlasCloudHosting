import type { Metadata } from 'next';
import UnconfiguredState from '@/components/dashboard/unconfigured-state';

export const metadata: Metadata = {
  title: 'Dashboard Overview — Atlas Cloud Dashboard',
};

export default function Page() {
  return (
    <UnconfiguredState
      title="Dashboard Overview"
      description="Your Atlas Cloud overview will appear here once your account is configured."
    />
  );
}
