/* ABTalks 60-Day Coding Challenge Core Logic — v4 MCQ-Only */

(function () {
  'use strict';

  // --- Initial Default State ---
  const DEFAULT_STATE = {
    user: {
      name: "",
      profileCompleted: false,
      role: "Frontend Developer",
      track: "Web Development"
    },
    theme: "system",
    notifications: true,
    day12: {
      missionCompleted: true,
      learnCompleted: true,
      testCompleted: false,
      testScore: null,
      testPercentage: null,
      testCorrect: 0,
      testWrong: 0,
      testNotAttempted: 10,
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
    learningProgress: {
      mcqsCompleted: 42,
      accuracy: 86,
      progressPct: 75
    },
    recentActivity: [
      { day: 11, topic: "CSS Grid Masterclass", result: "4/5 MCQ", date: "Yesterday", status: "completed" },
      { day: 10, topic: "JavaScript Closures", result: "5/5 MCQ", date: "2 days ago", status: "completed" },
      { day: 9, topic: "Flexbox Layout", result: "5/5 MCQ", date: "3 days ago", status: "completed" }
    ],
    achievements: [
      { id: "first3", title: "First 3 Days", desc: "Started the chain", icon: "🔥", unlocked: true },
      { id: "streak7", title: "7 Day Streak", desc: "One week of consistency", icon: "⚡", unlocked: true },
      { id: "builds10", title: "10 Builds", desc: "Shipped ten projects", icon: "🏆", unlocked: true },
      { id: "perfect", title: "Perfect Test", desc: "Scored 100% on a daily test", icon: "💯", unlocked: false },
      { id: "halfway", title: "Halfway There", desc: "Completed 30 days", icon: "🚀", unlocked: false },
      { id: "finisher", title: "60 Day Finisher", desc: "Completed the entire challenge", icon: "🔒", unlocked: false }
    ]
  };

  // --- Quiz Questions: EXACTLY 10 concept-based questions with predefined correct answers ---
  const QUIZ_QUESTIONS = [
    {
      id: 1,
      question: "What is the time complexity of Binary Search on a sorted array of N elements?",
      options: [
        { letter: "A", text: "O(N)" },
        { letter: "B", text: "O(N²)" },
        { letter: "C", text: "O(log N)" },
        { letter: "D", text: "O(1)" }
      ],
      correctAnswer: "C",
      correct: "C",
      explanation: "Binary Search repeatedly halves the search space, giving O(log N) time complexity."
    },
    {
      id: 2,
      question: "Which data structure operates on a Last In, First Out (LIFO) principle?",
      options: [
        { letter: "A", text: "Queue" },
        { letter: "B", text: "Stack" },
        { letter: "C", text: "Linked List" },
        { letter: "D", text: "Binary Tree" }
      ],
      correctAnswer: "B",
      correct: "B",
      explanation: "A Stack follows LIFO — the last element pushed is the first to be popped."
    },
    {
      id: 3,
      question: "In an unsorted array of N elements, what is the time complexity of finding a specific element using Linear Search?",
      options: [
        { letter: "A", text: "O(1)" },
        { letter: "B", text: "O(log N)" },
        { letter: "C", text: "O(N log N)" },
        { letter: "D", text: "O(N)" }
      ],
      correctAnswer: "D",
      correct: "D",
      explanation: "Linear Search checks each element one by one, so in the worst case it visits all N elements — O(N)."
    },
    {
      id: 4,
      question: "Which sorting algorithm has an average-case time complexity of O(N log N) and uses a divide-and-conquer strategy?",
      options: [
        { letter: "A", text: "Bubble Sort" },
        { letter: "B", text: "Selection Sort" },
        { letter: "C", text: "Merge Sort" },
        { letter: "D", text: "Insertion Sort" }
      ],
      correctAnswer: "C",
      correct: "C",
      explanation: "Merge Sort divides the array into halves, sorts each, then merges — giving O(N log N) in all cases."
    },
    {
      id: 5,
      question: "Which data structure is best suited for implementing a printer job queue (first come, first served)?",
      options: [
        { letter: "A", text: "Stack" },
        { letter: "B", text: "Hash Map" },
        { letter: "C", text: "Binary Tree" },
        { letter: "D", text: "Queue" }
      ],
      correctAnswer: "D",
      correct: "D",
      explanation: "A Queue follows FIFO (First In, First Out), making it ideal for printer job scheduling."
    },
    {
      id: 6,
      question: "Which OOP concept allows a subclass to provide a specific implementation of a method already defined in its parent class?",
      options: [
        { letter: "A", text: "Encapsulation" },
        { letter: "B", text: "Abstraction" },
        { letter: "C", text: "Method Overriding" },
        { letter: "D", text: "Method Overloading" }
      ],
      correctAnswer: "C",
      correct: "C",
      explanation: "Method Overriding lets a subclass redefine a parent class method with its own implementation at runtime (polymorphism)."
    },
    {
      id: 7,
      question: "What does the CSS 'box-model' property 'box-sizing: border-box' do?",
      options: [
        { letter: "A", text: "Adds padding outside the element's border" },
        { letter: "B", text: "Includes padding and border in the element's total width and height" },
        { letter: "C", text: "Removes all margins from the element" },
        { letter: "D", text: "Sets the element's display to block" }
      ],
      correctAnswer: "B",
      correct: "B",
      explanation: "With 'border-box', padding and border are included within the declared width/height, making layout sizing predictable."
    },
    {
      id: 8,
      question: "What is the output of: typeof null in JavaScript?",
      options: [
        { letter: "A", text: "\"null\"" },
        { letter: "B", text: "\"undefined\"" },
        { letter: "C", text: "\"object\"" },
        { letter: "D", text: "\"boolean\"" }
      ],
      correctAnswer: "C",
      correct: "C",
      explanation: "In JavaScript, typeof null returns 'object' — this is a well-known historical bug in the language specification."
    },
    {
      id: 9,
      question: "Which SQL clause is used to filter records AFTER a GROUP BY aggregation has been applied?",
      options: [
        { letter: "A", text: "WHERE" },
        { letter: "B", text: "FILTER" },
        { letter: "C", text: "HAVING" },
        { letter: "D", text: "ORDER BY" }
      ],
      correctAnswer: "C",
      correct: "C",
      explanation: "HAVING filters grouped/aggregated rows. WHERE filters rows before grouping; they serve different purposes."
    },
    {
      id: 10,
      question: "Which algorithm design technique solves a problem by breaking it into overlapping subproblems and storing their solutions to avoid redundant computation?",
      options: [
        { letter: "A", text: "Greedy Algorithm" },
        { letter: "B", text: "Divide and Conquer" },
        { letter: "C", text: "Backtracking" },
        { letter: "D", text: "Dynamic Programming" }
      ],
      correctAnswer: "D",
      correct: "D",
      explanation: "Dynamic Programming stores solutions to overlapping subproblems (memoization/tabulation) to build up the final solution efficiently."
    }
  ];

  // --- State Loading & Persistence ---
  let appState = (function loadState() {
    try {
      const saved = localStorage.getItem("abtalks_state_v2");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Safely merge — reset test state if it was from the old 5-question version
        const oldDay12 = parsed.day12 || {};
        const safeDay12 = {
          ...DEFAULT_STATE.day12,
          ...oldDay12,
          // Reset userAnswers if test was completed under old 5-question system
          // (detect by checking if testScore existed and was ≤5 but testNotAttempted is from old data)
          userAnswers: (oldDay12.testCompleted && (oldDay12.testScore || 0) <= 5 && Object.keys(oldDay12.userAnswers || {}).length <= 5)
            ? {}
            : (oldDay12.userAnswers || {}),
          testCompleted: (oldDay12.testCompleted && (oldDay12.testScore || 0) <= 5 && Object.keys(oldDay12.userAnswers || {}).length <= 5)
            ? false
            : (oldDay12.testCompleted || false),
          testScore: (oldDay12.testCompleted && (oldDay12.testScore || 0) <= 5 && Object.keys(oldDay12.userAnswers || {}).length <= 5)
            ? null
            : (oldDay12.testScore !== undefined ? oldDay12.testScore : null),
          testPercentage: (oldDay12.testCompleted && (oldDay12.testScore || 0) <= 5 && Object.keys(oldDay12.userAnswers || {}).length <= 5)
            ? null
            : (oldDay12.testPercentage !== undefined ? oldDay12.testPercentage : null),
          testCorrect: (oldDay12.testCompleted && (oldDay12.testScore || 0) <= 5 && Object.keys(oldDay12.userAnswers || {}).length <= 5)
            ? 0
            : (oldDay12.testCorrect || 0),
          testWrong: (oldDay12.testCompleted && (oldDay12.testScore || 0) <= 5 && Object.keys(oldDay12.userAnswers || {}).length <= 5)
            ? 0
            : (oldDay12.testWrong || 0),
          testNotAttempted: (oldDay12.testCompleted && (oldDay12.testScore || 0) <= 5 && Object.keys(oldDay12.userAnswers || {}).length <= 5)
            ? 10
            : (oldDay12.testNotAttempted !== undefined ? oldDay12.testNotAttempted : 10),
          daySubmitted: (oldDay12.testCompleted && (oldDay12.testScore || 0) <= 5 && Object.keys(oldDay12.userAnswers || {}).length <= 5)
            ? false
            : (oldDay12.daySubmitted || false),
        };

        return {
          ...DEFAULT_STATE,
          ...parsed,
          day12: safeDay12,
          stats: { ...DEFAULT_STATE.stats, ...parsed.stats },
          learningProgress: { ...DEFAULT_STATE.learningProgress, ...(parsed.learningProgress || parsed.codingProgress || {}) },
          missedDay: { ...DEFAULT_STATE.missedDay, ...parsed.missedDay },
          user: { ...DEFAULT_STATE.user, ...parsed.user }
        };
      }
    } catch (e) {
      console.warn("Failed to load state", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  })();

  function saveState() {
    try {
      localStorage.setItem("abtalks_state_v2", JSON.stringify(appState));
    } catch (e) {
      console.error("Failed to save state", e);
    }
  }

  // --- Theme Support ---
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
      btn.classList.toggle("selected", btn.dataset.themeVal === theme);
    });
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (appState.theme === "system") applyTheme("system");
  });

  // --- Routing ---
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
    if (rawPath.includes("/day/12") || rawPath.endsWith("day/12")) return "/day/12";
    if (rawPath.includes("/dashboard") || rawPath.endsWith("dashboard")) return "/dashboard";
    return "/dashboard";
  }

  function renderRoute(path) {
    document.querySelectorAll(".page-view").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
    const norm = getNormalizedPath();
    if (norm === "/day/12") {
      document.getElementById("view-day12")?.classList.add("active");
      document.getElementById("nav-day12")?.classList.add("active");
      renderDay12View();
    } else {
      document.getElementById("view-dashboard")?.classList.add("active");
      document.getElementById("nav-dashboard")?.classList.add("active");
      renderDashboardView();
    }
    window.scrollTo(0, 0);
  }

  window.addEventListener("popstate", () => renderRoute(getNormalizedPath()));
  window.addEventListener("hashchange", () => renderRoute(getNormalizedPath()));

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // =============================================================
  // DASHBOARD RENDER
  // =============================================================
  function renderDashboardView() {
    const userName = (appState.user.name || "").trim();
    const greetingText = userName ? `Hi, ${escapeHtml(userName)} 👋` : "Hi there 👋";

    // 0. Personalized Header Greeting
    const greetingEl = document.getElementById("dashboard-user-greeting");
    if (greetingEl) {
      greetingEl.innerHTML = `
        <div class="user-greeting-title">${greetingText}</div>
        <div class="user-greeting-sub">Track your 60-day challenge progress &amp; daily builds.</div>
      `;
    }

    // 0b. Profile Prompt / Complete Profile Card
    const profileCardEl = document.getElementById("dashboard-profile-card");
    if (profileCardEl) {
      if (appState.user.profileCompleted && userName) {
        profileCardEl.innerHTML = `
          <div class="card profile-prompt-card">
            <div class="card-title">
              <span>Profile Complete ✓</span>
              <span class="badge" style="background: var(--success-bg); color: var(--success-color);">${escapeHtml(userName)}</span>
            </div>
            <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">Track: ${escapeHtml(appState.user.track)} • Role: ${escapeHtml(appState.user.role)}</p>
            <button class="btn-secondary" id="btn-edit-profile-dash">Edit Profile</button>
          </div>
        `;
        document.getElementById("btn-edit-profile-dash")?.addEventListener("click", openProfileDrawer);
      } else {
        profileCardEl.innerHTML = `
          <div class="card profile-prompt-card">
            <div class="card-title">
              <span>Complete your profile</span>
              <span class="badge">Action Required</span>
            </div>
            <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">Add your name and personalize your ABTalks experience.</p>
            <button class="btn-primary" id="btn-complete-profile-dash">Complete Profile →</button>
          </div>
        `;
        document.getElementById("btn-complete-profile-dash")?.addEventListener("click", openProfileDrawer);
      }
    }

    // 1. Reminder / Today's Challenge Banner
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
          <p class="reminder-sub">Estimated time: 30 min</p>
          <button class="btn-primary" id="btn-start-mission">Start today's mission →</button>
        `;
        document.getElementById("btn-start-mission")?.addEventListener("click", () => navigateTo("/day/12"));
      }
    }

    // 2. Today's Challenge Card
    const challengeCardEl = document.getElementById("dashboard-challenge-card");
    if (challengeCardEl) {
      challengeCardEl.innerHTML = `
        <div class="card-title">
          <span>TODAY'S CHALLENGE</span>
          <span class="badge" style="background: rgba(16,185,129,0.12); color: var(--success-color);">10 MCQs</span>
        </div>
        <div class="challenge-preview-box">
          <div class="challenge-preview-title">📝 Concept Test — Day 12</div>
          <div class="challenge-preview-desc">Test your understanding across CS fundamentals, data structures, algorithms, web concepts, and more.</div>
          <div class="challenge-preview-meta">
            <span class="challenge-tag">Data Structures</span>
            <span class="challenge-tag">Algorithms</span>
            <span class="challenge-tag">Web</span>
            <span class="challenge-tag">JavaScript</span>
          </div>
        </div>
        <button class="btn-primary" id="btn-go-challenge" style="margin-top: 12px;">
          ${appState.day12.testCompleted ? '✓ Test Completed' : 'Start Test →'}
        </button>
      `;
      document.getElementById("btn-go-challenge")?.addEventListener("click", () => navigateTo("/day/12"));
    }

    // 3. Today's Progress Checklist
    const todayProgressContainer = document.getElementById("dashboard-today-progress");
    if (todayProgressContainer) {
      const hasGh = !!appState.day12.githubProof;
      const hasLi = !!appState.day12.linkedinProof;
      todayProgressContainer.innerHTML = `
        <div class="card-title">
          <span>TODAY'S PROGRESS</span>
          <span class="badge">Day 12 Checklist</span>
        </div>
        <div class="today-checklist">
          <div class="checklist-item done">✓ Mission Brief</div>
          <div class="checklist-item ${appState.day12.testCompleted ? 'done' : 'pending'}">
            ${appState.day12.testCompleted ? '✓ Daily Test' : '○ Daily Test'}
            ${appState.day12.testCompleted && appState.day12.testScore !== null ? `<span class="checklist-score">${appState.day12.testScore}/10</span>` : ''}
          </div>
          <div class="checklist-item ${hasGh ? 'done' : 'pending'}">
            ${hasGh ? '✓ GitHub Proof' : '○ GitHub Proof'}
          </div>
          <div class="checklist-item ${hasLi ? 'done' : 'pending'}">
            ${hasLi ? '✓ LinkedIn Proof' : '○ LinkedIn Proof'}
          </div>
        </div>
      `;
    }

    // 4. Learning Progress Card (replaces "Coding Progress")
    const learningProgressContainer = document.getElementById("dashboard-coding-progress");
    if (learningProgressContainer) {
      const p = appState.learningProgress || {};
      learningProgressContainer.innerHTML = `
        <div class="card-title">
          <span>YOUR LEARNING PROGRESS</span>
        </div>
        <div class="coding-progress-grid">
          <div class="coding-progress-item">
            <div class="coding-progress-val">${p.mcqsCompleted || 42}</div>
            <div class="coding-progress-lbl">MCQs Completed</div>
          </div>
          <div class="coding-progress-item">
            <div class="coding-progress-val">${p.accuracy || 86}%</div>
            <div class="coding-progress-lbl">MCQ Accuracy</div>
          </div>
          <div class="coding-progress-item">
            <div class="coding-progress-val">${appState.stats.streak} 🔥</div>
            <div class="coding-progress-lbl">Day Streak</div>
          </div>
          <div class="coding-progress-item">
            <div class="coding-progress-val">${appState.stats.testsCompleted}</div>
            <div class="coding-progress-lbl">Tests Taken</div>
          </div>
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-bar-inner" style="width: ${p.progressPct || 75}%"></div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 6px; font-size: 11px; color: var(--text-secondary); font-weight: 600;">
          <span>${p.progressPct || 75}% of Day 12 completed</span>
          <span>Day 12 / 60</span>
        </div>
      `;
    }

    // 5. Build Chain Grid
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
          bubble.classList.add(appState.missedDay.isRecovered ? "completed" : "missed");
          if (!appState.missedDay.isRecovered) bubble.innerText = "11!";
        } else if (day === 12) {
          bubble.classList.add(appState.day12.daySubmitted ? "completed" : "current");
        } else {
          bubble.classList.add("future");
        }
        bubble.addEventListener("click", () => showDayDetailModal(day));
        chainContainer.appendChild(bubble);
      }
    }

    // 6. Streak Recovery Banner
    const recoveryContainer = document.getElementById("recovery-banner-slot");
    if (recoveryContainer) {
      if (!appState.missedDay.isRecovered) {
        recoveryContainer.style.display = "block";
        recoveryContainer.innerHTML = `
          <div class="recovery-banner">
            <div class="recovery-title">You missed yesterday.</div>
            <div class="recovery-desc">Your journey isn't over.</div>
            <div style="font-size: 12px; font-weight: 800; color: var(--accent-color); margin-bottom: 8px;">STREAK RECOVERY — You have one recovery available.</div>
            <button class="recovery-btn" id="btn-recover-streak">Recover My Streak</button>
          </div>
        `;
        document.getElementById("btn-recover-streak")?.addEventListener("click", recoverStreak);
      } else {
        recoveryContainer.style.display = "block";
        recoveryContainer.innerHTML = `
          <div style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); border-radius: 12px; padding: 10px 14px; color: var(--success-color); font-size: 13px; font-weight: 700; margin-top: 10px;">
            Streak recovered 🔥
          </div>
        `;
      }
    }

    // 7. Progress Statistics Section
    const statDays = document.getElementById("stat-days-built");
    const statStreak = document.getElementById("stat-streak");
    const statTests = document.getElementById("stat-tests");
    const statAvg = document.getElementById("stat-avg-score");
    const statLatest = document.getElementById("stat-latest-test");
    const statBuilds = document.getElementById("stat-builds-shipped");
    if (statDays) statDays.innerText = `${appState.stats.daysBuilt} / 60`;
    if (statStreak) statStreak.innerText = `${appState.stats.streak} days`;
    if (statTests) statTests.innerText = appState.stats.testsCompleted;
    if (statAvg) statAvg.innerText = `${appState.stats.avgScore}%`;
    if (statLatest) statLatest.innerText = appState.day12.testScore !== null ? `${appState.day12.testScore} / 10 (${appState.day12.testPercentage}%)` : "Not taken";
    if (statBuilds) statBuilds.innerText = appState.stats.buildsShipped;

    // 8. Recent Activity
    const recentActivityEl = document.getElementById("dashboard-recent-activity");
    if (recentActivityEl) {
      const activities = appState.recentActivity;
      recentActivityEl.innerHTML = `
        <div class="card-title">
          <span>RECENT ACTIVITY</span>
        </div>
        <div class="activity-list">
          ${activities.map(act => `
            <div class="activity-item">
              <div class="activity-dot ${act.status}"></div>
              <div class="activity-body">
                <div class="activity-title">Day ${act.day} — ${act.topic}</div>
                <div class="activity-meta">${act.result} • ${act.date}</div>
              </div>
              <span class="activity-badge ${act.status}">✓</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    // 9. Achievements Section
    const achievementsContainer = document.getElementById("achievements-grid");
    if (achievementsContainer) {
      achievementsContainer.innerHTML = "";
      appState.achievements.forEach(ach => {
        const card = document.createElement("div");
        card.className = `achievement-card ${ach.unlocked ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
          <div class="achievement-icon">${ach.icon}</div>
          <div class="achievement-title">${ach.title}</div>
          <div class="achievement-desc">"${ach.desc}"</div>
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
      scoreText = "Score: 5/5 MCQ";
    } else if (dayNum === 11) {
      if (appState.missedDay.isRecovered) {
        statusText = "✓ Completed";
        detailText = "CSS Grid Masterclass";
        scoreText = "Score: 4/5 MCQ";
      } else {
        statusText = "⚠️ Missed";
        detailText = "CSS Grid Masterclass";
        scoreText = "Score: N/A";
      }
    } else if (dayNum === 12) {
      statusText = appState.day12.daySubmitted ? "✓ Completed" : "⚡ Current Active Day";
      detailText = "CS Fundamentals & Web Concepts";
      scoreText = appState.day12.testScore !== null ? `Test Score: ${appState.day12.testScore}/10` : "In Progress";
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
          <p style="font-size: 15px; font-weight: 700; margin-bottom: 6px;">"${detailText}"</p>
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">${scoreText}</p>
          ${dayNum === 12 ? '<button class="btn-primary" id="modal-btn-day12">Go to Day 12 →</button>' : ''}
          <button class="btn-secondary" style="margin-top: 10px;" id="modal-btn-close">Close</button>
        </div>
      `;
      document.getElementById("modal-overlay")?.classList.add("active");
      if (dayNum === 12) {
        document.getElementById("modal-btn-day12")?.addEventListener("click", () => { closeModal(); navigateTo("/day/12"); });
      }
      document.getElementById("modal-btn-close")?.addEventListener("click", closeModal);
    }
  }

  function closeModal() {
    document.getElementById("modal-overlay")?.classList.remove("active");
  }

  // =============================================================
  // DAY 12 RENDER
  // =============================================================
  let currentQuestionIndex = 0;

  function renderDay12View() {
    const container = document.getElementById("day12-container");
    if (!container) return;

    if (appState.day12.daySubmitted) {
      container.innerHTML = `
        <div class="celebration-box card">
          <div class="celebration-icon">✓</div>
          <h2 class="celebration-title">DAY 12 COMPLETE 🎉</h2>
          <p class="celebration-sub" style="margin-bottom: 4px; font-weight: 600;">Another day shipped.</p>
          <p class="celebration-sub" style="color: var(--accent-color); font-weight: 700; margin-bottom: 16px;">Streak: ${appState.stats.streak} days 🔥 • 12 days built</p>

          <div class="celebration-metrics">
            <div class="metric-row">
              <span class="metric-lbl">Test score:</span>
              <span class="metric-val">${appState.day12.testScore} / 10 (${appState.day12.testPercentage}%)</span>
            </div>
            <div class="metric-row">
              <span class="metric-lbl">Build:</span>
              <span class="metric-val" style="color: var(--success-color)">Submitted ✓</span>
            </div>
            <div class="metric-row">
              <span class="metric-lbl">GitHub proof:</span>
              <span class="metric-val" style="color: var(--success-color)">✓ Submitted</span>
            </div>
            <div class="metric-row">
              <span class="metric-lbl">LinkedIn proof:</span>
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
      <!-- Stepper: MISSION → TEST → PROOF → COMPLETE (4 steps, no CODE step) -->
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

      <!-- Mission Brief -->
      <div class="card">
        <div class="mission-header">
          <div class="mission-tag">Day 12 Mission</div>
          <h2 class="mission-title">CS Fundamentals & Web Concepts</h2>
          <p class="mission-desc">Sharpen your understanding of data structures, algorithms, time complexity, web technologies, and programming fundamentals.</p>
        </div>
      </div>

      <!-- Daily MCQ Test Section -->
      <div class="card" id="quiz-card">
        <div class="card-title">
          <span>Test your understanding</span>
          <span class="badge">${testDone ? 'Complete 🎉' : '10 Questions'}</span>
        </div>
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">Complete this short test before submitting today's build.</p>
        <div id="quiz-body"></div>
      </div>

      <!-- Build Submission Flow Section -->
      <div class="card" id="proof-card">
        <div class="card-title">
          <span>Build Submission Flow</span>
        </div>

        <div class="proof-progress-bar">
          <div class="proof-step ${missionDone ? 'done' : ''}">MISSION ${missionDone ? '✓' : ''}</div>
          <div class="proof-step-arrow">→</div>
          <div class="proof-step ${testDone ? 'done' : ''}">TEST ${testDone ? '✓' : ''}</div>
          <div class="proof-step-arrow">→</div>
          <div class="proof-step ${proofDone ? 'done' : ''}">PROOF ${proofDone ? '✓' : ''}</div>
          <div class="proof-step-arrow">→</div>
          <div class="proof-step ${appState.day12.daySubmitted ? 'done' : ''}">COMPLETE ${appState.day12.daySubmitted ? '✓' : ''}</div>
        </div>

        <div class="input-group">
          <label class="input-label">📁 GitHub Repository Proof</label>
          <input type="text" id="input-github" class="form-input" placeholder="https://github.com/username/day12-build" value="${appState.day12.githubProof || ''}">
        </div>

        <div class="input-group">
          <label class="input-label">💼 LinkedIn Post Proof</label>
          <input type="text" id="input-linkedin" class="form-input" placeholder="https://linkedin.com/posts/day12-challenge" value="${appState.day12.linkedinProof || ''}">
        </div>

        ${!testDone ? `<div class="proof-warning">⚠️ Complete the Daily Test first to enable submission.</div>` : ''}

        <button class="btn-primary" id="btn-submit-day" ${!(testDone && appState.day12.githubProof && appState.day12.linkedinProof) ? 'disabled' : ''}>
          🚀 Submit Day 12 →
        </button>
      </div>
    `;

    // Wire proof input handlers
    wireProofEvents();
    // Render MCQ
    renderQuizBody();
  }

  function wireProofEvents() {
    const ghInput = document.getElementById("input-github");
    const liInput = document.getElementById("input-linkedin");
    const submitDayBtn = document.getElementById("btn-submit-day");

    function validateProofs() {
      appState.day12.githubProof = ghInput?.value.trim() || "";
      appState.day12.linkedinProof = liInput?.value.trim() || "";
      saveState();
      const canSubmit = appState.day12.testCompleted
        && appState.day12.githubProof
        && appState.day12.linkedinProof;
      if (submitDayBtn) {
        if (canSubmit) submitDayBtn.removeAttribute("disabled");
        else submitDayBtn.setAttribute("disabled", "true");
      }
    }

    ghInput?.addEventListener("input", validateProofs);
    liInput?.addEventListener("input", validateProofs);
    submitDayBtn?.addEventListener("click", submitDayAction);
  }

  // =============================================================
  // QUIZ EVALUATION ENGINE & RENDERER — 10 QUESTIONS
  // =============================================================
  function evaluateQuestion(q, rawUserAnswer) {
    if (rawUserAnswer === undefined || rawUserAnswer === null) {
      return { status: "NOT_ATTEMPTED", label: "Not Attempted", mark: 0 };
    }
    const trimmed = String(rawUserAnswer).trim();
    if (trimmed === "") {
      return { status: "NOT_ATTEMPTED", label: "Not Attempted", mark: 0 };
    }
    const expected = (q.correctAnswer || q.correct).trim().toUpperCase();
    const actual = trimmed.toUpperCase();

    if (actual === expected) {
      return { status: "CORRECT", label: "Correct ✓", mark: 1 };
    } else {
      return { status: "WRONG", label: "Wrong ✗", mark: 0 };
    }
  }

  function renderQuizBody() {
    const quizBody = document.getElementById("quiz-body");
    if (!quizBody) return;

    if (appState.day12.testCompleted) {
      const score = appState.day12.testScore !== null ? appState.day12.testScore : 0;
      const pct = appState.day12.testPercentage !== null ? appState.day12.testPercentage : 0;
      const correct = appState.day12.testCorrect || 0;
      const wrong = appState.day12.testWrong || 0;
      const notAttempted = appState.day12.testNotAttempted || 0;

      quizBody.innerHTML = `
        <div class="quiz-complete-box">
          <div class="quiz-complete-icon">🎉</div>
          <div class="quiz-complete-title" style="font-size: 16px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px;">TEST COMPLETE 🎉</div>
          <div class="quiz-complete-score" style="font-size: 22px; font-weight: 800; color: var(--accent-color);">Score: ${score} / 10</div>
          <div class="quiz-complete-percentage" style="font-size: 15px; font-weight: 700; color: var(--text-secondary); margin-top: 2px;">Percentage: ${pct}%</div>

          <div style="display: flex; justify-content: center; gap: 10px; font-size: 12px; font-weight: 700; margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border-color); flex-wrap: wrap;">
            <span style="color: var(--success-color);">Correct: ${correct}</span>
            <span style="color: var(--missed-color);">Wrong: ${wrong}</span>
            <span style="color: var(--text-secondary);">Not Attempted: ${notAttempted}</span>
          </div>
        </div>
        <button class="btn-secondary" id="btn-review-answers" style="margin-top: 10px;">Review Question Results</button>
      `;
      document.getElementById("btn-review-answers")?.addEventListener("click", showReviewAnswersModal);
      return;
    }

    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    const selectedAns = appState.day12.userAnswers[q.id];

    // Progress dots — 10 dots
    const progressDots = QUIZ_QUESTIONS.map((_, i) => {
      const ans = appState.day12.userAnswers[QUIZ_QUESTIONS[i].id];
      let cls = "q-dot";
      if (i === currentQuestionIndex) cls += " q-dot-active";
      else if (ans !== undefined && ans !== null && String(ans).trim() !== "") cls += " q-dot-answered";
      return `<div class="${cls}"></div>`;
    }).join('');

    quizBody.innerHTML = `
      <div class="quiz-progress-dots">${progressDots}</div>

      <div class="quiz-question-box">
        <div class="quiz-q-num">Question ${currentQuestionIndex + 1} of ${QUIZ_QUESTIONS.length}</div>
        <div class="quiz-q-text">${q.question}</div>
      </div>

      <div class="quiz-options">
        ${q.options.map(opt => {
          const isSelected = selectedAns === opt.letter;
          return `
            <div class="quiz-option ${isSelected ? 'selected' : ''}" data-letter="${opt.letter}">
              <div class="quiz-opt-letter">${opt.letter}</div>
              <div>${opt.text}</div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="quiz-nav-row">
        <button class="btn-secondary" id="btn-prev-q" ${currentQuestionIndex === 0 ? 'disabled' : ''}>Previous</button>
        ${currentQuestionIndex === QUIZ_QUESTIONS.length - 1
          ? `<button class="btn-primary" id="btn-submit-test">Submit Test</button>`
          : `<button class="btn-primary" id="btn-next-q">Next</button>`
        }
      </div>
    `;

    // Option selection & unselection — clicking same answer again clears it
    quizBody.querySelectorAll(".quiz-option").forEach(opt => {
      opt.addEventListener("click", () => {
        const letter = opt.dataset.letter;
        if (appState.day12.userAnswers[q.id] === letter) {
          delete appState.day12.userAnswers[q.id];
        } else {
          appState.day12.userAnswers[q.id] = letter;
        }
        saveState();
        renderQuizBody();
      });
    });

    document.getElementById("btn-prev-q")?.addEventListener("click", () => {
      if (currentQuestionIndex > 0) { currentQuestionIndex--; renderQuizBody(); }
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
    let correctCount = 0;
    let wrongCount = 0;
    let notAttemptedCount = 0;

    QUIZ_QUESTIONS.forEach(q => {
      const userAns = appState.day12.userAnswers[q.id];
      const ev = evaluateQuestion(q, userAns);
      if (ev.status === "CORRECT") correctCount++;
      else if (ev.status === "WRONG") wrongCount++;
      else notAttemptedCount++;
    });

    const score = correctCount;
    const percentage = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

    appState.day12.testCompleted = true;
    appState.day12.testScore = score;
    appState.day12.testPercentage = percentage;
    appState.day12.testCorrect = correctCount;
    appState.day12.testWrong = wrongCount;
    appState.day12.testNotAttempted = notAttemptedCount;

    appState.stats.testsCompleted += 1;
    const totalMcqs = (appState.learningProgress.mcqsCompleted || 42) + correctCount;
    appState.learningProgress.mcqsCompleted = totalMcqs;

    const prevPct = appState.stats.avgScore * (appState.stats.testsCompleted - 1);
    appState.stats.avgScore = Math.min(100, Math.max(0, Math.round((prevPct + percentage) / appState.stats.testsCompleted)));

    // Perfect score = 10/10
    if (score === QUIZ_QUESTIONS.length) {
      const perfAch = appState.achievements.find(a => a.id === "perfect");
      if (perfAch) perfAch.unlocked = true;
    }

    saveState();
    renderDay12View();
  }

  function showReviewAnswersModal() {
    const drawer = document.getElementById("detail-modal");
    if (!drawer) return;

    const correctCount = appState.day12.testCorrect || 0;
    const wrongCount = appState.day12.testWrong || 0;
    const notAttemptedCount = appState.day12.testNotAttempted || 0;
    const score = appState.day12.testScore !== null ? appState.day12.testScore : 0;
    const pct = appState.day12.testPercentage !== null ? appState.day12.testPercentage : 0;

    let reviewHtml = `
      <div class="drawer-content">
        <div class="drawer-handle"></div>
        <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 4px;">Question Results Review</h3>
        <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 14px;">
          Score: <strong>${score} / 10</strong> (${pct}%) &nbsp;•&nbsp; Correct: ${correctCount} | Wrong: ${wrongCount} | Not Attempted: ${notAttemptedCount}
        </div>
    `;

    QUIZ_QUESTIONS.forEach(q => {
      const userAns = appState.day12.userAnswers[q.id];
      const ev = evaluateQuestion(q, userAns);
      const userOpt = q.options.find(o => o.letter === userAns);
      const userOptText = userOpt ? `${userOpt.letter}. ${userOpt.text}` : "Not answered";
      const correctOpt = q.options.find(o => o.letter === (q.correctAnswer || q.correct));
      const correctOptText = correctOpt ? `${correctOpt.letter}. ${correctOpt.text}` : (q.correctAnswer || q.correct);

      let statusClass = "review-unattempted";
      let badgeClass = "not_attempted";
      if (ev.status === "CORRECT") { statusClass = "review-correct"; badgeClass = "correct"; }
      else if (ev.status === "WRONG") { statusClass = "review-wrong"; badgeClass = "wrong"; }

      reviewHtml += `
        <div class="review-item ${statusClass}">
          <div class="review-header">
            <span>Question ${q.id}</span>
            <span class="review-status-badge ${badgeClass}">${ev.label}</span>
          </div>
          <div class="review-question">${q.question}</div>
          <div class="review-answer">
            <div class="review-ans-row">
              <span class="review-lbl">Your answer:</span>
              <span class="${ev.status === 'CORRECT' ? 'ans-correct-text' : (ev.status === 'WRONG' ? 'ans-wrong-text' : '')}">${userOptText}</span>
            </div>
            <div class="review-ans-row">
              <span class="review-lbl">Correct answer:</span>
              <span class="ans-correct-text">${correctOptText}</span>
            </div>
            <div class="review-ans-row">
              <span class="review-lbl">Status:</span>
              <span style="font-weight: 700;">${ev.label}</span>
            </div>
            <div class="review-ans-row">
              <span class="review-lbl">Marks:</span>
              <span style="font-weight: 700;">${ev.mark}/1</span>
            </div>
          </div>
          <div class="review-explanation">💡 ${q.explanation}</div>
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
    appState.stats.buildsShipped = 11;
    appState.stats.streak = Math.max(appState.stats.streak, 12);
    appState.learningProgress.progressPct = 100;
    appState.recentActivity.unshift({
      day: 12,
      topic: "CS Fundamentals & Web Concepts",
      result: `${appState.day12.testScore}/10 MCQ`,
      date: "Just now",
      status: "completed"
    });
    if (appState.recentActivity.length > 5) appState.recentActivity.pop();
    saveState();
    renderDay12View();
  }

  // =============================================================
  // PROFILE / SETTINGS DRAWER
  // =============================================================
  function openProfileDrawer() {
    const drawer = document.getElementById("detail-modal");
    if (!drawer) return;

    const currentName = (appState.user.name || "").trim();
    const isCompleted = appState.user.profileCompleted && currentName !== "";

    drawer.innerHTML = `
      <div class="drawer-content">
        <div class="drawer-handle"></div>

        <div class="profile-avatar-row">
          <div class="avatar-circle">${currentName ? currentName.charAt(0).toUpperCase() : 'A'}</div>
          <div>
            <div class="profile-name">${currentName ? escapeHtml(currentName) : 'Student'}</div>
            <div class="profile-role">${escapeHtml(appState.user.role)}</div>
            <div style="font-size: 12px; color: var(--accent-color); font-weight: 700;">Track: ${escapeHtml(appState.user.track)}</div>
          </div>
        </div>

        <!-- Name Editing Form -->
        <div class="card" style="margin-bottom: 16px;">
          <div class="card-title" style="margin-bottom: 8px;">
            <span>${isCompleted ? 'Edit Profile' : 'Complete Your Profile'}</span>
          </div>
          <div class="input-group">
            <label class="input-label">What's your name?</label>
            <input type="text" id="profile-name-input" class="form-input" placeholder="Enter your name" value="${escapeHtml(currentName)}">
            <div id="profile-name-error" style="color: var(--missed-color); font-size: 12px; font-weight: 700; margin-top: 4px; display: none;"></div>
          </div>
          <button class="btn-primary" id="btn-save-profile-action" style="margin-top: 10px; min-height: 44px;">Save Profile</button>
        </div>

        <div style="background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 12px; padding: 12px; margin-bottom: 16px; display: grid; grid-template-columns: repeat(3, 1fr); text-align: center; gap: 8px;">
          <div>
            <div style="font-size: 16px; font-weight: 800; color: var(--accent-color);">${appState.stats.daysBuilt} / 60</div>
            <div style="font-size: 10px; color: var(--text-secondary); font-weight: 600;">PROGRESS</div>
          </div>
          <div>
            <div style="font-size: 16px; font-weight: 800; color: var(--accent-color);">${appState.stats.streak}</div>
            <div style="font-size: 10px; color: var(--text-secondary); font-weight: 600;">STREAK 🔥</div>
          </div>
          <div>
            <div style="font-size: 16px; font-weight: 800; color: var(--accent-color);">${appState.achievements.filter(a => a.unlocked).length} unlocked</div>
            <div style="font-size: 10px; color: var(--text-secondary); font-weight: 600;">ACHIEVEMENTS</div>
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">THEME</label>
          <div class="theme-selector-grid">
            <button class="theme-opt-btn ${appState.theme === 'light' ? 'selected' : ''}" data-theme-val="light">Light</button>
            <button class="theme-opt-btn ${appState.theme === 'dark' ? 'selected' : ''}" data-theme-val="dark">Dark</button>
            <button class="theme-opt-btn ${appState.theme === 'system' ? 'selected' : ''}" data-theme-val="system">System</button>
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">NOTIFICATIONS</label>
            <button class="theme-opt-btn ${appState.notifications ? 'selected' : ''}" id="btn-toggle-notifs" style="min-height: 36px; padding: 4px 12px;">
              ${appState.notifications ? 'On ✓' : 'Off'}
            </button>
          </div>
        </div>

        <button class="btn-secondary" id="btn-close-profile">Close</button>
      </div>
    `;

    document.getElementById("modal-overlay")?.classList.add("active");

    document.getElementById("btn-save-profile-action")?.addEventListener("click", () => {
      const inputVal = document.getElementById("profile-name-input")?.value || "";
      const trimmed = inputVal.trim();
      const errEl = document.getElementById("profile-name-error");

      if (!trimmed) {
        if (errEl) {
          errEl.textContent = "Please enter your name.";
          errEl.style.display = "block";
        }
        return;
      }

      appState.user.name = trimmed;
      appState.user.profileCompleted = true;
      saveState();
      closeModal();
      renderRoute(getNormalizedPath());
    });

    drawer.querySelectorAll(".theme-opt-btn[data-theme-val]").forEach(btn => {
      btn.addEventListener("click", () => {
        appState.theme = btn.dataset.themeVal;
        saveState();
        applyTheme(appState.theme);
        openProfileDrawer();
      });
    });

    document.getElementById("btn-toggle-notifs")?.addEventListener("click", () => {
      appState.notifications = !appState.notifications;
      saveState();
      openProfileDrawer();
    });

    document.getElementById("btn-close-profile")?.addEventListener("click", closeModal);
  }

  // =============================================================
  // APP INIT
  // =============================================================
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
