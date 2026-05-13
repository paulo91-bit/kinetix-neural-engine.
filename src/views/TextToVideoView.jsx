import React from 'react';
import { Settings, ArrowRight } from 'lucide-react';

export default function TextToVideoView({ handleGenerate }) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 md:mt-12 flex flex-col gap-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-serif italic text-white mb-2">Text to Video</h2>
        <p className="text-white/40 text-sm">Describe a scene to synthesize from scratch.</p>
      </div>
      <div className="bg-black/40 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl">
        <textarea 
          placeholder="Describe a cinematic sequence in detail..." 
          className="w-full bg-transparent border-none outline-none text-xl md:text-2xl font-serif italic text-white placeholder:text-white/20 resize-none min-h-[150px]" 
        />
        <div className="flex justify-between items-center border-t border-white/10 pt-6 mt-2">
          <button className="text-xs text-white/40 hover:text-[#D2B48C] flex items-center gap-2 transition-colors">
            <Settings size={14}/> Parameters
          </button>
          <button onClick={handleGenerate} className="bg-[#8A9A5B] text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform flex items-center gap-2">
            Synthesize <ArrowRight size={16}/>
          </button>
        </div>
      </div>
    </div>
  );
}