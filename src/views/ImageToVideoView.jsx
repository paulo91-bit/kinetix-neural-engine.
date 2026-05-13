import React from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';

export default function ImageToVideoView({ handleGenerate, isGenerating, promptText, setPromptText }) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 md:mt-12 flex flex-col gap-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-serif italic text-white mb-2">Image to Video</h2>
        <p className="text-white/40 text-sm">Upload a base image to animate and evolve in the latent space.</p>
      </div>
      
      {/* Upload Box - Updated hover and icon color to Moss Green */}
      <div className="border-2 border-dashed border-white/10 hover:border-[#8A9A5B]/50 rounded-3xl p-12 md:p-20 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-black/20 group">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <UploadCloud size={32} className="text-[#8A9A5B]" />
        </div>
        <p className="text-white font-medium mb-2 text-lg">Drag & drop your image here</p>
        <p className="text-white/40 text-sm mb-6">or click to browse files (JPG, PNG, WEBP)</p>
        <button 
          disabled={isGenerating}
          className="bg-white/5 border border-white/10 text-white px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-white/10 transition-colors disabled:opacity-50"
        >
          Select Image
        </button>
      </div>

      {/* Input Bar - Updated colors and state logic */}
      <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4 mt-2 shadow-xl">
        <input 
          type="text" 
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder={isGenerating ? "Processing frame data..." : "Optional: Describe how the image should animate..."} 
          disabled={isGenerating}
          className="bg-transparent border-none outline-none text-sm flex-1 text-white placeholder:text-white/20 px-2 min-w-0 disabled:opacity-50" 
        />
        <button 
          onClick={handleGenerate} 
          disabled={isGenerating || !promptText}
          className={`bg-[#8A9A5B] text-black w-full md:w-32 h-12 flex items-center justify-center rounded-xl font-bold uppercase tracking-widest text-[10px] transition-colors shrink-0 ${
            isGenerating || !promptText ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
          }`}
        >
          {isGenerating ? <Loader2 size={16} className="animate-spin" /> : 'Generate'}
        </button>
      </div>
    </div>
  );
}