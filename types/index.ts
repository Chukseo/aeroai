export type UserRole = 'admin' | 'compliance_manager' | 'auditor' | 'operations_user';

export interface Organization {
  id: string;
  name: string;
  iata_icao_code?: string;
  regulatory_domain: 'FAA' | 'EASA' | 'ICAO' | 'DUAL';
  created_at: string;
}

export interface UserProfile {
  id: string;
  org_id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
}

export type DocumentType = 
  | 'GMM'                 // General Maintenance Manual
  | 'FOM'                 // Flight Operations Manual
  | 'SMS'                 // Safety Management System Manual
  | 'SOP'                 // Standard Operating Procedure
  | 'QUALITY_MANUAL'      // Quality Assurance Manual
  | 'TRAINING'            // Training Manual
  | 'AUDIT_REPORT'        // Prior Audit Findings
  | 'EMPLOYMENT_CONTRACT' // Flight Crew / A&P Technician Contracts
  | 'HR_POLICY'           // Aviation Employee Handbook & Just Culture
  | 'DRUG_ALCOHOL_POLICY' // DOT / FAA Part 120 Testing Program
  | 'FATIGUE_POLICY';     // FAR Part 117 Fatigue Risk Management

export type DocumentStatus = 'pending' | 'processing' | 'indexed' | 'failed';

export interface AviationDocument {
  id: string;
  org_id: string;
  title: string;
  document_type: DocumentType;
  file_path: string;
  file_size: number;
  mime_type: string;
  revision_number: string;
  effective_date: string;
  status: DocumentStatus;
  chunks_count: number;
  regulatory_source?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface DocumentChunk {
  id: string;
  document_id: string;
  org_id: string;
  chunk_index: number;
  content: string;
  section_title: string;
  token_count?: number;
  similarity?: number;
  metadata?: Record<string, any>;
}

export type RegulatoryAuthority = 'FAA' | 'EASA' | 'ICAO' | 'DOT';

export interface Regulation {
  id: string;
  authority: RegulatoryAuthority;
  code: string;
  title: string;
  category: 'Maintenance' | 'Flight Operations' | 'Safety Management' | 'Airworthiness' | 'Quality Assurance' | 'Personnel & HR' | 'Drug & Alcohol';
  content: string;
  subpart?: string;
  effective_date: string;
  summary: string;
  tags: string[];
}

export type ChangeSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface RegulationChange {
  id: string;
  regulation_code: string;
  authority: RegulatoryAuthority;
  title: string;
  category: string;
  published_date: string;
  effective_date: string;
  old_version_text: string;
  new_version_text: string;
  summary_what_changed: string;
  affected_operators: string[];
  affected_departments: string[];
  severity: ChangeSeverity;
  is_new_policy?: boolean;
}

export interface AffectedDocumentProcedure {
  document_id: string;
  document_title: string;
  section_ref: string;
  current_internal_text: string;
  compliance_status: 'outdated' | 'non_compliant' | 'requires_review';
  draft_procedural_fix: string;
  risk_implication: string;
}

export interface ImpactAssessment {
  id: string;
  change_id: string;
  organization_id: string;
  regulation_change: RegulationChange;
  overall_risk_level: ChangeSeverity;
  affected_procedures: AffectedDocumentProcedure[];
  executive_action_plan: string[];
  status: 'pending_review' | 'action_in_progress' | 'remediated';
  created_at: string;
}

export type FindingType = 'compliant' | 'potential_risk' | 'missing_control' | 'policy_conflict';
export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Finding {
  id: string;
  review_id: string;
  regulation_ref: string;
  manual_section_ref: string;
  finding_type: FindingType;
  severity: SeverityLevel;
  title: string;
  description: string;
  risk_implication: string;
  recommended_action: string;
  status: 'open' | 'in_remediation' | 'resolved' | 'accepted_risk';
  created_at: string;
}

export interface ComplianceReview {
  id: string;
  org_id: string;
  title: string;
  document_id: string;
  document_title: string;
  target_authority: RegulatoryAuthority;
  target_regulation_code: string;
  compliance_score: number;
  status: 'draft' | 'analyzing' | 'completed' | 'failed';
  summary: string;
  findings: Finding[];
  created_at: string;
}

export interface AuditChecklistItem {
  id: string;
  code: string;
  question: string;
  regulation_ref: string;
  document_ref?: string;
  status: 'compliant' | 'non_compliant' | 'needs_review' | 'not_applicable';
  notes?: string;
}

export interface AuditReport {
  id: string;
  org_id: string;
  title: string;
  audit_type: 'FAA_NASIP' | 'EASA_ACAM' | 'IOSA' | 'INTERNAL_QA' | 'IS_BAO' | 'FAA_DOT_HR_AUDIT';
  target_regulation: string;
  readiness_score: number;
  executive_summary: string;
  checklist: AuditChecklistItem[];
  findings_summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  recommended_actions: string[];
  created_at: string;
}

export interface Citation {
  source_type: 'internal_manual' | 'regulation';
  source_title: string;
  code_or_section: string;
  excerpt: string;
  relevance_score: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  citations?: Citation[];
  confidence_score?: number;
  engine?: 'openai' | 'deterministic';
  model?: string;
  engineNotice?: string;
  created_at: string;
}

export interface ChatSession {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  messages: ChatMessage[];
}

// ==============================================================================
// Document Generator Types (Tailored for United States Aviation Sector)
// ==============================================================================

export type DocGenCategory = 
  | 'employment_recruitment'
  | 'employee_lifecycle'
  | 'policies_governance'
  | 'business_operations';

export type DocGenType =
  // Employment & Recruitment
  | 'pilot_employment_contract'
  | 'mechanic_ap_contract'
  | 'dispatcher_contract'
  | 'offer_letter'
  | 'employment_contract'
  | 'consultant_agreement'
  | 'nda'
  | 'job_description'
  // Employee Lifecycle
  | 'promotion_letter'
  | 'salary_adjustment_letter'
  | 'transfer_letter'
  | 'probation_confirmation'
  | 'warning_letter'
  | 'pip'
  | 'resignation_acceptance'
  | 'termination_letter'
  | 'exit_interview'
  // Policies & Governance
  | 'just_culture_policy'
  | 'dot_drug_alcohol_policy'
  | 'fatigue_risk_management_policy'
  | 'employee_handbook'
  | 'code_of_conduct'
  | 'remote_work_policy'
  | 'it_security_policy'
  | 'health_safety_policy'
  // Business Operations
  | 'sop'
  | 'vendor_agreement'
  | 'service_contract'
  | 'procurement_policy'
  | 'meeting_minutes'
  | 'compliance_document';

export type USAviationSector = 
  | 'FAA_PART_121' // US Scheduled Commercial Air Carrier
  | 'FAA_PART_135' // US Commuter & On-Demand Operator
  | 'FAA_PART_145' // US Certificated Repair Station (MRO)
  | 'FAA_PART_91'  // US Corporate & General Aviation
  | 'US_AEROSPACE';// US Aerospace & Defense Manufacturing

export interface DocumentClause {
  id: string;
  title: string;
  body: string;
  is_mandatory: boolean;
  category: 'standard' | 'compliance' | 'optional' | 'restrictive';
}

export interface GeneratedDocument {
  id: string;
  title: string;
  category: DocGenCategory;
  doc_type: DocGenType;
  jurisdiction: USAviationSector;
  jurisdiction_label: string;
  governing_law: string;
  created_at: string;
  effective_date: string;
  parties: {
    employer_or_company: string;
    employee_or_counterparty: string;
    location: string;
  };
  variables: Record<string, string>;
  clauses: DocumentClause[];
  full_content_text: string;
  compliance_notes: string[];
  risk_warnings: string[];
}
