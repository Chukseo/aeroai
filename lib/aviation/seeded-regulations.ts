import { Regulation } from "@/types";

export const SEEDED_REGULATIONS: Regulation[] = [
  {
    id: "reg-faa-145-109",
    authority: "FAA",
    code: "14 CFR § 145.109",
    title: "Equipment, materials, and data requirements",
    category: "Maintenance",
    subpart: "Subpart C - Housing, Facilities, Equipment, Materials, and Data",
    effective_date: "2024-01-01",
    summary: "Mandates that certificated repair stations have the equipment, tools, and test apparatus necessary to perform maintenance in accordance with Part 43, including traceability and calibrated precision tools.",
    tags: ["MRO", "Calibration", "Tooling", "Traceability", "Part 145"],
    content: `(a) A certificated repair station must have the equipment, tools, and materials necessary to perform the maintenance, preventive maintenance, or alterations under its repair station certificate and operations specifications in accordance with part 43 of this chapter.
(b) The equipment, tools, and material must be located on the premises and under the repair station's control when the work is being done.
(c) A certificated repair station must ensure that all test and inspection equipment and tools used to make airworthiness determinations on articles are calibrated to a standard acceptable to the FAA (such as the National Institute of Standards and Technology - NIST, or foreign equivalent approved by the Administrator) at intervals established by the repair station to ensure acceptable accuracy.
(d) The equipment, tools, and materials must be stored and maintained in a condition to ensure acceptable accuracy and serviceability.`
  },
  {
    id: "reg-faa-145-211",
    authority: "FAA",
    code: "14 CFR § 145.211",
    title: "Quality control system",
    category: "Quality Assurance",
    subpart: "Subpart E - Operating Rules",
    effective_date: "2024-01-01",
    summary: "Requires repair stations to maintain an acceptable quality control system detailing incoming inspection, calibration, hidden damage inspection, and maintenance release procedures.",
    tags: ["Quality Control", "Incoming Inspection", "Calibrated Tools", "Work Orders", "Part 145"],
    content: `(a) A certificated repair station must establish and maintain a quality control system acceptable to the FAA that ensures the airworthiness of the articles on which the repair station or any of its contractors performs work.
(b) Repair station personnel must follow the quality control system when performing work under the repair station certificate and operations specifications.
(c) A certificated repair station must prepare and keep current a quality control manual in a format acceptable to the FAA that includes:
  (1) A description of the system and procedures used for qualifying and surveilling noncertificated persons who perform maintenance, preventive maintenance, or alterations;
  (2) Procedures for governing incoming inspection of raw materials and articles, to ensure acceptable quality and traceability;
  (3) Procedures for preliminary, hidden damage, inspection, and continuity inspections of articles involved in an accident;
  (4) Procedures for calibrating measuring and test equipment to acceptable standards;
  (5) Procedures for inspecting articles after completion before approving them for return to service;
  (6) Procedures governing the revision of the quality control manual and submitting revisions to the responsible Flight Standards office.`
  },
  {
    id: "reg-faa-145-219",
    authority: "FAA",
    code: "14 CFR § 145.219",
    title: "Recordkeeping",
    category: "Maintenance",
    subpart: "Subpart E - Operating Rules",
    effective_date: "2024-01-01",
    summary: "Defines recordkeeping requirements for certificated repair stations, requiring maintenance records, work orders, and return-to-service documents to be retained for at least 2 years.",
    tags: ["Recordkeeping", "Retention", "Airworthiness Release", "Maintenance Records", "Audit Risk"],
    content: `(a) A certificated repair station must retain records in English that demonstrate compliance with the requirements of part 43 of this chapter. The records must be retained in a format acceptable to the FAA.
(b) A certificated repair station must provide a copy of the maintenance release to the owner or operator of the article on which the maintenance, preventive maintenance, or alteration was performed.
(c) A certificated repair station must retain the records required by this section for at least 2 years from the date the article was approved for return to service.
(d) A certificated repair station must make all required records available for inspection by the FAA and the National Transportation Safety Board (NTSB).`
  },
  {
    id: "reg-faa-120-109",
    authority: "FAA",
    code: "14 CFR § 120.109",
    title: "Types of drug and alcohol testing required for safety-sensitive personnel",
    category: "Drug & Alcohol",
    subpart: "Subpart E - Drug Testing Program",
    effective_date: "2024-01-01",
    summary: "Mandates pre-employment, random, reasonable cause/suspicion, post-accident, and return-to-duty drug and alcohol testing for all individuals performing safety-sensitive aviation functions (pilots, flight attendants, dispatchers, maintenance personnel).",
    tags: ["HR Policy", "Drug Testing", "Safety Sensitive", "Pre-Employment", "Part 120", "DOT Part 40"],
    content: `(a) Pre-employment testing: No employer may hire any individual for a safety-sensitive function by contract or directly unless the employer first conducts a pre-employment test for controlled substances under DOT 49 CFR Part 40 and receives a verified negative drug test result.
(b) Random testing: Every employer must conduct unannounced random drug and alcohol testing of safety-sensitive employees throughout the calendar year at minimum annual percentage rates specified by the Administrator.
(c) Post-accident testing: As soon as practicable following an accident, each employer must test each surviving employee who performed a safety-sensitive function contributing to the accident.
(d) Employment contract requirement: Safety-sensitive employee contracts and company HR drug & alcohol policy handbooks must explicitly stipulate submission to DOT/FAA mandatory screening as a non-negotiable condition of initial and continued employment.`
  },
  {
    id: "reg-faa-117-25",
    authority: "FAA",
    code: "14 CFR § 117.25",
    title: "Flight crew rest period & fatigue limitations (FAR Part 117)",
    category: "Personnel & HR",
    subpart: "Part 117 - Flight and Duty Limitations",
    effective_date: "2024-01-01",
    summary: "Federal aviation rest mandates prohibiting flight crewmembers from duty unless given at least 10 consecutive hours of rest immediately before duty, including 8 uninterrupted hours of sleep opportunity, plus 30 consecutive hours rest per 168 hours.",
    tags: ["Flight Crew", "Employment Contract", "Rest Requirements", "Fatigue", "Part 117", "Duty Limits"],
    content: `(a) No certificate holder may assign and no flightcrew member may accept assignment to any reserve or flight duty period unless the flightcrew member is given a rest period of at least 10 consecutive hours immediately before beginning the reserve or flight duty period measured from the time the flightcrew member is released from duty.
(b) The 10-hour rest period must provide the flightcrew member with a minimum of 8 uninterrupted hours of sleep opportunity.
(c) No certificate holder may schedule and no flightcrew member may accept an assignment unless the flightcrew member is given at least 30 consecutive hours in any 168-consecutive-hour period free from all duty.
(d) HR/Contractual Clause: Flight crew employment agreements must include explicit protections allowing pilots to declare fatigue without fear of punitive disciplinary retaliation or breach-of-contract penalties.`
  },
  {
    id: "reg-faa-111-105",
    authority: "FAA",
    code: "14 CFR § 111.105",
    title: "Pilot Records Database (PRD) pre-employment screening",
    category: "Personnel & HR",
    subpart: "Subpart B - Access and Use of Database",
    effective_date: "2024-01-01",
    summary: "Requires operators to query and evaluate the FAA Pilot Records Database (PRD) regarding an applicant's certificates, ratings, medicals, enforcement actions, and historical employer disciplinary records before permitting flight duties.",
    tags: ["PRD", "PRIA", "Pre-Employment Screening", "Pilot Contracts", "Background Checks"],
    content: `(a) Before permitting an individual to begin service as a pilot, an operator must access and evaluate all relevant pilot records maintained in the Pilot Records Database (PRD).
(b) Records subject to review include:
  (1) FAA certification, ratings, medical limitations, and enforcement history;
  (2) Previous employer training, proficiency checks, and disciplinary action records resulting in termination or suspension;
  (3) Drug and alcohol testing violation records reported under Part 120.
(c) Employment agreements must contain explicit written authorization and consent from the applicant granting the operator full access to query the PRD system prior to date of hire.`
  },
  {
    id: "reg-faa-145-163",
    authority: "FAA",
    code: "14 CFR § 145.163",
    title: "Training program requirements for maintenance personnel",
    category: "Personnel & HR",
    subpart: "Subpart D - Personnel",
    effective_date: "2024-01-01",
    summary: "Requires repair stations to submit and maintain an FAA-approved training program for employees assigned to maintenance, inspection, and return-to-service duties, including recurrent human factors and hazardous materials training.",
    tags: ["Training Policy", "Employee Onboarding", "Part 145", "Human Factors", "A&P Technicians"],
    content: `(a) A certificated repair station must have an employee training program approved by the FAA that consists of initial and recurrent training.
(b) The training program must document that each employee assigned to perform maintenance, preventive maintenance, or alterations, and inspection functions is capable of performing the assigned task.
(c) The repair station must document, maintain, and update training records for each employee in a system accessible for FAA inspection, retaining individual training histories for at least 2 years after the person leaves employment.`
  },
  {
    id: "reg-faa-5-21",
    authority: "FAA",
    code: "14 CFR § 5.21",
    title: "Safety Management System - Safety policy & Just Culture",
    category: "Safety Management",
    subpart: "Subpart B - Safety Policy",
    effective_date: "2024-01-01",
    summary: "Mandates the establishment and maintenance of a safety policy signed by the Accountable Executive, defining safety objectives, non-punitive hazard reporting, and SMS accountability.",
    tags: ["SMS", "Part 5", "Safety Policy", "Hazard Reporting", "Accountable Executive", "Just Culture", "HR Policy"],
    content: `(a) The certificate holder must establish a safety policy that:
  (1) Defines the certificate holder's safety objectives;
  (2) Includes a commitment of the certificate holder to provide the necessary resources for the implementation of the SMS;
  (3) Includes a safety reporting policy that clearly defines what behaviors are acceptable and what behaviors are unacceptable;
  (4) Establishes a confidential employee hazard reporting system that encourages voluntary and non-punitive disclosure of safety issues;
  (5) Is signed by the accountable executive;
  (6) Is communicated throughout the certificate holder's organization; and
  (7) Prohibits disciplinary retaliation against employees who report unintentional procedural non-conformances in good faith.`
  },
  {
    id: "reg-easa-145-a-30",
    authority: "EASA",
    code: "EASA Part-145.A.30",
    title: "Personnel requirements & human factors competence",
    category: "Personnel & HR",
    subpart: "Section A - Technical Requirements",
    effective_date: "2024-01-01",
    summary: "Requires maintenance organisations to ensure staff competence, fatigue risk management, human factors training, and adequate qualification tracking for all certifying and planning personnel.",
    tags: ["EASA", "Part-145", "Personnel Competence", "Human Factors", "Employment Contract"],
    content: `(a) The organisation shall ensure that personnel who carry out and/or control a continued-airworthiness non-destructive test of aircraft structures and/or components are appropriately qualified.
(b) The competence of personnel involved in maintenance, management audits and/or safety audits shall be established and controlled in accordance with a procedure and to a standard agreed by the competent authority.
(c) The organisation shall establish and control the competence of personnel involved in any maintenance, management and/or safety audits in accordance with a procedure and to a standard agreed by the competent authority. In addition to the necessary expertise related to the job function, competence must include an understanding of the application of human factors and human performance issues.`
  }
];
