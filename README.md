# ABTalks — 60-Day Coding Challenge

[![Final Project](https://img.shields.io/badge/Final%20Project-DEPLOYED-FF5A36)](https://hemesh799-cmd.github.io/Hackathon-2026/)
[![Version](https://img.shields.io/badge/Version-v4.0%20MCQ--Only-171717)](https://github.com/hemesh799-cmd/Hackathon-2026)
[![Mobile First](https://img.shields.io/badge/Design-Mobile--First%20390px-FF5A36)](https://hemesh799-cmd.github.io/Hackathon-2026/)

---

## 📁 Repository Structure

This repository contains **two project versions** of the ABTalks 60-Day Coding Challenge application:

```
Hackathon-2026/
│
├── FINAL-PROJECT/          ← ✅ FINAL DEPLOYED APPLICATION
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   ├── 404.html
│   ├── dashboard/
│   │   ├── index.html
│   │   └── day/12/index.html
│   ├── day/12/index.html
│   └── PROMPTS.md
│
├── ABTALKS-REDESIGN/       ← 🔁 EARLIER REACT/VITE VERSION (Reference)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── data/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
│
└── README.md               ← This file
```

---

## ✅ FINAL-PROJECT — The Deployed Application

> **This is the final, working, submitted hackathon application.**

**Live Deployment:** [https://hemesh799-cmd.github.io/Hackathon-2026/](https://hemesh799-cmd.github.io/Hackathon-2026/)

### What it is
A fully interactive, mobile-first student web app for the ABTalks 60-Day Coding Challenge. Built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build step, no external backend.

### Routes
| Route | Description |
|-------|-------------|
| `/` | Landing page — Introduction to the 60-day challenge |
| `/dashboard` | Student Dashboard — Streak, Build Chain, Achievements, Progress |
| `/day/12` | Challenge Day — Mission brief, 10-question MCQ test, submission flow |

### Key Features
- **10-Question Concept MCQ Test** — Data structures, algorithms, time complexity, sorting, OOP, HTML/CSS, JavaScript, SQL, and more
- **Strict 3-state evaluation**: CORRECT ✓ / WRONG ✗ / NOT ATTEMPTED ○ — with predefined correct answers per question
- **Score displayed out of 10** with percentage and full question-by-question review
- **Build Chain** — 60-day visual grid showing completed, current, missed, and future days
- **Streak Recovery** — One-time recovery for missed days
- **Achievements Grid** — Unlockable milestones
- **Personalized Dashboard Greeting** — "Hi, [Name] 👋" via profile setup
- **GitHub + LinkedIn Proof Submission** — Required for Day completion
- **4-step Day flow**: MISSION → TEST → PROOF → COMPLETE
- **Dark/Light/System Theme** with localStorage persistence
- **Mobile-first 390px design** — zero horizontal scrolling, 44px+ touch targets

### Tech Stack
- **HTML5** — Multi-page static site (SPA-style routing via path detection)
- **Vanilla CSS** — Custom design system with CSS variables (dark/light themes)
- **Vanilla JavaScript** — State management, routing, MCQ evaluation, localStorage
- **Deployment** — GitHub Pages (`gh-pages` branch)

### Design System
| Token | Value |
|-------|-------|
| Background | `#111111` (dark) / `#F7F7F5` (light) |
| Card | `#191919` (dark) / `#FFFFFF` (light) |
| Primary Accent | `#FF5A36` (orange) |
| Success | `#10B981` (green) |
| Error | `#EF4444` (red) |
| Border Radius | 14–18px cards, 12px buttons |
| Viewport Target | 390px mobile |

### Running Locally
```bash
# No install required — pure HTML/CSS/JS
# Just serve with any static file server:
python -m http.server 8080
# Then open: http://localhost:8080/
```

---

## 🔁 ABTALKS-REDESIGN — Earlier React/Vite Version (Reference)

> **This is an earlier version built during initial development. It is provided for documentation and reference only.**

An earlier iteration of ABTalks built with **React 18 + Vite + Tailwind CSS**, featuring a React component-based architecture with full routing via React Router DOM.

### Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Data**: Local mock dataset

### Running Locally
```bash
cd ABTALKS-REDESIGN
npm install
npm run dev
# Open: http://localhost:5173
```

### Project Structure
```
src/
├── pages/
│   ├── LandingPage.jsx
│   ├── DashboardPage.jsx
│   ├── ChallengeDayPage.jsx
│   └── ProfilePage.jsx
├── components/
│   ├── Header.jsx
│   ├── BottomNavigation.jsx
│   ├── BuildChain.jsx
│   ├── DailyTestSection.jsx
│   ├── Button.jsx, Card.jsx, Badge.jsx, ...
├── data/
│   └── mockData.js
├── App.jsx
└── main.jsx
```

---

## 📝 Development Journey

| Version | Description |
|---------|-------------|
| **ABTALKS-REDESIGN** | Initial React + Vite + Tailwind prototype |
| **FINAL-PROJECT v1** | Converted to vanilla HTML/CSS/JS, deployed on GitHub Pages |
| **FINAL-PROJECT v2** | Added interactive MCQ test (5 questions), code editor, proof submission |
| **FINAL-PROJECT v3** | Fixed MCQ evaluation (3-state: CORRECT/WRONG/NOT ATTEMPTED), profile system, personalized greetings |
| **FINAL-PROJECT v4** | Removed coding challenge, expanded MCQ to 10 concept-based questions, updated day flow to MISSION→TEST→PROOF→COMPLETE |

---

## 🏆 Hackathon Submission

- **Final Application**: [`FINAL-PROJECT/`](./FINAL-PROJECT/)
- **Live URL**: [https://hemesh799-cmd.github.io/Hackathon-2026/](https://hemesh799-cmd.github.io/Hackathon-2026/)
- **Challenge**: ABTalks 60-Day Coding Challenge — Hackathon 2026
- **Team**: Hemesh & Ashwin

---

> **Note**: The `FINAL-PROJECT` is the only version that should be evaluated for the hackathon submission. `ABTALKS-REDESIGN` is included for documentation and development history purposes only.
