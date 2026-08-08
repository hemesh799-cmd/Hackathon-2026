This document records the exact prompt structure used during the development of ABTalks — 60-Day Build Journey.

PROMPT 1 — Project Foundation + Design System
Set up the React, Vite, React Router, Tailwind CSS, and Lucide React foundations. Establish design system parameters:

Background: #F7F7F5
Primary text: #111111
Secondary text: #6B6B6B
Card background: #FFFFFF
Border: #E6E6E1
Primary accent: #FF5A36
Dark accent: #171717
Card radius: 18px | Button radius: 12px | Input radius: 12px
Mobile viewport target: 390px
Components created: Button, Card, Badge, ProgressBar, Header, BottomNavigation, Input, SectionHeader, StatCard.

PROMPT 2 — Landing Page (/)
Build the student-facing landing page at /:

Header with ABTALKS wordmark and "How it works" link.
Hero section with orange pill, headline ("Build every day. Become impossible to ignore."), supporting copy, primary CTA ("Start the 60-Day Challenge →"), and dark build streak preview card.
"How it works" 4-step vertical breakdown.
"Why 60 days?" dark card stats (60 Days, 1 Build/Day, 120 Proofs of Work).
"Your journey" horizontal progress timeline.
Final CTA and footer ("ABTalks · Build in public.").

PROMPT 3 — Dashboard (/dashboard)
Build the Student Dashboard at /dashboard:

Personal greeting ("Good evening, Alex 👋") and Day indicator ("DAY 12 OF 60").
Dark streak card (🔥 11 days, "Best streak: 18 days").
Progress tracking (20% complete, progress bar, 12 completed · 48 remaining).
Today's Mission card ("Build a responsive portfolio website" + CTA).
Achievements grid & recent activity list with green check icons.
Fixed 68px bottom navigation bar (Home, Journey, Day 12).

PROMPT 4 — Challenge Day (/day/12)
Build the Challenge Day page at /day/12:

Sticky header with back button, day counter, and flame streak indicator.
Mission intro, difficulty/time metadata cards.
"What you'll build" interactive checklist (min 44px touch targets).
Mission brief card & submission requirements list.
Proof of Work form (GitHub commit URL + LinkedIn post URL input cards).
Full submission flow with celebratory success screen ("🎉 Day 12 complete!").

PROMPT 5 — Edge Cases
Implement realistic mock state variations for hackathon judging:

First Day: Day 1 of 60, no streak, "Your journey starts today."
Missed Day: "You missed yesterday. It's okay.", broken streak indicator, "STREAK RECOVERY" card.
Empty Profile: "Complete your profile" notice banner.
Added interactive State Switcher toolbar at top of dashboard.

PROMPT 6 — Add Unique UX Idea ("Don't Break the Chain")
Design the BuildChain component:

60 small day indicators in a mobile-optimized 10-column grid.
Completed days in #FF5A36, current day in #171717 with orange pulsing ring, future days in #E6E6E1.
Expandable view (first 20 prominent + toggle all 60 days).
Counter copy: "12 days built. Keep the chain alive."

PROMPT 7 — Premium UI Polish
Senior product design review and refinement:

Standardized 20px page padding, 32-34px titles, 20px section headers, 15px body copy.
Enforced minimum 48px touch targets on buttons/inputs.
Ensured consistent 1px #E6E6E1 borders, 18px card radii, and clean hierarchy.

PROMPT 8 — 390px Mobile Testing & QA
Strict mobile viewport verification:

Prevented horizontal overflow on all pages.
Tested text wrapping, button tap targets, input fields, and bottom bar fixed positioning.

PROMPT 9 — Final Functionality Check
Audited all routes (/, /dashboard, /day/12):

Verified mock data state persistence.
Verified zero console errors and zero external backend dependencies.

PROMPT 10 — GitHub + README + PROMPTS.md
Generated hackathon documentation, repository setup instructions, tech stack breakdowns, and development prompt logs.

PROMPT 11 — Deployment Preparation

Configured vercel.json SPA rewrites, production Vite build settings, asset paths, and deployment steps.
