import React from 'react';

export const HighlightsRibbon: React.FC = () => {
  const highlights = [
    {
      icon: 'hotel_class',
      title: '5-Star Luxury Stays',
      desc: "The Dolder, Badrutt's & St. Regis",
    },
    {
      icon: 'train',
      title: 'First-Class Scenic Rail',
      desc: 'Glacier Express Excellence Class',
    },
    {
      icon: 'wine_bar',
      title: 'Epicurean Dining',
      desc: 'Private tastings & Michelin dinners',
    },
    {
      icon: 'concierge',
      title: '24/7 Tour Director',
      desc: 'Dedicated Rsquare concierge',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-2 w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 bg-[#f2f3ff] p-4 rounded-xl shadow-xs border border-black/[0.03]">
        {highlights.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#005a71] shrink-0 shadow-xs border border-black/[0.04]">
              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
            </div>
            <div>
              <h4 className="font-label-md text-sm font-bold text-[#131b2e] leading-snug">
                {item.title}
              </h4>
              <p className="font-body-sm text-xs text-[#6f787d] leading-tight mt-0.5">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
