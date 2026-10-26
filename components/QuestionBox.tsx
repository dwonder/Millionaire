import React from 'react';

interface QuestionBoxProps {
  questionNumber: number;
  questionText: string;
  stake: string;
  category?: string;
}

export const QuestionBox: React.FC<QuestionBoxProps> = ({
  questionNumber,
  questionText,
  stake,
  category,
}) => {
  return (
    <div className="w-full bg-[#454F63] border-2 border-slate-400/60 rounded-3xl p-5 sm:p-7 shadow-2xl relative text-left">
      {/* Header Info Bar inside Question Card */}
      <div className="flex items-center justify-between border-b-2 border-slate-400/60 pb-3 mb-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-[#D40511] text-white font-black text-xs uppercase tracking-wider shadow">
            QUESTION {questionNumber} OF 15
          </span>
          {category && (
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-[#525D73] text-slate-100 border border-slate-400/80 font-bold text-xs">
              {category}
            </span>
          )}
        </div>
        <div className="text-right flex items-center gap-1.5">
          <span className="text-slate-200 font-bold uppercase text-xs">STAKE:</span>
          <span className="text-[#FFCC00] font-black text-lg sm:text-xl tracking-tight font-mono">{stake}</span>
        </div>
      </div>

      {/* Main Question Text with maximum contrast */}
      <p className="text-xl sm:text-2xl md:text-3xl font-black leading-snug sm:leading-relaxed text-white tracking-tight">
        {questionText}
      </p>
    </div>
  );
};

export default QuestionBox;
