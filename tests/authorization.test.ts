import { describe, it, expect } from 'vitest';
import {
  requireUser,
  requireOrganizationMember,
  requireOrganizationRole,
  canAccessProject,
  canManageApplication,
  canManageBilling,
  canManageInfrastructure,
  canDeleteOrganization,
  isPlatformAdmin,
} from '@/lib/authorization';
import type { AuthContext } from '@/types/atlas';

// ============================================================
// TEST FIXTURES
// ============================================================

const ORG_A = 'org-aaaa-0000';
const ORG_B = 'org-bbbb-0000';
const USER_A = 'user-aaaa-0000';
const USER_B = 'user-bbbb-0000';

function ctx(
  userId: string,
  orgId: string,
  role: AuthContext['role'],
  status: AuthContext['memberStatus'] = 'active'
): AuthContext {
  return { userId, organizationId: orgId, role, memberStatus: status };
}

const ctxA_owner     = ctx(USER_A, ORG_A, 'owner');
const ctxA_admin     = ctx(USER_A, ORG_A, 'admin');
const ctxA_developer = ctx(USER_A, ORG_A, 'developer');
const ctxA_billing   = ctx(USER_A, ORG_A, 'billing');
const ctxA_viewer    = ctx(USER_A, ORG_A, 'viewer');
const ctxB_owner     = ctx(USER_B, ORG_B, 'owner');
const ctxA_invited   = ctx(USER_A, ORG_A, 'owner', 'invited');
const ctxA_suspended = ctx(USER_A, ORG_A, 'owner', 'suspended');

// ============================================================
// UNAUTHENTICATED ACCESS
// ============================================================

describe('Unauthenticated access', () => {
  it('denies null context for requireUser', () => {
    expect(requireUser(null).allowed).toBe(false);
  });

  it('denies null context for requireOrganizationMember', () => {
    expect(requireOrganizationMember(null, ORG_A).allowed).toBe(false);
  });

  it('denies null context for canAccessProject', () => {
    expect(canAccessProject(null, ORG_A).allowed).toBe(false);
  });

  it('denies null context for canManageApplication', () => {
    expect(canManageApplication(null, ORG_A).allowed).toBe(false);
  });
});

// ============================================================
// CROSS-TENANT ISOLATION
// ============================================================

describe('Cross-tenant isolation', () => {
  it('User A cannot access Organization B', () => {
    expect(requireOrganizationMember(ctxA_owner, ORG_B).allowed).toBe(false);
  });

  it('User A cannot access Project in Organization B', () => {
    expect(canAccessProject(ctxA_owner, ORG_B).allowed).toBe(false);
  });

  it('User A cannot manage Application in Organization B', () => {
    expect(canManageApplication(ctxA_owner, ORG_B).allowed).toBe(false);
  });

  it('User A cannot manage Billing in Organization B', () => {
    expect(canManageBilling(ctxA_owner, ORG_B).allowed).toBe(false);
  });

  it('User A cannot manage Infrastructure in Organization B', () => {
    expect(canManageInfrastructure(ctxA_owner, ORG_B).allowed).toBe(false);
  });

  it('User A cannot delete Organization B', () => {
    expect(canDeleteOrganization(ctxA_owner, ORG_B).allowed).toBe(false);
  });

  it('User B cannot access Organization A', () => {
    expect(requireOrganizationMember(ctxB_owner, ORG_A).allowed).toBe(false);
  });
});

// ============================================================
// MEMBERSHIP STATUS
// ============================================================

describe('Membership status', () => {
  it('invited member cannot access resources', () => {
    expect(requireUser(ctxA_invited).allowed).toBe(false);
  });

  it('suspended member cannot access resources', () => {
    expect(requireUser(ctxA_suspended).allowed).toBe(false);
  });
});

// ============================================================
// ROLE ISOLATION
// ============================================================

describe('Role isolation', () => {
  it('viewer can access projects (read)', () => {
    expect(canAccessProject(ctxA_viewer, ORG_A).allowed).toBe(true);
  });

  it('viewer cannot manage applications', () => {
    expect(canManageApplication(ctxA_viewer, ORG_A).allowed).toBe(false);
  });

  it('viewer cannot manage billing', () => {
    expect(canManageBilling(ctxA_viewer, ORG_A).allowed).toBe(false);
  });

  it('viewer cannot manage infrastructure', () => {
    expect(canManageInfrastructure(ctxA_viewer, ORG_A).allowed).toBe(false);
  });

  it('viewer cannot delete organization', () => {
    expect(canDeleteOrganization(ctxA_viewer, ORG_A).allowed).toBe(false);
  });

  it('developer can manage applications', () => {
    expect(canManageApplication(ctxA_developer, ORG_A).allowed).toBe(true);
  });

  it('developer cannot manage billing', () => {
    expect(canManageBilling(ctxA_developer, ORG_A).allowed).toBe(false);
  });

  it('developer cannot manage infrastructure', () => {
    expect(canManageInfrastructure(ctxA_developer, ORG_A).allowed).toBe(false);
  });

  it('billing role can manage billing', () => {
    expect(canManageBilling(ctxA_billing, ORG_A).allowed).toBe(true);
  });

  it('billing role cannot manage infrastructure', () => {
    expect(canManageInfrastructure(ctxA_billing, ORG_A).allowed).toBe(false);
  });

  it('billing role cannot manage applications', () => {
    expect(canManageApplication(ctxA_billing, ORG_A).allowed).toBe(false);
  });

  it('admin can manage infrastructure', () => {
    expect(canManageInfrastructure(ctxA_admin, ORG_A).allowed).toBe(true);
  });

  it('admin cannot delete organization (owner only)', () => {
    expect(canDeleteOrganization(ctxA_admin, ORG_A).allowed).toBe(false);
  });

  it('owner can delete organization', () => {
    expect(canDeleteOrganization(ctxA_owner, ORG_A).allowed).toBe(true);
  });
});

// ============================================================
// PLATFORM ADMIN SEPARATION
// ============================================================

describe('Platform admin separation', () => {
  it('organization owner is NOT a platform admin', () => {
    expect(isPlatformAdmin(ctxA_owner)).toBe(false);
  });

  it('organization admin is NOT a platform admin', () => {
    expect(isPlatformAdmin(ctxA_admin)).toBe(false);
  });

  it('null context is NOT a platform admin', () => {
    expect(isPlatformAdmin(null)).toBe(false);
  });
});

// ============================================================
// ENTITLEMENT EVALUATION
// ============================================================

import { EntitlementEvaluator } from '@/lib/entitlements/evaluator';
import { PLAN_ENTITLEMENTS, validatePlanEntitlementCoverage } from '@/lib/entitlements/definitions';

describe('Entitlement evaluation', () => {
  it('all plans in config/plans.ts have entitlement mappings', () => {
    expect(validatePlanEntitlementCoverage()).toEqual([]);
  });

  it('developer plan: max 1 application', () => {
    const ev = EntitlementEvaluator.fromMap('org', 'sub', PLAN_ENTITLEMENTS.developer);
    expect(ev.canCreateApplication(0)).toBe(true);
    expect(ev.canCreateApplication(1)).toBe(false);
  });

  it('developer plan: staging disabled', () => {
    const ev = EntitlementEvaluator.fromMap('org', 'sub', PLAN_ENTITLEMENTS.developer);
    expect(ev.canUseStaging()).toBe(false);
  });

  it('professional plan: staging enabled', () => {
    const ev = EntitlementEvaluator.fromMap('org', 'sub', PLAN_ENTITLEMENTS.professional);
    expect(ev.canUseStaging()).toBe(true);
  });

  it('developer plan: web3 disabled', () => {
    const ev = EntitlementEvaluator.fromMap('org', 'sub', PLAN_ENTITLEMENTS.developer);
    expect(ev.canUseWeb3()).toBe(false);
  });

  it('dedicated plan: web3 enabled', () => {
    const ev = EntitlementEvaluator.fromMap('org', 'sub', PLAN_ENTITLEMENTS.dedicated);
    expect(ev.canUseWeb3()).toBe(true);
  });

  it('business plan: private networking enabled', () => {
    const ev = EntitlementEvaluator.fromMap('org', 'sub', PLAN_ENTITLEMENTS.business);
    expect(ev.canUsePrivateNetworking()).toBe(true);
  });

  it('developer plan: private networking disabled', () => {
    const ev = EntitlementEvaluator.fromMap('org', 'sub', PLAN_ENTITLEMENTS.developer);
    expect(ev.canUsePrivateNetworking()).toBe(false);
  });
});
