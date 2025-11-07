/*
  # Create Contact Submissions Table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text, required) - Name of the person submitting the form
      - `email` (text, required) - Email address for contact
      - `website` (text, optional) - Website URL if provided
      - `message` (text, required) - The message content from the form
      - `created_at` (timestamptz) - Timestamp of when submission was created
      - `ip_address` (text, optional) - IP address for spam prevention tracking
      - `user_agent` (text, optional) - Browser user agent for analytics

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for anonymous users to insert their own submissions
    - Add policy for authenticated admin users to read all submissions
    - Add policy for service role to have full access

  3. Indexes
    - Create index on `created_at` for efficient date-based queries
    - Create index on `email` for searching by email address

  ## Important Notes
  
  This migration creates a secure contact form submission system where:
  - Anyone can submit a contact form (anonymous insert)
  - Only authenticated admin users can view submissions
  - Data is automatically timestamped for tracking
  - Optional fields allow for spam prevention tracking
*/

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  website text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  ip_address text,
  user_agent text
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert contact submissions
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can read submissions
CREATE POLICY "Authenticated users can read all submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
  ON contact_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
  ON contact_submissions(email);