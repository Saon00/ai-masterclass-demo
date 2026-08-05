import React from 'react';
import { CHAPTERS } from '../data/courseData';
import { RotateCcw, AlertTriangle, ArrowRight } from 'lucide-react';

interface RedirectModalProps {
  isOpen: boolean;
  chapterId: number;
  questionNumber: number;
  onConfirm: () => void;
}

export const RedirectModal: React.FC<RedirectModalProps> = ({
  isOpen,
  chapterId,
  questionNumber,
  onConfirm
}) => {
  if (!isOpen) return null;

  const reviewChap = CHAPTERS[chapterId] || CHAPTERS[0];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-slate-900 border border-rose-500/50 max-w-md w-full rounded-2xl p-6 space-y-5 text-center shadow-2xl shadow-rose-950/50 relative overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Icon */}
        <div className="w-16 h-16 bg-rose-950/80 border border-rose-500 text-rose-400 rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-lg shadow-rose-950/80">
          <RotateCcw className="w-8 h-8" />
        </div>

        {/* Message */}
        <div>
          <h3 className="text-xl font-bold text-rose-200">Incorrect Answer on Q{questionNumber}!</h3>
          <p className="text-slate-300 text-xs mt-2 leading-relaxed">
            You missed a core concept regarding <strong className="text-white">"{reviewChap.topic}"</strong>.
            Let's go back to review <strong className="text-indigo-300">{reviewChap.title}</strong>.
          </p>
        </div>

        {/* Strict Rule Callout */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-amber-300 font-mono flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Strict Adaptive Mastery Rule: Assessment restarts from Q1 after review.</span>
        </div>

        {/* Action Button */}
        <button
          onClick={onConfirm}
          className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-rose-950/80 flex items-center justify-center gap-2"
        >
          <span>Go to Chapter Topic & Review</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
