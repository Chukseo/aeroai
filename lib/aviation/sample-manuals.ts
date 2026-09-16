import { AviationDocument, DocumentChunk } from "@/types";

export interface SampleManualWithChunks {
  document: AviationDocument;
  chunks: DocumentChunk[];
}

export const SAMPLE_INTERNAL_MANUALS: SampleManualWithChunks[] = [
  {
    document: {
      id: "doc-gmm-ch7",
      org_id: "org-skywings-aero",
      title: "General Maintenance Manual (GMM) - Ch 7: Tool & Equipment Calibration",
      document_type: "GMM",
      file_path: "/manuals/gmm-rev14-ch7-tooling.pdf",
      file_size: 2458900,
      mime_type: "application/pdf",
      revision_number: "Rev 14.2",
      effective_date: "2023-11-15",
      status: "indexed",
      chunks_count: 3,
      regulatory_source: "FAA Part 145 / EASA Part-145",
      created_at: "2024-01-10T09:00:00Z"
    },
    chunks: [
      {
        id: "chunk-gmm-7-1",
        document_id: "doc-gmm-ch7",
        org_id: "org-skywings-aero",
        chunk_index: 0,
        section_title: "Chapter 7.1 - Precision Measurement Equipment Control",
        content: `SkyWings Maintenance Chapter 7.1: Precision Measurement Equipment Control
All precision tools, torque wrenches, micrometers, pressure gauges, and multi-meters used for certifying maintenance, inspections, or alterations on aircraft articles must be cataloged in the Tool Control Database. 
Tools must bear a calibrated inspection sticker showing:
- Tool Serial Number
- Calibration Date
- Next Due Date
- Technician initials who verified the tool status prior to dispatch.
Technicians are strictly prohibited from using personal uncalibrated hand tools for torque or dimension-critical tasks.`
      },
      {
        id: "chunk-gmm-7-2",
        document_id: "doc-gmm-ch7",
        org_id: "org-skywings-aero",
        chunk_index: 1,
        section_title: "Chapter 7.2 - Calibration Intervals and Standards",
        content: `SkyWings Maintenance Chapter 7.2: Calibration Intervals and Standards
Standard calibration interval for torque devices is twelve (12) calendar months, unless manufacturer maintenance data specifies otherwise. Calibration is performed by accredited vendor laboratories.
NOTE: Calibration certificates are received digitally and archived in the MRO Tool Management Portal. Records of calibration are retained for twelve (12) months from the date of calibration expiration.
Notice of overdue calibration: If a tool passes its due date without recertification, it is placed in the quarantine locker by the Tool Crib Supervisor.`
      },
      {
        id: "chunk-gmm-7-3",
        document_id: "doc-gmm-ch7",
        org_id: "org-skywings-aero",
        chunk_index: 2,
        section_title: "Chapter 7.3 - Out-of-Tolerance Tools and Recalls",
        content: `SkyWings Maintenance Chapter 7.3: Out-of-Tolerance Investigation
Whenever a tool returned from calibration is marked 'Out-of-Tolerance', the Quality Assurance Manager must be notified within 48 hours.
A tool recall review will be conducted to identify any aircraft or components worked on using that tool during the prior thirty (30) days. An internal safety assessment will determine if re-torque or re-inspection is required.`
      }
    ]
  },
  {
    document: {
      id: "doc-pilot-contract",
      org_id: "org-skywings-aero",
      title: "Commercial Pilot Employment Agreement & Duty Policy",
      document_type: "EMPLOYMENT_CONTRACT",
      file_path: "/contracts/pilot-employment-agreement-standard.pdf",
      file_size: 1950000,
      mime_type: "application/pdf",
      revision_number: "Ver 4.1",
      effective_date: "2024-01-01",
      status: "indexed",
      chunks_count: 2,
      regulatory_source: "14 CFR Part 117 / Part 111 / Part 120",
      created_at: "2024-01-15T11:00:00Z"
    },
    chunks: [
      {
        id: "chunk-pilot-1",
        document_id: "doc-pilot-contract",
        org_id: "org-skywings-aero",
        chunk_index: 0,
        section_title: "Section 4 - Flight Duty Limits, Fatigue Declaration & Rest",
        content: `SkyWings Pilot Agreement Section 4: Flight & Duty Limitations (FAR Part 117)
The Pilot agrees to report for scheduled flight duty only when properly rested and fit for duty.
(a) The Company covenants that no flight duty period will be scheduled without providing at least ten (10) consecutive hours of rest immediately preceding duty, including eight (8) uninterrupted hours of quiet rest opportunity.
(b) Fatigue Invocation Clause: The Pilot possesses the absolute statutory right to invoke a Fatigue Call without suffering monetary fine, disciplinary penalty, or contractual forfeiture.
(c) The Pilot shall not engage in secondary commercial aviation flight duties (moonlighting) without advance written consent from the Chief Pilot.`
      },
      {
        id: "chunk-pilot-2",
        document_id: "doc-pilot-contract",
        org_id: "org-skywings-aero",
        chunk_index: 1,
        section_title: "Section 8 - Mandatory Drug Testing & Pilot Records Database (PRD) Consent",
        content: `SkyWings Pilot Agreement Section 8: Regulatory Screening & Background Consents
(a) PRD Consent: The Pilot authorizes the Company to query the FAA Pilot Records Database (PRD) pursuant to 14 CFR Part 111 prior to hire and on an annual audit basis, consenting to disclosure of previous employer training records, FAA enforcement histories, and check ride failures.
(b) DOT Drug & Alcohol Testing: The Pilot acknowledges safety-sensitive status under 14 CFR Part 120 and consents to unannounced random, post-incident, and reasonable cause breath alcohol and urinalysis screening under DOT 49 CFR Part 40. Refusal to test constitutes immediate termination for gross misconduct.`
      }
    ]
  },
  {
    document: {
      id: "doc-ap-tech-contract",
      org_id: "org-skywings-aero",
      title: "Aircraft Maintenance Technician (A&P) Employment Contract",
      document_type: "EMPLOYMENT_CONTRACT",
      file_path: "/contracts/ap-mechanic-agreement.pdf",
      file_size: 1680000,
      mime_type: "application/pdf",
      revision_number: "Ver 3.0",
      effective_date: "2023-10-01",
      status: "indexed",
      chunks_count: 2,
      regulatory_source: "14 CFR Part 65 / Part 145 / Part 120",
      created_at: "2023-10-15T08:30:00Z"
    },
    chunks: [
      {
        id: "chunk-ap-1",
        document_id: "doc-ap-tech-contract",
        org_id: "org-skywings-aero",
        chunk_index: 0,
        section_title: "Section 3 - FAA Certification, License Currency & Training",
        content: `SkyWings A&P Agreement Section 3: Technician Qualifications & Mandates
(a) The Technician must maintain a valid FAA Mechanic Certificate with Airframe and Powerplant ratings under 14 CFR Part 65, carrying the physical certificate on their person during all hangar and line maintenance shifts.
(b) The Technician agrees to complete initial and annual recurrent training mandated by 14 CFR § 145.163, including Human Factors in Aviation Maintenance, Electrical Wiring Interconnect Systems (EWIS), and Fuel Tank Safety (FTS).`
      },
      {
        id: "chunk-ap-2",
        document_id: "doc-ap-tech-contract",
        org_id: "org-skywings-aero",
        chunk_index: 1,
        section_title: "Section 7 - Tool Accountability, OEM Data Rights & Drug Testing",
        content: `SkyWings A&P Agreement Section 7: Maintenance Data & Regulatory Compliance
(a) Maintenance Data Protection: Technician agrees to use only current OEM Aircraft Maintenance Manuals (AMM) and engineering orders, and covenants not to copy, exfiltrate, or disseminate proprietary technical instructions.
(b) Substance Testing: In accordance with FAA 14 CFR Part 120, the Technician agrees to continuous inclusion in the random drug and alcohol testing pool. Confirmed positive tests or tampering with specimens results in immediate FAA notification and termination.`
      }
    ]
  },
  {
    document: {
      id: "doc-hr-handbook",
      org_id: "org-skywings-aero",
      title: "Aviation Personnel HR Handbook & Just Culture Policy",
      document_type: "HR_POLICY",
      file_path: "/manuals/hr-handbook-just-culture.pdf",
      file_size: 2890000,
      mime_type: "application/pdf",
      revision_number: "Rev 5.2",
      effective_date: "2024-02-01",
      status: "indexed",
      chunks_count: 2,
      regulatory_source: "14 CFR Part 5 / Part 120 / OSHA 1910",
      created_at: "2024-02-15T14:00:00Z"
    },
    chunks: [
      {
        id: "chunk-hr-1",
        document_id: "doc-hr-handbook",
        org_id: "org-skywings-aero",
        chunk_index: 0,
        section_title: "Chapter 2 - Just Culture & Disciplinary Protections",
        content: `SkyWings HR Handbook Chapter 2: Just Culture & Safety Investigation Immunity
SkyWings strictly observes an FAA Part 5 / ICAO Annex 19 Just Culture framework:
(a) Non-Punitive Disclosure: No employee shall face disciplinary suspension, termination, or career reprisal for self-reporting unintentional operational errors, maintenance slips, or safety near-misses.
(b) Disciplinary Exceptions: Protections are void only in cases of verified gross negligence, willful sabotage, criminal activity, or reporting under the influence of illicit substances or alcohol.`
      },
      {
        id: "chunk-hr-2",
        document_id: "doc-hr-handbook",
        org_id: "org-skywings-aero",
        chunk_index: 1,
        section_title: "Chapter 6 - DOT & FAA Mandatory Substance Abuse Program",
        content: `SkyWings HR Handbook Chapter 6: Drug & Alcohol Policy Standards
All employees classified in safety-sensitive positions must comply with the Company's FAA-approved Antidrug and Alcohol Misuse Prevention Plan (A449 OpSpec):
(a) Pre-employment screening is mandatory with verified negative MRO result before badge issuance.
(b) Random testing rate is maintained at or above FAA annual minimums (50% drug, 10% alcohol).
(c) Prescription Drug Reporting: Technicians and pilots must notify the Aviation Medical Review Officer (MRO) before working while taking prescription medications with sedation warnings.`
      }
    ]
  },
  {
    document: {
      id: "doc-sms-ch3",
      org_id: "org-skywings-aero",
      title: "Safety Management System (SMS) Manual - Ch 3: Hazard Reporting",
      document_type: "SMS",
      file_path: "/manuals/sms-manual-ch3-hazard-reporting.pdf",
      file_size: 1840200,
      mime_type: "application/pdf",
      revision_number: "Rev 6.0",
      effective_date: "2024-02-01",
      status: "indexed",
      chunks_count: 2,
      regulatory_source: "FAA 14 CFR Part 5 / ICAO Annex 19",
      created_at: "2024-02-05T10:00:00Z"
    },
    chunks: [
      {
        id: "chunk-sms-3-1",
        document_id: "doc-sms-ch3",
        org_id: "org-skywings-aero",
        chunk_index: 0,
        section_title: "Chapter 3.1 - Non-Punitive Hazard Reporting Policy",
        content: `SkyWings Aviation SMS Manual Chapter 3.1: Voluntary Hazard Reporting
In accordance with our Safety Policy signed by the Accountable Executive, SkyWings fosters an open, just culture.
Employees are encouraged to report near-misses, procedural ambiguities, and safety hazards through the Aviation Safety Action Program (ASAP) or the internal anonymous portal.
SkyWings will not initiate disciplinary action against any employee for disclosing an unintentional error or safety hazard, provided the act did not involve intentional non-compliance, gross negligence, criminal conduct, or substance abuse.`
      },
      {
        id: "chunk-sms-3-2",
        document_id: "doc-sms-ch3",
        org_id: "org-skywings-aero",
        chunk_index: 1,
        section_title: "Chapter 3.2 - Safety Risk Assessment Matrix and Escalation",
        content: `SkyWings Aviation SMS Manual Chapter 3.2: Risk Assessment and Escalation
All reported hazards are assigned a Risk Index using our 5x5 Likelihood vs Severity Matrix:
- Severity: Catastrophic (A), Hazardous (B), Major (C), Minor (D), Negligible (E).
- Probability: Frequent (5), Occasional (4), Remote (3), Improbable (2), Extremely Improbable (1).
Hazards evaluated as High Risk (Red: 5A, 5B, 4A, etc.) require immediate mitigation actions approved by the Safety Review Board (SRB) within 72 hours before operational resumption.`
      }
    ]
  }
];
