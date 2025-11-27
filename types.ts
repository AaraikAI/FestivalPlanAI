
export enum EventType {
  WEDDING = 'Wedding',
  FESTIVAL = 'Festival',
  CORPORATE = 'Corporate',
  BIRTHDAY = 'Birthday',
  OTHER = 'Other'
}

export enum VendorCategory {
  VENUE = 'Venue',
  CATERING = 'Catering',
  DECOR = 'Decor',
  PHOTOGRAPHY = 'Photography',
  ENTERTAINMENT = 'Entertainment'
}

export type UserRole = 'HOST' | 'VENDOR' | 'ADMIN';

// Monetization & Global Types
export type SubscriptionTier = 'FREE' | 'PRO';
export type Currency = 'INR' | 'USD' | 'EUR';
export type Language = 'en' | 'hi' | 'es';

export interface AppSettings {
  language: Language;
  currency: Currency;
  subscriptionTier: SubscriptionTier;
  privacy: {
    shareDataForCredits: boolean; // Passive income opt-in
    analyticsConsent: boolean;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  vendorProfileId?: string; // If they are a vendor
}

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  rating: number;
  priceLevel: 1 | 2 | 3; // 1 = Budget, 3 = Premium
  isEcoFriendly: boolean; // Sustainability tracking
  location: string;
  imageUrl: string;
  description: string;
  verified?: boolean; // ID Verification Status
  ownerId?: string; // Link to User
}

export interface EventTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Guest {
  id: string;
  name: string;
  status: 'confirmed' | 'pending' | 'declined';
  phone?: string;
  nftBadgeId?: string; // NFT Attendance Badge
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export interface Event {
  id: string;
  name: string;
  type: EventType;
  date: string;
  location: string;
  budget: number;
  spent: number;
  expenses?: Expense[]; // Track individual expenses
  tasks: EventTask[];
  guests: Guest[];
  vendors: string[]; // Vendor IDs
  sustainabilityScore: number; // 0-100
  image: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface DashboardStats {
  totalEvents: number;
  activeBudget: number;
  upcomingDeadlines: number;
  ecoScore: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  image?: string;
  tags: string[];
  timestamp: string;
}

export interface CalendarEvent {
  id: string;
  name: string;
  date: string;
  type: 'festival' | 'muhurat';
  description: string;
}
