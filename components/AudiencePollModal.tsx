import React, { useState, useEffect } from 'react';
import { Question } from '../types';

interface AudiencePollModalProps {
  question: Question;
  onClose: () => void;
}

const AudiencePollModal: React.FC<AudiencePollModalProps> = ({ question, onClose }) => {
  const [pollResults, setPollResults] = useState<number[]>([]);

  useEffect(() => {
    // Simulate poll results
    const results = [0, 0, 0, 0];
    let remaining = 100;
    
    // Give correct answer a high chance
    const correctIndex = question.options.indexOf(question.correctAnswer);
    const correctVote = Math.floor(Math.random() * 40) + 40; // 40% to 79%
    results[correctIndex] = correctVote;
    remaining -= correctVote;
    
    // Distribute remaining votes
    for (let i = 0; i < 4; i++) {
        if (i !== correctIndex) {
            const vote = Math.floor(Math.random() * remaining);
            results[i] = vote;
            remaining -= vote;
        }
    }
    // Add any leftover to a random wrong answer
    const wrongIndexes = [0,1,2,3].filter(i => i !== correctIndex);
    results[wrongIndexes[0]] += remaining;

    setPollResults(results);
  }, [question]);

  const optionsMap = ['A', 'B', 'C', 'D'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-2xl text-center border-2 border-[#D40511]">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Ask the Audience</h2>
        <div className="space-y-4 text-gray-800">
          {question.options.map((option, index) => (
            <div key={index} className="text-left">
              <div className="flex justify-between items-center mb-1 font-semibold text-lg">
                <span>{optionsMap[index]}: {option}</span>
                <span>{pollResults[index]}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div 
                  className="bg-[#D40511] h-6 rounded-full" 
                  style={{ width: `${pollResults[index]}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-8 bg-[#D40511] text-white font-bold py-2 px-8 rounded-full hover:opacity-90">
          Close
        </button>
      </div>
    </div>
  );
};

export default AudiencePollModal;
