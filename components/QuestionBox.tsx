import React from 'react';

interface QuestionBoxProps {
  questionNumber: number;
  questionText: string;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ questionNumber, questionText }) => {
  return (
    <div className="w-full bg-white border-4 border-[#D40511] rounded-lg p-6 text-center shadow-2xl relative">
       <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D40511] text-white font-bold px-4 py-1 rounded-full text-lg">
        Question {questionNumber}
      </div>
      <p className="text-2xl md:text-3xl font-medium leading-relaxed text-gray-800">
        {questionText}
      </p>
    </div>
  );
};

export default QuestionBox;
