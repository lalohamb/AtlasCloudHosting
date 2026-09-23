import type { AuthContext, OrganizationRole } from '@/types/atlas';

// ------------------------------------------------------------
// ROLE HIERARCHY
// ------------------------------------------------------------

const ROLE_WEIGHT: Record<OrganizationRole, number> = {
  owner: 50,
  admin: 40,
  developer: 20,
  billing: 20,
  viewer: 10,
};

export function roleAtLeast(role: OrganizationRole, minimum: OrganizationRole): boolean {
  return ROLE_WEIGHT[role] >= ROLE_WEIGHT[minimum];
}

// ------------------------------------------------------------
// AUTHORIZATION RESULTS
// ------------------------------------------------------------

export type AuthResult =
  | { allowed: true }
  | { allowed: false; reason: string };

export const ALLOW: AuthResult = { allowed: true };
export function deny(reason: string): AuthResult {
  return { allowed: false, reason };
}

// ------------------------------------------------------------
// CONTEXT GUARDS
// ------------------------------------------------------------

export function requireUser(ctx: AuthContext | null): AuthResult {
  if (!ctx) return deny('Unauthenticated');
  if (ctx.memberStatus !== 'active') return deny('Membership is not active');
  return ALLOW;
}

export function requireOrganizationMember(
  ctx: AuthContext | null,
  organizationId: string
): AuthResult {
  const userCheck = requireUser(ctx);
  if (!userCheck.allowed) return userCheck;
  if (ctx!.organizationId !== organizationId) return deny('User does not belong to this organization');
  return ALLOW;
}

export function requireOrganizationRole(
  ctx: AuthContext | null,
  organizationId: string,
  minimumRole: OrganizationRole
): AuthResult {
  const memberCheck = requireOrganizationMember(ctx, organizationId);
  if (!memberCheck.allowed) return memberCheck;
  if (!roleAtLeast(ctx!.role, minimumRole)) {
    return deny(`Role '${ctx!.role}' does not meet minimum required role '${minimumRole}'`);
  }
  return ALLOW;
}

// ------------------------------------------------------------
// RESOURCE AUTHORIZATION
// ------------------------------------------------------------

export function canAccessProject(
  ctx: AuthContext | null,
  projectOrganizationId: string
): AuthResult {
  return requireOrganizationMember(ctx, projectOrganizationId);
}

export function canManageApplication(
  ctx: AuthContext | null,
  organizationId: string
): AuthResult {
  const memberCheck = requireOrganizationMember(ctx, organizationId);
  if (!memberCheck.allowed) return memberCheck;
  const role = ctx!.role;
  if (role === 'developer' || role === 'admin' || role === 'owner') return ALLOW;
  return deny(`Role '${role}' cannot manage applications`);
}

export function canManageBilling(
  ctx: AuthContext | null,
  organizationId: string
): AuthResult {
  const memberCheck = requireOrganizationMember(ctx, organizationId);
  if (!memberCheck.allowed) return memberCheck;
  const role = ctx!.role;
  if (role === 'billing' || role === 'admin' || role === 'owner') return ALLOW;
  return deny(`Role '${role}' cannot manage billing`);
}

export function canManageInfrastructure(
  ctx: AuthContext | null,
  organizationId: string
): AuthResult {
  return requireOrganizationRole(ctx, organizationId, 'admin');
}

export function canManageMembers(
  ctx: AuthContext | null,
  organizationId: string
): AuthResult {
  return requireOrganizationRole(ctx, organizationId, 'admin');
}

export function canDeleteOrganization(
  ctx: AuthContext | null,
  organizationId: string
): AuthResult {
  return requireOrganizationRole(ctx, organizationId, 'owner');
}

/**
 * CRITICAL: Organization owners are NOT Atlas platform admins.
 * Platform admin is a separate authorization domain.
 * This function always returns false for organization-level contexts.
 */
export function isPlatformAdmin(_ctx: AuthContext | null): false {
  return false;
}
