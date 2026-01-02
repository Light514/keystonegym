-- Keystone Gym Database Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Members table
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  subscription_status TEXT DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'inactive', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT DEFAULT 'inactive',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  price_amount INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trial requests table
CREATE TABLE trial_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Donations table
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT,
  amount INTEGER NOT NULL,
  payment_provider TEXT NOT NULL CHECK (payment_provider IN ('stripe', 'paypal')),
  payment_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payment history table
CREATE TABLE payment_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  description TEXT,
  payment_method TEXT,
  payment_date TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_members_role ON members(role);
CREATE INDEX idx_subscriptions_member ON subscriptions(member_id);
CREATE INDEX idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_payment_history_member ON payment_history(member_id);

-- Enable Row Level Security (RLS)
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE trial_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Members: Users can read/update their own data
CREATE POLICY "Users can view own member data" ON members
  FOR SELECT USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Users can update own member data" ON members
  FOR UPDATE USING (auth.jwt() ->> 'email' = email);

-- Subscriptions: Users can view their own subscriptions
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (
    member_id IN (SELECT id FROM members WHERE email = auth.jwt() ->> 'email')
  );

-- Trial requests: Anyone can insert (public form)
CREATE POLICY "Anyone can submit trial request" ON trial_requests
  FOR INSERT WITH CHECK (true);

-- Donations: Anyone can insert (public donations)
CREATE POLICY "Anyone can donate" ON donations
  FOR INSERT WITH CHECK (true);

-- Payment history: Users can view their own payments
CREATE POLICY "Users can view own payment history" ON payment_history
  FOR SELECT USING (
    member_id IN (SELECT id FROM members WHERE email = auth.jwt() ->> 'email')
  );

-- Service role bypass for API routes (webhooks, admin operations)
CREATE POLICY "Service role full access to members" ON members
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access to subscriptions" ON subscriptions
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access to trial_requests" ON trial_requests
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access to donations" ON donations
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access to payment_history" ON payment_history
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Function to auto-create member record on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.members (email, full_name)
  VALUES (
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create member on auth signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
