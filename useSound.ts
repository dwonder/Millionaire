import { useCallback, useRef, useEffect } from 'react';
import { SoundType } from './types';
import { GENERATED_SOUNDS } from './soundSynthesizer';

export { SoundType };

const musicTracks = [SoundType.Start, SoundType.Play, SoundType.Suspense];

export const useSound = () => {
  const audioRef = useRef<Record<string, HTMLAudioElement>>({});
  const currentMusicRef = useRef<HTMLAudioElement | null>(null);
  const currentSoundEffectRef = useRef<HTMLAudioElement | null>(null);
  const isMutedRef = useRef<boolean>(false);
  const preloaded = useRef<boolean>(false);
  const musicFadeIntervalRef = useRef<number | null>(null);

  // Preload all synthesized sounds on mount
  useEffect(() => {
    if (preloaded.current || typeof window === 'undefined') return;

    Object.values(SoundType).forEach((type) => {
      const soundKey = type as SoundType;
      const dataUri = GENERATED_SOUNDS[soundKey];
      if (dataUri && !audioRef.current[soundKey]) {
        try {
          const audio = new Audio(dataUri);
          audio.preload = 'auto';
          audioRef.current[soundKey] = audio;
        } catch (e) {
          console.warn(`Could not initialize audio for ${soundKey}:`, e);
        }
      }
    });

    preloaded.current = true;
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    isMutedRef.current = muted;

    Object.values(audioRef.current).forEach((audio: HTMLAudioElement) => {
      if (audio) {
        audio.muted = muted;
      }
    });

    if (currentMusicRef.current) {
      currentMusicRef.current.muted = muted;
    }
    if (currentSoundEffectRef.current) {
      currentSoundEffectRef.current.muted = muted;
    }
  }, []);

  const playSound = useCallback((type: SoundType, loop = false): HTMLAudioElement | null => {
    const isMusic = musicTracks.includes(type);

    // Stop prior sound effect if this is an effect
    if (!isMusic && currentSoundEffectRef.current) {
      try {
        currentSoundEffectRef.current.pause();
        currentSoundEffectRef.current.currentTime = 0;
      } catch {}
      currentSoundEffectRef.current = null;
    }

    let audio = audioRef.current[type];
    if (!audio) {
      const uri = GENERATED_SOUNDS[type];
      if (uri) {
        audio = new Audio(uri);
        audioRef.current[type] = audio;
      }
    }

    if (!audio) {
      return null;
    }

    audio.muted = isMutedRef.current;
    audio.loop = loop;
    audio.currentTime = 0;

    const promise = audio.play();
    if (promise !== undefined) {
      promise.catch((error) => {
        // Autoplay or abort is handled safely without throwing fatal error
        if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
          console.warn(`Audio playback issue for "${type}":`, error.message);
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
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch {}
      if (currentSoundEffectRef.current === audio) {
        currentSoundEffectRef.current = null;
      }
    }
  }, []);

  const playMusic = useCallback((type: SoundType) => {
    const currentMusic = currentMusicRef.current;
    const targetSrc = GENERATED_SOUNDS[type];

    if (currentMusic && currentMusic.src === targetSrc && !currentMusic.paused) {
      return;
    }

    if (musicFadeIntervalRef.current) {
      clearInterval(musicFadeIntervalRef.current);
      musicFadeIntervalRef.current = null;
    }

    if (currentMusic) {
      try {
        currentMusic.pause();
        currentMusic.currentTime = 0;
      } catch {}
      currentMusicRef.current = null;
    }

    if (currentSoundEffectRef.current) {
      try {
        currentSoundEffectRef.current.pause();
        currentSoundEffectRef.current.currentTime = 0;
      } catch {}
      currentSoundEffectRef.current = null;
    }

    let newMusic = audioRef.current[type];
    if (!newMusic) {
      const uri = GENERATED_SOUNDS[type];
      if (uri) {
        newMusic = new Audio(uri);
        audioRef.current[type] = newMusic;
      }
    }

    if (!newMusic) {
      return;
    }

    newMusic.muted = isMutedRef.current;
    newMusic.loop = true;
    newMusic.currentTime = 0;
    newMusic.volume = 0.25;

    const promise = newMusic.play();
    if (promise) {
      promise
        .then(() => {
          currentMusicRef.current = newMusic;
        })
        .catch((error) => {
          if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
            console.warn(`Music playback issue for "${type}":`, error.message);
          }
        });
    }
  }, []);

  const stopMusic = useCallback(() => {
    if (musicFadeIntervalRef.current) {
      clearInterval(musicFadeIntervalRef.current);
      musicFadeIntervalRef.current = null;
    }

    const music = currentMusicRef.current;
    if (music) {
      try {
        music.pause();
        music.currentTime = 0;
      } catch {}
      currentMusicRef.current = null;
    }
  }, []);

  return { playSound, stopSound, playMusic, stopMusic, setMuted };
};