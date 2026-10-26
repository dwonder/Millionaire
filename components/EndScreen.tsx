import React, { useEffect, useState, useRef } from 'react';
import { submitScore, getTitleForLevel, getPlayerCareerStats } from '../leaderboardClient';
import {
  TrophyIcon,
  ShareIcon,
  TwitterIcon,
  LinkedInIcon,
  WhatsAppIcon,
  DownloadIcon,
  ClipboardCopyIcon,
  ShieldCheckIcon,
} from './icons';
import Leaderboard from './Leaderboard';
import html2canvas from 'html2canvas';

declare var confetti: any;

interface EndScreenProps {
  score: string;
  isWinner: boolean;
  onRestart: () => void;
  playerName: string;
  questionLevel?: number;
}

export const EndScreen: React.FC<EndScreenProps> = ({
  score,
  isWinner,
  onRestart,
  playerName,
  questionLevel = 0,
}) => {
  const [timestamp, setTimestamp] = useState(new Date());
  const [standing, setStanding] = useState<{
    rank: number;
    isTop10: boolean;
    loading: boolean;
    attempts: number;
  }>({
    rank: -1,
    isTop10: false,
    loading: true,
    attempts: 1,
  });

  const [isGeneratingShare, setIsGeneratingShare] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareImageBlob, setShareImageBlob] = useState<Blob | null>(null);
  const [shareImageDataUrl, setShareImageDataUrl] = useState<string | null>(null);
  const [copyToast, setCopyToast] = useState<string | null>(null);

  const certificateRef = useRef<HTMLDivElement>(null);
  const effectiveTitle = getTitleForLevel(questionLevel, isWinner);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimestamp(new Date());
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  // Submit score to Azure database storage and update player attempts
  useEffect(() => {
    let isSubscribed = true;

    async function recordScore() {
      try {
        const result = await submitScore({
          playerName: playerName || 'Cyber Defender',
          score,
          questionLevel,
          isWinner,
          title: effectiveTitle,
        });

        if (isSubscribed) {
          const stats = getPlayerCareerStats(playerName || 'Cyber Defender');
          setStanding({
            rank: result.rank,
            isTop10: result.isTop10,
            loading: false,
            attempts: result.attempts || stats.attempts || 1,
          });

          if (result.isTop10 && !isWinner && typeof confetti === 'function') {
            confetti({
              particleCount: 75,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#FFCC00', '#D40511', '#FFFFFF'],
            });
          }
        }
      } catch (err) {
        console.error('Error saving score to leaderboard:', err);
        if (isSubscribed) {
          const stats = getPlayerCareerStats(playerName || 'Cyber Defender');
          setStanding({
            rank: -1,
            isTop10: false,
            loading: false,
            attempts: stats.attempts || 1,
          });
        }
      }
    }

    recordScore();

    return () => {
      isSubscribed = false;
    };
  }, [playerName, score, questionLevel, isWinner, effectiveTitle]);

  useEffect(() => {
    if (isWinner && typeof confetti === 'function') {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        colors: ['#D40511', '#FFFFFF', '#FFCC00', '#10b981'],
      };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isWinner]);

  // Generate screenshot of final prize result using html2canvas
  const generateCertificateScreenshot = async (): Promise<{ blob: Blob | null; dataUrl: string | null }> => {
    if (typeof html2canvas !== 'function' || !certificateRef.current) {
      console.warn('html2canvas is not available');
      return { blob: null, dataUrl: null };
    }

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#454F63',
        logging: false,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));

      setShareImageDataUrl(dataUrl);
      setShareImageBlob(blob);

      return { blob, dataUrl };
    } catch (err) {
      console.error('Error rendering certificate canvas:', err);
      return { blob: null, dataUrl: null };
    }
  };

  const handleOpenShareModal = async () => {
    setIsGeneratingShare(true);
    await generateCertificateScreenshot();
    setIsGeneratingShare(false);
    setShareModalOpen(true);
  };

  const handleDownloadImage = async () => {
    let dataUrl = shareImageDataUrl;
    if (!dataUrl) {
      const res = await generateCertificateScreenshot();
      dataUrl = res.dataUrl;
    }
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = `cyber-millionaire-prize-${(playerName || 'player').replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Certificate saved to downloads!');
    }
  };

  const handleNativeShare = async () => {
    const shareText = `I just secured ${score} as a ${effectiveTitle} on "Who Wants to Be a Cybersecurity Millionaire?" after ${standing.attempts} ${standing.attempts === 1 ? 'run' : 'runs'}! Can you beat my score? 🛡️⚡`;
    const shareUrl = window.location.origin;

    if (navigator.share) {
      try {
        if (shareImageBlob && navigator.canShare && navigator.canShare({ files: [new File([shareImageBlob], 'score.png', { type: 'image/png' })] })) {
          const file = new File([shareImageBlob], 'cyber-security-millionaire-score.png', { type: 'image/png' });
          await navigator.share({
            title: 'Cybersecurity Millionaire Result',
            text: shareText,
            url: shareUrl,
            files: [file],
          });
          return;
        }

        await navigator.share({
          title: 'Cybersecurity Millionaire Result',
          text: shareText,
          url: shareUrl,
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Native share failed:', err);
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    const shareText = `I just won ${score} on Who Wants to Be a Cybersecurity Millionaire! (Attempts: ${standing.attempts}) Play here: ${window.location.origin}`;
    navigator.clipboard.writeText(shareText);
    showToast('Score announcement copied to clipboard!');
  };

  const handleCopyImage = async () => {
    if (!shareImageBlob) {
      const { blob } = await generateCertificateScreenshot();
      if (!blob) return;
      try {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        showToast('Certificate image copied to clipboard!');
        return;
      } catch {
        showToast('Image clipboard copy not supported. Use Download instead!');
        return;
      }
    }

    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': shareImageBlob })]);
      showToast('Certificate image copied to clipboard!');
    } catch {
      showToast('Image clipboard copy not supported. Use Download instead!');
    }
  };

  const showToast = (msg: string) => {
    setCopyToast(msg);
    setTimeout(() => setCopyToast(null), 3000);
  };

  const shareText = `I just won ${score} and earned the title "${effectiveTitle}" on Who Wants to Be a Cybersecurity Millionaire after ${standing.attempts} ${standing.attempts === 1 ? 'attempt' : 'attempts'}! 🛡️⚡`;
  const currentAppUrl = window.location.origin;

  return (
    <div className="text-center flex flex-col items-center justify-center min-h-screen py-8 px-3 sm:px-4 animate-fadeIn max-w-5xl mx-auto space-y-6">
      {/* Toast Alert */}
      {copyToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#454F63] text-[#FFCC00] border-2 border-[#FFCC00] px-5 py-2.5 rounded-full shadow-2xl font-black text-xs sm:text-sm animate-bounce">
          ✓ {copyToast}
        </div>
      )}

      {/* Main Prize Result Card / Certificate Target for html2canvas */}
      <div
        ref={certificateRef}
        id="prize-certificate-card"
        className="w-full max-w-2xl bg-[#454F63] border-4 border-[#FFCC00] rounded-3xl p-6 sm:p-10 shadow-2xl text-white relative overflow-hidden"
      >
        {/* Certificate Decorative Accents */}
        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#D40511]/30 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-[#FFCC00]/20 blur-2xl pointer-events-none"></div>

        {/* Top Seal */}
        <div className="flex items-center justify-between border-b-2 border-slate-400/60 pb-4 mb-5">
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#D40511] flex items-center justify-center text-[#FFCC00] shadow-md border-2 border-[#FFCC00]">
              <ShieldCheckIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[11px] font-black tracking-widest text-[#FFCC00] uppercase">
                Official Security Credential
              </div>
              <div className="font-black text-sm sm:text-base text-white">
                Who Wants to Be a Cybersecurity Millionaire?
              </div>
            </div>
          </div>
          <span className="text-xs font-black font-mono px-2.5 py-1 rounded bg-[#525D73] text-[#FFCC00] border border-slate-400">
            RUN #{standing.attempts}
          </span>
        </div>

        {/* Outcome Heading */}
        {isWinner ? (
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-950 text-emerald-300 border-2 border-emerald-400 font-black text-xs uppercase tracking-wider mb-2 shadow">
              <span>👑</span> Level 15 Mastered • Grand Champion
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#FFCC00] tracking-tight mb-1 drop-shadow">
              {playerName || 'Cyber Defender'}
            </h1>
            <p className="text-sm sm:text-base text-slate-100 font-semibold mb-3">
              Mastered all 15 threats in <span className="text-[#FFCC00] font-black">{standing.attempts} {standing.attempts === 1 ? 'attempt' : 'attempts'}</span> as a <span className="text-white font-extrabold">{effectiveTitle}</span>!
            </p>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D40511] text-white border border-[#FFCC00]/40 font-black text-xs uppercase tracking-wider mb-2 shadow">
              <span>🛡️</span> Security Challenge Result
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-1">
              {playerName || 'Cyber Defender'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-100 font-medium mb-3">
              Advanced to Question {questionLevel > 0 ? questionLevel : 1} of 15 • Achieved Title: <span className="text-[#FFCC00] font-black">{effectiveTitle}</span>
            </p>
          </div>
        )}

        {/* Prize Box with lighter background and high contrast */}
        <div className="my-5 p-6 bg-[#525D73] rounded-2xl border-2 border-slate-400/80 shadow-inner text-center">
          <p className="text-xs font-black uppercase tracking-widest text-slate-200 mb-1">
            Final Prize Secured
          </p>
          <div className="text-5xl sm:text-7xl font-black text-[#D40511] tracking-tight drop-shadow-[0_4px_12px_rgba(212,5,17,0.5)]">
            {score}
          </div>
          <div className="mt-3 text-xs text-slate-200 font-bold flex flex-wrap items-center justify-center gap-2">
            <span>Verified: {timestamp.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span className="text-[#FFCC00] font-mono">Total Runs Played: {standing.attempts}</span>
          </div>
        </div>

        {/* Standing Achievement */}
        {standing.isTop10 ? (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/25 text-[#FFCC00] border-2 border-[#FFCC00] text-sm font-black shadow-lg mb-2">
            <TrophyIcon className="w-5 h-5 text-[#FFCC00]" />
            <span>🎉 Ranked #{standing.rank} on the Hall of Fame Leaderboard!</span>
          </div>
        ) : standing.rank > 0 ? (
          <div className="text-xs text-slate-100 bg-[#525D73] px-4 py-2 rounded-xl inline-block mb-2 border border-slate-400 font-bold">
            Tournament Standing: <strong className="text-[#FFCC00] font-black">Rank #{standing.rank}</strong> • Run #{standing.attempts}
          </div>
        ) : null}

        {/* Certificate Bottom Signoff */}
        <div className="pt-4 border-t-2 border-slate-400/60 flex items-center justify-between text-[11px] text-slate-200 font-semibold">
          <span>Enterprise Cyber Awareness</span>
          <span className="font-mono text-[#FFCC00]">ID: CSM-{(playerName || 'DEF').slice(0, 3).toUpperCase()}-{Math.abs(questionLevel * 1024 + 731)}</span>
          <span>Zero Trust Certified</span>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-2xl">
        {/* Social Media Sharing Button */}
        <button
          onClick={handleOpenShareModal}
          disabled={isGeneratingShare}
          className="flex-1 min-w-[220px] bg-[#D40511] hover:bg-[#b0040e] text-white font-black py-4 px-6 rounded-full text-base sm:text-lg shadow-xl shadow-red-950/60 hover:scale-105 active:scale-95 transform transition-all duration-200 flex items-center justify-center gap-2 border-2 border-[#FFCC00]"
        >
          <ShareIcon className="w-5 h-5 text-[#FFCC00]" />
          <span>{isGeneratingShare ? 'Generating Screenshot...' : 'Share Result & Badge'}</span>
        </button>

        {/* Direct Download Screenshot */}
        <button
          onClick={handleDownloadImage}
          className="bg-white hover:bg-gray-100 text-gray-950 font-black py-4 px-6 rounded-full text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transform transition-all duration-200 flex items-center justify-center gap-2 border-2 border-gray-400"
        >
          <DownloadIcon className="w-5 h-5 text-[#D40511]" />
          <span>Save Certificate</span>
        </button>

        {/* Play Again (Next Run) */}
        <button
          onClick={onRestart}
          className="bg-[#454F63] hover:bg-[#525D73] text-white font-black py-4 px-6 rounded-full text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transform transition-all duration-200 border-2 border-slate-400 flex items-center justify-center gap-2"
        >
          <span>Play Run #{standing.attempts + 1}</span>
          <span className="text-[#FFCC00]">→</span>
        </button>
      </div>

      {/* Social Media Sharing Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-[#454F63] text-white border-2 border-[#FFCC00] rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl relative text-left">
            <button
              onClick={() => setShareModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#525D73] hover:bg-[#5E6B83] text-white flex items-center justify-center text-lg font-bold transition-colors border border-slate-400"
              aria-label="Close share dialog"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D40511] flex items-center justify-center text-[#FFCC00] shadow-md border-2 border-[#FFCC00]/50">
                <ShareIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Share Your Achievement
                </h3>
                <p className="text-xs text-slate-200 font-semibold">
                  Won {score} after {standing.attempts} {standing.attempts === 1 ? 'run' : 'runs'}! Broadcast to friends & team!
                </p>
              </div>
            </div>

            {/* Screenshot Preview */}
            {shareImageDataUrl && (
              <div className="mb-4 rounded-2xl overflow-hidden border-2 border-slate-400 shadow-md max-h-48 bg-slate-700/80 flex items-center justify-center">
                <img
                  src={shareImageDataUrl}
                  alt="Cybersecurity Certificate Preview"
                  className="max-h-48 w-auto object-contain"
                />
              </div>
            )}

            {/* Social Sharing Channels */}
            <div className="space-y-2 mb-5">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-200 mb-1">
                Choose Sharing Platform
              </div>

              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={handleNativeShare}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-[#D40511] to-[#b0040e] hover:opacity-90 font-black text-sm text-white shadow-md transition-all active:scale-95 border border-[#FFCC00]/40"
                >
                  <span className="flex items-center gap-2.5">
                    <ShareIcon className="w-4 h-4 text-[#FFCC00]" />
                    <span>Send via Mobile Apps (WhatsApp, Messages, Stories)</span>
                  </span>
                  <span>→</span>
                </button>
              )}

              {/* 𝕏 / Twitter Share */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentAppUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#525D73] hover:bg-[#5E6B83] text-white font-bold text-xs sm:text-sm border border-slate-400 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <TwitterIcon className="w-4 h-4 text-[#FFCC00]" />
                  <span>Share on 𝕏 (Twitter)</span>
                </span>
                <span className="text-slate-200 font-bold text-xs">Post Tweet →</span>
              </a>

              {/* LinkedIn Share */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentAppUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#525D73] hover:bg-[#5E6B83] text-white font-bold text-xs sm:text-sm border border-slate-400 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <LinkedInIcon className="w-4 h-4 text-[#FFCC00]" />
                  <span>Share on LinkedIn</span>
                </span>
                <span className="text-slate-200 font-bold text-xs">Publish →</span>
              </a>

              {/* WhatsApp Share */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + '\n' + currentAppUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#525D73] hover:bg-[#5E6B83] text-white font-bold text-xs sm:text-sm border border-slate-400 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  <span>Send via WhatsApp</span>
                </span>
                <span className="text-slate-200 font-bold text-xs">Chat →</span>
              </a>
            </div>

            {/* Secondary Image Actions: Copy / Download */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t-2 border-slate-400/60">
              <button
                onClick={handleCopyImage}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-[#525D73] hover:bg-[#5E6B83] text-white text-xs font-bold transition-colors border border-slate-400"
              >
                <ClipboardCopyIcon className="w-4 h-4 text-[#FFCC00]" />
                <span>Copy Image</span>
              </button>

              <button
                onClick={handleDownloadImage}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-[#525D73] hover:bg-[#5E6B83] text-white text-xs font-bold transition-colors border border-slate-400"
              >
                <DownloadIcon className="w-4 h-4 text-[#FFCC00]" />
                <span>Download PNG</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top 10 Hall of Fame Leaderboard */}
      <div className="w-full max-w-4xl text-left">
        <Leaderboard
          highlightPlayerName={playerName}
          currentPlayerScore={score}
          currentPlayerRank={standing.rank}
          currentPlayerAttempts={standing.attempts}
        />
      </div>
    </div>
  );
};

export default EndScreen;
