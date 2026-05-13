import React, { useState } from 'react';

// Core UI Components
import NoiseOverlay from './components/NoiseOverlay';
import MobileHeader from './components/MobileHeader';
import DesktopHeader from './components/DesktopHeader';
import Sidebar from './components/Sidebar';
import FloatingCommandBar from './components/FloatingCommandBar';

// Views
import DiscoverView from './views/DiscoverView';
import TextToVideoView from './views/TextToVideoView';
import ImageToVideoView from './views/ImageToVideoView';
import VideoToVideoView from './views/VideoToVideoView';
import AIAgentsView from './views/AIAgentsView';
import VaultView from './views/VaultView';

export default function App() {
  const [currentView, setCurrentView] = useState('discover');
  const [promptText, setPromptText] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleGenerate = () => {
    if (!promptText) return;
    if (currentView === 'discover') setCurrentView('t2v');
    console.log("Generating with prompt:", promptText);
  };

  return (
    /* h-[100dvh] ensures the height is perfect even when mobile browser bars appear/disappear */
    <div className="flex h-[100dvh] bg-[#050505] text-[#D2B48C] font-sans overflow-hidden selection:bg-[#8A9A5B] selection:text-black">
      <NoiseOverlay />

      <MobileHeader 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      {/* h-full and overflow-hidden on mobile keeps everything locked in place */}
      <main className="flex-1 flex flex-col relative h-full w-full pt-16 md:pt-0 overflow-hidden">
        
        <DesktopHeader currentView={currentView} />

        {/* FIX: Removed 'overflow-y-auto' for mobile (md:overflow-y-auto)
            and added 'flex flex-col' so DiscoverView can fill the space.
        */}
        <div className="flex-1 md:overflow-y-auto custom-scrollbar relative p-4 md:p-8 pb-32 md:pb-8 flex flex-col min-h-0">
          {currentView === 'discover' && <DiscoverView />}
          {currentView === 't2v' && <TextToVideoView handleGenerate={handleGenerate} />}
          {currentView === 'i2v' && <ImageToVideoView handleGenerate={handleGenerate} />}
          {currentView === 'v2v' && <VideoToVideoView handleGenerate={handleGenerate} />}
          {currentView === 'agents' && <AIAgentsView />}
          {currentView === 'vault' && <VaultView />}
        </div>

        {currentView === 'discover' && (
          <FloatingCommandBar 
            promptText={promptText} 
            setPromptText={setPromptText} 
            handleGenerate={handleGenerate} 
          />
        )}
        
      </main>
    </div>
  );
}