import React from 'react';
import heroVideo from '../assets/hero-particles.mp4';

export default function DiscoverView() {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      
      {/* Header Section: Tightened further */}
      <div className="text-center shrink-0 pt-2 pb-1 md:pt-4 md:pb-2">
        <h2 className="text-xl md:text-3xl lg:text-4xl font-serif italic text-white leading-tight">
          Synthesize your <span className="text-[#8A9A5B]">creative vision.</span>
        </h2>
        <p className="text-[9px] md:text-xs text-white/40 tracking-wide mt-0.5">
          The definitive AI studio.
        </p>
      </div>

      {/* Cinematic Video Container */}
      <div className="flex-1 mx-4 relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-black shadow-2xl min-h-0">
        
        <video 
          src={heroVideo} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-top opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />

        {/* FIX: Optimized Text Overlay for small/medium vertical heights
            - Changed p-20 to p-8/p-10
            - Changed pb-28 to pb-8/pb-12
            - Added 'max-h-full' and 'flex-col justify-end'
        */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12 pb-6 md:pb-8 lg:pb-16 z-10">
          <div className="max-w-4xl">
            <h1 className="text-2xl md:text-4xl lg:text-7xl font-serif italic text-white mb-1 md:mb-3 drop-shadow-2xl leading-none">
              The Engine is Online.
            </h1>
            <p className="text-white/70 text-[10px] md:text-sm lg:text-xl leading-relaxed drop-shadow-lg max-w-2xl line-clamp-1 md:line-clamp-none">
              Experience the next generation of video synthesis.
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom Spacer: Shrunk to give the text more room inside the card */}
      <div className="h-16 md:h-20 shrink-0" />
    </div>
  );
}