
import { useCallback, useRef } from 'react';

export enum SoundType {
  Start = 'start',
  Play = 'play',
  Suspense = 'suspense',
  Correct = 'correct',
  Wrong = 'wrong',
  Lifeline = 'lifeline',
  Win = 'win',
  Lose = 'lose',
  FinalAnswer = 'final_answer',
}

const soundMap: Record<SoundType, string> = {
  [SoundType.Start]: 'https://cdn.pixabay.com/audio/2022/08/23/audio_8222421711.mp3',
  [SoundType.Play]: 'https://cdn.pixabay.com/audio/2022/02/07/audio_f5152b1979.mp3',
  [SoundType.Suspense]: 'https://cdn.pixabay.com/audio/2023/09/21/audio_a124c61a5b.mp3',
  [SoundType.Correct]: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c295628b43.mp3',
  [SoundType.Wrong]: 'https://cdn.pixabay.com/audio/2022/03/15/audio_731c5520a8.mp3',
  [SoundType.Lifeline]: 'https://cdn.pixabay.com/audio/2022/04/07/audio_49219293cf.mp3',
  [SoundType.Win]: 'https://cdn.pixabay.com/audio/2022/09/23/audio_0333b64604.mp3',
  [SoundType.Lose]: 'https://cdn.pixabay.com/audio/2023/05/20/audio_1411516109.mp3',
  [SoundType.FinalAnswer]: 'https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c7444c.mp3',
};

export const useSound = () => {
  const audioRef = useRef<Record<string, HTMLAudioElement>>({});
  const currentMusicRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback((type: SoundType, loop = false) => {
    if (!audioRef.current[type]) {
      audioRef.current[type] = new Audio(soundMap[type]);
    }
    const audio = audioRef.current[type];
    audio.loop = loop;
    audio.play().catch(e => console.error("Audio play failed", e));
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

  return { playSound, stopSound, playMusic, stopMusic };
};
