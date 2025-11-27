
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
    description: 'Luxury banquet hall perfect for grand weddings.'
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
    description: 'Organic, farm-to-table vegetarian catering with zero-waste policy.'
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
    description: 'Capturing moments that last a lifetime. Drone shots available.'
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
    description: 'Sustainable decor using recycled materials and local flowers.'
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
    description: 'Bollywood, EDM, and Punjabi hits to rock your party.'
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
  
  // Comprehensive list of Indian Festivals and Muhurats
  const yearlyData: Record<number, Array<{name: string, type: 'festival' | 'muhurat', day: number, desc: string}>> = {
    0: [ // January
      { name: 'New Year', type: 'festival', day: 1, desc: 'Global Celebration' },
      { name: 'Lohri', type: 'festival', day: 13, desc: 'Punjabi Folk Festival' },
      { name: 'Makar Sankranti', type: 'festival', day: 14, desc: 'Harvest Festival' },
      { name: 'Pongal', type: 'festival', day: 15, desc: 'Tamil Harvest Festival' },
      { name: 'Guru Gobind Singh Jayanti', type: 'festival', day: 17, desc: 'Sikh Festival' },
      { name: 'Wedding Muhurat', type: 'muhurat', day: 22, desc: 'Auspicious Date' },
      { name: 'Republic Day', type: 'festival', day: 26, desc: 'National Holiday' }
    ],
    1: [ // February
      { name: 'Vasant Panchami', type: 'festival', day: 10, desc: 'Worship of Goddess Saraswati' },
      { name: 'Wedding Muhurat', type: 'muhurat', day: 14, desc: 'Valentine Wedding Special' },
      { name: 'Chhatrapati Shivaji Maharaj Jayanti', type: 'festival', day: 19, desc: 'Maratha Warrior King' },
      { name: 'Wedding Muhurat', type: 'muhurat', day: 28, desc: 'End of month auspicious date' }
    ],
    2: [ // March
      { name: 'Maha Shivratri', type: 'festival', day: 8, desc: 'Night of Lord Shiva' },
      { name: 'Holika Dahan', type: 'festival', day: 24, desc: 'Bonfire Night' },
      { name: 'Holi', type: 'festival', day: 25, desc: 'Festival of Colors' },
      { name: 'Good Friday', type: 'festival', day: 29, desc: 'Religious Holiday' },
      { name: 'Easter', type: 'festival', day: 31, desc: 'Resurrection Sunday' }
    ],
    3: [ // April
      { name: 'Ugadi / Gudi Padwa', type: 'festival', day: 9, desc: 'New Year' },
      { name: 'Eid al-Fitr', type: 'festival', day: 11, desc: 'End of Ramadan' },
      { name: 'Baisakhi', type: 'festival', day: 13, desc: 'Punjabi New Year' },
      { name: 'Ambedkar Jayanti', type: 'festival', day: 14, desc: 'Equality Day' },
      { name: 'Ram Navami', type: 'festival', day: 17, desc: 'Birth of Lord Rama' },
      { name: 'Mahavir Jayanti', type: 'festival', day: 21, desc: 'Jain Festival' },
      { name: 'Wedding Muhurat', type: 'muhurat', day: 22, desc: 'Auspicious Date' }
    ],
    4: [ // May
      { name: 'Labour Day', type: 'festival', day: 1, desc: 'International Workers Day' },
      { name: 'Akshaya Tritiya', type: 'muhurat', day: 10, desc: 'Most Auspicious Day' },
      { name: 'Mothers Day', type: 'festival', day: 12, desc: 'Celebration of Mothers' },
      { name: 'Buddha Purnima', type: 'festival', day: 23, desc: 'Birth of Gautam Buddha' }
    ],
    5: [ // June
      { name: 'World Environment Day', type: 'festival', day: 5, desc: 'Sustainability Awareness' },
      { name: 'Eid al-Adha', type: 'festival', day: 17, desc: 'Festival of Sacrifice' },
      { name: 'International Yoga Day', type: 'festival', day: 21, desc: 'Wellness & Yoga' },
      { name: 'Wedding Muhurat', type: 'muhurat', day: 29, desc: 'Summer Wedding Date' }
    ],
    6: [ // July
      { name: 'Rath Yatra', type: 'festival', day: 7, desc: 'Chariot Festival' },
      { name: 'Wedding Muhurat', type: 'muhurat', day: 11, desc: 'Auspicious Date' },
      { name: 'Muharram', type: 'festival', day: 17, desc: 'Islamic New Year' },
      { name: 'Guru Purnima', type: 'festival', day: 21, desc: 'Honoring Teachers' }
    ],
    7: [ // August
      { name: 'Friendship Day', type: 'festival', day: 4, desc: 'Celebration of friends' },
      { name: 'Independence Day', type: 'festival', day: 15, desc: 'National Holiday' },
      { name: 'Parsi New Year', type: 'festival', day: 16, desc: 'Navroz' },
      { name: 'Raksha Bandhan', type: 'festival', day: 19, desc: 'Bond of protection' },
      { name: 'Janmashtami', type: 'festival', day: 26, desc: 'Birth of Lord Krishna' }
    ],
    8: [ // September
      { name: 'Teachers Day', type: 'festival', day: 5, desc: 'Honoring Educators' },
      { name: 'Ganesh Chaturthi', type: 'festival', day: 7, desc: 'Festival of Ganesh' },
      { name: 'Onam', type: 'festival', day: 15, desc: 'Harvest Festival of Kerala' },
      { name: 'Eid-e-Milad', type: 'festival', day: 16, desc: 'Birth of Prophet' }
    ],
    9: [ // October
      { name: 'Gandhi Jayanti', type: 'festival', day: 2, desc: 'Birth of Mahatma Gandhi' },
      { name: 'Navratri Begins', type: 'festival', day: 3, desc: '9 Nights of Goddess' },
      { name: 'Durga Puja', type: 'festival', day: 9, desc: 'Worship of Goddess Durga' },
      { name: 'Dussehra', type: 'festival', day: 12, desc: 'Victory of Good over Evil' },
      { name: 'Karwa Chauth', type: 'festival', day: 20, desc: 'Fasting for husbands' },
      { name: 'Dhanteras', type: 'festival', day: 29, desc: 'Festival of Wealth' },
      { name: 'Diwali', type: 'festival', day: 31, desc: 'Festival of Lights' }
    ],
    10: [ // November
      { name: 'Govardhan Puja', type: 'festival', day: 2, desc: 'Day after Diwali' },
      { name: 'Bhai Dooj', type: 'festival', day: 3, desc: 'Brother-Sister Festival' },
      { name: 'Chhath Puja', type: 'festival', day: 7, desc: 'Sun God Worship' },
      { name: 'Childrens Day', type: 'festival', day: 14, desc: 'Birthday of Nehru' },
      { name: 'Guru Nanak Jayanti', type: 'festival', day: 15, desc: 'Gurpurab' },
      { name: 'Wedding Muhurat', type: 'muhurat', day: 22, desc: 'Wedding Season Begins' }
    ],
    11: [ // December
      { name: 'Wedding Muhurat', type: 'muhurat', day: 4, desc: 'Peak Wedding Date' },
      { name: 'Wedding Muhurat', type: 'muhurat', day: 14, desc: 'Last Muhurat of Year' },
      { name: 'Christmas', type: 'festival', day: 25, desc: 'Birth of Jesus' },
      { name: 'New Year Eve', type: 'festival', day: 31, desc: 'Party Time' }
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
           event.type === 'festival';
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
