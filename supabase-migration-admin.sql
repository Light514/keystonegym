-- Migration: Add Admin Role Feature
-- Run this in Supabase SQL Editor to add admin functionality

-- 1. Add role column to members table
ALTER TABLE members ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'member';

-- 2. Add constraint for valid roles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'members_role_check'
  ) THEN
    ALTER TABLE members ADD CONSTRAINT members_role_check CHECK (role IN ('admin', 'member'));
  END IF;
END $$;

-- 3. Create index for role lookups
CREATE INDEX IF NOT EXISTS idx_members_role ON members(role);

-- 4. RLS policy: Admins can view all members
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Admins can view all members'
  ) THEN
    CREATE POLICY "Admins can view all members" ON members
      FOR SELECT USING (
        EXISTS (SELECT 1 FROM members WHERE email = auth.jwt() ->> 'email' AND role = 'admin')
      );
  END IF;
END $$;

-- 5. Set admin user
UPDATE members SET role = 'admin' WHERE email = 'ahmed.faraj2204@gmail.com';

-- Verify the changes
SELECT email, role, subscription_status FROM members;
