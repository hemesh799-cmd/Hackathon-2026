import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { Flame, CheckCircle2, ArrowRight, Zap, Target, Code, Trophy } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const scrollToHowItWorks = (e) => {
    e.preventDefault();
    const elem = document.getElementById('how-it-works');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col items-center selection:bg-[#FF5A36] selection:text-white">
      {/* 390px Maximum Mobile Container */}
      <div className="w-full max-w-[390px] min-h-screen bg-[#F7F7F5] flex flex-col pb-20 shadow-sm border-x border-[#E6E6E1]/50">
        
        {/* Header */}
        <Header rightLink={{ label: 'How it works', href: '#how-it-works' }} onRightClick={scrollToHowItWorks} />

        {/* Page Content */}
        <main className="px-[20px] pt-6 flex-1 space-y-9">
          
          {/* HERO SECTION */}
          <section className="space-y-4">
            <div>
              <Badge variant="orange" className="mb-3.5">
                60-DAY CODING CHALLENGE
              </Badge>
              <h1 className="text-[34px] font-[750] leading-[1.05] tracking-[-0.04em] text-[#111111]">
                Build every day. Become impossible to ignore.
              </h1>
            </div>

            <p className="text-[15px] leading-[1.55] text-[#6B6B6B]">
              One project. One proof of work. Every day. Build a public learning streak that recruiters can see.
            </p>

            <div className="pt-2 space-y-2.5">
              <Button
                variant="primary"
                onClick={() => navigate('/dashboard')}
                className="h-[52px] text-[15px] font-bold shadow-lg shadow-[#FF5A36]/25"
              >
                Start the 60-Day Challenge →
              </Button>

              <p className="text-[12px] text-center text-[#6B6B6B] font-medium">
                No payment. No experience required. Just show up and build.
              </p>
            </div>

            {/* HERO VISUAL DARK CARD */}
            <Card variant="dark" className="mt-6 border border-[#262626] relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="small-label text-[#FF5A36]">YOUR BUILD STREAK</span>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                  LIVE STREAK
                </span>
              </div>

              <div className="flex items-baseline justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🔥</span>
                  <span className="text-[32px] font-extrabold tracking-tight text-white">11 DAYS</span>
                </div>
                <span className="text-[13px] font-semibold text-[#888888]">DAY 12 / 60</span>
              </div>

              {/* Visual streak chain preview */}
              <div className="pt-3 border-t border-[#262626] flex items-center justify-between gap-1.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-7 flex-1 rounded-md flex items-center justify-center text-[10px] font-bold ${
                      i < 7 ? 'bg-[#FF5A36] text-white' : i === 7 ? 'bg-white text-[#171717] ring-2 ring-[#FF5A36]' : 'bg-[#262626] text-[#666666]'
                    }`}
                  >
                    {i < 7 ? '✓' : i === 7 ? '12' : ''}
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* SECTION: HOW IT WORKS */}
          <section id="how-it-works" className="pt-2 space-y-4">
            <div>
              <span className="small-label text-[#FF5A36]">METHODOLOGY</span>
              <h2 className="section-title mt-1">How it works</h2>
            </div>

            <div className="bg-white rounded-[18px] border border-[#E6E6E1] divide-y divide-[#E6E6E1]">
              <div className="p-4 flex gap-3.5 items-start">
                <span className="font-mono font-extrabold text-[15px] text-[#FF5A36] pt-0.5">01</span>
                <div>
                  <h3 className="card-title text-[16px] font-bold text-[#111111]">Pick your track</h3>
                  <p className="text-[14px] text-[#6B6B6B] mt-0.5">Choose what you want to become better at.</p>
                </div>
              </div>

              <div className="p-4 flex gap-3.5 items-start">
                <span className="font-mono font-extrabold text-[15px] text-[#FF5A36] pt-0.5">02</span>
                <div>
                  <h3 className="card-title text-[16px] font-bold text-[#111111]">Build every day</h3>
                  <p className="text-[14px] text-[#6B6B6B] mt-0.5">Complete one practical coding mission.</p>
                </div>
              </div>

              <div className="p-4 flex gap-3.5 items-start">
                <span className="font-mono font-extrabold text-[15px] text-[#FF5A36] pt-0.5">03</span>
                <div>
                  <h3 className="card-title text-[16px] font-bold text-[#111111]">Prove your work</h3>
                  <p className="text-[14px] text-[#6B6B6B] mt-0.5">Submit your GitHub commit and LinkedIn post.</p>
                </div>
              </div>

              <div className="p-4 flex gap-3.5 items-start">
                <span className="font-mono font-extrabold text-[15px] text-[#FF5A36] pt-0.5">04</span>
                <div>
                  <h3 className="card-title text-[16px] font-bold text-[#111111]">Build your public streak</h3>
                  <p className="text-[14px] text-[#6B6B6B] mt-0.5">Turn consistency into visible proof.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: WHY 60 DAYS? */}
          <section className="space-y-4">
            <Card variant="dark" className="p-6 space-y-6">
              <div>
                <span className="small-label text-[#FF5A36]">HABIT FORMATION</span>
                <h2 className="text-[22px] font-extrabold text-white leading-tight mt-1">
                  60 days is long enough to change your habits.
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center border-t border-[#262626] pt-5">
                <div>
                  <div className="text-[32px] font-black text-[#FF5A36]">60</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#888888]">DAYS</div>
                </div>

                <div>
                  <div className="text-[32px] font-black text-white">1</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#888888]">BUILD / DAY</div>
                </div>

                <div>
                  <div className="text-[32px] font-black text-white">120</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#888888]">PROOFS</div>
                </div>
              </div>
            </Card>
          </section>

          {/* SECTION: YOUR JOURNEY */}
          <section className="space-y-4">
            <div>
              <span className="small-label text-[#FF5A36]">MILESTONES</span>
              <h2 className="section-title mt-1">Your journey</h2>
            </div>

            <Card className="p-5">
              <div className="relative py-3">
                {/* Timeline line */}
                <div className="absolute top-1/2 left-2 right-2 h-1 bg-[#E6E6E1] -translate-y-1/2" />
                <div className="absolute top-1/2 left-2 w-[22%] h-1 bg-[#FF5A36] -translate-y-1/2" />

                {/* Timeline dots */}
                <div className="relative z-10 flex items-center justify-between text-center">
                  <div>
                    <div className="w-6 h-6 rounded-full bg-[#FF5A36] text-white font-bold text-[10px] flex items-center justify-center mx-auto shadow-sm">
                      01
                    </div>
                    <span className="text-[10px] font-bold text-[#111111] block mt-1.5">DAY 01</span>
                  </div>

                  <div>
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-[#FF5A36] flex items-center justify-center mx-auto">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF5A36]" />
                    </div>
                    <span className="text-[10px] font-bold text-[#6B6B6B] block mt-1.5">DAY 15</span>
                  </div>

                  <div>
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-[#E6E6E1] flex items-center justify-center mx-auto" />
                    <span className="text-[10px] font-bold text-[#6B6B6B] block mt-1.5">DAY 30</span>
                  </div>

                  <div>
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-[#E6E6E1] flex items-center justify-center mx-auto" />
                    <span className="text-[10px] font-bold text-[#6B6B6B] block mt-1.5">DAY 45</span>
                  </div>

                  <div>
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-[#E6E6E1] flex items-center justify-center mx-auto" />
                    <span className="text-[10px] font-bold text-[#6B6B6B] block mt-1.5">DAY 60</span>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* FINAL CTA */}
          <section className="pt-2 text-center space-y-4">
            <h2 className="text-[24px] font-extrabold text-[#111111]">
              Ready to build something every day?
            </h2>

            <Button
              variant="primary"
              onClick={() => navigate('/dashboard')}
              className="h-[52px] text-[15px] font-bold shadow-lg shadow-[#FF5A36]/25"
            >
              Start my journey →
            </Button>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="mt-12 py-6 text-center border-t border-[#E6E6E1] text-[13px] font-semibold text-[#6B6B6B]">
          ABTalks · Build in public.
        </footer>
      </div>
    </div>
  );
}
