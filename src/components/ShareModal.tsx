import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Share2,
  Copy,
  Check,
  Send,
  MessageCircle,
  Twitter,
  Linkedin
} from 'lucide-react';

export const ShareModal: React.FC = () => {
  const {
    isShareModalOpen,
    setShareModalOpen,
    shareData,
    showToast
  } = useApp();

  const [copied, setCopied] = useState(false);

  if (!isShareModalOpen) return null;

  const url = shareData?.url || window.location.href;
  const title = shareData?.title || 'Voyager Bespoke Travel Expedition';
  const text = `${title} — Check this out on Voyager: ${url}`;

  const copyLink = () => {
    navigator.clipboard?.writeText(url);
    setCopied(true);
    showToast('Link copied to clipboard!', 'content_copy');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareViaEmail = () => {
    window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full shadow-2xl border border-surface-container-high/40 overflow-hidden my-auto flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-surface-container-high/40 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-on-surface">
              Share Expedition
            </h3>
          </div>
          <button
            onClick={() => setShareModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4 text-xs">
          {shareData?.image && (
            <div className="relative h-32 rounded-xl overflow-hidden">
              <img
                src={shareData.image}
                alt={shareData.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <h4 className="font-bold text-sm truncate">{shareData.title}</h4>
                <p className="text-[11px] text-zinc-200 truncate">{shareData.subtitle}</p>
              </div>
            </div>
          )}

          {/* Share Channels */}
          <div>
            <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block mb-2">
              Share to Social & Messaging
            </span>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={shareToWhatsApp}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-on-surface">WhatsApp</span>
              </button>

              <button
                onClick={shareToTwitter}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center">
                  <Twitter className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-on-surface">X / Twitter</span>
              </button>

              <button
                onClick={shareToLinkedIn}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-on-surface">LinkedIn</span>
              </button>

              <button
                onClick={shareViaEmail}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-on-surface">Email</span>
              </button>
            </div>
          </div>

          {/* Direct Link Copy */}
          <div>
            <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block mb-1">
              Direct Link
            </span>
            <div className="flex items-center gap-2 bg-surface-container-low p-2 rounded-xl border border-surface-container-high">
              <input
                type="text"
                readOnly
                value={url}
                className="flex-1 bg-transparent text-xs text-on-surface truncate focus:outline-none"
              />
              <button
                onClick={copyLink}
                className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center gap-1 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
