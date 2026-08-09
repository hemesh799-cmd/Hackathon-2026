import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';
import BottomNavigation from '../components/BottomNavigation';
import { getSavedProfileName, saveProfileName, ACHIEVEMENTS } from '../data/mockData';
import { User, CheckCircle2, Award, Compass, Edit3, ArrowLeft } from 'lucide-react';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState('');
  const [inputName, setInputName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Load saved profile name on mount
  useEffect(() => {
    const saved = getSavedProfileName();
    if (saved) {
      setProfileName(saved);
      setInputName(saved);
    } else {
      // Default state: profile incomplete, open editing by default if requested or prompt
      setIsEditing(false);
    }
  }, []);

  const handleOpenCompletion = () => {
    setIsEditing(true);
    setValidationError('');
  };

  const handleSaveProfile = (e) => {
    if (e) e.preventDefault();

    if (!inputName || !inputName.trim()) {
      setValidationError('Please enter your name.');
      return;
    }

    const trimmed = inputName.trim();
    saveProfileName(trimmed);
    setProfileName(trimmed);
    setIsEditing(false);
    setValidationError('');
  };

  const isProfileCompleted = Boolean(profileName && profileName.trim());

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col items-center selection:bg-[#FF5A36] selection:text-white pb-24">
      {/* 390px Mobile Container */}
      <div className="w-full max-w-[390px] min-h-screen bg-[#F7F7F5] flex flex-col shadow-sm border-x border-[#E6E6E1]/50">
        
        {/* HEADER */}
        <header className="sticky top-0 z-40 w-full h-[56px] bg-white/95 backdrop-blur-md border-b border-[#E6E6E1] flex items-center justify-between px-5">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1 font-semibold text-[14px] text-[#111111] hover:text-[#FF5A36]"
          >
            <ArrowLeft size={18} /> Dashboard
          </button>

          <span className="font-extrabold text-[14px] text-[#111111]">
            PROFILE
          </span>

          <div className="w-6" />
        </header>

        {/* MAIN CONTENT */}
        <main className="px-5 space-y-6 pt-5 flex-1">
          
          {/* PROFILE AVATAR & HEADER */}
          <div className="text-center space-y-3 py-2">
            <div className="w-20 h-20 rounded-full bg-[#171717] text-white font-extrabold text-3xl flex items-center justify-center mx-auto border-4 border-white shadow-md">
              {isProfileCompleted ? profileName.charAt(0).toUpperCase() : <User size={36} />}
            </div>

            <div>
              <h1 className="text-[26px] font-black text-[#111111]">
                {isProfileCompleted ? profileName : 'Complete Your Profile'}
              </h1>
              <p className="text-[14px] font-medium text-[#6B6B6B]">
                {isProfileCompleted ? 'ABTalks Challenger' : 'Set up your challenger persona'}
              </p>
            </div>
          </div>

          {/* INTERACTIVE PROFILE COMPLETION CARD (PART 6 & 7 & 9) */}
          {!isEditing ? (
            <Card variant={isProfileCompleted ? 'dark' : 'highlight'} className={isProfileCompleted ? 'border border-[#262626]' : 'border-dashed border-[#FF5A36]'}>
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant={isProfileCompleted ? 'orange' : 'warning'} className="mb-2">
                    {isProfileCompleted ? 'PROFILE COMPLETE ✓' : 'ACTION REQUIRED'}
                  </Badge>

                  <h3 className="font-bold text-[18px] text-white">
                    {isProfileCompleted ? 'Profile details active' : 'Complete your profile'}
                  </h3>

                  <p className="text-[13px] text-[#AAAAAA] mt-1">
                    {isProfileCompleted
                      ? 'Your name is personalized across your dashboard and daily missions.'
                      : 'Add your name and personalize your ABTalks experience.'}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  variant={isProfileCompleted ? 'secondary' : 'primary'}
                  size="md"
                  onClick={handleOpenCompletion}
                  className="w-full h-[48px] font-bold text-[14px]"
                >
                  {isProfileCompleted ? 'Edit Profile Name' : 'Complete Profile →'}
                </Button>
              </div>
            </Card>
          ) : (
            /* EDIT PROFILE FORM INTERFACE */
            <Card className="p-5 border-[#FF5A36] space-y-4 bg-white shadow-md">
              <div>
                <span className="small-label text-[#FF5A36]">PROFILE FORM</span>
                <h3 className="text-[20px] font-black text-[#111111] mt-0.5">
                  Complete Your Profile
                </h3>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-[14px] font-bold text-[#111111] mb-1.5">
                    What's your name?
                  </label>
                  <Input
                    placeholder="Enter your name"
                    value={inputName}
                    onChange={(e) => {
                      setInputName(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    error={validationError}
                  />
                  {validationError && (
                    <p className="text-[12px] font-bold text-red-500 mt-1.5 flex items-center gap-1">
                      ⚠️ {validationError}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  {isProfileCompleted && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="md"
                      onClick={() => {
                        setIsEditing(false);
                        setValidationError('');
                        setInputName(profileName);
                      }}
                      className="flex-1 h-[48px]"
                    >
                      Cancel
                    </Button>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="flex-1 h-[48px] font-bold text-[15px]"
                  >
                    Save Profile
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* PROFILE STATS SUMMARY (PART 9) */}
          <section className="space-y-3">
            <h2 className="section-title text-[18px]">Profile details</h2>

            <Card className="p-0 divide-y divide-[#E6E6E1] border-[#E6E6E1]">
              <div className="p-4 flex items-center justify-between">
                <span className="text-[14px] font-semibold text-[#6B6B6B]">Name:</span>
                <span className="text-[15px] font-bold text-[#111111]">
                  {isProfileCompleted ? profileName : 'Not set'}
                </span>
              </div>

              <div className="p-4 flex items-center justify-between">
                <span className="text-[14px] font-semibold text-[#6B6B6B]">Track:</span>
                <span className="text-[15px] font-bold text-[#111111]">
                  Web Development
                </span>
              </div>

              <div className="p-4 flex items-center justify-between">
                <span className="text-[14px] font-semibold text-[#6B6B6B]">Progress:</span>
                <span className="text-[15px] font-bold text-[#FF5A36]">
                  12 / 60 days
                </span>
              </div>

              <div className="p-4 flex items-center justify-between">
                <span className="text-[14px] font-semibold text-[#6B6B6B]">Achievements:</span>
                <span className="text-[15px] font-bold text-[#111111]">
                  3 unlocked
                </span>
              </div>
            </Card>
          </section>

          {/* ACHIEVEMENTS PREVIEW */}
          <section className="space-y-3">
            <h2 className="section-title text-[18px]">Unlocked achievements</h2>
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

        </main>

        {/* BOTTOM NAVIGATION */}
        <BottomNavigation />
      </div>
    </div>
  );
}
