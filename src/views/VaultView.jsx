import React from 'react';
import { Download } from 'lucide-react';

export default function VaultView() {
  const vaultVideos = [
    { id: 1, src: "[https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4](https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4)", prompt: "Abstract flowing moss particles, cinematic lighting, 8k" },
    { id: 2, src: "[https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4](https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4)", prompt: "Golden clay ink swirling in dark water, macro photography" },
    { id: 3, src: "[https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4](https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4)", prompt: "Futuristic neural engine interface glowing in the dark" },
    { id: 4, src: "[https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4](https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4)", prompt: "Deep space nebula, cinematic tracking shot" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-serif italic text-white mb-2">My Vault</h2>
          <p className="text-white/40 text-sm">Your generated cinematic assets.</p>
        </div>
        <div className="text-xs text-white/40 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          Storage: 4.2 GB / 10 GB
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {vaultVideos.map((video) => (
          <div key={video.id} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black/50 aspect-square">
            <video 
              src={video.src} 
              loop 
              muted 
              onMouseOver={e => {
                const playPromise = e.target.play();
                if (playPromise !== undefined) {
                  playPromise.catch(err => console.log('Hover playback error:', err));
                }
              }}
              onMouseOut={e => e.target.pause()}
              playsInline
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="bg-black/60 backdrop-blur-md p-2 rounded-full text-white hover:text-[#D2B48C]">
                <Download size={14} />
              </button>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
              <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">"{video.prompt}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
