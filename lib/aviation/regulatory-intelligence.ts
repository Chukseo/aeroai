import { RegulationChange, ImpactAssessment, AffectedDocumentProcedure } from "@/types";
import { SAMPLE_INTERNAL_MANUALS } from "./sample-manuals";

// Pre-seeded Active Regulatory Amendments (FAA, EASA, ICAO, DOT)
export const SEEDED_REGULATION_CHANGES: RegulationChange[] = [
  {
    id: "chg-faa-145-163-2024",
    regulation_code: "14 CFR § 145.163(c)",
    authority: "FAA",
    title: "Maintenance Personnel Training Record Retention Period Revised",
    category: "Personnel & Training",
    published_date: "2024-03-01",
    effective_date: "2024-04-15",
    severity: "high",
    is_new_policy: false,
    summary_what_changed: "FAA amended 14 CFR § 145.163(c) increasing mandatory retention period for employee maintenance training records from twenty-four (24) months to thirty-six (36) months post-employment, and added mandatory human factors recurrent syllabi tracking.",
    old_version_text: `(c) The repair station must document, maintain, and update training records for each employee in a format acceptable to the Administrator, and retain all training records for at least twenty-four (24) months from the date the training occurred or until the employee ceases employment.`,
    new_version_text: `(c) The repair station must document, maintain, and update training records for each employee in a format acceptable to the Administrator. The repair station must retain all detailed training records, course completions, and human factors certifications for at least thirty-six (36) months from the date the person ceases employment with the repair station.`,
    affected_operators: ["Part 145 Certificated Repair Stations", "Part 121 Air Carriers with internal maintenance"],
    affected_departments: ["Training Department", "Quality Assurance", "Maintenance Administration", "Human Resources"],
  },
  {
    id: "chg-faa-117-25-2024",
    regulation_code: "14 CFR § 117.25(b)",
    authority: "FAA",
    title: "Flight Crew Rest Period: Mandatory 8-Hour Uninterrupted Quiet Sleep Opportunity",
    category: "Flight Operations & Crew Rest",
    published_date: "2024-02-15",
    effective_date: "2024-03-30",
    severity: "critical",
    is_new_policy: false,
    summary_what_changed: "FAA issued clarification amendment under FAR Part 117 establishing that employer telephone calls, automated dispatch messages, or electronic scheduling updates during a flight crewmember's 8-hour sleep opportunity invalidate the entire 10-hour rest period, requiring immediate 10-hour reset before flight duty.",
    old_version_text: `(b) The 10-hour rest period must provide the flightcrew member with a minimum of 8 uninterrupted hours of sleep opportunity.`,
    new_version_text: `(b) The 10-hour rest period must provide the flightcrew member with a minimum of 8 uninterrupted hours of sleep opportunity. During this 8-hour window, the certificate holder shall strictly refrain from initiating any telephone, electronic, or in-person contact with the flightcrew member. Any employer-initiated contact breaks the continuity of sleep opportunity, invalidates the statutory rest period, and requires a full 10-hour reset prior to duty assignment.`,
    affected_operators: ["14 CFR Part 121 Air Carriers", "14 CFR Part 135 Commuter & On-Demand"],
    affected_departments: ["Flight Operations", "Crew Scheduling", "Dispatch", "Flight Crew (Pilots)"],
  },
  {
    id: "chg-dot-part40-oral-fluid",
    regulation_code: "DOT 49 CFR Part 40 / 14 CFR Part 120",
    authority: "DOT",
    title: "Authorization of Oral Fluid Drug Testing for Safety-Sensitive Aviation Employees",
    category: "Drug & Alcohol Policy",
    published_date: "2024-01-20",
    effective_date: "2024-03-01",
    severity: "medium",
    is_new_policy: true,
    summary_what_changed: "Department of Transportation and FAA published final rule authorizing certified laboratories to conduct oral fluid (saliva) testing as an alternative to urine collection for pre-employment, random, and post-accident drug screening for safety-sensitive aviation staff.",
    old_version_text: `Safety-sensitive drug screening must be conducted via DOT certified laboratory urinalysis collection protocols in accordance with 49 CFR Part 40 Subpart E.`,
    new_version_text: `Safety-sensitive drug screening may be conducted utilizing either DOT-certified laboratory urinalysis or laboratory oral fluid testing procedures in accordance with 49 CFR Part 40 Subpart E and Subpart F. Employers must update written Anti-Drug and Alcohol Misuse Prevention Plans (A449) and employment consent agreements prior to deploying oral fluid collections.`,
    affected_operators: ["Part 121 Air Carriers", "Part 135 Operators", "Part 145 Repair Stations"],
    affected_departments: ["Human Resources", "Safety Management (SMS)", "Occupational Health"],
  },
  {
    id: "chg-easa-camo-2024",
    regulation_code: "EASA Part-CAMO.A.305(g)",
    authority: "EASA",
    title: "Continuing Airworthiness: Digital Maintenance Record Verification & Cyber Resilience",
    category: "Airworthiness & Engineering",
    published_date: "2024-02-10",
    effective_date: "2024-05-01",
    severity: "high",
    is_new_policy: false,
    summary_what_changed: "EASA amended Part-CAMO requiring organizations to implement automated cryptographical verification of electronic CRS (Certificate of Release to Service) and maintenance records to ensure integrity and defense against digital alteration.",
    old_version_text: `(g) The organisation shall establish and control the competence of personnel involved in continuing airworthiness management in accordance with a procedure and to a standard agreed by the competent authority.`,
    new_version_text: `(g) The organisation shall establish and control the competence of personnel involved in continuing airworthiness management and electronic technical records verification. The organisation must implement verified cryptographic integrity procedures ensuring electronic aircraft logbook data and Form 1 certificates cannot be modified, deleted, or falsified.`,
    affected_operators: ["EASA Part-CAMO Organizations", "Dual FAA/EASA Repair Stations"],
    affected_departments: ["Technical Records", "Quality Assurance", "Information Security"],
  }
];

// Cross-Mapping Engine: Detects which internal company manuals & contracts are affected by each change
export function crossMapRegulatoryChange(change: RegulationChange): ImpactAssessment {
  const affectedProcedures: AffectedDocumentProcedure[] = [];
  const actionPlan: string[] = [];

  if (change.id === "chg-faa-145-163-2024") {
    // 1. Affects Training & A&P Maintenance agreements
    affectedProcedures.push({
      document_id: "doc-ap-tech-contract",
      document_title: "Aircraft Maintenance Technician (A&P) Employment Contract",
      section_ref: "Section 3(b) - Recurrent Training & Records",
      current_internal_text: `The Technician agrees to complete initial and annual recurrent training mandated by 14 CFR § 145.163... Training records retained in company portal for twelve (12) to twenty-four (24) months.`,
      compliance_status: "outdated",
      draft_procedural_fix: `Section 3(b): "The Technician agrees to complete initial and annual recurrent training mandated by 14 CFR § 145.163, including Human Factors in Aviation Maintenance. In compliance with revised 14 CFR § 145.163(c), the Company shall preserve all technician qualification records, recurrent course completions, and authorization certifications for thirty-six (36) months following separation from employment."`,
      risk_implication: "Direct FAA Part 145 audit finding during Flight Standards surveillance; potential citation for premature destruction of qualification files.",
    });

    affectedProcedures.push({
      document_id: "doc-gmm-ch7",
      document_title: "General Maintenance Manual (GMM)",
      section_ref: "Chapter 4.4 - Maintenance Personnel Training Administration",
      current_internal_text: `Technician training files are maintained by the Tool Crib & QA Training Supervisor and retained for a minimum of 24 months post-employment.`,
      compliance_status: "non_compliant",
      draft_procedural_fix: `Chapter 4.4: "All employee maintenance training records, OJT sign-offs, and human factors recurrent certifications shall be archived in the Electronic Records System and retained for thirty-six (36) months from the date the individual ceases employment with the repair station."`,
      risk_implication: "Failure to produce 36-month training trail during accident investigation or airworthiness review.",
    });

    actionPlan.push("Issue Engineering Quality Notice QN-2024-03 to all Maintenance Supervisors.");
    actionPlan.push("Update GMM Chapter 4.4 text with draft wording and submit Revision 14.3 to FAA PMI.");
    actionPlan.push("Amend standard A&P Technician Employment Contract template in HR onboarding portal.");
  } else if (change.id === "chg-faa-117-25-2024") {
    // 2. Affects Pilot Agreement & Flight Ops Manual
    affectedProcedures.push({
      document_id: "doc-pilot-contract",
      document_title: "Commercial Pilot Employment Agreement & Duty Policy",
      section_ref: "Section 4(a) - Rest Periods & Employer Contact",
      current_internal_text: `The Company covenants that no flight duty period will be scheduled without providing at least ten (10) consecutive hours of rest immediately preceding duty, including eight (8) uninterrupted hours of quiet rest opportunity.`,
      compliance_status: "non_compliant",
      draft_procedural_fix: `Section 4(a): "The Company guarantees each Pilot a rest period of at least ten (10) consecutive hours prior to reporting for any flight duty, containing at least eight (8) uninterrupted hours of quiet sleep opportunity. The Company strictly covenants that during this 8-hour sleep opportunity, no supervisor, dispatcher, or crew scheduler shall initiate contact with the Pilot via telephone, electronic messaging, or in person. Any company-initiated contact automatically invalidates the rest period and initiates an immediate 10-hour reset."`,
      risk_implication: "Major FAA enforcement risk: Crew scheduling contact during rest legally voids the rest period, making subsequent flight operations illegal under FAR § 117.25.",
    });

    actionPlan.push("Implement automated software block in Crew Scheduling software preventing calls during 8-hour sleep windows.");
    actionPlan.push("Execute Pilot Agreement Amendment Rider P-2024 with all active line flight crew.");
    actionPlan.push("Brief Flight Operations Duty Managers and Chief Pilot on mandatory 10-hour reset protocol.");
  } else if (change.id === "chg-dot-part40-oral-fluid") {
    // 3. Affects HR Handbook & Drug/Alcohol policy
    affectedProcedures.push({
      document_id: "doc-hr-handbook",
      document_title: "Aviation Personnel HR Handbook & Just Culture Policy",
      section_ref: "Chapter 6(a) - Testing Methodologies",
      current_internal_text: `Pre-employment screening is mandatory with verified negative MRO result before badge issuance through certified laboratory urinalysis.`,
      compliance_status: "requires_review",
      draft_procedural_fix: `Chapter 6(a): "Pre-employment, random, and post-accident substance screening shall be conducted in accordance with DOT 49 CFR Part 40 utilizing either certified laboratory urinalysis or oral fluid (saliva) collection methodologies as designated by the Company Medical Review Officer (MRO)."`,
      risk_implication: "Inability to leverage rapid oral fluid testing at remote line stations; potential procedural challenge from employees if oral fluid is utilized without handbook authorization.",
    });

    actionPlan.push("Submit updated OpSpec A449 Antidrug Program revision to FAA Drug Abatement Division.");
    actionPlan.push("Update Chapter 6 of the Employee Handbook and distribute digital acknowledgment to all safety-sensitive staff.");
  } else {
    // EASA CAMO change
    affectedProcedures.push({
      document_id: "doc-gmm-ch7",
      document_title: "General Maintenance Manual (GMM)",
      section_ref: "Chapter 7.2 - Electronic Calibration Records & Verification",
      current_internal_text: `Calibration certificates are received digitally and archived in the MRO Tool Management Portal.`,
      compliance_status: "requires_review",
      draft_procedural_fix: `Chapter 7.2: "All digital calibration certificates and electronic maintenance releases must undergo cryptographic hash verification (SHA-256) upon upload to guarantee records integrity against unauthorized modification pursuant to EASA Part-CAMO.A.305(g)."`,
      risk_implication: "EASA ACAM surveillance audit finding regarding cyber resilience of continuing airworthiness records.",
    });

    actionPlan.push("Enable SHA-256 certificate hashing on MRO Tool Management Portal uploads.");
    actionPlan.push("Update Quality Assurance Manual Section 9.1 with cryptographic audit verification procedure.");
  }

  return {
    id: `ia-${change.id}`,
    change_id: change.id,
    organization_id: "org-skywings-aero",
    regulation_change: change,
    overall_risk_level: change.severity,
    affected_procedures: affectedProcedures,
    executive_action_plan: actionPlan,
    status: "pending_review",
    created_at: new Date().toISOString(),
  };
}

// Get all active assessments across seeded changes
export function getAllImpactAssessments(): ImpactAssessment[] {
  return SEEDED_REGULATION_CHANGES.map((chg) => crossMapRegulatoryChange(chg));
}
