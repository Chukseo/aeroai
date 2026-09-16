-- ==============================================================================
-- AeroCompliance AI - Production Database Schema & Vector Search (pgvector)
-- Supports Multi-Tenant RLS, Aviation Manuals, HR Policies & Employment Contracts
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. Organizations Table (Airlines, MROs, CAMO, Regulators)
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    iata_icao_code TEXT,
    regulatory_domain TEXT NOT NULL DEFAULT 'FAA' CHECK (regulatory_domain IN ('FAA', 'EASA', 'ICAO', 'DUAL', 'DOT')),
    subscription_tier TEXT NOT NULL DEFAULT 'enterprise' CHECK (subscription_tier IN ('standard', 'enterprise', 'regulator')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. User Profiles Table (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'operations_user' CHECK (role IN ('admin', 'compliance_manager', 'auditor', 'operations_user')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Documents & Contracts Table (Manuals, SOPs, Employment Agreements, HR Policies)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    document_type TEXT NOT NULL CHECK (document_type IN (
        'GMM', 'FOM', 'SMS', 'SOP', 'QUALITY_MANUAL', 'TRAINING', 'AUDIT_REPORT',
        'EMPLOYMENT_CONTRACT', 'HR_POLICY', 'DRUG_ALCOHOL_POLICY', 'FATIGUE_POLICY'
    )),
    file_path TEXT NOT NULL,
    file_size BIGINT NOT NULL DEFAULT 0,
    mime_type TEXT NOT NULL DEFAULT 'application/pdf',
    revision_number TEXT NOT NULL DEFAULT 'Rev 0',
    effective_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'indexed', 'failed')),
    chunks_count INT NOT NULL DEFAULT 0,
    regulatory_source TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Document Chunks Table with 1536-dimensional Vector Embeddings (OpenAI)
CREATE TABLE IF NOT EXISTS public.document_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    chunk_index INT NOT NULL,
    content TEXT NOT NULL,
    section_title TEXT NOT NULL DEFAULT 'General Section',
    token_count INT NOT NULL DEFAULT 0,
    embedding VECTOR(1536),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Vector Index (HNSW for high-performance approximate cosine similarity)
CREATE INDEX IF NOT EXISTS idx_document_chunks_embedding 
ON public.document_chunks USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

CREATE INDEX IF NOT EXISTS idx_document_chunks_org_doc 
ON public.document_chunks(org_id, document_id);

-- 6. Regulatory Standards Knowledge Base (FAA, EASA, ICAO, DOT)
CREATE TABLE IF NOT EXISTS public.regulations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    authority TEXT NOT NULL CHECK (authority IN ('FAA', 'EASA', 'ICAO', 'DOT')),
    code TEXT NOT NULL, -- e.g. "14 CFR § 145.211", "14 CFR § 120.109"
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'Maintenance', 'Flight Operations', 'Safety Management', 'Airworthiness', 
        'Quality Assurance', 'Personnel & HR', 'Drug & Alcohol'
    )),
    subpart TEXT,
    content TEXT NOT NULL,
    summary TEXT,
    effective_date DATE NOT NULL DEFAULT CURRENT_DATE,
    tags TEXT[] NOT NULL DEFAULT '{}',
    embedding VECTOR(1536),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(authority, code)
);

CREATE INDEX IF NOT EXISTS idx_regulations_embedding 
ON public.regulations USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- 7. Compliance Reviews & Gap Analyses
CREATE TABLE IF NOT EXISTS public.compliance_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    document_id UUID REFERENCES public.documents(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    target_authority TEXT NOT NULL CHECK (target_authority IN ('FAA', 'EASA', 'ICAO', 'DOT')),
    target_regulation_code TEXT NOT NULL,
    compliance_score NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('draft', 'analyzing', 'completed', 'failed')),
    summary TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Compliance & Audit Findings
CREATE TABLE IF NOT EXISTS public.findings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID NOT NULL REFERENCES public.compliance_reviews(id) ON DELETE CASCADE,
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    regulation_ref TEXT NOT NULL,
    manual_section_ref TEXT,
    finding_type TEXT NOT NULL CHECK (finding_type IN ('compliant', 'potential_risk', 'missing_control', 'policy_conflict')),
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    risk_implication TEXT,
    recommended_action TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_remediation', 'resolved', 'accepted_risk')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Audit Readiness Reports
CREATE TABLE IF NOT EXISTS public.audit_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    audit_type TEXT NOT NULL CHECK (audit_type IN ('FAA_NASIP', 'EASA_ACAM', 'IOSA', 'INTERNAL_QA', 'IS_BAO', 'FAA_DOT_HR_AUDIT')),
    target_regulation TEXT NOT NULL,
    readiness_score INT NOT NULL DEFAULT 0,
    executive_summary TEXT NOT NULL,
    checklist_data JSONB NOT NULL DEFAULT '[]'::jsonb,
    findings_summary JSONB NOT NULL DEFAULT '{"critical":0,"high":0,"medium":0,"low":0}'::jsonb,
    recommended_actions TEXT[] NOT NULL DEFAULT '{}',
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. AI Chat Sessions & Messages
CREATE TABLE IF NOT EXISTS public.chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Compliance Inquiry',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    citations JSONB NOT NULL DEFAULT '[]'::jsonb,
    confidence_score NUMERIC(4, 3),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. PGVECTOR Search RPC Functions
CREATE OR REPLACE FUNCTION match_document_chunks(
    query_embedding VECTOR(1536),
    p_org_id UUID,
    p_match_threshold FLOAT DEFAULT 0.65,
    p_match_count INT DEFAULT 5,
    p_document_id UUID DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    document_id UUID,
    chunk_index INT,
    content TEXT,
    section_title TEXT,
    similarity FLOAT,
    metadata JSONB
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        dc.id,
        dc.document_id,
        dc.chunk_index,
        dc.content,
        dc.section_title,
        1 - (dc.embedding <=> query_embedding) AS similarity,
        dc.metadata
    FROM public.document_chunks dc
    WHERE dc.org_id = p_org_id
      AND (p_document_id IS NULL OR dc.document_id = p_document_id)
      AND (1 - (dc.embedding <=> query_embedding)) > p_match_threshold
    ORDER BY dc.embedding <=> query_embedding ASC
    LIMIT p_match_count;
END;
$$;
