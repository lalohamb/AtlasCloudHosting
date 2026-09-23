/*
  # Atlas SaaS Foundation — Organizations & Members
  NOT DEPLOYED — requires live Supabase project
*/

-- ============================================================
-- ORGANIZATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS organizations (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  slug         text NOT NULL UNIQUE,
  status       text NOT NULL DEFAULT 'active'
                 CHECK (status IN ('active', 'suspended', 'closed')),
  created_by   uuid NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_organizations_slug ON organizations(slug);
CREATE INDEX IF NOT EXISTS idx_organizations_created_by ON organizations(created_by);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Users can read organizations they are active members of
CREATE POLICY "org_select_member"
  ON organizations FOR SELECT
  USING (
    id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- Only platform service role can insert/update/delete organizations
-- (customer org creation will go through a server-side function)

-- ============================================================
-- ORGANIZATION MEMBERS
-- ============================================================

CREATE TABLE IF NOT EXISTS organization_members (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id         uuid NOT NULL,
  role            text NOT NULL
                    CHECK (role IN ('owner', 'admin', 'developer', 'billing', 'viewer')),
  status          text NOT NULL DEFAULT 'invited'
                    CHECK (status IN ('active', 'invited', 'suspended')),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_org_members_org_id ON organization_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_org_members_user_id ON organization_members(user_id);

ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;

-- Members can read their own membership records
CREATE POLICY "member_select_own"
  ON organization_members FOR SELECT
  USING (user_id = auth.uid());

-- Admins/owners can read all members of their org
CREATE POLICY "member_select_org_admin"
  ON organization_members FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid()
        AND status = 'active'
        AND role IN ('owner', 'admin')
    )
  );
