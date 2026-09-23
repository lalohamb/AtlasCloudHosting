// ============================================================
// ATLAS CLOUD — DOMAIN TYPES
// ============================================================

// ------------------------------------------------------------
// ROLES
// ------------------------------------------------------------

/** Internal Atlas platform roles — separate from customer org roles */
export type PlatformRole = 'platform_admin' | 'operations' | 'support';

/** Customer organization roles */
export type OrganizationRole = 'owner' | 'admin' | 'developer' | 'billing' | 'viewer';

// ------------------------------------------------------------
// ORGANIZATION
// ------------------------------------------------------------

export type OrganizationStatus = 'active' | 'suspended' | 'closed';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  status: OrganizationStatus;
  created_by: string;
  created_at: string;
  updated_at: string;
}

// ------------------------------------------------------------
// ORGANIZATION MEMBERS
// ------------------------------------------------------------

export type MemberStatus = 'active' | 'invited' | 'suspended';

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: OrganizationRole;
  status: MemberStatus;
  created_at: string;
  updated_at: string;
}

// ------------------------------------------------------------
// PROJECTS
// ------------------------------------------------------------

export type ProjectStatus = 'active' | 'archived' | 'suspended';

export interface Project {
  id: string;
  organization_id: string;
  name: string;
  slug: string;
  description: string | null;
  status: ProjectStatus;
  created_by: string;
  created_at: string;
  updated_at: string;
}

// ------------------------------------------------------------
// APPLICATIONS
// ------------------------------------------------------------

export type ApplicationType = 'nextjs' | 'node' | 'docker' | 'api' | 'worker' | 'custom';
export type ApplicationStatus = 'active' | 'inactive' | 'suspended' | 'deleted';

export interface Application {
  id: string;
  organization_id: string;
  project_id: string;
  name: string;
  slug: string;
  application_type: ApplicationType;
  status: ApplicationStatus;
  repository_url: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

// ------------------------------------------------------------
// ENVIRONMENTS
// ------------------------------------------------------------

export type EnvironmentType = 'production' | 'staging' | 'development';
export type EnvironmentStatus = 'active' | 'inactive' | 'suspended';

export interface Environment {
  id: string;
  organization_id: string;
  project_id: string;
  application_id: string;
  name: string;
  environment_type: EnvironmentType;
  status: EnvironmentStatus;
  created_at: string;
  updated_at: string;
}

// ------------------------------------------------------------
// PRODUCT INSTANCES
// ------------------------------------------------------------

export type ProductInstanceStatus =
  | 'pending'
  | 'provisioning'
  | 'configuration_required'
  | 'ready'
  | 'running'
  | 'suspended'
  | 'failed';

export type ConfigurationStatus = 'pending' | 'in_progress' | 'complete' | 'failed';

export interface ProductInstance {
  id: string;
  organization_id: string;
  /** References config/products.ts product slug — not a DB foreign key */
  product_id: string;
  project_id: string | null;
  status: ProductInstanceStatus;
  configuration_status: ConfigurationStatus;
  created_at: string;
  updated_at: string;
}

// ------------------------------------------------------------
// SUBSCRIPTIONS
// ------------------------------------------------------------

export type SubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'canceled'
  | 'unpaid'
  | 'incomplete';

export type BillingProvider = 'stripe' | 'manual';

export interface Subscription {
  id: string;
  organization_id: string;
  /** References config/plans.ts plan id */
  plan_id: string;
  product_instance_id: string | null;
  billing_provider: BillingProvider | null;
  external_customer_id: string | null;
  external_subscription_id: string | null;
  status: SubscriptionStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

// ------------------------------------------------------------
// ENTITLEMENTS
// ------------------------------------------------------------

export type EntitlementType = 'numeric' | 'boolean' | 'text';

export type EntitlementKey =
  | 'applications.max'
  | 'databases.max'
  | 'environments.max'
  | 'storage.gb'
  | 'memory.mb'
  | 'cpu.units'
  | 'bandwidth.gb'
  | 'backups.enabled'
  | 'staging.enabled'
  | 'private_networking.enabled'
  | 'web3.enabled'
  | 'managed_devops.enabled';

export interface Entitlement {
  id: string;
  organization_id: string;
  subscription_id: string;
  entitlement_key: EntitlementKey;
  entitlement_type: EntitlementType;
  numeric_value: number | null;
  boolean_value: boolean | null;
  text_value: string | null;
  created_at: string;
  updated_at: string;
}

// ------------------------------------------------------------
// INFRASTRUCTURE RESOURCES
// ------------------------------------------------------------

export type InfrastructureProvider = 'digitalocean' | 'custom';

export type InfrastructureResourceType =
  | 'compute'
  | 'volume'
  | 'database'
  | 'network'
  | 'firewall'
  | 'load_balancer'
  | 'object_storage'
  | 'kubernetes';

export type InfrastructureResourceStatus =
  | 'pending'
  | 'provisioning'
  | 'active'
  | 'error'
  | 'deprovisioning'
  | 'deleted';

export interface InfrastructureResource {
  id: string;
  organization_id: string;
  project_id: string | null;
  environment_id: string | null;
  provider: InfrastructureProvider;
  /** Provider-neutral external ID — never provider-specific field names */
  provider_resource_id: string | null;
  resource_type: InfrastructureResourceType;
  region: string | null;
  status: InfrastructureResourceStatus;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// ------------------------------------------------------------
// PROVISIONING JOBS
// ------------------------------------------------------------

export type ProvisioningOperation =
  | 'create_environment'
  | 'delete_environment'
  | 'create_application'
  | 'delete_application'
  | 'create_database'
  | 'delete_database'
  | 'activate_product'
  | 'deprovision_product';

export type ProvisioningStatus =
  | 'pending'
  | 'queued'
  | 'provisioning'
  | 'configuring'
  | 'deploying'
  | 'verifying'
  | 'ready'
  | 'failed'
  | 'suspended'
  | 'deprovisioning'
  | 'deleted';

export interface ProvisioningJob {
  id: string;
  organization_id: string;
  project_id: string | null;
  environment_id: string | null;
  product_instance_id: string | null;
  operation: ProvisioningOperation;
  status: ProvisioningStatus;
  attempts: number;
  /** Unique key per logical operation — prevents duplicate provisioning */
  idempotency_key: string;
  error_code: string | null;
  error_message: string | null;
  requested_by: string;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

// ------------------------------------------------------------
// DEPLOYMENTS
// ------------------------------------------------------------

export type DeploymentStatus =
  | 'queued'
  | 'building'
  | 'deploying'
  | 'ready'
  | 'failed'
  | 'cancelled';

export type DeploymentSourceType = 'git' | 'image' | 'manual';

export interface Deployment {
  id: string;
  organization_id: string;
  application_id: string;
  environment_id: string;
  status: DeploymentStatus;
  source_type: DeploymentSourceType;
  source_reference: string | null;
  commit_sha: string | null;
  created_by: string;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

// ------------------------------------------------------------
// DOMAINS
// ------------------------------------------------------------

export type DomainStatus = 'pending' | 'active' | 'failed' | 'removed';
export type SslStatus = 'pending' | 'active' | 'failed' | 'expired';

export interface Domain {
  id: string;
  organization_id: string;
  project_id: string | null;
  application_id: string | null;
  environment_id: string | null;
  hostname: string;
  status: DomainStatus;
  ssl_status: SslStatus;
  created_at: string;
  updated_at: string;
}

// ------------------------------------------------------------
// DATABASE RESOURCES
// ------------------------------------------------------------

export type DatabaseEngine = 'postgresql' | 'mysql' | 'redis';
export type DatabaseResourceStatus = 'pending' | 'active' | 'error' | 'deleted';

export interface DatabaseResource {
  id: string;
  organization_id: string;
  project_id: string | null;
  environment_id: string | null;
  infrastructure_resource_id: string | null;
  engine: DatabaseEngine;
  version: string | null;
  status: DatabaseResourceStatus;
  created_at: string;
  updated_at: string;
}

// ------------------------------------------------------------
// AUDIT LOGS
// ------------------------------------------------------------

export type AuditActorType = 'user' | 'system' | 'platform_admin';

export type AuditAction =
  | 'organization.created'
  | 'organization.member_added'
  | 'organization.role_changed'
  | 'organization.suspended'
  | 'project.created'
  | 'project.archived'
  | 'application.created'
  | 'application.deleted'
  | 'product.activated'
  | 'subscription.changed'
  | 'provisioning.requested'
  | 'provisioning.failed'
  | 'infrastructure.created'
  | 'infrastructure.deleted'
  | 'admin.login'
  | 'admin.logout';

export interface AuditLog {
  id: string;
  organization_id: string | null;
  actor_user_id: string | null;
  actor_type: AuditActorType;
  action: AuditAction;
  target_type: string | null;
  target_id: string | null;
  /** Must never contain secrets, passwords, or tokens */
  metadata: Record<string, unknown>;
  ip_address: string | null;
  created_at: string;
}

// ------------------------------------------------------------
// SECURITY EVENTS
// ------------------------------------------------------------

export type SecurityEventType =
  | 'login_failed'
  | 'login_rate_limited'
  | 'unauthorized_access_attempt'
  | 'privilege_change'
  | 'credential_change'
  | 'admin_action';

export interface SecurityEvent {
  id: string;
  organization_id: string | null;
  user_id: string | null;
  event_type: SecurityEventType;
  ip_address: string | null;
  /** Must never contain secrets, passwords, or tokens */
  metadata: Record<string, unknown>;
  created_at: string;
}

// ------------------------------------------------------------
// AUTHORIZATION CONTEXT
// ------------------------------------------------------------

export interface AuthContext {
  userId: string;
  organizationId: string;
  role: OrganizationRole;
  memberStatus: MemberStatus;
}
