import React from 'react';
import { Compass, Type, Image as ImageIcon, Video, Database, Bot } from 'lucide-react';

export const navItems = [
  { id: 'discover', label: 'Discover', icon: Compass },
  { id: 't2v', label: 'Text to Video', icon: Type },
  { id: 'i2v', label: 'Image to Video', icon: ImageIcon },
  { id: 'v2v', label: 'Video to Video', icon: Video },
  { id: 'agents', label: 'AI Agents', icon: Bot },
  { id: 'vault', label: 'My Vault', icon: Database },
];

export default function Sidebar({ currentView, setCurrentView, isMobileMenuOpen, setIsMobileMenuOpen }) {
  return (
    <aside className={`
      fixed md:relative top-0 left-0 h-full w-64 border-r border-white/10 bg-[#050505]/95 backdrop-blur-2xl z-[55]
      flex flex-col transition-transform duration-300 ease-in-out
      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      <div className="h-20 hidden md:flex items-center px-8">
        <div className="text-2xl font-serif italic bg-gradient-to-r from-[#D2B48C] via-white to-[#D2B48C] bg-clip-text text-transparent tracking-[0.2em] drop-shadow-[0_0_8px_rgba(210,180,140,0.4)]">
          MOTVADD
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 md:py-4 space-y-2 mt-16 md:mt-0">
        <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20 mb-6 px-4">Workspace</div>
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setCurrentView(item.id); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-[#8A9A5B]/10 text-[#8A9A5B] border border-[#8A9A5B]/20 shadow-[0_0_20px_rgba(138,154,91,0.05)]' 
                  : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <item.icon size={18} className={isActive ? 'text-[#8A9A5B]' : 'text-clay/50 group-hover:text-clay transition-colors'} />
              <span className="text-xs font-semibold tracking-wide">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-6 border-t border-white/5">
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-widest text-white/40">Engine Status</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#8A9A5B] animate-pulse" />
            <span className="text-xs text-white/80 font-mono">v3.0.4 Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
}