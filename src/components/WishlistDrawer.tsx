import React from 'react';
import { TourPackage, CurrencyCode } from '../types/tour';
import { CURRENCY_RATES } from '../data/tourData';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedTours: TourPackage[];
  onRemoveTour: (id: string) => void;
  currency: CurrencyCode;
  onSelectTour: (tour: TourPackage) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  savedTours,
  onRemoveTour,
  currency,
  onSelectTour,
}) => {
  if (!isOpen) return null;

  const currentRate = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const formatPrice = (val: number) =>
    `${currentRate.symbol}${Math.round(val * currentRate.rate).toLocaleString()}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col justify-between z-10 animate-slideLeft">
        <div className="p-5 border-b border-black/10 flex items-center justify-between bg-[#f2f3ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#005a71] text-2xl">favorite</span>
            <div>
              <h3 className="font-bold text-base text-[#131b2e]">Saved Expeditions</h3>
              <p className="text-xs text-[#6f787d]">
                {savedTours.length} {savedTours.length === 1 ? 'Tour' : 'Tours'} saved to your wishlist
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-[#6f787d] hover:text-black flex items-center justify-center shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {savedTours.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <span className="material-symbols-outlined text-5xl text-[#bec8cd]">favorite_border</span>
              <p className="text-sm font-semibold text-[#131b2e]">Your Wishlist is Empty</p>
              <p className="text-xs text-[#6f787d]">
                Click the heart icon on any tour to save it for your next adventure.
              </p>
            </div>
          ) : (
            savedTours.map((t) => (
              <div
                key={t.id}
                className="bg-[#f2f3ff] rounded-xl p-3.5 space-y-3 border border-black/[0.03] group hover:border-[#005a71]/30 transition-all"
              >
                <div className="flex gap-3">
                  <div
                    className="w-24 h-20 rounded-lg bg-cover bg-center shrink-0"
                    style={{
                      backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0x6h0dPGFzh7HYyJmd99j8MBtB4KbQIvOGlw6M5fyGFFrhz0b26AL0o4BVPk3d5pMpQ-dQmv7QklT5uoOPj9oZvdTbMv82Hxiq8Cj7zfKFeOGQSVis-2BwhBaL0eRhuRwyY_il8alxRAfW2qBtvQmsy8Ucb-ggN1a8cVuhJnqp2iaga1duIn1PzsUzl5c7XgU7vF_9vJ__TtU4_sV32v9iNOz-9bHGUOwLJAnYGNKwN2mDmir8ZmeuQ')`,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#005a71] block">
                      {t.code} • {t.duration}
                    </span>
                    <h4 className="font-bold text-xs text-[#131b2e] leading-snug line-clamp-2 mt-0.5">
                      {t.title}
                    </h4>
                    <div className="flex items-center gap-1 text-[11px] text-[#fea619] font-bold mt-1">
                      <span>★ {t.rating}</span>
                      <span className="text-[#6f787d] font-normal">({t.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-black/5">
                  <div>
                    <span className="text-[10px] text-[#6f787d] block">From</span>
                    <span className="text-sm font-bold text-[#005a71]">
                      {formatPrice(t.startingPrice)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRemoveTour(t.id)}
                      className="p-1.5 rounded-lg text-[#6f787d] hover:text-red-600 hover:bg-white text-xs transition-colors"
                      title="Remove from wishlist"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                    <button
                      onClick={() => {
                        onSelectTour(t);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#005a71] text-white text-xs font-bold hover:bg-[#0e7490] transition-colors"
                    >
                      View Tour
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f2f3ff] border-t border-black/10 text-center text-xs text-[#6f787d]">
          <span className="flex items-center justify-center gap-1 font-semibold text-[#005a71]">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            Best Price Guarantee Across All Departures
          </span>
        </div>
      </div>
    </div>
  );
};
