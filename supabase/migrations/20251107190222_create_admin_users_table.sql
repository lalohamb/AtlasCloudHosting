/*
  # Create Admin Users System

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key) - Unique identifier for admin
      - `email` (text, unique, required) - Admin email address
      - `password_hash` (text, required) - Hashed password
      - `name` (text, required) - Admin's full name
      - `created_at` (timestamptz) - When admin was created
      - `last_login` (timestamptz) - Last login timestamp

  2. Security
    - Enable RLS on `admin_users` table
    - Add policy for authenticated admins to read their own data
    - Passwords will be hashed using bcrypt in the application layer

  3. Indexes
    - Create unique index on email for fast lookups

  ## Important Notes
  
  This creates a simple admin authentication system:
  - Admins authenticate with email/password
  - Password hashing is handled in the application layer
  - Once authenticated, admins can view contact submissions
*/

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can read their own data
CREATE POLICY "Admins can read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create unique index on email
CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_users_email 
  ON admin_users(email);

-- Insert a default admin user (password: admin123 - hashed with bcrypt)
-- Note: In production, this should be changed immediately
INSERT INTO admin_users (email, password_hash, name)
VALUES (
  'admin@atlascloud.hosting',
  '$2a$10$rXK8KqOqPEqJQvXhZKQMf.pZwBJhEQxV5QDO4U1xKF1YqFXY7Ew4O',
  'Admin User'
)
ON CONFLICT (email) DO NOTHING;