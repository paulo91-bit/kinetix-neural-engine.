import React from 'react';

// (I removed the unused lucide-react and hook imports to keep the file clean)

/**
 * Latent Grid Background
 */
const LatentGrid = () => (
  <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="1" fill="#8A9A5B" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" className="animate-grid-drift" />
      <div className="absolute inset-0 bg-radial-vignette" />
    </svg>
  </div>
);

export default LatentGrid;