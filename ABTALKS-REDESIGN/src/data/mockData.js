export const INITIAL_STUDENT_DATA = {
  name: "Alex",
  track: "Web Development",
  avatar: "A",
  currentDay: 12,
  totalDays: 60,
  currentStreak: 11,
  bestStreak: 18,
  completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  missedDays: [],
  profileComplete: true,
  isMissedState: false,
  isFirstDayState: false,
};

export const MISSION_DAY_12 = {
  dayNumber: 12,
  title: "Build a responsive portfolio website",
  shortDesc: "Create a personal portfolio with a hero section, projects, about section and contact section.",
  fullDesc: "Create a personal portfolio that clearly communicates who you are, what you build, and what projects you have completed.",
  estimatedTime: "45 minutes",
  difficulty: "Intermediate",
  techStack: ["HTML", "CSS", "JavaScript"],
  checklist: [
    { id: 1, text: "Hero section", completed: false },
    { id: 2, text: "About section", completed: false },
    { id: 3, text: "Projects section", completed: false },
    { id: 4, text: "Contact section", completed: false },
    { id: 5, text: "Responsive mobile layout", completed: false },
  ],
  brief: `Build a single-page responsive portfolio website.

Your page should include:
• Your name and introduction
• At least three projects
• Short About section
• Contact information
• Responsive layout for mobile screens

Focus on clean HTML, CSS and responsive design.`,
  submissionRequirements: [
    { step: "01", text: "Your page works on mobile" },
    { step: "02", text: "Your code is pushed to GitHub" },
    { step: "03", text: "You shared your progress on LinkedIn" },
  ]
};

export const ACHIEVEMENTS = [
  { id: 1, icon: "🔥", title: "11 Day Streak", desc: "Consistency beast" },
  { id: 2, icon: "⚡", title: "10 Builds Shipped", desc: "Double digits reached" },
  { id: 3, icon: "🏆", title: "First Milestone", desc: "Completed Day 10" },
];

export const RECENT_ACTIVITY = [
  { day: 11, title: "Landing page", status: "completed", date: "Yesterday" },
  { day: 10, title: "JavaScript quiz", status: "completed", date: "2 days ago" },
  { day: 9, title: "Weather app", status: "completed", date: "3 days ago" },
];

export const DAILY_TEST_QUESTIONS = [
  {
    id: 1,
    question: "What is the primary role of React's useState hook?",
    options: [
      "A) Manage local state in a functional component",
      "B) Perform HTTP network requests asynchronously",
      "C) Directly update the HTML document title",
      "D) Compile CSS styles into JavaScript objects"
    ],
    correctAnswer: "A"
  },
  {
    id: 2,
    question: "Which semantic HTML element is used to represent an unordered list?",
    options: [
      "A) <ol>",
      "B) <ul>",
      "C) <li>",
      "D) <list>"
    ],
    correctAnswer: "B"
  },
  {
    id: 3,
    question: "In CSS Flexbox, which property aligns flex items along the main axis?",
    options: [
      "A) align-items",
      "B) align-content",
      "C) justify-content",
      "D) flex-direction"
    ],
    correctAnswer: "C"
  },
  {
    id: 4,
    question: "What does the JavaScript Array method .map() return?",
    options: [
      "A) A single accumulated value",
      "B) A brand new array with transformed elements",
      "C) A boolean value indicating if elements match",
      "D) The original array mutated in place"
    ],
    correctAnswer: "B"
  },
  {
    id: 5,
    question: "Which HTTP status code represents '200 OK' / successful request?",
    options: [
      "A) 404",
      "B) 500",
      "C) 301",
      "D) 200"
    ],
    correctAnswer: "D"
  }
];

export const getSavedProfileName = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('abtalks_profile_name') || '';
};

export const saveProfileName = (name) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('abtalks_profile_name', name.trim());
};

export const getSavedTestResult = () => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem('abtalks_test_result');
  return data ? JSON.parse(data) : null;
};

export const saveTestResult = (result) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('abtalks_test_result', JSON.stringify(result));
};
