import React from 'react';
import { Bell, User, Sparkles } from 'lucide-react';
import { navItems } from './Sidebar';

export default function DesktopHeader({ currentView }) {
  return (
    <header className="h-20 shrink-0 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl flex items-center justify-between px-8 z-50">
      <div className="flex items-center">
        {currentView !== 'discover' && (
          <h1 className="text-xl font-serif italic text-white hidden md:block">
            {navItems.find(i => i.id === currentView)?.label}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-2 bg-[#8A9A5B]/10 border border-[#8A9A5B]/20 px-4 py-1.5 rounded-full">
          <Sparkles size={14} className="text-[#8A9A5B]" />
          <span className="text-xs font-bold text-[#8A9A5B]">1,250 Credits</span>
        </div>
        <button className="text-white/40 hover:text-white transition-colors">
          <Bell size={20} />
        </button>
        <div className="w-9 h-9 rounded-full bg-[#D2B48C] border border-[#D2B48C]/50 flex items-center justify-center text-black font-bold cursor-pointer hover:scale-105 transition-transform">
          <User size={18} />
        </div>
      </div>
    </header>
  );
}