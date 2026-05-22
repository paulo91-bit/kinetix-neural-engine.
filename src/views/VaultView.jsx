import React from 'react';
import { Download, Film } from 'lucide-react';

/**
 * VaultView
 *
 * Props:
 *  - items: Array<{ id, prompt, url, createdAt }>
 *    Real completed jobs passed down from App.js state.
 *    Falls back to empty state UI when no items exist.
 */
export default function VaultView({ items = [] }) {

  const handleDownload = (url, prompt) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `kinetix-${Date.now()}.mp4`;
    a.target = '_blank';
    a.click();
  };

  const formatDate = (iso) => {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-serif italic text-white mb-2">My Vault</h2>
          <p className="text-white/40 text-sm">Your generated cinematic assets.</p>
        </div>
        {items.length > 0 && (
          <div className="text-xs text-white/40 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            {items.length} render{items.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2">
            <Film size={24} className="text-white/20" />
          </div>
          <p className="text-white/40 text-sm">No renders yet.</p>
          <p className="text-white/20 text-xs max-w-xs leading-relaxed">
            Generate a video from the Text to Video view and it will appear here automatically.
          </p>
        </div>
      )}

      {/* Video grid */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((video) => (
            <div
              key={video.id}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black/50 aspect-square"
            >
              <video
                src={video.url}
                loop
                muted
                onMouseOver={e => {
                  const p = e.target.play();
                  if (p !== undefined) p.catch(() => {});
                }}
                onMouseOut={e => e.target.pause()}
                playsInline
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Download button */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDownload(video.url, video.prompt)}
                  className="bg-black/60 backdrop-blur-md p-2 rounded-full text-white hover:text-[#D2B48C] transition-colors"
                >
                  <Download size={14} />
                </button>
              </div>

              {/* Prompt + date overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                <p className="text-xs text-white/80 line-clamp-2 leading-relaxed mb-1">
                  "{video.prompt}"
                </p>
                {video.createdAt && (
                  <p className="text-xs text-white/30">{formatDate(video.createdAt)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}