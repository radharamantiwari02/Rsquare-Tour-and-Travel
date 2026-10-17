import React, { useState } from 'react';
import { CurrencyCode } from '../types/tour';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenPlanTrip: () => void;
  onOpenDeals: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  currency,
  onCurrencyChange,
  wishlistCount,
  onOpenWishlist,
  onOpenPlanTrip,
  onOpenDeals,
}) => {
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'destinations', label: 'Destinations' },
    { id: 'tour-packages', label: 'Tour Packages' },
    { id: 'custom-itinerary', label: 'Custom Itinerary' },
    { id: 'special-deals', label: 'Special Deals' },
    { id: 'about-us', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const currencies: { code: CurrencyCode; symbol: string; label: string }[] = [
    { code: 'USD', symbol: '$', label: 'USD ($)' },
    { code: 'EUR', symbol: '€', label: 'EUR (€)' },
    { code: 'GBP', symbol: '£', label: 'GBP (£)' },
    { code: 'CHF', symbol: 'CHF', label: 'CHF (CHF)' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-black/[0.04]">
      {/* Top Announcement Bar */}
      <div 
        onClick={onOpenDeals}
        className="bg-[#0e7490] text-[#d3f1ff] px-4 py-1 text-center cursor-pointer hover:bg-[#0c5a70] transition-colors"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[#ffddb8] text-[16px]">auto_awesome</span>
          <p className="font-label-sm font-semibold tracking-wide text-xs md:text-sm">
            Summer 2025 Early Bird Savings: Enjoy up to 25% off all European &amp; Asian Expeditions. Book by June 30.
          </p>
          <span className="text-xs bg-[#fea619] text-[#2a1700] px-1.5 py-0.5 rounded font-bold uppercase hidden sm:inline">
            Claim Offer
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => onSelectTab('tour-packages')}
        >
          <img
            alt="Rsquare Tour & Travels Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1VHz-t7CINbkUp0BwgdBP7jq-lt2pUveAtzn4vZnKoVBjZtpwcBZHiQtve8aWJT7oVrHcsUcVUxkBW7AeqElZutf4s1___LkL3c2yZET9yU4hGt9Kxw_F_Tpc_H3ziao6yez2iqfp-UrfnnrB35VDt6rRGienQPWTnop0cP3RIIzuwH4r2E4HxHmazbZQN1ksqLQp91f_aQohkstLJFPY4vf4zktz7VeqA0VIYGOEy8N77PIt7FbaaMjlFx"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-lg md:text-xl text-[#005a71] tracking-tight font-bold leading-none">
              Rsquare
            </span>
            <span className="font-label-sm text-[10px] md:text-xs text-[#6f787d] tracking-wider uppercase leading-tight font-semibold">
              Tour &amp; Travels
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1.5 rounded-lg font-label-md text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#e2e7ff] text-[#005a71] font-bold shadow-xs'
                    : 'text-[#3f484c] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Currency / Language Selector */}
          <div className="relative">
            <button
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f2f3ff] text-[#3f484c] font-label-sm text-xs cursor-pointer hover:bg-[#eaedff] hover:text-[#131b2e] transition-all border border-black/[0.04]"
            >
              <span className="material-symbols-outlined text-[16px]">language</span>
              <span>EN</span>
              <span className="text-[#bec8cd]">|</span>
              <span className="font-semibold">{currency}</span>
              <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </button>

            {currencyOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-black/10 py-1.5 z-50">
                <div className="px-3 py-1 text-[11px] font-bold uppercase text-[#6f787d] tracking-wider">
                  Select Currency
                </div>
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      onCurrencyChange(c.code);
                      setCurrencyOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#f2f3ff] ${
                      currency === c.code ? 'font-bold text-[#005a71] bg-[#e2e7ff]/60' : 'text-[#131b2e]'
                    }`}
                  >
                    <span>{c.label}</span>
                    {currency === c.code && (
                      <span className="material-symbols-outlined text-[16px] text-[#005a71]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Saved Tours / Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            aria-label="Saved Tours"
            className="relative p-2 rounded-full text-[#3f484c] hover:bg-[#eaedff] hover:text-[#131b2e] transition-colors flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">favorite</span>
            {wishlistCount > 0 ? (
              <span className="absolute top-0 right-0 min-w-4 h-4 px-1 bg-[#fea619] text-[#2a1700] rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs">
                {wishlistCount}
              </span>
            ) : (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#fea619] rounded-full" />
            )}
          </button>

          {/* Plan My Trip CTA */}
          <button
            onClick={onOpenPlanTrip}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#005a71] hover:bg-[#0e7490] text-white font-label-md text-sm shadow-[0_2px_8px_rgba(0,90,113,0.18)] transition-all cursor-pointer font-semibold"
          >
            <span className="material-symbols-outlined text-[#ffddb8] text-[18px]">explore</span>
            <span>Plan My Trip</span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="relative flex items-center cursor-pointer p-0.5 rounded-full ring-2 ring-transparent hover:ring-[#005a71]/30 transition-all"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBglZJbQMY54d8EKf7g5-BFqv1mgkdQHVYk9cbrYZx03g2HB0q3fNlB2cgaKmkKeBf0CJ57RoHTVF5nrE0HcidrYKlwl_kIEicaM_rEzxdHiVooDGlNlwkq6YRTpfrqGwmyg8pglkAksuIfOmWb61F9hg9u8j17LpjQQUUCnr1_d6YkwHkz4Vj3zg1D7VBhZsImKIC3Y2nMkS4WYsn3Vyf-2TzHZbox8xbnFg6rsXfmLKKLVjtfwwR8Lw"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#fea619] rounded-full shadow-[0_0_0_2px_#ffffff]"></span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-black/10 py-2 z-50">
                <div className="px-4 py-2 border-b border-black/5">
                  <p className="font-label-md text-sm font-bold text-[#131b2e]">Sophie Montgomery</p>
                  <p className="text-xs text-[#6f787d]">Club Wanderer • Elite Tier</p>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => { onOpenWishlist(); setProfileOpen(false); }}
                    className="w-full px-4 py-2 text-left text-xs text-[#3f484c] hover:bg-[#f2f3ff] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#005a71]">bookmark</span>
                    <span>Saved Expeditions ({wishlistCount})</span>
                  </button>
                  <button 
                    onClick={() => { onSelectTab('custom-itinerary'); setProfileOpen(false); }}
                    className="w-full px-4 py-2 text-left text-xs text-[#3f484c] hover:bg-[#f2f3ff] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#005a71]">history_edu</span>
                    <span>Custom Quotes & Itineraries</span>
                  </button>
                  <button 
                    onClick={() => { onOpenPlanTrip(); setProfileOpen(false); }}
                    className="w-full px-4 py-2 text-left text-xs text-[#3f484c] hover:bg-[#f2f3ff] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#005a71]">support_agent</span>
                    <span>Dedicated Concierge Line</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[#3f484c] hover:bg-[#eaedff]"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-black/10 px-4 py-3 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg font-label-md text-sm ${
                currentTab === item.id
                  ? 'bg-[#e2e7ff] text-[#005a71] font-bold'
                  : 'text-[#3f484c] hover:bg-[#f2f3ff]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-black/5 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenPlanTrip();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-[#005a71] text-white font-label-md text-sm font-semibold flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[#ffddb8] text-[18px]">explore</span>
              <span>Plan My Trip</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
