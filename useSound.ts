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
  [SoundType.Start]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20To%20Be%20A%20Millionaire%20-%20Full.mp3',
  [SoundType.Play]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20To%20Be%20A%20Millionaire%20-%201000000%20Question.mp3',
  [SoundType.Suspense]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20To%20Be%20A%20Millionaire%20-%201000000%20Question.mp3',
  [SoundType.Correct]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20To%20Be%20A%20Millionaire%20-%20Full.mp3',
  [SoundType.Wrong]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20To%20Be%20A%20Millionaire%20-%20Full.mp3',
  [SoundType.Win]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20To%20Be%20A%20Millionaire%20-%20Question%20Music.mp3',
  [SoundType.Lose]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20To%20Be%20A%20Millionaire%20-%20Out%20of%20Time.mp3',
  [SoundType.FinalAnswer]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20To%20Be%20A%20Millionaire%20-%20Question%20Music.mp3',
  [SoundType.Tick]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20To%20Be%20A%20Millionaire%20-%20Question%20Music.mp3',
  [SoundType.FiftyFifty]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20to%20Be%20a%20Millionaire%20-%20Music%20-%205050.mp3',
  [SoundType.AskAudience]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20to%20Be%20a%20Millionaire%20-%20Music%20-%2016000F.mp3',
  [SoundType.PhoneFriend]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20to%20Be%20a%20Millionaire%20-%20Music%20-%204Q.mp3',
};

export const useSound = () => {
  // Store all audio elements in a ref
  const audioRef = useRef<Record<string, HTMLAudioElement>>({});
  const currentMusicRef = useRef<HTMLAudioElement | null>(null);
  const isMutedRef = useRef<boolean>(false);
  const preloaded = useRef(false);

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
  }, []);

  const playSound = useCallback((type: SoundType, loop = false): HTMLAudioElement | null => {
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

    return audio;
  }, []);

  const stopSound = useCallback((type: SoundType) => {
    const audio = audioRef.current[type];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  const playMusic = useCallback((type: SoundType) => {
    if (currentMusicRef.current) {
      currentMusicRef.current.pause();
      currentMusicRef.current.currentTime = 0;
    }
    const music = playSound(type, true);
    if (music) {
        music.volume = 0.3; // Music should be softer
        currentMusicRef.current = music;
    }
  }, [playSound]);

  const stopMusic = useCallback(() => {
    if (currentMusicRef.current) {
      currentMusicRef.current.pause();
      currentMusicRef.current.currentTime = 0;
      currentMusicRef.current = null;
    }
  }, []);

  return { playSound, stopSound, playMusic, stopMusic, setMuted };
};