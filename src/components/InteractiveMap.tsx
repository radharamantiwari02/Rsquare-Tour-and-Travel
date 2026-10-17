import React, { useState } from 'react';

interface Waypoint {
  id: string;
  name: string;
  day: string;
  altitude: string;
  coords: { x: number; y: number }; // percentages
  transit: string;
  notes: string;
}

export const InteractiveMap: React.FC = () => {
  const [selectedWaypoint, setSelectedWaypoint] = useState<Waypoint | null>(null);
  const [activeLayer, setActiveLayer] = useState<'all' | 'rail' | 'road'>('all');

  const waypoints: Waypoint[] = [
    {
      id: 'zurich',
      name: 'Zurich',
      day: 'Day 1',
      altitude: '408m',
      coords: { x: 18, y: 35 },
      transit: 'Private Mercedes V-Class',
      notes: 'Arrival & lake cruise sunset welcome aperitif.',
    },
    {
      id: 'lucerne',
      name: 'Lucerne & Mount Pilatus',
      day: 'Day 2',
      altitude: '2,132m',
      coords: { x: 26, y: 48 },
      transit: 'Paddle Steamer & Cogwheel',
      notes: 'Golden Roundtrip & steepest cogwheel railway in the world.',
    },
    {
      id: 'st-moritz',
      name: 'St. Moritz',
      day: 'Day 3',
      altitude: '1,822m',
      coords: { x: 40, y: 62 },
      transit: 'Glacier Express Excellence Class',
      notes: 'UNESCO Albula Line crossing 291 bridges and 91 tunnels.',
    },
    {
      id: 'innsbruck',
      name: 'Innsbruck (Tyrol)',
      day: 'Day 4',
      altitude: '574m',
      coords: { x: 55, y: 44 },
      transit: 'Luxury Executive Coach',
      notes: 'Imperial Hofburg Palace & Goldenes Dachl private tour.',
    },
    {
      id: 'salzburg',
      name: 'Salzburg & Salzkammergut',
      day: 'Day 5',
      altitude: '424m',
      coords: { x: 68, y: 30 },
      transit: 'Private Luxury Transport',
      notes: 'Mozart birthplace tour & St. Peter candlelit chamber concert.',
    },
    {
      id: 'dolomites',
      name: 'Italian Dolomites (Seceda)',
      day: 'Days 6-7',
      altitude: '2,519m',
      coords: { x: 74, y: 58 },
      transit: 'Mountain Cableway & Forestis',
      notes: 'Alpine wellness retreat & Valpolicella private cellar tasting.',
    },
    {
      id: 'venice',
      name: 'Venice (Grand Canal)',
      day: 'Days 8-10',
      altitude: '1m',
      coords: { x: 86, y: 78 },
      transit: 'Mahogany Water Taxi & Gondola',
      notes: 'Doge Palace after-hours access & Grand Canal departure.',
    },
  ];

  return (
    <section className="bg-white p-5 md:p-6 rounded-2xl shadow-xs border border-black/[0.04] space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-headline-lg text-xl md:text-2xl font-bold text-[#131b2e]">
            Interactive Route Map
          </h2>
          <p className="font-body-sm text-xs md:text-sm text-[#6f787d] mt-0.5">
            Over 850 km of pristine Alpine highways &amp; UNESCO railway lines
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Waypoint layer filter */}
          <div className="hidden sm:flex bg-[#f2f3ff] p-0.5 rounded-lg text-xs font-semibold text-[#3f484c]">
            <button
              onClick={() => setActiveLayer('all')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeLayer === 'all' ? 'bg-white text-[#005a71] shadow-2xs font-bold' : ''
              }`}
            >
              All Route
            </button>
            <button
              onClick={() => setActiveLayer('rail')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeLayer === 'rail' ? 'bg-white text-[#005a71] shadow-2xs font-bold' : ''
              }`}
            >
              Rail
            </button>
            <button
              onClick={() => setActiveLayer('road')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeLayer === 'road' ? 'bg-white text-[#005a71] shadow-2xs font-bold' : ''
              }`}
            >
              Road & Water
            </button>
          </div>

          <span className="inline-flex items-center gap-1 font-label-sm text-xs text-[#005a71] bg-[#b9eaff]/40 px-3 py-1 rounded-full font-bold">
            <span className="material-symbols-outlined text-[16px]">map</span>
            <span>Zurich → Venice</span>
          </span>
        </div>
      </div>

      {/* Map Graphic Canvas */}
      <div
        className="w-full h-80 md:h-96 rounded-xl relative shadow-inner overflow-hidden flex flex-col justify-between p-4 bg-cover bg-center border border-black/10 select-none"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCrIKRs2Gzo3HUQc8f6PteRqtBTRnE24uLVdWV-m8gkzK--SwVDdqoanoHqiJuw2YMjcapyywbptKzFYKVlofNyJkS91aPOqclmDv2VQJ4r2UlzQuHEeW_GNY1Tle0GJGpkE2Bx1lclIuT6UEHMhhGV1vNMsVT0Er0vPznnKyx0m2EbtrRbUWiPWhpBeYGfRU2pF2bKaZ_FGphjLqLSUP9qQh1-icPU6H9U9JU0HYw8rdYwnZHr1SExAQ')`,
        }}
      >
        {/* SVG Route Connector Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <polyline
            points="18% 35%, 26% 48%, 40% 62%, 55% 44%, 68% 30%, 74% 58%, 86% 78%"
            fill="none"
            stroke="#005a71"
            strokeWidth="3.5"
            strokeDasharray="6 4"
            className="opacity-80"
          />
        </svg>

        {/* Waypoint Markers */}
        <div className="absolute inset-0">
          {waypoints.map((wp) => {
            const isSelected = selectedWaypoint?.id === wp.id;
            return (
              <button
                key={wp.id}
                onClick={() => setSelectedWaypoint(isSelected ? null : wp)}
                style={{ left: `${wp.coords.x}%`, top: `${wp.coords.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20 focus:outline-none"
                title={`${wp.name} (${wp.altitude})`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] transition-all transform duration-200 shadow-md ${
                    isSelected
                      ? 'bg-[#fea619] text-[#2a1700] ring-4 ring-white scale-125'
                      : 'bg-[#005a71] text-white hover:scale-120 group-hover:bg-[#0e7490]'
                  }`}
                >
                  {wp.day.replace('Day ', '').replace('Days ', '')}
                </div>
                <span className="hidden sm:inline-block absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur-xs text-[#131b2e] text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs pointer-events-none">
                  {wp.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Top Floating Waypoint Detail popup if selected */}
        {selectedWaypoint ? (
          <div className="self-end bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-black/10 max-w-xs z-30 animate-fadeIn">
            <div className="flex items-center justify-between gap-2 border-b border-black/5 pb-1.5">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#005a71]">{selectedWaypoint.day} Stop</span>
                <h4 className="font-bold text-sm text-[#131b2e]">{selectedWaypoint.name}</h4>
              </div>
              <button
                onClick={() => setSelectedWaypoint(null)}
                className="text-[#6f787d] hover:text-black p-0.5"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div className="mt-2 text-xs text-[#3f484c] space-y-1">
              <p><strong className="text-[#131b2e]">Elevation:</strong> {selectedWaypoint.altitude}</p>
              <p><strong className="text-[#131b2e]">Transit:</strong> {selectedWaypoint.transit}</p>
              <p className="text-[11px] text-[#6f787d] italic">{selectedWaypoint.notes}</p>
            </div>
          </div>
        ) : <div />}

        {/* Live Route Details Bottom Card (Matches screenshot exactly) */}
        <div className="bg-white/90 backdrop-blur-md p-3.5 md:p-4 rounded-xl max-w-md shadow-sm border border-black/[0.04] z-20">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#fea619] animate-ping" />
            <span className="font-label-sm text-xs font-bold text-[#131b2e] uppercase tracking-wide">
              Live Route Details
            </span>
          </div>
          <p className="font-body-sm text-xs text-[#3f484c] leading-relaxed">
            7 Primary Waypoints, 3 High-Altitude Cableways, 2 Rail Journeys. All transit is carbon-offset certified by Rsquare Planet Care.
          </p>
        </div>
      </div>
    </section>
  );
};
