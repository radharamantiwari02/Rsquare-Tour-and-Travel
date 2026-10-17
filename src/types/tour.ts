export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CHF';

export interface CurrencyRate {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
}

export interface DayItinerary {
  day: string; // e.g. "01", "02", "6-10"
  region: string;
  title: string;
  timing: string;
  transit: string;
  transitIcon: string;
  dining: string;
  hotel: string;
  description: string;
  highlights?: string[];
}

export interface Accommodation {
  id: string;
  name: string;
  location: string;
  nights: string;
  description: string;
  rating: number;
  roomType: string;
  image: string;
  features: string[];
  amenities: string[];
}

export interface Review {
  id: string;
  author: string;
  avatarInitials: string;
  avatarBg: string;
  date: string;
  travelerType: string;
  tag: string;
  content: string;
  rating: number;
}

export interface PhotoItem {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  category: 'Landscapes' | 'Rail Journeys' | 'Luxury Hotels' | 'Gourmet Dining';
  url: string;
}

export interface TourPackage {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  rating: number;
  reviewCount: number;
  route: string;
  duration: string;
  groupSize: string;
  startingPrice: number;
  originalPrice: number;
  savings: number;
  overview: string;
  highlights: {
    icon: string;
    title: string;
    desc: string;
  }[];
  statBoxes: {
    icon: string;
    value: string;
    label: string;
  }[];
  itinerary: DayItinerary[];
  accommodations: Accommodation[];
  included: string[];
  excluded: string[];
  departureDates: {
    id: string;
    label: string;
    price: number;
    tag?: string;
  }[];
  addons: {
    id: string;
    name: string;
    price: number;
    defaultChecked?: boolean;
    description: string;
  }[];
}
