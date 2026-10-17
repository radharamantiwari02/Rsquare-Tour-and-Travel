import React, { useState } from 'react';
import { TourPackage, CurrencyCode } from '../types/tour';
import { CURRENCY_RATES } from '../data/tourData';

interface BookingWidgetProps {
  tour: TourPackage;
  currency: CurrencyCode;
  onBookNow: (details: BookingDetails) => void;
  onReserveDeposit: (details: BookingDetails) => void;
  onOpenConcierge: (mode: 'phone' | 'whatsapp') => void;
}

export interface BookingDetails {
  selectedDate: string;
  adults: number;
  children: number;
  roomType: 'double' | 'single' | 'suite';
  roomSurcharge: number;
  selectedAddons: string[];
  totalPriceUSD: number;
  convertedTotal: string;
  depositOnly?: boolean;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  tour,
  currency,
  onBookNow,
  onReserveDeposit,
  onOpenConcierge,
}) => {
  const currentRate = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;

  const [selectedDateId, setSelectedDateId] = useState(tour.departureDates[3]?.id || 'sep10');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomType, setRoomType] = useState<'double' | 'single' | 'suite'>('double');
  const [heliAddon, setHeliAddon] = useState(false);
  const [insuranceAddon, setInsuranceAddon] = useState(true);

  const selectedDateObj =
    tour.departureDates.find((d) => d.id === selectedDateId) || tour.departureDates[0];
  const basePricePerPerson = selectedDateObj.price;

  let roomSurcharge = 0;
  if (roomType === 'single') roomSurcharge = 450;
  if (roomType === 'suite') roomSurcharge = 950;

  const totalGuests = adults + children;
  const tourPackageSubtotal =
    adults * basePricePerPerson + children * (basePricePerPerson * 0.75) + roomSurcharge;

  let addonPerPerson = 0;
  if (heliAddon) addonPerPerson += 380;
  if (insuranceAddon) addonPerPerson += 120;

  const addonsSubtotal = addonPerPerson * totalGuests;
  const grandTotalUSD = tourPackageSubtotal + addonsSubtotal;

  const formatPrice = (amountUSD: number) => {
    const converted = amountUSD * currentRate.rate;
    return `${currentRate.symbol}${Math.round(converted).toLocaleString()}`;
  };

  const getBookingData = (deposit = false): BookingDetails => {
    const addonsList: string[] = [];
    if (heliAddon) addonsList.push('Matterhorn Glacier Helicopter Flight ($380 pp)');
    if (insuranceAddon) addonsList.push('Comprehensive Travel Protection ($120 pp)');

    return {
      selectedDate: selectedDateObj.label,
      adults,
      children,
      roomType,
      roomSurcharge,
      selectedAddons: addonsList,
      totalPriceUSD: grandTotalUSD,
      convertedTotal: formatPrice(grandTotalUSD),
      depositOnly: deposit,
    };
  };

  return (
    <aside className="lg:col-span-4 sticky top-24 space-y-4">
      {/* Main Booking Card */}
      <div className="bg-white p-5 md:p-6 rounded-2xl shadow-xl border border-black/[0.06] space-y-4">
        {/* Pricing Header */}
        <div className="flex items-baseline justify-between border-b border-black/5 pb-3">
          <div>
            <span className="font-label-sm text-[11px] text-[#6f787d] uppercase font-bold tracking-wider block">
              Special Offer
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-headline-xl text-3xl font-bold text-[#005a71]">
                {formatPrice(basePricePerPerson)}
              </span>
              <span className="font-body-sm text-sm text-[#6f787d] line-through">
                {formatPrice(3890)}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-label-sm text-xs text-[#2a1700] bg-[#ffddb8] px-2.5 py-0.5 rounded-full font-bold inline-block">
              Save {formatPrice(640)}
            </span>
            <span className="font-body-sm text-[11px] text-[#6f787d] block mt-1">
              per guest
            </span>
          </div>
        </div>

        {/* Departure Date Selector */}
        <div className="space-y-1.5">
          <label className="font-label-sm text-xs font-bold text-[#131b2e] flex items-center justify-between">
            <span>Select Departure Date</span>
            <span className="text-[#855300] font-semibold flex items-center gap-1 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fea619] animate-pulse"></span>
              {selectedDateObj.tag || 'Selling Fast'}
            </span>
          </label>
          <div className="relative">
            <select
              value={selectedDateId}
              onChange={(e) => setSelectedDateId(e.target.value)}
              className="w-full h-12 pl-3.5 pr-10 rounded-lg bg-[#faf8ff] text-[#131b2e] font-body-sm text-xs md:text-sm shadow-xs border border-black/15 outline-none focus:ring-2 focus:ring-[#005a71] appearance-none cursor-pointer"
            >
              {tour.departureDates.map((date) => (
                <option key={date.id} value={date.id}>
                  {date.label} ({date.tag})
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined text-[#6f787d] absolute right-3 top-3 pointer-events-none text-xl">
              calendar_month
            </span>
          </div>
        </div>

        {/* Travelers Counter */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-2.5 bg-[#f2f3ff] rounded-lg space-y-1 border border-black/[0.02]">
            <span className="font-label-sm text-[11px] text-[#6f787d] block font-bold">
              Adults (18+)
            </span>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => adults > 1 && setAdults(adults - 1)}
                className="w-8 h-8 rounded bg-white hover:bg-[#eaedff] text-[#131b2e] flex items-center justify-center font-bold shadow-xs cursor-pointer border border-black/5 disabled:opacity-40"
                disabled={adults <= 1}
              >
                -
              </button>
              <span className="font-headline-sm text-lg font-bold text-[#131b2e]">
                {adults}
              </span>
              <button
                type="button"
                onClick={() => adults < 14 && setAdults(adults + 1)}
                className="w-8 h-8 rounded bg-white hover:bg-[#eaedff] text-[#131b2e] flex items-center justify-center font-bold shadow-xs cursor-pointer border border-black/5"
              >
                +
              </button>
            </div>
          </div>

          <div className="p-2.5 bg-[#f2f3ff] rounded-lg space-y-1 border border-black/[0.02]">
            <span className="font-label-sm text-[11px] text-[#6f787d] block font-bold">
              Children (8-17)
            </span>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => children > 0 && setChildren(children - 1)}
                className="w-8 h-8 rounded bg-white hover:bg-[#eaedff] text-[#131b2e] flex items-center justify-center font-bold shadow-xs cursor-pointer border border-black/5 disabled:opacity-40"
                disabled={children <= 0}
              >
                -
              </button>
              <span className="font-headline-sm text-lg font-bold text-[#131b2e]">
                {children}
              </span>
              <button
                type="button"
                onClick={() => children < 6 && setChildren(children + 1)}
                className="w-8 h-8 rounded bg-white hover:bg-[#eaedff] text-[#131b2e] flex items-center justify-center font-bold shadow-xs cursor-pointer border border-black/5"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Room Category Selection */}
        <div className="space-y-1.5">
          <label className="font-label-sm text-xs font-bold text-[#131b2e]">
            Room Category
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => setRoomType('double')}
              className={`p-2 text-center rounded-lg font-label-sm text-xs transition-all shadow-xs cursor-pointer border ${
                roomType === 'double'
                  ? 'bg-[#005a71] text-white border-[#005a71] font-bold'
                  : 'bg-[#faf8ff] text-[#131b2e] border-black/10 hover:bg-[#f2f3ff]'
              }`}
            >
              Double/Twin
            </button>
            <button
              type="button"
              onClick={() => setRoomType('single')}
              className={`p-2 text-center rounded-lg font-label-sm text-xs transition-all shadow-xs cursor-pointer border ${
                roomType === 'single'
                  ? 'bg-[#005a71] text-white border-[#005a71] font-bold'
                  : 'bg-[#faf8ff] text-[#131b2e] border-black/10 hover:bg-[#f2f3ff]'
              }`}
            >
              Single (+{formatPrice(450)})
            </button>
            <button
              type="button"
              onClick={() => setRoomType('suite')}
              className={`p-2 text-center rounded-lg font-label-sm text-xs transition-all shadow-xs cursor-pointer border ${
                roomType === 'suite'
                  ? 'bg-[#005a71] text-white border-[#005a71] font-bold'
                  : 'bg-[#faf8ff] text-[#131b2e] border-black/10 hover:bg-[#f2f3ff]'
              }`}
            >
              Suite (+{formatPrice(950)})
            </button>
          </div>
        </div>

        {/* Enhance Your Journey Addons */}
        <div className="space-y-2 pt-1">
          <label className="font-label-sm text-xs font-bold text-[#131b2e]">
            Enhance Your Journey
          </label>
          <div className="space-y-2">
            <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#f2f3ff] cursor-pointer hover:bg-[#eaedff] transition-colors border border-black/[0.02]">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={heliAddon}
                  onChange={(e) => setHeliAddon(e.target.checked)}
                  className="w-4 h-4 rounded text-[#005a71] accent-[#005a71] cursor-pointer"
                />
                <span className="font-body-sm text-xs text-[#131b2e]">
                  Matterhorn Glacier Helicopter Flight
                </span>
              </div>
              <span className="font-label-sm text-xs font-bold text-[#005a71] whitespace-nowrap pl-1">
                +{formatPrice(380)} pp
              </span>
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#f2f3ff] cursor-pointer hover:bg-[#eaedff] transition-colors border border-black/[0.02]">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={insuranceAddon}
                  onChange={(e) => setInsuranceAddon(e.target.checked)}
                  className="w-4 h-4 rounded text-[#005a71] accent-[#005a71] cursor-pointer"
                />
                <span className="font-body-sm text-xs text-[#131b2e]">
                  Comprehensive Travel Protection
                </span>
              </div>
              <span className="font-label-sm text-xs font-bold text-[#005a71] whitespace-nowrap pl-1">
                +{formatPrice(120)} pp
              </span>
            </label>
          </div>
        </div>

        {/* Price Breakdown Box */}
        <div className="p-3.5 bg-[#f2f3ff] rounded-xl space-y-1.5 font-body-sm text-xs border border-black/[0.03]">
          <div className="flex justify-between text-[#6f787d]">
            <span>
              Tour Package ({adults} Adult{adults > 1 ? 's' : ''}
              {children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''})
            </span>
            <span className="font-semibold text-[#131b2e]">{formatPrice(tourPackageSubtotal)}</span>
          </div>

          {addonsSubtotal > 0 && (
            <div className="flex justify-between text-[#6f787d]">
              <span>Optional Add-ons</span>
              <span className="font-semibold text-[#131b2e]">{formatPrice(addonsSubtotal)}</span>
            </div>
          )}

          <div className="flex justify-between text-[#6f787d]">
            <span>Taxes &amp; Tourism Surcharges</span>
            <span className="text-[#005a71] font-semibold">Included</span>
          </div>

          <div className="pt-2 border-t border-black/5 flex justify-between items-baseline font-bold text-[#131b2e]">
            <span className="font-headline-sm text-sm md:text-base">Total Price</span>
            <span className="font-headline-lg text-2xl md:text-3xl font-extrabold text-[#005a71]">
              {formatPrice(grandTotalUSD)}
            </span>
          </div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={() => onBookNow(getBookingData(false))}
            className="w-full h-12 rounded-lg bg-[#005a71] hover:bg-[#0e7490] text-white font-label-md text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">airplane_ticket</span>
            <span>Book Tour Now</span>
          </button>

          <button
            type="button"
            onClick={() => onReserveDeposit(getBookingData(true))}
            className="w-full h-11 rounded-lg bg-[#fea619] hover:bg-[#e09110] text-[#2a1700] font-label-md text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">lock</span>
            <span>Reserve with {formatPrice(250)} Deposit</span>
          </button>
        </div>

        {/* Trust & Cancellation Pill */}
        <div className="flex items-center justify-center gap-1.5 text-center text-[#6f787d] font-label-sm text-xs pt-1">
          <span className="material-symbols-outlined text-[#005a71] text-lg">security</span>
          <span>Free cancellation up to 30 days before departure</span>
        </div>

        {/* Concierge Help Line */}
        <div className="p-3 rounded-xl bg-[#faf8ff] text-center space-y-1 border border-black/[0.04]">
          <p className="font-label-sm text-[11px] text-[#6f787d]">
            Need customized dates or private group departures?
          </p>
          <div className="flex items-center justify-center gap-3 text-[#005a71] font-label-sm text-xs font-bold pt-0.5">
            <button
              onClick={() => onOpenConcierge('phone')}
              className="flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>+1 (800) 482-7782</span>
            </button>
            <span className="text-[#bec8cd]">•</span>
            <button
              onClick={() => onOpenConcierge('whatsapp')}
              className="flex items-center gap-1 hover:underline text-[#005a71] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* The Rsquare Guarantee Card */}
      <div className="bg-[#f2f3ff] p-4 md:p-5 rounded-2xl shadow-xs border border-black/[0.03] space-y-2">
        <div className="flex items-center gap-2 text-[#005a71]">
          <span className="material-symbols-outlined text-xl">verified</span>
          <span className="font-label-md text-sm font-bold text-[#131b2e]">
            The Rsquare Guarantee
          </span>
        </div>
        <p className="font-body-sm text-xs text-[#3f484c] leading-relaxed">
          All departures are 100% financially bonded under ATOL and IATA license #9281. If we cancel for any unforeseen reason, you receive an immediate 100% cash refund within 48 hours.
        </p>
      </div>
    </aside>
  );
};
