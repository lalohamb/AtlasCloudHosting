/*
  # Atlas SaaS Foundation — Projects, Applications, Environments
  NOT DEPLOYED — requires live Supabase project
*/

-- ============================================================
-- PROJECTS
-- ============================================================

CREATE TABLE IF NOT EXISTS projects (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name            text NOT NULL,
  slug            text NOT NULL,
  description     text,
  status          text NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active', 'archived', 'suspended')),
  created_by      uuid NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_projects_org_id ON projects(organization_id);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "project_select_member"
  ON projects FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- ============================================================
-- APPLICATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS applications (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id  uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id       uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name             text NOT NULL,
  slug             text NOT NULL,
  application_type text NOT NULL
                     CHECK (application_type IN ('nextjs','node','docker','api','worker','custom')),
  status           text NOT NULL DEFAULT 'active'
                     CHECK (status IN ('active','inactive','suspended','deleted')),
  repository_url   text,
  created_by       uuid NOT NULL,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (project_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_applications_org_id ON applications(organization_id);
CREATE INDEX IF NOT EXISTS idx_applications_project_id ON applications(project_id);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "application_select_member"
  ON applications FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- ============================================================
-- ENVIRONMENTS
-- ============================================================

CREATE TABLE IF NOT EXISTS environments (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id  uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id       uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  application_id   uuid NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  name             text NOT NULL,
  environment_type text NOT NULL
                     CHECK (environment_type IN ('production','staging','development')),
  status           text NOT NULL DEFAULT 'active'
                     CHECK (status IN ('active','inactive','suspended')),
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_environments_org_id ON environments(organization_id);
CREATE INDEX IF NOT EXISTS idx_environments_application_id ON environments(application_id);

ALTER TABLE environments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "environment_select_member"
  ON environments FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );
