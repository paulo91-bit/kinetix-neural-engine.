import React, { useState, useEffect, useRef } from 'react';
import { Settings, ArrowRight, Loader2, AlertCircle, Download, RotateCcw, CheckCircle } from 'lucide-react';

/**
 * TextToVideoView
 *
 * Props:
 *  - handleGenerate(prompt, options) — starts a generation job
 *  - isGenerating: bool
 *  - status: 'idle' | 'processing' | 'completed' | 'failed'
 *  - videoUrl: string | null
 *  - error: string | null
 *  - initialPrompt: string — pre-fills the textarea if coming from DiscoverView
 *  - onComplete(url, prompt) — called when job completes (saves to vault)
 *  - onReset() — clears generation state
 */
export default function TextToVideoView({
  handleGenerate,
  isGenerating,
  status,
  videoUrl,
  error,
  initialPrompt = '',
  onComplete,
  onReset,
}) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [showParams, setShowParams] = useState(false);
  const [totalDuration, setTotalDuration] = useState(20);
  const [style, setStyle] = useState('Cinematic');
  const hasNotifiedComplete = useRef(false);

  // Pre-fill prompt if coming from DiscoverView
  useEffect(() => {
    if (initialPrompt) setPrompt(initialPrompt);
  }, [initialPrompt]);

  // Notify parent once when job completes so it saves to vault
  useEffect(() => {
    if (status === 'completed' && videoUrl && !hasNotifiedComplete.current) {
      hasNotifiedComplete.current = true;
      onComplete?.(videoUrl, prompt);
    }
    if (status === 'idle') {
      hasNotifiedComplete.current = false;
    }
  }, [status, videoUrl, prompt, onComplete]);

  const handleSubmit = () => {
    if (!prompt.trim() || isGenerating) return;
    handleGenerate(prompt, { total_duration: totalDuration, style });
  };

  const handleReset = () => {
    hasNotifiedComplete.current = false;
    onReset?.();
  };

  const handleDownload = () => {
    if (!videoUrl) return;
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = `kinetix-${Date.now()}.mp4`;
    a.target = '_blank';
    a.click();
  };

  const styles = ['Cinematic', 'Documentary', 'Anime', 'Abstract', 'Noir'];
  const durations = [10, 20, 30, 60];

  // ── COMPLETED STATE ──────────────────────────────────────────
  if (status === 'completed' && videoUrl) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8 md:mt-12 flex flex-col gap-6">
        <div className="text-center mb-2">
          <div className="inline-flex items-center gap-2 text-[#8A9A5B] mb-3">
            <CheckCircle size={18} />
            <span className="text-sm uppercase tracking-widest font-bold">Render Complete</span>
          </div>
          <p className="text-white/40 text-sm line-clamp-2 italic">"{prompt}"</p>
        </div>

        {/* Video Player */}
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-black aspect-video shadow-2xl">
          <video
            src={videoUrl}
            controls
            autoPlay
            loop
            playsInline
            className="w-full h-full object-contain"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 bg-[#8A9A5B] text-black py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform"
          >
            <Download size={14} /> Download
          </button>
          <button
            onClick={handleReset}
            className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors"
          >
            <RotateCcw size={14} /> New Render
          </button>
        </div>
      </div>
    );
  }

  // ── PROCESSING STATE ─────────────────────────────────────────
  if (status === 'processing') {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8 md:mt-12 flex flex-col gap-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-serif italic text-white mb-2">Synthesizing</h2>
          <p className="text-white/40 text-sm">Your render is being processed. This may take a few minutes.</p>
        </div>

        {/* Processing card */}
        <div className="bg-black/40 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col items-center gap-8 shadow-2xl">
          {/* Animated pulse ring */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-[#8A9A5B]/30 animate-ping" />
            <div className="absolute inset-2 rounded-full border-2 border-[#8A9A5B]/50 animate-pulse" />
            <Loader2 size={32} className="text-[#8A9A5B] animate-spin relative z-10" />
          </div>

          <div className="text-center">
            <p className="text-white/80 text-sm font-medium mb-2">Processing pipeline</p>
            <p className="text-white/30 text-xs max-w-xs leading-relaxed">
              Scene expansion → Image generation → Voiceover synthesis → Compositing → Upload
            </p>
          </div>

          <div className="w-full bg-white/5 rounded-full h-1">
            <div className="bg-[#8A9A5B] h-1 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>

          <p className="text-white/20 text-xs italic line-clamp-1">"{prompt}"</p>
        </div>
      </div>
    );
  }

  // ── FAILED STATE ─────────────────────────────────────────────
  if (status === 'failed') {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8 md:mt-12 flex flex-col gap-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-serif italic text-white mb-2">Text to Video</h2>
          <p className="text-white/40 text-sm">Describe a scene to synthesize from scratch.</p>
        </div>

        {/* Error banner */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-red-400 text-sm font-medium mb-1">Render failed</p>
            <p className="text-red-400/70 text-xs leading-relaxed">{error}</p>
          </div>
        </div>

        {/* Retry with same prompt */}
        <div className="bg-black/40 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl">
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Describe a cinematic sequence in detail..."
            className="w-full bg-transparent border-none outline-none text-xl md:text-2xl font-serif italic text-white placeholder:text-white/20 resize-none min-h-[150px]"
          />
          <div className="flex justify-between items-center border-t border-white/10 pt-6 mt-2">
            <button
              onClick={handleReset}
              className="text-xs text-white/40 hover:text-[#D2B48C] flex items-center gap-2 transition-colors"
            >
              <RotateCcw size={14} /> Clear
            </button>
            <button
              onClick={handleSubmit}
              disabled={!prompt.trim()}
              className="bg-[#8A9A5B] text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Retry <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── IDLE STATE (default) ──────────────────────────────────────
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 md:mt-12 flex flex-col gap-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-serif italic text-white mb-2">Text to Video</h2>
        <p className="text-white/40 text-sm">Describe a scene to synthesize from scratch.</p>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl">
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && e.metaKey) handleSubmit();
          }}
          placeholder="Describe a cinematic sequence in detail..."
          className="w-full bg-transparent border-none outline-none text-xl md:text-2xl font-serif italic text-white placeholder:text-white/20 resize-none min-h-[150px]"
        />

        {/* Parameters panel */}
        {showParams && (
          <div className="border-t border-white/10 pt-6 flex flex-col gap-5 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Duration */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/40 uppercase tracking-widest">Duration (seconds)</label>
              <div className="flex gap-2 flex-wrap">
                {durations.map(d => (
                  <button
                    key={d}
                    onClick={() => setTotalDuration(d)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors ${
                      totalDuration === d
                        ? 'bg-[#8A9A5B] text-black border-[#8A9A5B]'
                        : 'bg-white/5 text-white/50 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {d}s
                  </button>
                ))}
              </div>
            </div>

            {/* Style */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/40 uppercase tracking-widest">Style</label>
              <div className="flex gap-2 flex-wrap">
                {styles.map(s => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors ${
                      style === s
                        ? 'bg-[#8A9A5B] text-black border-[#8A9A5B]'
                        : 'bg-white/5 text-white/50 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center border-t border-white/10 pt-6 mt-2">
          <button
            onClick={() => setShowParams(p => !p)}
            className={`text-xs flex items-center gap-2 transition-colors ${
              showParams ? 'text-[#8A9A5B]' : 'text-white/40 hover:text-[#D2B48C]'
            }`}
          >
            <Settings size={14} />
            Parameters {showParams ? '↑' : '↓'}
          </button>
          <button
            onClick={handleSubmit}
            disabled={!prompt.trim()}
            className="bg-[#8A9A5B] text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Synthesize <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <p className="text-center text-white/20 text-xs">
        Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/40">⌘ Enter</kbd> to synthesize
      </p>
    </div>
  );
}