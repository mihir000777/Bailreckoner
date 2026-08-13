-- ============================================================================
-- BAIL RECKONER (SIH268405) — SUPABASE POSTGRESQL DATABASE SCHEMA
-- Execute this SQL script in your Supabase SQL Editor (https://app.supabase.com)
-- ============================================================================

-- 1. UNDERTRIAL PRISONER CASES TABLE
CREATE TABLE IF NOT EXISTS public.undertrial_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prisoner_name TEXT NOT NULL,
    father_name TEXT,
    age INTEGER,
    gender TEXT DEFAULT 'Male',
    fir_number TEXT NOT NULL UNIQUE,
    police_station TEXT NOT NULL,
    district TEXT NOT NULL,
    state TEXT NOT NULL,
    custody_start_date DATE NOT NULL,
    offense_id TEXT NOT NULL,
    ipc_sections TEXT[] DEFAULT '{}',
    bns_sections TEXT[] DEFAULT '{}',
    max_sentence_years INTEGER NOT NULL DEFAULT 7,
    is_first_time_offender BOOLEAN DEFAULT true,
    has_prior_convictions BOOLEAN DEFAULT false,
    is_life_sentence_offense BOOLEAN DEFAULT false,
    has_procedural_delay BOOLEAN DEFAULT false,
    is_sole_breadwinner BOOLEAN DEFAULT false,
    has_medical_condition BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'UNDER_TRIAL',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. LEGAL AID APPLICATIONS TABLE (DLSA / NALSA)
CREATE TABLE IF NOT EXISTS public.legal_aid_applications (
    id TEXT PRIMARY KEY,
    applicant_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    category TEXT NOT NULL,
    district TEXT NOT NULL,
    state TEXT NOT NULL,
    legal_help_type TEXT NOT NULL,
    fir_details TEXT,
    assigned_advocate TEXT DEFAULT 'DLSA Allotment Pending',
    status TEXT DEFAULT 'RECEIVED', -- 'RECEIVED', 'SCRUTINY', 'COUNSEL_ASSIGNED', 'APPLICATION_FILED', 'HEARING_SET'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. JUDICIAL ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.judicial_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE,
    prisoner_name TEXT NOT NULL,
    fir_number TEXT NOT NULL,
    district TEXT NOT NULL,
    decision TEXT NOT NULL, -- 'GRANTED', 'REJECTED'
    judicial_notes TEXT,
    issued_by TEXT DEFAULT 'Hon''ble Magistrate S. K. Gupta',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.undertrial_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_aid_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.judicial_orders ENABLE ROW LEVEL SECURITY;

-- Allow public read access to cases and legal aid applications
CREATE POLICY "Allow public read access to undertrial cases" ON public.undertrial_cases FOR SELECT USING (true);
CREATE POLICY "Allow public read access to legal aid apps" ON public.legal_aid_applications FOR SELECT USING (true);
CREATE POLICY "Allow public insert to legal aid apps" ON public.legal_aid_applications FOR INSERT WITH CHECK (true);

-- 5. SAMPLE SEED DATA
INSERT INTO public.undertrial_cases 
(prisoner_name, father_name, age, fir_number, police_station, district, state, custody_start_date, offense_id, max_sentence_years, is_first_time_offender)
VALUES 
('Ramesh Kumar', 'Suresh Kumar', 32, 'FIR 142/2024 P.S. Patna Central', 'Patna Central P.S.', 'Patna', 'Bihar', '2023-01-15', 'offense-ipc-420', 7, true),
('Anand Verma', 'Mahesh Verma', 28, 'FIR 88/2024 P.S. Colaba', 'Colaba P.S.', 'Greater Mumbai', 'Maharashtra', '2023-06-10', 'offense-ipc-379', 3, true)
ON CONFLICT (fir_number) DO NOTHING;

INSERT INTO public.legal_aid_applications 
(id, applicant_name, phone, category, district, state, legal_help_type, fir_details, assigned_advocate, status)
VALUES 
('DLSA-2026-PAT-9082', 'Sunita Devi (Wife of Undertrial)', '+91 98350 11223', 'Person in Custody (Sec 12g)', 'Patna', 'Bihar', 'BNSS 479 Mandatory Bail Application', 'FIR 142/2024 P.S. Patna Central', 'Adv. Rajesh Sharma (DLSA Panel #882)', 'APPLICATION_FILED')
ON CONFLICT (id) DO NOTHING;
