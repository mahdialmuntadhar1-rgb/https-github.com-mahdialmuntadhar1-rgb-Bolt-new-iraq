export interface Governorate {
  id: string;
  nameKey: string;
  nameEn: string;
}

export interface AppCategory {
  id: string;
  nameKey: string;
  nameEn: string;
  icon: string;
}

export interface AppBusiness {
  id: string;
  name: string;
  categoryId: string;
  governorateId: string;
  imageUrl: string;
  rating: number;
  lastActive: string;
  description: string;
  address: string;
}

export interface Post {
  id: string;
  businessId?: string;
  userId?: string;
  authorName: string;
  authorImage: string;
  categoryId?: string;
  timestamp: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
}

export interface Story {
  id: string;
  authorName: string;
  authorImage: string;
  imageUrl: string;
  timestamp: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  imageUrl: string;
}

export const GOVERNORATES: Governorate[] = [
  { id: 'baghdad', nameKey: 'baghdad', nameEn: 'Baghdad' },
  { id: 'basra', nameKey: 'basra', nameEn: 'Basra' },
  { id: 'erbil', nameKey: 'erbil', nameEn: 'Erbil' },
  { id: 'sulaymaniyah', nameKey: 'sulaymaniyah', nameEn: 'Sulaymaniyah' },
  { id: 'najaf', nameKey: 'najaf', nameEn: 'Najaf' },
  { id: 'karbala', nameKey: 'karbala', nameEn: 'Karbala' },
  { id: 'kirkuk', nameKey: 'kirkuk', nameEn: 'Kirkuk' },
  { id: 'mosul', nameKey: 'mosul', nameEn: 'Mosul' },
  { id: 'duhok', nameKey: 'duhok', nameEn: 'Duhok' },
  { id: 'babil', nameKey: 'babil', nameEn: 'Babil' },
  { id: 'anbar', nameKey: 'anbar', nameEn: 'Anbar' },
  { id: 'diyala', nameKey: 'diyala', nameEn: 'Diyala' },
  { id: 'maysan', nameKey: 'maysan', nameEn: 'Maysan' },
  { id: 'muthanna', nameKey: 'muthanna', nameEn: 'Muthanna' },
  { id: 'qadisiyyah', nameKey: 'qadisiyyah', nameEn: 'Al-Qadisiyyah' },
  { id: 'salahaddin', nameKey: 'salahaddin', nameEn: 'Salah Al-Din' },
  { id: 'dhiqar', nameKey: 'dhiqar', nameEn: 'Dhi Qar' },
  { id: 'wasit', nameKey: 'wasit', nameEn: 'Wasit' },
];

export const CATEGORIES: AppCategory[] = [
  { id: 'cafes', nameKey: 'cafes', nameEn: 'Cafes', icon: '☕' },
  { id: 'restaurants', nameKey: 'restaurants', nameEn: 'Restaurants', icon: '🍽️' },
  { id: 'gyms', nameKey: 'gyms', nameEn: 'Gyms', icon: '💪' },
  { id: 'clinics', nameKey: 'clinics', nameEn: 'Clinics', icon: '🏥' },
  { id: 'hotels', nameKey: 'hotels', nameEn: 'Hotels', icon: '🏨' },
  { id: 'shopping', nameKey: 'shopping', nameEn: 'Shopping', icon: '🛍️' },
  { id: 'beauty', nameKey: 'beauty', nameEn: 'Beauty', icon: '💅' },
  { id: 'services', nameKey: 'services', nameEn: 'Services', icon: '🔧' },
  { id: 'pharmacies', nameKey: 'pharmacies', nameEn: 'Pharmacies', icon: '💊' },
  { id: 'schools', nameKey: 'schools', nameEn: 'Schools', icon: '🎓' },
  { id: 'malls', nameKey: 'malls', nameEn: 'Malls', icon: '🏬' },
  { id: 'parks', nameKey: 'parks', nameEn: 'Parks', icon: '🌳' },
  { id: 'entertainment', nameKey: 'entertainment', nameEn: 'Entertainment', icon: '🎮' },
  { id: 'electronics', nameKey: 'electronics', nameEn: 'Electronics', icon: '📱' },
  { id: 'markets', nameKey: 'markets', nameEn: 'Markets', icon: '🛒' },
];

export const HERO_SLIDES: HeroSlide[] = [
  { id: '1', title: 'Trending Cafes in Baghdad', imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800' },
  { id: '2', title: 'Best Restaurants Today', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' },
  { id: '3', title: 'Hidden Gems in Sulaymaniyah', imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800' },
];

export const MOCK_STORIES: Story[] = [
  { id: 's1', authorName: 'Green Garden', authorImage: 'https://i.pravatar.cc/150?u=s1', imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400', timestamp: '10m ago' },
  { id: 's2', authorName: 'Ahmed Ali', authorImage: 'https://i.pravatar.cc/150?u=s2', imageUrl: 'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&q=80&w=400', timestamp: '1h ago' },
  { id: 's3', authorName: 'Erbil Mall', authorImage: 'https://i.pravatar.cc/150?u=s3', imageUrl: 'https://images.unsplash.com/photo-1519567281799-97145024184a?auto=format&fit=crop&q=80&w=400', timestamp: '2h ago' },
  { id: 's4', authorName: 'Sara K.', authorImage: 'https://i.pravatar.cc/150?u=s4', imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=400', timestamp: '3h ago' },
  { id: 's5', authorName: 'Baghdad Grill', authorImage: 'https://i.pravatar.cc/150?u=s5', imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400', timestamp: '5h ago' },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1', businessId: 'b1', authorName: 'Green Garden Cafe',
    authorImage: 'https://i.pravatar.cc/150?u=s1', categoryId: 'cafes', timestamp: '1h ago',
    content: 'Try our new espresso! Freshly brewed and ready to kickstart your day. ☕✨',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800',
    likes: 124, comments: 12, shares: 5,
  },
  {
    id: 'p2', businessId: 'b2', authorName: 'Baghdad Grill',
    authorImage: 'https://i.pravatar.cc/150?u=s5', categoryId: 'restaurants', timestamp: '2h ago',
    content: '20% discount tonight on all family meals! Bring your loved ones. 🥩🔥',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    likes: 342, comments: 45, shares: 20,
  },
  {
    id: 'p3', userId: 'u1', authorName: 'Ahmed Ali',
    authorImage: 'https://i.pravatar.cc/150?u=s2', timestamp: '30min ago',
    content: "I'm at Blue Gym today! The new equipment is amazing. 💪🏋️‍♂️",
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    likes: 56, comments: 4, shares: 1,
  },
  {
    id: 'p4', businessId: 'b3', authorName: 'Rose Bakery',
    authorImage: 'https://i.pravatar.cc/150?u=baker', categoryId: 'cafes', timestamp: '1h ago',
    content: 'Fresh pastries today! Come get them while they are warm. 🥐🍓',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    likes: 210, comments: 18, shares: 8,
  },
  {
    id: 'p5', businessId: 'b4', authorName: 'Erbil Mall',
    authorImage: 'https://i.pravatar.cc/150?u=s3', categoryId: 'malls', timestamp: '3h ago',
    content: 'Special sale this weekend! Up to 50% off on selected brands. 🛍️✨',
    imageUrl: 'https://images.unsplash.com/photo-1519567281799-97145024184a?auto=format&fit=crop&q=80&w=800',
    likes: 890, comments: 120, shares: 45,
  },
  {
    id: 'p6', userId: 'u2', authorName: 'Sara K.',
    authorImage: 'https://i.pravatar.cc/150?u=s4', timestamp: '5h ago',
    content: 'Beautiful sunset at the park today. 🌅',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
    likes: 145, comments: 8, shares: 2,
  },
  {
    id: 'p7', businessId: 'b5', authorName: 'Tech Hub',
    authorImage: 'https://i.pravatar.cc/150?u=tech', categoryId: 'electronics', timestamp: '6h ago',
    content: 'The new iPhone 15 Pro is now available in store! 📱🚀',
    imageUrl: 'https://images.unsplash.com/photo-1531297172867-4f5051365102?auto=format&fit=crop&q=80&w=800',
    likes: 560, comments: 89, shares: 34,
  },
  {
    id: 'p8', businessId: 'b6', authorName: 'Al-Mansour Clinic',
    authorImage: 'https://i.pravatar.cc/150?u=clinic', categoryId: 'clinics', timestamp: '8h ago',
    content: 'Free dental checkups this Friday! Book your appointment now. 🦷👨‍⚕️',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    likes: 320, comments: 45, shares: 112,
  },
];

export const MOCK_BUSINESSES: AppBusiness[] = [
  { id: 'b1', name: 'Green Garden Cafe', categoryId: 'cafes', governorateId: 'baghdad', imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400', rating: 4.8, lastActive: 'Posted today', description: 'A cozy cafe in the heart of Baghdad.', address: 'Al-Mansour, Baghdad' },
  { id: 'b2', name: 'Baghdad Grill', categoryId: 'restaurants', governorateId: 'baghdad', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400', rating: 4.5, lastActive: 'Posted 2h ago', description: 'Best grilled meat in town.', address: 'Karrada, Baghdad' },
  { id: 'b3', name: 'Rose Bakery', categoryId: 'cafes', governorateId: 'erbil', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400', rating: 4.9, lastActive: 'Posted 1h ago', description: 'Fresh pastries and cakes daily.', address: 'Ankawa, Erbil' },
  { id: 'b4', name: 'Erbil Mall', categoryId: 'malls', governorateId: 'erbil', imageUrl: 'https://images.unsplash.com/photo-1519567281799-97145024184a?auto=format&fit=crop&q=80&w=400', rating: 4.7, lastActive: 'Posted 3h ago', description: 'The largest shopping destination in Erbil.', address: '100m Road, Erbil' },
  { id: 'b5', name: 'Tech Hub', categoryId: 'electronics', governorateId: 'basra', imageUrl: 'https://images.unsplash.com/photo-1531297172867-4f5051365102?auto=format&fit=crop&q=80&w=400', rating: 4.6, lastActive: 'Posted 6h ago', description: 'Your one-stop shop for all electronics.', address: 'Al-Jazaer, Basra' },
  { id: 'b6', name: 'Al-Mansour Clinic', categoryId: 'clinics', governorateId: 'baghdad', imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400', rating: 4.9, lastActive: 'Posted 8h ago', description: 'Top-rated medical clinic.', address: 'Al-Mansour, Baghdad' },
  { id: 'b7', name: 'Blue Gym', categoryId: 'gyms', governorateId: 'sulaymaniyah', imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400', rating: 4.4, lastActive: 'Recently updated', description: 'Modern fitness center.', address: 'Salim St, Sulaymaniyah' },
  { id: 'b8', name: 'Grand Babylon Hotel', categoryId: 'hotels', governorateId: 'baghdad', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400', rating: 4.8, lastActive: 'Recently updated', description: 'Luxury hotel with a view of the Tigris.', address: 'Jadriya, Baghdad' },
  { id: 'b9', name: 'Basra Times Square', categoryId: 'malls', governorateId: 'basra', imageUrl: 'https://images.unsplash.com/photo-1519567281799-97145024184a?auto=format&fit=crop&q=80&w=400', rating: 4.5, lastActive: 'Recently updated', description: 'Shopping and entertainment center.', address: 'Jazaer, Basra' },
  { id: 'b10', name: 'Slemani Park', categoryId: 'parks', governorateId: 'sulaymaniyah', imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=400', rating: 4.7, lastActive: 'Recently updated', description: 'Beautiful public park.', address: 'Azadi, Sulaymaniyah' },
  { id: 'b11', name: 'Najaf Central Market', categoryId: 'markets', governorateId: 'najaf', imageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=400', rating: 4.3, lastActive: 'Recently updated', description: 'Traditional market.', address: 'Old City, Najaf' },
  { id: 'b12', name: 'Karbala Library', categoryId: 'schools', governorateId: 'karbala', imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400', rating: 4.9, lastActive: 'Recently updated', description: 'Public library with a vast collection.', address: 'Center, Karbala' },
];
