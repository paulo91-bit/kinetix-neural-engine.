import React from 'react';
import heroVideo from '../assets/hero-particles.mp4';

export default function DiscoverView() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4 py-8">
        <h2 className="text-4xl md:text-5xl font-serif italic text-white leading-tight">
          Synthesize your <span className="text-[#8A9A5B]">creative vision.</span>
        </h2>
        <p className="text-sm text-white/40 tracking-wide max-w-xl mx-auto">
          The definitive AI studio. Let autonomous agents create, refine, and broadcast your cinematic universe.
        </p>
      </div>

      {/* Cinematic Video Hero Card */}
      <div className="w-full min-h-[50vh] md:min-h-[60vh] rounded-[2.5rem] overflow-hidden border border-white/10 relative group bg-[#020202] shadow-2xl flex items-center justify-center">
        
        {/* Abstract Particle Video */}
        <video 
          src={heroVideo} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen transition-opacity duration-1000 group-hover:opacity-60"
        />

        {/* Deep Gradient Overlay (Ensures text is always readable) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none" />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14 pb-32 md:pb-36 z-10">
          <div className="max-w-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
            <h3 className="text-3xl md:text-5xl font-serif italic text-white mb-4 drop-shadow-lg">The Engine is Online.</h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed drop-shadow-md">
              Experience the next generation of video synthesis. Create stunning visuals from text, transform existing footage, or deploy autonomous AI agents to manage your social media presence effortlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
