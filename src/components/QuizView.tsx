import React, { useState } from 'react';
import { Question } from '../types';
import { CHAPTERS } from '../data/courseData';
import { ClipboardCheck, Flame, BookOpen, HelpCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface QuizViewProps {
  questions: Question[];
  currentQuestionIndex: number;
  streak: number;
  onAnswerSelected: (selectedIdx: number) => void;
  onGoToLecture: (chapterIndex: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  currentQuestionIndex,
  streak,
  onAnswerSelected,
  onGoToLecture
}) => {
  const [showHint, setShowHint] = useState<boolean>(false);
  const currentQ = questions[currentQuestionIndex];
  const relatedChapter = CHAPTERS[currentQ.chapterId];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Assessment Banner Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-wrap justify-between items-center gap-4 border-l-4 border-l-emerald-500 shadow-xl backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-emerald-400" />
            <span>Final Knowledge Assessment</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Strict Rule: Any incorrect answer redirects you to review the topic and restarts from Q1!</span>
          </p>
        </div>

        <div className="flex items-center gap-4 text-right">
          {streak > 1 && (
            <div className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800/60">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{streak} Streak</span>
            </div>
          )}

          <div>
            <span className="text-2xl font-black text-indigo-400">Q{currentQuestionIndex + 1}</span>
            <span className="text-slate-500 text-sm"> / {questions.length}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden shadow-inner">
        <div
          className="bg-indigo-500 h-full transition-all duration-500 ease-out"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl backdrop-blur-md relative">
        
        {/* Chapter Origin Tag */}
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-mono text-indigo-300 bg-indigo-950/80 px-2.5 py-1 rounded-md border border-indigo-800/80">
            Chapter {relatedChapter.id + 1}: {relatedChapter.topic}
          </span>

          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-amber-300 hover:text-amber-200 bg-amber-950/40 hover:bg-amber-900/40 border border-amber-800/60 px-3 py-1 rounded-lg transition flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
          </button>
        </div>

        {/* Question Text */}
        <h3 className="text-lg font-semibold text-slate-100 leading-snug">
          {currentQ.question}
        </h3>

        {/* Hint Box */}
        {showHint && (
          <div className="bg-amber-950/40 border border-amber-800/60 p-3 rounded-xl text-xs text-amber-200 animate-fadeIn">
            💡 <strong>Hint:</strong> Think back to {relatedChapter.title}. Review the key takeaways regarding {relatedChapter.topic}.
          </div>
        )}

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((optText, optIdx) => (
            <button
              key={optIdx}
              onClick={() => onAnswerSelected(optIdx)}
              className="w-full text-left p-4 rounded-xl border border-slate-700/80 bg-slate-800/70 hover:bg-indigo-900/40 hover:border-indigo-500 transition-all text-sm text-slate-200 flex items-center justify-between group shadow-sm"
            >
              <span className="font-medium">{optText}</span>
              <div className="w-6 h-6 rounded-full border border-slate-600 group-hover:border-indigo-400 group-hover:bg-indigo-600/20 flex items-center justify-center shrink-0 ml-3 transition">
                <CheckCircle className="w-4 h-4 text-transparent group-hover:text-indigo-400 transition" />
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Return to Lectures Button */}
      <div className="text-center">
        <button
          onClick={() => onGoToLecture(relatedChapter.id)}
          className="text-xs text-slate-400 hover:text-slate-200 underline flex items-center justify-center gap-1.5 mx-auto"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Review Chapter {relatedChapter.id + 1} Lecture Slides</span>
        </button>
      </div>

    </div>
  );
};
