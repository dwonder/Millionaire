
import React, { useState, useEffect, useCallback } from 'react';
import { QUESTIONS } from '../constants';
import { Question, Lifelines, LifelineType, AnswerState } from '../types';
import PrizeLadder from './PrizeLadder';
import LifelinesDisplay from './Lifelines';
import QuestionBox from './QuestionBox';
import AnswerOption from './AnswerOption';
import AudiencePollModal from './AudiencePollModal';
import PhoneFriendModal from './PhoneFriendModal';
import { SoundType } from '../useSound';

interface GameScreenProps {
  onEndGame: (currentQuestionIndex: number, walkedAway?: boolean) => void;
  playSound: (type: SoundType, loop?: boolean) => HTMLAudioElement;
  stopSound: (type: SoundType) => void;
  playMusic: (type: SoundType) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onEndGame, playSound, stopSound, playMusic }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [question, setQuestion] = useState<Question>(QUESTIONS[0]);
  const [lifelines, setLifelines] = useState<Lifelines>({ fiftyFifty: true, askAudience: true, phoneFriend: true });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>(AnswerState.Default);
  const [disabledAnswers, setDisabledAnswers] = useState<string[]>([]);
  const [showAudiencePoll, setShowAudiencePoll] = useState(false);
  const [showPhoneFriend, setShowPhoneFriend] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    setQuestion(QUESTIONS[currentQuestionIndex]);
    setSelectedAnswer(null);
    setAnswerState(AnswerState.Default);
    setDisabledAnswers([]);
    setIsConfirming(false);
    
    if (currentQuestionIndex >= 9) {
      playMusic(SoundType.Suspense);
    } else {
      playMusic(SoundType.Play);
    }

  }, [currentQuestionIndex, playMusic]);

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
    
    playSound(SoundType.Lifeline);
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
        <div className="flex-grow flex flex-col justify-center items-center my-8">
            <QuestionBox questionText={question.question} questionNumber={currentQuestionIndex + 1} />
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

      <div className="w-full lg:w-1/4">
        <PrizeLadder currentLevel={currentQuestionIndex + 1} />
         <button
            onClick={handleWalkAway}
            className="w-full mt-4 bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200"
          >
            Walk Away
        </button>
      </div>
    </div>
  );
};

export default GameScreen;
