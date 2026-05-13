import React from 'react';
import { Video } from 'lucide-react';

export default function VideoToVideoView({ handleGenerate }) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 md:mt-12 flex flex-col gap-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-serif italic text-white mb-2">Video to Video</h2>
        <p className="text-white/40 text-sm">Upload a source video to restyle and reimagine.</p>
      </div>
      
      <div className="border-2 border-dashed border-white/10 hover:border-[#8A9A5B]/50 rounded-3xl p-12 md:p-20 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-black/20 group">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Video size={32} className="text-[#8A9A5B]" />
        </div>
        <p className="text-white font-medium mb-2 text-lg">Drag & drop source video</p>
        <p className="text-white/40 text-sm mb-6">MP4, MOV, WEBM (Max 50MB)</p>
        <button className="bg-white/5 border border-white/10 text-white px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-white/10 transition-colors">
          Select Video
        </button>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4 mt-2 shadow-xl">
        <input 
          type="text" 
          placeholder="Describe the new style or transformation..." 
          className="bg-transparent border-none outline-none text-sm flex-1 text-white placeholder:text-white/20 px-2" 
        />
        <button onClick={handleGenerate} className="bg-[#8A9A5B] text-black px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-colors shrink-0">
          Transform
        </button>
      </div>
    </div>
  );
}
