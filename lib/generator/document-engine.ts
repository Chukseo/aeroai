import {
  DocGenCategory,
  DocGenType,
  USAviationSector,
  GeneratedDocument,
  DocumentClause,
} from "@/types";

export interface GenerateDocOptions {
  prompt?: string;
  category?: DocGenCategory;
  doc_type?: DocGenType;
  jurisdiction?: USAviationSector;
  company_name?: string;
  counterparty_name?: string;
  job_title?: string;
  compensation?: string;
  probation_period?: string;
  notice_period?: string;
  benefits?: string;
  governing_law_override?: string;
  custom_clauses?: string[];
  tone?: "standard_legal" | "plain_english" | "executive" | "protective";
}

// ==============================================================================
// 1. Natural Language Prompt Parser (US Aviation Domain)
// ==============================================================================
export function parseNaturalLanguagePrompt(prompt: string): Partial<GenerateDocOptions> {
  const p = prompt.toLowerCase();
  const options: Partial<GenerateDocOptions> = {};

  // Detect Aviation Sector
  if (p.includes("121") || p.includes("airline") || p.includes("carrier") || p.includes("flight crew") || p.includes("pilot")) {
    options.jurisdiction = "FAA_PART_121";
  } else if (p.includes("135") || p.includes("charter") || p.includes("on-demand") || p.includes("commuter")) {
    options.jurisdiction = "FAA_PART_135";
  } else if (p.includes("145") || p.includes("mro") || p.includes("repair station") || p.includes("mechanic") || p.includes("a&p") || p.includes("technician")) {
    options.jurisdiction = "FAA_PART_145";
  } else if (p.includes("91") || p.includes("corporate flight") || p.includes("business jet")) {
    options.jurisdiction = "FAA_PART_91";
  } else {
    options.jurisdiction = "FAA_PART_121";
  }

  // Detect Category & Document Type
  if (p.includes("pilot") || p.includes("first officer") || p.includes("captain")) {
    options.category = "employment_recruitment";
    options.doc_type = "pilot_employment_contract";
    options.job_title = p.includes("captain") ? "Airline Captain" : "First Officer";
  } else if (p.includes("mechanic") || p.includes("a&p") || p.includes("technician")) {
    options.category = "employment_recruitment";
    options.doc_type = "mechanic_ap_contract";
    options.job_title = "Aircraft Maintenance Technician (A&P)";
  } else if (p.includes("dispatcher")) {
    options.category = "employment_recruitment";
    options.doc_type = "dispatcher_contract";
    options.job_title = "Flight Dispatcher";
  } else if (p.includes("nda") || p.includes("non-disclosure") || p.includes("confidentiality")) {
    options.category = "employment_recruitment";
    options.doc_type = "nda";
  } else if (p.includes("consultant") || p.includes("consulting")) {
    options.category = "employment_recruitment";
    options.doc_type = "consultant_agreement";
  } else if (p.includes("offer letter")) {
    options.category = "employment_recruitment";
    options.doc_type = "offer_letter";
  } else if (p.includes("pip") || p.includes("performance improvement")) {
    options.category = "employee_lifecycle";
    options.doc_type = "pip";
  } else if (p.includes("warning")) {
    options.category = "employee_lifecycle";
    options.doc_type = "warning_letter";
  } else if (p.includes("promotion")) {
    options.category = "employee_lifecycle";
    options.doc_type = "promotion_letter";
  } else if (p.includes("termination")) {
    options.category = "employee_lifecycle";
    options.doc_type = "termination_letter";
  } else if (p.includes("just culture") || p.includes("safety policy") || p.includes("sms")) {
    options.category = "policies_governance";
    options.doc_type = "just_culture_policy";
  } else if (p.includes("drug") || p.includes("alcohol") || p.includes("dot testing")) {
    options.category = "policies_governance";
    options.doc_type = "dot_drug_alcohol_policy";
  } else if (p.includes("fatigue") || p.includes("frms") || p.includes("rest")) {
    options.category = "policies_governance";
    options.doc_type = "fatigue_risk_management_policy";
  } else if (p.includes("sop") || p.includes("standard operating procedure")) {
    options.category = "business_operations";
    options.doc_type = "sop";
  } else if (p.includes("vendor") || p.includes("supplier") || p.includes("calibration agreement")) {
    options.category = "business_operations";
    options.doc_type = "vendor_agreement";
  } else {
    options.category = "employment_recruitment";
    options.doc_type = "employment_contract";
  }

  // Extract Compensation ($ USD)
  const compMatch = prompt.match(/(\$|USD)\s?[\d,]+(\.\d+)?(\s?(per year|annually|\/yr|annual base|per month|monthly|\/mo|per hour|\/hr|hourly))?/i);
  if (compMatch) {
    options.compensation = compMatch[0];
  }

  // Extract Job Title if not already set
  if (!options.job_title) {
    const titlePatterns = [
      /First Officer|Captain|Senior Software Engineer|Quality Assurance Inspector|Chief Inspector|A&P Technician|Aircraft Mechanic|Flight Dispatcher|Director of Safety|Line Maintenance Lead/i
    ];
    for (const pattern of titlePatterns) {
      const match = prompt.match(pattern);
      if (match) {
        options.job_title = match[0];
        break;
      }
    }
  }

  // Extract Probation Period
  const probMatch = prompt.match(/(\d+[\s-]*(?:month|day|week|year)s?)\s*probation/i);
  if (probMatch) {
    options.probation_period = probMatch[1] + " probationary period";
  }

  // Extract Notice Period
  const noticeMatch = prompt.match(/(\d+[\s-]*(?:day|month|week)s?)\s*notice/i);
  if (noticeMatch) {
    options.notice_period = noticeMatch[1] + " written notice";
  }

  return options;
}

// ==============================================================================
// 2. US Aviation Regulatory Frameworks
// ==============================================================================
export const US_AVIATION_FRAMEWORKS: Record<USAviationSector, {
  label: string;
  governing_law: string;
  primary_regulations: string[];
  statutory_notes: string[];
}> = {
  FAA_PART_121: {
    label: "US Commercial Air Carrier (14 CFR Part 121)",
    governing_law: "Federal Aviation Act, 14 CFR Part 121, and Applicable State Law",
    primary_regulations: [
      "14 CFR Part 117 (Flight & Duty Limitations and Rest Requirements)",
      "14 CFR Part 120 / DOT 49 CFR Part 40 (Drug and Alcohol Testing Program)",
      "14 CFR Part 111 (Pilot Records Database - PRD Mandatory Pre-Hire Query)",
      "14 CFR Part 5 (Safety Management Systems - Just Culture & Hazard Reporting)"
    ],
    statutory_notes: [
      "FAR § 117.25(b) strictly mandates a 10-hour rest period with a minimum of 8 uninterrupted hours of quiet sleep opportunity prior to flight duty.",
      "Any employer-initiated contact (phone, text, dispatch) during the 8-hour sleep window invalidates statutory rest, requiring a full 10-hour reset.",
      "14 CFR Part 111 requires air carriers to query and evaluate Pilot Records Database (PRD) historical training, checks, and disciplinary files before permitting duty.",
      "DOT 49 CFR Part 40 / 14 CFR Part 120 requires mandatory pre-employment, random, and reasonable cause drug and alcohol screening for safety-sensitive personnel.",
      "14 CFR § 5.21(a)(4) mandates non-punitive employee hazard reporting protections signed by the Accountable Executive."
    ]
  },
  FAA_PART_135: {
    label: "US Commuter & On-Demand Operator (14 CFR Part 135)",
    governing_law: "Federal Aviation Act, 14 CFR Part 135, and Applicable State Law",
    primary_regulations: [
      "14 CFR § 135.263 / § 135.265 (Flight Time Limitations and Rest Requirements)",
      "14 CFR Part 120 & DOT 49 CFR Part 40 (Safety-Sensitive Substance Testing)",
      "14 CFR Part 111 (PRD Pre-Employment Hiring Review)",
      "14 CFR Part 5 (Safety Management Systems for Part 135 Certificate Holders)"
    ],
    statutory_notes: [
      "Flight time limitations and mandatory rest intervals under 14 CFR §§ 135.263-273 must be strictly maintained.",
      "Mandatory unannounced random drug and alcohol screening pool participation required under OpSpec A449.",
      "All flight crews must maintain valid FAA First or Second Class Medical Certificates."
    ]
  },
  FAA_PART_145: {
    label: "US Certificated Repair Station / MRO (14 CFR Part 145)",
    governing_law: "Federal Aviation Act, 14 CFR Part 145, 14 CFR Part 43, and State Law",
    primary_regulations: [
      "14 CFR Part 65 (Airmen Other Than Flight Crewmembers - A&P Certification)",
      "14 CFR § 145.109 (Equipment, Materials, and NIST Calibration Requirements)",
      "14 CFR § 145.163 (Training Program Requirements & Human Factors)",
      "14 CFR § 145.219 (Maintenance Recordkeeping - Mandatory 2-Year Retention)",
      "14 CFR Part 120 (Drug and Alcohol Testing for Repair Station Maintenance Staff)"
    ],
    statutory_notes: [
      "Technicians must hold active FAA Airframe & Powerplant (A&P) certificates under Part 65 to exercise return-to-service authority.",
      "14 CFR § 145.109(c) requires all precision tools to be calibrated to National Institute of Standards and Technology (NIST) traceable standards.",
      "14 CFR § 145.219(c) strictly mandates maintenance records and airworthiness releases be retained for at least 2 years (24 months).",
      "Mandatory initial and recurrent Human Factors, EWIS, and Fuel Tank Safety training under 14 CFR § 145.163."
    ]
  },
  FAA_PART_91: {
    label: "US Corporate & General Aviation (14 CFR Part 91)",
    governing_law: "14 CFR Part 91, IS-BAO Industry Standards, and State Law",
    primary_regulations: [
      "14 CFR Part 91 (General Operating and Flight Rules)",
      "14 CFR § 91.409 (Inspections & Continuous Airworthiness)",
      "International Standard for Business Aircraft Operations (IS-BAO)"
    ],
    statutory_notes: [
      "Flight crew duty and rest guidelines recommended under IS-BAO Stage 2/3 and NBAA Management specifications.",
      "Aircraft maintenance must adhere strictly to OEM continuous airworthiness inspection schedules."
    ]
  },
  US_AEROSPACE: {
    label: "US Aerospace & Defense Manufacturing (AS9100 / FAA Part 21)",
    governing_law: "14 CFR Part 21 (Certification Procedures for Products and Articles), AS9100D",
    primary_regulations: [
      "14 CFR Part 21 (FAA Type & Production Certification)",
      "AS9100 Rev D Quality Management Systems",
      "ITAR / EAR Export Control Regulations"
    ],
    statutory_notes: [
      "Compliance with International Traffic in Arms Regulations (ITAR) and Export Administration Regulations (EAR).",
      "Counterfeit parts prevention and scrap material destruction protocols under FAA AC 21-29."
    ]
  }
};

// ==============================================================================
// 3. Document Synthesis Engine (US Aviation Standard)
// ==============================================================================
export function generateProfessionalDocument(opts: GenerateDocOptions): GeneratedDocument {
  const parsed = opts.prompt ? parseNaturalLanguagePrompt(opts.prompt) : {};

  const category = opts.category || parsed.category || "employment_recruitment";
  const docType = opts.doc_type || parsed.doc_type || "pilot_employment_contract";
  const jurisdiction = opts.jurisdiction || parsed.jurisdiction || "FAA_PART_121";
  const fw = US_AVIATION_FRAMEWORKS[jurisdiction] || US_AVIATION_FRAMEWORKS.FAA_PART_121;

  const companyName = opts.company_name || "AeroSky Global Air Operations & MRO, LLC";
  const counterpartyName = opts.counterparty_name || (docType.includes("pilot") ? "Captain Robert Vance" : "Marcus Chen, A&P");
  const jobTitle = opts.job_title || parsed.job_title || (docType.includes("pilot") ? "First Officer (Boeing 737 / Airbus A320)" : "Aircraft Maintenance Technician (A&P)");
  const compensation = opts.compensation || parsed.compensation || (docType.includes("pilot") ? "$145,000 per year" : "$48.50 per hour ($100,880 annual base)");
  const probationPeriod = opts.probation_period || parsed.probation_period || "6 months";
  const noticePeriod = opts.notice_period || parsed.notice_period || "30 days";
  const benefits = opts.benefits || parsed.benefits || "Comprehensive Flight Medical & Dental Insurance, 401(k) Retirement Plan with 6% Company Match, Loss of License Insurance, and 20 Days Paid Leave";
  const governingLaw = opts.governing_law_override || fw.governing_law;
  const effectiveDate = new Date().toISOString().split("T")[0];

  const clauses: DocumentClause[] = [];
  let title = "";
  const complianceNotes: string[] = [...fw.statutory_notes];
  const riskWarnings: string[] = [];

  // ----------------------------------------------------------------------------
  // CASE 1: PILOT / FLIGHT CREW EMPLOYMENT CONTRACT (14 CFR Part 121 / 135 / Part 117)
  // ----------------------------------------------------------------------------
  if (docType === "pilot_employment_contract" || (docType === "employment_contract" && jobTitle.toLowerCase().includes("pilot"))) {
    title = `COMMERCIAL FLIGHT CREW EMPLOYMENT AGREEMENT — ${jobTitle.toUpperCase()}`;

    clauses.push({
      id: "cl-pilot-parties",
      title: "1. PARTIES, OPERATING AUTHORITY, AND ENGAGEMENT",
      category: "standard",
      is_mandatory: true,
      body: `This Commercial Flight Crew Employment Agreement (the "Agreement") is executed on ${effectiveDate}, by and between:
(1) ${companyName}, a certificated United States Air Carrier operating pursuant to ${fw.label}, with its flight operations headquarters in Fort Worth, Texas (the "Company" or "Carrier"); and
(2) ${counterpartyName}, an FAA-certificated commercial aviator holding an active Airline Transport Pilot (ATP) or Commercial Pilot Certificate (the "Pilot" or "Flight Crewmember").

WHEREAS, the Company desires to engage the Pilot as ${jobTitle}, and the Pilot desires to perform flight duties in compliance with Title 14 Code of Federal Regulations (14 CFR) and Company Operations Specifications (OpSpecs).`
    });

    clauses.push({
      id: "cl-pilot-prd",
      title: "2. PILOT RECORDS DATABASE (PRD) & FAA BACKGROUND SCREENING",
      category: "compliance",
      is_mandatory: true,
      body: `(a) Statutory PRD Mandate: In strict accordance with 14 CFR Part 111, the Carrier must query and evaluate all historical records maintained in the FAA Pilot Records Database (PRD) prior to permitting the Pilot to act as a required flight crewmember.
(b) Irrevocable Consent: The Pilot hereby provides written authorization and consent for the Carrier to access their complete PRD profile, including FAA pilot certificates, ratings, medical limitations, check-ride failures, historical flight training records from prior Part 121/135 employers, and past DOT drug and alcohol testing violation records.
(c) Condition Precedent: Continued employment is strictly contingent upon a clear PRD assessment verified by the Chief Pilot and Director of Operations.`
    });

    clauses.push({
      id: "cl-pilot-rest-fatigue",
      title: "3. FLIGHT & DUTY LIMITATIONS, REST PERIODS & FATIGUE INVOCATION (FAR PART 117)",
      category: "compliance",
      is_mandatory: true,
      body: `(a) Mandatory Pre-Duty Rest: Pursuant to 14 CFR § 117.25, the Carrier covenants that no flight duty period (FDP) or reserve assignment shall be scheduled without providing the Pilot a rest period of at least ten (10) consecutive hours immediately preceding duty.
(b) 8-Hour Quiet Sleep Opportunity & Non-Contact Protection: The 10-hour rest period must guarantee the Pilot a minimum of eight (8) uninterrupted hours of quiet sleep opportunity. The Carrier strictly covenants that during this 8-hour window, no supervisor, crew scheduler, or dispatcher shall initiate telephone, electronic, or in-person contact with the Pilot. Any employer-initiated contact breaks the continuity of rest, invalidates the statutory rest period, and mandates a full 10-hour reset before flight assignment.
(c) Non-Punitive Fatigue Declaration: Pursuant to the Carrier's FAA-approved Fatigue Risk Management System (FRMS), the Pilot possesses the absolute statutory right to declare fatigue whenever they deem themselves unfit for flight. The Carrier covenants that a good-faith fatigue call shall never result in disciplinary reprisal, demotion, or contractual forfeiture.`
    });

    clauses.push({
      id: "cl-pilot-dot-drug",
      title: "4. MANDATORY DOT & FAA DRUG AND ALCOHOL SCREENING (14 CFR PART 120 / 49 CFR PART 40)",
      category: "compliance",
      is_mandatory: true,
      body: `(a) Safety-Sensitive Classification: The Pilot acknowledges classification in a safety-sensitive flight function subject to mandatory substance testing under 14 CFR Part 120 and DOT 49 CFR Part 40.
(b) Testing Consents: The Pilot agrees to submit to:
  (i) Pre-employment screening with a verified negative Medical Review Officer (MRO) result prior to first flight duty;
  (ii) Unannounced random testing throughout each calendar year at minimum rates designated by the FAA Administrator;
  (iii) Reasonable suspicion and mandatory post-accident testing following any reportable aircraft incident.
(c) Zero Tolerance: Refusal to submit to testing, tampering with specimens, or a verified positive drug or alcohol test constitutes immediate grounds for summary termination for gross misconduct and mandatory immediate electronic reporting to the FAA Aeromedical Certification Division and PRD.`
    });

    clauses.push({
      id: "cl-pilot-comp",
      title: "5. COMPENSATION, FLIGHT PAY, AND BENEFITS",
      category: "standard",
      is_mandatory: true,
      body: `(a) Base Compensation: The Carrier agrees to pay the Pilot a salary of ${compensation}, payable semi-monthly in accordance with standard payroll schedules.
(b) Per Diem & Guarantee: The Pilot is guaranteed a minimum of seventy-five (75) flight credit hours per monthly bid period, plus standard domestic/international FAA travel per diem.
(c) Comprehensive Benefits Package: The Pilot shall be entitled to participate in executive benefits, including:
  (i) ${benefits};
  (ii) FAA First-Class Flight Physical reimbursement;
  (iii) Annual recurrent simulator training at an FAA-certificated Part 142 training center.`
    });

    clauses.push({
      id: "cl-pilot-sms",
      title: "6. SAFETY MANAGEMENT SYSTEM (SMS) & JUST CULTURE PROTECTIONS",
      category: "compliance",
      is_mandatory: true,
      body: `(a) 14 CFR Part 5 Compliance: The Carrier operates an FAA-approved Safety Management System (SMS).
(b) Just Culture Disclosure Immunity: Pursuant to 14 CFR § 5.21(a)(4), the Carrier maintains a non-punitive safety reporting policy. The Pilot is protected against disciplinary action, termination, or contractual breach penalties for voluntary, good-faith disclosure of unintentional operational errors or flight deviations, provided the event did not involve intentional non-compliance, criminal conduct, or substance abuse.`
    });

    clauses.push({
      id: "cl-pilot-term-law",
      title: "7. TERMINATION, NOTICE, AND GOVERNING LAW",
      category: "standard",
      is_mandatory: true,
      body: `(a) Probationary Assessment: An initial probationary period of ${probationPeriod} shall apply, during which technical check-ride proficiency and crew resource management (CRM) are evaluated.
(b) Notice: Following probation, either party may terminate this Agreement upon ${noticePeriod} advance written notice.
(c) Governing Law: This Agreement is governed by the ${governingLaw}. Any dispute not resolved through company mediation shall be submitted to the United States District Court or competent federal aviation arbitration forum.`
    });
  }

  // ----------------------------------------------------------------------------
  // CASE 2: AIRCRAFT MAINTENANCE TECHNICIAN (A&P) CONTRACT (14 CFR Part 145 / Part 65)
  // ----------------------------------------------------------------------------
  else if (docType === "mechanic_ap_contract" || (docType === "employment_contract" && jobTitle.toLowerCase().includes("technician"))) {
    title = `AIRCRAFT MAINTENANCE TECHNICIAN (A&P) EMPLOYMENT AGREEMENT — 14 CFR PART 145`;

    clauses.push({
      id: "cl-ap-parties",
      title: "1. PARTIES AND REPAIR STATION SCOPE",
      category: "standard",
      is_mandatory: true,
      body: `This Employment Agreement is entered into on ${effectiveDate}, by and between:
(1) ${companyName}, an FAA Certificated Repair Station operating under 14 CFR Part 145 (Air Agency Certificate #SKW-145-TX), located in Texas, USA (the "Repair Station"); and
(2) ${counterpartyName}, a certificated aviation mechanic holding FAA Airframe & Powerplant (A&P) ratings (the "Technician").`
    });

    clauses.push({
      id: "cl-ap-quals",
      title: "2. FAA AIRMAN CERTIFICATION & PART 65 QUALIFICATIONS",
      category: "compliance",
      is_mandatory: true,
      body: `(a) 14 CFR Part 65 Certification: The Technician must maintain active FAA Mechanic Certification with Airframe and Powerplant ratings in good standing. The Technician covenants to carry their physical airman certificate on their person during all line and heavy hangar maintenance operations.
(b) Recurrent Training Mandate: Pursuant to 14 CFR § 145.163, the Technician must successfully complete initial and annual recurrent training, including Human Factors in Aviation Maintenance, Fuel Tank Safety (FTS), and Electrical Wiring Interconnect Systems (EWIS).`
    });

    clauses.push({
      id: "cl-ap-tooling",
      title: "3. PRECISION TOOL CALIBRATION & NIST TRACEABILITY (14 CFR § 145.109)",
      category: "compliance",
      is_mandatory: true,
      body: `(a) Calibrated Tooling Protocol: The Technician covenants that all precision measurement equipment, torque wrenches, micrometers, and test apparatus used for return-to-service airworthiness determinations must be calibrated to standards traceable to the National Institute of Standards and Technology (NIST).
(b) Prohibited Personal Tools: Technicians are strictly prohibited from utilizing personal uncalibrated hand tools for torque-critical, electrical, or dimensional airworthiness sign-offs.
(c) Out-of-Tolerance Recall: If any tool is discovered out-of-tolerance, the Technician must immediately notify Quality Assurance to initiate a 30-day aircraft lookback investigation.`
    });

    clauses.push({
      id: "cl-ap-records",
      title: "4. MAINTENANCE RECORDS RETENTION (14 CFR § 145.219)",
      category: "compliance",
      is_mandatory: true,
      body: `(a) 2-Year Statutory Retention: In strict compliance with 14 CFR § 145.219(c), all maintenance records, task cards, work orders, FAA Form 8130-3 airworthiness approvals, and return-to-service releases must be preserved in the Repair Station's digital system for at least two (2) years (24 months) from the date of release.
(b) Technical Data Protection: The Technician covenants to utilize only current OEM Aircraft Maintenance Manuals (AMM) and Engineering Orders, and covenants not to photocopy, disseminate, or disclose proprietary aircraft type data.`
    });

    clauses.push({
      id: "cl-ap-drug",
      title: "5. DOT & FAA MANDATORY SUBSTANCE TESTING (14 CFR PART 120)",
      category: "compliance",
      is_mandatory: true,
      body: `The Technician acknowledges performing safety-sensitive maintenance functions and consents to unannounced random, pre-employment, and post-incident drug and alcohol testing in accordance with 14 CFR Part 120 and DOT 49 CFR Part 40. Positive tests or refusal to test results in immediate termination and FAA notification.`
    });

    clauses.push({
      id: "cl-ap-comp-terms",
      title: "6. COMPENSATION, PROBATION, AND GOVERNING LAW",
      category: "standard",
      is_mandatory: true,
      body: `(a) Wage: The Repair Station agrees to pay the Technician ${compensation}, with 1.5x overtime for hours exceeding 40 hours per work week pursuant to the Fair Labor Standards Act (FLSA).
(b) Benefits: Includes ${benefits}.
(c) Probation & Notice: An initial probationary period of ${probationPeriod} shall apply, followed by ${noticePeriod} advance written notice for voluntary resignation.
(d) Governing Law: Governed by the ${governingLaw}.`
    });
  }

  // ----------------------------------------------------------------------------
  // CASE 3: POLICIES & GOVERNANCE (SMS JUST CULTURE, DOT DRUG/ALCOHOL, FATIGUE)
  // ----------------------------------------------------------------------------
  else if (category === "policies_governance") {
    title = `FAA COMPLIANT CORPORATE AVIATION POLICY — ${docType.replace(/_/g, " ").toUpperCase()}`;

    clauses.push({
      id: "cl-pol-1",
      title: "1. REGULATORY AUTHORITY AND OPERATIONAL SCOPE",
      category: "standard",
      is_mandatory: true,
      body: `This policy is promulgated under the authority of the Accountable Executive of ${companyName} in full compliance with ${fw.label} and Title 14 Code of Federal Regulations. It governs all safety-sensitive flight crew, dispatchers, maintenance personnel, and quality inspectors operating in the United States.`
    });

    clauses.push({
      id: "cl-pol-2",
      title: "2. MANDATORY STATUTORY CONTROLS & OVERSIGHT",
      category: "compliance",
      is_mandatory: true,
      body: `(a) Just Culture Protections (14 CFR § 5.21): Employees reporting unintentional procedural errors or safety hazards through the Aviation Safety Action Program (ASAP) or internal safety portal are granted non-punitive immunity from disciplinary suspension or termination.
(b) DOT Workplace Substance Controls (49 CFR Part 40): Zero tolerance is maintained for illicit controlled substances and unauthorized alcohol consumption within eight (8) hours of performing safety-sensitive flight or maintenance functions.
(c) Mandatory Reporting: All personnel must report observed airworthiness discrepancies or fatigue risks immediately to the Chief Inspector or Flight Operations Duty Officer.`
    });

    clauses.push({
      id: "cl-pol-3",
      title: "3. COMPLIANCE AUDIT & QUALITY SURVEILLANCE",
      category: "standard",
      is_mandatory: true,
      body: `The Quality Assurance Department shall conduct unannounced internal audits every six (6) months to verify adherence to this standard. Documented records of audits shall be archived for FAA Principal Inspector review for a minimum of 24 months.`
    });
  }

  // ----------------------------------------------------------------------------
  // CASE 4: BUSINESS OPERATIONS & VENDOR AGREEMENTS (CALIBRATION / PART 145 VENDOR)
  // ----------------------------------------------------------------------------
  else {
    title = `FAA PART 145 AVIATION SERVICES & VENDOR COMPLIANCE AGREEMENT`;

    clauses.push({
      id: "cl-biz-1",
      title: "1. PARTIES AND SCOPE OF AEROSPACE SERVICES",
      category: "standard",
      is_mandatory: true,
      body: `This Vendor Compliance Agreement is entered into on ${effectiveDate}, between ${companyName} ("Carrier/Repair Station") and ${counterpartyName} ("Approved Vendor"). Vendor agrees to provide specialized precision maintenance, testing, and calibration services in strict conformity with 14 CFR Part 43 and 14 CFR Part 145.`
    });

    clauses.push({
      id: "cl-biz-2",
      title: "2. NIST TRACEABILITY & AIRWORTHINESS CERTIFICATION",
      category: "compliance",
      is_mandatory: true,
      body: `(a) Traceability Standards: All test and inspection equipment serviced by Vendor must be calibrated to standards traceable to the National Institute of Standards and Technology (NIST) or ISO/IEC 17025 accredited metrology laboratories.
(b) Airworthiness Approvals: Components returned to service must be accompanied by an executed FAA Form 8130-3 (Airworthiness Approval Tag) or authorized Certificate of Conformance (CoC).
(c) Record Retention: Vendor agrees to maintain all inspection records for thirty-six (36) months and provide unhindered access to FAA Flight Standards inspectors upon request.`
    });

    clauses.push({
      id: "cl-biz-3",
      title: "3. CONFIDENTIALITY, ITAR COMPLIANCE, AND GOVERNING LAW",
      category: "standard",
      is_mandatory: true,
      body: `Vendor agrees to safeguard all proprietary OEM aircraft maintenance data and adhere strictly to US Export Administration Regulations (EAR) and ITAR. Governed by the ${governingLaw}.`
    });
  }

  // Assemble full text
  const fullContentText = `${title}
Regulatory Authority: ${fw.label}
Governing Law: ${governingLaw}
Effective Date: ${effectiveDate}

${clauses.map((c) => `${c.title}\n${c.body}`).join("\n\n")}

SIGNATURES & EXECUTION:

For and on behalf of ${companyName}:
Signature: _____________________________________
Name: Accountable Executive / Director of Operations
Date: ${effectiveDate}

Accepted and Agreed:
Signature: _____________________________________
Name: ${counterpartyName}
Date: _____________________________________
`;

  return {
    id: `docgen-us-${Date.now()}`,
    title,
    category,
    doc_type: docType,
    jurisdiction,
    jurisdiction_label: fw.label,
    governing_law: governingLaw,
    created_at: new Date().toISOString(),
    effective_date: effectiveDate,
    parties: {
      employer_or_company: companyName,
      employee_or_counterparty: counterpartyName,
      location: "United States (FAA Jurisdiction)",
    },
    variables: {
      job_title: jobTitle,
      compensation,
      probation_period: probationPeriod,
      notice_period: noticePeriod,
      benefits,
    },
    clauses,
    full_content_text: fullContentText,
    compliance_notes: complianceNotes,
    risk_warnings: riskWarnings,
  };
}
