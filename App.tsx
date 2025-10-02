
import React, { useState, useCallback, useEffect } from 'react';
import { GameState } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import { PRIZE_LADDER } from './constants';
import { useSound, SoundType } from './useSound';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [playerName, setPlayerName] = useState<string>('');
  const [finalScore, setFinalScore] = useState<string>('₦0');
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const { playSound, stopSound, playMusic, stopMusic } = useSound();

  useEffect(() => {
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
  }, [gameState, playMusic, stopMusic]);

  const startGame = useCallback((name: string) => {
    setPlayerName(name.trim());
    setGameState(GameState.Playing);
    setFinalScore('₦0');
    setIsWinner(false);
  }, []);

  const endGame = useCallback((currentQuestionIndex: number, walkedAway: boolean = false) => {
    let score = '₦0';
    if (walkedAway) {
      score = currentQuestionIndex > 0 ? PRIZE_LADDER[PRIZE_LADDER.length - currentQuestionIndex].prize : '₦0';
    } else {
       if (currentQuestionIndex >= 10) {
        score = PRIZE_LADDER.find(p => p.level === 10)?.prize || '₦50,000';
      } else if (currentQuestionIndex >= 5) {
        score = PRIZE_LADDER.find(p => p.level === 5)?.prize || '₦5,000';
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
      <div className="w-full max-w-7xl mx-auto">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
