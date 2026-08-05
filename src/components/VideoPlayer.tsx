import React, { useState, useEffect, useRef } from 'react';
import { Chapter } from '../types';
import { Play, Pause, Volume2, VolumeX, Maximize2, Settings, Link as LinkIcon, RefreshCw } from 'lucide-react';

interface VideoPlayerProps {
  chapter: Chapter;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ chapter }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [customVideoUrl, setCustomVideoUrl] = useState<string>('');
  const [activeVideoSource, setActiveVideoSource] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const playerRef = useRef<HTMLDivElement>(null);

  // Reset playback on chapter change
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
  }, [chapter.id]);

  // Simulate progress when playing interactive diagram
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !activeVideoSource) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1 * playbackSpeed;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, activeVideoSource]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(parseFloat(e.target.value));
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customVideoUrl) {
      setActiveVideoSource(null);
      setShowUrlInput(false);
      return;
    }

    // Convert YouTube URLs to embed format if needed
    let processedUrl = customVideoUrl;
    if (customVideoUrl.includes('youtube.com/watch?v=')) {
      const videoId = customVideoUrl.split('v=')[1]?.split('&')[0];
      processedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (customVideoUrl.includes('youtu.be/')) {
      const videoId = customVideoUrl.split('youtu.be/')[1]?.split('?')[0];
      processedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    setActiveVideoSource(processedUrl);
    setShowUrlInput(false);
  };

  const toggleFullScreen = () => {
    if (playerRef.current) {
      if (!document.fullscreenElement) {
        playerRef.current.requestFullscreen().catch((err) => console.log(err));
      } else {
        document.exitFullscreen().catch((err) => console.log(err));
      }
    }
  };

  // Render animated SVG/Canvas diagram based on chapter topic
  const renderInteractiveDiagram = () => {
    switch (chapter.id) {
      case 0: // Intro: ANI vs AGI
        return (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <div className="flex items-center gap-8 mb-4">
              <div className={`p-4 rounded-2xl border transition-all ${isPlaying ? 'bg-indigo-900/60 border-indigo-400 scale-105 shadow-lg shadow-indigo-500/20' : 'bg-slate-800/80 border-slate-700'}`}>
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">
                  ANI
                </div>
                <span className="text-xs text-indigo-300 font-medium">Single Task Specialist</span>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[120px]">Chess, Scans, Translation</p>
              </div>

              <div className="text-slate-600 text-xl font-bold animate-pulse">&rarr;</div>

              <div className={`p-4 rounded-2xl border transition-all ${isPlaying ? 'bg-purple-900/60 border-purple-400 scale-105 shadow-lg shadow-purple-500/20' : 'bg-slate-800/80 border-slate-700'}`}>
                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">
                  AGI
                </div>
                <span className="text-xs text-purple-300 font-medium">General Cognition</span>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[120px]">Human-level adaptability</p>
              </div>
            </div>
          </div>
        );

      case 1: // ML: Supervised vs Unsupervised
        return (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="grid grid-cols-2 gap-6 w-full max-w-md text-center">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-emerald-500/30">
                <span className="text-xs font-bold text-emerald-400 block mb-2">Supervised (Labeled)</span>
                <div className="flex justify-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-emerald-900/50 text-emerald-300 text-[10px] rounded border border-emerald-700">Inputs [X]</span>
                  <span className="px-2 py-1 bg-emerald-900/50 text-emerald-300 text-[10px] rounded border border-emerald-700">Labels [Y]</span>
                </div>
                <div className="text-[10px] text-slate-400">Maps input data directly to target outputs</div>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-cyan-500/30">
                <span className="text-xs font-bold text-cyan-400 block mb-2">Unsupervised (Clustering)</span>
                <div className="flex justify-center items-center gap-1.5 h-10 mb-2">
                  <div className={`w-3 h-3 rounded-full bg-cyan-400 ${isPlaying ? 'animate-bounce' : ''}`} />
                  <div className={`w-3 h-3 rounded-full bg-cyan-400 ${isPlaying ? 'animate-bounce delay-100' : ''}`} />
                  <div className={`w-3 h-3 rounded-full bg-indigo-400 ${isPlaying ? 'animate-bounce delay-200' : ''}`} />
                  <div className={`w-3 h-3 rounded-full bg-indigo-400 ${isPlaying ? 'animate-bounce delay-300' : ''}`} />
                </div>
                <div className="text-[10px] text-slate-400">Discovers hidden groupings without labels</div>
              </div>
            </div>
          </div>
        );

      case 2: // Deep Learning & Neural Network
        return (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="flex items-center justify-between w-full max-w-md px-4">
              {/* Input Layer */}
              <div className="space-y-3 text-center">
                <span className="text-[10px] text-slate-400 block mb-1">Input</span>
                <div className={`w-6 h-6 rounded-full bg-indigo-500 mx-auto ${isPlaying ? 'animate-ping' : ''}`} />
                <div className={`w-6 h-6 rounded-full bg-indigo-500 mx-auto ${isPlaying ? 'animate-ping delay-100' : ''}`} />
                <div className={`w-6 h-6 rounded-full bg-indigo-500 mx-auto ${isPlaying ? 'animate-ping delay-200' : ''}`} />
              </div>

              {/* Hidden Layers */}
              <div className="space-y-2 text-center">
                <span className="text-[10px] text-purple-400 block mb-1">Hidden Layers</span>
                <div className="flex gap-2">
                  <div className="space-y-2">
                    <div className="w-5 h-5 rounded-full bg-purple-600" />
                    <div className="w-5 h-5 rounded-full bg-purple-600" />
                    <div className="w-5 h-5 rounded-full bg-purple-600" />
                    <div className="w-5 h-5 rounded-full bg-purple-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="w-5 h-5 rounded-full bg-purple-600" />
                    <div className="w-5 h-5 rounded-full bg-purple-600" />
                    <div className="w-5 h-5 rounded-full bg-purple-600" />
                  </div>
                </div>
              </div>

              {/* Output Layer */}
              <div className="text-center">
                <span className="text-[10px] text-emerald-400 block mb-1">Output</span>
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-emerald-500/40">
                  98%
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // NLP: Text to Vectors
        return (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-indigo-500/40 w-full max-w-sm">
              <div className="text-xs text-indigo-300 font-mono mb-2">"Understanding Human Language"</div>
              <div className="flex justify-center gap-1.5 my-2">
                <span className="px-2 py-0.5 bg-indigo-900/60 text-indigo-200 text-[10px] rounded font-mono">[0.82]</span>
                <span className="px-2 py-0.5 bg-indigo-900/60 text-indigo-200 text-[10px] rounded font-mono">[-0.41]</span>
                <span className="px-2 py-0.5 bg-indigo-900/60 text-indigo-200 text-[10px] rounded font-mono">[0.95]</span>
                <span className="px-2 py-0.5 bg-indigo-900/60 text-indigo-200 text-[10px] rounded font-mono">[0.12]</span>
              </div>
              <p className="text-[10px] text-slate-400">Tokenized Embeddings & Attention Mechanisms</p>
            </div>
          </div>
        );

      case 4: // Computer Vision
        return (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="relative w-64 h-36 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 to-slate-950/40" />
              {/* Bounding box simulation */}
              <div className={`absolute w-24 h-20 border-2 border-emerald-400 rounded p-1 transition-all ${isPlaying ? 'scale-105 border-emerald-300' : ''}`}>
                <span className="text-[9px] bg-emerald-500 text-slate-950 font-bold px-1 rounded-sm">Pedestrian: 99%</span>
              </div>
              <div className={`absolute right-4 bottom-3 w-16 h-12 border-2 border-amber-400 rounded p-1 ${isPlaying ? 'scale-105' : ''}`}>
                <span className="text-[9px] bg-amber-500 text-slate-950 font-bold px-1 rounded-sm">Signal: Red</span>
              </div>
            </div>
          </div>
        );

      case 5: // AI Ethics
        return (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-rose-500/30 max-w-sm w-full">
              <div className="flex justify-around items-center mb-2">
                <span className="text-xs text-rose-300 font-semibold">Algorithmic Fairness</span>
                <span className="text-xs text-emerald-300 font-semibold">Data Privacy</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 h-full w-full" />
              </div>
              <p className="text-[10px] text-slate-400">Responsible Governance & Human-in-the-loop Safeguards</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div ref={playerRef} className="space-y-3">
      {/* Main Screen Container */}
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-950 via-indigo-950/60 to-slate-900 border border-indigo-500/30 flex flex-col justify-between group">
        
        {/* Custom Embed Video or Interactive Concept Canvas */}
        {activeVideoSource ? (
          <iframe
            src={activeVideoSource}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={chapter.videoTitle}
          />
        ) : (
          <div className="relative w-full h-full flex flex-col justify-between p-6">
            {/* Top Bar inside player */}
            <div className="flex justify-between items-center z-10">
              <span className="px-2.5 py-1 bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 rounded-full text-[11px] font-mono font-medium flex items-center gap-1.5 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {chapter.videoTitle}
              </span>
              <button
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-lg text-xs font-medium transition flex items-center gap-1.5 backdrop-blur-sm"
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Embed Custom Video</span>
              </button>
            </div>

            {/* Middle Interactive Diagram */}
            <div className="my-auto">
              {renderInteractiveDiagram()}
            </div>

            {/* Play Overlay Button */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-slate-950/20 group-hover:bg-slate-950/40 transition-all opacity-90 group-hover:opacity-100"
            >
              <div className="w-16 h-16 bg-indigo-600/90 group-hover:bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-indigo-900/80 group-hover:scale-110 transition-all border border-indigo-400">
                {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
              </div>
            </button>
          </div>
        )}

        {/* Custom Video URL Modal Input */}
        {showUrlInput && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-30 p-6 flex flex-col justify-center items-center">
            <form onSubmit={handleApplyCustomUrl} className="w-full max-w-md space-y-4 bg-slate-900 p-5 rounded-2xl border border-indigo-500/40 shadow-2xl">
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-indigo-400" /> Embed Custom Lecture Video URL
              </h4>
              <p className="text-xs text-slate-400">
                Paste any YouTube video link or MP4 web video URL to replace the animated concept diagram.
              </p>
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                value={customVideoUrl}
                onChange={(e) => setCustomVideoUrl(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
              <div className="flex justify-end gap-2 pt-2">
                {activeVideoSource && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveVideoSource(null);
                      setCustomVideoUrl('');
                      setShowUrlInput(false);
                    }}
                    className="px-3 py-1.5 bg-rose-950/60 text-rose-300 border border-rose-800/60 rounded-xl text-xs font-medium hover:bg-rose-900/60"
                  >
                    Reset to Interactive Diagram
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowUrlInput(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-medium hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl text-xs shadow-md shadow-indigo-900/50"
                >
                  Apply Video
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* Control Bar */}
      {!activeVideoSource && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition shadow"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <span className="font-mono text-slate-400">{chapter.duration}</span>
          </div>

          {/* Scrubber */}
          <div className="flex-grow max-w-md mx-2 flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Speed Selector */}
            <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
              <Settings className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
              >
                <option value="0.75" className="bg-slate-900">0.75x</option>
                <option value="1" className="bg-slate-900">1.0x</option>
                <option value="1.25" className="bg-slate-900">1.25x</option>
                <option value="1.5" className="bg-slate-900">1.5x</option>
                <option value="2" className="bg-slate-900">2.0x</option>
              </select>
            </div>

            {/* Mute/Volume */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullScreen}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
