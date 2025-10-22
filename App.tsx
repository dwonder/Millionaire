
import React, { useState, useCallback, useEffect } from 'react';
import { GameState } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import { PRIZE_LADDER } from './constants';
import { useSound, SoundType } from './useSound';
import { unlockAudio } from './audio';
import { VolumeUpIcon, VolumeOffIcon } from './components/icons';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [playerName, setPlayerName] = useState<string>('');
  const [finalScore, setFinalScore] = useState<string>('€0');
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      const savedMute = localStorage.getItem('isMuted');
      return savedMute ? JSON.parse(savedMute) : false;
    } catch {
      return false;
    }
  });
  const { playSound, stopSound, playMusic, stopMusic, setMuted } = useSound();
  const [userInteracted, setUserInteracted] = useState(false);

  // Effect to persist mute state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('isMuted', JSON.stringify(isMuted));
    } catch (error) {
      console.error("Could not save mute state to local storage:", error);
    }
  }, [isMuted]);

  // Effect to apply mute state to all sounds
  useEffect(() => {
    setMuted(isMuted);
  }, [isMuted, setMuted]);


  // This effect will run once to set up the interaction listener.
  useEffect(() => {
    const handleInteraction = () => {
      if (userInteracted) return;
      unlockAudio();
      setUserInteracted(true);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [userInteracted]);

  useEffect(() => {
    // Don't try to play music until the user has interacted with the page.
    if (!userInteracted) {
      return;
    }

    switch(gameState) {
      case GameState.Start:
        stopMusic();
        playMusic(SoundType.Start);
        break;
      case GameState.Playing:
        stopMusic();
        playMusic(SoundType.Play);
        break;
      case GameState.End:
        stopMusic();
        break;
    }
  }, [gameState, playMusic, stopMusic, userInteracted]);

  const startGame = useCallback((name: string) => {
    setPlayerName(name.trim());
    setGameState(GameState.Playing);
    setFinalScore('€0');
    setIsWinner(false);
  }, []);

  const endGame = useCallback((currentQuestionIndex: number, walkedAway: boolean = false) => {
    let score = '€0';
    if (walkedAway) {
      score = currentQuestionIndex > 0 ? PRIZE_LADDER[PRIZE_LADDER.length - currentQuestionIndex].prize : '€0';
    } else {
       if (currentQuestionIndex >= 10) {
        score = PRIZE_LADDER.find(p => p.level === 10)?.prize || '€32,000';
      } else if (currentQuestionIndex >= 5) {
        score = PRIZE_LADDER.find(p => p.level === 5)?.prize || '€1,000';
      }
    }
   
    const isWinning = currentQuestionIndex === 15;
    stopMusic();
    playSound(isWinning ? SoundType.Win : SoundType.Lose);

    setFinalScore(score);
    setIsWinner(isWinning);
    setGameState(GameState.End);
  }, [playSound, stopMusic]);

  const renderScreen = () => {
    switch (gameState) {
      case GameState.Playing:
        return <GameScreen 
                  playerName={playerName}
                  onEndGame={endGame} 
                  playSound={playSound} 
                  stopSound={stopSound} 
                  playMusic={playMusic}
               />;
      case GameState.End:
        return <EndScreen score={finalScore} onRestart={() => setGameState(GameState.Start)} isWinner={isWinner} playerName={playerName} />;
      case GameState.Start:
      default:
        return <StartScreen onStart={startGame} />;
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-indigo-900 min-h-screen text-white flex items-center justify-center p-4 font-sans">
      <button
        onClick={() => setIsMuted(prev => !prev)}
        className="fixed top-4 right-4 z-50 p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors"
        aria-label={isMuted ? "Unmute sound" : "Mute sound"}
      >
        {isMuted ? <VolumeOffIcon className="w-6 h-6" /> : <VolumeUpIcon className="w-6 h-6" />}
      </button>
      <div className="w-full max-w-7xl mx-auto">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
