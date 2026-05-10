import React, { useState } from 'react';
import { 
  Plus, 
  Download, 
  Share2, 
  Settings, 
  Database, 
  Check,
  RotateCcw
} from 'lucide-react';

// --- IMPORT YOUR NEW COMPONENTS HERE ---
import NoiseOverlay from './components/NoiseOverlay';
import KineticHeadline from './components/KineticHeadline';
import LatentGrid from './components/LatentGrid';
import ChronosSlider from './components/ChronosSlider';
import SettingsModal from './components/SettingsModal';
import SocialModal from './components/SocialModal';

/**
 * MAIN APP
 */
export default function App() {
  const [step, setStep] = useState('input');
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(15);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const loadingPhrases = [
    "Allocating GPUs...", "Sampling Latent Space...", "Rendering Frames...",
    "Synthesizing Motion...", "Optimizing Bitrate...", "Injecting Cinematic Grain...", "Finalizing Geometry..."
  ];

  const handleGenerate = () => {
    if (!prompt) return;
    setStep('loading');
    let count = 0;
    const interval = setInterval(() => {
      setLoadingText(loadingPhrases[count % loadingPhrases.length]);
      count++;
    }, 600);
    setTimeout(() => { clearInterval(interval); setStep('review'); }, 4500);
  };

  const steps = ['input', 'loading', 'review'];
  const activeIndex = steps.indexOf(step);

  return (
    <div className="fixed inset-0 bg-[#050505] text-[#D2B48C] selection:bg-[#8A9A5B] selection:text-black font-sans overflow-hidden">
      <NoiseOverlay />
      <SocialModal isOpen={isSocialOpen} onClose={() => setIsSocialOpen(false)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Header */}
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-[60]">
        <div className="text-xl font-serif italic text-clay tracking-tighter cursor-pointer hover:opacity-80 transition-opacity">KINETIX</div>
        <div className="flex gap-8 items-center">
          <button className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Vault</button>
          <button className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Engine</button>
          
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="w-8 h-8 rounded-full border border-clay/20 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Settings size={14} className="text-clay/80" />
          </button>
        </div>
      </nav>

      {/* Neural Progress Rail */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[60] flex flex-col gap-4">
        {steps.map((s, i) => (
          <div 
            key={s} 
            className={`w-[2px] transition-all duration-700 ${i === activeIndex ? 'h-8 bg-moss' : 'h-2 bg-white/10'}`} 
          />
        ))}
      </div>

      {/* THE STAGE */}
      <main className="relative w-full h-full">
        
        {/* CARD 1: IGNITION */}
        <div className={`absolute inset-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.23,1,0.32,1)] overflow-y-auto custom-scrollbar pt-32 pb-24 px-6 ${
          step === 'input' ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-full opacity-0 scale-95 pointer-events-none'
        }`}>
          <LatentGrid />
          <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 items-center text-center relative z-10">
            <KineticHeadline />
            
            <div className="w-full max-w-3xl flex flex-col items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl">
              
              <div className="w-full relative group mb-10">
                <textarea 
                  placeholder="Describe a world..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-transparent border-none outline-none focus:ring-0 text-2xl md:text-3xl font-serif italic text-center text-white min-h-[60px] resize-none py-2 placeholder:text-white/10"
                  style={{ textShadow: prompt ? '0 0 20px rgba(138, 154, 91, 0.4)' : 'none' }}
                />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-clay/30 to-transparent absolute bottom-0 left-0" />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8 w-full justify-between">
                <ChronosSlider value={duration} onChange={setDuration} />
                
                <button onClick={handleGenerate} className="group relative px-10 py-5 rounded-full overflow-hidden transition-all duration-500 shrink-0">
                  <div className="absolute inset-0 border border-moss rounded-full group-hover:scale-[1.1] transition-transform duration-500 opacity-50" />
                  <div className="absolute inset-0 bg-moss scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  <span className="relative z-10 font-bold uppercase tracking-[0.3em] text-[10px] text-moss group-hover:text-black">Generate Video</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: SYNTHESIS */}
        <div className={`absolute inset-0 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col items-center justify-center ${
          step === 'loading' ? 'translate-y-0 opacity-100 scale-100' : (activeIndex < 1 ? 'translate-y-full opacity-0' : '-translate-y-full opacity-0 pointer-events-none')
        }`}>
          <div className="flex flex-col items-center gap-12">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5" className="text-moss" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 10" className="text-clay/30" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full animate-pulse shadow-[0_0_20px_white]" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-[10px] uppercase tracking-[0.4em] font-mono text-moss/60">System Log</div>
              <div className="text-clay font-mono text-xs">{loadingText}</div>
            </div>
          </div>
        </div>

        {/* CARD 3: MASTERING */}
        <div className={`absolute inset-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.19,1,0.22,1)] overflow-y-auto custom-scrollbar pt-24 pb-24 px-6 md:px-24 ${
          step === 'review' ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}>
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center pb-24">
            <div className="relative w-full aspect-video rounded-[2.5rem] border border-clay/20 overflow-hidden bg-black shadow-2xl">
              <div className="absolute top-8 left-8 flex flex-col gap-1 z-20">
                <div className="text-[8px] uppercase tracking-widest text-white/40">Status: <span className="text-moss">RENDER_COMPLETE</span></div>
                <div className="text-[8px] uppercase tracking-widest text-white/40">Engine: <span className="text-clay">KINETIX_V3</span></div>
              </div>
              <div className="absolute top-8 right-8 flex flex-col gap-1 items-end z-20">
                <div className="text-[8px] uppercase tracking-widest text-white/40">Bitrate: 45.2 MBPS</div>
                <div className="text-[8px] uppercase tracking-widest text-white/40">Duration: {duration}S</div>
              </div>

              <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80">
                <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-particles-in-green-34440-large.mp4" type="video/mp4" />
              </video>

              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-full z-20 shadow-2xl">
                <button onClick={() => setSaved(!saved)} className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-500 ${saved ? 'bg-moss text-black' : 'hover:bg-white/10 text-white'}`}>
                  {saved ? <Check size={16} /> : <Database size={16} />}
                  <span className="text-[10px] font-bold uppercase tracking-widest">{saved ? 'Saved' : 'Vault'}</span>
                </button>
                <div className="w-px h-6 bg-white/10" />
                <button onClick={() => setIsSocialOpen(true)} className="flex items-center gap-3 px-6 py-3 rounded-full hover:bg-white/10 text-white transition-all">
                  <Share2 size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Broadcast</span>
                </button>
                <div className="w-px h-6 bg-white/10" />
                <button className="p-3 text-white hover:text-clay transition-colors"><Download size={16} /></button>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center text-center gap-8">
              <p className="text-white/40 italic font-serif text-lg max-w-xl">"{prompt || 'No prompt provided'}"</p>
              <div className="flex items-center gap-12">
                <button onClick={() => setStep('input')} className="text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                  <RotateCcw size={12} /> Modify Parameters
                </button>
                <div className="w-px h-4 bg-white/10" />
                <button onClick={() => { setPrompt(''); setStep('input'); }} className="text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-2 text-clay hover:text-moss transition-colors">
                  <Plus size={12} /> Generate New Evolution
                </button>
              </div>
            </div>
          </div>
        </div>

      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Cormorant+Garamond:ital,wght@1,300;1,500;1,700&display=swap');
        
        body { font-family: 'Inter', sans-serif; background: #050505; margin: 0; padding: 0; }
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @keyframes synth-reveal {
          0% { opacity: 0; transform: translateY(10px); clip-path: inset(0 100% 0 0); }
          50% { opacity: 1; transform: translateY(0); clip-path: inset(0 0 0 0); }
          90% { opacity: 1; transform: translateY(0); clip-path: inset(0 0 0 0); }
          100% { opacity: 0; transform: translateY(-5px); }
        }
        @keyframes scan-line {
          0% { transform: translateX(-100%) scaleX(0.5); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(100%) scaleX(0.5); opacity: 0; }
        }
        @keyframes grid-drift { from { transform: translateY(0); } to { transform: translateY(60px); } }

        .animate-synth-reveal { animation: synth-reveal 4s ease-in-out infinite; }
        .animate-scan-line { animation: scan-line 4s linear infinite; }
        .animate-grid-drift { animation: grid-drift 10s linear infinite; }
        .bg-radial-vignette { background: radial-gradient(circle at center, transparent 0%, #050505 80%); }

        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #333; }
      `}</style>
    </div>
  );
}