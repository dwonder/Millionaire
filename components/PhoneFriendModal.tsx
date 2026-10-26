import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { PhoneIcon } from './icons';

interface PhoneFriendModalProps {
  question: Question;
  onClose: () => void;
}

const friends = [
  { name: 'Alex Rivera', role: 'Senior SOC Analyst' },
  { name: 'Sarah Connor', role: 'Security Architect' },
  { name: 'David Chen', role: 'Threat Hunter' },
];

const confidencePhrases = [
  "I've seen this attack pattern in our logs! I'm confident it's",
  "Based on zero-trust best practices, you should pick",
  "That's definitely a common scam trap. The safe answer is",
  "I'm 95% certain the correct security action is",
];

const PhoneFriendModal: React.FC<PhoneFriendModalProps> = ({ question, onClose }) => {
  const [friend] = useState(friends[Math.floor(Math.random() * friends.length)]);
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const phrase = confidencePhrases[Math.floor(Math.random() * confidencePhrases.length)];
      const isCorrect = Math.random() < 0.9;
      const suggestedAnswer = isCorrect
        ? question.correctAnswer
        : question.options.filter((opt) => opt !== question.correctAnswer)[
            Math.floor(Math.random() * 3)
          ];

      const suggestedLabel = question.options.indexOf(suggestedAnswer);
      const optionsMap = ['A', 'B', 'C', 'D'];

      setAdvice(`${phrase} Option [${optionsMap[suggestedLabel]}]: "${suggestedAnswer}"`);
      setIsLoading(false);
    }, 2400);

    return () => clearTimeout(timer);
  }, [question]);

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-[#454F63] w-full max-w-lg p-6 sm:p-8 rounded-3xl shadow-2xl text-center border-2 border-[#FFCC00]">
        <div className="w-14 h-14 rounded-2xl bg-[#D40511] flex items-center justify-center mx-auto mb-3 shadow-lg">
          <PhoneIcon className="w-8 h-8 text-[#FFCC00]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">
          Calling {friend.name}
        </h2>
        <p className="text-xs text-[#FFCC00] font-semibold mb-6">
          Role: {friend.role} • Secure Hotline
        </p>

        <div className="min-h-24 flex items-center justify-center p-5 bg-[#525D73] rounded-2xl border border-slate-400 text-left">
          {isLoading ? (
            <div className="flex items-center space-x-2 text-slate-200">
              <div className="w-3.5 h-3.5 rounded-full bg-[#D40511] animate-ping"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#FFCC00] animate-bounce delay-150"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-white animate-pulse delay-300"></div>
              <span className="ml-3 text-sm font-semibold">{friend.name} is reviewing the scenario...</span>
            </div>
          ) : (
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              "{advice}"
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#D40511] text-white font-bold py-3.5 px-8 rounded-full hover:bg-[#b0040e] transition-colors shadow-lg disabled:opacity-50"
          disabled={isLoading}
        >
          Thanks, {friend.name.split(' ')[0]}!
        </button>
      </div>
    </div>
  );
};

export default PhoneFriendModal;
