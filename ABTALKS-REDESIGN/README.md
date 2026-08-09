# ABTalks — 60-Day Build Journey

[![Mobile First](https://img.shields.io/badge/Design-Mobile--First%20(390px)-FF5A36)](https://abtalks-60day.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20Vite%20%7C%20TailwindCSS-171717)](https://vitejs.dev)

## Problem
ABTalks is a 60-day coding challenge designed for Indian college students. Students choose a track, build a practical coding project every day, submit a GitHub commit and LinkedIn post, and maintain a public learning streak. However, many students struggle with consistency and lack clear visual momentum.

## Solution
Our mobile-first redesign gives students an energetic, modern, developer-product experience optimized specifically for 390px mobile viewports (and desktop screens). It provides instant clarity on daily missions, progress tracking, proof submission, and streak management.

## Key UX Idea
**"Don't Break the Chain"**: The 60-day challenge is rendered as a responsive grid of 60 daily build indicators. Shipped days turn vibrant orange (`#FF5A36`), current days pulse with an active indicator, and missed days offer an encouraging **Streak Recovery** flow ("You missed yesterday. It's okay. Day 12 is waiting for you.").

## Features
- **Mobile-First Design**: Engineered for exact 390px mobile viewports with 44px+ touch targets and zero horizontal overflow.
- **Daily Coding Missions**: Step-by-step guidance, estimated completion times, tech stack tags, and interactive checklist requirements.
- **Proof of Work Submission**: Simple, frictionless forms for GitHub commit URLs and LinkedIn post URLs with instantaneous celebratory feedback states (`🎉 Day 12 complete!`).
- **Interactive Streak Tracking**: Live streak counts (`🔥 11 days`), best streak records, and progress visualizer.
- **Edge Case State Switcher**: Interactive judge toolbar to toggle between Active Day 12, First Day 1, Missed Day Recovery, and Empty Profile states.

## Routes
The application exposes exactly these three routes:
- `/` — Landing page introducing ABTalks, methodology, 60-day motivation, and primary CTA.
- `/dashboard` — Student Dashboard featuring current streak, build chain grid, active mission, achievements, and activity.
- `/day/12` — Challenge Day page with detailed mission brief, interactive checklist, proof URL submission forms, and victory screen.

## Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM (v6)
- **Styling**: Tailwind CSS (v3) + Vanilla CSS custom variables
- **Icons**: Lucide React
- **Data**: Local mock dataset (Zero external backend or auth required)

## Design System
- **Background**: `#F7F7F5`
- **Primary Text**: `#111111`
- **Secondary Text**: `#6B6B6B`
- **Card Background**: `#FFFFFF` (with 18px border radius and 1px `#E6E6E1` border)
- **Primary Accent**: `#FF5A36` (Orange)
- **Dark Accent**: `#171717` (Dark card container)
- **Success**: `#1F9D68`

## Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/abtalks-60day.git
   cd abtalks-60day
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

## Deployment
- **Live Vercel Deployment**: `https://abtalks-60day.vercel.app` (Placeholder)
- Configured with `vercel.json` SPA rewrites to ensure direct route reloads (`/dashboard`, `/day/12`) resolve without 404 errors.
