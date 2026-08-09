import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Badge from './Badge';
import { DAILY_TEST_QUESTIONS, getSavedTestResult, saveTestResult } from '../data/mockData';
import { CheckCircle2, XCircle, AlertCircle, ChevronLeft, ChevronRight, RotateCcw, Award } from 'lucide-react';

// Helper to normalize answers for safe comparison
export const normalizeAnswer = (val) => {
  if (val === undefined || val === null) return '';
  if (typeof val !== 'string') return String(val).trim();
  return val.trim();
};

// Helper to extract option key like "A" from "A) Manage..." or return normalized string
export const extractOptionKey = (val) => {
  const norm = normalizeAnswer(val);
  if (!norm) return '';
  // Check if starts with A), B), C), D) or single letter A, B, C, D
  const match = norm.match(/^([A-Za-z])(?:\)|[\s.:]|$)/);
  if (match) {
    return match[1].toUpperCase();
  }
  return norm.toUpperCase();
};

export const evaluateQuestion = (q, rawAnswer) => {
  const normAnswer = normalizeAnswer(rawAnswer);
  if (!normAnswer) {
    return {
      status: 'NOT_ATTEMPTED',
      displayStatus: 'Not Attempted',
      marks: 0,
      studentAnswer: 'Not answered',
      correctAnswer: q.correctAnswer,
      isCorrect: false
    };
  }

  const studentKey = extractOptionKey(normAnswer);
  const correctKey = extractOptionKey(q.correctAnswer);

  if (studentKey === correctKey) {
    return {
      status: 'CORRECT',
      displayStatus: 'Correct ✓',
      marks: 1,
      studentAnswer: rawAnswer,
      correctAnswer: q.correctAnswer,
      isCorrect: true
    };
  } else {
    return {
      status: 'WRONG',
      displayStatus: 'Wrong ✗',
      marks: 0,
      studentAnswer: rawAnswer,
      correctAnswer: q.correctAnswer,
      isCorrect: false
    };
  }
};

export default function DailyTestSection({ onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  // Load existing test result if available
  useEffect(() => {
    const saved = getSavedTestResult();
    if (saved) {
      setEvaluation(saved);
      if (saved.userAnswers) {
        setUserAnswers(saved.userAnswers);
      }
      setTestCompleted(true);
    }
  }, []);

  const totalQuestions = DAILY_TEST_QUESTIONS.length;
  const currentQuestion = DAILY_TEST_QUESTIONS[currentIdx];

  const handleSelectOption = (opt) => {
    // If selecting the already selected answer, clear it (Test Case 6)
    const currentVal = userAnswers[currentIdx];
    if (currentVal === opt) {
      const updated = { ...userAnswers };
      delete updated[currentIdx];
      setUserAnswers(updated);
    } else {
      setUserAnswers({
        ...userAnswers,
        [currentIdx]: opt
      });
    }
  };

  const handleClearAnswer = () => {
    const updated = { ...userAnswers };
    delete updated[currentIdx];
    setUserAnswers(updated);
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmitTest = () => {
    let correctCount = 0;
    let wrongCount = 0;
    let notAttemptedCount = 0;

    const questionResults = DAILY_TEST_QUESTIONS.map((q, idx) => {
      const rawAns = userAnswers[idx];
      const res = evaluateQuestion(q, rawAns);

      if (res.status === 'CORRECT') correctCount++;
      else if (res.status === 'WRONG') wrongCount++;
      else notAttemptedCount++;

      return {
        questionId: q.id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        studentAnswer: rawAns || 'Not answered',
        evaluation: res
      };
    });

    const score = correctCount; // Out of 5
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    const evalData = {
      score,
      totalQuestions,
      percentage,
      correctCount,
      wrongCount,
      notAttemptedCount,
      questionResults,
      userAnswers,
      completedAt: new Date().toISOString()
    };

    saveTestResult(evalData);
    setEvaluation(evalData);
    setTestCompleted(true);

    if (onComplete) {
      onComplete(evalData);
    }
  };

  const handleRetakeTest = () => {
    setUserAnswers({});
    setCurrentIdx(0);
    setTestCompleted(false);
    setEvaluation(null);
  };

  // If Test is Submitted, show Results & Review Page
  if (testCompleted && evaluation) {
    return (
      <Card className="p-5 border-[#E6E6E1] space-y-6 animate-fadeIn">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-[#FF5A36]/10 text-[#FF5A36] rounded-full flex items-center justify-center mx-auto text-3xl border-2 border-[#FF5A36]/30">
            🎉
          </div>
          <div>
            <span className="small-label text-[#FF5A36]">DAILY EVALUATION COMPLETE</span>
            <h2 className="text-[26px] font-black text-[#111111] leading-tight mt-1">
              TEST COMPLETE 🎉
            </h2>
          </div>

          <div className="bg-[#171717] text-white p-4 rounded-[16px] space-y-2 border border-[#262626]">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-[36px] font-black text-[#FF5A36]">{evaluation.score}</span>
              <span className="text-[20px] text-[#AAAAAA]">/ {evaluation.totalQuestions}</span>
            </div>

            <div className="text-[18px] font-bold text-emerald-400">
              Percentage: {evaluation.percentage}%
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#262626] text-center text-[12px]">
              <div className="bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/40">
                <div className="font-extrabold text-emerald-400 text-[16px]">{evaluation.correctCount}</div>
                <div className="text-emerald-300/80 font-bold">Correct</div>
              </div>
              <div className="bg-red-950/40 p-2 rounded-lg border border-red-800/40">
                <div className="font-extrabold text-red-400 text-[16px]">{evaluation.wrongCount}</div>
                <div className="text-red-300/80 font-bold">Wrong</div>
              </div>
              <div className="bg-amber-950/40 p-2 rounded-lg border border-amber-800/40">
                <div className="font-extrabold text-amber-400 text-[16px]">{evaluation.notAttemptedCount}</div>
                <div className="text-amber-300/80 font-bold text-[11px]">Not Attempted</div>
              </div>
            </div>
          </div>
        </div>

        {/* Question Review Section (PART 5) */}
        <div className="space-y-4 pt-2">
          <h3 className="text-[17px] font-bold text-[#111111] border-b border-[#E6E6E1] pb-2">
            Question Review
          </h3>

          <div className="space-y-4">
            {evaluation.questionResults.map((item, idx) => {
              const ev = item.evaluation;
              const isCorrect = ev.status === 'CORRECT';
              const isWrong = ev.status === 'WRONG';
              const isNotAttempted = ev.status === 'NOT_ATTEMPTED';

              return (
                <div
                  key={item.questionId}
                  className={`p-4 rounded-[14px] border ${
                    isCorrect
                      ? 'bg-emerald-50/60 border-emerald-200'
                      : isWrong
                      ? 'bg-red-50/60 border-red-200'
                      : 'bg-amber-50/60 border-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-bold text-[#6B6B6B]">
                      Question {idx + 1}
                    </span>

                    <span
                      className={`text-[12px] font-extrabold px-2.5 py-1 rounded-full border ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : isWrong
                          ? 'bg-red-100 text-red-800 border-red-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}
                    >
                      {ev.displayStatus}
                    </span>
                  </div>

                  <p className="font-bold text-[14px] text-[#111111] mb-3">
                    {item.question}
                  </p>

                  <div className="space-y-1.5 text-[13px] bg-white p-3 rounded-lg border border-[#E6E6E1]/80">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[#6B6B6B] font-medium">Your answer:</span>
                      <span className={`font-semibold ${isCorrect ? 'text-emerald-700' : isWrong ? 'text-red-600' : 'text-amber-700'}`}>
                        {item.studentAnswer}
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline border-t border-[#F0F0EE] pt-1.5 mt-1.5">
                      <span className="text-[#6B6B6B] font-medium">Correct answer:</span>
                      <span className="font-semibold text-[#111111]">
                        {item.correctAnswer}
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline border-t border-[#F0F0EE] pt-1.5 mt-1.5">
                      <span className="text-[#6B6B6B] font-medium">Marks:</span>
                      <span className="font-bold text-[#111111]">
                        {ev.marks}/1
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-2">
          <Button variant="secondary" size="md" onClick={handleRetakeTest} className="w-full flex items-center justify-center gap-2 h-[48px]">
            <RotateCcw size={16} /> Retake Test
          </Button>
        </div>
      </Card>
    );
  }

  // Active Question View
  return (
    <Card className="p-5 border-[#E6E6E1] space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E6E6E1] pb-3">
        <div>
          <span className="small-label text-[#FF5A36]">DAILY KNOWLEDGE CHECK</span>
          <h2 className="text-[18px] font-bold text-[#111111]">
            Question {currentIdx + 1} of {totalQuestions}
          </h2>
        </div>

        {/* Indicator dots */}
        <div className="flex items-center gap-1">
          {DAILY_TEST_QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentIdx
                  ? 'bg-[#FF5A36] scale-125'
                  : userAnswers[i] !== undefined
                  ? 'bg-[#171717]'
                  : 'bg-[#E6E6E1]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Text */}
      <div className="space-y-3">
        <h3 className="text-[16px] font-extrabold text-[#111111] leading-snug">
          {currentQuestion.question}
        </h3>

        {/* Options List */}
        <div className="space-y-2.5">
          {currentQuestion.options.map((optionText, oIdx) => {
            const isSelected = userAnswers[currentIdx] === optionText;

            return (
              <button
                key={oIdx}
                type="button"
                onClick={() => handleSelectOption(optionText)}
                className={`w-full min-h-[48px] p-3 px-4 rounded-[12px] text-left text-[14px] font-medium transition-all flex items-center justify-between border ${
                  isSelected
                    ? 'bg-[#FF5A36]/10 border-[#FF5A36] text-[#FF5A36] font-bold shadow-sm'
                    : 'bg-white border-[#E6E6E1] text-[#111111] hover:border-[#171717]/40'
                }`}
              >
                <span>{optionText}</span>
                {isSelected && (
                  <CheckCircle2 size={18} className="text-[#FF5A36] shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Option to clear selection if selected */}
      {userAnswers[currentIdx] !== undefined && (
        <div className="text-right">
          <button
            type="button"
            onClick={handleClearAnswer}
            className="text-[12px] font-semibold text-[#6B6B6B] hover:text-red-500 underline"
          >
            Clear selection (Leave unanswered)
          </button>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#E6E6E1]">
        <Button
          variant="secondary"
          size="md"
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="flex-1 h-[48px] min-h-[44px]"
        >
          <ChevronLeft size={18} className="mr-1" /> Previous
        </Button>

        {currentIdx < totalQuestions - 1 ? (
          <Button
            variant="dark"
            size="md"
            onClick={handleNext}
            className="flex-1 h-[48px] min-h-[44px]"
          >
            Next <ChevronRight size={18} className="ml-1" />
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            onClick={handleSubmitTest}
            className="flex-1 h-[48px] min-h-[44px] font-bold shadow-md shadow-[#FF5A36]/20"
          >
            Submit Test
          </Button>
        )}
      </div>
    </Card>
  );
}
