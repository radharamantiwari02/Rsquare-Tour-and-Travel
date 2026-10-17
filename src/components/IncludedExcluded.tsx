import React from 'react';

interface IncludedExcludedProps {
  included: string[];
  excluded: string[];
}

export const IncludedExcluded: React.FC<IncludedExcludedProps> = ({ included, excluded }) => {
  return (
    <section className="bg-white p-5 md:p-6 rounded-2xl shadow-xs border border-black/[0.04] space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-lg text-xl md:text-2xl font-bold text-[#131b2e]">
          What's Included vs. Excluded
        </h2>
        <span className="font-label-sm text-xs text-[#6f787d]">
          Clear &amp; Transparent Pricing
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Included */}
        <div className="bg-[#f2f3ff] p-4 md:p-5 rounded-xl space-y-3 border border-black/[0.03]">
          <div className="flex items-center gap-2 text-[#005a71]">
            <span className="material-symbols-outlined text-2xl">check_circle</span>
            <h3 className="font-headline-sm text-base md:text-lg font-bold text-[#131b2e]">
              Included In Your Journey
            </h3>
          </div>

          <ul className="space-y-2 font-body-sm text-xs md:text-sm text-[#3f484c]">
            {included.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#005a71] text-[18px] shrink-0 mt-0.5">
                  done
                </span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Excluded */}
        <div className="bg-[#f2f3ff] p-4 md:p-5 rounded-xl space-y-3 border border-black/[0.03]">
          <div className="flex items-center gap-2 text-[#6f787d]">
            <span className="material-symbols-outlined text-2xl">cancel</span>
            <h3 className="font-headline-sm text-base md:text-lg font-bold text-[#131b2e]">
              Not Included
            </h3>
          </div>

          <ul className="space-y-2 font-body-sm text-xs md:text-sm text-[#3f484c]">
            {excluded.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#6f787d] text-[18px] shrink-0 mt-0.5">
                  close
                </span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
