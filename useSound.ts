import { useCallback, useRef } from 'react';

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
  [SoundType.Play]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20to%20Be%20a%20Millionaire%20-%20US%20-%2001%20Opening%20Titles%201.mp3',
  [SoundType.Suspense]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20To%20Be%20A%20Millionaire%20-%201000000%20Question.mp3',
  [SoundType.Correct]: 'https://www.myinstants.com/media/sounds/millionaire_correct_answer.mp3',
  [SoundType.Wrong]: 'https://www.myinstants.com/media/sounds/wwtbam-wrong-answer.mp3',
  [SoundType.Win]: 'https://ia902905.us.archive.org/27/items/who-wants-to-be-a-millionaire-soundtrack/14.%20%241%2C000%2C000%20Win.mp3',
  [SoundType.Lose]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20To%20Be%20A%20Millionaire%20-%20Out%20of%20Time.mp3',
  [SoundType.FinalAnswer]: 'https://ia902905.us.archive.org/27/items/who-wants-to-be-a-millionaire-soundtrack/09.%20Final%20Answer-.mp3',
  [SoundType.Tick]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20To%20Be%20A%20Millionaire%20-%20Question%20Music.mp3',
  [SoundType.FiftyFifty]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20to%20Be%20a%20Millionaire%20-%20Music%20-%205050.mp3',
  [SoundType.AskAudience]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20to%20Be%20a%20Millionaire%20-%20Music%20-%2016000F.mp3',
  [SoundType.PhoneFriend]: 'https://www.televisiontunes.com/uploads/audio/Who%20Wants%20to%20Be%20a%20Millionaire%20-%20Music%20-%204Q.mp3',
};

export const useSound = () => {
  const audioRef = useRef<Record<string, HTMLAudioElement>>({});
  const currentMusicRef = useRef<HTMLAudioElement | null>(null);
  const isMutedRef = useRef<boolean>(false);

  const setMuted = useCallback((muted: boolean) => {
    isMutedRef.current = muted;
    Object.values(audioRef.current).forEach(audio => {
        if (audio) {
            audio.muted = muted;
        }
    });
    if (currentMusicRef.current) {
        currentMusicRef.current.muted = muted;
    }
  }, []);

  const playSound = useCallback((type: SoundType, loop = false): HTMLAudioElement => {
    if (!audioRef.current[type]) {
      audioRef.current[type] = new Audio(soundMap[type]);
    }
    const audio = audioRef.current[type];
    audio.muted = isMutedRef.current;
    audio.loop = loop;
    
    const promise = audio.play();
    if (promise !== undefined) {
      promise.catch(error => {
        // Ignore AbortError which occurs when a sound is stopped before it has finished playing.
        // This is expected behavior in a game-like environment.
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
    if (audioRef.current[type]) {
      audioRef.current[type].pause();
      audioRef.current[type].currentTime = 0;
    }
  }, []);

  const playMusic = useCallback((type: SoundType) => {
    if (currentMusicRef.current) {
      currentMusicRef.current.pause();
      currentMusicRef.current.currentTime = 0;
    }
    const music = playSound(type, true);
    music.volume = 0.3;
    currentMusicRef.current = music;
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