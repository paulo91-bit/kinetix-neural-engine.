import React, { useState, useCallback } from 'react';

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

// Hook
import { useVideoGeneration } from './hooks/useVideoGeneration';

export default function App() {
  const [currentView, setCurrentView] = useState('discover');
  const [promptText, setPromptText] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Vault stores all completed jobs: [{ id, prompt, url, createdAt }]
  const [vaultItems, setVaultItems] = useState([]);

  const {
    generateVideo,
    status,
    videoUrl,
    error,
    jobId,
    isGenerating,
    reset,
  } = useVideoGeneration();

  // Called when a job completes — saves to vault
  const handleJobComplete = useCallback((url, prompt) => {
    setVaultItems(prev => [
      {
        id: Date.now(),
        prompt,
        url,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  }, []);

  // Called from FloatingCommandBar (Discover view)
  const handleGenerate = useCallback(() => {
    if (!promptText.trim()) return;
    setCurrentView('t2v');
  }, [promptText]);

  // Called from TextToVideoView with the full prompt
  const handleT2VGenerate = useCallback(async (prompt, options = {}) => {
    if (!prompt.trim()) return;
    await generateVideo(prompt, options);
  }, [generateVideo]);

  return (
    <div className="flex h-[100dvh] bg-[#050505] text-[#D2B48C] font-sans overflow-hidden selection:bg-[#8A9A5B] selection:text-black">
      <NoiseOverlay />

      <MobileHeader
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <Sidebar
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          // Reset generation state when navigating away from t2v
          if (view !== 't2v') reset();
        }}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 flex flex-col relative h-full w-full pt-16 md:pt-0 overflow-hidden">
        <DesktopHeader currentView={currentView} />

        <div className="flex-1 md:overflow-y-auto custom-scrollbar relative p-4 md:p-8 pb-32 md:pb-8 flex flex-col min-h-0">
          {currentView === 'discover' && <DiscoverView />}

          {currentView === 't2v' && (
            <TextToVideoView
              handleGenerate={handleT2VGenerate}
              isGenerating={isGenerating}
              status={status}
              videoUrl={videoUrl}
              error={error}
              initialPrompt={promptText}
              onComplete={handleJobComplete}
              onReset={reset}
            />
          )}

          {currentView === 'i2v' && (
            <ImageToVideoView
              handleGenerate={handleGenerate}
              isGenerating={isGenerating}
              promptText={promptText}
              setPromptText={setPromptText}
            />
          )}

          {currentView === 'v2v' && (
            <VideoToVideoView handleGenerate={handleGenerate} />
          )}

          {currentView === 'agents' && <AIAgentsView />}

          {currentView === 'vault' && (
            <VaultView items={vaultItems} />
          )}
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