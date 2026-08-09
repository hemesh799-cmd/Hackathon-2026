# ABTalks — 60-Day Coding Challenge

[![Live Application](https://img.shields.io/badge/Status-LIVE-10B981)]
[![Design System](https://img.shields.io/badge/Design-Mobile--First%20390px-FF5A36)]
[![Stack](https://img.shields.io/badge/Stack-Vanilla%20JS%20%7C%20HTML5%20%7C%20CSS3-171717)]

**Live Deployment:** https://hackathon-pi-smoky.vercel.app

---

## 🚀 Overview

ABTalks is a mobile-first student product for the 60-Day Coding Challenge. Students choose a track, follow daily missions, test their understanding with interactive daily tests, track their build streaks, and submit proof of work (GitHub commit & LinkedIn post URLs).

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: Vanilla JavaScript (ES6+), HTML5, Vanilla CSS3 (Custom Design System with CSS Variables)
- **State Management**: Local persistent state powered by `localStorage` (`abtalks_state_v2`)
- **Routing**: Lightweight client-side hash & path router supporting dynamic routes (`/`, `/dashboard`, `/day/12`)
- **Backend / DB**: None required — lightweight, fast, self-contained mock evaluation & persistent storage
- **Deployment**: vercel

- ## Design System

### Colors
- **Background:** `#F7F7F5`
- **Surface/Card:** `#FFFFFF`
- **Primary Text:** `#111111`
- **Secondary Text:** `#6B6B6B`
- **Primary Accent:** `#FF5A36` (ABTalks Orange)
- **Dark Accent:** `#171717`
- **Border:** `#E6E6E1`
- **Success:** `#1F9D68`
- **Error:** `#D64545`
- **Warning:** `#D98A00`

### Typography
- **Font:** Inter / system sans-serif
- **Hero:** 32px / 700–800
- **Headings:** 20–24px / 700
- **Body:** 14–16px / 400–500
- **Buttons:** 14–16px / 600

### Components
- **Cards:** White background, `18px` radius, `1px` border
- **Buttons:** `12px` radius, minimum `44px` height
- **Inputs:** `12px` radius, `44–48px` height
- **Pills/Badges:** `999px` radius
- **Page Padding:** `16px` mobile
- **Spacing:** 4px-based scale

### States
- **Correct/Completed:** `#1F9D68` ✓
- **Wrong/Error:** `#D64545` ✗
- **Warning/Missed:** `#D98A00`
- **Not Attempted:** `#6B6B6B`

### Theme
Supports **Light, Dark, and System** themes while maintaining ABTalkS Orange as the primary accent.

### UX Principles
- Mobile-first, optimized for **390px**
- Clear progress and feedback
- Minimum `44px` touch targets
- No horizontal scrolling
- Consistent spacing and visual hierarchy
- Accessibility-friendly contrast and status indicators

---

## ✨ Features

- **Daily Concept MCQ Test (10 Questions)**
  - Predefined correct answers across Computer Science fundamentals (Data Structures, Algorithms, Time Complexity, Searching/Sorting, OOP, HTML/CSS, JavaScript, SQL).
  - Strict 3-state evaluation logic: `CORRECT` ✓, `WRONG` ✗, or `NOT ATTEMPTED` ○.
  - Question-by-question result breakdown modal with explanations.
  
- **4-Step Challenge Day Progression**
  - Linear flow: `MISSION -> TEST -> PROOF -> COMPLETE`.
  - Proof of work requires valid GitHub Repository and LinkedIn Post links before unlocking final Day completion.

- **Student Dashboard & Progress**
  - Personalized Greeting (`Hi, [Name] 👋`) synced with Profile drawer settings.
  - **Build Chain Grid**: 60-day visual bubble grid displaying completed, missed, active, and locked challenge days.
  - **Streak & Streak Recovery**: Daily streak counter (`🔥 11 days`) with an automated streak recovery banner for missed days.
  - **Achievements Grid**: Dynamic badges (e.g. 7 Day Streak, 10 Builds, Perfect Test).
  - **Recent Activity Log**: Summary of recent daily completions and scores.

- **Mobile-First & Modern UX**
  - Tailored for exact 390px mobile viewports while scaling gracefully to desktop displays.
  - Support for System, Light, and Dark themes.

---

## 📂 Project Structure

```
Hackathon-2026/
├── index.html            # Primary landing page structure & route views
├── app.js                # Core logic, state management, quiz evaluation & views
├── styles.css            # Complete design system & custom CSS variables
├── 404.html              # Single-page application route fallback
├── PROMPTS.md            # AI prompts log used during development
├── dashboard/            # Route endpoint wrapper for /dashboard
│   └── index.html
├── day/                  # Route endpoint wrapper for /day/12
│   └── 12/
│       └── index.html
└── README.md             # Project documentation
```

---

## 🚦 route map

- `/` — Landing page introducing ABTalks challenge, methodology, and primary CTAs.
- `/dashboard` — Student Dashboard featuring current streak, build chain grid, learning stats, achievements, and active missions.
- `/day/12` — Active Challenge Day featuring Mission brief, 10-question MCQ test, and GitHub/LinkedIn proof submission.

---

## 💻 Running Locally

No installation or build build pipeline required. Serve the files with any static HTTP server:

```bash
# Using Python
python -m http.server 8080
```

Open `http://localhost:8080/` in your browser.
