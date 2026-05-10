import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Check,
  X
} from 'lucide-react';

/**
 * Engine Settings Modal
 */
const SettingsModal = ({ isOpen, onClose }) => {
  const [activeModel, setActiveModel] = useState('v3');
  const [activeRatio, setActiveRatio] = useState('16:9');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-2xl bg-black/60">
      <div className="w-full max-w-md bg-obsidian border border-clay/20 rounded-[2rem] p-6 relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        
        {/* Back Button */}
        <button onClick={onClose} className="absolute top-5 left-5 flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Return</span>
        </button>

        <div className="mt-8">
          <h2 className="text-xl font-serif italic text-white mb-1">Engine Settings</h2>
          <p className="text-[9px] uppercase tracking-widest text-white/40 mb-5">Configure Synthesis Parameters</p>

          <div className="space-y-4">
            {/* Aspect Ratio */}
            <div>
              <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/40 mb-2 block">Aspect Ratio</label>
              <div className="flex flex-wrap gap-2">
                {['16:9', '9:16', '1:1', '21:9'].map(ratio => (
                  <button 
                    key={ratio} 
                    onClick={() => setActiveRatio(ratio)}
                    className={`px-3 py-1.5 text-[10px] rounded-full border transition-colors ${activeRatio === ratio ? 'border-clay bg-clay/10 text-clay' : 'border-white/10 text-white/60 hover:bg-white/5'}`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            {/* Neural Model */}
            <div>
              <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/40 mb-2 block">Neural Model</label>
              <div className="flex flex-col gap-2">
                <div 
                  onClick={() => setActiveModel('v3')}
                  className={`p-2.5 border rounded-xl flex justify-between items-center cursor-pointer transition-colors ${activeModel === 'v3' ? 'border-moss bg-moss/5' : 'border-white/5 bg-white/[0.02] hover:bg-white/5'}`}
                >
                  <div>
                    <div className={`text-xs font-bold ${activeModel === 'v3' ? 'text-moss' : 'text-white/80'}`}>KINETIX v3 (Ultra)</div>
                    <div className="text-[9px] text-white/40 mt-0.5">Slower synthesis, maximum photorealism.</div>
                  </div>
                  {activeModel === 'v3' && <Check size={14} className="text-moss" />}
                </div>
                <div 
                  onClick={() => setActiveModel('v2')}
                  className={`p-2.5 border rounded-xl flex justify-between items-center cursor-pointer transition-colors ${activeModel === 'v2' ? 'border-moss bg-moss/5' : 'border-white/5 bg-white/[0.02] hover:bg-white/5'}`}
                >
                  <div>
                    <div className={`text-xs font-bold ${activeModel === 'v2' ? 'text-moss' : 'text-white/80'}`}>KINETIX v2 (Turbo)</div>
                    <div className="text-[9px] text-white/40 mt-0.5">Real-time rendering, stylized motion.</div>
                  </div>
                  {activeModel === 'v2' && <Check size={14} className="text-moss" />}
                </div>
              </div>
            </div>

            {/* Negative Prompt */}
            <div>
               <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/40 mb-2 block">Negative Prompt</label>
               <textarea 
                placeholder="Describe what to avoid (e.g., text, watermarks)..." 
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-2.5 text-xs text-white/80 placeholder:text-white/20 focus:outline-none focus:border-clay/50 min-h-[50px] resize-none"
               />
            </div>
          </div>

          <button onClick={onClose} className="w-full mt-5 bg-clay text-black py-2.5 rounded-full font-bold uppercase tracking-[0.25em] text-[10px] hover:scale-[1.02] active:scale-[0.98] transition-transform">
            Apply Parameters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;