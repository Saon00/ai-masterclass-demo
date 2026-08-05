import React, { useState } from 'react';
import { Chapter } from '../types';
import { VideoPlayer } from './VideoPlayer';
import { AudioNarration } from './AudioNarration';
import { GraduationCap, ArrowLeft, ArrowRight, Download, BookOpen, CheckCircle2, FileText } from 'lucide-react';

interface LectureViewProps {
  chapters: Chapter[];
  currentChapterIndex: number;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  onGoToQuiz: () => void;
}

export const LectureView: React.FC<LectureViewProps> = ({
  chapters,
  currentChapterIndex,
  onPrevChapter,
  onNextChapter,
  onGoToQuiz
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'takeaways' | 'transcript'>('overview');
  const chapter = chapters[currentChapterIndex];

  const handleDownloadTranscript = () => {
    const textContent = `
AI MASTERCLASS - CHAPTER ${chapter.id + 1}
Title: ${chapter.title}
Topic: ${chapter.topic}

KEY TAKEAWAYS:
${chapter.keyTakeaways.map((k, i) => `${i + 1}. ${k}`).join('\n')}

AUDIO NARRATION TRANSCRIPT:
${chapter.transcript}
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Chapter_${chapter.id + 1}_Notes.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Slide Metadata & Skip Button */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-indigo-950/80 text-indigo-300 border border-indigo-800 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Chapter {currentChapterIndex + 1} of {chapters.length}
          </span>
        </div>

        <button
          onClick={onGoToQuiz}
          className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl transition font-semibold flex items-center gap-2 shadow-lg shadow-emerald-950/60"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Skip to Final Assessment</span>
        </button>
      </div>

      {/* Main Grid: Video + Audio (Left) | Notes & Content (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols): Video Player & Voiceover */}
        <div className="lg:col-span-7 space-y-4">
          <VideoPlayer chapter={chapter} />
          <AudioNarration chapter={chapter} />
        </div>

        {/* Right Column (5 cols): Lecture Card & Tabs */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 backdrop-blur-md shadow-2xl flex flex-col justify-between min-h-[480px]">
          
          <div>
            {/* Title & Topic */}
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/80 uppercase tracking-wider inline-block mb-2">
                {chapter.topic}
              </span>
              <h2 className="text-xl font-bold text-slate-100 leading-snug">
                {chapter.title}
              </h2>
            </div>

            {/* Sub-tabs inside Lecture Card */}
            <div className="flex items-center gap-2 my-4 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'overview'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('takeaways')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'takeaways'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                Key Takeaways
              </button>
              <button
                onClick={() => setActiveTab('transcript')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'transcript'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                Audio Transcript
              </button>
            </div>

            {/* Tab Content Body */}
            <div className="text-slate-300 text-xs leading-relaxed space-y-3 max-h-[260px] overflow-y-auto pr-2">
              {activeTab === 'overview' && (
                <div dangerouslySetInnerHTML={{ __html: chapter.description }} />
              )}

              {activeTab === 'takeaways' && (
                <ul className="space-y-2">
                  {chapter.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'transcript' && (
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 font-mono text-slate-300 space-y-2">
                  <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <FileText className="w-3 h-3" /> Full Speech Transcript
                  </div>
                  <p className="text-xs leading-normal">"{chapter.transcript}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Row & Footer Nav */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            
            {/* Quick Actions (Download Notes) */}
            <div className="flex justify-end items-center gap-2">
              <button
                onClick={handleDownloadTranscript}
                className="text-xs text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5"
                title="Download Slide Transcript"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Notes</span>
              </button>
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex justify-between gap-3">
              <button
                onClick={onPrevChapter}
                disabled={currentChapterIndex === 0}
                className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous
              </button>

              {currentChapterIndex === chapters.length - 1 ? (
                <button
                  onClick={onGoToQuiz}
                  className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/60"
                >
                  <span>Start Assessment</span>
                  <GraduationCap className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onNextChapter}
                  className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-950/60"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
