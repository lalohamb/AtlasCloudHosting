# Atlas Cloud — Supabase Setup

**STATUS: NOT ACTIVATED — DO NOT EXECUTE UNTIL PHASE 2B IS APPROVED**

---

## Prerequisites

- Node.js 22+
- Supabase account at https://supabase.com
- All migrations reviewed and approved

---

## Activation Procedure

### 1. Create Supabase Project
- Go to https://supabase.com/dashboard
- Create a new project
- Note the project URL and API keys

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and populate:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_ANON_KEY=your-anon-key
ADMIN_SESSION_SECRET=<64-byte hex — generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))">
```

**NEVER commit `.env.local` to version control.**

### 3. Apply Migrations (in order)
Run each migration in the Supabase SQL editor or via Supabase CLI:

```
20251107190112_create_contact_submissions_table.sql
20251107190222_create_admin_users_table.sql
20251108000000_fix_admin_security.sql
20251109000001_organizations.sql
20251109000002_projects_applications_environments.sql
20251109000003_product_instances_subscriptions_entitlements.sql
20251109000004_infrastructure_provisioning_deployments.sql
20251109000005_audit_security.sql
```

### 4. Configure Supabase Auth
- Enable Email/Password provider in Supabase Auth settings
- Configure redirect URLs for your domain
- Set JWT expiry appropriate for your security requirements

### 5. Create Initial Platform Administrator
Do NOT use the `admin_users` table for customer accounts.
The `admin_users` table is for Atlas internal admin access only.

Generate a secure bcrypt hash:
```bash
node -e "require('bcryptjs').hash('YourSecurePassword',12).then(console.log)"
```

Update the admin record:
```sql
UPDATE admin_users
SET password_hash = '<new_hash>', must_change_password = false
WHERE email = 'admin@atlascloud.hosting';
```

### 6. Verify RLS
Execute the RLS test plan in `docs/PHASE-2B-HANDOFF.md`.

### 7. Execute Tenant Isolation Tests
```bash
npm run test
```
All tests must pass before proceeding.

### 8. Test Customer Authentication
- Register a test customer account via Supabase Auth
- Verify JWT is issued correctly
- Verify session handling

### 9. Test Organization Membership
- Create a test organization via service role
- Add test user as member
- Verify RLS allows correct access
- Verify cross-tenant access is denied

### 10. Verify Dashboard
- Navigate to `/dashboard`
- Verify unconfigured state is replaced by real data
- Verify all dashboard routes load correctly

### 11. Verify Contact Functionality
- Submit the contact form at `/contact`
- Verify submission appears in `contact_submissions` table
- Verify admin dashboard shows the submission

### 12. Verify Administrative Functionality
- Log in at `/admin/login`
- Verify submissions are visible
- Verify logout works correctly

---

## Service Role Handling

The service role key (`SUPABASE_SERVICE_ROLE_KEY`) bypasses all RLS policies.

**Permitted uses:**
- Contact form inserts (`/api/contact`)
- Admin login and submissions (`/api/admin/*`)
- Future: Stripe webhook processing
- Future: Provisioning workers
- Future: Infrastructure synchronization

**Never:**
- Expose to browser/client-side code
- Use for normal customer data reads
- Use as a substitute for proper RLS design

---

## Rollback

If activation fails:
1. Remove `.env.local` credentials
2. The marketing website will continue to function (build does not require Supabase)
3. Dashboard routes will show unconfigured state
4. Contact form will return 500 (expected without credentials)
