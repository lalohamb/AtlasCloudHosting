import type { Metadata } from 'next';
import UnconfiguredState from '@/components/dashboard/unconfigured-state';

export const metadata: Metadata = {
  title: 'Projects — Atlas Cloud Dashboard',
};

export default function Page() {
  return (
    <UnconfiguredState
      title="Projects"
      description="Your projects will appear here once your Atlas account is configured."
    />
  );
}
