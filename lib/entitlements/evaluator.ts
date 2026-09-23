import type { Entitlement, EntitlementKey } from '@/types/atlas';
import type { EntitlementMap } from './definitions';

/**
 * Pure entitlement evaluator.
 * Accepts an array of Entitlement records (from DB or test fixtures).
 * No Supabase dependency — fully unit-testable.
 */
export class EntitlementEvaluator {
  private readonly map: Map<EntitlementKey, Entitlement>;

  constructor(entitlements: Entitlement[]) {
    this.map = new Map(entitlements.map((e) => [e.entitlement_key, e]));
  }

  /** Build an evaluator from a plain EntitlementMap (e.g. from PLAN_ENTITLEMENTS) */
  static fromMap(orgId: string, subscriptionId: string, map: EntitlementMap): EntitlementEvaluator {
    const now = new Date().toISOString();
    const entitlements: Entitlement[] = Object.entries(map).map(([key, value], i) => ({
      id: `synthetic-${i}`,
      organization_id: orgId,
      subscription_id: subscriptionId,
      entitlement_key: key as EntitlementKey,
      entitlement_type:
        typeof value === 'boolean' ? 'boolean' : typeof value === 'number' ? 'numeric' : 'text',
      numeric_value: typeof value === 'number' ? value : null,
      boolean_value: typeof value === 'boolean' ? value : null,
      text_value: typeof value === 'string' ? value : null,
      created_at: now,
      updated_at: now,
    }));
    return new EntitlementEvaluator(entitlements);
  }

  hasEntitlement(key: EntitlementKey): boolean {
    const e = this.map.get(key);
    if (!e) return false;
    if (e.entitlement_type === 'boolean') return e.boolean_value === true;
    if (e.entitlement_type === 'numeric') return (e.numeric_value ?? 0) > 0;
    return Boolean(e.text_value);
  }

  getNumericLimit(key: EntitlementKey): number {
    const e = this.map.get(key);
    if (!e || e.entitlement_type !== 'numeric') return 0;
    return e.numeric_value ?? 0;
  }

  canCreateApplication(currentCount: number): boolean {
    const max = this.getNumericLimit('applications.max');
    return max === 999 || currentCount < max;
  }

  canCreateDatabase(currentCount: number): boolean {
    const max = this.getNumericLimit('databases.max');
    return max === 999 || currentCount < max;
  }

  canUseStaging(): boolean {
    return this.hasEntitlement('staging.enabled');
  }

  canUsePrivateNetworking(): boolean {
    return this.hasEntitlement('private_networking.enabled');
  }

  canUseWeb3(): boolean {
    return this.hasEntitlement('web3.enabled');
  }

  canUseManagedDevOps(): boolean {
    return this.hasEntitlement('managed_devops.enabled');
  }
}
