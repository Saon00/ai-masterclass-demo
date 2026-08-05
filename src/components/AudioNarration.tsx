import React, { useState, useEffect, useRef } from 'react';
import { Chapter } from '../types';
import { Mic, Play, Pause, Square, Volume2, Globe } from 'lucide-react';

interface AudioNarrationProps {
  chapter: Chapter;
}

export const AudioNarration: React.FC<AudioNarrationProps> = ({ chapter }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(1.0);
  const [britishVoice, setBritishVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  const [speechProgress, setSpeechProgress] = useState<number>(0);

  // Initialize SpeechSynthesis and find British Accent voices
  useEffect(() => {
    const updateVoices = () => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);

        // Filter for en-GB voices or UK accents
        const ukVoices = voices.filter(
          (v) => v.lang === 'en-GB' || v.lang.includes('en_GB') || v.name.toLowerCase().includes('uk') || v.name.toLowerCase().includes('british')
        );

        if (ukVoices.length > 0) {
          setBritishVoice(ukVoices[0]);
          setSelectedVoiceName(ukVoices[0].name);
        } else if (voices.length > 0) {
          // Fallback to default english voice
          const defaultEn = voices.find((v) => v.lang.startsWith('en')) || voices[0];
          setBritishVoice(defaultEn);
          setSelectedVoiceName(defaultEn.name);
        }
      }
    };

    updateVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Stop speech synthesis when chapter changes
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setSpeechProgress(0);
  }, [chapter.id]);

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        window.speechSynthesis.cancel();
        
        // Construct clean text transcript from chapter
        const textToSpeak = `${chapter.title}. Topic: ${chapter.topic}. ${chapter.transcript}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);

        if (britishVoice) {
          utterance.voice = britishVoice;
        }
        utterance.rate = rate;
        utterance.pitch = 1.0;

        utterance.onboundary = (event) => {
          if (event.charIndex && textToSpeak.length > 0) {
            setSpeechProgress(Math.min(100, Math.round((event.charIndex / textToSpeak.length) * 100)));
          }
        };

        utterance.onend = () => {
          setIsPlaying(false);
          setSpeechProgress(100);
        };

        utterance.onerror = () => {
          setIsPlaying(false);
        };

        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const handleStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setSpeechProgress(0);
  };

  const handleVoiceChange = (voiceName: string) => {
    setSelectedVoiceName(voiceName);
    const chosen = availableVoices.find((v) => v.name === voiceName) || null;
    setBritishVoice(chosen);
    if (isPlaying) {
      handleStop();
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Left Icon & Info */}
        <div className="flex items-center gap-3">
          <div className="bg-indigo-900/60 border border-indigo-700/60 p-3 rounded-xl text-indigo-400 flex items-center justify-center">
            <Mic className={`w-5 h-5 ${isPlaying ? 'text-emerald-400 animate-pulse' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-300">AI Voiceover Narration</span>
              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full text-[10px] font-semibold flex items-center gap-1">
                <Globe className="w-3 h-3" /> British Accent
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {britishVoice ? britishVoice.name : 'System Voice (British English)'}
            </p>
          </div>
        </div>

        {/* Animated Equalizer Waveform */}
        <div className="flex items-center gap-1 h-6 px-3 bg-slate-950/60 rounded-xl border border-slate-800">
          {[12, 20, 8, 24, 16, 28, 14, 22, 10, 18].map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full bg-indigo-500 transition-all duration-300 ${
                isPlaying ? 'animate-pulse' : 'opacity-30'
              }`}
              style={{
                height: isPlaying ? `${Math.max(4, Math.floor(Math.random() * 24))}px` : '6px'
              }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Rate Selection */}
          <select
            value={rate}
            onChange={(e) => {
              setRate(parseFloat(e.target.value));
              if (isPlaying) handleStop();
            }}
            className="bg-slate-800 text-slate-200 border border-slate-700 rounded-xl px-2 py-1.5 text-xs focus:outline-none"
            title="Speech Speed"
          >
            <option value="0.8">0.8x</option>
            <option value="1.0">1.0x</option>
            <option value="1.2">1.2x</option>
            <option value="1.5">1.5x</option>
          </select>

          {/* Voices Dropdown (If multiple voices available) */}
          {availableVoices.length > 0 && (
            <select
              value={selectedVoiceName}
              onChange={(e) => handleVoiceChange(e.target.value)}
              className="bg-slate-800 text-slate-200 border border-slate-700 rounded-xl px-2 py-1.5 text-xs focus:outline-none max-w-[140px] truncate"
              title="Voice accent selection"
            >
              {availableVoices
                .filter((v) => v.lang.startsWith('en'))
                .map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name.includes('UK') || v.lang === 'en-GB' ? `🇬🇧 ${v.name}` : v.name}
                  </option>
                ))}
            </select>
          )}

          {/* Stop */}
          {isPlaying && (
            <button
              onClick={handleStop}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Stop Narration"
            >
              <Square className="w-4 h-4 fill-current text-rose-400" />
            </button>
          )}

          {/* Play/Pause */}
          <button
            onClick={toggleSpeech}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition shadow-lg ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/40'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/40'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Listen (UK Voice)
              </>
            )}
          </button>
        </div>

      </div>

      {/* Speech Progress Bar */}
      {speechProgress > 0 && (
        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mt-3">
          <div
            className="bg-emerald-400 h-full transition-all duration-300"
            style={{ width: `${speechProgress}%` }}
          />
        </div>
      )}
    </div>
  );
};
