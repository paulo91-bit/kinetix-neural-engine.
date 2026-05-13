import React from 'react';
import { Camera, Music, Globe, Bot } from 'lucide-react';

export default function AIAgentsView() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 md:mt-12 flex flex-col gap-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-serif italic text-white mb-2">Autonomous Agents</h2>
        <p className="text-white/40 text-sm">Deploy AI agents to continuously generate and broadcast content to your social feeds.</p>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl space-y-8">
        <div className="space-y-8">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-3">Agent Directive (Prompt)</label>
            <textarea 
              placeholder="e.g., Generate daily cinematic nature videos with dramatic lighting, 9:16 aspect ratio, and orchestral background music..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#8A9A5B] transition-colors min-h-[120px] resize-none"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-4">Broadcast Targets</label>
            <div className="flex flex-wrap gap-4">
              {[
                { id: 'instagram', label: 'Instagram Reels', icon: Camera },
                { id: 'tiktok', label: 'TikTok', icon: Music },
                { id: 'facebook', label: 'Facebook', icon: Globe }
              ].map(platform => (
                <button key={platform.id} className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-[#8A9A5B]/20 hover:border-[#8A9A5B] text-white/60 hover:text-white transition-all">
                  <platform.icon size={18} />
                  <span className="text-xs font-semibold tracking-wide">{platform.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-3">Posting Frequency</label>
              <div className="relative">
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-[#8A9A5B] appearance-none cursor-pointer">
                  <option className="bg-[#050505] text-white">1 Video / Day</option>
                  <option className="bg-[#050505] text-white">2 Videos / Day</option>
                  <option className="bg-[#050505] text-white">1 Video / Week</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">▼</div>
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-3">Video Duration</label>
              <div className="relative">
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-[#8A9A5B] appearance-none cursor-pointer">
                  <option className="bg-[#050505] text-white">15 Seconds (Shorts/Reels)</option>
                  <option className="bg-[#050505] text-white">30 Seconds</option>
                  <option className="bg-[#050505] text-white">60 Seconds</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">▼</div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex justify-end">
          <button className="bg-[#8A9A5B] text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform flex items-center gap-3">
            <Bot size={18} /> Deploy Agent
          </button>
        </div>
      </div>
    </div>
  );
}
