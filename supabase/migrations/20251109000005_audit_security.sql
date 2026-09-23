/*
  # Atlas SaaS Foundation — Audit Logs & Security Events
  NOT DEPLOYED — requires live Supabase project
*/

-- ============================================================
-- AUDIT LOGS
-- ============================================================

CREATE TABLE IF NOT EXISTS audit_logs (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
  actor_user_id   uuid,
  actor_type      text NOT NULL CHECK (actor_type IN ('user','system','platform_admin')),
  action          text NOT NULL,
  target_type     text,
  target_id       text,
  -- Must NEVER contain secrets, passwords, tokens, or credentials
  metadata        jsonb NOT NULL DEFAULT '{}',
  ip_address      text,
  created_at      timestamptz NOT NULL DEFAULT now()
  -- No updated_at — audit records are append-only
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_org_id ON audit_logs(organization_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Conservative: only owner/admin can read audit logs
CREATE POLICY "audit_select_admin"
  ON audit_logs FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid()
        AND status = 'active'
        AND role IN ('owner', 'admin')
    )
  );

-- Audit logs are insert-only from service role — no user-level insert policy
-- No UPDATE or DELETE policies — records are immutable

-- ============================================================
-- SECURITY EVENTS
-- ============================================================

CREATE TABLE IF NOT EXISTS security_events (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
  user_id         uuid,
  event_type      text NOT NULL
                    CHECK (event_type IN (
                      'login_failed','login_rate_limited','unauthorized_access_attempt',
                      'privilege_change','credential_change','admin_action'
                    )),
  ip_address      text,
  -- Must NEVER contain secrets, passwords, tokens, or credentials
  metadata        jsonb NOT NULL DEFAULT '{}',
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_security_events_user_id ON security_events(user_id);
CREATE INDEX IF NOT EXISTS idx_security_events_event_type ON security_events(event_type);
CREATE INDEX IF NOT EXISTS idx_security_events_created_at ON security_events(created_at DESC);

ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;

-- Security events are platform-admin only — no customer-facing RLS policy
-- All reads go through service role in controlled admin contexts
