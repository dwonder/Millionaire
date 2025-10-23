import React, { useState, useCallback, useEffect } from 'react';
import { GameState, Lifelines, SavedGameState } from './types';
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

  // Lifted state for game progress
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [lifelines, setLifelines] = useState<Lifelines>({ fiftyFifty: true, askAudience: true, phoneFriend: true });
  const [savedGame, setSavedGame] = useState<SavedGameState | null>(null);

  // Load game from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('cyberMillionaireSave');
      if (savedData) {
        setSavedGame(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Failed to load game state:", error);
      localStorage.removeItem('cyberMillionaireSave');
    }
  }, []);
  
  // Save game to localStorage when state changes during play
  useEffect(() => {
    if (gameState === GameState.Playing) {
      try {
        const dataToSave: SavedGameState = {
          playerName,
          currentQuestionIndex,
          lifelines,
        };
        localStorage.setItem('cyberMillionaireSave', JSON.stringify(dataToSave));
      } catch (error) {
        console.error("Failed to save game state:", error);
      }
    } else {
      // Clear save on start/end screen
      localStorage.removeItem('cyberMillionaireSave');
      if(gameState === GameState.Start) {
        // Reload potential save if we return to start screen
         const savedData = localStorage.getItem('cyberMillionaireSave');
         if (savedData) setSavedGame(JSON.parse(savedData));
         else setSavedGame(null);
      }
    }
  }, [gameState, playerName, currentQuestionIndex, lifelines]);


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
        // playMusic(SoundType.Start); // Disabled to allow iframe audio to play
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
    setCurrentQuestionIndex(0);
    setLifelines({ fiftyFifty: true, askAudience: true, phoneFriend: true });
    setGameState(GameState.Playing);
    setFinalScore('€0');
    setIsWinner(false);
  }, []);
  
  const resumeGame = useCallback((savedData: SavedGameState) => {
    setPlayerName(savedData.playerName);
    setCurrentQuestionIndex(savedData.currentQuestionIndex);
    setLifelines(savedData.lifelines);
    setGameState(GameState.Playing);
    setFinalScore('€0');
    setIsWinner(false);
  }, []);

  const endGame = useCallback((questionIndex: number, walkedAway: boolean = false) => {
    let score = '€0';
    const isWinning = questionIndex === 15;

    if (isWinning) {
      score = PRIZE_LADDER.find(p => p.level === 15)?.prize || '€1,000,000';
    } else if (walkedAway) {
      score = questionIndex > 0 ? PRIZE_LADDER[PRIZE_LADDER.length - questionIndex].prize : '€0';
    } else { // Incorrect answer
       if (questionIndex >= 10) {
        score = PRIZE_LADDER.find(p => p.level === 10)?.prize || '€32,000';
      } else if (questionIndex >= 5) {
        score = PRIZE_LADDER.find(p => p.level === 5)?.prize || '€1,000';
      }
    }
   
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
                  currentQuestionIndex={currentQuestionIndex}
                  setCurrentQuestionIndex={setCurrentQuestionIndex}
                  lifelines={lifelines}
                  setLifelines={setLifelines}
               />;
      case GameState.End:
        return <EndScreen score={finalScore} onRestart={() => setGameState(GameState.Start)} isWinner={isWinner} playerName={playerName} />;
      case GameState.Start:
      default:
        return <StartScreen onStart={startGame} onResume={resumeGame} savedGame={savedGame} />;
    }
  };

  return (
    <div className="bg-[#FFCC00] min-h-screen text-gray-800 flex items-center justify-center p-4 font-sans">
      <button
        onClick={() => setIsMuted(prev => !prev)}
        className="fixed top-4 right-4 z-50 p-2 bg-[#D40511] rounded-full text-white hover:opacity-80 transition-opacity"
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
