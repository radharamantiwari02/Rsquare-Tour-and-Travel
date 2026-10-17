import React, { useState } from 'react';
import { DayItinerary } from '../types/tour';

interface ItineraryAccordionProps {
  itinerary: DayItinerary[];
}

export const ItineraryAccordion: React.FC<ItineraryAccordionProps> = ({ itinerary }) => {
  // Start with all open by default, as displayed in the screenshot
  const [openDays, setOpenDays] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    itinerary.forEach((item) => {
      initial[item.day] = true;
    });
    return initial;
  });

  const toggleDay = (day: string) => {
    setOpenDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const expandAll = () => {
    const updated: Record<string, boolean> = {};
    itinerary.forEach((item) => {
      updated[item.day] = true;
    });
    setOpenDays(updated);
  };

  const collapseAll = () => {
    const updated: Record<string, boolean> = {};
    itinerary.forEach((item) => {
      updated[item.day] = false;
    });
    setOpenDays(updated);
  };

  return (
    <section className="bg-white p-5 md:p-6 rounded-2xl shadow-xs border border-black/[0.04] space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-headline-lg text-xl md:text-2xl font-bold text-[#131b2e]">
            Detailed Day-by-Day Itinerary
          </h2>
          <p className="font-body-sm text-xs md:text-sm text-[#6f787d] mt-0.5">
            10 Days of thoughtfully timed excursions &amp; leisure moments
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={expandAll}
            className="font-label-sm text-xs text-[#005a71] hover:bg-[#eaedff] px-2.5 py-1 rounded-lg transition-colors cursor-pointer font-bold"
          >
            Expand All
          </button>
          <span className="text-[#bec8cd]">|</span>
          <button
            onClick={collapseAll}
            className="font-label-sm text-xs text-[#3f484c] hover:bg-[#eaedff] px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        {itinerary.map((item) => {
          const isOpen = openDays[item.day] ?? true;
          const isMultiDay = item.day.includes('-');

          return (
            <div
              key={item.day}
              className="rounded-xl bg-[#f2f3ff] overflow-hidden transition-all shadow-xs border border-black/[0.03]"
            >
              <button
                type="button"
                onClick={() => toggleDay(item.day)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-[#eaedff]/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <span
                    className={`w-12 h-12 rounded-xl font-headline-sm text-lg md:text-xl flex items-center justify-center shrink-0 font-bold ${
                      isMultiDay
                        ? 'bg-[#fea619] text-[#2a1700]'
                        : 'bg-[#005a71] text-white'
                    }`}
                  >
                    {item.day}
                  </span>
                  <div>
                    <span
                      className={`font-label-sm text-xs uppercase font-bold tracking-wider block ${
                        isMultiDay ? 'text-[#855300]' : 'text-[#005a71]'
                      }`}
                    >
                      {item.region}
                    </span>
                    <h3 className="font-headline-sm text-sm md:text-base text-[#131b2e] font-bold mt-0.5 leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <span
                  className={`material-symbols-outlined text-[#6f787d] transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-0' : '-rotate-90'
                  }`}
                >
                  expand_more
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 space-y-3 animate-fadeIn">
                  {/* Metadata Chips Bar */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-label-sm text-xs text-[#3f484c] py-2 bg-white/70 px-3 rounded-lg border border-black/[0.02]">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#005a71] text-[16px]">schedule</span>
                      <span>{item.timing}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#005a71] text-[16px]">
                        {item.transitIcon}
                      </span>
                      <span>{item.transit}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#005a71] text-[16px]">restaurant</span>
                      <span>{item.dining}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#005a71] text-[16px]">hotel</span>
                      <span>{item.hotel}</span>
                    </span>
                  </div>

                  <p className="font-body-md text-sm text-[#3f484c] leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlights tags */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[11px] font-bold text-[#6f787d] uppercase tracking-wider">
                        Key Features:
                      </span>
                      {item.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-full bg-white text-[#005a71] text-xs font-medium border border-[#b9eaff]/60 shadow-2xs"
                        >
                          ✦ {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
