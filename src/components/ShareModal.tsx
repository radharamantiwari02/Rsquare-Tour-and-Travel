import React, { useState } from 'react';

interface ShareModalProps {
  onClose: () => void;
  tourTitle: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ onClose, tourTitle }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://rsquare-travels.com/alpine-odyssey';

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareOptions = [
    { name: 'WhatsApp', icon: 'chat', color: 'bg-emerald-500' },
    { name: 'Email', icon: 'mail', color: 'bg-[#005a71]' },
    { name: 'LinkedIn', icon: 'share', color: 'bg-blue-600' },
    { name: 'Message', icon: 'sms', color: 'bg-amber-600' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-black/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-[#131b2e]">Share This Tour</h3>
          <button onClick={onClose} className="text-[#6f787d] hover:text-black">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-xs text-[#3f484c]">
          Share <strong>{tourTitle}</strong> with your travel companions or family.
        </p>

        {/* Channels */}
        <div className="grid grid-cols-4 gap-2 text-center pt-2">
          {shareOptions.map((opt) => (
            <button
              key={opt.name}
              onClick={handleCopy}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-full ${opt.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
              >
                <span className="material-symbols-outlined text-xl">{opt.icon}</span>
              </div>
              <span className="text-[11px] font-semibold text-[#131b2e]">{opt.name}</span>
            </button>
          ))}
        </div>

        {/* Copy Link input */}
        <div className="pt-2">
          <label className="block text-[11px] font-bold text-[#6f787d] uppercase tracking-wider mb-1">
            Direct Web Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="w-full h-10 px-3 rounded-lg border border-black/15 text-xs text-[#3f484c] bg-gray-50 outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-4 h-10 rounded-lg bg-[#005a71] hover:bg-[#0e7490] text-white text-xs font-bold transition-colors shrink-0 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
