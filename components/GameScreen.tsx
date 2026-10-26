import React, { useState, useEffect, useCallback } from 'react';
import { QUESTIONS, PRIZE_LADDER } from '../constants';
import { Question, Lifelines, LifelineType, AnswerState } from '../types';
import PrizeLadder from './PrizeLadder';
import LifelinesDisplay from './Lifelines';
import QuestionBox from './QuestionBox';
import AnswerOption from './AnswerOption';
import AudiencePollModal from './AudiencePollModal';
import PhoneFriendModal from './PhoneFriendModal';
import ClueModal from './ClueModal';
import RulesModal from './RulesModal';
import Timer from './Timer';
import { SoundType } from '../useSound';
import { VaultIcon, RulesIcon } from './icons';
import { getPlayerCareerStats } from '../leaderboardClient';

interface GameScreenProps {
  playerName: string;
  onEndGame: (currentQuestionIndex: number, walkedAway?: boolean) => void;
  playSound: (type: SoundType, loop?: boolean) => HTMLAudioElement | null;
  stopSound: (type: SoundType) => void;
  playMusic: (type: SoundType) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  lifelines: Lifelines;
  setLifelines: React.Dispatch<React.SetStateAction<Lifelines>>;
}

const TOTAL_TIME = 60;

export const GameScreen: React.FC<GameScreenProps> = ({
  playerName,
  onEndGame,
  playSound,
  stopSound,
  playMusic,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  lifelines,
  setLifelines,
}) => {
  const [question, setQuestion] = useState<Question>(QUESTIONS[currentQuestionIndex]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>(AnswerState.Default);
  const [disabledAnswers, setDisabledAnswers] = useState<string[]>([]);
  const [showAudiencePoll, setShowAudiencePoll] = useState(false);
  const [showPhoneFriend, setShowPhoneFriend] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  const careerStats = getPlayerCareerStats(playerName);
  const currentLevel = currentQuestionIndex + 1;
  const currentStake =
    PRIZE_LADDER[PRIZE_LADDER.length - currentLevel]?.prize || '€100';

  const getGuaranteedBank = () => {
    if (currentLevel > 10) return '€32,000';
    if (currentLevel > 5) return '€1,000';
    return '€0';
  };

  const getWalkAwayAmount = () => {
    if (currentQuestionIndex === 0) return '€0';
    return PRIZE_LADDER[PRIZE_LADDER.length - currentQuestionIndex]?.prize || '€0';
  };

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
    if (tickAudio) tickAudio.playbackRate = 1.0;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          stopSound(SoundType.Tick);
          playSound(SoundType.Wrong);
          onEndGame(currentQuestionIndex);
          return 0;
        }
        if (prevTime <= 21 && tickAudio) {
          tickAudio.playbackRate = 1.5;
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
      setTimeout(() => setIsConfirming(true), 400);
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
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          onEndGame(15);
        }
      } else {
        onEndGame(currentQuestionIndex);
      }
    }, 2800);
  };

  const useLifeline = useCallback(
    (type: LifelineType) => {
      if (!lifelines[type]) return;

      switch (type) {
        case LifelineType.FiftyFifty:
          playSound(SoundType.FiftyFifty);
          break;
        case LifelineType.AskAudience:
          playSound(SoundType.AskAudience);
          break;
        case LifelineType.PhoneFriend:
          playSound(SoundType.PhoneFriend);
          break;
        case LifelineType.SafetyClue:
          playSound(SoundType.FiftyFifty);
          break;
      }

      setLifelines((prev) => ({ ...prev, [type]: false }));

      if (type === LifelineType.FiftyFifty) {
        const wrongAnswers = question.options.filter((opt) => opt !== question.correctAnswer);
        const randomWrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
        const answersToDisable = wrongAnswers.filter((opt) => opt !== randomWrongAnswer);
        setDisabledAnswers(answersToDisable);
      } else if (type === LifelineType.AskAudience) {
        setShowAudiencePoll(true);
      } else if (type === LifelineType.PhoneFriend) {
        setShowPhoneFriend(true);
      } else if (type === LifelineType.SafetyClue) {
        setShowClue(true);
      }
    },
    [lifelines, question, playSound, setLifelines]
  );

  const handleWalkAway = () => {
    onEndGame(currentQuestionIndex, true);
  };

  const handleConfirmationNo = () => {
    stopSound(SoundType.FinalAnswer);
    setIsConfirming(false);
    setSelectedAnswer(null);
    setAnswerState(AnswerState.Default);
  };

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
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 py-2 px-2 sm:px-4 text-white font-sans">
      {/* Modals */}
      {showAudiencePoll && (
        <AudiencePollModal question={question} onClose={() => setShowAudiencePoll(false)} />
      )}
      {showPhoneFriend && (
        <PhoneFriendModal question={question} onClose={() => setShowPhoneFriend(false)} />
      )}
      {showClue && (
        <ClueModal
          clue={question.clue || question.explanation}
          category={question.category}
          onClose={() => setShowClue(false)}
        />
      )}
      {showRules && <RulesModal onClose={() => setShowRules(false)} />}

      {/* Top Cockpit Header Bar with lighter slate grey background */}
      <header className="bg-[#454F63] border-2 border-slate-400/60 rounded-2xl p-3 sm:p-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#D40511] flex items-center justify-center font-black text-[#FFCC00] shadow-md border-2 border-[#FFCC00]">
            🛡️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm sm:text-base tracking-tight text-white">
                Cyber Millionaire
              </span>
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-[#D40511] text-white border border-[#FFCC00]/40">
                Safety Edition
              </span>
            </div>
            <p className="text-xs text-slate-200 font-semibold">Chief Security Officer Challenge</p>
          </div>
        </div>

        {/* Center Vault & Stake Badges */}
        <div className="flex items-center gap-2 sm:gap-4 mx-auto sm:mx-0">
          <div className="bg-[#525D73] px-3.5 py-1.5 rounded-xl border border-slate-400/70 text-center shadow-sm">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-200">
              Guaranteed Safe Vault
            </div>
            <div className="font-mono font-black text-base sm:text-lg text-[#FFCC00]">
              {getGuaranteedBank()}
            </div>
          </div>

          <div className="bg-[#525D73] px-3.5 py-1.5 rounded-xl border border-slate-400/70 text-center shadow-sm">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-200">
              Current Question Stake
            </div>
            <div className="font-mono font-black text-base sm:text-lg text-white">
              {currentStake}
            </div>
          </div>
        </div>

        {/* Right Action Chips */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRules(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#525D73] hover:bg-[#5E6B83] text-white text-xs font-bold border border-slate-400/70 transition-colors shadow-sm"
          >
            <RulesIcon className="w-4 h-4 text-[#FFCC00]" />
            <span>Rules</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#525D73] border border-slate-400/70 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-[#D40511] text-white flex items-center justify-center text-xs font-black">
              {playerName ? playerName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="text-left">
              <span className="font-black text-xs text-white block max-w-[100px] truncate leading-tight">
                {playerName || 'Agent'}
              </span>
              <span className="text-[10px] text-[#FFCC00] font-bold block leading-tight font-mono">
                Run #{careerStats.attempts + 1}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid: Left Game Arena (3/4) & Right Safety Ladder (1/4) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-stretch">
        {/* Left Arena */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Host Cyber Advice Banner with lighter slate grey background */}
          <div className="bg-[#454F63] border-2 border-slate-400/60 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-11 h-11 rounded-xl bg-[#525D73] border-2 border-slate-400/70 flex items-center justify-center shrink-0 text-xl shadow">
                👨‍💼
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    CSO's Host Advice
                  </span>
                  {question.category && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#D40511] text-white border border-[#FFCC00]/40">
                      {question.category}
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  "{question.hostAdvice || 'Read all four choices thoroughly before locking in your answer.'}"
                </p>
              </div>
            </div>

            {/* Embedded Digital Countdown Timer */}
            <div className="shrink-0 self-end sm:self-center">
              <Timer timeLeft={timeLeft} totalTime={TOTAL_TIME} compact={true} />
            </div>
          </div>

          {/* Lifelines Bar */}
          <LifelinesDisplay lifelines={lifelines} onUseLifeline={useLifeline} />

          {/* Question Box */}
          <QuestionBox
            questionNumber={currentQuestionIndex + 1}
            questionText={question.question}
            stake={currentStake}
            category={question.category}
          />

          {/* 4 Answer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
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

          {/* Action Bar (Walk Away & Status) */}
          <div className="bg-[#454F63] border-2 border-slate-400/60 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
            <button
              onClick={handleWalkAway}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#525D73] hover:bg-[#5E6B83] text-white font-extrabold text-sm border-2 border-slate-400/70 transition-colors shadow"
            >
              <VaultIcon className="w-4 h-4 text-[#FFCC00]" />
              <span>Walk Away & Bank ({getWalkAwayAmount()})</span>
            </button>

            <div className="w-full sm:w-auto text-xs sm:text-sm font-bold text-center sm:text-right">
              {selectedAnswer ? (
                <span className="text-[#FFCC00]">Selection Locked: Confirm to submit</span>
              ) : (
                <span className="text-slate-200">Select an answer choice above to proceed</span>
              )}
            </div>
          </div>

          {/* Microlearning Takeaway Banner */}
          <div className="bg-[#454F63] border-2 border-slate-400/60 rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-sm text-slate-100">
            <span className="text-lg text-[#FFCC00] shrink-0">💡</span>
            <p className="leading-relaxed">
              <strong className="text-white font-bold">Security Golden Rule:</strong> In everyday digital life, <strong className="text-[#FFCC00] font-black">pausing and verifying</strong> is your greatest superpower. Attackers rely on manufactured urgency to make you click without thinking!
            </p>
          </div>
        </div>

        {/* Right Sidebar: Safety Ladder */}
        <div className="lg:col-span-1 h-full min-h-[500px]">
          <PrizeLadder currentLevel={currentLevel} />
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirming && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-[#454F63] border-2 border-[#FFCC00] text-white p-6 sm:p-8 rounded-3xl shadow-2xl text-center max-w-md w-full">
            <div className="w-14 h-14 rounded-2xl bg-[#D40511] flex items-center justify-center mx-auto mb-3 text-2xl shadow-lg border-2 border-[#FFCC00]">
              🎯
            </div>
            <h2 className="text-2xl font-black mb-2 text-white">Is that your final answer?</h2>
            <div className="bg-[#525D73] p-4 rounded-xl border border-slate-400/70 my-4 text-sm font-bold text-[#FFCC00]">
              "{selectedAnswer}"
            </div>
            <p className="text-xs text-slate-200 mb-6 font-semibold">
              A correct choice advances you toward the €1,000,000 grand prize.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleConfirmationNo}
                className="flex-1 bg-[#525D73] hover:bg-[#5E6B83] text-white font-bold py-3 px-5 rounded-full text-sm transition-colors border border-slate-400"
              >
                Change Mind
              </button>
              <button
                onClick={lockInAnswer}
                className="flex-1 bg-[#D40511] hover:bg-[#b0040e] text-white font-black py-3 px-5 rounded-full text-sm transition-all shadow-lg border border-[#FFCC00]/50"
              >
                Yes, Lock It In!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;