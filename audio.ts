// This module manages a singleton AudioContext to comply with browser autoplay policies.

const getAudioContext = (() => {
  let audioContext: AudioContext | null = null;
  return () => {
    if (!audioContext && typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext;
  };
})();

/**
 * Unlocks the global AudioContext.
 * This function must be called from within a user gesture event handler (e.g., a click handler).
 * After this is called once, programmatic audio playback should be allowed.
 */
export const unlockAudio = () => {
  const context = getAudioContext();
  if (context && context.state === 'suspended') {
    context.resume().catch(e => console.error("AudioContext.resume() failed:", e));
  }
};
