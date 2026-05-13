import React from 'react';
import heroVideo from '../assets/hero-particles.mp4';

export default function DiscoverView() {
  return (
    // Changed space-y-8 to space-y-2 on mobile to tighten the layout
    <div className="max-w-7xl mx-auto space-y-2 md:space-y-8 h-[calc(100vh-80px)] flex flex-col justify-center">
      
      {/* Header Section: Reduced padding and smaller mobile text */}
      <div className="text-center space-y-1 md:space-y-4 py-2 md:py-8">
        <h2 className="text-2xl md:text-5xl font-serif italic text-white leading-tight">
          Synthesize your <span className="text-[#8A9A5B]">creative vision.</span>
        </h2>
        <p className="text-[10px] md:text-sm text-white/40 tracking-wide max-w-xs md:max-w-xl mx-auto px-4">
          The definitive AI studio. Let autonomous agents create, refine, and broadcast your cinematic universe.
        </p>
      </div>

      {/* Cinematic Video Hero Card: Adjusted height for mobile viewports */}
      <div className="w-full flex-1 min-h-[35vh] md:min-h-[60vh] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 relative group bg-[#020202] shadow-2xl flex items-center justify-center mx-auto max-w-[95%] md:max-w-full">
        
        <video 
          src={heroVideo} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen transition-opacity duration-1000 group-hover:opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />

        {/* Text Overlay: Positioned higher on mobile to clear the bottom command bar */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-14 pb-16 md:pb-36 z-10">
          <div className="max-w-2xl">
            <h3 className="text-xl md:text-5xl font-serif italic text-white mb-2 md:mb-4 drop-shadow-lg">
              The Engine is Online.
            </h3>
            <p className="text-white/60 text-[11px] md:text-base leading-relaxed drop-shadow-md line-clamp-3 md:line-clamp-none">
              Experience the next generation of video synthesis. Create stunning visuals from text, transform existing footage, or deploy autonomous AI agents.
            </p>
          </div>
        </div>
      </div>
      
      {/* Spacer to account for the FloatingCommandBar height on mobile */}
      <div className="h-20 md:hidden" />
    </div>
  );
}