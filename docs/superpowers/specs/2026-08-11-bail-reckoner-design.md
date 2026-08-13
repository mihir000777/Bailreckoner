# Bail Reckoner — Design Specification

**SIH Problem ID:** SIH268405  
**Organization:** Ministry of Law & Justice  
**Theme:** Smart Automation  
**Type:** Software  
**Date:** 2026-08-11  

---

## 1. Overview

The Bail Reckoner is an innovative digital solution designed to assist undertrial prisoners, legal aid providers, and judicial authorities in streamlining the bail process. It simplifies and expedites bail application and evaluation by considering various legal and procedural parameters under both the legacy IPC/CrPC framework and the new Bhartiya Nyaya Sanhita (BNS) 2023 / Bhartiya Nagarik Suraksha Sanhita (BNSS) 2023 / Bhartiya Saakshya Adhiniyam (BSA) 2023 framework.

### Goals
- Determine bail eligibility automatically based on offense, time served, and legal provisions
- Assist legal aid providers in preparing accurate bail applications
- Help judicial authorities flag eligible undertrial prisoners and streamline evaluation
- Provide multilingual access to justice information

---

## 2. Platform

- **Type:** Web application (browser-based, responsive, works on desktop and mobile)
- **Tech Stack:**
  - **Frontend:** Next.js 14 (App Router, TypeScript, Tailwind CSS)
  - **Backend:** Python FastAPI
  - **Database:** PostgreSQL / SQLite for fast local demo
  - **AI Layer:** Google Gemini API (judicial pronouncements, multilingual summaries)
  - **PDF Generation:** pdfmake / ReportLab
  - **Auth:** Role-based authentication (Prisoner, Legal Aid Provider, Judicial Authority)

---

## 3. User Roles

### 3.1 Undertrial Prisoner
- Understands their bail eligibility
- Views required conditions and steps to apply for bail
- Downloads pre-filled bail application PDF in their preferred language

### 3.2 Legal Aid Provider (Lawyer / NGO Worker)
- Manages multiple client cases
- Accesses AI-generated case summaries with relevant judicial pronouncements
- Prepares and exports accurate bail applications
- Views risk assessment reports (flight risk, witness tampering risk)

### 3.3 Judicial Authority (Magistrate / Judge)
- Views and reviews bail applications submitted through the system
- Sees eligibility analysis with full legal basis for each case
- Receives automatic flags for undertrials who have served half their maximum sentence (BNSS Section 479)
- Views analytics dashboard (pending cases, eligible cases by court, etc.)

---

## 4. System Architecture

```
┌─────────────────────────────────────────┐
│           Next.js 14 Frontend           │
│  (3 role dashboards + shared UI)        │
│  - Prisoner Portal                      │
│  - Legal Aid Provider Portal            │
│  - Judicial Authority Dashboard         │
└──────────────┬──────────────────────────┘
               │ HTTP/REST (JSON)
┌──────────────▼──────────────────────────┐
│         FastAPI Backend                 │
│  ┌─────────────────────────────────┐    │
│  │  Legal Engine (Rule-Based)      │    │
│  │  - Bail eligibility calculator  │    │
│  │  - Time-served tracker          │    │
│  │  - Section lookup (IPC/BNS)     │    │
│  │  - Compoundability checker      │    │
│  │  - Special Act override rules   │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │  AI Layer (Google Gemini API)   │    │
│  │  - Judicial pronouncement fetch │    │
│  │  - Case summary generation      │    │
│  │  - Multilingual translation     │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │  PDF Generator                  │    │
│  │  - Pre-filled bail application  │    │
│  └─────────────────────────────────┘    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Database                        │
│  - users, roles, sessions               │
│  - offenses (IPC/BNS sections)          │
│  - special_act_rules                    │
│  - bail_cases                           │
│  - judicial_pronouncements              │
│  - eligibility_results                  │
└─────────────────────────────────────────┘
```

---

## 5. Bail Eligibility Engine

### 5.1 Pipeline
1. **Offense Classification:** Bailable / Non-Bailable / Heinous
2. **Compoundability Check:** Flag compoundable offenses under CrPC / BNSS
3. **Maximum Sentence Lookup:** Determine sentence threshold
4. **Time-Served Analysis:** Check if custody time ≥ 1/3 (bailable) or 1/2 (BNSS Sec 479) of max sentence
5. **Special Acts Override:** POCSO, SC/ST, UAPA, NDPS, PMLA, Economic Offenses
6. **Risk Assessment:** Flight risk, evidence tampering, societal danger score
7. **Procedural Requirements:** Surety bond, personal bond, identity verification
8. **AI Pronouncements & Guidance:** SC/HC precedents and next steps summary
9. **Result Output:** Eligible / Not Eligible / Conditional with detailed legal reasoning
