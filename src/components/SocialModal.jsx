import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Globe, 
  Camera, 
  Music 
} from 'lucide-react';

/**
 * Social Integration Modal
 */
const SocialModal = ({ isOpen, onClose }) => {
  const [links, setLinks] = useState({ x: false, insta: false, tiktok: false });
  const [isUplinking, setIsUplinking] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

  const handleConnect = (platform) => {
    setLinks(prev => ({ ...prev, [platform]: 'linking' }));
    setTimeout(() => setLinks(prev => ({ ...prev, [platform]: true })), 1500);
  };

  const handleUplink = () => {
    setIsUplinking(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => { 
          setIsUplinking(false); 
          onClose(); 
        }, 500);
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-2xl bg-black/60">
      <div className="w-full max-w-md bg-obsidian border border-clay/20 rounded-[2rem] p-8 relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        <button onClick={onClose} className="absolute top-6 left-6 flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Return to Cinema</span>
        </button>
        <div className="mt-12">
          <h2 className="text-3xl font-serif italic text-white mb-8">Social Uplink</h2>
          <div className="space-y-4 mb-10">
            {[
              { id: 'x', name: 'X.com', icon: Globe },
              { id: 'insta', name: 'Instagram', icon: Camera },
              { id: 'tiktok', name: 'TikTok', icon: Music }
            ].map(platform => (
              <div key={platform.id} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <platform.icon size={20} className="text-clay" />
                  <span className="text-sm font-medium">{platform.name}</span>
                </div>
                <button 
                  onClick={() => handleConnect(platform.id)}
                  disabled={links[platform.id] === true || links[platform.id] === 'linking'}
                  className="text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-clay/20 hover:bg-clay hover:text-black transition-all disabled:opacity-50"
                >
                  {links[platform.id] === true ? 'Connected' : links[platform.id] === 'linking' ? 'Linking...' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
          {isUplinking ? (
            <div className="space-y-4">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-moss transition-all duration-100" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-center text-[10px] uppercase tracking-[0.2em] text-moss">Broadcasting to Neural Feed...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <button onClick={handleUplink} className="w-full bg-moss text-black py-5 rounded-full font-bold uppercase tracking-[0.25em] text-xs hover:scale-[1.02] active:scale-[0.98] transition-transform">
                Uplink to Feed
              </button>
              <button onClick={onClose} className="w-full text-white/30 hover:text-white text-[10px] uppercase tracking-[0.2em] py-2 transition-colors">
                Cancel Broadcast
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialModal;