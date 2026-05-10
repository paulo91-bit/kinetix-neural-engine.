import React, { useState, useEffect, useRef } from 'react';

// (I removed the lucide-react imports since they aren't used in this specific component)

const ChronosSlider = ({ value, onChange }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const rafRef = useRef(null);

  useEffect(() => {
    const startValue = displayValue;
    const endValue = value;
    const duration = 400; 
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(startValue + (endValue - startValue) * easeProgress);
      setDisplayValue(current);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-[200px] relative z-10 text-left">
      <div className="flex justify-between items-end">
        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">Duration</label>
        <div className="text-3xl font-serif italic text-clay leading-none">
          {displayValue}<span className="text-sm not-italic ml-1 opacity-50">S</span>
        </div>
      </div>
      <div className="relative w-full h-px bg-white/10 group mt-2">
        <div className="absolute -top-4 left-0 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity text-clay/50 uppercase tracking-widest">Slide to Edit</div>
        <input 
          type="range" 
          min="0" 
          max="120" 
          value={value} 
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-px appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[1px] [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-clay group-hover:[&::-webkit-slider-thumb]:h-10 transition-all"
        />
      </div>
    </div>
  );
};

export default ChronosSlider;