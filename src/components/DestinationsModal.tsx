import React, { useState } from 'react';
import { OTHER_TOURS, CURRENCY_RATES } from '../data/tourData';
import { CurrencyCode, TourPackage } from '../types/tour';

interface DestinationsModalProps {
  type: 'destinations' | 'packages' | 'deals' | 'about' | 'contact';
  onClose: () => void;
  currency: CurrencyCode;
  onSelectTour: (tourId: string) => void;
  onOpenCustomPlanner: () => void;
}

export const DestinationsModal: React.FC<DestinationsModalProps> = ({
  type,
  onClose,
  currency,
  onSelectTour,
  onOpenCustomPlanner,
}) => {
  const currentRate = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const formatPrice = (val: number) =>
    `${currentRate.symbol}${Math.round(val * currentRate.rate).toLocaleString()}`;

  const [selectedFilter, setSelectedFilter] = useState('All');

  const destinations = [
    {
      name: 'Switzerland & Alps',
      badge: 'Alpine High-Rail',
      tours: 4,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0x6h0dPGFzh7HYyJmd99j8MBtB4KbQIvOGlw6M5fyGFFrhz0b26AL0o4BVPk3d5pMpQ-dQmv7QklT5uoOPj9oZvdTbMv82Hxiq8Cj7zfKFeOGQSVis-2BwhBaL0eRhuRwyY_il8alxRAfW2qBtvQmsy8Ucb-ggN1a8cVuhJnqp2iaga1duIn1PzsUzl5c7XgU7vF_9vJ__TtU4_sV32v9iNOz-9bHGUOwLJAnYGNKwN2mDmir8ZmeuQ',
      desc: 'Glacier Express, Mount Pilatus, St. Moritz, and pristine turquoise lakes.',
    },
    {
      name: 'Northern Italy & Venice',
      badge: 'Gondola & Dolomites',
      tours: 3,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj76fqqvbWO6Lz21vUJONlguypxfQagR9EI-mJ3WkvPJutGh3iovNy8XfId_kQJ399Oe01L1SADR6zkNKqF23C4tmQdQlvAhr_WKzULlsYRJ9GODsvaW1QUgUvIL57W9DCj582dW2DvWeNbxuWGmkAupafJ0lftCiDAwkhXIZnF84evIan1QSIHLKiIs_mwzSY6irx73NitVk4sY2vj1ud9bvBkgcSr629Mj7XzZnnE6oF6JmylrGk2Q',
      desc: 'Grand Canal palazzos, Doge Palace private tours, and dramatic limestone spires.',
    },
    {
      name: 'Austrian Tyrol & Salzburg',
      badge: 'Mozart & Castles',
      tours: 2,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoR5xmFWD1cVBJKFPUI1azd6rrZbWCnpqUObs_QzvAE_pRt7HbF2vhVMVC2zLEG0x3C_V27Wgpk_33kWEeE7rbNaA_GuW_7QB-Mfj5_ex-vf78aFpmBPpnxNXngzDWYeHBz321f1_Pp-pIzAoIO8ZIJjNI7J_lb4PlWRm-tFesHTPsJc4zLtnHv8vaY0pi6LMGJQey2iZOK3Fb8mGRHF4xzAkRcAntXyIG9WySiQ73vdGh_wA62O7_kQ',
      desc: 'Imperial Hofburg, Golden Roof, Salzkammergut crystal lakes, and baroque music.',
    },
    {
      name: 'Japan & Kyoto',
      badge: 'Ryokan & Culture',
      tours: 3,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      desc: 'Tea ceremony masters, bullet trains, Onsen springs, and Hokkaido wilderness.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-black/10">
        {/* Header */}
        <div className="px-6 py-4 bg-[#f2f3ff] border-b border-black/5 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-[#005a71]">
              Rsquare Signature Expeditions
            </span>
            <h3 className="text-xl font-bold text-[#131b2e]">
              {type === 'destinations' && 'Featured Global Destinations'}
              {type === 'packages' && 'Curated Luxury Tour Packages'}
              {type === 'deals' && 'Special Deals & Early Bird Offers'}
              {type === 'about' && 'About Rsquare Tour & Travels'}
              {type === 'contact' && 'Contact Worldwide Concierge'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-[#6f787d] hover:text-black flex items-center justify-center shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* DEALS TAB */}
          {type === 'deals' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-[#005a71] to-[#0e7490] text-white p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
                <div>
                  <span className="px-3 py-1 bg-[#fea619] text-[#2a1700] rounded-full text-xs font-bold uppercase">
                    Limited Time Offer
                  </span>
                  <h4 className="text-2xl font-bold mt-2">Summer 2025 Early Bird Savings</h4>
                  <p className="text-sm text-[#d3f1ff] mt-1">
                    Book any European departure by June 30, 2025 and save $640 per traveler with guaranteed departure dates.
                  </p>
                </div>
                <div className="text-center md:text-right shrink-0">
                  <span className="text-xs text-white/80 block">Promo Code</span>
                  <span className="text-lg font-mono font-bold bg-white/20 px-3 py-1 rounded-lg border border-white/30 inline-block mt-1">
                    ALPINE-2025
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#f2f3ff] border border-black/5 space-y-2">
                  <span className="text-xs font-bold text-[#855300] bg-[#ffddb8] px-2 py-0.5 rounded">
                    Flash Secret Deal #1
                  </span>
                  <h5 className="font-bold text-sm text-[#131b2e]">
                    Free Matterhorn Helicopter Excursion Upgrade
                  </h5>
                  <p className="text-xs text-[#3f484c]">
                    Included complimentary on all September 2025 departures when booked this week ($380 value per guest).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#f2f3ff] border border-black/5 space-y-2">
                  <span className="text-xs font-bold text-[#005a71] bg-[#b9eaff] px-2 py-0.5 rounded">
                    Exclusive Suite Perk
                  </span>
                  <h5 className="font-bold text-sm text-[#131b2e]">
                    Complimentary Venice Grand Canal Water Taxi Transfer
                  </h5>
                  <p className="text-xs text-[#3f484c]">
                    Direct private mahogany speedboat transfer from Venice Airport to The St. Regis dock for all Suite bookings.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* DESTINATIONS TAB */}
          {type === 'destinations' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {destinations.map((d) => (
                <div
                  key={d.name}
                  onClick={() => {
                    onSelectTour('rsq-alp-942');
                    onClose();
                  }}
                  className="rounded-xl overflow-hidden bg-[#f2f3ff] border border-black/5 group cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div
                    className="h-44 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 relative"
                    style={{ backgroundImage: `url('${d.image}')` }}
                  >
                    <span className="absolute top-3 left-3 bg-[#005a71]/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                      {d.badge}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-base text-[#131b2e] group-hover:text-[#005a71] transition-colors">
                      {d.name}
                    </h4>
                    <p className="text-xs text-[#6f787d] mt-1 leading-relaxed">{d.desc}</p>
                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-black/5">
                      <span className="text-xs font-semibold text-[#005a71]">
                        Explore Odyssey Tour →
                      </span>
                      <span className="text-[11px] text-[#6f787d]">{d.tours} Curated Routes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PACKAGES TAB */}
          {type === 'packages' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {OTHER_TOURS.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      onSelectTour(t.id);
                      onClose();
                    }}
                    className={`rounded-xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between ${
                      t.id === 'rsq-alp-942'
                        ? 'border-[#005a71] bg-white ring-2 ring-[#005a71]/20 shadow-md'
                        : 'border-black/10 bg-[#faf8ff] hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    <div
                      className="h-40 bg-cover bg-center relative"
                      style={{ backgroundImage: `url('${t.image}')` }}
                    >
                      {t.id === 'rsq-alp-942' && (
                        <span className="absolute top-3 left-3 bg-[#fea619] text-[#2a1700] text-xs font-bold px-2 py-0.5 rounded-full uppercase">
                          Currently Viewing
                        </span>
                      )}
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-[11px] font-bold uppercase text-[#005a71] block">
                        {t.region} • {t.duration}
                      </span>
                      <h4 className="font-bold text-sm text-[#131b2e] leading-snug">{t.title}</h4>
                      <div className="flex items-center justify-between pt-2 border-t border-black/5">
                        <div className="flex items-center gap-1 text-xs text-[#fea619] font-bold">
                          <span>★ {t.rating}</span>
                          <span className="text-[#6f787d] font-normal">Verified</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#6f787d]">Starting from </span>
                          <span className="text-sm font-bold text-[#005a71]">
                            {formatPrice(t.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABOUT US TAB */}
          {type === 'about' && (
            <div className="space-y-4 text-sm text-[#3f484c] leading-relaxed">
              <h4 className="text-lg font-bold text-[#131b2e]">Architects of Extraordinary Travel</h4>
              <p>
                Founded in 2012 in Zurich and London, Rsquare Tour &amp; Travels was created with a single vision: to replace cookie-cutter bus touring with deeply immersive, exquisitely paced expeditions across Europe and beyond.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 bg-[#f2f3ff] rounded-xl text-center">
                  <span className="text-2xl font-bold text-[#005a71]">14 Guests</span>
                  <p className="text-xs text-[#6f787d] mt-1">Strict group ceiling on all departures</p>
                </div>
                <div className="p-3.5 bg-[#f2f3ff] rounded-xl text-center">
                  <span className="text-2xl font-bold text-[#005a71]">100%</span>
                  <p className="text-xs text-[#6f787d] mt-1">ATOL &amp; IATA Bonded Financial Protection</p>
                </div>
                <div className="p-3.5 bg-[#f2f3ff] rounded-xl text-center">
                  <span className="text-2xl font-bold text-[#005a71]">4.98 / 5</span>
                  <p className="text-xs text-[#6f787d] mt-1">Independent traveler satisfaction score</p>
                </div>
              </div>
            </div>
          )}

          {/* CONTACT TAB */}
          {type === 'contact' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#f2f3ff] space-y-2">
                <h4 className="font-bold text-base text-[#131b2e]">24/7 Global Concierge Offices</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#3f484c] pt-1">
                  <div>
                    <strong className="text-[#131b2e]">Zurich Headquarters:</strong>
                    <p>Bahnhofstrasse 45, 8001 Zürich, Switzerland</p>
                    <p>+41 44 215 8800</p>
                  </div>
                  <div>
                    <strong className="text-[#131b2e]">North America Concierge:</strong>
                    <p>575 5th Avenue, New York, NY 10017</p>
                    <p>+1 (800) 482-7782</p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenCustomPlanner();
                  }}
                  className="px-6 py-2.5 rounded-lg bg-[#005a71] text-white text-xs font-bold hover:bg-[#0e7490] transition-colors"
                >
                  Request a Private Consultation
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#f2f3ff] border-t border-black/5 flex items-center justify-between text-xs">
          <span className="text-[#6f787d]">Need a bespoke private group itinerary?</span>
          <button
            onClick={() => {
              onClose();
              onOpenCustomPlanner();
            }}
            className="text-[#005a71] font-bold hover:underline"
          >
            Launch Custom Planner →
          </button>
        </div>
      </div>
    </div>
  );
};
