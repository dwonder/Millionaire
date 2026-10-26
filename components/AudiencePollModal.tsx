import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { AudienceIcon } from './icons';

interface AudiencePollModalProps {
  question: Question;
  onClose: () => void;
}

const AudiencePollModal: React.FC<AudiencePollModalProps> = ({ question, onClose }) => {
  const [pollResults, setPollResults] = useState<number[]>([]);

  useEffect(() => {
    const results = [0, 0, 0, 0];
    let remaining = 100;

    const correctIndex = question.options.indexOf(question.correctAnswer);
    const correctVote = Math.floor(Math.random() * 35) + 50; // 50% to 85%
    results[correctIndex] = correctVote;
    remaining -= correctVote;

    for (let i = 0; i < 4; i++) {
      if (i !== correctIndex) {
        const vote = Math.floor(Math.random() * remaining);
        results[i] = vote;
        remaining -= vote;
      }
    }
    const wrongIndexes = [0, 1, 2, 3].filter((i) => i !== correctIndex);
    results[wrongIndexes[0]] += remaining;

    setPollResults(results);
  }, [question]);

  const optionsMap = ['A', 'B', 'C', 'D'];

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-[#454F63] w-full max-w-lg p-6 sm:p-8 rounded-3xl shadow-2xl text-center border-2 border-[#FFCC00]">
        <div className="w-14 h-14 rounded-2xl bg-[#D40511] flex items-center justify-center mx-auto mb-3 shadow-lg">
          <AudienceIcon className="w-8 h-8 text-[#FFCC00]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">
          Ask the Security Audience
        </h2>
        <p className="text-xs text-slate-200 mb-6">
          Real-time consensus from 500 verified cybersecurity professionals
        </p>

        <div className="space-y-3.5 text-white">
          {question.options.map((option, index) => (
            <div key={index} className="text-left bg-[#525D73] p-3 rounded-xl border border-slate-400">
              <div className="flex justify-between items-center mb-1.5 text-xs sm:text-sm font-bold">
                <span className="truncate pr-2">
                  <span className="text-[#FFCC00] font-mono mr-1.5">[{optionsMap[index]}]</span> {option}
                </span>
                <span className="font-mono text-[#FFCC00] font-black">{pollResults[index]}%</span>
              </div>
              <div className="w-full bg-[#394253] rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-400/80">
                <div
                  className="bg-gradient-to-r from-[#D40511] to-[#FFCC00] h-full rounded-full transition-all duration-700"
                  style={{ width: `${pollResults[index]}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#D40511] text-white font-bold py-3.5 px-8 rounded-full hover:bg-[#b0040e] transition-colors shadow-lg"
        >
          Return to Question
        </button>
      </div>
    </div>
  );
};

export default AudiencePollModal;
