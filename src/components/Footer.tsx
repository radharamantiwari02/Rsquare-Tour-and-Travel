import React, { useState } from 'react';

interface FooterProps {
  onSelectDestination?: (dest: string) => void;
  onOpenLegalModal?: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectDestination, onOpenLegalModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="w-full bg-white text-[#131b2e] shadow-[0_-1px_12px_rgba(0,0,0,0.03)] border-t border-black/[0.04] mt-12">
      {/* Newsletter Signup Banner */}
      <div className="bg-[#f2f3ff] py-10 px-4 md:px-6 border-b border-black/[0.03]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-[#005a71]">
              Insider Privileges
            </span>
            <h3 className="font-headline-lg text-2xl md:text-3xl font-bold text-[#131b2e] mt-1 tracking-tight">
              Get Exclusive Secret Deals
            </h3>
            <p className="font-body-sm text-xs md:text-sm text-[#3f484c] mt-1.5 leading-relaxed">
              Join 45,000+ luxury globetrotters receiving private flash sales, curated seasonal itineraries, and priority bookings.
            </p>
          </div>

          {subscribed ? (
            <div className="bg-white px-6 py-3.5 rounded-xl border border-[#005a71]/30 shadow-xs flex items-center gap-2.5 text-[#005a71] animate-fadeIn">
              <span className="material-symbols-outlined text-2xl">verified</span>
              <div>
                <p className="font-bold text-sm">Welcome to Rsquare Insiders Club!</p>
                <p className="text-xs text-[#3f484c]">A 15% voucher code has been dispatched to {email}.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2 items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your personal email"
                className="w-full sm:w-80 h-12 px-4 rounded-lg bg-white text-[#131b2e] placeholder:text-[#6f787d] font-body-sm text-sm outline-none focus:ring-2 focus:ring-[#005a71] shadow-[0_1px_3px_rgba(15,23,42,0.05)] border border-black/10"
              />
              <button
                type="submit"
                className="w-full sm:w-auto h-12 px-6 rounded-lg bg-[#005a71] text-white font-label-md text-sm font-bold hover:bg-[#0e7490] transition-all flex items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,90,113,0.2)] cursor-pointer whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
                <span>Unlock Offers</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-10">
          {/* Logo & Bio Column */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img
                  alt="Rsquare Tour & Travels Logo"
                  className="h-8 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1VHz-t7CINbkUp0BwgdBP7jq-lt2pUveAtzn4vZnKoVBjZtpwcBZHiQtve8aWJT7oVrHcsUcVUxkBW7AeqElZutf4s1___LkL3c2yZET9yU4hGt9Kxw_F_Tpc_H3ziao6yez2iqfp-UrfnnrB35VDt6rRGienQPWTnop0cP3RIIzuwH4r2E4HxHmazbZQN1ksqLQp91f_aQohkstLJFPY4vf4zktz7VeqA0VIYGOEy8N77PIt7FbaaMjlFx"
                />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-lg text-[#005a71] font-bold leading-none">
                    Rsquare
                  </span>
                  <span className="font-label-sm text-[10px] text-[#6f787d] tracking-wider uppercase leading-tight font-semibold">
                    Tour &amp; Travels
                  </span>
                </div>
              </div>
              <p className="font-body-sm text-xs md:text-sm text-[#3f484c] leading-relaxed">
                Architecting unforgettable private journeys, premium expeditions, and bespoke global travel encounters tailored to discerning wanderers since 2012.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-6">
              <a
                href="#instagram"
                aria-label="Explore Instagram"
                className="w-9 h-9 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3f484c] hover:bg-[#005a71] hover:text-white transition-all shadow-2xs"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </a>
              <a
                href="#linkedin"
                aria-label="Connect on LinkedIn"
                className="w-9 h-9 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3f484c] hover:bg-[#005a71] hover:text-white transition-all shadow-2xs"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
              </a>
              <a
                href="#youtube"
                aria-label="Watch on YouTube"
                className="w-9 h-9 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3f484c] hover:bg-[#005a71] hover:text-white transition-all shadow-2xs"
              >
                <span className="material-symbols-outlined text-[18px]">smart_display</span>
              </a>
              <a
                href="#support"
                aria-label="Traveler Support"
                className="w-9 h-9 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3f484c] hover:bg-[#005a71] hover:text-white transition-all shadow-2xs"
              >
                <span className="material-symbols-outlined text-[18px]">headset_mic</span>
              </a>
            </div>
          </div>

          {/* Top Destinations */}
          <div>
            <h4 className="font-label-md text-xs font-bold uppercase tracking-wider text-[#131b2e] mb-4">
              Top Destinations
            </h4>
            <ul className="space-y-2.5 font-body-sm text-xs text-[#3f484c]">
              {['Switzerland', 'Bali', 'Japan', 'Amalfi Coast', 'Iceland', 'Kenya'].map((d) => (
                <li key={d}>
                  <button
                    onClick={() => onSelectDestination && onSelectDestination(d)}
                    className="hover:text-[#005a71] transition-colors text-left cursor-pointer"
                  >
                    {d}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Categories */}
          <div>
            <h4 className="font-label-md text-xs font-bold uppercase tracking-wider text-[#131b2e] mb-4">
              Tour Categories
            </h4>
            <ul className="space-y-2.5 font-body-sm text-xs text-[#3f484c]">
              {['Honeymoon', 'Adventure & Trekking', 'Luxury Escapes', 'Cultural Heritage', 'Family Holidays'].map((cat) => (
                <li key={cat}>
                  <a href={`#${cat}`} className="hover:text-[#005a71] transition-colors">
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Trust */}
          <div>
            <h4 className="font-label-md text-xs font-bold uppercase tracking-wider text-[#131b2e] mb-4">
              Company &amp; Trust
            </h4>
            <ul className="space-y-2.5 font-body-sm text-xs text-[#3f484c]">
              {['Our Story', 'Certified Guides', 'Safety Guarantee', 'Travel Insurance', 'Reviews & Press'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onOpenLegalModal && onOpenLegalModal(item)}
                    className="hover:text-[#005a71] transition-colors text-left cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="font-label-md text-xs font-bold uppercase tracking-wider text-[#131b2e] mb-4">
              Support &amp; Legal
            </h4>
            <ul className="space-y-2.5 font-body-sm text-xs text-[#3f484c]">
              {['Contact 24/7', 'FAQs', 'Booking Terms', 'Privacy Policy', 'Cookie Preferences'].map((legal) => (
                <li key={legal}>
                  <button
                    onClick={() => onOpenLegalModal && onOpenLegalModal(legal)}
                    className="hover:text-[#005a71] transition-colors text-left cursor-pointer"
                  >
                    {legal}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4 Trust Badges Ribbon (Exact match to HTML) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 my-8 rounded-xl bg-[#f2f3ff] px-4 border border-black/[0.03]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#005a71] text-2xl">verified</span>
            <div>
              <p className="font-label-md text-xs md:text-sm font-bold text-[#131b2e]">IATA Accredited</p>
              <p className="font-label-sm text-[11px] text-[#6f787d]">Verified Global Agent</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#005a71] text-2xl">support_agent</span>
            <div>
              <p className="font-label-md text-xs md:text-sm font-bold text-[#131b2e]">24/7 Concierge Support</p>
              <p className="font-label-sm text-[11px] text-[#6f787d]">Worldwide Assistance</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#005a71] text-2xl">lock</span>
            <div>
              <p className="font-label-md text-xs md:text-sm font-bold text-[#131b2e]">100% Secure Payments</p>
              <p className="font-label-sm text-[11px] text-[#6f787d]">Bank-Grade Encryption</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#fea619] text-2xl">star</span>
            <div>
              <p className="font-label-md text-xs md:text-sm font-bold text-[#131b2e]">4.9/5 TrustScore</p>
              <p className="font-label-sm text-[11px] text-[#6f787d]">Based on 12k+ Reviews</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between text-[#3f484c] font-body-sm text-xs gap-3 border-t border-black/5">
          <p>© 2025 Rsquare Tour &amp; Travels Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 font-label-sm text-xs">
            <a href="#terms" className="hover:text-[#005a71] transition-colors">Terms of Service</a>
            <a href="#privacy" className="hover:text-[#005a71] transition-colors">Privacy Statement</a>
            <a href="#security" className="hover:text-[#005a71] transition-colors">Security Overview</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
