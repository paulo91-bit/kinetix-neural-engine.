import { useState, useRef, useCallback } from 'react';

// Read from Vite's environment variables
const API_BASE = import.meta.env.VITE_API_BASE_URL || ''; 
const POLL_INTERVAL_MS = 3000; // Poll every 3 seconds

// ... rest of your hook remains the same

/**
 * useVideoGeneration
 *
 * Handles the full lifecycle of a video generation job:
 * 1. POST /api/v1/engine/ignite  → get job_id
 * 2. Poll GET /api/v1/engine/telemetry/{job_id} until completed or failed
 *
 * Returns:
 *  - generateVideo(topic, options) — call to start a job
 *  - status: 'idle' | 'processing' | 'completed' | 'failed'
 *  - videoUrl: string | null — S3 URL when completed
 *  - error: string | null
 *  - jobId: string | null
 *  - reset() — clears all state back to idle
 */
export function useVideoGeneration() {
  const [status, setStatus] = useState('idle');
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);
  const [jobId, setJobId] = useState(null);

  const pollRef = useRef(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const pollTelemetry = useCallback((id) => {
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/engine/telemetry/${id}`);

        if (!res.ok) {
          throw new Error(`Telemetry request failed: ${res.status}`);
        }

        const data = await res.json();

        if (data.status === 'completed') {
          stopPolling();
          setStatus('completed');
          setVideoUrl(data.url);
        } else if (data.status === 'failed') {
          stopPolling();
          setStatus('failed');
          setError(data.error || 'Generation failed. Please try again.');
        }
        // If still 'processing', keep polling
      } catch (err) {
        stopPolling();
        setStatus('failed');
        setError(err.message || 'Failed to check job status.');
      }
    }, POLL_INTERVAL_MS);
  }, [stopPolling]);

  const generateVideo = useCallback(async (topic, {
    total_duration = 20,
    duration = null,
    style = 'Cinematic',
  } = {}) => {
    // Reset state
    setStatus('processing');
    setVideoUrl(null);
    setError(null);
    setJobId(null);
    stopPolling();

    try {
      const res = await fetch(`${API_BASE}/api/v1/engine/ignite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          total_duration,
          ...(duration !== null && { duration }),
          style,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || `Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setJobId(data.job_id);

      // Start polling telemetry
      pollTelemetry(data.job_id);
    } catch (err) {
      setStatus('failed');
      setError(err.message || 'Failed to start generation.');
    }
  }, [pollTelemetry, stopPolling]);

  const reset = useCallback(() => {
    stopPolling();
    setStatus('idle');
    setVideoUrl(null);
    setError(null);
    setJobId(null);
  }, [stopPolling]);

  return {
    generateVideo,
    status,
    videoUrl,
    error,
    jobId,
    isGenerating: status === 'processing',
    reset,
  };
}