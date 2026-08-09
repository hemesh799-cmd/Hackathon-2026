import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import BottomNavigation from '../components/BottomNavigation';
import BuildChain from '../components/BuildChain';
import { INITIAL_STUDENT_DATA, MISSION_DAY_12, ACHIEVEMENTS, RECENT_ACTIVITY, getSavedProfileName, getSavedTestResult } from '../data/mockData';
import { CheckCircle2, Clock, Code, AlertTriangle, Sparkles, User, RefreshCw, Award, FileCheck } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();

  // Saved local state
  const [profileName, setProfileName] = useState('');
  const [testResult, setTestResult] = useState(null);

  // State mode for testing edge cases
  const [activeStateMode, setActiveStateMode] = useState('NORMAL');

  useEffect(() => {
    const name = getSavedProfileName();
    if (name) setProfileName(name);

    const test = getSavedTestResult();
    if (test) setTestResult(test);
  }, []);

  const isFirstDay = activeStateMode === 'FIRST_DAY';
  const isMissedDay = activeStateMode === 'MISSED_DAY';
  const forceEmptyProfile = activeStateMode === 'EMPTY_PROFILE';

  // Effective profile name
  const effectiveName = forceEmptyProfile ? '' : profileName;
  const isProfileComplete = Boolean(effectiveName && effectiveName.trim());

  // Dynamic greeting string (Part 8)
  const greetingText = isProfileComplete ? `Hi, ${effectiveName} 👋` : 'Hi there 👋';

  const currentDay = isFirstDay ? 1 : 12;
  const completedDays = isFirstDay ? [] : isMissedDay ? [1,2,3,4,5,6,7,8,9,10] : [1,2,3,4,5,6,7,8,9,10,11];
  const progressPercent = isFirstDay ? 0 : Math.round((completedDays.length / 60) * 100);

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col items-center selection:bg-[#FF5A36] selection:text-white pb-24">
      {/* 390px Mobile Container */}
      <div className="w-full max-w-[390px] min-h-screen bg-[#F7F7F5] flex flex-col shadow-sm border-x border-[#E6E6E1]/50">
        
        {/* DEMO / JUDGE EDGE CASE TOGGLE BAR */}
        <div className="bg-[#171717] text-white p-2.5 px-4 flex items-center justify-between text-[11px] font-bold border-b border-black">
          <div className="flex items-center gap-1.5 text-[#FF5A36]">
            <Sparkles size={13} />
            <span>JUDGE DEMO STATES:</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setActiveStateMode('NORMAL')}
              className={`px-2 py-1 rounded transition-colors ${activeStateMode === 'NORMAL' ? 'bg-[#FF5A36] text-white font-bold' : 'bg-[#262626] text-[#AAAAAA]'}`}
            >
              Day 12
            </button>
            <button
              onClick={() => setActiveStateMode('FIRST_DAY')}
              className={`px-2 py-1 rounded transition-colors ${activeStateMode === 'FIRST_DAY' ? 'bg-[#FF5A36] text-white font-bold' : 'bg-[#262626] text-[#AAAAAA]'}`}
            >
              Day 1
            </button>
            <button
              onClick={() => setActiveStateMode('MISSED_DAY')}
              className={`px-2 py-1 rounded transition-colors ${activeStateMode === 'MISSED_DAY' ? 'bg-[#FF5A36] text-white font-bold' : 'bg-[#262626] text-[#AAAAAA]'}`}
            >
              Missed
            </button>
            <button
              onClick={() => setActiveStateMode('EMPTY_PROFILE')}
              className={`px-2 py-1 rounded transition-colors ${activeStateMode === 'EMPTY_PROFILE' ? 'bg-[#FF5A36] text-white font-bold' : 'bg-[#262626] text-[#AAAAAA]'}`}
            >
              Profile
            </button>
          </div>
        </div>

        {/* MAIN HEADER */}
        <header className="px-5 pt-6 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[13px] font-medium text-[#6B6B6B]">Good day,</span>
              <h1 className="text-[24px] font-extrabold text-[#111111] leading-tight">
                {greetingText}
              </h1>
            </div>

            <button
              onClick={() => navigate('/profile')}
              className="w-11 h-11 rounded-full bg-[#171717] text-white font-bold text-lg flex items-center justify-center border-2 border-white shadow-sm hover:ring-2 hover:ring-[#FF5A36] transition-all"
              title="View Profile"
            >
              {isProfileComplete ? effectiveName.charAt(0).toUpperCase() : <User size={20} />}
            </button>
          </div>

          <div className="mt-4">
            <span className="small-label text-[#FF5A36]">YOUR JOURNEY</span>
            <div className="text-[28px] font-extrabold text-[#111111] tracking-tight">
              DAY {currentDay} OF 60
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <main className="px-5 space-y-6 pt-2">
          
          {/* PROFILE COMPLETION CARD (Part 6 & 8) */}
          {!isProfileComplete && (
            <Card variant="highlight" className="border-dashed border-[#FF5A36] bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="warning" className="mb-2">ACTION REQUIRED</Badge>
                  <h3 className="font-bold text-[17px] text-[#111111]">Complete your profile</h3>
                  <p className="text-[13px] text-[#6B6B6B] mt-1 leading-snug">
                    Add your name and personalize your ABTalks experience.
                  </p>
                </div>
              </div>
              <Button
                variant="dark"
                size="sm"
                onClick={() => navigate('/profile')}
                className="mt-3.5 h-[44px] font-bold"
              >
                Complete Profile →
              </Button>
            </Card>
          )}

          {/* STREAK CARD */}
          {isMissedDay ? (
            <Card variant="dark" className="border border-amber-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="small-label text-amber-400">STREAK RECOVERY</span>
                <span className="text-xs text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-700/50">
                  MISSED YESTERDAY
                </span>
              </div>

              <div className="text-[26px] font-black text-white my-1 flex items-center gap-2">
                <span className="opacity-50">💔</span> 0 day streak
              </div>

              <p className="text-[14px] text-[#AAAAAA] mt-1">
                You missed yesterday. It's okay. Your journey isn't over. Day 12 is waiting for you.
              </p>

              <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[#888888]">Complete today's mission to recover</span>
                <button
                  onClick={() => navigate('/day/12')}
                  className="text-[13px] font-bold text-[#FF5A36] hover:underline"
                >
                  Resume Challenge →
                </button>
              </div>
            </Card>
          ) : isFirstDay ? (
            <Card variant="dark">
              <span className="small-label text-[#FF5A36]">DAY 1 READY</span>
              <div className="text-[24px] font-extrabold text-white my-1.5 leading-tight">
                Your journey starts today.
              </div>
              <p className="text-[14px] text-[#AAAAAA]">
                Complete today's mission to start your streak.
              </p>
              <div className="mt-4">
                <Button variant="primary" size="sm" onClick={() => navigate('/day/12')}>
                  Start Day 1 →
                </Button>
              </div>
            </Card>
          ) : (
            <Card variant="dark" className="border border-[#262626]">
              <span className="small-label text-[#FF5A36]">CURRENT STREAK</span>

              <div className="flex items-baseline justify-between my-1">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🔥</span>
                  <span className="text-[34px] font-black text-white tracking-tight">11 days</span>
                </div>
              </div>

              <p className="text-[14px] text-[#AAAAAA] font-medium">
                Keep going — you're building a habit.
              </p>

              <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between text-[12px] text-[#888888]">
                <span>Best streak: 18 days</span>
                <span className="text-emerald-400 font-semibold">Top 5% consistency</span>
              </div>
            </Card>
          )}

          {/* BUILD CHAIN COMPONENT */}
          <BuildChain
            completedDays={completedDays}
            currentDay={currentDay}
            missedDays={isMissedDay ? [11] : []}
            totalDays={60}
            isMissed={isMissedDay}
          />

          {/* LATEST TEST RESULT CARD (Part 10) */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="section-title text-[19px]">Latest Test Performance</h2>
              <span className="text-[12px] font-bold text-[#FF5A36]">Day 12 Test</span>
            </div>

            {testResult ? (
              <Card className="border border-[#E6E6E1] p-4 space-y-3 bg-white">
                <div className="flex items-center justify-between border-b border-[#E6E6E1] pb-2.5">
                  <div className="flex items-center gap-2">
                    <FileCheck size={18} className="text-[#FF5A36]" />
                    <span className="font-extrabold text-[15px] text-[#111111]">Daily Evaluation</span>
                  </div>
                  <Badge variant="orange">{testResult.percentage}% Score</Badge>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-[12px] font-bold text-[#6B6B6B] uppercase tracking-wider block">Score</span>
                    <span className="text-[28px] font-black text-[#111111]">{testResult.score} / {testResult.totalQuestions}</span>
                  </div>

                  <div className="text-right text-[12px] space-y-0.5">
                    <div className="text-emerald-600 font-bold">✓ {testResult.correctCount} Correct</div>
                    <div className="text-red-500 font-bold">✗ {testResult.wrongCount} Wrong</div>
                    <div className="text-amber-600 font-bold">• {testResult.notAttemptedCount} Unanswered</div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate('/day/12')}
                    className="w-full text-[13px] font-bold"
                  >
                    View / Retake Test →
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="border border-[#E6E6E1] p-4 flex items-center justify-between bg-white">
                <div>
                  <h4 className="font-bold text-[15px] text-[#111111]">No test attempted yet</h4>
                  <p className="text-[13px] text-[#6B6B6B]">Complete the 5-question test on Day 12.</p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/day/12')}
                  className="font-bold shrink-0 ml-2"
                >
                  Take Test →
                </Button>
              </Card>
            )}
          </section>

          {/* PROGRESS SECTION */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-[#111111]">Your 60-day journey</span>
              <span className="font-bold text-[#FF5A36] text-[13px]">{progressPercent}% complete</span>
            </div>

            <ProgressBar progress={progressPercent} height="8px" />

            <div className="text-[12px] font-semibold text-[#6B6B6B]">
              {completedDays.length} completed · {60 - completedDays.length} remaining
            </div>
          </section>

          {/* TODAY'S MISSION CARD */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="section-title text-[19px]">Today's mission</h2>
              <span className="text-[12px] font-bold text-[#FF5A36]">Active Mission</span>
            </div>

            <Card className="border border-[#E6E6E1] p-[20px] space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="orange">DAY {currentDay}</Badge>
                <div className="flex items-center gap-3 text-[12px] font-semibold text-[#6B6B6B]">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> ~45 min
                  </span>
                  <span className="flex items-center gap-1">
                    <Code size={14} /> HTML · CSS
                  </span>
                </div>
              </div>

              <div>
                <h3 className="card-title text-[18px] font-bold text-[#111111] leading-tight">
                  {MISSION_DAY_12.title}
                </h3>
                <p className="text-[14px] text-[#6B6B6B] mt-1.5 leading-relaxed">
                  {MISSION_DAY_12.shortDesc}
                </p>
              </div>

              <Button
                variant="primary"
                onClick={() => navigate('/day/12')}
                className="h-[50px] font-bold text-[15px] shadow-sm"
              >
                {isMissedDay ? 'Resume Mission →' : isFirstDay ? 'Start Mission →' : 'Continue Mission →'}
              </Button>
            </Card>
          </section>

          {/* ACHIEVEMENTS */}
          <section className="space-y-3">
            <h2 className="section-title text-[19px]">Your achievements</h2>

            <div className="grid grid-cols-3 gap-2.5">
              {ACHIEVEMENTS.map((item) => (
                <Card key={item.id} className="p-3 text-center flex flex-col items-center justify-center border-[#E6E6E1]">
                  <span className="text-2xl mb-1">{item.icon}</span>
                  <span className="text-[12px] font-bold text-[#111111] leading-tight block">
                    {item.title}
                  </span>
                </Card>
              ))}
            </div>
          </section>

          {/* RECENT ACTIVITY */}
          <section className="space-y-3">
            <h2 className="section-title text-[19px]">Recent activity</h2>

            <Card className="divide-y divide-[#E6E6E1] p-0 overflow-hidden">
              {RECENT_ACTIVITY.map((act) => (
                <div key={act.day} className="p-3.5 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={18} className="text-[#1F9D68]" />
                    <span className="text-[14px] font-semibold text-[#111111]">
                      Day {act.day} — {act.title}
                    </span>
                  </div>
                  <span className="text-[12px] text-[#6B6B6B]">{act.date}</span>
                </div>
              ))}
            </Card>
          </section>
        </main>

        {/* FIXED BOTTOM NAVIGATION */}
        <BottomNavigation />
      </div>
    </div>
  );
}
