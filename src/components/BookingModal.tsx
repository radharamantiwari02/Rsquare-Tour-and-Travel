import React, { useState } from 'react';
import { BookingDetails } from './BookingWidget';
import { TourPackage } from '../types/tour';

interface BookingModalProps {
  tour: TourPackage;
  bookingData: BookingDetails;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  tour,
  bookingData,
  onClose,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isDeposit, setIsDeposit] = useState<boolean>(!!bookingData.depositOnly);

  // Form Fields
  const [firstName, setFirstName] = useState('Sophie');
  const [lastName, setLastName] = useState('Montgomery');
  const [email, setEmail] = useState('sophie.montgomery@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [country, setCountry] = useState('United States');
  const [dietary, setDietary] = useState('None');
  const [bedPreference, setBedPreference] = useState('1 King Bed');
  const [celebration, setCelebration] = useState('None / Leisure Expedition');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [expiry, setExpiry] = useState('10/28');
  const [cvv, setCvv] = useState('888');

  const bookingReference = 'RSQ-ALP-2025-9428';
  const amountToCharge = isDeposit ? 250 : bookingData.totalPriceUSD;

  const handleNext = () => setStep((s) => s + 1);
  const handlePrev = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-black/10">
        {/* Header */}
        <div className="px-6 py-4 bg-[#f2f3ff] border-b border-black/5 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#005a71]">
              Instant Reservation • ATOL #9281 Protected
            </span>
            <h3 className="text-lg font-bold text-[#131b2e] leading-snug">
              {step === 5 ? 'Booking Confirmed!' : 'Reserve The Grand Alpine Odyssey'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-[#6f787d] hover:text-black flex items-center justify-center shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Stepper Indicator */}
        {step < 5 && (
          <div className="px-6 py-2.5 bg-white border-b border-black/5 flex items-center justify-between text-xs">
            {['1. Trip Review', '2. Traveler Info', '3. Preferences', '4. Payment'].map((label, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-1.5 font-semibold ${
                  step === idx + 1
                    ? 'text-[#005a71]'
                    : step > idx + 1
                    ? 'text-emerald-700'
                    : 'text-[#bec8cd]'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                    step === idx + 1
                      ? 'bg-[#005a71] text-white'
                      : step > idx + 1
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {step > idx + 1 ? '✓' : idx + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {/* STEP 1: Trip Summary */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#f2f3ff] border border-black/[0.03] space-y-2">
                <span className="text-xs bg-[#b9eaff] text-[#001f29] px-2 py-0.5 rounded font-bold uppercase">
                  Selected Expedition
                </span>
                <h4 className="font-bold text-base text-[#131b2e]">{tour.title}</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#3f484c] pt-1">
                  <div>
                    <span className="font-bold text-[#131b2e]">Departure Date:</span> {bookingData.selectedDate}
                  </div>
                  <div>
                    <span className="font-bold text-[#131b2e]">Duration:</span> 10 Days / 9 Nights
                  </div>
                  <div>
                    <span className="font-bold text-[#131b2e]">Travelers:</span> {bookingData.adults} Adults
                    {bookingData.children > 0 && `, ${bookingData.children} Children`}
                  </div>
                  <div>
                    <span className="font-bold text-[#131b2e]">Room Tier:</span> {bookingData.roomType.toUpperCase()}
                  </div>
                </div>
              </div>

              {bookingData.selectedAddons.length > 0 && (
                <div className="p-3 rounded-xl bg-white border border-black/10 space-y-1">
                  <p className="text-xs font-bold text-[#131b2e]">Selected Journey Enhancements:</p>
                  {bookingData.selectedAddons.map((addon, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#005a71]">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                      <span>{addon}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Payment Choice (Full vs Deposit) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#131b2e]">Choose Payment Option</label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setIsDeposit(true)}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      isDeposit
                        ? 'border-[#fea619] bg-[#ffddb8]/20'
                        : 'border-black/10 hover:border-black/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#855300]">Reserve with Deposit</span>
                      <span className="material-symbols-outlined text-[#fea619] text-xl">
                        {isDeposit ? 'radio_button_checked' : 'radio_button_unchecked'}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-[#131b2e] mt-1">$250 USD</p>
                    <p className="text-[11px] text-[#6f787d]">Pay balance 30 days before departure</p>
                  </div>

                  <div
                    onClick={() => setIsDeposit(false)}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      !isDeposit
                        ? 'border-[#005a71] bg-[#b9eaff]/20'
                        : 'border-black/10 hover:border-black/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#005a71]">Full Payment</span>
                      <span className="material-symbols-outlined text-[#005a71] text-xl">
                        {!isDeposit ? 'radio_button_checked' : 'radio_button_unchecked'}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-[#131b2e] mt-1">{bookingData.convertedTotal}</p>
                    <p className="text-[11px] text-[#6f787d]">Lock in early bird promotion today</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Lead Passenger Info */}
          {step === 2 && (
            <div className="space-y-3.5">
              <p className="text-xs text-[#6f787d]">
                Enter lead traveler details. All boarding passes and hotel reservations will match this name.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-black/15 text-sm focus:border-[#005a71] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-black/15 text-sm focus:border-[#005a71] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-black/15 text-sm focus:border-[#005a71] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">Mobile Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-black/15 text-sm focus:border-[#005a71] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">Country of Passport / Residence</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-black/15 text-sm text-[#131b2e] focus:border-[#005a71] outline-none"
                >
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Germany</option>
                  <option>Switzerland</option>
                  <option>Singapore</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: Dietary & Preferences */}
          {step === 3 && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Dietary Requirements &amp; Allergies
                </label>
                <select
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-black/15 text-sm text-[#131b2e] focus:border-[#005a71] outline-none"
                >
                  <option>None (No restrictions)</option>
                  <option>Vegetarian</option>
                  <option>Vegan</option>
                  <option>Gluten-Free</option>
                  <option>Halal</option>
                  <option>Kosher</option>
                  <option>Pescatarian</option>
                </select>
                <p className="text-[11px] text-[#6f787d] mt-1">
                  Notified in advance to all Michelin-starred venues and Glacier Express chefs.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">Bedding Preference</label>
                <div className="grid grid-cols-2 gap-2">
                  {['1 King Bed', '2 Twin Beds'].map((bed) => (
                    <button
                      key={bed}
                      type="button"
                      onClick={() => setBedPreference(bed)}
                      className={`p-2.5 rounded-lg border text-xs font-semibold text-center cursor-pointer transition-colors ${
                        bedPreference === bed
                          ? 'border-[#005a71] bg-[#e2e7ff] text-[#005a71]'
                          : 'border-black/15 text-[#3f484c] hover:bg-gray-50'
                      }`}
                    >
                      {bed}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">Special Occasion</label>
                <select
                  value={celebration}
                  onChange={(e) => setCelebration(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-black/15 text-sm text-[#131b2e] focus:border-[#005a71] outline-none"
                >
                  <option>None / Leisure Expedition</option>
                  <option>Wedding Anniversary (Champagne complimentary)</option>
                  <option>Honeymoon</option>
                  <option>Milestone Birthday</option>
                  <option>Retirement Celebration</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 4: Payment Simulation */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-[#f2f3ff] p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#6f787d]">Amount to Authorize Today</span>
                  <p className="text-2xl font-bold text-[#005a71]">
                    ${amountToCharge.toLocaleString()} USD
                  </p>
                  <span className="text-[11px] text-[#855300] font-semibold">
                    {isDeposit ? 'Hold Deposit • Refundable until 30 days prior' : 'Full Tour Payment'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#005a71] bg-white px-3 py-1.5 rounded-lg shadow-2xs font-semibold">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span>256-Bit SSL</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-black/15 text-sm focus:border-[#005a71] outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#131b2e] mb-1">Expiration (MM/YY)</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-black/15 text-sm focus:border-[#005a71] outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#131b2e] mb-1">CVV Security Code</label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-black/15 text-sm focus:border-[#005a71] outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg text-amber-900 text-xs">
                <span className="material-symbols-outlined text-[18px] text-amber-700">shield</span>
                <span>Protected by Rsquare ATOL &amp; IATA Guarantee. 100% money back if cancelled.</span>
              </div>
            </div>
          )}

          {/* STEP 5: Instant Booking Confirmation Voucher */}
          {step === 5 && (
            <div className="space-y-4 text-center py-2 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>

              <div>
                <span className="text-xs bg-[#b9eaff] text-[#001f29] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  Reservation Confirmed
                </span>
                <h3 className="text-xl font-bold text-[#131b2e] mt-2">
                  Welcome to The Grand Alpine Odyssey!
                </h3>
                <p className="text-xs text-[#6f787d] mt-1">
                  A comprehensive confirmation packet and receipt has been transmitted to{' '}
                  <strong className="text-[#131b2e]">{email}</strong>.
                </p>
              </div>

              {/* Printable Voucher Ticket Card */}
              <div className="bg-[#f2f3ff] p-5 rounded-2xl border-2 border-dashed border-[#005a71]/40 text-left space-y-3">
                <div className="flex justify-between items-center border-b border-black/10 pb-2">
                  <div>
                    <span className="text-[10px] text-[#6f787d] uppercase font-bold">Booking Reference</span>
                    <p className="text-base font-bold text-[#005a71] font-mono">{bookingReference}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#6f787d] uppercase font-bold">Departure Date</span>
                    <p className="text-xs font-bold text-[#131b2e]">{bookingData.selectedDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#3f484c]">
                  <div>
                    <span className="font-bold text-[#131b2e]">Lead Guest:</span> {firstName} {lastName}
                  </div>
                  <div>
                    <span className="font-bold text-[#131b2e]">Party Size:</span> {bookingData.adults} Adults
                  </div>
                  <div>
                    <span className="font-bold text-[#131b2e]">Dietary:</span> {dietary}
                  </div>
                  <div>
                    <span className="font-bold text-[#131b2e]">Amount Charged:</span> ${amountToCharge.toLocaleString()} USD
                  </div>
                </div>

                <div className="pt-2 border-t border-black/10 text-[11px] text-[#6f787d] flex items-center justify-between">
                  <span>Concierge Tour Director: Stefan Gruber</span>
                  <span className="text-emerald-700 font-bold">✓ Bonded ATOL #9281</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-[#f2f3ff] border-t border-black/5 flex items-center justify-between">
          {step < 5 ? (
            <>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-[#3f484c] hover:bg-white transition-colors cursor-pointer"
                >
                  Back
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-[#6f787d] hover:bg-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-lg bg-[#005a71] hover:bg-[#0e7490] text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{step === 4 ? `Confirm & Pay $${amountToCharge.toLocaleString()}` : 'Continue'}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg border border-[#005a71] text-[#005a71] text-xs font-bold hover:bg-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Print Voucher</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg bg-[#005a71] text-white text-xs font-bold hover:bg-[#0e7490] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
