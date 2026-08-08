/* ABTalks 60-Day Coding Challenge Core Logic */

(function () {
  'use strict';

  // --- Initial Default Mock State ---
  const DEFAULT_STATE = {
    user: {
      name: "Alex",
      role: "Frontend Developer",
      track: "Web Development"
    },
    theme: "system", // "light" | "dark" | "system"
    notifications: true,
    day12: {
      missionCompleted: true,
      testCompleted: false,
      testScore: null,
      userAnswers: {},
      githubProof: "",
      linkedinProof: "",
      daySubmitted: false
    },
    missedDay: {
      dayNumber: 11,
      isMissed: true,
      isRecovered: false
    },
    stats: {
      daysBuilt: 12,
      streak: 11,
      testsCompleted: 10,
      avgScore: 86,
      buildsShipped: 10
    },
    achievements: [
      { id: "first3", title: "First 3 Days", desc: "Started the chain", icon: "🔥", unlocked: true },
      { id: "streak7", title: "7 Day Streak", desc: "One week of consistency", icon: "⚡", unlocked: true },
      { id: "builds10", title: "10 Builds", desc: "Shipped ten projects", icon: "🏆", unlocked: true },
      { id: "perfect", title: "Perfect Test", desc: "Scored 100% on a daily test", icon: "💯", unlocked: false },
      { id: "halfway", title: "Halfway There", desc: "Completed 30 days", icon: "🚀", unlocked: false },
      { id: "finisher", title: "60 Day Finisher", desc: "Completed the entire challenge", icon: "🔒", unlocked: false }
    ]
  };

  // --- Quiz Questions for Day 12 ---
  const QUIZ_QUESTIONS = [
    {
      id: 1,
      question: "Which CSS property is commonly used to create a responsive layout?",
      options: [
        { letter: "A", text: "position" },
        { letter: "B", text: "display" },
        { letter: "C", text: "float-only" },
        { letter: "D", text: "visibility" }
      ],
      correct: "B",
      explanation: "The 'display' property (display: flex / display: grid) forms the core foundation of responsive CSS layouts."
    },
    {
      id: 2,
      question: "What HTML meta tag is required for proper mobile responsive rendering?",
      options: [
        { letter: "A", text: '<meta name="viewport" content="width=device-width, initial-scale=1.0">' },
        { letter: "B", text: '<meta name="screen" content="mobile-only">' },
        { letter: "C", text: '<meta name="responsive" content="true">' },
        { letter: "D", text: '<meta name="zoom" content="disable">' }
      ],
      correct: "A",
      explanation: "The viewport meta tag instructs browsers to scale page dimensions to fit the device screen width."
    },
    {
      id: 3,
      question: "In Flexbox, which property aligns items along the main axis?",
      options: [
        { letter: "A", text: "align-items" },
        { letter: "B", text: "justify-content" },
        { letter: "C", text: "align-content" },
        { letter: "D", text: "flex-direction" }
      ],
      correct: "B",
      explanation: "'justify-content' distributes flex items along the main axis."
    },
    {
      id: 4,
      question: "Which media query rule targets screen viewports with a max width of 480px?",
      options: [
        { letter: "A", text: "@media (min-width: 480px)" },
        { letter: "B", text: "@media (max-width: 480px)" },
        { letter: "C", text: "@media screen and (width: 480px)" },
        { letter: "D", text: "@media mobile-only" }
      ],
      correct: "B",
      explanation: "'(max-width: 480px)' matches screen sizes 480px wide or smaller."
    },
    {
      id: 5,
      question: "Which CSS relative unit is based on the root font size, ideal for scalable UI?",
      options: [
        { letter: "A", text: "px" },
        { letter: "B", text: "rem" },
        { letter: "C", text: "pt" },
        { letter: "D", text: "vh" },
      ],
      correct: "B",
      explanation: "'rem' scales proportionately to the root font size."
    }
  ];

  // State loading & persistence
  let appState = (function loadState() {
    try {
      const saved = localStorage.getItem("abtalks_state");
      if (saved) {
        return { ...DEFAULT_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Failed to load state", e);
    }
    return DEFAULT_STATE;
  })();

  function saveState() {
    try {
      localStorage.setItem("abtalks_state", JSON.stringify(appState));
    } catch (e) {
      console.error("Failed to save state", e);
    }
  }

  // Theme support
  function applyTheme(theme) {
    let effectiveTheme = theme;
    if (theme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    if (effectiveTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    document.querySelectorAll(".theme-opt-btn").forEach(btn => {
      if (btn.dataset.themeVal === theme) {
        btn.classList.add("selected");
      } else {
        btn.classList.remove("selected");
      }
    });
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (appState.theme === "system") applyTheme("system");
  });

  // Routing
  function navigateTo(path, pushState = true) {
    if (pushState) {
      try {
        history.pushState({ path }, "", path);
      } catch (e) {
        window.location.hash = path;
      }
    }
    renderRoute(path);
  }

  function getNormalizedPath() {
    const hash = window.location.hash;
    if (hash && hash.includes("day/12")) return "/day/12";
    if (hash && hash.includes("dashboard")) return "/dashboard";

    let rawPath = window.location.pathname.replace(/\/+$/, "");
    if (rawPath.includes("/day/12") || rawPath.endsWith("day/12")) {
      return "/day/12";
    }
    if (rawPath.includes("/dashboard") || rawPath.endsWith("dashboard")) {
      return "/dashboard";
    }
    return "/dashboard";
  }

  function renderRoute(path) {
    const norm = getNormalizedPath();

    document.querySelectorAll(".page-view").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));

    if (norm === "/day/12") {
      const viewDay12 = document.getElementById("view-day12");
      const navDay12 = document.getElementById("nav-day12");
      if (viewDay12) viewDay12.classList.add("active");
      if (navDay12) navDay12.classList.add("active");
      renderDay12View();
    } else {
      const viewDash = document.getElementById("view-dashboard");
      const navDash = document.getElementById("nav-dashboard");
      if (viewDash) viewDash.classList.add("active");
      if (navDash) navDash.classList.add("active");
      renderDashboardView();
    }
    window.scrollTo(0, 0);
  }

  window.addEventListener("popstate", () => renderRoute(getNormalizedPath()));
  window.addEventListener("hashchange", () => renderRoute(getNormalizedPath()));

  // Render Dashboard
  function renderDashboardView() {
    const reminderCard = document.getElementById("dashboard-reminder");
    if (reminderCard) {
      if (appState.day12.daySubmitted) {
        reminderCard.innerHTML = `
          <div class="reminder-header">
            <span class="reminder-icon">✓</span>
            <span class="reminder-title">Today's build is complete ✓</span>
          </div>
          <p class="reminder-sub">Come back tomorrow for Day 13.</p>
          <button class="btn-secondary" id="btn-view-submission">View Day 12 Submission ✓</button>
        `;
        document.getElementById("btn-view-submission")?.addEventListener("click", () => navigateTo("/day/12"));
      } else {
        reminderCard.innerHTML = `
          <div class="reminder-header">
            <span class="reminder-icon">🔥</span>
            <span class="reminder-title">Today's build is waiting.</span>
          </div>
          <p class="reminder-sub">Estimated time: 45 min • Mobile Layouts & Flexbox</p>
          <button class="btn-primary" id="btn-start-mission">Start today's mission →</button>
        `;
        document.getElementById("btn-start-mission")?.addEventListener("click", () => navigateTo("/day/12"));
      }
    }

    // Build Chain
    const chainContainer = document.getElementById("build-chain-grid");
    if (chainContainer) {
      chainContainer.innerHTML = "";
      for (let day = 1; day <= 60; day++) {
        const bubble = document.createElement("div");
        bubble.className = "day-bubble";
        bubble.innerText = day;

        if (day < 11) {
          bubble.classList.add("completed");
        } else if (day === 11) {
          if (appState.missedDay.isRecovered) {
            bubble.classList.add("completed");
          } else {
            bubble.classList.add("missed");
            bubble.innerText = "11 !";
          }
        } else if (day === 12) {
          if (appState.day12.daySubmitted) {
            bubble.classList.add("completed");
          } else {
            bubble.classList.add("current");
          }
        } else {
          bubble.classList.add("future");
        }

        bubble.addEventListener("click", () => showDayDetailModal(day));
        chainContainer.appendChild(bubble);
      }
    }

    // Streak Recovery
    const recoveryContainer = document.getElementById("recovery-banner-slot");
    if (recoveryContainer) {
      if (!appState.missedDay.isRecovered) {
        recoveryContainer.style.display = "block";
        recoveryContainer.innerHTML = `
          <div class="recovery-banner">
            <div class="recovery-title">You missed yesterday.</div>
            <div class="recovery-desc">Your journey isn't over. You have 1 streak recovery available.</div>
            <button class="recovery-btn" id="btn-recover-streak">Recover My Streak</button>
          </div>
        `;
        document.getElementById("btn-recover-streak")?.addEventListener("click", recoverStreak);
      } else {
        recoveryContainer.style.display = "block";
        recoveryContainer.innerHTML = `
          <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 10px 14px; color: var(--success-color); font-size: 13px; font-weight: 700; margin-top: 10px;">
            Streak recovered 🔥 (Day 11 restored)
          </div>
        `;
      }
    }

    // Stats
    const statDays = document.getElementById("stat-days-built");
    const statStreak = document.getElementById("stat-streak");
    const statTests = document.getElementById("stat-tests");
    const statAvg = document.getElementById("stat-avg-score");
    const statBuilds = document.getElementById("stat-builds");

    if (statDays) statDays.innerText = `${appState.stats.daysBuilt} / 60`;
    if (statStreak) statStreak.innerText = `${appState.stats.streak} days`;
    if (statTests) statTests.innerText = appState.stats.testsCompleted;
    if (statAvg) statAvg.innerText = `${appState.stats.avgScore}%`;
    if (statBuilds) statBuilds.innerText = appState.stats.buildsShipped;

    // Achievements
    const achievementsContainer = document.getElementById("achievements-grid");
    if (achievementsContainer) {
      achievementsContainer.innerHTML = "";
      appState.achievements.forEach(ach => {
        const card = document.createElement("div");
        card.className = `achievement-card ${ach.unlocked ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
          <div class="achievement-icon">${ach.icon}</div>
          <div class="achievement-title">${ach.title}</div>
          <div class="achievement-desc">${ach.desc}</div>
        `;
        achievementsContainer.appendChild(card);
      });
    }
  }

  function recoverStreak() {
    appState.missedDay.isRecovered = true;
    appState.stats.streak += 1;
    saveState();
    renderDashboardView();
  }

  function showDayDetailModal(dayNum) {
    let statusText = "Future Day";
    let detailText = `Challenge details will unlock on day ${dayNum}.`;
    let scoreText = "";

    if (dayNum < 11) {
      statusText = "✓ Completed";
      detailText = dayNum % 2 === 0 ? "JavaScript DOM & State" : "HTML Semantic Structures";
      scoreText = "Score: 5/5";
    } else if (dayNum === 11) {
      if (appState.missedDay.isRecovered) {
        statusText = "🔥 Recovered";
        detailText = "CSS Grid Masterclass";
        scoreText = "Score: 4/5";
      } else {
        statusText = "⚠️ Missed";
        detailText = "CSS Grid Masterclass (Missed)";
        scoreText = "Score: N/A";
      }
    } else if (dayNum === 12) {
      statusText = appState.day12.daySubmitted ? "✓ Completed" : "⚡ Current Active Day";
      detailText = "Mobile Layouts & Flexbox";
      scoreText = appState.day12.testScore !== null ? `Score: ${appState.day12.testScore}/5` : "Test Pending";
    }

    const drawer = document.getElementById("detail-modal");
    if (drawer) {
      drawer.innerHTML = `
        <div class="drawer-content">
          <div class="drawer-handle"></div>
          <div class="card-title">
            <span>DAY ${dayNum}</span>
            <span class="badge">${statusText}</span>
          </div>
          <p style="font-size: 15px; font-weight: 700; margin-bottom: 6px;">${detailText}</p>
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">${scoreText}</p>
          ${dayNum === 12 ? '<button class="btn-primary" id="modal-btn-day12">Go to Day 12 →</button>' : ''}
          <button class="btn-secondary" style="margin-top: 10px;" id="modal-btn-close">Close</button>
        </div>
      `;
      document.getElementById("modal-overlay")?.classList.add("active");

      if (dayNum === 12) {
        document.getElementById("modal-btn-day12")?.addEventListener("click", () => {
          closeModal();
          navigateTo("/day/12");
        });
      }
      document.getElementById("modal-btn-close")?.addEventListener("click", closeModal);
    }
  }

  function closeModal() {
    document.getElementById("modal-overlay")?.classList.remove("active");
  }

  // Quiz State & Day 12
  let currentQuestionIndex = 0;

  function renderDay12View() {
    const container = document.getElementById("day12-container");
    if (!container) return;

    if (appState.day12.daySubmitted) {
      container.innerHTML = `
        <div class="celebration-box card">
          <div class="celebration-icon">✓</div>
          <h2 class="celebration-title">DAY 12 COMPLETE 🎉</h2>
          <p class="celebration-sub">Your streak continues. 12 days built 🔥</p>
          
          <div class="celebration-metrics">
            <div class="metric-row">
              <span class="metric-lbl">Built & Shipped</span>
              <span class="metric-val">${appState.stats.daysBuilt} Days</span>
            </div>
            <div class="metric-row">
              <span class="metric-lbl">Test Score</span>
              <span class="metric-val">${appState.day12.testScore} / 5</span>
            </div>
            <div class="metric-row">
              <span class="metric-lbl">GitHub Proof</span>
              <span class="metric-val" style="color: var(--success-color)">✓ Submitted</span>
            </div>
            <div class="metric-row">
              <span class="metric-lbl">LinkedIn Proof</span>
              <span class="metric-val" style="color: var(--success-color)">✓ Submitted</span>
            </div>
          </div>

          <button class="btn-primary" id="btn-back-dash">Back to Dashboard</button>
        </div>
      `;
      document.getElementById("btn-back-dash")?.addEventListener("click", () => navigateTo("/dashboard"));
      return;
    }

    const missionDone = appState.day12.missionCompleted;
    const testDone = appState.day12.testCompleted;
    const proofDone = !!(appState.day12.githubProof && appState.day12.linkedinProof);

    container.innerHTML = `
      <div class="stage-stepper">
        <div class="stage-step ${missionDone ? 'completed' : 'active'}">
          <div class="stage-dot">${missionDone ? '✓' : '1'}</div>
          <span>MISSION</span>
        </div>
        <div class="stage-line"></div>
        <div class="stage-step ${testDone ? 'completed' : (missionDone ? 'active' : '')}">
          <div class="stage-dot">${testDone ? '✓' : '2'}</div>
          <span>TEST</span>
        </div>
        <div class="stage-line"></div>
        <div class="stage-step ${proofDone ? 'completed' : (testDone ? 'active' : '')}">
          <div class="stage-dot">${proofDone ? '✓' : '3'}</div>
          <span>PROOF</span>
        </div>
        <div class="stage-line"></div>
        <div class="stage-step ${appState.day12.daySubmitted ? 'completed' : ''}">
          <div class="stage-dot">4</div>
          <span>COMPLETE</span>
        </div>
      </div>

      <div class="card">
        <div class="mission-header">
          <div class="mission-tag">Day 12 Mission Brief</div>
          <h2 class="mission-title">Building Responsive Mobile Layouts</h2>
          <p class="mission-desc">Master CSS Flexbox, mobile viewports, and custom breakpoints to craft pixel-perfect 390px mobile screens.</p>
        </div>
      </div>

      <div class="card" id="quiz-card">
        <div class="card-title">
          <span>Test your understanding</span>
          <span class="badge">${testDone ? 'Complete 🎉' : 'Required'}</span>
        </div>
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 14px;">Complete this short test before submitting today's build.</p>
        <div id="quiz-body"></div>
      </div>

      <div class="card">
        <div class="card-title">
          <span>Submit Proof & Complete Day</span>
        </div>

        <div class="input-group">
          <label class="input-label">GitHub Repository Proof</label>
          <input type="text" id="input-github" class="form-input" placeholder="https://github.com/username/day12-build" value="${appState.day12.githubProof || ''}">
        </div>

        <div class="input-group">
          <label class="input-label">LinkedIn Post Proof</label>
          <input type="text" id="input-linkedin" class="form-input" placeholder="https://linkedin.com/posts/day12-challenge" value="${appState.day12.linkedinProof || ''}">
        </div>

        <button class="btn-primary" id="btn-submit-day" ${!(testDone && appState.day12.githubProof && appState.day12.linkedinProof) ? 'disabled' : ''}>
          Submit Day 12 →
        </button>
      </div>
    `;

    const ghInput = document.getElementById("input-github");
    const liInput = document.getElementById("input-linkedin");
    const submitBtn = document.getElementById("btn-submit-day");

    function validateProofs() {
      appState.day12.githubProof = ghInput.value.trim();
      appState.day12.linkedinProof = liInput.value.trim();
      saveState();

      if (appState.day12.testCompleted && appState.day12.githubProof && appState.day12.linkedinProof) {
        submitBtn?.removeAttribute("disabled");
      } else {
        submitBtn?.setAttribute("disabled", "true");
      }
    }

    ghInput?.addEventListener("input", validateProofs);
    liInput?.addEventListener("input", validateProofs);
    submitBtn?.addEventListener("click", submitDayAction);

    renderQuizBody();
  }

  function renderQuizBody() {
    const quizBody = document.getElementById("quiz-body");
    if (!quizBody) return;

    if (appState.day12.testCompleted) {
      quizBody.innerHTML = `
        <div style="background: var(--accent-light); border: 1px solid rgba(255, 90, 54, 0.3); border-radius: 12px; padding: 14px; text-align: center; margin-bottom: 12px;">
          <div style="font-size: 16px; font-weight: 800; color: var(--accent-color); margin-bottom: 4px;">Test complete 🎉</div>
          <div style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">${appState.day12.testScore} / 5 correct</div>
          <p style="font-size: 12px; color: var(--text-secondary);">Great work. You are ready to submit today's build.</p>
        </div>
        <button class="btn-secondary" id="btn-review-answers">Review Answers</button>
      `;
      document.getElementById("btn-review-answers")?.addEventListener("click", showReviewAnswersModal);
      return;
    }

    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    const selectedAns = appState.day12.userAnswers[q.id];

    quizBody.innerHTML = `
      <div class="quiz-question-box">
        <div class="quiz-q-num">Question ${currentQuestionIndex + 1} of ${QUIZ_QUESTIONS.length}</div>
        <div class="quiz-q-text">${q.question}</div>
      </div>

      <div class="quiz-options">
        ${q.options.map(opt => `
          <div class="quiz-option ${selectedAns === opt.letter ? 'selected' : ''}" data-letter="${opt.letter}">
            <div class="quiz-opt-letter">${opt.letter}</div>
            <div>${opt.text}</div>
          </div>
        `).join('')}
      </div>

      <div class="quiz-nav-row">
        <button class="btn-secondary" id="btn-prev-q" ${currentQuestionIndex === 0 ? 'disabled style="opacity:0.4;"' : ''}>Previous</button>
        ${currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? 
          `<button class="btn-primary" id="btn-submit-test">Submit Test</button>` : 
          `<button class="btn-primary" id="btn-next-q">Next</button>`
        }
      </div>
    `;

    quizBody.querySelectorAll(".quiz-option").forEach(opt => {
      opt.addEventListener("click", () => {
        appState.day12.userAnswers[q.id] = opt.dataset.letter;
        saveState();
        renderQuizBody();
      });
    });

    document.getElementById("btn-prev-q")?.addEventListener("click", () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuizBody();
      }
    });

    document.getElementById("btn-next-q")?.addEventListener("click", () => {
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        currentQuestionIndex++;
        renderQuizBody();
      }
    });

    document.getElementById("btn-submit-test")?.addEventListener("click", submitTest);
  }

  function submitTest() {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (appState.day12.userAnswers[q.id] === q.correct) {
        score++;
      }
    });

    appState.day12.testCompleted = true;
    appState.day12.testScore = score;

    if (score === 5) {
      const perfAch = appState.achievements.find(a => a.id === "perfect");
      if (perfAch) perfAch.unlocked = true;
    }

    saveState();
    renderDay12View();
  }

  function showReviewAnswersModal() {
    const drawer = document.getElementById("detail-modal");
    if (!drawer) return;

    let reviewHtml = `
      <div class="drawer-content">
        <div class="drawer-handle"></div>
        <h3 style="font-size: 16px; font-weight: 800; margin-bottom: 12px;">Quiz Review</h3>
    `;

    QUIZ_QUESTIONS.forEach(q => {
      const userAns = appState.day12.userAnswers[q.id];
      const isCorrect = userAns === q.correct;
      reviewHtml += `
        <div style="background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 12px; padding: 12px; margin-bottom: 10px;">
          <div style="font-size: 12px; font-weight: 700; color: ${isCorrect ? 'var(--success-color)' : 'var(--missed-color)'}">
            Question ${q.id}: ${isCorrect ? 'Correct ✓' : 'Incorrect ✗'}
          </div>
          <div style="font-size: 13px; font-weight: 600; margin: 4px 0;">${q.question}</div>
          <div style="font-size: 12px; color: var(--text-secondary);">Your choice: ${userAns || 'None'} • Correct: ${q.correct}</div>
          <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px; font-style: italic;">${q.explanation}</div>
        </div>
      `;
    });

    reviewHtml += `
        <button class="btn-primary" style="margin-top: 10px;" id="btn-close-review">Done</button>
      </div>
    `;

    drawer.innerHTML = reviewHtml;
    document.getElementById("modal-overlay")?.classList.add("active");
    document.getElementById("btn-close-review")?.addEventListener("click", closeModal);
  }

  function submitDayAction() {
    appState.day12.daySubmitted = true;
    appState.stats.daysBuilt = 12;
    appState.stats.buildsShipped = 10;
    saveState();
    renderDay12View();
  }

  // Profile Drawer
  function openProfileDrawer() {
    const drawer = document.getElementById("detail-modal");
    if (!drawer) return;

    drawer.innerHTML = `
      <div class="drawer-content">
        <div class="drawer-handle"></div>
        
        <div class="profile-avatar-row">
          <div class="avatar-circle">A</div>
          <div>
            <div class="profile-name">${appState.user.name}</div>
            <div class="profile-role">${appState.user.role} • ${appState.user.track}</div>
          </div>
        </div>

        <div style="background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 12px; padding: 12px; margin-bottom: 16px; display: flex; justify-content: space-around; text-align: center;">
          <div>
            <div style="font-size: 16px; font-weight: 800; color: var(--accent-color);">${appState.stats.daysBuilt} / 60</div>
            <div style="font-size: 11px; color: var(--text-secondary); font-weight: 600;">DAYS BUILT</div>
          </div>
          <div>
            <div style="font-size: 16px; font-weight: 800; color: var(--accent-color);">${appState.achievements.filter(a => a.unlocked).length}</div>
            <div style="font-size: 11px; color: var(--text-secondary); font-weight: 600;">UNLOCKED</div>
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">APPEARANCE / THEME</label>
          <div class="theme-selector-grid">
            <button class="theme-opt-btn ${appState.theme === 'light' ? 'selected' : ''}" data-theme-val="light">☀️ Light</button>
            <button class="theme-opt-btn ${appState.theme === 'dark' ? 'selected' : ''}" data-theme-val="dark">🌙 Dark</button>
            <button class="theme-opt-btn ${appState.theme === 'system' ? 'selected' : ''}" data-theme-val="system">💻 System</button>
          </div>
        </div>

        <button class="btn-secondary" id="btn-close-profile">Close</button>
      </div>
    `;

    document.getElementById("modal-overlay")?.classList.add("active");

    drawer.querySelectorAll(".theme-opt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        appState.theme = btn.dataset.themeVal;
        saveState();
        applyTheme(appState.theme);
        openProfileDrawer();
      });
    });

    document.getElementById("btn-close-profile")?.addEventListener("click", closeModal);
  }

  // App Init
  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(appState.theme);

    document.getElementById("nav-dashboard")?.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("/dashboard");
    });
    document.getElementById("nav-day12")?.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("/day/12");
    });

    document.querySelector(".brand-logo")?.addEventListener("click", () => navigateTo("/dashboard"));
    document.getElementById("btn-profile-trigger")?.addEventListener("click", openProfileDrawer);

    document.getElementById("modal-overlay")?.addEventListener("click", (e) => {
      if (e.target.id === "modal-overlay") closeModal();
    });

    renderRoute(getNormalizedPath());
  });

})();
