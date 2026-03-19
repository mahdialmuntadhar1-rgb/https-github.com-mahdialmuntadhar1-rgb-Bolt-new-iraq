// ── All 20 Iraqi governorates ──────────────────────────────────────────────
export const CITIES = [
  { id: 'Baghdad',      ar: 'بغداد',       ku: 'بەغدا',         en: 'Baghdad',      emoji: '🏙️', count: 360 },
  { id: 'Basra',        ar: 'البصرة',       ku: 'بەسرە',         en: 'Basra',        emoji: '⚓',  count: 360 },
  { id: 'Erbil',        ar: 'أربيل',        ku: 'هەولێر',        en: 'Erbil',        emoji: '🏔️', count: 360 },
  { id: 'Sulaymaniyah', ar: 'السليمانية',   ku: 'سلێمانی',       en: 'Sulaymaniyah', emoji: '🌿', count: 360 },
  { id: 'Mosul',        ar: 'الموصل',       ku: 'مووسڵ',         en: 'Mosul',        emoji: '🕌', count: 360 },
  { id: 'Kirkuk',       ar: 'كركوك',        ku: 'کەرکووک',       en: 'Kirkuk',       emoji: '🛢️', count: 360 },
  { id: 'Najaf',        ar: 'النجف',        ku: 'نەجەف',         en: 'Najaf',        emoji: '🕍', count: 360 },
  { id: 'Karbala',      ar: 'كربلاء',       ku: 'کەربەلا',       en: 'Karbala',      emoji: '✨', count: 360 },
  { id: 'Anbar',        ar: 'الأنبار',      ku: 'ئەنبار',        en: 'Anbar',        emoji: '🏜️', count: 360 },
  { id: 'Diyala',       ar: 'ديالى',        ku: 'دیالە',         en: 'Diyala',       emoji: '🌾', count: 360 },
  { id: 'Babil',        ar: 'بابل',         ku: 'بابڵ',          en: 'Babil',        emoji: '🏛️', count: 360 },
  { id: 'Wasit',        ar: 'واسط',         ku: 'واسەت',         en: 'Wasit',        emoji: '🌊', count: 360 },
  { id: 'Maysan',       ar: 'ميسان',        ku: 'مەیسان',        en: 'Maysan',       emoji: '🌴', count: 360 },
  { id: 'Dhi Qar',      ar: 'ذي قار',       ku: 'ذی قار',        en: 'Dhi Qar',      emoji: '🏺', count: 360 },
  { id: 'Muthanna',     ar: 'المثنى',       ku: 'موسەننا',       en: 'Muthanna',     emoji: '🌵', count: 360 },
  { id: 'Qadisiyyah',   ar: 'القادسية',     ku: 'قادسیە',        en: 'Qadisiyyah',   emoji: '⚔️', count: 360 },
  { id: 'Saladin',      ar: 'صلاح الدين',   ku: 'سەلاحەدین',     en: 'Saladin',      emoji: '🦁', count: 360 },
  { id: 'Dohuk',        ar: 'دهوك',         ku: 'دهۆک',          en: 'Dohuk',        emoji: '🏞️', count: 360 },
  { id: 'Halabja',      ar: 'حلبجة',        ku: 'ھەڵەبجە',       en: 'Halabja',      emoji: '🌸', count: 360 },
  { id: 'Zakho',        ar: 'زاخو',         ku: 'زاخۆ',          en: 'Zakho',        emoji: '🗻', count: 115 },
];

// ── Categories (maps to DB `category` column values) ────────────────────
export const CATEGORIES = [
  { id: 'restaurant',  ar: 'مطاعم',        ku: 'چێشتخانەکان',     en: 'Restaurants',   emoji: '🍽️', accent: '#EF4444' },
  { id: 'cafe',        ar: 'كافيهات',      ku: 'کافێکان',         en: 'Cafes',         emoji: '☕',  accent: '#92400E' },
  { id: 'pharmacy',    ar: 'صيدليات',      ku: 'دەرمانخانەکان',   en: 'Pharmacies',    emoji: '💊',  accent: '#10B981' },
  { id: 'hospital',    ar: 'عيادات',       ku: 'نەخۆشخانەکان',    en: 'Clinics',       emoji: '🏥',  accent: '#14B8A6' },
  { id: 'hotel',       ar: 'فنادق',        ku: 'ئۆتێلەکان',       en: 'Hotels',        emoji: '🏨',  accent: '#3B82F6' },
  { id: 'supermarket', ar: 'سوبرماركت',   ku: 'سوپەرمارکێتەکان', en: 'Supermarkets',  emoji: '🛒',  accent: '#F97316' },
  { id: 'school',      ar: 'تعليم',        ku: 'پەروەردە',        en: 'Education',     emoji: '🎓',  accent: '#6366F1' },
  { id: 'bank',        ar: 'خدمات مالية',  ku: 'خزمەتی داراییە',  en: 'Banking',       emoji: '🏦',  accent: '#64748B' },
  { id: 'gym',         ar: 'صالونات',      ku: 'سالۆنەکان',       en: 'Salons & Gym',  emoji: '💇',  accent: '#EC4899' },
  { id: 'clothes',     ar: 'ملابس',        ku: 'جلوبەرگ',         en: 'Clothing',      emoji: '👗',  accent: '#8B5CF6' },
  { id: 'fuel',        ar: 'سيارات',       ku: 'ئۆتۆمبێل',        en: 'Auto & Fuel',   emoji: '⛽',  accent: '#71717A' },
  { id: 'furniture',   ar: 'أثاث',         ku: 'مەکمەل',          en: 'Furniture',     emoji: '🛋️',  accent: '#D4A017' },
  { id: 'electronics', ar: 'إلكترونيات',   ku: 'ئەلیکترۆنیات',   en: 'Electronics',   emoji: '📱',  accent: '#0EA5E9' },
  { id: 'mosque',      ar: 'مساجد',        ku: 'مزگەوتەکان',      en: 'Mosques',       emoji: '🕌',  accent: '#16A34A' },
  { id: 'bus_station', ar: 'مواصلات',      ku: 'گواستنەوە',       en: 'Transport',     emoji: '🚌',  accent: '#94A3B8' },
];

// Category label by lang
export function catLabel(cat: typeof CATEGORIES[0], lang: 'ar' | 'ku' | 'en') {
  return cat[lang] ?? cat.en;
}
