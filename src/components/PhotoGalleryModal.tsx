import React, { useState, useEffect } from 'react';
import { PhotoItem } from '../types/tour';

interface PhotoGalleryModalProps {
  photos: PhotoItem[];
  initialIndex: number;
  initialMode?: 'photo' | '360';
  onClose: () => void;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({
  photos,
  initialIndex,
  initialMode = 'photo',
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [is360Mode, setIs360Mode] = useState(initialMode === '360');
  const [panX, setPanX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const categories = ['All', 'Landscapes', 'Rail Journeys', 'Luxury Hotels', 'Gourmet Dining'];

  const filteredPhotos =
    activeCategory === 'All'
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const currentPhoto = photos[currentIndex] || photos[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // 360 drag simulation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!is360Mode) return;
    setIsDragging(true);
    setStartX(e.clientX - panX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !is360Mode) return;
    setPanX(e.clientX - startX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between animate-fadeIn select-none"
      onMouseUp={handleMouseUp}
    >
      {/* Top Header */}
      <div className="px-6 py-4 flex items-center justify-between text-white border-b border-white/10 z-10">
        <div className="flex items-center gap-3">
          <span className="font-bold text-base md:text-lg text-white">
            Grand Alpine Odyssey Gallery
          </span>
          <span className="text-xs bg-[#005a71] px-2.5 py-1 rounded-full text-white font-medium">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="bg-white/10 p-1 rounded-lg flex items-center gap-1">
            <button
              onClick={() => setIs360Mode(false)}
              className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                !is360Mode ? 'bg-[#005a71] text-white shadow-xs' : 'text-gray-300 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">photo_library</span>
              <span>HD Photos</span>
            </button>
            <button
              onClick={() => setIs360Mode(true)}
              className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                is360Mode ? 'bg-[#fea619] text-[#2a1700] shadow-xs' : 'text-gray-300 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
              <span>360° Virtual Tour</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer ml-2"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
      </div>

      {/* Category Pills (Visible in Photo mode) */}
      {!is360Mode && (
        <div className="px-6 py-2 flex items-center justify-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                const firstMatch = photos.findIndex((p) => cat === 'All' || p.category === cat);
                if (firstMatch !== -1) setCurrentIndex(firstMatch);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-white text-[#131b2e]'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Main Viewing Area */}
      <div
        className="flex-1 relative flex items-center justify-center overflow-hidden p-4"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous photo"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all z-20 cursor-pointer border border-white/10"
        >
          <span className="material-symbols-outlined text-2xl">chevron_left</span>
        </button>

        <button
          onClick={handleNext}
          aria-label="Next photo"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all z-20 cursor-pointer border border-white/10"
        >
          <span className="material-symbols-outlined text-2xl">chevron_right</span>
        </button>

        {/* 360 Panorama Mode */}
        {is360Mode ? (
          <div className="w-full h-full max-w-5xl relative rounded-2xl overflow-hidden border border-white/20 cursor-grab active:cursor-grabbing shadow-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-75"
              style={{
                backgroundImage: `url('${currentPhoto.url}')`,
                transform: `scale(1.25) translateX(${panX * 0.15}px)`,
                backgroundPosition: `${50 + panX * 0.05}% center`,
              }}
            />
            {/* 360 HUD Overlay */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl text-white text-xs border border-white/10 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#fea619] animate-spin">sync</span>
              <div>
                <p className="font-bold">360° Interactive Panorama</p>
                <p className="text-[10px] text-gray-300">Click &amp; drag left/right to look around</p>
              </div>
            </div>

            {/* Hotspots */}
            <div className="absolute top-1/3 left-1/4 -translate-x-1/2 bg-[#005a71]/90 text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-lg flex items-center gap-1 border border-white/30 animate-bounce">
              <span className="material-symbols-outlined text-[14px]">photo_camera</span>
              <span>Scenic Viewpoint</span>
            </div>
            <div className="absolute bottom-1/3 right-1/4 -translate-x-1/2 bg-[#fea619]/90 text-[#2a1700] px-2.5 py-1 rounded-full text-[11px] font-bold shadow-lg flex items-center gap-1 border border-white/30">
              <span className="material-symbols-outlined text-[14px]">explore</span>
              <span>Alpine Pass Route</span>
            </div>
          </div>
        ) : (
          /* Standard High-Res Photo View */
          <div className="max-w-5xl max-h-[70vh] flex flex-col items-center justify-center">
            <img
              src={currentPhoto.url}
              alt={currentPhoto.title}
              className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
            />
          </div>
        )}
      </div>

      {/* Bottom Info & Thumbnails Bar */}
      <div className="px-6 py-4 bg-black/70 backdrop-blur-md border-t border-white/10 text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#fea619] uppercase tracking-wider">
            {currentPhoto.location} • {currentPhoto.category}
          </span>
          <h4 className="text-base font-bold text-white mt-0.5">{currentPhoto.title}</h4>
          <p className="text-xs text-gray-300 mt-0.5">{currentPhoto.subtitle}</p>
        </div>

        {/* Filmstrip Thumbnails */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-md py-1">
          {photos.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-14 h-10 rounded-lg overflow-hidden shrink-0 transition-all border-2 cursor-pointer ${
                currentIndex === idx
                  ? 'border-[#fea619] scale-105'
                  : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
