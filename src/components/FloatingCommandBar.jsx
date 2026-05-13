import React from 'react';
import { Camera, Upload, ArrowRight, Send } from 'lucide-react';

export default function FloatingCommandBar({ promptText, setPromptText, handleGenerate }) {
  return (
    <div className="absolute bottom-6 left-0 w-full px-4 md:px-8 flex justify-center z-40">
      <div className="w-full max-w-4xl bg-[#050505]/80 backdrop-blur-2xl border border-white/10 p-2 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex items-center gap-1 md:gap-2">
        
        <button className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors group">
          <Camera size={18} className="group-hover:scale-110 transition-transform md:w-5 md:h-5" />
        </button>
        <div className="w-px h-5 md:h-6 bg-white/10 shrink-0 mx-1" />
        <button className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors group">
          <Upload size={18} className="group-hover:scale-110 transition-transform md:w-5 md:h-5" />
        </button>
        
        {/* Added min-w-0 to prevent flexbox from pushing the button out of bounds */}
        <input 
          type="text"
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder="Describe a sequence..."
          className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/30 px-2 md:px-4 h-full font-medium min-w-0"
        />

        {/* Generate button updated to #8A9A5B */}
        <button 
          onClick={handleGenerate}
          className="shrink-0 bg-[#8A9A5B] text-black w-10 h-10 md:w-auto md:px-6 md:h-12 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors group"
        >
          {/* Desktop Text & Arrow */}
          <span className="hidden md:block font-bold uppercase tracking-widest text-[10px]">Generate</span>
          <ArrowRight size={14} className="hidden md:block" />
          
          {/* Mobile Send Icon (Hidden on Desktop) */}
          <Send size={16} className="block md:hidden mr-0.5 mt-0.5 group-hover:scale-110 transition-transform" />
        </button>
        
      </div>
    </div>
  );
}