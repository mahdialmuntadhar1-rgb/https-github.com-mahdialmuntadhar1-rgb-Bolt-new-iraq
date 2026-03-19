import { Language } from './index';

export const UI_TEXT = {
  en: {
    searchPlaceholder: 'Search for places, events, or services...',
    exploreCategories: 'Explore Categories',
    featuredBusinesses: 'Featured Businesses',
    allIraq: 'All Iraq',
    sponsored: 'Sponsored',
    listYourBusiness: 'List Your Business',
    viewDetails: 'View Details',
    bookNow: 'Book Now',
    communityStories: 'Community Stories',
    businessDirectory: 'Business Directory',
    noResults: 'No businesses found in this city',
    clearFilters: 'Clear Filters',
    eventsToday: 'Events Today',
    deals: 'Deals',
    whatHappening: "What's Happening",
    chooseCity: 'Choose Your City',
    slogans: [
      "Your City Guide — Everything You Need, Right Here",
      "The First Iraqi Business Directory",
      "Looking for a Great Café in Your City? We've Got You",
      "What's Happening in Your City Tonight?",
      "Discover Iraq — One City at a Time",
      "Find the Best Businesses Across Iraq's 20 Governorates",
      "Iraq Compass — Where Every Business Has a Home"
    ],
    subSlogans: {
      hero: "Iraq's most complete business directory — 6,955+ real businesses across 20 governorates",
      featured: "Trusted by thousands of Iraqis every day",
      events: "Don't miss what's happening near you tonight",
      directory: "Find any business, anywhere in Iraq — filter by city, category, or name",
      stories: "Real stories from real people across Iraq"
    }
  },
  ar: {
    searchPlaceholder: 'ابحث عن أماكن أو فعاليات أو خدمات...',
    exploreCategories: 'استكشف الفئات',
    featuredBusinesses: 'المحلات المميزة',
    allIraq: 'كل العراق',
    sponsored: 'مدفوع الإعلان',
    listYourBusiness: 'أضف محلك',
    viewDetails: 'عرض التفاصيل',
    bookNow: 'احجز الآن',
    communityStories: 'قصص المجتمع',
    businessDirectory: 'دليل الأعمال',
    noResults: 'لا توجد أعمال في هذه المدينة',
    clearFilters: 'مسح الفلاتر',
    eventsToday: 'فعاليات اليوم',
    deals: 'العروض',
    whatHappening: 'ماذا يحدث',
    chooseCity: 'اختر مدينتك',
    slogans: [
      "دليلك في المدينة — كل شيء تحتاجه هنا",
      "أول دليل أعمال عراقي شامل",
      "تبحث عن مقهى رائع في مدينتك؟ نحن هنا",
      "ماذا يحدث في مدينتك الليلة؟",
      "اكتشف العراق — مدينة تلو الأخرى"
    ],
    subSlogans: {
      hero: "أشمل دليل أعمال عراقي — أكثر من 6,955 محل في 20 محافظة",
      featured: "موثوق به من قبل آلاف العراقيين كل يوم",
      events: "لا تفوت ما يحدث بالقرب منك الليلة",
      directory: "ابحث عن أي عمل، في أي مكان في العراق — تصفية حسب المدينة، الفئة، أو الاسم",
      stories: "قصص حقيقية من أناس حقيقيين في جميع أنحاء العراق"
    }
  },
  ku: {
    searchPlaceholder: 'بگەڕێ بۆ شوێن، چالاکی، یان خزمەتگوزاری...',
    exploreCategories: 'پۆلەکان بگەڕێ',
    featuredBusinesses: 'بازرگانییە تایبەتەکان',
    allIraq: 'هەموو عێراق',
    sponsored: 'سپۆنسەرکراو',
    listYourBusiness: 'بازرگانیەکەت تۆمار بکە',
    viewDetails: 'وردەکاری ببینە',
    bookNow: 'ئێستا حجز بکە',
    communityStories: 'چیرۆکەکانی کۆمەڵگا',
    businessDirectory: 'ڕێنمای بازرگانی',
    noResults: 'هیچ بازرگانییەک لەم شارەدا نەدۆزرایەوە',
    clearFilters: 'فلتەرەکان پاک بکەرەوە',
    eventsToday: 'چالاکییەکانی ئەمڕۆ',
    deals: 'ئۆفەرەکان',
    whatHappening: 'چی ڕوودەدات',
    chooseCity: 'شارەکەت هەڵبژێرە',
    slogans: [
      "ڕێنماکەت لە شار — هەموو ئەوەی پێویستتە ئێرەیە",
      "یەکەم ڕێنمای بازرگانی عێراقی",
      "بە دوای کافێی باش لە شارەکەتدا دەگەڕێیت؟ ئێمە هەین",
      "ئەمشەو لە شارەکەتدا چی ڕوودەدات؟",
      "عێراق بکەرەوە — شار بە شار"
    ],
    subSlogans: {
      hero: "تەواوترین ڕێنمای بازرگانی عێراقی — زیاتر لە 6,955 بازرگانی لە 20 پارێزگا",
      featured: "متمانەپێکراو لەلایەن هەزاران عێراقییەوە هەموو ڕۆژێک",
      events: "ئەوەی ئەمشەو لە نزیکت ڕوودەدات لەدەستی مەدە",
      directory: "هەر بازرگانییەک بدۆزەرەوە، لە هەر شوێنێکی عێراق — فلتەر بکە بەپێی شار، پۆل، یان ناو",
      stories: "چیرۆکی ڕاستەقینە لە خەڵکی ڕاستەقینەوە لە سەرانسەری عێراق"
    }
  },
};

export const IRAQI_CITIES = [
  { id: 'all',            en: 'All Iraq',       ar: 'كل العراق',        ku: 'هەموو عێراق' },
  { id: 'Baghdad',        en: 'Baghdad',        ar: 'بغداد',            ku: 'بەغدا' },
  { id: 'Erbil',          en: 'Erbil',          ar: 'أربيل',            ku: 'هەولێر' },
  { id: 'Sulaymaniyah',   en: 'Sulaymaniyah',   ar: 'السليمانية',       ku: 'سلێمانی' },
  { id: 'Basra',          en: 'Basra',          ar: 'البصرة',           ku: 'بەسرە' },
  { id: 'Mosul',          en: 'Mosul',          ar: 'الموصل',           ku: 'مووسڵ' },
  { id: 'Najaf',          en: 'Najaf',          ar: 'النجف',            ku: 'نەجەف' },
  { id: 'Karbala',        en: 'Karbala',        ar: 'كربلاء',           ku: 'کەربەلا' },
  { id: 'Kirkuk',         en: 'Kirkuk',         ar: 'كركوك',            ku: 'کەرکوک' },
  { id: 'Duhok',          en: 'Duhok',          ar: 'دهوك',             ku: 'دهۆک' },
  { id: 'Diwaniyah',      en: 'Diwaniyah',      ar: 'الديوانية',        ku: 'دیوانییە' },
  { id: 'Hillah',         en: 'Hillah',         ar: 'الحلة',            ku: 'حیللە' },
  { id: 'Nasiriyah',      en: 'Nasiriyah',      ar: 'الناصرية',         ku: 'ناسریە' },
  { id: 'Amarah',         en: 'Amarah',         ar: 'العمارة',          ku: 'عەمارە' },
  { id: 'Tikrit',         en: 'Tikrit',         ar: 'تكريت',            ku: 'تیکریت' },
  { id: 'Ramadi',         en: 'Ramadi',         ar: 'الرمادي',          ku: 'ڕەمادی' },
  { id: 'Baquba',         en: 'Baquba',         ar: 'بعقوبة',           ku: 'بەعقووبە' },
  { id: 'Samawah',        en: 'Samawah',        ar: 'السماوة',          ku: 'سەماوە' },
  { id: 'Kut',            en: 'Kut',            ar: 'الكوت',            ku: 'کووت' },
  { id: 'Zakho',          en: 'Zakho',          ar: 'زاخو',             ku: 'زاخۆ' },
];

export const CATEGORY_IMAGES: Record<string, string> = {
  'Dining & Cuisine': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
  'Shopping & Retail': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
  'Entertainment & Events': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop',
  'Accommodation & Stay': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop',
  'Culture & Heritage': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
  'Business & Services': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
  'Health & Wellness': 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=300&fit=crop',
  'Transport & Mobility': 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&h=300&fit=crop',
  'Public & Essential': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
};
