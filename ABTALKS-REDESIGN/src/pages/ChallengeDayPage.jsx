import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Input from '../components/Input';
import BottomNavigation from '../components/BottomNavigation';
import DailyTestSection from '../components/DailyTestSection';
import { MISSION_DAY_12, getSavedTestResult } from '../data/mockData';
import { Check, Clock, Award, Github, Linkedin, ArrowLeft, Flame, Sparkles, CheckCircle2, FileCheck } from 'lucide-react';

export default function ChallengeDayPage() {
  const navigate = useNavigate();

  // Checklist state
  const [checklist, setChecklist] = useState(MISSION_DAY_12.checklist);

  // Form states
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubAdded, setGithubAdded] = useState(false);
  const [linkedinAdded, setLinkedinAdded] = useState(false);

  // Daily test evaluation result state
  const [testResult, setTestResult] = useState(null);

  // Submission / Success state
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const savedTest = getSavedTestResult();
    if (savedTest) {
      setTestResult(savedTest);
    }
  }, []);

  const toggleCheckItem = (id) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddGithub = (e) => {
    if (e) e.preventDefault();
    if (githubUrl.trim()) {
      setGithubAdded(true);
    }
  };

  const handleAddLinkedin = (e) => {
    if (e) e.preventDefault();
    if (linkedinUrl.trim()) {
      setLinkedinAdded(true);
    }
  };

  const handleTestComplete = (evalData) => {
    setTestResult(evalData);
  };

  const handleSubmitMission = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col items-center selection:bg-[#FF5A36] selection:text-white pb-24">
      {/* 390px Mobile Container */}
      <div className="w-full max-w-[390px] min-h-screen bg-[#F7F7F5] flex flex-col shadow-sm border-x border-[#E6E6E1]/50">
        
        {/* STICKY HEADER */}
        <header className="sticky top-0 z-40 w-full h-[56px] bg-white/95 backdrop-blur-md border-b border-[#E6E6E1] flex items-center justify-between px-5">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1 font-semibold text-[14px] text-[#111111] hover:text-[#FF5A36]"
          >
            <ArrowLeft size={18} /> Back
          </button>

          <span className="font-extrabold text-[14px] text-[#111111]">
            DAY 12 / 60
          </span>

          <div className="flex items-center gap-1 font-black text-[13px] text-[#FF5A36]">
            <span>🔥</span> 11
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="px-5 space-y-7 pt-5 flex-1">
          
          {/* SUCCESS CELEBRATION STATE (PART 11) */}
          {isSubmitted ? (
            <div className="py-6 space-y-6 text-center animate-fadeIn">
              <div className="w-20 h-20 bg-[#FF5A36]/10 text-[#FF5A36] rounded-full flex items-center justify-center mx-auto text-4xl border-2 border-[#FF5A36]/30 shadow-lg">
                🎉
              </div>

              <div>
                <Badge variant="orange" className="mb-2">DAY 12 COMPLETE 🎉</Badge>
                <h1 className="text-[28px] font-black text-[#111111] leading-tight">
                  Day 12 complete!
                </h1>
                <p className="text-[14px] text-[#6B6B6B] mt-1.5">
                  You kept your streak alive. Fantastic consistency!
                </p>
              </div>

              {/* Day Completion Summary Card */}
              <Card variant="dark" className="p-5 text-left space-y-3.5 border-[#262626]">
                <div className="flex items-center justify-between border-b border-[#262626] pb-2.5">
                  <span className="small-label text-[#FF5A36]">DAY SUMMARY</span>
                  <span className="text-[12px] font-bold text-emerald-400">PASSED</span>
                </div>

                <div className="space-y-2.5 text-[14px]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#AAAAAA]">Test score:</span>
                    <span className="font-extrabold text-white">
                      {testResult ? `${testResult.score} / 5 (${testResult.percentage}%)` : 'Not Attempted'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#AAAAAA]">GitHub proof:</span>
                    <span className={githubAdded ? 'font-bold text-emerald-400' : 'text-[#777777]'}>
                      {githubAdded ? '✓ Submitted' : 'Pending'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#AAAAAA]">LinkedIn proof:</span>
                    <span className={linkedinAdded ? 'font-bold text-emerald-400' : 'text-[#777777]'}>
                      {linkedinAdded ? '✓ Submitted' : 'Pending'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-[#262626]">
                    <span className="text-[#AAAAAA]">Streak:</span>
                    <span className="font-extrabold text-[#FF5A36] flex items-center gap-1">
                      12 days 🔥
                    </span>
                  </div>
                </div>
              </Card>

              <Button
                variant="primary"
                onClick={() => navigate('/dashboard')}
                className="h-[52px] font-bold text-[15px]"
              >
                Back to Dashboard
              </Button>
            </div>
          ) : (
            <>
              {/* DAY INTRO */}
              <section className="space-y-2">
                <Badge variant="orange">TODAY'S MISSION</Badge>
                <h1 className="text-[28px] font-extrabold text-[#111111] leading-tight">
                  {MISSION_DAY_12.title}
                </h1>
                <p className="text-[15px] text-[#6B6B6B] leading-relaxed">
                  {MISSION_DAY_12.fullDesc}
                </p>
              </section>

              {/* METADATA CARDS */}
              <section className="grid grid-cols-2 gap-3">
                <Card className="p-3.5 flex flex-col justify-center">
                  <span className="text-[11px] font-bold uppercase text-[#6B6B6B] flex items-center gap-1">
                    <Clock size={13} /> Estimated time
                  </span>
                  <span className="text-[16px] font-extrabold text-[#111111] mt-1">
                    {MISSION_DAY_12.estimatedTime}
                  </span>
                </Card>

                <Card className="p-3.5 flex flex-col justify-center">
                  <span className="text-[11px] font-bold uppercase text-[#6B6B6B] flex items-center gap-1">
                    <Award size={13} /> Difficulty
                  </span>
                  <span className="text-[16px] font-extrabold text-[#111111] mt-1">
                    {MISSION_DAY_12.difficulty}
                  </span>
                </Card>
              </section>

              {/* SECTION 1: BUILD - WHAT YOU'LL BUILD */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="section-title text-[18px]">1. What you'll build</h2>
                  <span className="small-label text-[#FF5A36]">BUILD</span>
                </div>
                <Card className="p-0 overflow-hidden divide-y divide-[#E6E6E1]">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleCheckItem(item.id)}
                      className="min-h-[48px] px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-[#F7F7F5] transition-colors select-none"
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                          item.completed
                            ? 'bg-[#1F9D68] text-white'
                            : 'border-2 border-[#E6E6E1] bg-white'
                        }`}
                      >
                        {item.completed && <Check size={14} strokeWidth={3} />}
                      </div>
                      <span
                        className={`text-[14px] font-semibold ${
                          item.completed ? 'line-through text-[#6B6B6B]' : 'text-[#111111]'
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </Card>
              </section>

              {/* SECTION: MISSION BRIEF */}
              <section className="space-y-3">
                <h2 className="section-title text-[18px]">Mission brief</h2>
                <Card className="p-5 font-mono text-[13px] leading-relaxed text-[#333333] whitespace-pre-line bg-white border-[#E6E6E1]">
                  {MISSION_DAY_12.brief}
                </Card>
              </section>

              {/* SECTION 2: TEST - DAILY TEST EVALUATION ENGINE (PART 1 - 5) */}
              <section className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h2 className="section-title text-[18px]">2. Knowledge Evaluation</h2>
                  <span className="small-label text-[#FF5A36]">TEST</span>
                </div>

                <DailyTestSection onComplete={handleTestComplete} />
              </section>

              {/* SECTION 3: PROOF OF WORK */}
              <section className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="section-title text-[20px]">3. Proof of Work</h2>
                    <p className="text-[13px] text-[#6B6B6B]">Show the world what you built.</p>
                  </div>
                  <span className="small-label text-[#FF5A36]">PROOF</span>
                </div>

                {/* GITHUB CARD */}
                <Card className="p-4 space-y-3 border-[#E6E6E1]">
                  <div className="flex items-center gap-2">
                    <Github size={20} className="text-[#111111]" />
                    <span className="font-bold text-[16px] text-[#111111]">GitHub commit</span>
                  </div>
                  <p className="text-[13px] text-[#6B6B6B]">
                    Paste the URL to your repository or today's commit.
                  </p>
                  
                  <Input
                    placeholder="https://github.com/alex/portfolio-day12"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                  />

                  <Button
                    variant={githubAdded ? 'secondary' : 'dark'}
                    size="sm"
                    onClick={handleAddGithub}
                    className="min-h-[44px]"
                  >
                    {githubAdded ? '✓ GitHub Proof Added' : 'Add GitHub proof'}
                  </Button>
                </Card>

                {/* LINKEDIN CARD */}
                <Card className="p-4 space-y-3 border-[#E6E6E1]">
                  <div className="flex items-center gap-2">
                    <Linkedin size={20} className="text-[#0A66C2]" />
                    <span className="font-bold text-[16px] text-[#111111]">LinkedIn post</span>
                  </div>
                  <p className="text-[13px] text-[#6B6B6B]">
                    Share your build publicly and paste the post URL here.
                  </p>

                  <Input
                    placeholder="https://linkedin.com/posts/alex-day12-abtalks"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                  />

                  <Button
                    variant={linkedinAdded ? 'secondary' : 'dark'}
                    size="sm"
                    onClick={handleAddLinkedin}
                    className="min-h-[44px]"
                  >
                    {linkedinAdded ? '✓ LinkedIn Proof Added' : 'Add LinkedIn proof'}
                  </Button>
                </Card>

                {/* FINAL SUBMIT CTA */}
                <div className="pt-3">
                  <Button
                    variant="primary"
                    onClick={handleSubmitMission}
                    className="h-[52px] min-h-[44px] text-[15px] font-bold shadow-lg shadow-[#FF5A36]/20"
                  >
                    Complete Day 12 →
                  </Button>
                </div>
              </section>
            </>
          )}
        </main>

        {/* BOTTOM NAVIGATION */}
        <BottomNavigation />
      </div>
    </div>
  );
}
