import React from 'react';
import heroVideo from '../assets/hero-particles.mp4';

export default function DiscoverView() {
  return (
    /* h-full ensures it fills the container in App.jsx.
       md:h-auto lets desktop maintain its natural proportions.
    */
    <div className="h-full md:h-auto max-w-7xl mx-auto flex flex-col space-y-2 md:space-y-8 overflow-hidden md:overflow-visible">
      
      {/* Header Section: Scaled down for mobile to save vertical space */}
      <div className="text-center shrink-0 space-y-1 md:space-y-4 py-2 md:py-8">
        <h2 className="text-2xl md:text-5xl font-serif italic text-white leading-tight">
          Synthesize your <span className="text-[#8A9A5B]">creative vision.</span>
        </h2>
        <p className="text-[10px] md:text-sm text-white/40 tracking-wide max-w-xs md:max-w-xl mx-auto px-4">
          The definitive AI studio. <span className="hidden md:inline">Let autonomous agents create, refine, and broadcast your cinematic universe.</span>
        </p>
      </div>

      {/* Cinematic Video Hero Card: 
          'flex-1' makes it the "stretchy" element that fills the gap.
          'min-h-0' is required for flex items to shrink on mobile.
      */}
      <div className="flex-1 md:flex-none min-h-0 md:min-h-[60vh] w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 relative group bg-[#020202] shadow-2xl flex items-center justify-center mx-auto max-w-[98%] md:max-w-full">
        
        <video 
          src={heroVideo} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen transition-opacity duration-1000"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />

        {/* Text Overlay: pb-6 on mobile to keep it above the input bar */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-14 pb-8 md:pb-36 z-10">
          <div className="max-w-2xl">
            <h3 className="text-xl md:text-5xl font-serif italic text-white mb-2 md:mb-4 drop-shadow-lg">
              The Engine is Online.
            </h3>
            <p className="text-white/60 text-[11px] md:text-base leading-relaxed drop-shadow-md line-clamp-2 md:line-clamp-none">
              Experience the next generation of video synthesis. Create stunning visuals, transform footage, or deploy AI agents.
            </p>
          </div>
        </div>
      </div>
      
      {/* Spacer for Mobile: 
          This reserves space for the FloatingCommandBar so the video card doesn't hide behind it.
      */}
      <div className="h-20 md:hidden shrink-0" />
    </div>
  );
}