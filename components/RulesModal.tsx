import React from 'react';
import { ShieldCheckIcon, VaultIcon } from './icons';

interface RulesModalProps {
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-[#454F63] text-white border-2 border-[#FFCC00]/50 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#525D73] hover:bg-[#5E6B83] text-gray-200 hover:text-white flex items-center justify-center text-lg font-bold transition-colors border border-slate-400"
          aria-label="Close rules"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#D40511] flex items-center justify-center text-[#FFCC00] shadow-lg">
            <ShieldCheckIcon className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-black tracking-tight text-[#FFCC00]">
              Game Rules & Strategy
            </h3>
            <p className="text-xs text-slate-200">Who Wants to Be a Cybersecurity Millionaire?</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-100 max-h-[60vh] overflow-y-auto pr-2">
          {/* Ladder Progression */}
          <div className="bg-[#525D73] p-4 rounded-2xl border border-slate-400">
            <h4 className="font-bold text-[#FFCC00] mb-1 flex items-center gap-2">
              <span>🎯</span> 15-Question Security Ladder
            </h4>
            <p className="text-xs text-slate-100 leading-relaxed">
              Navigate 15 real-world cyber threat scenarios ranging from phishing and password hygiene to public Wi-Fi, AI risks, and active incident response.
            </p>
          </div>

          {/* Safe Haven Milestones */}
          <div className="bg-[#525D73] p-4 rounded-2xl border border-[#D40511]/60">
            <h4 className="font-bold text-[#FFCC00] mb-2 flex items-center gap-2">
              <VaultIcon className="w-4 h-4 text-[#FFCC00]" />
              Guaranteed Safe Vault Milestones
            </h4>
            <ul className="text-xs text-slate-100 space-y-1.5 list-disc list-inside">
              <li><strong className="text-white">Q5 (€1,000 - Safety Scout)</strong>: Once cleared, you never leave with less than €1,000.</li>
              <li><strong className="text-white">Q10 (€32,000 - Cyber Safety Hero)</strong>: Reaching here guarantees at least €32,000 in your vault.</li>
              <li><strong className="text-white">Q15 (€1,000,000 - Cyber Savvy Champion)</strong>: Achieve perfection to claim the grand prize!</li>
            </ul>
          </div>

          {/* Lifelines */}
          <div className="bg-[#525D73] p-4 rounded-2xl border border-slate-400">
            <h4 className="font-bold text-[#FFCC00] mb-2 flex items-center gap-2">
              <span>⚡</span> 4 Tactical Safety Lifelines
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#394253] p-2.5 rounded-xl border border-slate-400/70">
                <span className="font-bold text-white block mb-0.5">50:50</span>
                <span className="text-slate-200">Eliminates two incorrect decoys</span>
              </div>
              <div className="bg-[#394253] p-2.5 rounded-xl border border-slate-400/70">
                <span className="font-bold text-white block mb-0.5">Ask Audience</span>
                <span className="text-slate-200">Polls 500 security experts</span>
              </div>
              <div className="bg-[#394253] p-2.5 rounded-xl border border-slate-400/70">
                <span className="font-bold text-white block mb-0.5">Smart Friend</span>
                <span className="text-slate-200">Calls SOC Analyst Alex</span>
              </div>
              <div className="bg-[#394253] p-2.5 rounded-xl border border-slate-400/70">
                <span className="font-bold text-white block mb-0.5">Safety Clue</span>
                <span className="text-slate-200">Unlocks a rule-of-thumb hint</span>
              </div>
            </div>
          </div>

          {/* Walk Away */}
          <div className="bg-[#525D73] p-4 rounded-2xl border border-slate-400">
            <h4 className="font-bold text-white mb-1 flex items-center gap-2">
              <span>💼</span> Walk Away & Bank
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              Uncertain of the answer? You can walk away at any time before locking in your answer and bank 100% of your accumulated prize!
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#D40511] text-white font-black py-3 rounded-full text-base hover:bg-[#b0040e] transition-colors shadow-lg"
        >
          Got It, Let's Play!
        </button>
      </div>
    </div>
  );
};

export default RulesModal;
