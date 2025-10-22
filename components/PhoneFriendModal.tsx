import React, { useState, useEffect } from 'react';
import { Question } from '../types';

interface PhoneFriendModalProps {
  question: Question;
  onClose: () => void;
}

const friends = ["Alex the Analyst", "Ben the Bug Hunter", "Chloe the Coder"];
const confidencePhrases = ["I'm pretty sure it's...", "I'm not 100%, but I'd go with...", "Hmm, that's tricky. My gut says...", "Definitely, it has to be..."];

const PhoneFriendModal: React.FC<PhoneFriendModalProps> = ({ question, onClose }) => {
  const [friend] = useState(friends[Math.floor(Math.random() * friends.length)]);
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const phrase = confidencePhrases[Math.floor(Math.random() * confidencePhrases.length)];
      // Friend has a ~85% chance of being right
      const isCorrect = Math.random() < 0.85;
      const suggestedAnswer = isCorrect
        ? question.correctAnswer
        : question.options.filter(opt => opt !== question.correctAnswer)[Math.floor(Math.random() * 3)];
      
      const suggestedLabel = question.options.indexOf(suggestedAnswer);
      const optionsMap = ['A', 'B', 'C', 'D'];

      setAdvice(`${phrase} ${optionsMap[suggestedLabel]}, ${suggestedAnswer}.`);
      setIsLoading(false);
    }, 3000); // Simulate thinking time

    return () => clearTimeout(timer);
  }, [question]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-2xl text-center border-2 border-[#D40511]">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Phone a Friend</h2>
        <p className="text-xl text-gray-600 mb-6">Calling {friend}...</p>
        <div className="h-24 flex items-center justify-center p-4 bg-gray-100 rounded-lg">
          {isLoading ? (
            <div className="flex items-center space-x-2 text-gray-800">
              <div className="w-4 h-4 rounded-full bg-[#D40511] animate-pulse"></div>
              <div className="w-4 h-4 rounded-full bg-[#D40511] animate-pulse delay-200"></div>
              <div className="w-4 h-4 rounded-full bg-[#D40511] animate-pulse delay-400"></div>
              <span className="ml-2 text-lg">Thinking...</span>
            </div>
          ) : (
            <p className="text-2xl text-[#D40511] font-semibold">{advice}</p>
          )}
        </div>
        <button onClick={onClose} className="mt-8 bg-[#D40511] text-white font-bold py-2 px-8 rounded-full hover:opacity-90 disabled:opacity-50" disabled={isLoading}>
          Thanks, {friend.split(' ')[0]}!
        </button>
      </div>
    </div>
  );
};

export default PhoneFriendModal;
