import { useCallback, useRef, useEffect } from 'react';

export enum SoundType {
  Start = 'start',
  Play = 'play',
  Suspense = 'suspense',
  Correct = 'correct',
  Wrong = 'wrong',
  Win = 'win',
  Lose = 'lose',
  FinalAnswer = 'final_answer',
  Tick = 'tick',
  FiftyFifty = 'fiftyFifty',
  AskAudience = 'askAudience',
  PhoneFriend = 'phoneFriend',
}

const soundMap: Record<SoundType, string> = {
  [SoundType.Start]: 'https://pixabay.com/music/main-title-genre-game-show-soundtrack-suspens-421116.mp3',
  [SoundType.Play]: 'https://archive.org/download/wwtbm-soundtrack/WWTBM%20Soundtrack/Easy%20Question%20Bed.mp3',
  [SoundType.Suspense]: 'https://archive.org/download/wwtbm-soundtrack/WWTBM%20Soundtrack/Medium%20Question%20Bed.mp3',
  [SoundType.Correct]: 'https://archive.org/download/wwtbm-soundtrack/WWTBM%20Soundtrack/Correct%20Answer.mp3',
  [SoundType.Wrong]: 'https://archive.org/download/wwtbm-soundtrack/WWTBM%20Soundtrack/Wrong%20Answer.mp3',
  [SoundType.Win]: 'https://archive.org/download/wwtbm-soundtrack/WWTBM%20Soundtrack/Millionaire%20Win.mp3',
  [SoundType.Lose]: 'https://archive.org/download/wwtbm-soundtrack/WWTBM%20Soundtrack/Walk%20Away%20%28Wrong%20Answer%29.mp3',
  [SoundType.FinalAnswer]: 'https://archive.org/download/wwtbm-soundtrack/WWTBM%20Soundtrack/Final%20Answer%20Bed.mp3',
  [SoundType.Tick]: 'https://archive.org/download/wwtbm-soundtrack/WWTBM%20Soundtrack/Final%20Answer%20Bed.mp3',
  [SoundType.FiftyFifty]: 'https://archive.org/download/wwtbm-soundtrack/WWTBM%20Soundtrack/50-50.mp3',
  [SoundType.AskAudience]: 'https://archive.org/download/wwtbm-soundtrack/WWTBM%20Soundtrack/Ask%20the%20Audience.mp3',
  [SoundType.PhoneFriend]: 'https://archive.org/download/wwtbm-soundtrack/WWTBM%20Soundtrack/Phone-a-Friend.mp3',
};


const musicTracks = [SoundType.Start, SoundType.Play, SoundType.Suspense];

export const useSound = () => {
  // Store all audio elements in a ref
  const audioRef = useRef<Record<string, HTMLAudioElement>>({});
  const currentMusicRef = useRef<HTMLAudioElement | null>(null);
  const currentSoundEffectRef = useRef<HTMLAudioElement | null>(null);
  const isMutedRef = useRef<boolean>(false);
  const preloaded = useRef(false);
  const musicFadeIntervalRef = useRef<number | null>(null);

  // Preload all sounds on initial hook mount
  useEffect(() => {
    if (preloaded.current) return;

    // Iterate over all sound types and create Audio elements
    Object.values(SoundType).forEach(type => {
      const soundKey = type as SoundType;
      if (soundMap[soundKey] && !audioRef.current[soundKey]) {
        const audio = new Audio(soundMap[soundKey]);
        audio.preload = 'auto'; // Hint to the browser to start loading
        audioRef.current[soundKey] = audio;
      }
    });

    preloaded.current = true;
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    isMutedRef.current = muted;
    // Apply mute state to all preloaded audio elements
    // FIX: Explicitly type `audio` as `HTMLAudioElement` because type inference is failing.
    Object.values(audioRef.current).forEach((audio: HTMLAudioElement) => {
      if (audio) {
        audio.muted = muted;
      }
    });
    // The current music is already in the ref, but this is a safe check.
    if (currentMusicRef.current) {
        currentMusicRef.current.muted = muted;
    }
    if (currentSoundEffectRef.current) {
        currentSoundEffectRef.current.muted = muted;
    }
  }, []);

  const playSound = useCallback((type: SoundType, loop = false): HTMLAudioElement | null => {
    const isMusic = musicTracks.includes(type);

    // If it's a sound effect, stop the previous one.
    if (!isMusic && currentSoundEffectRef.current) {
        currentSoundEffectRef.current.pause();
        currentSoundEffectRef.current.currentTime = 0;
        currentSoundEffectRef.current = null;
    }

    const audio = audioRef.current[type];
    
    // If sound not found (which shouldn't happen after preload), log an error.
    if (!audio) {
      console.error(`Sound asset for "${type}" could not be found or loaded.`);
      return null;
    }

    audio.muted = isMutedRef.current;
    audio.loop = loop;
    audio.currentTime = 0; // Always restart the sound

    const promise = audio.play();
    if (promise !== undefined) {
      promise.catch(error => {
        // Ignore AbortError which occurs when a sound is stopped before it has finished playing.
        if (error.name === 'NotAllowedError') {
          console.warn(`Autoplay for sound "${type}" was prevented by browser policy.`);
        } else if (error.name !== 'AbortError') {
          console.error(`Audio playback failed for "${type}":`, error);
        }
      });
    }

    if (!isMusic) {
      currentSoundEffectRef.current = audio;
      audio.onended = () => {
        if (currentSoundEffectRef.current === audio) {
          currentSoundEffectRef.current = null;
        }
      };
    }

    return audio;
  }, []);

  const stopSound = useCallback((type: SoundType) => {
    const audio = audioRef.current[type];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      if (currentSoundEffectRef.current === audio) {
        currentSoundEffectRef.current = null;
      }
    }
  }, []);

  const playMusic = useCallback((type: SoundType) => {
    const currentMusic = currentMusicRef.current;
    // If the requested music is already the current one, do nothing.
    if (currentMusic && currentMusic.src === soundMap[type] && !currentMusic.paused) {
      return;
    }
  
    // Clear any ongoing fade interval.
    if (musicFadeIntervalRef.current) {
      clearInterval(musicFadeIntervalRef.current);
    }
  
    // Fade out the old music.
    if (currentMusic) {
      const fadeOutMusic = currentMusic;
      const startVolume = fadeOutMusic.volume;
      const fadeDuration = 1000;
      const steps = fadeDuration / 50;
      const volumeStep = startVolume / steps;
      // Use a local interval for fade-out so it doesn't interfere with fade-in
      const fadeOutInterval = setInterval(() => {
        const newVolume = fadeOutMusic.volume - volumeStep;
        if (newVolume <= 0) {
          fadeOutMusic.volume = 0;
          fadeOutMusic.pause();
          fadeOutMusic.currentTime = 0;
          clearInterval(fadeOutInterval);
        } else {
          fadeOutMusic.volume = newVolume;
        }
      }, 50);
    }
  
    // Stop any currently playing sound effects abruptly
    if (currentSoundEffectRef.current) {
      currentSoundEffectRef.current.pause();
      currentSoundEffectRef.current.currentTime = 0;
      currentSoundEffectRef.current = null;
    }
  
    const newMusic = audioRef.current[type];
    if (!newMusic) {
      console.error(`Sound asset for "${type}" could not be found or loaded.`);
      return;
    }
  
    // Prepare and play the new music
    newMusic.muted = isMutedRef.current;
    newMusic.loop = true;
    newMusic.currentTime = 0;
    newMusic.volume = 0; // Start silently for fade-in
  
    const promise = newMusic.play();
    if (promise) {
      promise
        .then(() => {
          // Set as the current music track
          currentMusicRef.current = newMusic;
  
          // Fade in the new music
          const targetVolume = 0.3;
          const fadeDuration = 1000;
          const steps = fadeDuration / 50;
          const volumeStep = targetVolume / steps;
  
          musicFadeIntervalRef.current = window.setInterval(() => {
            const newVolume = newMusic.volume + volumeStep;
            if (newVolume >= targetVolume) {
              newMusic.volume = targetVolume;
              if (musicFadeIntervalRef.current) clearInterval(musicFadeIntervalRef.current);
            } else {
              newMusic.volume = newVolume;
            }
          }, 50);
        })
        .catch(error => {
          if (error.name !== 'AbortError') {
            console.error(`Music playback failed for "${type}":`, error);
          }
        });
    }
  }, []);

  const stopMusic = useCallback(() => {
    if (musicFadeIntervalRef.current) {
      clearInterval(musicFadeIntervalRef.current);
    }
    const music = currentMusicRef.current;
    if (music) {
      const fadeOutMusic = music;
      currentMusicRef.current = null;
      const startVolume = fadeOutMusic.volume;
      const fadeDuration = 1000;
      const steps = fadeDuration / 50;
      const volumeStep = startVolume / steps;
  
      musicFadeIntervalRef.current = window.setInterval(() => {
        const newVolume = fadeOutMusic.volume - volumeStep;
        if (newVolume <= 0) {
          fadeOutMusic.volume = 0;
          fadeOutMusic.pause();
          fadeOutMusic.currentTime = 0;
          if (musicFadeIntervalRef.current) clearInterval(musicFadeIntervalRef.current);
        } else {
          fadeOutMusic.volume = newVolume;
        }
      }, 50);
    }
  }, []);

  return { playSound, stopSound, playMusic, stopMusic, setMuted };
};