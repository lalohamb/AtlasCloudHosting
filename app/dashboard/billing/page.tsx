import type { Metadata } from 'next';
import UnconfiguredState from '@/components/dashboard/unconfigured-state';

export const metadata: Metadata = {
  title: 'Billing — Atlas Cloud Dashboard',
};

export default function Page() {
  return (
    <UnconfiguredState
      title="Billing"
      description="Your subscription and billing information will appear here once your Atlas account is configured."
    />
  );
}
