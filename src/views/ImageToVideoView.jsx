import React from 'react';
import { UploadCloud } from 'lucide-react';

export default function ImageToVideoView({ handleGenerate }) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 md:mt-12 flex flex-col gap-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-serif italic text-white mb-2">Image to Video</h2>
        <p className="text-white/40 text-sm">Upload a base image to animate and evolve in the latent space.</p>
      </div>
      
      <div className="border-2 border-dashed border-white/10 hover:border-[#D2B48C]/50 rounded-3xl p-12 md:p-20 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-black/20 group">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <UploadCloud size={32} className="text-[#D2B48C]" />
        </div>
        <p className="text-white font-medium mb-2 text-lg">Drag & drop your image here</p>
        <p className="text-white/40 text-sm mb-6">or click to browse files (JPG, PNG, WEBP)</p>
        <button className="bg-white/5 border border-white/10 text-white px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-white/10 transition-colors">
          Select Image
        </button>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4 mt-2 shadow-xl">
        <input 
          type="text" 
          placeholder="Optional: Describe how the image should animate..." 
          className="bg-transparent border-none outline-none text-sm flex-1 text-white placeholder:text-white/20 px-2" 
        />
        <button onClick={handleGenerate} className="bg-[#D2B48C] text-black px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-colors shrink-0">
          Generate
        </button>
      </div>
    </div>
  );
}
