import type { ProvisioningStatus } from '@/types/atlas';

const STATUS_CONFIG: Record<
  ProvisioningStatus,
  { label: string; color: string; dot: string; description: string }
> = {
  pending:        { label: 'Pending',        color: 'text-soft-silver/60',  dot: 'bg-soft-silver/40',  description: 'Waiting to start.' },
  queued:         { label: 'Queued',         color: 'text-soft-silver/80',  dot: 'bg-soft-silver/60',  description: 'In the provisioning queue.' },
  provisioning:   { label: 'Provisioning',   color: 'text-electric-cyan',   dot: 'bg-electric-cyan animate-pulse', description: 'Infrastructure is being created.' },
  configuring:    { label: 'Configuring',    color: 'text-electric-cyan',   dot: 'bg-electric-cyan animate-pulse', description: 'Applying configuration.' },
  deploying:      { label: 'Deploying',      color: 'text-electric-cyan',   dot: 'bg-electric-cyan animate-pulse', description: 'Deploying your application.' },
  verifying:      { label: 'Verifying',      color: 'text-yellow-400',      dot: 'bg-yellow-400 animate-pulse',    description: 'Running health checks.' },
  ready:          { label: 'Ready',          color: 'text-green-400',       dot: 'bg-green-400',       description: 'Your environment is live.' },
  failed:         { label: 'Failed',         color: 'text-red-400',         dot: 'bg-red-400',         description: 'Provisioning failed. Contact support.' },
  suspended:      { label: 'Suspended',      color: 'text-accent-orange',   dot: 'bg-accent-orange',   description: 'Environment is suspended.' },
  deprovisioning: { label: 'Deprovisioning', color: 'text-soft-silver/60',  dot: 'bg-soft-silver/40 animate-pulse', description: 'Resources are being removed.' },
  deleted:        { label: 'Deleted',        color: 'text-soft-silver/40',  dot: 'bg-soft-silver/20',  description: 'Environment has been deleted.' },
};

interface ProvisioningStatusBadgeProps {
  status: ProvisioningStatus;
  showDescription?: boolean;
}

export default function ProvisioningStatusBadge({
  status,
  showDescription = false,
}: ProvisioningStatusBadgeProps) {
  const cfg = STATUS_CONFIG[status];

  return (
    <div className="inline-flex flex-col gap-1">
      <div className="inline-flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
        <span className={`text-sm font-medium ${cfg.color}`}>{cfg.label}</span>
      </div>
      {showDescription && (
        <p className="text-xs text-soft-silver/50 ml-4">{cfg.description}</p>
      )}
    </div>
  );
}
