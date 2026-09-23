import type { EntitlementKey } from '@/types/atlas';
import { plans } from '@/config/plans';

export type EntitlementMap = Partial<Record<EntitlementKey, number | boolean | string>>;

/**
 * Default entitlements per Atlas plan ID.
 * Derived from config/plans.ts — do not duplicate pricing data here.
 *
 * Stripe → Atlas flow (future Phase 2C):
 *   Stripe Price ID
 *   → Atlas Plan ID (mapped in billing config)
 *   → Atlas Subscription record
 *   → Atlas Entitlements (seeded from this map)
 *
 * Entitlements are Atlas-owned domain objects.
 * Stripe only reports payment/subscription state.
 * Atlas determines capabilities.
 */
export const PLAN_ENTITLEMENTS: Record<string, EntitlementMap> = {
  developer: {
    'applications.max': 1,
    'databases.max': 1,
    'environments.max': 1,
    'storage.gb': 10,
    'memory.mb': 1024,
    'cpu.units': 0, // shared
    'bandwidth.gb': 50,
    'backups.enabled': true,
    'staging.enabled': false,
    'private_networking.enabled': false,
    'web3.enabled': false,
    'managed_devops.enabled': false,
  },
  professional: {
    'applications.max': 3,
    'databases.max': 2,
    'environments.max': 2,
    'storage.gb': 50,
    'memory.mb': 2048,
    'cpu.units': 1,
    'bandwidth.gb': 250,
    'backups.enabled': true,
    'staging.enabled': true,
    'private_networking.enabled': false,
    'web3.enabled': false,
    'managed_devops.enabled': false,
  },
  business: {
    'applications.max': 8,
    'databases.max': 5,
    'environments.max': 3,
    'storage.gb': 100,
    'memory.mb': 4096,
    'cpu.units': 2,
    'bandwidth.gb': 1000,
    'backups.enabled': true,
    'staging.enabled': true,
    'private_networking.enabled': true,
    'web3.enabled': false,
    'managed_devops.enabled': false,
  },
  dedicated: {
    'applications.max': 999,
    'databases.max': 999,
    'environments.max': 999,
    'storage.gb': 250,
    'memory.mb': 8192,
    'cpu.units': 4,
    'bandwidth.gb': 999,
    'backups.enabled': true,
    'staging.enabled': true,
    'private_networking.enabled': true,
    'web3.enabled': true,
    'managed_devops.enabled': false,
  },
};

/** Validate that all plan IDs in config/plans.ts have entitlement mappings */
export function validatePlanEntitlementCoverage(): string[] {
  return plans
    .map((p) => p.id)
    .filter((id) => !PLAN_ENTITLEMENTS[id]);
}
