import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface UnconfiguredStateProps {
  title: string;
  description?: string;
}

export default function UnconfiguredState({ title, description }: UnconfiguredStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="h-7 w-7 text-soft-silver/40" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
      <p className="text-soft-silver/60 max-w-md mb-2">
        {description ?? 'Atlas account services are not configured in this environment.'}
      </p>
      <p className="text-soft-silver/40 text-sm max-w-md mb-8">
        This dashboard requires a configured Atlas account. Customer authentication and account services will be available in a future release.
      </p>
      <Link href="/">
        <Button variant="outline" className="border-white/20 text-soft-silver hover:text-white">
          Return to Atlas Cloud
        </Button>
      </Link>
    </div>
  );
}
