import React from 'react';
import { CHAPTERS } from '../data/courseData';
import { Brain, GraduationCap, Volume2, BookOpen, CheckCircle } from 'lucide-react';

interface HeaderProps {
  currentChapterIndex: number;
  activeView: 'lecture' | 'quiz';
  onSelectChapter: (index: number) => void;
  onGoToQuiz: () => void;
  completedChapters: boolean[];
}

export const Header: React.FC<HeaderProps> = ({
  currentChapterIndex,
  activeView,
  onSelectChapter,
  onGoToQuiz,
  completedChapters
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 sticky top-0 z-40 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
        
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 text-white p-2.5 rounded-xl font-bold text-xl shadow-md shadow-indigo-900/40 flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-slate-100 flex items-center gap-2">
              AI Masterclass & Assessment
            </h1>
            <p className="text-xs text-indigo-400 font-medium flex items-center gap-1.5 mt-0.5">
              <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>British Accent AI Voiceover Enabled</span>
            </p>
          </div>
        </div>

        {/* View Toggle & Chapter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
          {/* Chapter Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            {CHAPTERS.map((chap, idx) => {
              const isActive = activeView === 'lecture' && currentChapterIndex === idx;
              const isDone = completedChapters[idx];

              return (
                <button
                  key={chap.id}
                  onClick={() => onSelectChapter(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/50 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/70'
                  }`}
                  title={chap.title}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Ch {idx + 1}</span>
                  {isDone && <CheckCircle className="w-3 h-3 text-emerald-400 ml-0.5" />}
                </button>
              );
            })}
          </div>

          {/* Assessment Tab Button */}
          <button
            onClick={onGoToQuiz}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shadow-md ${
              activeView === 'quiz'
                ? 'bg-emerald-600 text-white ring-2 ring-emerald-400/30'
                : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800 hover:bg-emerald-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Final Quiz</span>
          </button>
        </div>

      </div>
    </header>
  );
};
