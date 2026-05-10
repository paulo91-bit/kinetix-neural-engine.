import React, { useState, useEffect } from 'react';

const KineticHeadline = () => {
  const [index, setIndex] = useState(0);
  const phrases = [
    { text: "Describe a cinematic world.", highlight: "world." },
    { text: "Synthesize your creative vision.", highlight: "vision." },
    { text: "Define the next sequence.", highlight: "sequence." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-32 flex flex-col items-center justify-center overflow-hidden">
      <div key={index} className="animate-synth-reveal flex flex-col items-center">
        <span className="text-white/40 text-[10px] uppercase tracking-[0.6em] mb-4 font-bold">KINETIX / Neural Engine v3</span>
        <h2 className="text-3xl md:text-4xl font-serif italic text-white text-center leading-tight">
          {phrases[index].text.split(phrases[index].highlight)[0]}
          <span className="text-moss">{phrases[index].highlight}</span>
        </h2>
      </div>
      <div className="absolute bottom-4 w-32 h-px bg-gradient-to-r from-transparent via-moss to-transparent opacity-30 animate-scan-line" />
    </div>
  );
};

export default KineticHeadline;