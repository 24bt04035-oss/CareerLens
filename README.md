# 🎯 CareerLens – Smart Student Career Profile & Career Readiness Analyzer

> **"See where you stand. Know where to go."**
> A premium, full-stack intelligence platform built for universities and students to measure career readiness, evaluate skill gaps against real industry hiring benchmarks, and receive actionable learning paths.

---

## 🌟 Key Highlights & Hackathon Features

1. **Deterministic & Transparent Readiness Score**:
   - Computes weighted readiness percentages:
     $$\text{Readiness Score} = \left(\frac{\sum \text{Achieved Skill Points}}{\text{Total Possible Skill Points}}\right) \times 100$$
   - **Matched (✓)**: Student Proficiency $\ge$ Required Proficiency ($100\%$ weight)
   - **Partial (◐)**: Student has the skill, but Proficiency $<$ Required Proficiency ($50\%$ weight)
   - **Missing (✕)**: Skill is missing from profile ($0\%$ weight)
   - Explainable in the UI under **"How is this score calculated?"**.

2. **Preloaded Demo Persona (Arya Tia)**:
   - **University**: GSFC University
   - **Degree**: B.Tech Computer Science (Class of 2026, CGPA: 8.4)
   - **Target Career**: Cybersecurity Analyst
   - **Baseline Metrics**: 75% Readiness, 10 Matched, 4 Partial, 2 Missing Skills.
   - **One-Click Demo Reset**: Judges can test changes and reset back to baseline anytime.

3. **8 Predefined Industry Career Pathways**:
   - 🛡️ Cybersecurity Analyst
   - 📊 Data Analyst
   - 🧠 Data Scientist
   - 💻 Software Developer
   - ✨ Machine Learning Engineer
   - 🎨 UI/UX Designer
   - 📑 Product Manager
   - ☁️ Cloud Engineer

4. **"Careers You Could Pursue" Cross-Fit Leaderboard**:
   - Automatically compares the candidate's active skill profile across all 8 careers to find adjacent career opportunities (e.g., 🥇 Cybersecurity Analyst 75%, 🥈 Cloud Engineer 44%, 🥉 Software Developer 29%).

5. **Actionable Skill Gap & Recommendation Engine**:
   - Real-world actionable suggestions (e.g., SIEM lab setup, NIST SP 800-61 Incident Handling, SQL Injection PortSwigger labs).
   - Instant **"+ I have this"** button on gap cards to simulate skill acquisition in real time and watch the score jump!

6. **Full-Stack Architecture with Dual Storage Resilience**:
   - Production PostgreSQL schema (`backend/database/schema.sql`).
   - Resilient in-memory fallback store ensuring **zero-configuration instant demo** for judges even if PostgreSQL is not running locally.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- (Optional) PostgreSQL database

---

### Step 1: Start Backend (Express API)

Open a terminal:
```bash
cd backend
npm install
node server.js
```
The backend server will start on: **`http://localhost:5000`**

*(Optional PostgreSQL setup: If you wish to connect a live PostgreSQL instance, set `DATABASE_URL=postgres://user:password@localhost:5432/careerlens_db` in `backend/.env` or run `backend/database/schema.sql`).*

---

### Step 2: Start Frontend (React + Vite)

Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
The frontend dev server will launch on: **`http://localhost:5173`**

---

## 🔑 Demo Access Credentials

- **Quick 1-Click Login**: Click the **"Login as Arya Tia (1-Click)"** button on `/login`
- **Email**: `arya.tia@gsfc.ac.in`
- **Password**: `password123`
- **Reset Demo Data**: Click the **"Reset Demo"** button on the top-right navbar at any point during presentation.

---

## ⏱️ 3–5 Minute Hackathon Presentation Flow

1. **Landing Page (`/`)**:
   - Showcase modern dark SaaS aesthetics (Linear/Vercel inspired).
   - Point out the 82% Mock Readiness Gauge and the 3 core pillars: *Build Profile*, *Analyze Skills*, *Close Skill Gaps*.
2. **Dashboard (`/dashboard`)**:
   - Show greeting: *"Good morning, Arya Tia 👋"*.
   - Review 4 KPI cards: Profile Completion, Career Readiness (75%), Skills Matched, Skill Gaps.
   - Point out the Target Career card (Cybersecurity Analyst) and the Radial Readiness Donut.
   - Highlight the **"Careers You Could Pursue"** leaderboard (comparing fit across all 8 roles).
3. **Career Analysis WOW Page (`/analysis`)**:
   - Reveal the large glowing readiness score.
   - Open **"How is this score calculated?"** to explain the transparent scoring formula.
   - Inspect the **Skill Comparison Breakdown** table showing Required vs Current proficiency with progress bars.
   - Scroll to **Your Skill Gaps** cards (SIEM, Security Forensics, Cryptography, Incident Response).
   - **Live Interaction**: Click `+ I have this` on the **SIEM** gap card — watch the notification pop up and the readiness score jump immediately!
4. **Skills Management (`/skills`)**:
   - Demonstrate the suggested skills pill pool (Python, Docker, AWS, Figma, etc.).
   - Select a suggested skill and choose a proficiency level (*Beginner*, *Intermediate*, *Advanced*, *Expert*).
5. **Careers Explorer (`/careers`)**:
   - Switch target career to *Cloud Engineer* or *Software Developer* with 1-click and re-run fit.
6. **Student Portfolio (`/profile`)**:
   - Show Arya's structured projects (*Mini SOC Dashboard*, *Network Security Analyzer*), AWS certification, and CyberDefense Labs internship.
7. **Actionable Recommendations (`/recommendations`)**:
   - Present curated labs, courses, and project ideas tailored to the student's gaps.
