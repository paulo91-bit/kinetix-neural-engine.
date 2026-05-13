import React from 'react';
import { Camera, Upload, ArrowRight } from 'lucide-react';

export default function FloatingCommandBar({ promptText, setPromptText, handleGenerate }) {
  return (
    <div className="absolute bottom-8 left-0 w-full px-4 md:px-8 flex justify-center z-40">
      <div className="w-full max-w-4xl bg-[#050505]/60 backdrop-blur-2xl border border-white/10 p-2 rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex items-center gap-2">
        <button className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors group">
          <Camera size={20} className="group-hover:scale-110 transition-transform" />
        </button>
        <div className="w-px h-6 bg-white/10 shrink-0" />
        <button className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors group">
          <Upload size={20} className="group-hover:scale-110 transition-transform" />
        </button>
        
        <input 
          type="text"
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder="Describe a cinematic sequence..."
          className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/20 px-4 h-full font-medium"
        />

        <button 
          onClick={handleGenerate}
          className="shrink-0 bg-[#D2B48C] text-black px-6 h-12 rounded-full flex items-center gap-2 hover:bg-white transition-colors font-bold uppercase tracking-widest text-[10px]"
        >
          Generate <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
