/*
  # Atlas SaaS Foundation — Product Instances, Subscriptions, Entitlements
  NOT DEPLOYED — requires live Supabase project
*/

-- ============================================================
-- PRODUCT INSTANCES
-- ============================================================

CREATE TABLE IF NOT EXISTS product_instances (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id      uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  -- References config/products.ts slug — not a DB foreign key
  product_id           text NOT NULL,
  project_id           uuid REFERENCES projects(id) ON DELETE SET NULL,
  status               text NOT NULL DEFAULT 'pending'
                         CHECK (status IN (
                           'pending','provisioning','configuration_required',
                           'ready','running','suspended','failed'
                         )),
  configuration_status text NOT NULL DEFAULT 'pending'
                         CHECK (configuration_status IN ('pending','in_progress','complete','failed')),
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_product_instances_org_id ON product_instances(organization_id);
CREATE INDEX IF NOT EXISTS idx_product_instances_product_id ON product_instances(product_id);

ALTER TABLE product_instances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "product_instance_select_member"
  ON product_instances FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- ============================================================
-- SUBSCRIPTIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS subscriptions (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id          uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  -- References config/plans.ts plan id
  plan_id                  text NOT NULL,
  product_instance_id      uuid REFERENCES product_instances(id) ON DELETE SET NULL,
  billing_provider         text CHECK (billing_provider IN ('stripe','manual')),
  external_customer_id     text,
  external_subscription_id text,
  status                   text NOT NULL DEFAULT 'active'
                             CHECK (status IN (
                               'active','trialing','past_due','canceled','unpaid','incomplete'
                             )),
  current_period_start     timestamptz,
  current_period_end       timestamptz,
  cancel_at_period_end     boolean NOT NULL DEFAULT false,
  created_at               timestamptz NOT NULL DEFAULT now(),
  updated_at               timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_org_id ON subscriptions(organization_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_external ON subscriptions(external_subscription_id)
  WHERE external_subscription_id IS NOT NULL;

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Only billing/owner/admin roles can read subscription data
CREATE POLICY "subscription_select_billing"
  ON subscriptions FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid()
        AND status = 'active'
        AND role IN ('owner', 'admin', 'billing')
    )
  );

-- ============================================================
-- ENTITLEMENTS
-- ============================================================

CREATE TABLE IF NOT EXISTS entitlements (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id  uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  subscription_id  uuid NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  entitlement_key  text NOT NULL,
  entitlement_type text NOT NULL CHECK (entitlement_type IN ('numeric','boolean','text')),
  numeric_value    numeric,
  boolean_value    boolean,
  text_value       text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, subscription_id, entitlement_key)
);

CREATE INDEX IF NOT EXISTS idx_entitlements_org_id ON entitlements(organization_id);
CREATE INDEX IF NOT EXISTS idx_entitlements_subscription_id ON entitlements(subscription_id);

ALTER TABLE entitlements ENABLE ROW LEVEL SECURITY;

-- Entitlements are read by Atlas server processes only (service role)
-- Customer UI reads entitlements through server-side API, not direct DB access
CREATE POLICY "entitlement_select_owner_admin"
  ON entitlements FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid()
        AND status = 'active'
        AND role IN ('owner', 'admin')
    )
  );
