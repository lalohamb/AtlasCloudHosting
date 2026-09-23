import type { Metadata } from 'next';
import UnconfiguredState from '@/components/dashboard/unconfigured-state';

export const metadata: Metadata = {
  title: 'Databases — Atlas Cloud Dashboard',
};

export default function Page() {
  return (
    <UnconfiguredState
      title="Databases"
      description="Your managed databases will appear here once your Atlas account is configured."
    />
  );
}
