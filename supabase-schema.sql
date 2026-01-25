-- Supabase SQL Schema for Sweepstakes Landing Page
-- Run this in your Supabase SQL Editor

-- =====================================================
-- TABLE 1: leads
-- Stores email addresses and UTM tracking data
-- =====================================================

CREATE TABLE IF NOT EXISTS leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  source text DEFAULT 'landing_page',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  user_agent text,
  ip_address inet,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_utm_source ON leads(utm_source);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (for public lead capture)
CREATE POLICY "Allow public insert" ON leads
  FOR INSERT TO anon WITH CHECK (true);

-- Policy: Allow authenticated users to read all leads
CREATE POLICY "Allow authenticated read" ON leads
  FOR SELECT TO authenticated USING (true);

-- =====================================================
-- TABLE 2: offer_clicks
-- Tracks which offers users click on
-- =====================================================

CREATE TABLE IF NOT EXISTS offer_clicks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id uuid REFERENCES leads(id) ON DELETE CASCADE,
  offer_name text NOT NULL,
  offer_url text NOT NULL,
  clicked_at timestamptz DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_offer_clicks_lead_id ON offer_clicks(lead_id);
CREATE INDEX IF NOT EXISTS idx_offer_clicks_clicked_at ON offer_clicks(clicked_at DESC);
CREATE INDEX IF NOT EXISTS idx_offer_clicks_offer_name ON offer_clicks(offer_name);

-- Enable Row Level Security
ALTER TABLE offer_clicks ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (for public click tracking)
CREATE POLICY "Allow public insert offer_clicks" ON offer_clicks
  FOR INSERT TO anon WITH CHECK (true);

-- Policy: Allow authenticated users to read all clicks
CREATE POLICY "Allow authenticated read offer_clicks" ON offer_clicks
  FOR SELECT TO authenticated USING (true);

-- =====================================================
-- OPTIONAL: Analytics View
-- Useful for viewing lead + click data together
-- =====================================================

CREATE OR REPLACE VIEW lead_analytics AS
SELECT 
  l.id as lead_id,
  l.email,
  l.utm_source,
  l.utm_medium,
  l.utm_campaign,
  l.created_at as lead_created_at,
  COUNT(oc.id) as total_clicks,
  ARRAY_AGG(DISTINCT oc.offer_name) FILTER (WHERE oc.offer_name IS NOT NULL) as clicked_offers
FROM leads l
LEFT JOIN offer_clicks oc ON l.id = oc.lead_id
GROUP BY l.id, l.email, l.utm_source, l.utm_medium, l.utm_campaign, l.created_at
ORDER BY l.created_at DESC;
