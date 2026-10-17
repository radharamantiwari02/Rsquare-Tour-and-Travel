import React from 'react';

interface PhotoCollageProps {
  onOpenGallery: (photoIndex: number, mode?: 'photo' | '360') => void;
}

export const PhotoCollage: React.FC<PhotoCollageProps> = ({ onOpenGallery }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-2 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-1.5 h-[340px] sm:h-[420px] md:h-[500px] rounded-2xl overflow-hidden shadow-md">
        {/* Main Large Hero Photo */}
        <div
          onClick={() => onOpenGallery(0)}
          className="md:col-span-2 md:row-span-2 relative group overflow-hidden cursor-pointer bg-slate-900"
        >
          <div
            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0x6h0dPGFzh7HYyJmd99j8MBtB4KbQIvOGlw6M5fyGFFrhz0b26AL0o4BVPk3d5pMpQ-dQmv7QklT5uoOPj9oZvdTbMv82Hxiq8Cj7zfKFeOGQSVis-2BwhBaL0eRhuRwyY_il8alxRAfW2qBtvQmsy8Ucb-ggN1a8cVuhJnqp2iaga1duIn1PzsUzl5c7XgU7vF_9vJ__TtU4_sV32v9iNOz-9bHGUOwLJAnYGNKwN2mDmir8ZmeuQ')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#283044]/75 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-[16px]">fullscreen</span>
            <span>Click to expand</span>
          </div>

          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white pr-4">
            <span className="px-2 py-0.5 rounded bg-[#005a71]/90 backdrop-blur-md font-label-sm text-xs font-bold uppercase tracking-wider inline-block">
              Day 2 Highlight
            </span>
            <p className="font-headline-sm text-lg md:text-xl font-bold mt-1.5 drop-shadow-sm">
              Mount Pilatus &amp; Lake Lucerne Panorama
            </p>
          </div>
        </div>

        {/* Thumbnail 1: Glacier Express First-Class */}
        <div
          onClick={() => onOpenGallery(1)}
          className="relative group overflow-hidden cursor-pointer hidden md:block bg-slate-900"
        >
          <div
            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDga6rlYtzt4xJmqEEqfIb49u1EqAk8rkxhuAsNaSJQ8QY-ECCHraCjkFL9g_MjTe7tS6h5seELzX_VtblR9MgYfnib4dYlhPMe5fqLp3c2VTfCoVAkkN_pQ773ajJ7Dug47wAXZJrs7SrYuME0YGTsk3_JgyPbzF5HAxsZAg0ajzABNm7Ec4jP2Mdsli92VQI5qcwSwxSgPNgSJZBkYpdMl86XXNoqR7b8iy9ybjMi3g3RPhNAeWlxdw')`,
            }}
          />
          <div className="absolute inset-0 bg-[#283044]/15 group-hover:bg-transparent transition-colors" />
          <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-white/95 text-[#131b2e] font-label-sm text-xs font-bold shadow-xs">
            Glacier Express First-Class
          </span>
        </div>

        {/* Thumbnail 2: Innsbruck Old Town */}
        <div
          onClick={() => onOpenGallery(2)}
          className="relative group overflow-hidden cursor-pointer hidden md:block bg-slate-900"
        >
          <div
            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCoR5xmFWD1cVBJKFPUI1azd6rrZbWCnpqUObs_QzvAE_pRt7HbF2vhVMVC2zLEG0x3C_V27Wgpk_33kWEeE7rbNaA_GuW_7QB-Mfj5_ex-vf78aFpmBPpnxNXngzDWYeHBz321f1_Pp-pIzAoIO8ZIJjNI7J_lb4PlWRm-tFesHTPsJc4zLtnHv8vaY0pi6LMGJQey2iZOK3Fb8mGRHF4xzAkRcAntXyIG9WySiQ73vdGh_wA62O7_kQ')`,
            }}
          />
          <div className="absolute inset-0 bg-[#283044]/15 group-hover:bg-transparent transition-colors" />
          <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-white/95 text-[#131b2e] font-label-sm text-xs font-bold shadow-xs">
            Innsbruck Old Town
          </span>
        </div>

        {/* Thumbnail 3: Dolomites Alpine Pass */}
        <div
          onClick={() => onOpenGallery(3)}
          className="relative group overflow-hidden cursor-pointer hidden md:block bg-slate-900"
        >
          <div
            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCgcU8qo0UrF4stldxWqYelrf1pSpaaoKL0lUbMv5gnd8BsQFYzrRfUCxmZ3a2XyMYFD8vrfm6i6japwiS_X2Hj-4FCrZtaIembVjYM802mkTPudaRxBERrd6yyp0qQJJF18bjTAXqwvuDdWVwIC-DDhgNqvgDVk-1eAha9jz_suvwxlXiX8PXyNxvQN7NaumqctfAGkYFt5tecu0O7u6B7SRTPZ0l8hy-i56yW4rnXZPEJGqE-MfXN3Q')`,
            }}
          />
          <div className="absolute inset-0 bg-[#283044]/15 group-hover:bg-transparent transition-colors" />
          <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-white/95 text-[#131b2e] font-label-sm text-xs font-bold shadow-xs">
            Dolomites Alpine Pass
          </span>
        </div>

        {/* Thumbnail 4: +18 Photos and 360 overlay */}
        <div
          onClick={() => onOpenGallery(4, '360')}
          className="relative group overflow-hidden cursor-pointer hidden md:block bg-slate-900"
        >
          <div
            className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCj76fqqvbWO6Lz21vUJONlguypxfQagR9EI-mJ3WkvPJutGh3iovNy8XfId_kQJ399Oe01L1SADR6zkNKqF23C4tmQdQlvAhr_WKzULlsYRJ9GODsvaW1QUgUvIL57W9DCj582dW2DvWeNbxuWGmkAupafJ0lftCiDAwkhXIZnF84evIan1QSIHLKiIs_mwzSY6irx73NitVk4sY2vj1ud9bvBkgcSr629Mj7XzZnnE6oF6JmylrGk2Q')`,
            }}
          />
          <div className="absolute inset-0 bg-[#283044]/65 group-hover:bg-[#283044]/80 transition-colors flex flex-col items-center justify-center text-center p-3 text-white">
            <span className="material-symbols-outlined text-4xl text-[#fea619] mb-1 animate-pulse">
              view_in_ar
            </span>
            <span className="font-headline-sm text-lg font-bold">
              +18 Photos
            </span>
            <span className="font-label-sm text-xs text-[#dae2fd] tracking-wide mt-0.5">
              &amp; 360° Virtual Tour
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
