# Bail Reckoner Implementation Plan (3-Track Parallel Architecture)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan track-by-track. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a comprehensive, high-end web application ("Bail Reckoner") for SIH Problem ID SIH268405 (Ministry of Law & Justice) split across 3 developer tracks to evaluate undertrial prisoner bail eligibility across IPC/CrPC & BNS/BNSS/BSA 2023 legal frameworks, support legal aid providers with AI case summaries & pre-filled PDF bail applications, and empower judicial authorities with half-time served auto-flagging (BNSS Section 479) and review dashboards.

**Architecture:** Next.js 14 App Router full-stack web application with TypeScript, Tailwind CSS, built-in Legal Engine (rule-based evaluation for offense classification, compoundability, risk assessment, and BNSS Sec 479 half-time eligibility), Google Gemini AI integration for judicial pronouncements & multilingual summaries, client-side/server-side PDF generator (pdfmake/html2pdf), and structured local JSON database pre-seeded with legal sections across IPC, BNS, IT Act, POCSO, SC/ST Act, NDPS, and Economic Offenses.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide React Icons, Framer Motion, Google Gemini API (`@google/generative-ai`), Client/Server PDF generation.

---

## 🛠️ Track Division Overview

| Track | Lead Domain | Key Deliverables |
|---|---|---|
| **Track 1: Legal Engine & Backend Track** | Core Rules & Data | Offense dataset (IPC/BNS), Legal Engine, Time-Served calculator, BNSS 479 rule, Risk scorer |
| **Track 2: Frontend UI & Role Portals Track** | UI/UX & Roles | Next.js App Router, Navbar/i18n, Prisoner Wizard, Lawyer Dashboard, Judicial Analytics Dashboard |
| **Track 3: AI Services & PDF Export Track** | AI & Documents | Gemini AI precedent retrieval, Case summary API, Pre-filled Court PDF generator, E2E Integration |

---

## 🟩 TRACK 1: Legal Engine & Backend Track

### Task 1.1: Comprehensive Legal Dataset & Types
**Files:**
- Create: `src/types/legal.ts`
- Create: `src/data/offenses.json`
- Create: `src/lib/offenseDb.ts`

**Steps:**
- [ ] **Step 1:** Define TypeScript interfaces (`Offense`, `BailCase`, `EligibilityResult`, `RiskScore`, `UserRole`) in `src/types/legal.ts`.
- [ ] **Step 2:** Build comprehensive seed dataset (`src/data/offenses.json`) covering 30+ IPC/BNS equivalent sections, Special Acts (POCSO, SC/ST, IT Act, UAPA, NDPS, Economic Offenses).
- [ ] **Step 3:** Implement lookup functions (`getOffenseBySection`, `searchOffenses`, `getBnsEquivalent`) in `src/lib/offenseDb.ts`.

### Task 1.2: Deterministic Legal Eligibility & Risk Calculation Engine
**Files:**
- Create: `src/lib/legalEngine.ts`

**Steps:**
- [ ] **Step 1:** Implement time-served calculations (days/months served vs prescribed max sentence).
- [ ] **Step 2:** Implement **BNSS Section 479 / CrPC 436A** half-time served eligibility rule and 1/3 term bailable eligibility rule.
- [ ] **Step 3:** Implement Special Act override checks and bailable/non-bailable/heinous offense classification.
- [ ] **Step 4:** Implement Risk Assessment algorithm (0-10 flight risk, witness tampering risk, societal danger score) and output `EligibilityResult`.

---

## 🟦 TRACK 2: Frontend UI & Role Portals Track

### Task 2.1: App Scaffolding, Global Theme & Navigation
**Files:**
- Create: `package.json`, `tailwind.config.js`, `src/app/layout.tsx`, `src/app/globals.css`
- Create: `src/components/Navbar.tsx`, `src/components/RoleSwitcher.tsx`, `src/lib/i18n.ts`

**Steps:**
- [ ] **Step 1:** Setup Next.js App Router with Tailwind CSS, Lucide Icons, and Framer Motion.
- [ ] **Step 2:** Implement top navigation header with instant Role Switcher (Prisoner, Lawyer, Judge) and Multilingual Selector (English, Hindi, Tamil, Telugu, Marathi).
- [ ] **Step 3:** Build landing page (`src/app/page.tsx`) with role selection cards and SIH project overview.

### Task 2.2: Undertrial Prisoner Portal & Eligibility Wizard
**Files:**
- Create: `src/app/prisoner/page.tsx`, `src/app/prisoner/wizard/page.tsx`

**Steps:**
- [ ] **Step 1:** Build 5-step interactive wizard (Charge Search -> Custody Date -> Risk Checklist -> Result Display -> Application Download).
- [ ] **Step 2:** Design visual status indicators (ELIGIBLE ✅, NOT ELIGIBLE ❌, CONDITIONAL 🟡) with clear plain-language legal rights cards.

### Task 2.3: Legal Aid Provider Dashboard (Lawyer Portal)
**Files:**
- Create: `src/app/lawyer/page.tsx`, `src/app/lawyer/case/[id]/page.tsx`

**Steps:**
- [ ] **Step 1:** Build client case list dashboard with search, status filters, and risk score badges.
- [ ] **Step 2:** Build detailed case analysis view displaying legal breakdown, precedents, and export tools.

### Task 2.4: Judicial Authority Dashboard (Judge Portal)
**Files:**
- Create: `src/app/judge/page.tsx`, `src/app/judge/review/[id]/page.tsx`

**Steps:**
- [ ] **Step 1:** Build Magistrate/Judge analytics dashboard highlighting **BNSS Section 479 (Half-Time Served)** auto-flagged cases.
- [ ] **Step 2:** Build case evaluation modal for rapid judicial decision-making.

---

## 🟨 TRACK 3: AI Services & PDF Export Track

### Task 3.1: Google Gemini AI Precedents & Summary Engine
**Files:**
- Create: `src/lib/gemini.ts`
- Create: `src/app/api/ai-summary/route.ts`

**Steps:**
- [ ] **Step 1:** Implement Gemini API integration to fetch Supreme Court / High Court precedents (*Arnesh Kumar*, *Satender Kumar Antil*, *Sanjay Chandra*) based on case charges.
- [ ] **Step 2:** Implement multilingual summary generator API endpoint returning structured plain-language advice.

### Task 3.2: Court Bail Application PDF Generator
**Files:**
- Create: `src/lib/pdfGenerator.ts`
- Create: `src/components/BailApplicationPDF.tsx`

**Steps:**
- [ ] **Step 1:** Build standardized Indian Court Bail Application document layout (Court Name, FIR details, Sections, Custody duration, Legal Grounds, Precedents, Prayer for Bail).
- [ ] **Step 2:** Implement print & downloadable PDF trigger.

### Task 3.3: Integration & End-to-End Verification
**Files:**
- Modify: `src/app/page.tsx`, `src/lib/legalEngine.ts`

**Steps:**
- [ ] **Step 1:** Wire up all 3 tracks into seamless end-to-end workflow.
- [ ] **Step 2:** Validate builds, routing, role switching, risk scoring, AI summaries, and PDF export.

---

## Plan Handoff

Plan ready! Next step is starting execution across the 3 tracks.
