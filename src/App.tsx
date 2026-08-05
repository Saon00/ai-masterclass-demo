import React, { useState } from 'react';
import { CHAPTERS, QUESTIONS } from './data/courseData';
import { Header } from './components/Header';
import { LectureView } from './components/LectureView';
import { QuizView } from './components/QuizView';
import { RedirectModal } from './components/RedirectModal';
import { CompletionModal } from './components/CompletionModal';

export default function App() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [activeView, setActiveView] = useState<'lecture' | 'quiz'>('lecture');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [quizStreak, setQuizStreak] = useState<number>(0);
  const [completedChapters, setCompletedChapters] = useState<boolean[]>(new Array(CHAPTERS.length).fill(false));

  // Modal States
  const [isRedirectModalOpen, setIsRedirectModalOpen] = useState<boolean>(false);
  const [targetReviewChapterId, setTargetReviewChapterId] = useState<number>(0);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState<boolean>(false);

  // Navigation handlers
  const handleSelectChapter = (index: number) => {
    setCurrentChapterIndex(index);
    setActiveView('lecture');
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < CHAPTERS.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  const handleGoToQuiz = () => {
    setActiveView('quiz');
  };

  const handleGoToLecture = (chapterIndex: number) => {
    setCurrentChapterIndex(chapterIndex);
    setActiveView('lecture');
  };

  // Quiz Logic with Strict Adaptive Redirect
  const handleAnswerSelected = (selectedOptionIndex: number) => {
    const currentQ = QUESTIONS[currentQuestionIndex];

    if (selectedOptionIndex === currentQ.correct) {
      // Correct Answer!
      setQuizStreak((prev) => prev + 1);

      // Mark chapter as completed
      setCompletedChapters((prev) => {
        const next = [...prev];
        next[currentQ.chapterId] = true;
        return next;
      });

      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // Answered all 10 questions correctly!
        setIsCompletionModalOpen(true);
      }
    } else {
      // Incorrect Answer! Triggers strict adaptive redirect
      setTargetReviewChapterId(currentQ.chapterId);
      setIsRedirectModalOpen(true);
    }
  };

  // Confirm Redirect Modal -> Goes back to lecture chapter & resets quiz to Q1
  const handleConfirmRedirect = () => {
    setIsRedirectModalOpen(false);
    setCurrentQuestionIndex(0);
    setQuizStreak(0);
    setCurrentChapterIndex(targetReviewChapterId);
    setActiveView('lecture');
  };

  const handleRestartAll = () => {
    setIsCompletionModalOpen(false);
    setCurrentQuestionIndex(0);
    setQuizStreak(0);
    setCurrentChapterIndex(0);
    setActiveView('lecture');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0b0f19] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation */}
      <Header
        currentChapterIndex={currentChapterIndex}
        activeView={activeView}
        onSelectChapter={handleSelectChapter}
        onGoToQuiz={handleGoToQuiz}
        completedChapters={completedChapters}
      />

      {/* Main App Workspace */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-grow w-full">
        {activeView === 'lecture' ? (
          <LectureView
            chapters={CHAPTERS}
            currentChapterIndex={currentChapterIndex}
            onPrevChapter={handlePrevChapter}
            onNextChapter={handleNextChapter}
            onGoToQuiz={handleGoToQuiz}
          />
        ) : (
          <QuizView
            questions={QUESTIONS}
            currentQuestionIndex={currentQuestionIndex}
            streak={quizStreak}
            onAnswerSelected={handleAnswerSelected}
            onGoToLecture={handleGoToLecture}
          />
        )}
      </main>

      {/* Redirect Modal for Adaptive Incorrect Answer */}
      <RedirectModal
        isOpen={isRedirectModalOpen}
        chapterId={targetReviewChapterId}
        questionNumber={currentQuestionIndex + 1}
        onConfirm={handleConfirmRedirect}
      />

      {/* Course Completion Modal */}
      <CompletionModal
        isOpen={isCompletionModalOpen}
        onRestart={handleRestartAll}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-4 text-center text-xs text-slate-500">
        AI Video Masterclass Platform &copy; 2026. Interactive AI Lecture with British Voiceover & Adaptive Mastery Quiz.
      </footer>

    </div>
  );
}
