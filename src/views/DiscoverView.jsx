import React from 'react';

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

      <div className="w-full min-h-[50vh] md:min-h-[60vh] rounded-[2.5rem] overflow-hidden border border-white/10 relative group bg-[#020202] shadow-2xl flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-[#8A9A5B] rounded-full blur-[100px] animate-core-pulse mix-blend-screen" />
          <div className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] bg-[#D2B48C] rounded-full blur-[80px] animate-core-spin mix-blend-screen" />
          <svg width="100%" height="100%" className="absolute inset-0 opacity-20" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)">
            <defs>
              <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                <circle cx="60" cy="60" r="1.5" fill="#8A9A5B" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" className="animate-grid-drift" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent flex flex-col justify-end p-8 md:p-14 pb-32 md:pb-36">
          <div className="max-w-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-700 relative z-10">
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