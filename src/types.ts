export type TabType = 'explore' | 'packages' | 'destinations' | 'map' | 'journal' | 'legal';

export type LanguageCode = 'en' | 'es' | 'fr' | 'ja' | 'de' | 'ar';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AED' | 'CAD' | 'AUD' | 'CHF';

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number;
}

export interface UserProfile {
  name: string;
  username: string;
  handle?: string;
  email: string;
  avatar: string;
  bio: string;
  homeBase?: string;
  nationality?: string;
  homeAirport?: string;
  tier?: string;
  membershipTier?: string;
  journeysCount?: number;
  countriesVisited?: number;
  distanceKm?: number;
  preferences?: {
    dietary?: string;
    cabinClass?: string;
    travelStyle?: string;
  };
}

export interface TravelPackage {
  id: string;
  title: string;
  location: string;
  region: string;
  categories: string[];
  imageUrl: string;
  altText?: string;
  rating: number;
  reviewCount?: number;
  reviewsCount?: number;
  duration: string;
  daysCount?: number;
  nightsCount?: number;
  groupSize?: string;
  maxGuests?: number;
  price: number;
  originalPrice?: number;
  description: string;
  features?: string[];
  availableDates?: string[];
  inclusions?: {
    icon: string;
    title: string;
    subtitle: string;
  }[];
  isLimitedOffer?: boolean;
  offerBadge?: string;
  itinerary?: {
    day: number;
    title: string;
    highlights: string;
    meals: string;
    coordinates?: [number, number];
  }[];
}

export interface DestinationTour {
  id: string;
  title: string;
  season: string;
  duration: string;
  price: number;
  rating: number;
  reviewCount: number;
  tag: string;
  imageUrl: string;
  description: string;
  highlights: string[];
  inclusions?: string[];
  departureTimes?: string[];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  imageUrl: string;
  altText?: string;
  staysCount: number;
  toursCount?: number;
  bestSeason: string;
  avgTemp?: string;
  weatherTemp?: string;
  rating?: number;
  tagline?: string;
  highlights?: string[];
  startingPrice?: number;
  description?: string;
  isCuratorSpotlight?: boolean;
  badge?: string;
  coordinates?: [number, number]; // [lat, lng]
  sights?: string[];
  winterTours?: DestinationTour[];
  tours?: DestinationTour[];
  localGuideNote?: {
    guideName: string;
    note: string;
  };
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  author: string;
  authorAvatar?: string;
  date?: string;
  likes?: number;
  imageUrl: string;
  altText?: string;
  excerpt: string;
  isFeatured?: boolean;
}

export interface ItineraryStop {
  id: string;
  day: number;
  time: string;
  title: string;
  location: string;
  category: 'transit' | 'stay' | 'activity' | 'dining' | string;
  cost: number;
  assignedMember?: string;
  suggestedBy?: string;
  suggestedAvatar?: string;
  notes?: string;
  description?: string;
  votes: {
    upvotes: number;
    downvotes: number;
    userVote?: 'up' | 'down';
  };
  coordinates: [number, number];
}

export interface GroupMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status?: string;
  isOnline?: boolean;
  currentAction?: string;
}

export interface ExpenseItem {
  id: string;
  title: string;
  category: 'lodging' | 'dining' | 'transit' | 'activities' | 'other' | string;
  amount: number;
  currency?: string;
  paidBy: string;
  splitAmong?: string[];
  splitWith?: string[];
  date: string;
  receiptAttached?: boolean;
}

export interface PackingItem {
  id: string;
  text: string;
  category: 'essentials' | 'clothing' | 'electronics' | 'gear' | 'documents' | 'wellness' | string;
  assignedTo: string;
  isCompleted: boolean;
}

export interface MemoryPhoto {
  id: string;
  imageUrl?: string;
  url?: string;
  caption: string;
  location: string;
  dayNumber?: number;
  uploadedBy: string;
  uploaderAvatar?: string;
  timestamp: string;
  likes: number;
  userLiked?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp?: string;
  time?: string;
  type?: string;
  category?: string;
  isRead: boolean;
  linkTab?: TabType;
}

export interface BookingConfirmation {
  bookingId: string;
  packageTitle: string;
  travelDates?: string;
  dates?: string;
  travelersCount?: number;
  partySize?: number;
  totalPrice?: number;
  totalPaid?: number;
  currency: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  qrCodeUrl?: string;
}
