# Atlas Cloud — SaaS Architecture

## Architecture Diagram

```
Customer
  │
  ▼
Atlas Identity (Supabase Auth — Phase 2B)
  │
  ▼
Organization  ◄──── Tenant Boundary
  │
  ├── Organization Members (roles: owner / admin / developer / billing / viewer)
  │
  ├── Subscription ──► Entitlements (Atlas-controlled capabilities)
  │                         │
  │                         └── Plan Mapping (config/plans.ts → PLAN_ENTITLEMENTS)
  │
  ├── Projects
  │     └── Applications
  │           └── Environments
  │                 ├── Infrastructure Resources (provider-neutral)
  │                 ├── Deployments
  │                 ├── Domains
  │                 └── Database Resources
  │
  └── Product Instances (e.g. POD Storefront)
        └── Project → Environment → Infrastructure → Deployment
```

---

## Components

### Control Plane
The Atlas Next.js application (`atlascloudhosting.com`) serves as the control plane for both the marketing website and the customer dashboard (`/dashboard`).

Future: customer dashboard will migrate to `app.atlascloudhosting.com`.

### Identity
**Planned — Phase 2B**
Supabase Auth will provide customer authentication. Platform admin authentication uses a separate cookie-based session system (implemented in Phase 2A.1).

### Database
**Planned — Phase 2B**
Supabase/PostgreSQL. Migrations are prepared locally in `supabase/migrations/`. RLS policies are written and ready to deploy.

### Tenant Boundary
The primary tenant boundary is **Organization**. Every customer resource (projects, applications, environments, infrastructure, subscriptions, entitlements) belongs to an organization.

A user may belong to multiple organizations with different roles in each.

**Critical:** Organization owners are NOT Atlas platform administrators. These are separate authorization domains.

### Billing
**Future — Phase 2C**
Stripe will be the billing provider. The intended flow:

```
Stripe Payment Event
  → Stripe Webhook (server-side only)
  → Atlas Subscription record
  → Atlas Entitlement seeding (from PLAN_ENTITLEMENTS map)
  → Provisioning Job (if applicable)
```

Stripe determines payment state. Atlas determines capabilities. These must remain decoupled.

Webhook idempotency is enforced via `provisioning_jobs.idempotency_key` (unique constraint).

### Entitlements
Atlas-controlled. Defined in `lib/entitlements/definitions.ts`. Evaluated by `EntitlementEvaluator` (pure TypeScript, no database dependency).

Plan → Entitlement mapping lives in `PLAN_ENTITLEMENTS`. Source of truth for plan capabilities is `config/plans.ts`.

### Infrastructure
Provider-neutral Atlas domain model. Interface defined in `lib/infrastructure/provider.ts`.

**First Infrastructure Provider: DigitalOcean — Phase 3**

Infrastructure resources use `provider` + `provider_resource_id` fields. Never use provider-specific column names (e.g. never `digitalocean_droplet_id`).

### Deployment
Provider-neutral deployment interface defined in `lib/provisioning/provider.ts`.

**Expected First Deployment Provider: Coolify — Phase 4**

### Products
Atlas Products are defined in `config/products.ts` (catalog). Customer activations are represented as `product_instances` in the database. The catalog and instances are intentionally separate.

### Provisioning
Asynchronous job model via `provisioning_jobs` table. States: `pending → queued → provisioning → configuring → deploying → verifying → ready`. Failure states: `failed`, `suspended`. Cleanup: `deprovisioning → deleted`.

Idempotency enforced by unique `idempotency_key` constraint — prevents duplicate infrastructure from webhook retries or queue redeliveries.

### Rate Limiting
Current implementation (Phase 2A.1) is **process-memory based** (`Map` in `lib/auth.ts`). Suitable for single-process development. Must be replaced with distributed rate limiting (e.g. Redis/Upstash) before horizontally scaled production deployment.

### Service Role Boundary
The `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS. It must only be used for:
- Stripe webhook processing (Phase 2C)
- Provisioning workers (Phase 3)
- Infrastructure synchronization
- Controlled administrative operations
- Contact form inserts (see contact route review)

Normal customer data operations must use authenticated Supabase clients so RLS is enforced.

---

## Authorization Architecture

Pure TypeScript authorization layer in `lib/authorization/index.ts`. No database dependency — fully unit-testable.

Functions: `requireUser`, `requireOrganizationMember`, `requireOrganizationRole`, `canAccessProject`, `canManageApplication`, `canManageBilling`, `canManageInfrastructure`, `canDeleteOrganization`.

Database RLS provides a second enforcement layer when Supabase is active.

---

## Contact Route — Service Role Decision

`/api/contact` uses the service role key. This is acceptable because:
1. The route performs a single, explicit `INSERT` into `contact_submissions` only
2. No tenant data is read or returned
3. The anon key alternative would require a public insert policy on `contact_submissions`, which is equivalent in privilege for this specific operation
4. Input is strictly validated and bounded before insertion

Future improvement: migrate to an authenticated insert policy with the anon key once Supabase Auth is active, removing the service role dependency from this public route.
