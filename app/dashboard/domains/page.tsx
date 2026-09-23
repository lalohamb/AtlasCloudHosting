import type { Metadata } from 'next';
import UnconfiguredState from '@/components/dashboard/unconfigured-state';

export const metadata: Metadata = {
  title: 'Domains — Atlas Cloud Dashboard',
};

export default function Page() {
  return (
    <UnconfiguredState
      title="Domains"
      description="Your configured domains will appear here once your Atlas account is configured."
    />
  );
}
