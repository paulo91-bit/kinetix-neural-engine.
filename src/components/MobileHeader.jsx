import React from 'react';
import { Menu, X } from 'lucide-react';

export default function MobileHeader({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  return (
    <div className="md:hidden fixed top-0 left-0 w-full h-16 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl z-[60] flex justify-between items-center px-4">
      <div className="text-xl font-serif italic bg-gradient-to-r from-[#D2B48C] via-white to-[#D2B48C] bg-clip-text text-transparent tracking-[0.2em]">MOTVADD</div>
      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white/60">
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>
    </div>
  );
}
