import React, { useState } from 'react';

interface CustomItineraryModalProps {
  onClose: () => void;
}

export const CustomItineraryModal: React.FC<CustomItineraryModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['Swiss Alps & Lucerne', 'Dolomites Peaks']);
  const [duration, setDuration] = useState('10-12 Days');
  const [travelStyle, setTravelStyle] = useState('First-Class Rail & Private Chauffeur');
  const [groupSize, setGroupSize] = useState('2 Guests (Private Couple)');
  const [budgetTier, setBudgetTier] = useState('Ultra-Luxury ($5,000+ pp)');
  const [specialInterests, setSpecialInterests] = useState<string[]>(['Michelin Dining', 'Scenic Photography', 'Alpine Hiking']);
  const [contactName, setContactName] = useState('Sophie Montgomery');
  const [contactEmail, setContactEmail] = useState('sophie.montgomery@example.com');
  const [notes, setNotes] = useState('We would love a private chocolate tasting in Zurich and a chartered Riva boat on Lake Como.');
  const [submitted, setSubmitted] = useState(false);

  const regions = [
    'Swiss Alps & Lucerne',
    'Zermatt & Matterhorn',
    'Austrian Tyrol & Salzburg',
    'Dolomites Peaks',
    'Venice & Grand Canal',
    'Lake Como & Bellagio',
    'Bavarian Castles & Munich',
  ];

  const interestOptions = [
    'Michelin Dining',
    'Scenic Photography',
    'Wine Tasting & Vineyards',
    'Alpine Hiking',
    'Private Museum Tours',
    'Helicopter Transfers',
    'Spa & Thermal Baths',
  ];

  const toggleRegion = (r: string) => {
    setSelectedRegions((prev) =>
      prev.includes(r) ? prev.filter((item) => item !== r) : [...prev, r]
    );
  };

  const toggleInterest = (i: string) => {
    setSpecialInterests((prev) =>
      prev.includes(i) ? prev.filter((item) => item !== i) : [...prev, i]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-black/10">
        <div className="px-6 py-4 bg-[#005a71] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffddb8] text-2xl">magic_button</span>
            <div>
              <h3 className="text-lg font-bold">Tailor Your Bespoke Expedition</h3>
              <p className="text-xs text-[#d3f1ff]">Private concierge travel planning crafted in 24 hours</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#d3f1ff] text-[#005a71] flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-3xl">mark_email_read</span>
              </div>
              <h4 className="text-2xl font-bold text-[#131b2e]">Bespoke Request Received!</h4>
              <p className="text-sm text-[#3f484c] max-w-md mx-auto leading-relaxed">
                Senior Tour Architect <strong>Stefan Gruber</strong> is curating your personalized private itinerary based on your selections. A full proposal with day-by-day map and pricing will arrive at <strong>{contactEmail}</strong> within 24 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-[#005a71] text-white text-xs font-bold hover:bg-[#0e7490] transition-colors"
                >
                  Return to Itinerary
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Regions selection */}
              <div>
                <label className="block text-xs font-bold text-[#131b2e] uppercase tracking-wider mb-2">
                  1. Which alpine regions would you like to explore?
                </label>
                <div className="flex flex-wrap gap-2">
                  {regions.map((reg) => (
                    <button
                      key={reg}
                      type="button"
                      onClick={() => toggleRegion(reg)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                        selectedRegions.includes(reg)
                          ? 'bg-[#005a71] text-white border-[#005a71] shadow-2xs'
                          : 'bg-[#f2f3ff] text-[#3f484c] border-black/5 hover:bg-[#eaedff]'
                      }`}
                    >
                      {selectedRegions.includes(reg) && '✓ '}
                      {reg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration and Travel Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] uppercase tracking-wider mb-1.5">
                    2. Ideal Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-black/15 text-xs text-[#131b2e] outline-none focus:border-[#005a71]"
                  >
                    <option>7-9 Days (Essential Highlights)</option>
                    <option>10-12 Days (Grand Expedition)</option>
                    <option>14-18 Days (Deep Immersion)</option>
                    <option>21+ Days (Ultimate Grand Tour)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#131b2e] uppercase tracking-wider mb-1.5">
                    3. Travel Mode Preference
                  </label>
                  <select
                    value={travelStyle}
                    onChange={(e) => setTravelStyle(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-black/15 text-xs text-[#131b2e] outline-none focus:border-[#005a71]"
                  >
                    <option>First-Class Rail &amp; Private Chauffeur</option>
                    <option>Dedicated Private Mercedes V-Class Only</option>
                    <option>Helicopter &amp; Luxury Express Rail</option>
                    <option>Self-Drive Luxury Sports Car (Porsche/Aston Martin)</option>
                  </select>
                </div>
              </div>

              {/* Special Interests */}
              <div>
                <label className="block text-xs font-bold text-[#131b2e] uppercase tracking-wider mb-2">
                  4. Special Curations &amp; Passions
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleInterest(opt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                        specialInterests.includes(opt)
                          ? 'bg-[#fea619] text-[#2a1700] border-[#fea619] shadow-2xs font-bold'
                          : 'bg-[#f2f3ff] text-[#3f484c] border-black/5 hover:bg-[#eaedff]'
                      }`}
                    >
                      {specialInterests.includes(opt) && '★ '}
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-2 border-t border-black/5 space-y-3">
                <label className="block text-xs font-bold text-[#131b2e] uppercase tracking-wider">
                  5. Where should we send your private proposal?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#6f787d] mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-black/15 text-xs outline-none focus:border-[#005a71]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6f787d] mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-black/15 text-xs outline-none focus:border-[#005a71]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#6f787d] mb-1">Specific Wishes or Dates</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-black/15 text-xs outline-none focus:border-[#005a71]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-[#6f787d] hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#005a71] hover:bg-[#0e7490] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>Generate Custom Itinerary</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
