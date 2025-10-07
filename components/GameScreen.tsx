import React, { useState, useEffect, useCallback } from 'react';
import { QUESTIONS } from '../constants';
import { Question, Lifelines, LifelineType, AnswerState } from '../types';
import PrizeLadder from './PrizeLadder';
import LifelinesDisplay from './Lifelines';
import QuestionBox from './QuestionBox';
import AnswerOption from './AnswerOption';
import AudiencePollModal from './AudiencePollModal';
import PhoneFriendModal from './PhoneFriendModal';
import Timer from './Timer';
import { SoundType } from '../useSound';

interface GameScreenProps {
  playerName: string;
  onEndGame: (currentQuestionIndex: number, walkedAway?: boolean) => void;
  playSound: (type: SoundType, loop?: boolean) => HTMLAudioElement | null;
  stopSound: (type: SoundType) => void;
  playMusic: (type: SoundType) => void;
}

const TOTAL_TIME = 30;

const GameScreen: React.FC<GameScreenProps> = ({ playerName, onEndGame, playSound, stopSound, playMusic }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [question, setQuestion] = useState<Question>(QUESTIONS[0]);
  const [lifelines, setLifelines] = useState<Lifelines>({ fiftyFifty: true, askAudience: true, phoneFriend: true });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>(AnswerState.Default);
  const [disabledAnswers, setDisabledAnswers] = useState<string[]>([]);
  const [showAudiencePoll, setShowAudiencePoll] = useState(false);
  const [showPhoneFriend, setShowPhoneFriend] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  useEffect(() => {
    setQuestion(QUESTIONS[currentQuestionIndex]);
    setSelectedAnswer(null);
    setAnswerState(AnswerState.Default);
    setDisabledAnswers([]);
    setIsConfirming(false);
    setTimeLeft(TOTAL_TIME);
    
    if (currentQuestionIndex >= 9) {
      playMusic(SoundType.Suspense);
    } else {
      playMusic(SoundType.Play);
    }

  }, [currentQuestionIndex, playMusic]);

  useEffect(() => {
    if (isConfirming || answerState === AnswerState.Correct || answerState === AnswerState.Incorrect) {
      stopSound(SoundType.Tick);
      return;
    }

    const tickAudio = playSound(SoundType.Tick, true);
    if(tickAudio) tickAudio.playbackRate = 1.0;

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          stopSound(SoundType.Tick);
          playSound(SoundType.Wrong); // Time's up
          onEndGame(currentQuestionIndex);
          return 0;
        }
        if (prevTime <= 11) {
          if (tickAudio) tickAudio.playbackRate = 1.5;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
      stopSound(SoundType.Tick);
    };
  }, [answerState, isConfirming, currentQuestionIndex, onEndGame, playSound, stopSound]);


  const handleAnswerSelect = (answer: string) => {
    if (answerState === AnswerState.Default) {
      setSelectedAnswer(answer);
      setAnswerState(AnswerState.Selected);
      playSound(SoundType.FinalAnswer, true);
      setTimeout(() => setIsConfirming(true), 500);
    }
  };

  const lockInAnswer = () => {
    if (!selectedAnswer) return;

    stopSound(SoundType.FinalAnswer);
    setIsConfirming(false);
    const isCorrect = selectedAnswer === question.correctAnswer;
    setAnswerState(isCorrect ? AnswerState.Correct : AnswerState.Incorrect);

    playSound(isCorrect ? SoundType.Correct : SoundType.Wrong);

    setTimeout(() => {
      if (isCorrect) {
        if (currentQuestionIndex < QUESTIONS.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          onEndGame(15);
        }
      } else {
        onEndGame(currentQuestionIndex);
      }
    }, 3000);
  };

  const useLifeline = useCallback((type: LifelineType) => {
    if (!lifelines[type]) return;
    
    switch(type) {
      case LifelineType.FiftyFifty:
        playSound(SoundType.FiftyFifty);
        break;
      case LifelineType.AskAudience:
        playSound(SoundType.AskAudience);
        break;
      case LifelineType.PhoneFriend:
        playSound(SoundType.PhoneFriend);
        break;
    }
    
    setLifelines(prev => ({ ...prev, [type]: false }));

    if (type === LifelineType.FiftyFifty) {
      const wrongAnswers = question.options.filter(opt => opt !== question.correctAnswer);
      const randomWrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
      const answersToDisable = wrongAnswers.filter(opt => opt !== randomWrongAnswer);
      setDisabledAnswers(answersToDisable);
    } else if (type === LifelineType.AskAudience) {
      setShowAudiencePoll(true);
    } else if (type === LifelineType.PhoneFriend) {
      setShowPhoneFriend(true);
    }
  }, [lifelines, question, playSound]);

  const handleWalkAway = () => {
    onEndGame(currentQuestionIndex, true);
  };
  
  const handleConfirmationNo = () => {
    stopSound(SoundType.FinalAnswer);
    setIsConfirming(false); 
    setSelectedAnswer(null); 
    setAnswerState(AnswerState.Default);
  }

  const getAnswerState = (option: string): AnswerState => {
    if (answerState !== AnswerState.Default && answerState !== AnswerState.Selected) {
      if (option === question.correctAnswer) return AnswerState.Correct;
      if (option === selectedAnswer) return AnswerState.Incorrect;
    }
    if (disabledAnswers.includes(option)) return AnswerState.Disabled;
    if (option === selectedAnswer) return AnswerState.Selected;
    return AnswerState.Default;
  };
  
  const optionsMap = ['A', 'B', 'C', 'D'];

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-screen items-center">
      {showAudiencePoll && <AudiencePollModal question={question} onClose={() => setShowAudiencePoll(false)} />}
      {showPhoneFriend && <PhoneFriendModal question={question} onClose={() => setShowPhoneFriend(false)} />}

      <div className="w-full lg:w-3/4 flex flex-col justify-between h-full p-4">
        <div>
          <LifelinesDisplay lifelines={lifelines} onUseLifeline={useLifeline} />
        </div>
        <div className="flex-grow flex flex-col justify-center items-center my-2">
            <Timer timeLeft={timeLeft} totalTime={TOTAL_TIME} />
            <div className="w-full mt-4">
              <QuestionBox questionText={question.question} questionNumber={currentQuestionIndex + 1} />
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <AnswerOption
              key={option}
              optionText={option}
              optionLabel={optionsMap[index]}
              state={getAnswerState(option)}
              onClick={() => handleAnswerSelect(option)}
            />
          ))}
        </div>
         {isConfirming && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-gray-800 p-8 rounded-lg shadow-2xl text-center">
                <h2 className="text-3xl font-bold mb-4">Is that your final answer?</h2>
                <p className="text-yellow-400 text-2xl mb-6">{selectedAnswer}</p>
                <div className="flex justify-center gap-4">
                  <button onClick={handleConfirmationNo} className="bg-gray-600 text-white font-bold py-2 px-8 rounded-full hover:bg-gray-500">No</button>
                  <button onClick={lockInAnswer} className="bg-green-600 text-white font-bold py-2 px-8 rounded-full hover:bg-green-500">Yes, Lock It In!</button>
                </div>
              </div>
            </div>
          )}
      </div>

      <div className="w-full lg:w-1/4 lg:h-[90vh] flex flex-col">
        <div className="bg-black/20 p-2 rounded-t-lg text-center flex-shrink-0">
            <p className="text-xl font-bold text-yellow-300 truncate">{playerName}</p>
        </div>
        <div className="flex-grow min-h-0">
          <PrizeLadder currentLevel={currentQuestionIndex + 1} />
        </div>
         <button
            onClick={handleWalkAway}
            className="w-full mt-4 bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200 flex-shrink-0"
          >
            Walk Away
        </button>
      </div>
    </div>
  );
};

export default GameScreen;