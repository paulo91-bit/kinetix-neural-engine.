import React from 'react';

export default function MobileHeader({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  return (
    <div className="md:hidden fixed top-0 left-0 w-full h-16 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl z-[60] flex justify-between items-center px-5">
      <div className="text-xl font-serif italic bg-gradient-to-r from-[#D2B48C] via-white to-[#D2B48C] bg-clip-text text-transparent tracking-[0.2em] relative top-[2px]">
        MOTVAD
      </div>
      
      {/* Custom Stylish Hamburger Menu */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        className="relative w-8 h-8 flex flex-col justify-center items-end group focus:outline-none"
      >
        <span className={`h-[2px] bg-[#D2B48C] transition-all duration-300 ease-out rounded-full ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-[1px]' : 'w-6 -translate-y-1.5'}`} />
        <span className={`h-[2px] bg-white transition-all duration-300 ease-out rounded-full my-0.5 ${isMobileMenuOpen ? 'w-0 opacity-0' : 'w-4'}`} />
        <span className={`h-[2px] bg-[#D2B48C] transition-all duration-300 ease-out rounded-full ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[2px]' : 'w-5 translate-y-1.5'}`} />
      </button>
    </div>
  );
}