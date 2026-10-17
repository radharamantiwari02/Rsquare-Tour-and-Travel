import React, { useState } from 'react';
import { Accommodation } from '../types/tour';

interface AccommodationsProps {
  accommodations: Accommodation[];
}

export const Accommodations: React.FC<AccommodationsProps> = ({ accommodations }) => {
  const [activeHotel, setActiveHotel] = useState<Accommodation | null>(null);

  return (
    <section className="bg-white p-5 md:p-6 rounded-2xl shadow-xs border border-black/[0.04] space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-lg text-xl md:text-2xl font-bold text-[#131b2e]">
            Handpicked Luxury Accommodations
          </h2>
          <p className="font-body-sm text-xs md:text-sm text-[#6f787d] mt-0.5">
            Verified 5-Star properties offering signature European hospitality
          </p>
        </div>
        <span className="font-label-sm text-xs text-[#855300] bg-[#ffddb8] px-2.5 py-1 rounded-full font-bold">
          100% Guaranteed
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accommodations.map((hotel) => (
          <div
            key={hotel.id}
            onClick={() => setActiveHotel(hotel)}
            className="rounded-xl overflow-hidden bg-[#f2f3ff] shadow-xs group cursor-pointer hover:shadow-md transition-all border border-black/[0.03] flex flex-col justify-between"
          >
            <div>
              <div
                className="h-44 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 relative"
                style={{ backgroundImage: `url('${hotel.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    View Hotel Amenities
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <span className="font-label-sm text-xs text-[#005a71] font-bold block">
                  {hotel.nights}
                </span>
                <h4 className="font-headline-sm text-base font-bold text-[#131b2e] group-hover:text-[#005a71] transition-colors">
                  {hotel.name}
                </h4>
                <p className="font-body-sm text-xs text-[#6f787d] line-clamp-2 leading-relaxed">
                  {hotel.description}
                </p>
              </div>
            </div>

            <div className="px-4 pb-4 pt-1">
              <div className="flex items-center gap-1 text-[#855300] font-label-sm text-xs border-t border-black/[0.04] pt-2">
                <span
                  className="material-symbols-outlined text-[16px] text-[#fea619]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="font-bold text-[#131b2e]">{hotel.rating.toFixed(hotel.rating % 1 === 0 ? 1 : 2)}</span>
                <span className="text-[#6f787d] truncate">• {hotel.roomType}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hotel Detail Modal */}
      {activeHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-black/10">
            <div
              className="h-52 bg-cover bg-center relative"
              style={{ backgroundImage: `url('${activeHotel.image}')` }}
            >
              <button
                onClick={() => setActiveHotel(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
              <div className="absolute bottom-3 left-4 text-white">
                <span className="text-xs bg-[#005a71] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  {activeHotel.nights}
                </span>
                <h3 className="text-xl font-bold mt-1 drop-shadow-sm">{activeHotel.name}</h3>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#6f787d]">
                <span className="flex items-center gap-1 font-semibold text-[#131b2e]">
                  <span className="material-symbols-outlined text-[16px] text-[#005a71]">location_on</span>
                  {activeHotel.location}
                </span>
                <span className="font-bold text-[#855300] bg-[#ffddb8] px-2 py-0.5 rounded">
                  ★ {activeHotel.rating} Verified 5-Star
                </span>
              </div>

              <p className="text-sm text-[#3f484c] leading-relaxed">
                {activeHotel.description}
              </p>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#131b2e] mb-2">
                  Signature Inclusions &amp; Room Details
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  {activeHotel.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-[#3f484c] bg-[#f2f3ff] p-2 rounded-lg">
                      <span className="material-symbols-outlined text-[#005a71] text-[16px]">check_circle</span>
                      <span>{f}</span>
                    </div>
                  ))}
                  {activeHotel.amenities.map((a, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-[#3f484c] bg-[#f2f3ff] p-2 rounded-lg">
                      <span className="material-symbols-outlined text-[#005a71] text-[16px]">hotel_class</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveHotel(null)}
                  className="px-5 py-2 rounded-lg bg-[#005a71] hover:bg-[#0e7490] text-white font-semibold text-xs transition-colors"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
