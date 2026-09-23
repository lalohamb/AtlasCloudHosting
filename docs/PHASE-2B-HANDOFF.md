# Atlas Cloud — Phase 2B Handoff

## What Phase 2B Must Activate

Phase 2A.2 has prepared the complete foundation. Phase 2B connects it to a live Supabase project and implements customer authentication.

---

## Migrations Ready

All migrations are in `supabase/migrations/` and ready to apply:

| File | Contents |
|---|---|
| `20251107190112` | contact_submissions table |
| `20251107190222` | admin_users table |
| `20251108000000` | Admin security fix (bcrypt hash, must_change_password) |
| `20251109000001` | organizations, organization_members + RLS |
| `20251109000002` | projects, applications, environments + RLS |
| `20251109000003` | product_instances, subscriptions, entitlements + RLS |
| `20251109000004` | infrastructure_resources, provisioning_jobs, deployments, domains, database_resources + RLS |
| `20251109000005` | audit_logs, security_events + RLS |

---

## Required Environment Variables

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANON_KEY=
ADMIN_SESSION_SECRET=
NEXT_PUBLIC_SITE_URL=
```

---

## Auth Architecture

- Customer auth: Supabase Auth (Email/Password, extensible to OAuth)
- Admin auth: Custom HMAC-signed cookie session (`lib/auth.ts`)
- These are separate systems — do not merge them

Customer sessions must use `getUserClient(accessToken)` from `lib/db/supabase.ts` so RLS is enforced. The service role client must not be used for customer data reads.

---

## Tenant Architecture

- Tenant boundary: `Organization`
- User → Organization via `organization_members` (role + status)
- All customer resources carry `organization_id`
- Authorization layer: `lib/authorization/index.ts` (pure TS, tested)
- RLS policies: written in all migrations, not yet deployed

---

## RLS Test Plan

**NOT EXECUTED — REQUIRES LIVE SUPABASE**

For each table below, execute as User A (member of Org A) and verify User B (member of Org B) cannot access Org A's data.

### Tables to test
- organizations
- organization_members
- projects
- applications
- environments
- product_instances
- subscriptions
- entitlements
- infrastructure_resources
- provisioning_jobs
- deployments
- domains
- database_resources
- audit_logs

### Test matrix per table

| Operation | User A → Org A data | User A → Org B data | Expected |
|---|---|---|---|
| SELECT | ✓ | ✗ | Org B rows not returned |
| INSERT with org_b_id | — | ✗ | RLS violation error |
| UPDATE org_b row | — | ✗ | 0 rows affected |
| DELETE org_b row | — | ✗ | 0 rows affected |

### Manual organization_id manipulation test
Attempt to INSERT a resource with a manually supplied `organization_id` belonging to another tenant. RLS must reject this.

### Role isolation tests
- Viewer: SELECT only on projects/applications/environments
- Developer: cannot access subscriptions/entitlements/infrastructure
- Billing: cannot access infrastructure/provisioning
- Admin: cannot delete organization
- Owner: full org access, NOT platform admin

---

## Outstanding Work for Phase 2B

1. **Provision Supabase project** and apply all migrations
2. **Implement customer authentication** — Supabase Auth sign-up/sign-in flows
3. **Replace dashboard unconfigured state** with real authenticated data
4. **Organization creation flow** — server-side API for creating orgs on signup
5. **Replace rate limiting** with distributed solution (Redis/Upstash) before horizontal scaling
6. **Migrate contact route** from service role to anon key with RLS insert policy
7. **Execute RLS test plan** above
8. **Run tenant isolation tests** against live database

---

## Known Risks

| Risk | Mitigation |
|---|---|
| Rate limiting is process-memory only | Document clearly; replace before horizontal scaling |
| Contact route uses service role | Acceptable short-term; migrate in Phase 2B |
| Admin password must be changed | `must_change_password` flag set in migration |
| No customer auth yet | Dashboard shows unconfigured state safely |
| Supabase anon key not yet in env | `getUserClient()` will throw; only affects future customer routes |

---

## Phase 2B Sequence

1. Provision Supabase → apply migrations → verify RLS
2. Implement Supabase Auth customer sign-up/sign-in
3. Implement organization creation on signup
4. Replace dashboard unconfigured states with real data
5. Implement organization member invitation flow
6. Replace process-memory rate limiting
7. Migrate contact route to anon key
8. Full RLS test execution
9. Handoff to Phase 2C (Stripe billing)
