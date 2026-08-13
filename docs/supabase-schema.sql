-- =========================================================
-- BailReckoner — Supabase / PostgreSQL Database Schema
-- SIH Problem ID SIH268405 — Ministry of Law & Justice
-- Execute this SQL in Supabase SQL Editor to initialize full DB
-- =========================================================

CREATE TABLE IF NOT EXISTS undertrial_cases (
  id TEXT PRIMARY KEY,
  prisoner_name TEXT NOT NULL,
  prisoner_age INTEGER NOT NULL DEFAULT 30,
  gender TEXT NOT NULL DEFAULT 'male',
  is_foreign_national BOOLEAN DEFAULT FALSE,
  is_first_time_offender BOOLEAN DEFAULT TRUE,
  fir_number TEXT NOT NULL,
  police_station TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'Bihar',
  district TEXT NOT NULL DEFAULT 'Patna',
  court_name TEXT NOT NULL DEFAULT 'District & Sessions Court',
  custody_start_date DATE NOT NULL,
  offense_ids JSONB DEFAULT '[]'::jsonb,
  flight_risk_factors JSONB DEFAULT '{}'::jsonb,
  tampering_risk_factors JSONB DEFAULT '{}'::jsonb,
  societal_danger_factors JSONB DEFAULT '{}'::jsonb,
  lawyer_notes TEXT,
  judge_notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending_review',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookup on FIR and prisoner name
CREATE INDEX IF NOT EXISTS idx_undertrial_fir ON undertrial_cases(fir_number);
CREATE INDEX IF NOT EXISTS idx_undertrial_name ON undertrial_cases(prisoner_name);
CREATE INDEX IF NOT EXISTS idx_undertrial_status ON undertrial_cases(status);

-- Enable Row Level Security (RLS) and grant read/write permissions
ALTER TABLE undertrial_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to undertrial_cases" 
  ON undertrial_cases FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to undertrial_cases" 
  ON undertrial_cases FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to undertrial_cases" 
  ON undertrial_cases FOR UPDATE USING (true);

-- Seed initial mock data
INSERT INTO undertrial_cases (
  id, prisoner_name, prisoner_age, gender, is_first_time_offender,
  fir_number, police_station, state, district, court_name,
  custody_start_date, offense_ids, status
) VALUES 
(
  'case-001', 'Ramesh Kumar', 32, 'male', true,
  'FIR 142/2024', 'Patna Central', 'Bihar', 'Patna', 'Court of District & Sessions Judge, Patna',
  '2023-01-15', '["offense-ipc-420"]'::jsonb, 'pending_review'
),
(
  'case-002', 'Suresh Yadav', 45, 'male', false,
  'FIR 88/2022', 'Danapur P.S.', 'Bihar', 'Patna', 'Chief Judicial Magistrate Court, Patna',
  '2022-04-10', '["offense-ipc-307", "offense-ipc-379"]'::jsonb, 'pending_review'
),
(
  'case-003', 'Sunita Devi', 29, 'female', true,
  'FIR 201/2023', 'Kankarbagh P.S.', 'Bihar', 'Patna', 'Sub-Divisional Judicial Magistrate Court, Patna',
  '2023-08-20', '["offense-ipc-379"]'::jsonb, 'granted'
)
ON CONFLICT (id) DO NOTHING;
