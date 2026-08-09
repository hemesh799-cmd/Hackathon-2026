# ABTalks — FINAL PROJECT (v4 — Deployed)

> ✅ **This is the final, submitted, deployed version of the ABTalks 60-Day Coding Challenge application.**

**Live URL:** [https://hemesh799-cmd.github.io/Hackathon-2026/](https://hemesh799-cmd.github.io/Hackathon-2026/)

---

## Files in This Folder

| File / Folder | Purpose |
|---------------|---------|
| `index.html` | Landing page (`/`) |
| `app.js` | Core application logic — routing, MCQ engine, state, dashboard |
| `styles.css` | Complete design system — CSS variables, dark/light theme, all component styles |
| `404.html` | SPA fallback for direct URL access (GitHub Pages routing) |
| `dashboard/index.html` | Dashboard route stub (`/dashboard`) |
| `dashboard/day/12/index.html` | Day route stub (`/dashboard/day/12`) |
| `day/12/index.html` | Day 12 route stub (`/day/12`) |
| `PROMPTS.md` | AI prompts used during development |

---

## Routes

| Route | Page |
|-------|------|
| `/` | Landing page — Challenge overview, CTA |
| `/dashboard` | Student Dashboard — Streak, Build Chain, Stats, Achievements |
| `/day/12` | Challenge Day — Mission, 10-question MCQ test, Proof submission |

---

## Tech Stack

- **HTML5** — Static multi-page site with SPA-style routing
- **Vanilla CSS** — Full design system, dark/light themes, animations
- **Vanilla JavaScript** — Routing, MCQ evaluation, localStorage, all interactivity
- **No frameworks, no build step, no external APIs**

---

## Running Locally

```bash
# No npm install needed — just serve statically
python -m http.server 8080
# Open: http://localhost:8080/
```

---

## Features

- 10-question concept MCQ test (Data Structures, Algorithms, OOP, JS, CSS, SQL)
- Strict evaluation: CORRECT / WRONG / NOT ATTEMPTED per question
- Score displayed as X/10 with percentage + detailed review modal
- 4-step day flow: MISSION → TEST → PROOF → COMPLETE
- Build Chain: 60-day visual progress grid
- Streak recovery system
- Personalized greeting with profile name
- GitHub + LinkedIn proof submission
- Achievements with unlock logic
- Dark / Light / System theme toggle
- All state persisted in `localStorage`
