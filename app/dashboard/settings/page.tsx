import type { Metadata } from 'next';
import UnconfiguredState from '@/components/dashboard/unconfigured-state';

export const metadata: Metadata = {
  title: 'Settings — Atlas Cloud Dashboard',
};

export default function Page() {
  return (
    <UnconfiguredState
      title="Settings"
      description="Your account settings will appear here once your Atlas account is configured."
    />
  );
}
