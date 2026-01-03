-- Fix for admin RLS policy recursion issue
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Step 1: Create helper function (SECURITY DEFINER bypasses RLS)
-- This function safely checks if the current user is an admin without triggering RLS recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.members
    WHERE email = auth.jwt() ->> 'email'
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Step 2: Add policy for admins to view all members
-- This policy uses the is_admin() function to allow admins to see everyone
CREATE POLICY "Admins can view all members" ON members
  FOR SELECT USING (public.is_admin());
