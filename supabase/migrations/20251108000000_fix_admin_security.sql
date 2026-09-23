/*
  # Fix Admin User Security

  1. Replaces the insecure hardcoded password hash from the initial migration
     with a properly generated bcrypt hash (cost factor 12).

  2. Adds a `must_change_password` flag so the admin is forced to set a new
     password on first login after this migration runs.

  IMPORTANT:
  - The placeholder password below is: ChangeThisPassword!
  - You MUST change this immediately after running this migration.
  - Generate a new hash using: node -e "require('bcryptjs').hash('YourNewPassword',12).then(console.log)"
  - Then UPDATE admin_users SET password_hash = '<new_hash>' WHERE email = 'admin@atlascloud.hosting';
*/

-- Add must_change_password column if it doesn't exist
ALTER TABLE admin_users
  ADD COLUMN IF NOT EXISTS must_change_password boolean NOT NULL DEFAULT false;

-- Replace the insecure hardcoded hash with a properly generated bcrypt hash
-- Placeholder password: ChangeThisPassword! — CHANGE THIS IMMEDIATELY
UPDATE admin_users
SET
  password_hash = '$2b$12$.88jRX9Evl5xc1WSafDAIuqj15/7/I/W4/r6lloqE9eDpsWNSAfMK',
  must_change_password = true
WHERE email = 'admin@atlascloud.hosting';
