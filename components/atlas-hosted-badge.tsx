import { Cloud } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function AtlasHostedBadge() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center gap-1.5 bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan text-xs font-semibold px-3 py-1.5 rounded-full cursor-default select-none">
            <Cloud className="h-3.5 w-3.5" />
            Hosted on Atlas Cloud
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-center">
          Managed infrastructure, SSL, monitoring, backups, and deployment included.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
