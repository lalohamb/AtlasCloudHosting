/*
  # Atlas SaaS Foundation — Infrastructure, Provisioning, Deployments, Domains, Databases
  NOT DEPLOYED — requires live Supabase project
*/

-- ============================================================
-- INFRASTRUCTURE RESOURCES
-- ============================================================

CREATE TABLE IF NOT EXISTS infrastructure_resources (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id      uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id           uuid REFERENCES projects(id) ON DELETE SET NULL,
  environment_id       uuid REFERENCES environments(id) ON DELETE SET NULL,
  -- Provider-neutral: 'digitalocean', 'custom' — never provider-specific column names
  provider             text NOT NULL,
  provider_resource_id text,
  resource_type        text NOT NULL
                         CHECK (resource_type IN (
                           'compute','volume','database','network',
                           'firewall','load_balancer','object_storage','kubernetes'
                         )),
  region               text,
  status               text NOT NULL DEFAULT 'pending'
                         CHECK (status IN (
                           'pending','provisioning','active','error','deprovisioning','deleted'
                         )),
  metadata             jsonb NOT NULL DEFAULT '{}',
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_infra_resources_org_id ON infrastructure_resources(organization_id);
CREATE INDEX IF NOT EXISTS idx_infra_resources_env_id ON infrastructure_resources(environment_id);

ALTER TABLE infrastructure_resources ENABLE ROW LEVEL SECURITY;

-- Conservative: only admin+ can see infrastructure resources
CREATE POLICY "infra_select_admin"
  ON infrastructure_resources FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid()
        AND status = 'active'
        AND role IN ('owner', 'admin')
    )
  );

-- ============================================================
-- PROVISIONING JOBS
-- ============================================================

CREATE TABLE IF NOT EXISTS provisioning_jobs (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id     uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id          uuid REFERENCES projects(id) ON DELETE SET NULL,
  environment_id      uuid REFERENCES environments(id) ON DELETE SET NULL,
  product_instance_id uuid REFERENCES product_instances(id) ON DELETE SET NULL,
  operation           text NOT NULL,
  status              text NOT NULL DEFAULT 'pending'
                        CHECK (status IN (
                          'pending','queued','provisioning','configuring',
                          'deploying','verifying','ready','failed',
                          'suspended','deprovisioning','deleted'
                        )),
  attempts            integer NOT NULL DEFAULT 0,
  /*
   * IDEMPOTENCY:
   * The idempotency_key must be unique per logical operation.
   * A Stripe webhook retry, queue redelivery, or HTTP duplicate must not
   * create a second provisioning job for the same logical operation.
   * Callers must generate a stable key (e.g. hash of subscription_id + operation).
   */
  idempotency_key     text NOT NULL UNIQUE,
  error_code          text,
  error_message       text,
  requested_by        uuid NOT NULL,
  started_at          timestamptz,
  completed_at        timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_provisioning_jobs_idempotency
  ON provisioning_jobs(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_provisioning_jobs_org_id ON provisioning_jobs(organization_id);
CREATE INDEX IF NOT EXISTS idx_provisioning_jobs_status ON provisioning_jobs(status);

ALTER TABLE provisioning_jobs ENABLE ROW LEVEL SECURITY;

-- Conservative: only admin+ can see provisioning jobs
CREATE POLICY "provisioning_select_admin"
  ON provisioning_jobs FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid()
        AND status = 'active'
        AND role IN ('owner', 'admin')
    )
  );

-- ============================================================
-- DEPLOYMENTS
-- ============================================================

CREATE TABLE IF NOT EXISTS deployments (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  application_id  uuid NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  environment_id  uuid NOT NULL REFERENCES environments(id) ON DELETE CASCADE,
  status          text NOT NULL DEFAULT 'queued'
                    CHECK (status IN ('queued','building','deploying','ready','failed','cancelled')),
  source_type     text NOT NULL CHECK (source_type IN ('git','image','manual')),
  source_reference text,
  commit_sha      text,
  created_by      uuid NOT NULL,
  started_at      timestamptz,
  completed_at    timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_deployments_org_id ON deployments(organization_id);
CREATE INDEX IF NOT EXISTS idx_deployments_application_id ON deployments(application_id);
CREATE INDEX IF NOT EXISTS idx_deployments_created_at ON deployments(created_at DESC);

ALTER TABLE deployments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "deployment_select_member"
  ON deployments FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- ============================================================
-- DOMAINS
-- ============================================================

CREATE TABLE IF NOT EXISTS domains (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id      uuid REFERENCES projects(id) ON DELETE SET NULL,
  application_id  uuid REFERENCES applications(id) ON DELETE SET NULL,
  environment_id  uuid REFERENCES environments(id) ON DELETE SET NULL,
  hostname        text NOT NULL,
  status          text NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','active','failed','removed')),
  ssl_status      text NOT NULL DEFAULT 'pending'
                    CHECK (ssl_status IN ('pending','active','failed','expired')),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, hostname)
);

CREATE INDEX IF NOT EXISTS idx_domains_org_id ON domains(organization_id);
CREATE INDEX IF NOT EXISTS idx_domains_hostname ON domains(hostname);

ALTER TABLE domains ENABLE ROW LEVEL SECURITY;

CREATE POLICY "domain_select_member"
  ON domains FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- ============================================================
-- DATABASE RESOURCES
-- ============================================================

CREATE TABLE IF NOT EXISTS database_resources (
  id                        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id           uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id                uuid REFERENCES projects(id) ON DELETE SET NULL,
  environment_id            uuid REFERENCES environments(id) ON DELETE SET NULL,
  infrastructure_resource_id uuid REFERENCES infrastructure_resources(id) ON DELETE SET NULL,
  engine                    text NOT NULL CHECK (engine IN ('postgresql','mysql','redis')),
  version                   text,
  status                    text NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending','active','error','deleted')),
  -- NEVER store plaintext passwords in this table
  created_at                timestamptz NOT NULL DEFAULT now(),
  updated_at                timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_db_resources_org_id ON database_resources(organization_id);
CREATE INDEX IF NOT EXISTS idx_db_resources_env_id ON database_resources(environment_id);

ALTER TABLE database_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "db_resource_select_admin"
  ON database_resources FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid()
        AND status = 'active'
        AND role IN ('owner', 'admin', 'developer')
    )
  );
