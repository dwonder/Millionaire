import React from 'react';
import { LightbulbIcon } from './icons';

interface ClueModalProps {
  clue: string;
  category?: string;
  onClose: () => void;
}

export const ClueModal: React.FC<ClueModalProps> = ({ clue, category, onClose }) => {
  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-[#454F63] text-white border-2 border-[#FFCC00] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#525D73] hover:bg-[#5E6B83] text-gray-200 hover:text-white flex items-center justify-center text-lg font-bold transition-colors border border-slate-400"
          aria-label="Close clue"
        >
          ✕
        </button>

        <div className="w-16 h-16 rounded-3xl bg-[#D40511] flex items-center justify-center mx-auto mb-4 shadow-xl border-2 border-[#FFCC00]">
          <div className="w-10 h-10 text-[#FFCC00]">
            <LightbulbIcon className="w-full h-full" />
          </div>
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-[#FFCC00]/20 text-[#FFCC00] text-xs font-black uppercase tracking-wider mb-2 border border-[#FFCC00]/40">
          {category || 'TACTICAL CYBER TIP'}
        </div>

        <h3 className="text-2xl font-black text-white mb-4">
          Safety Clue Activated
        </h3>

        <div className="bg-[#525D73] p-5 rounded-2xl border border-slate-400 mb-6 text-left shadow-inner">
          <p className="text-sm sm:text-base text-white leading-relaxed font-medium">
            "{clue || 'Always pause and verify unexpected requests through an independent, pre-established channel.'}"
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#D40511] hover:bg-[#b0040e] text-white font-bold py-3.5 px-8 rounded-full text-base shadow-lg transform transition-all active:scale-95"
        >
          Return to Question
        </button>
      </div>
    </div>
  );
};

export default ClueModal;
