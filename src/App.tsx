/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { PhotoCollage } from './components/PhotoCollage';
import { HighlightsRibbon } from './components/HighlightsRibbon';
import { Overview } from './components/Overview';
import { ItineraryAccordion } from './components/ItineraryAccordion';
import { InteractiveMap } from './components/InteractiveMap';
import { IncludedExcluded } from './components/IncludedExcluded';
import { Accommodations } from './components/Accommodations';
import { Reviews } from './components/Reviews';
import { BookingWidget, BookingDetails } from './components/BookingWidget';
import { Footer } from './components/Footer';
import { PhotoGalleryModal } from './components/PhotoGalleryModal';
import { BookingModal } from './components/BookingModal';
import { CustomItineraryModal } from './components/CustomItineraryModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ShareModal } from './components/ShareModal';
import { ConciergeChatModal } from './components/ConciergeChatModal';
import { DestinationsModal } from './components/DestinationsModal';

import { MAIN_TOUR, GALLERY_PHOTOS, REVIEWS_DATA, CURRENCY_RATES, OTHER_TOURS } from './data/tourData';
import { CurrencyCode, Review, TourPackage } from './types/tour';

export default function App() {
  const [currentTour, setCurrentTour] = useState<TourPackage>(MAIN_TOUR);
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [activeTab, setActiveTab] = useState<string>('custom-itinerary'); // 'custom-itinerary' is active in screenshot
  
  // Wishlist state
  const [wishlist, setWishlist] = useState<TourPackage[]>([MAIN_TOUR]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Gallery Modal
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryMode, setGalleryMode] = useState<'photo' | '360'>('photo');

  // Booking Checkout Modal
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeBookingData, setActiveBookingData] = useState<BookingDetails | null>(null);

  // Custom Itinerary / Bespoke Planner Modal
  const [customPlannerOpen, setCustomPlannerOpen] = useState(false);

  // Share Modal
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Concierge Phone / WhatsApp Modal
  const [conciergeModal, setConciergeModal] = useState<{ open: boolean; mode: 'phone' | 'whatsapp' }>({
    open: false,
    mode: 'whatsapp',
  });

  // Nav View Modal (Destinations, Tour Packages, Deals, About, Contact)
  const [navModalType, setNavModalType] = useState<'destinations' | 'packages' | 'deals' | 'about' | 'contact' | null>(null);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const isSavedInWishlist = wishlist.some((t) => t.id === currentTour.id);

  const toggleWishlist = () => {
    if (isSavedInWishlist) {
      setWishlist((prev) => prev.filter((t) => t.id !== currentTour.id));
      showToast('Removed from your saved expeditions');
    } else {
      setWishlist((prev) => [...prev, currentTour]);
      showToast('Added to your wishlist!');
    }
  };

  const handleSelectNavTab = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'custom-itinerary') {
      setCustomPlannerOpen(true);
    } else if (tabId === 'destinations') {
      setNavModalType('destinations');
    } else if (tabId === 'tour-packages') {
      setNavModalType('packages');
    } else if (tabId === 'special-deals') {
      setNavModalType('deals');
    } else if (tabId === 'about-us') {
      setNavModalType('about');
    } else if (tabId === 'contact') {
      setNavModalType('contact');
    }
  };

  const handleOpenGallery = (index: number, mode: 'photo' | '360' = 'photo') => {
    setGalleryIndex(index);
    setGalleryMode(mode);
    setGalleryOpen(true);
  };

  const handleBookNow = (details: BookingDetails) => {
    setActiveBookingData(details);
    setBookingModalOpen(true);
  };

  const handleReserveDeposit = (details: BookingDetails) => {
    setActiveBookingData({ ...details, depositOnly: true });
    setBookingModalOpen(true);
  };

  const handleAddReview = (newReview: Omit<Review, 'id'>) => {
    const fullReview: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
    };
    setReviews((prev) => [fullReview, ...prev]);
    showToast('Thank you! Your verified review has been published.');
  };

  const currentRate = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const startingPriceDisplay = `${currentRate.symbol}${Math.round(
    currentTour.startingPrice * currentRate.rate
  ).toLocaleString()}`;

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] min-h-screen antialiased flex flex-col justify-between">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#005a71] text-white px-4 py-2.5 rounded-xl shadow-xl border border-white/20 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px] text-[#ffddb8]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Global Header */}
      <Header
        currentTab={activeTab}
        onSelectTab={handleSelectNavTab}
        currency={currency}
        onCurrencyChange={(c) => setCurrency(c)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenPlanTrip={() => setCustomPlannerOpen(true)}
        onOpenDeals={() => setNavModalType('deals')}
      />

      {/* Main Page Content Body */}
      <main className="w-full pt-20 bg-[#faf8ff] flex-1">
        <div className="flex flex-col w-full">
          {/* Breadcrumbs & Action Bar */}
          <div className="w-full bg-[#f2f3ff] py-2 px-4 md:px-6 border-b border-black/[0.03]">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
              <nav className="flex items-center gap-1 font-body-sm text-xs md:text-sm text-[#3f484c]">
                <button
                  onClick={() => setNavModalType('destinations')}
                  className="hover:text-[#005a71] transition-colors cursor-pointer"
                >
                  Home
                </button>
                <span className="material-symbols-outlined text-[#bec8cd] text-[16px]">chevron_right</span>
                <button
                  onClick={() => setNavModalType('destinations')}
                  className="hover:text-[#005a71] transition-colors cursor-pointer"
                >
                  Destinations
                </button>
                <span className="material-symbols-outlined text-[#bec8cd] text-[16px]">chevron_right</span>
                <button
                  onClick={() => setNavModalType('destinations')}
                  className="hover:text-[#005a71] transition-colors cursor-pointer"
                >
                  Europe
                </button>
                <span className="material-symbols-outlined text-[#bec8cd] text-[16px]">chevron_right</span>
                <span className="text-[#005a71] font-semibold truncate max-w-xs md:max-w-none">
                  {currentTour.title.split(':')[0]}
                </span>
              </nav>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShareModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-[#3f484c] hover:text-[#005a71] font-label-sm text-xs transition-colors py-1 px-3 rounded-full bg-white shadow-2xs border border-black/5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">share</span>
                  <span>Share</span>
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`inline-flex items-center gap-1.5 font-label-sm text-xs transition-colors py-1 px-3 rounded-full bg-white shadow-2xs border border-black/5 cursor-pointer ${
                    isSavedInWishlist ? 'text-rose-600 font-bold' : 'text-[#3f484c] hover:text-rose-500'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: isSavedInWishlist ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                  <span>{isSavedInWishlist ? 'Saved to Wishlist' : 'Save to Wishlist'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tour Title Header Section */}
          <section className="max-w-7xl mx-auto px-4 md:px-6 pt-4 pb-2 w-full">
            {/* Badges bar */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffddb8] text-[#2a1700] font-label-sm text-xs font-bold tracking-wide uppercase shadow-2xs">
                <span className="material-symbols-outlined text-[14px] text-[#855300]">verified</span>
                Best Seller 2025
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#b9eaff] text-[#001f29] font-label-sm text-xs font-semibold shadow-2xs">
                <span className="material-symbols-outlined text-[14px]">bolt</span> Instant Confirmation
              </span>
              <span className="text-[#bec8cd] hidden sm:inline">•</span>
              <span className="font-label-sm text-xs text-[#6f787d] font-mono">
                Tour Code: {currentTour.code}
              </span>
            </div>

            {/* Title & Starting Price Banner */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <h1 className="font-headline-xl text-2xl sm:text-3xl lg:text-4xl text-[#131b2e] tracking-tight font-extrabold leading-tight">
                  {currentTour.title}
                </h1>
                <p className="font-body-md text-xs sm:text-sm text-[#3f484c] mt-1.5 flex flex-wrap items-center gap-y-1 gap-x-3">
                  <span className="flex items-center gap-1 text-[#855300] font-semibold">
                    <span
                      className="material-symbols-outlined text-[#fea619] text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span>{currentTour.rating}</span>
                    <span className="text-[#3f484c] font-normal">
                      ({reviews.length + 322} verified reviews)
                    </span>
                  </span>
                  <span className="text-[#bec8cd]">•</span>
                  <span className="flex items-center gap-1 text-[#131b2e]">
                    <span className="material-symbols-outlined text-[#005a71] text-[18px]">route</span>
                    <span>{currentTour.route}</span>
                  </span>
                  <span className="text-[#bec8cd]">•</span>
                  <span className="flex items-center gap-1 text-[#131b2e]">
                    <span className="material-symbols-outlined text-[#005a71] text-[18px]">schedule</span>
                    <span>{currentTour.duration}</span>
                  </span>
                  <span className="text-[#bec8cd]">•</span>
                  <span className="flex items-center gap-1 text-[#131b2e]">
                    <span className="material-symbols-outlined text-[#005a71] text-[18px]">groups</span>
                    <span>{currentTour.groupSize}</span>
                  </span>
                </p>
              </div>

              {/* Starting Price Box */}
              <div className="hidden xl:flex items-center gap-2 bg-[#f2f3ff] px-4 py-2 rounded-xl shadow-xs border border-black/[0.04] shrink-0">
                <div className="text-right">
                  <span className="font-label-sm text-[11px] text-[#6f787d] block leading-none font-bold">
                    Starting from
                  </span>
                  <span className="font-headline-lg text-2xl font-extrabold text-[#005a71] leading-tight">
                    {startingPriceDisplay}
                  </span>
                  <span className="font-body-sm text-[11px] text-[#3f484c] block leading-none">
                    / person
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Photo Collage Grid (5-tile interactive layout) */}
          <PhotoCollage onOpenGallery={handleOpenGallery} />

          {/* Key Highlights Ribbon Bar */}
          <HighlightsRibbon />

          {/* Main 2-Column Grid (8 cols content, 4 cols sticky booking card) */}
          <section className="max-w-7xl mx-auto px-4 md:px-6 py-4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (8 of 12) */}
              <div className="lg:col-span-8 space-y-6">
                {/* 1. Overview */}
                <Overview />

                {/* 2. Detailed Itinerary Accordion */}
                <ItineraryAccordion itinerary={currentTour.itinerary} />

                {/* 3. Interactive Route Map */}
                <InteractiveMap />

                {/* 4. What's Included vs Excluded */}
                <IncludedExcluded
                  included={currentTour.included}
                  excluded={currentTour.excluded}
                />

                {/* 5. Luxury Accommodations Showcase */}
                <Accommodations accommodations={currentTour.accommodations} />

                {/* 6. Traveler Reviews & Testimonials */}
                <Reviews reviews={reviews} onAddReview={handleAddReview} />
              </div>

              {/* Right Column (4 of 12): Sticky Booking Widget */}
              <BookingWidget
                tour={currentTour}
                currency={currency}
                onBookNow={handleBookNow}
                onReserveDeposit={handleReserveDeposit}
                onOpenConcierge={(mode) => setConciergeModal({ open: true, mode })}
              />
            </div>
          </section>
        </div>
      </main>

      {/* Global Footer */}
      <Footer
        onSelectDestination={() => setNavModalType('destinations')}
        onOpenLegalModal={(title) => {
          if (title.includes('Contact')) setConciergeModal({ open: true, mode: 'phone' });
          else setNavModalType('about');
        }}
      />

      {/* Fullscreen Photo Gallery Lightbox & 360 Tour */}
      {galleryOpen && (
        <PhotoGalleryModal
          photos={GALLERY_PHOTOS}
          initialIndex={galleryIndex}
          initialMode={galleryMode}
          onClose={() => setGalleryOpen(false)}
        />
      )}

      {/* Multi-Step Checkout Booking Modal */}
      {bookingModalOpen && activeBookingData && (
        <BookingModal
          tour={currentTour}
          bookingData={activeBookingData}
          onClose={() => setBookingModalOpen(false)}
        />
      )}

      {/* Bespoke Custom Itinerary Planner Dialog */}
      {customPlannerOpen && (
        <CustomItineraryModal onClose={() => setCustomPlannerOpen(false)} />
      )}

      {/* Saved Tours Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedTours={wishlist}
        onRemoveTour={(id) => {
          setWishlist((prev) => prev.filter((t) => t.id !== id));
          showToast('Expedition removed from wishlist');
        }}
        currency={currency}
        onSelectTour={(t) => setCurrentTour(t)}
      />

      {/* Share Modal */}
      {shareModalOpen && (
        <ShareModal
          tourTitle={currentTour.title}
          onClose={() => setShareModalOpen(false)}
        />
      )}

      {/* Concierge Live Chat & Phone Consultation Modal */}
      {conciergeModal.open && (
        <ConciergeChatModal
          mode={conciergeModal.mode}
          onClose={() => setConciergeModal({ open: false, mode: 'whatsapp' })}
        />
      )}

      {/* Destinations & Tour Packages Browse Modal */}
      {navModalType && (
        <DestinationsModal
          type={navModalType}
          onClose={() => setNavModalType(null)}
          currency={currency}
          onSelectTour={(id) => {
            const found = OTHER_TOURS.find((t) => t.id === id);
            if (found && id === 'rsq-alp-942') {
              setCurrentTour(MAIN_TOUR);
            }
          }}
          onOpenCustomPlanner={() => {
            setNavModalType(null);
            setCustomPlannerOpen(true);
          }}
        />
      )}
    </div>
  );
}
