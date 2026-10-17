import React from 'react';

export const Overview: React.FC = () => {
  return (
    <section className="bg-white p-5 md:p-6 rounded-2xl shadow-xs border border-black/[0.04] space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-lg text-xl md:text-2xl font-bold text-[#131b2e]">
          Tour Experience Overview
        </h2>
        <span className="font-label-sm text-xs text-[#005a71] uppercase font-bold tracking-wider bg-[#d3f1ff]/60 px-2.5 py-1 rounded-full">
          Curated Journey
        </span>
      </div>

      <p className="font-body-md text-sm md:text-base text-[#3f484c] leading-relaxed">
        Traverse Europe's most dramatic mountain territory on a masterfully designed 10-day expedition through Switzerland, Austria, and Northern Italy. Unwind aboard the legendary Glacier Express in bespoke First-Class panoramic carriages, savor private sommelier tastings in Alto Adige vineyards, explore Mozart's baroque Salzburg estate without crowds, and conclude with private gondola serenades through the historic canals of Venice.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3.5 bg-[#f2f3ff] rounded-xl border border-black/[0.02]">
          <span className="material-symbols-outlined text-[#005a71] text-2xl">terrain</span>
          <p className="font-label-md text-sm font-bold text-[#131b2e] mt-1">4 Alpine Passes</p>
          <p className="font-body-sm text-xs text-[#6f787d] mt-0.5">Pilatus, Oberalp, Brenner &amp; Sella</p>
        </div>

        <div className="p-3.5 bg-[#f2f3ff] rounded-xl border border-black/[0.02]">
          <span className="material-symbols-outlined text-[#005a71] text-2xl">restaurant</span>
          <p className="font-label-md text-sm font-bold text-[#131b2e] mt-1">16 Curated Meals</p>
          <p className="font-body-sm text-xs text-[#6f787d] mt-0.5">9 Breakfasts, 4 Lunches, 3 Dinners</p>
        </div>

        <div className="p-3.5 bg-[#f2f3ff] rounded-xl border border-black/[0.02]">
          <span className="material-symbols-outlined text-[#005a71] text-2xl">verified_user</span>
          <p className="font-label-md text-sm font-bold text-[#131b2e] mt-1">Intimate Group</p>
          <p className="font-body-sm text-xs text-[#6f787d] mt-0.5">Never more than 14 travelers</p>
        </div>
      </div>
    </section>
  );
};
