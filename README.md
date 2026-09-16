# AeroCompliance AI — aeroAI

**AeroCompliance AI** is an enterprise-grade Aviation Compliance Management, Continuous Regulatory Intelligence, and Document Synthesis platform powered by **aeroAI**. Designed for commercial air carriers (FAA Part 121 / Part 135), certificated repair stations and MROs (14 CFR Part 145, EASA Part-145), Continuing Airworthiness Management Organisations (CAMO), flight operations teams, and civil aviation authorities.

The platform synthesizes company operational manuals, employment contracts, and safety management procedures with international civil aviation standards (**FAA 14 CFR**, **EASA Easy Access Rules**, **ICAO Annexes**, and **DOT 49 CFR Part 40**) using Retrieval-Augmented Generation (RAG) and high-dimensional vector search on Supabase `pgvector`.

---

## Flagship Capabilities

### 1. AI Document Generator (`/generator`)
The **Document Generator** enables aeroAI to draft industry-standard, professionally structured, and jurisdiction-vetted business, legal, HR, and governance documents from natural language prompts or structured parameters.

#### Supported Aviation Categories & Document Types:
- **Flight Crew & Maintenance Employment**: Part 121 / 135 Pilot Agreements (First Officer & Captain), Part 145 Aircraft Maintenance Technician (A&P) Contracts, Part 65 Flight Dispatcher Agreements, Chief Inspector Engagement Contracts.
- **Personnel Lifecycle & Disciplinary**: Performance Improvement Plans (PIP) for Aviation Technicians, Formal FAA Non-Compliance Warning Letters, Promotion & Seniority Letters, Termination & License Revocation Notices.
- **FAA Operational & SMS Policies**: Part 5 Safety Management System (SMS) Just Culture & Non-Punitive Reporting Policies, DOT 49 CFR Part 40 / 14 CFR Part 120 Anti-Drug & Alcohol Misuse Plans (OpSpec A449), FAR Part 117 Fatigue Risk Management Policies (FRMS).
- **Part 145 Operations & Vendor Contracts**: Vendor Maintenance & Calibration Services Agreements with NIST Traceability, Standard Operating Procedures (SOPs), Aircraft Ground Handling Agreements, Aerospace OEM Data Protection NDAs.

#### Core Capabilities:
- **Natural Language Synthesis**: Enter prompts such as:
  > *"Generate a 14 CFR Part 121 First Officer Employment Agreement in the United States with an annual base salary of $145,000, FAR Part 117 flight/duty rest protections, DOT Part 40 drug testing consent, and PRD pre-employment screening authorization."*
- **US Aviation Statutory Alignment**:
  - **14 CFR Part 121 / 135**: Scheduled & On-Demand Air Carrier operations, Part 117 mandatory 10-hour rest with 8 uninterrupted hours of quiet sleep opportunity.
  - **14 CFR Part 145 / Part 65**: Certificated Repair Stations, A&P mechanic license currency, 14 CFR § 145.109 NIST tool calibration mandates, and 14 CFR § 145.219 2-year minimum record retention.
  - **14 CFR Part 111 (PRD)**: Pilot Records Database mandatory electronic hiring query and candidate authorization clauses.
  - **DOT 49 CFR Part 40 & 14 CFR Part 120**: Mandatory safety-sensitive pre-employment, unannounced random, and reasonable suspicion drug and alcohol testing plans.
  - **14 CFR Part 5**: SMS Just Culture and non-punitive employee hazard reporting protections signed by the Accountable Executive.
  - **US Labor Standards**: Fair Labor Standards Act (FLSA), At-Will employment doctrine, Defend Trade Secrets Act (DTSA), and ERISA benefits.
- **Multi-Format Export**: Single-click export to formatted Word (`.docx`), publication-ready `.pdf`, and raw text copy.
- **Clause Library & FAA Compliance Checks**: Embedded verification checking rest periods, DOT testing pools, and NIST tooling traceability.

---

### 2. Continuous Regulatory Intelligence & Change Detection (`/intelligence`)
Most compliance tools only inform users that *"a regulation changed."* **AeroCompliance AI** answers the four critical operational questions automatically:
1. **What changed?** (Side-by-side statutory version diff highlighting revised mandates)
2. **Who is affected?** (Specific operator categories: Part 145 MROs, Part 121 Air Carriers, Part 135 Operators, Flight Crews, Technicians)
3. **Which internal procedures are now non-compliant?** (Exact company manual title, section number, and current outdated internal text)
4. **What is the exact fix?** (Generates a ready-to-apply **Draft Procedural Update** with a single-click copy button to update manuals and contracts immediately)

```
+----------------------------------------------------------------------------------------------------+
|  Layer 1: Regulatory Ingestion (FAA 14 CFR, EASA Easy Access, ICAO Annexes, DOT 49 CFR Part 40)   |
+-------------------------------------------------+--------------------------------------------------+
                                                  |
                                                  v
+----------------------------------------------------------------------------------------------------+
|  Layer 2: Version Diff Engine (Old Version vs. New Version Statutory Text Delta)                   |
+-------------------------------------------------+--------------------------------------------------+
                                                  |
                                                  v
+----------------------------------------------------------------------------------------------------+
|  Layer 3: AI Impact Analysis (What changed? Who is affected? Which departments must act?)         |
+-------------------------------------------------+--------------------------------------------------+
                                                  |
                                                  v
+----------------------------------------------------------------------------------------------------+
|  Layer 4: Cross-Mapping to Company Documents & Contracts                                           |
|  - Pinpoints outdated manual sections (e.g. 24 mos vs 36 mos training record retention)            |
|  - Generates ready-to-apply redline "Draft Procedural Fix" with Copy-to-Clipboard                 |
+----------------------------------------------------------------------------------------------------+
```

---

## Comprehensive Feature Breakdown

### 1. aeroAI Compliance Assistant (`/chat`)
- **Conversational RAG Copilot**: ChatGPT-style interface fine-tuned for aviation quality assurance and operations.
- **Zero-Hallucination Policy**: Strictly enforced citation rules requiring specific regulatory paragraph numbers (e.g., `14 CFR § 145.109(c)`, `14 CFR § 117.25(b)`) or internal manual chapters.
- **Interactive Citation Chips**: Clickable citation chips pop up the exact excerpt retrieved from the vector store with cosine relevance percentages.
- **Multi-Source Scope Filter**: Filter queries across *All Knowledge Sources*, *Internal SOPs Only*, or *FAA / EASA Regulations Only*.

### 2. Compliance Gap Analysis Engine (`/compliance`)
- **5-Step Automated Matrix Analysis**:
  1. Retrieve internal manual/contract procedure chunks
  2. Retrieve target civil aviation regulation
  3. Semantic contrast & policy conflict detection
  4. Classify findings into:
     - **Compliant Areas** (green)
     - **Potential Risks** (amber)
     - **Missing Controls** (red)
     - **Policy Conflicts** (purple)
  5. Formulate actionable Corrective and Preventive Action (CAPA) plans conforming to FAA Order 8900.1.
- **Instant Dossier Export**: Generate and download complete gap analysis dossiers in **PDF** or **DOCX** with a single click.

### 3. Document Management & pgvector Pipeline (`/documents`)
- **Multi-Format Ingestion**: Supports uploading PDFs, Word documents (`.docx`), text files, and markdown files up to 50MB.
- **Comprehensive Document Categorization**:
  - General Maintenance Manuals (GMM)
  - Flight Operations Manuals (FOM)
  - Safety Management System Manuals (SMS)
  - Standard Operating Procedures (SOP)
  - Quality Assurance Manuals (QAM)
  - Commercial Pilot Employment Agreements
  - A&P Technician Contracts
  - Aviation HR Handbooks & Just Culture Policies
  - Drug & Alcohol Misuse Prevention Plans (DOT Part 40 / 14 CFR Part 120)
  - Fatigue Risk Management Policies (FAR Part 117)
- **Token-Aware Chunking**: Automatic section-aware chunking with token overlap preserving manual hierarchy and ATA chapter headers.
- **Chunk Inspector Modal**: Inspect stored chunks, token counts, and 1,536-dimensional vector embedding statuses.

### 4. Aviation HR & Employment Contract Compliance
In aviation, employee agreements and HR handbooks are legal safety documents. The platform provides full regulatory cross-referencing for:
- **DOT 49 CFR Part 40 / 14 CFR Part 120**: Verifying mandatory pre-employment, random, and reasonable suspicion drug/alcohol testing consent clauses.
- **FAR Part 117 (§ 117.25)**: Ensuring pilot employment agreements guarantee a 10-hour rest period with **8 uninterrupted hours of quiet sleep opportunity** (and statutory fatigue call invocation rights without contractual penalty).
- **14 CFR Part 111 (Pilot Records Database - PRD)**: Verifying candidate authorization clauses for pre-employment electronic vetting of FAA enforcement histories and check-ride failures.
- **14 CFR § 145.163 / EASA Part-145.A.30**: A&P technician qualification currency, recurrent human factors training records, and EWIS/FTS compliance.
- **14 CFR § 5.21 / ICAO Annex 19**: Enforcing Just Culture non-punitive reporting protections in company employee handbooks.

### 5. Audit Readiness & Surveillance Module (`/audits`)
- **Surveillance Frameworks**: Built-in checklists for FAA NASIP (National Aviation Safety Inspection Program), EASA ACAM, and IOSA audits.
- **Interactive Checklist Matrix**: Mark items as *Compliant*, *Non-Compliant*, *Needs Review*, or *N/A*, with auditor notes and manual section cross-references.
- **Live Readiness Scoring**: Real-time recalculation of the organizational readiness score (0–100%) factoring in verified controls and open gaps.

### 6. Regulatory Knowledge Center (`/regulations`)
- **Authoritative Library**: Pre-seeded with authentic, full-text statutory excerpts from:
  - **FAA (14 CFR)**: Part 5 (SMS), Part 43 (Maintenance/Alterations), Part 65 (Certification), Part 91 (General Operating), Part 111 (PRD), Part 117 (Crew Rest/Fatigue), Part 119 (Air Carriers), Part 120 (Drug/Alcohol), Part 121 (Domestic/Flag Ops), Part 135 (On-Demand), Part 145 (Repair Stations).
  - **EASA**: Part-145 (Maintenance), Part-CAMO (Continuing Airworthiness), Part-CAT (Commercial Air Transport).
  - **ICAO**: Annex 1 (Personnel Licensing), Annex 6 (Operation of Aircraft), Annex 8 (Airworthiness), Annex 19 (Safety Management).
  - **DOT**: 49 CFR Part 40 (Workplace Drug & Alcohol Testing Procedures).
- **Instant Search & Filter**: Search by CFR number, keyword, or authority. Expandable statutory text cards.

### 7. Executive Compliance Report Generator (`/reports`)
- Configure executive compliance reports by selecting the target operational manual and regulatory standard.
- Formulates formal auditor-ready dossiers including:
  - Executive Summary & Audit Scope
  - Compliance Scorecard & Metric Gauges
  - Line-by-Line Statutory Comparison Matrix
  - Root-Cause Risk Analysis
  - Corrective and Preventive Action (CAPA) Roadmap
- Export directly to publication-ready **PDF** (via jsPDF) and editable **DOCX** (via docx).

### 8. Distinctive Human-Centered Design System
- **Warm Aerospace Palette**: Replaced generic cold "AI blue" with warm charcoal (`#111318`, `#16181d`, `#1c1f26`) and aviation amber/gold (`#c4841d`, `#e09f3e`).
- **Clutter-Free Information Hierarchy**: Stripped decorative icon spam, giant background planes, and artificial AI marketing badges in favor of clean, data-focused metrics.
- **Executive Typography**: Designed specifically for compliance officers, safety managers, and flight operations directors.

---

## Technical Architecture & Stack

```
+----------------------------------------------------------------------------------------------------+
|                                      AeroCompliance AI Frontend                                    |
|         Next.js 15 (App Router) · TypeScript · Tailwind CSS · Accessible Custom Primitives         |
+------------------------------------+------------------------------------+--------------------------+
                                     |
                                     v
+----------------------------------------------------------------------------------------------------+
|                                        Next.js API Layer                                           |
|   /api/generate-document    /api/intelligence    /api/chat    /api/gap-analysis    /api/documents      |
+------------------------------------+------------------------------------+--------------------------+
                                     |
           +-------------------------+-------------------------+
           |                                                   |
           v                                                   v
+------------------------------------+   +-----------------------------------------------------------+
|      OpenAI & Embedding Pipeline   |   |                   Supabase Platform                       |
| - Text Extraction (PDF/DOCX/TXT)   |   | - PostgreSQL with pgvector (1536-dim vector store)        |
| - Semantic Chunking (600-800 tok)  |   | - Multi-tenant Row Level Security (RLS)                   |
| - OpenAI text-embedding-3-small    |   | - Supabase Storage (aviation manuals bucket)              |
| - GPT-4o / GPT-5 Reasoning         |   | - Supabase Auth (JWT & Role-based access control)         |
+------------------------------------+   +-----------------------------------------------------------+
```

### Dual-Mode Architecture (Self-Contained Evaluation)
AeroCompliance AI features a **Dual-Mode Engine**:
1. **Live Cloud Mode**: Connects directly to Supabase (`pgvector`, Auth, Storage) and OpenAI (`text-embedding-3-small`, `gpt-4o`).
2. **Deterministic Enterprise Demo Mode**: When `.env.local` keys are not configured, the system automatically runs locally with pre-seeded FAA, EASA, ICAO, and DOT regulatory databases, in-memory cosine vector similarity, and deterministic aviation intelligence without blocking evaluation.

---

## Project Structure

```
aeroai/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx                     # Organization sign-in with role picker
│   │   └── register/page.tsx                  # Tenant workspace registration
│   ├── (dashboard)/
│   │   ├── layout.tsx                         # Cockpit layout with sidebar and topbar
│   │   ├── dashboard/page.tsx                 # Compliance overview, alerts, risk heatmap
│   │   ├── intelligence/page.tsx              # Continuous Regulatory Intelligence feed
│   │   ├── generator/page.tsx                 # AI Document Generator workspace
│   │   ├── chat/page.tsx                      # aeroAI compliance assistant
│   │   ├── documents/page.tsx                 # Manuals, contracts, and HR policy management
│   │   ├── compliance/page.tsx                # 5-step regulatory gap analysis engine
│   │   ├── audits/page.tsx                    # NASIP / ACAM surveillance checklist matrix
│   │   ├── regulations/page.tsx               # Regulatory knowledge base (FAA/EASA/ICAO/DOT)
│   │   ├── reports/page.tsx                   # PDF and DOCX executive report generator
│   │   └── settings/page.tsx                  # AI model selection & system configuration
│   ├── api/
│   │   ├── generate-document/route.ts         # Document synthesis API endpoint
│   │   ├── intelligence/route.ts              # Regulatory changes & impact assessment feed
│   │   ├── chat/route.ts                      # aeroAI conversational RAG endpoint
│   │   ├── gap-analysis/route.ts              # Automated comparison and CAPA generation
│   │   ├── documents/
│   │   │   ├── route.ts                       # Document listing endpoint
│   │   │   └── upload/route.ts                # Multipart file parser, chunker, & vectorizer
│   │   └── regulations/route.ts               # Regulatory library search endpoint
│   ├── globals.css                            # Warm charcoal design system tokens
│   ├── layout.tsx                             # App metadata and dark theme provider
│   └── page.tsx                               # Root redirect to /dashboard
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx                        # Minimalist navigation with live change badges
│   │   └── topbar.tsx                         # Regulatory alert pill and quick action CTA
│   ├── generator/
│   │   └── document-generator-view.tsx        # Document Generator workspace & editor
│   ├── intelligence/
│   │   ├── regulatory-intelligence-feed.tsx   # Live news feed with interactive rule simulator
│   │   └── change-detail-modal.tsx            # Statutory diff viewer & draft procedural fix
│   ├── chat/
│   │   ├── chat-container.tsx                 # aeroAI chat stream with quick prompt buttons
│   │   ├── citation-popover.tsx               # Citation chips and source excerpt modal
│   │   └── confidence-badge.tsx               # Confidence score indicator
│   ├── dashboard/
│   │   ├── compliance-score-card.tsx          # Key metric scorecards
│   │   ├── audit-readiness-gauge.tsx          # Surveillance readiness progress gauge
│   │   ├── risk-heatmap.tsx                   # Active operational risk matrix
│   │   └── regulatory-bulletin.tsx            # Rulemaking and AD bulletin feed
│   ├── documents/
│   │   ├── document-table.tsx                 # Document table with contract & HR filters
│   │   ├── document-upload-modal.tsx          # Document ingestion modal
│   │   └── chunk-viewer-modal.tsx             # pgvector chunk inspector
│   ├── gap-analysis/
│   │   ├── gap-analysis-selector.tsx          # Dual-source comparison form
│   │   └── comparison-matrix.tsx              # Findings matrix, severity badges, and exports
│   ├── audits/
│   │   └── audit-checklist-table.tsx          # Surveillance checklist with live score updates
│   └── ui/                                    # Accessible UI primitives (Button, Card, Input, Modal, etc.)
├── lib/
│   ├── generator/
│   │   └── document-engine.ts                 # Natural language prompt parser, clause engine, & jurisdiction laws
│   ├── aviation/
│   │   ├── regulatory-intelligence.ts         # Change detection, cross-mapping, & draft fixes
│   │   ├── seeded-regulations.ts              # Authoritative FAA, EASA, ICAO, and DOT standards
│   │   └── sample-manuals.ts                  # Realistic GMM, FOM, SMS, and contracts with chunks
│   ├── ai/
│   │   ├── prompts.ts                         # Specialized aviation compliance prompts
│   │   ├── rag-engine.ts                      # Token chunker, cosine similarity, & hybrid search
│   │   └── openai.ts                          # OpenAI reasoning wrapper with deterministic fallback
│   ├── supabase/
│   │   ├── client.ts                          # Supabase client with configuration detector
│   │   └── schema.sql                         # Complete PostgreSQL DDL, pgvector HNSW, RLS & RPCs
│   ├── exporters/
│   │   ├── docgen-exporters.ts                # PDF and DOCX generators for generated documents
│   │   ├── pdf-generator.ts                   # jsPDF audit report generator
│   │   └── docx-generator.ts                  # docx document generator
│   └── utils.ts                               # Utility formatting functions
├── types/
│   └── index.ts                               # Complete TypeScript domain models
├── .env.example
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Quickstart & Running Locally

### Prerequisites
- Node.js 18+ (Node.js v22 tested)
- npm 9+

### 1. Install Dependencies
```bash
cd aeroai
npm install
```

### 2. Configure Environment (Optional for Live Mode)
Copy the example environment file:
```bash
cp .env.example .env.local
```
Add your credentials if connecting to live cloud services:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI
OPENAI_API_KEY=sk-your-openai-key
OPENAI_MODEL=gpt-4o
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
```
*(If left unset, the platform runs seamlessly in local demo mode using pre-seeded authoritative aviation databases and deterministic intelligence).*

### 3. Start Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### 4. Production Build & Start
```bash
npm run build
npm run start -- -p 3001
```
Open **`http://localhost:3001`** in your browser.

---

## License

Proprietary Aviation Compliance Software. Built for commercial air carriers, MROs, and aviation authorities worldwide.
