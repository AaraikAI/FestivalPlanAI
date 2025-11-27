
import { Event, EventType, Vendor, VendorCategory, CalendarEvent, CommunityPost } from './types';

// Dynamic Date Helpers to ensure demo always looks fresh
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;
const currentMonthStr = currentMonth.toString().padStart(2, '0');
const nextMonthStr = ((currentMonth % 12) + 1).toString().padStart(2, '0');
const yearForNextMonth = currentMonth === 12 ? currentYear + 1 : currentYear;

export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'Royal Heritage Banquet',
    category: VendorCategory.VENUE,
    rating: 4.8,
    priceLevel: 3,
    isEcoFriendly: false,
    location: 'Mumbai, Andheri',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
    description: 'Luxury banquet hall perfect for grand weddings.',
    basePrice: 150000
  },
  {
    id: 'v2',
    name: 'Green Leaf Catering',
    category: VendorCategory.CATERING,
    rating: 4.6,
    priceLevel: 2,
    isEcoFriendly: true,
    location: 'Bangalore, Indiranagar',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
    description: 'Organic, farm-to-table vegetarian catering with zero-waste policy.',
    basePrice: 800 // Per plate
  },
  {
    id: 'v3',
    name: 'Shutter Bugs Photography',
    category: VendorCategory.PHOTOGRAPHY,
    rating: 4.5,
    priceLevel: 2,
    isEcoFriendly: false,
    location: 'Delhi, CP',
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop',
    description: 'Capturing moments that last a lifetime. Drone shots available.',
    basePrice: 40000
  },
  {
    id: 'v4',
    name: 'Eco-Decor Solutions',
    category: VendorCategory.DECOR,
    rating: 4.9,
    priceLevel: 2,
    isEcoFriendly: true,
    location: 'Pune, Koregaon Park',
    imageUrl: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800&auto=format&fit=crop',
    description: 'Sustainable decor using recycled materials and local flowers.',
    basePrice: 25000
  },
  {
    id: 'v5',
    name: 'DJ Rakesh Beats',
    category: VendorCategory.ENTERTAINMENT,
    rating: 4.2,
    priceLevel: 1,
    isEcoFriendly: false,
    location: 'Mumbai, Bandra',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
    description: 'Bollywood, EDM, and Punjabi hits to rock your party.',
    basePrice: 15000
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    name: 'Sharma\'s Diwali Bash',
    type: EventType.FESTIVAL,
    date: `${currentYear}-${currentMonthStr}-05`,
    location: 'Home, Mumbai',
    budget: 50000,
    spent: 12000,
    expenses: [
      { id: 'ex1', title: 'Eco Crackers Advance', amount: 5000, category: 'Entertainment', date: new Date().toISOString() },
      { id: 'ex2', title: 'Sweet Box Order', amount: 7000, category: 'Food', date: new Date().toISOString() }
    ],
    tasks: [
      { id: 't1', title: 'Buy Eco-friendly Crackers', completed: true },
      { id: 't2', title: 'Order Sweets', completed: false },
      { id: 't3', title: 'Send WhatsApp Invites', completed: false }
    ],
    guests: [
      { id: 'g1', name: 'Rahul Verma', status: 'confirmed', phone: '+919876543210' },
      { id: 'g2', name: 'Priya Singh', status: 'pending', phone: '+919876543211' },
      { id: 'g3', name: 'Amit Patel', status: 'declined', phone: '+919876543212' }
    ],
    vendors: ['v2', 'v4'],
    sustainabilityScore: 85,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'e2',
    name: 'Corporate Annual Meet',
    type: EventType.CORPORATE,
    date: `${yearForNextMonth}-${nextMonthStr}-15`,
    location: 'Royal Heritage Banquet',
    budget: 500000,
    spent: 150000,
    expenses: [
      { id: 'ex3', title: 'Venue Booking', amount: 150000, category: 'Venue', date: new Date().toISOString() }
    ],
    tasks: [
      { id: 't4', title: 'Book Venue', completed: true },
      { id: 't5', title: 'Finalize Keynote Speaker', completed: false }
    ],
    guests: [
       { id: 'g4', name: 'Vikram Malhotra', status: 'confirmed' },
       { id: 'g5', name: 'Sneha Gupta', status: 'confirmed' }
    ],
    vendors: ['v1'],
    sustainabilityScore: 40,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop'
  }
];

// Contextual Templates
export const CORPORATE_TEMPLATES = [
  { id: 'conf', name: 'Annual Conference', description: 'Formal setup with keynote stage and networking lunch.', icon: '🎤' },
  { id: 'retreat', name: 'Team Retreat', description: 'Fun, engaging offsite with team building activities.', icon: '🏕️' },
  { id: 'launch', name: 'Product Launch', description: 'High energy event with media coverage setups.', icon: '🚀' }
];

export const BIRTHDAY_TEMPLATES = [
  { id: 'kids', name: 'Kids Birthday Bash', description: 'Magic show, balloon decor, and kid-friendly menu.', icon: '🎂' },
  { id: 'milestone', name: 'Milestone Celebration', description: 'Elegant dinner for 25th, 50th, or 75th birthdays.', icon: '🥂' },
  { id: 'surprise', name: 'Surprise Party', description: 'Stealth mode planning with quick setup vendors.', icon: '🎁' }
];

export const WEDDING_TEMPLATES = [
  { id: 'big_fat', name: 'Grand Wedding', description: 'Multi-day event: Sangeet, Mehendi, Shaadi, Reception.', icon: '💍' },
  { id: 'intimate', name: 'Intimate Ceremony', description: 'Small gathering focusing on close family and rituals.', icon: '🏡' },
  { id: 'dest', name: 'Destination Wedding', description: 'Resort booking and travel logistics included.', icon: '✈️' }
];

export const FESTIVAL_TEMPLATES = [
  {
    id: 'diwali',
    name: 'Diwali Celebration',
    description: 'Complete kit for the Festival of Lights including Rangoli guides and sweet vendors.',
    icon: '🪔'
  },
  {
    id: 'holi',
    name: 'Holi Bash',
    description: 'Organic colors, Thandai recipes, and rain dance setup.',
    icon: '🎨'
  },
  {
    id: 'navratri',
    name: 'Navratri Garba Night',
    description: 'DJ, Dhol, Dandiya sticks, and traditional dress rentals.',
    icon: '💃'
  }
];

// Helper to generate events for the entire current year
const generateYearlyEvents = (): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  
  // Comprehensive list of Global & Indian Festivals
  const yearlyData: Record<number, Array<{name: string, type: 'festival' | 'muhurat' | 'holiday', day: number, desc: string}>> = {
    0: [ // January
      { name: 'New Year', type: 'holiday', day: 1, desc: 'Global Celebration' },
      { name: 'Lohri', type: 'festival', day: 13, desc: 'Punjabi Folk Festival' },
      { name: 'Makar Sankranti', type: 'festival', day: 14, desc: 'Harvest Festival' },
      { name: 'Pongal', type: 'festival', day: 15, desc: 'Tamil Harvest Festival' },
      { name: 'Martin Luther King Jr. Day', type: 'holiday', day: 15, desc: 'US Holiday' },
      { name: 'Republic Day', type: 'festival', day: 26, desc: 'National Holiday' }
    ],
    1: [ // February
      { name: 'Valentines Day', type: 'holiday', day: 14, desc: 'Global Love Celebration' },
      { name: 'Vasant Panchami', type: 'festival', day: 10, desc: 'Worship of Goddess Saraswati' },
      { name: 'Presidents Day', type: 'holiday', day: 19, desc: 'US Holiday' }
    ],
    2: [ // March
      { name: 'Maha Shivratri', type: 'festival', day: 8, desc: 'Night of Lord Shiva' },
      { name: 'St. Patricks Day', type: 'holiday', day: 17, desc: 'Irish Cultural Celebration' },
      { name: 'Holi', type: 'festival', day: 25, desc: 'Festival of Colors' },
      { name: 'Good Friday', type: 'holiday', day: 29, desc: 'Christian Holiday' },
      { name: 'Easter', type: 'holiday', day: 31, desc: 'Resurrection Sunday' }
    ],
    3: [ // April
      { name: 'Eid al-Fitr', type: 'festival', day: 11, desc: 'End of Ramadan' },
      { name: 'Baisakhi', type: 'festival', day: 13, desc: 'Punjabi New Year' },
      { name: 'Earth Day', type: 'holiday', day: 22, desc: 'Global Environmental Support' }
    ],
    4: [ // May
      { name: 'Labour Day', type: 'holiday', day: 1, desc: 'International Workers Day' },
      { name: 'Cinco de Mayo', type: 'holiday', day: 5, desc: 'Mexican Celebration' },
      { name: 'Mothers Day', type: 'holiday', day: 12, desc: 'Celebration of Mothers' },
      { name: 'Memorial Day', type: 'holiday', day: 27, desc: 'US Holiday' }
    ],
    5: [ // June
      { name: 'World Environment Day', type: 'holiday', day: 5, desc: 'Sustainability Awareness' },
      { name: 'Fathers Day', type: 'holiday', day: 16, desc: 'Celebration of Fathers' },
      { name: 'Eid al-Adha', type: 'festival', day: 17, desc: 'Festival of Sacrifice' },
      { name: 'Juneteenth', type: 'holiday', day: 19, desc: 'US Holiday' }
    ],
    6: [ // July
      { name: 'Independence Day (USA)', type: 'holiday', day: 4, desc: 'US National Holiday' },
      { name: 'Bastille Day', type: 'holiday', day: 14, desc: 'French National Day' },
      { name: 'Guru Purnima', type: 'festival', day: 21, desc: 'Honoring Teachers' }
    ],
    7: [ // August
      { name: 'Friendship Day', type: 'holiday', day: 4, desc: 'Celebration of friends' },
      { name: 'Independence Day (India)', type: 'festival', day: 15, desc: 'National Holiday' },
      { name: 'Raksha Bandhan', type: 'festival', day: 19, desc: 'Bond of protection' },
      { name: 'Janmashtami', type: 'festival', day: 26, desc: 'Birth of Lord Krishna' }
    ],
    8: [ // September
      { name: 'Labor Day (USA)', type: 'holiday', day: 2, desc: 'US Holiday' },
      { name: 'Ganesh Chaturthi', type: 'festival', day: 7, desc: 'Festival of Ganesh' },
      { name: 'Onam', type: 'festival', day: 15, desc: 'Harvest Festival of Kerala' },
      { name: 'Oktoberfest Begins', type: 'holiday', day: 21, desc: 'German Folk Festival' }
    ],
    9: [ // October
      { name: 'Gandhi Jayanti', type: 'festival', day: 2, desc: 'Birth of Mahatma Gandhi' },
      { name: 'Dussehra', type: 'festival', day: 12, desc: 'Victory of Good over Evil' },
      { name: 'Halloween', type: 'holiday', day: 31, desc: 'Spooky Celebration' },
      { name: 'Diwali', type: 'festival', day: 31, desc: 'Festival of Lights' }
    ],
    10: [ // November
      { name: 'Veterans Day', type: 'holiday', day: 11, desc: 'US Holiday' },
      { name: 'Thanksgiving', type: 'holiday', day: 28, desc: 'US Harvest Festival' },
      { name: 'Guru Nanak Jayanti', type: 'festival', day: 15, desc: 'Gurpurab' }
    ],
    11: [ // December
      { name: 'Christmas', type: 'holiday', day: 25, desc: 'Birth of Jesus' },
      { name: 'Boxing Day', type: 'holiday', day: 26, desc: 'UK/Commonwealth Holiday' },
      { name: 'Hanukkah', type: 'holiday', day: 25, desc: 'Jewish Festival of Lights' },
      { name: 'New Year Eve', type: 'holiday', day: 31, desc: 'Party Time' }
    ]
  };

  Object.keys(yearlyData).forEach(monthKey => {
    const monthIndex = parseInt(monthKey);
    const monthData = yearlyData[monthIndex];
    const monthStr = (monthIndex + 1).toString().padStart(2, '0');
    
    monthData.forEach((item, idx) => {
      events.push({
        id: `cal-${monthIndex}-${idx}`,
        name: item.name,
        date: `${currentYear}-${monthStr}-${item.day.toString().padStart(2, '0')}`,
        type: item.type,
        description: item.desc
      });
    });
  });

  return events;
};

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = generateYearlyEvents();

// Helper to get festivals for current and next month
export const getUpcomingFestivals = (): CalendarEvent[] => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const nextMonth = (currentMonth + 1) % 12;
  const year = now.getFullYear();

  return MOCK_CALENDAR_EVENTS.filter(event => {
    const eventDate = new Date(event.date);
    const eventMonth = eventDate.getMonth();
    return (eventMonth === currentMonth || eventMonth === nextMonth) && 
           eventDate.getFullYear() === year &&
           (event.type === 'festival' || event.type === 'holiday');
  });
};

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    author: 'Anjali D.',
    avatar: 'https://i.pravatar.cc/150?u=anjali',
    title: '5 Tips for a Sustainable Wedding in Delhi',
    content: 'We managed to reduce our plastic waste by 90% using banana leaves and clay pots! Here is how we did it...',
    likes: 124,
    comments: 45,
    tags: ['Wedding', 'Sustainability', 'Delhi'],
    timestamp: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1525268323814-8878939a9c6a?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'p2',
    author: 'Rajesh K.',
    avatar: 'https://i.pravatar.cc/150?u=rajesh',
    title: 'Best budget caterers in Mumbai?',
    content: 'Looking for vegetarian caterers for a small family gathering (50 pax). Budget is around 500/plate. Any leads?',
    likes: 12,
    comments: 8,
    tags: ['Catering', 'Mumbai', 'Budget'],
    timestamp: '5 hours ago'
  }
];

// Dynamic Pricing Logic: Returns multiplier (e.g., 1.2 for 20% surge)
export const getSeasonalityMultiplier = (): number => {
    const month = new Date().getMonth(); // 0-11
    // Peak Wedding Season in India: Nov(10), Dec(11), Jan(0), Feb(1)
    if ([10, 11, 0, 1].includes(month)) {
        return 1.3; // 30% surge
    }
    // Moderate: Oct(9), Mar(2), May(4)
    if ([9, 2, 4].includes(month)) {
        return 1.1; // 10% surge
    }
    return 1.0; // Standard rates
};
