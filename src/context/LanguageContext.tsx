import React, { createContext, useContext, useState } from 'react';

export type Lang = 'ar' | 'ku' | 'en';

const TRANSLATIONS = {
  ar: {
    appName: 'Iraq Compass',
    tagline: 'دليل الأعمال العراقي',
    searchPlaceholder: 'ابحث عن مطعم، كافيه، صيدلية...',
    chooseCity: 'اختر مدينتك',
    chooseCitySub: 'Choose Your City',
    chooseCategory: 'اختر الفئة',
    chooseCategorySub: 'Choose Category',
    businesses: 'نشاط',
    totalStat: '٦٬٩٥٥ نشاط تجاري في ٢٠ محافظة',
    results: 'نتيجة',
    loadMore: 'تحميل المزيد',
    callNow: 'اتصل الآن / Call Now',
    register: 'إنشاء حساب',
    login: 'تسجيل الدخول',
    signIn: 'دخول',
    search: 'بحث',
    back: 'رجوع',
    phone: 'رقم الهاتف',
    address: 'العنوان',
    hours: 'ساعات العمل',
    defaultHours: 'السبت – الخميس، ٩ص – ١١م',
    mapSoon: 'الموقع على الخريطة',
    slogans: [
      { main: 'لا تعرف أين تذهب لشرب القهوة؟', sub: 'اعثر على أفضل الكافيهات في مدينتك' },
      { main: 'أفضل المطاعم والكافيهات', sub: 'وأكثر من ذلك بكثير في مدينتك' },
      { main: '٦٬٩٥٥ نشاط تجاري', sub: 'موزع على ٢٠ محافظة في العراق' },
      { main: 'صيدلية قريبة منك؟', sub: 'دليلك الشامل لخدمات مدينتك' },
      { main: 'اكتشف مدينتك من جديد', sub: 'دليل العراق الأشمل' },
    ],
    fullName: 'الاسم الكامل',
    emailLabel: 'البريد الإلكتروني',
    passwordLabel: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    governorate: 'المحافظة',
    accountType: 'نوع الحساب',
    citizen: 'مواطن',
    businessOwner: 'صاحب عمل',
    organization: 'منظمة',
    createAccount: 'إنشاء حساب',
    alreadyHaveAccount: 'لديك حساب؟',
    signInHere: 'سجل دخولك',
    noAccount: 'ليس لديك حساب؟',
    registerFree: 'سجل مجاناً',
    forgotPassword: 'نسيت كلمة المرور؟',
    claimBusiness: 'احصل عليه مجاناً',
    isYourBusiness: 'هذا عملك؟',
    viewsThisWeek: 'مشاهدات هذا الأسبوع',
    callsReceived: 'مكالمات واردة',
    directionTaps: 'طلبات الاتجاه',
    avgRating: 'متوسط التقييم',
    claimToUnlock: 'سجّل للوصول إلى الإحصائيات',
    manageBtn: 'هذا عملك؟',
    claimFreeBtn: 'احصل عليه مجاناً — Claim Free',
    claimedBadge: 'مؤكد',
    yourAnalytics: 'إحصائياتك',
    previewAnalytics: 'معاينة الإحصائيات',
    businessDetails: 'تفاصيل النشاط',
    edit: 'تعديل',
    offersSection: 'العروض والمنشورات',
    addOffer: '+ إضافة عرض',
    takeControl: 'تحكم بنشاطك التجاري',
    viewedLastWeek: 'شخص شاهد هذا النشاط الأسبوع الماضي',
    passwordsNoMatch: 'كلمتا المرور غير متطابقتين',
    passwordShort: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
    creatingAccount: 'جاري الإنشاء...',
    signingIn: 'جاري الدخول...',
    welcomeBack: 'مرحباً بعودتك',
    welcomeTagline: 'أهلاً بعودتك إلى بوصلة العراق',
    checkEmail: 'تحقق من بريدك الإلكتروني لتأكيد حسابك',
    welcomeAboard: 'مرحباً بك! 🎉',
    selectGov: 'اختر محافظتك...',
    noResults: 'لا توجد نتائج',
    searchResults: 'نتائج البحث',
    discoverTitle: 'اكتشف',
    discoverSub: 'ابحث في ٦٬٩٥٥ نشاط تجاري',
    categories: 'الفئات',
    allFilter: 'الكل',
    topRated: 'الأعلى تقييماً',
    openNow: 'مفتوح الآن',
  },
  ku: {
    appName: 'Iraq Compass',
    tagline: 'ڕووپێوی کارە عێراقییەکان',
    searchPlaceholder: 'بگەڕێ بۆ چێشتخانە، کافێ، دەرمانخانە...',
    chooseCity: 'شارەکەت هەڵبژێرە',
    chooseCitySub: 'پارێزگاکەت دیاری بکە',
    chooseCategory: 'پۆلەکەت هەڵبژێرە',
    chooseCategorySub: 'جۆری کارگێڕی دیاری بکە',
    businesses: 'کارگێڕی',
    totalStat: '٦٬٩٥٥ کارگێڕی لە ٢٠ پارێزگا',
    results: 'ئەنجام',
    loadMore: 'زیاتر بار بکە',
    callNow: 'ئێستا پەیوەندی بکە',
    register: 'هەژمار دروست بکە',
    login: 'چوونەژوورەوە',
    signIn: 'بچووەژوورەوە',
    search: 'گەڕان',
    back: 'گەڕانەوە',
    phone: 'ژمارەی تەلەفۆن',
    address: 'ناونیشان',
    hours: 'کاتی کار',
    defaultHours: 'شەممە – پێنجشەممە، ٩ب – ١١ش',
    mapSoon: 'شوێن لەسەر نەخشە',
    slogans: [
      { main: 'نازانی بچیت بۆ کوێ قاوەت بخۆیت؟', sub: 'باشترین کافێکانی شارەکەت بدۆزەوە' },
      { main: 'باشترین چێشتخانە و کافێکان', sub: 'و زۆر زیاتر لە شارەکەتدا' },
      { main: '٦٬٩٥٥ کارگێڕی', sub: 'لە ٢٠ پارێزگای عێراق' },
      { main: 'دەرمانخانەیەک نزیک تۆ؟', sub: 'ڕووپێوی تەواوت بۆ خزمەتگوزارییەکانی شارەکەت' },
      { main: 'شارەکەت دووبارە کەشف بکە', sub: 'تەواوترین ڕووپێوی عێراق' },
    ],
    fullName: 'ناوی تەواو',
    emailLabel: 'ئیمەیڵ',
    passwordLabel: 'وشەی نهێنی',
    confirmPassword: 'دووپاتکردنەوەی وشەی نهێنی',
    governorate: 'پارێزگا',
    accountType: 'جۆری هەژمار',
    citizen: 'هاووڵاتی',
    businessOwner: 'خاوەن کارگێڕی',
    organization: 'ڕێکخراو',
    createAccount: 'هەژمار دروست بکە',
    alreadyHaveAccount: 'پێشتر هەژمارت هەیە؟',
    signInHere: 'ئێرە بچووەژوورەوە',
    noAccount: 'هەژمارت نییە؟',
    registerFree: 'بەخۆڕایی تۆمار بکەرەوە',
    forgotPassword: 'وشەی نهێنیت بیرچووە؟',
    claimBusiness: 'بەخۆڕایی وەرە',
    isYourBusiness: 'ئەمە کارگێڕیتە؟',
    viewsThisWeek: 'بینینەکانی ئەم هەفتەیە',
    callsReceived: 'پەیوەندییە وەرگیراوەکان',
    directionTaps: 'داواکاری ئاراستە',
    avgRating: 'تێکڕای هەڵسەنگاندن',
    claimToUnlock: 'تۆمار بکە بۆ دەستگەیشتن بە ئامارەکان',
    manageBtn: 'ئەمە کارگێڕیتە؟',
    claimFreeBtn: 'بەخۆڕایی وەرە — Claim Free',
    claimedBadge: 'دڵنیاکراوە',
    yourAnalytics: 'ئامارەکانت',
    previewAnalytics: 'پێشبینی ئامارەکان',
    businessDetails: 'وردەکارییەکانی کارگێڕی',
    edit: 'دەستکاری',
    offersSection: 'ئۆفەر و بڵاوکراوەکان',
    addOffer: '+ ئۆفەر زیاد بکە',
    takeControl: 'کارگێڕیت بگرە بەدەست',
    viewedLastWeek: 'کەس ئەم کارگێڕییەیان بینی ئەم هەفتەیە',
    passwordsNoMatch: 'وشەی نهێنییەکان ناگونجێن',
    passwordShort: 'وشەی نهێنی دەبێت لانیکەم ٦ پیت بێت',
    creatingAccount: 'دروستکردن...',
    signingIn: 'چوونەژوورەوە...',
    welcomeBack: 'بەخێربێیتەوە',
    welcomeTagline: 'بەخێربێیتەوە بۆ ڕووپێوی عێراق',
    checkEmail: 'ئیمەیڵەکەت بپشکنە بۆ دڵنیاکردنەوەی هەژمارەکەت',
    welcomeAboard: 'بەخێربێیت! 🎉',
    selectGov: 'پارێزگاکەت هەڵبژێرە...',
    noResults: 'هیچ ئەنجامێک نەدۆزرایەوە',
    searchResults: 'ئەنجامەکانی گەڕان',
    discoverTitle: 'کەشف بکە',
    discoverSub: 'لە ٦٬٩٥٥ کارگێڕیدا بگەڕێ',
    categories: 'پۆلەکان',
    allFilter: 'هەموو',
    topRated: 'باشترین هەڵسەنگاندن',
    openNow: 'ئێستا کراوەیە',
  },
  en: {
    appName: 'Iraq Compass',
    tagline: 'Iraqi Business Directory',
    searchPlaceholder: 'Search restaurants, cafes, pharmacies...',
    chooseCity: 'Choose Your City',
    chooseCitySub: 'Select a governorate',
    chooseCategory: 'Choose Category',
    chooseCategorySub: 'Select a business type',
    businesses: 'businesses',
    totalStat: '6,955 businesses across 20 governorates',
    results: 'results',
    loadMore: 'Load More',
    callNow: 'Call Now',
    register: 'Create Account',
    login: 'Sign In',
    signIn: 'Sign In',
    search: 'Search',
    back: 'Back',
    phone: 'Phone',
    address: 'Address',
    hours: 'Working Hours',
    defaultHours: 'Sat – Thu, 9am – 11pm',
    mapSoon: 'Location on Map',
    slogans: [
      { main: "Don't know where to go for coffee?", sub: 'Find the best cafes in your city' },
      { main: 'Best restaurants & cafes', sub: 'and so much more in your city' },
      { main: '6,955 businesses', sub: 'across 20 Iraqi governorates' },
      { main: 'Looking for a nearby pharmacy?', sub: 'Your complete guide to city services' },
      { main: 'Rediscover your city', sub: "Iraq's most complete business directory" },
    ],
    fullName: 'Full Name',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    confirmPassword: 'Confirm Password',
    governorate: 'Governorate',
    accountType: 'Account Type',
    citizen: 'Citizen',
    businessOwner: 'Business Owner',
    organization: 'Organization',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    signInHere: 'Sign in here',
    noAccount: "Don't have an account?",
    registerFree: 'Register free',
    forgotPassword: 'Forgot password?',
    claimBusiness: 'Claim Free',
    isYourBusiness: 'Is this your business?',
    viewsThisWeek: 'Views this week',
    callsReceived: 'Calls received',
    directionTaps: 'Direction taps',
    avgRating: 'Avg. Rating',
    claimToUnlock: 'Claim to unlock analytics',
    manageBtn: 'Is this yours?',
    claimFreeBtn: 'Claim Business Free',
    claimedBadge: 'Claimed',
    yourAnalytics: 'Your Analytics',
    previewAnalytics: 'Preview Analytics',
    businessDetails: 'Business Details',
    edit: 'Edit',
    offersSection: 'Offers & Posts',
    addOffer: '+ Add Offer',
    takeControl: 'Take Control',
    viewedLastWeek: 'people viewed this listing last week',
    passwordsNoMatch: 'Passwords do not match',
    passwordShort: 'Password must be at least 6 characters',
    creatingAccount: 'Creating account...',
    signingIn: 'Signing in...',
    welcomeBack: 'Welcome back',
    welcomeTagline: 'Welcome back to Iraq Compass',
    checkEmail: 'Check your email to verify your account',
    welcomeAboard: 'Welcome aboard! 🎉',
    selectGov: 'Select your governorate...',
    noResults: 'No results found',
    searchResults: 'Search Results',
    discoverTitle: 'Discover',
    discoverSub: 'Search 6,955+ businesses',
    categories: 'Categories',
    allFilter: 'All',
    topRated: 'Top Rated',
    openNow: 'Open Now',
  },
};

export type Translations = typeof TRANSLATIONS.en;

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  isRTL: boolean;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('ar');
  const t = TRANSLATIONS[lang] as Translations;
  const isRTL = lang !== 'en';

  return (
    <LangContext.Provider value={{ lang, setLang, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} style={{ height: '100%' }}>
        {children}
      </div>
    </LangContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

// Reusable language switcher — three full-text buttons
export function LangSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage();
  const langs: { id: Lang; label: string }[] = [
    { id: 'ar', label: 'عربي' },
    { id: 'ku', label: 'کوردی' },
    { id: 'en', label: 'English' },
  ];
  return (
    <div className="flex gap-1 rounded-full p-1"
      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
      {langs.map(l => (
        <button
          key={l.id}
          onClick={() => setLang(l.id)}
          className="rounded-full font-bold transition-all"
          style={{
            fontSize: compact ? 10 : 11,
            padding: compact ? '2px 8px' : '4px 10px',
            whiteSpace: 'nowrap',
            background: lang === l.id ? '#D4A017' : 'transparent',
            color: lang === l.id ? '#0A1628' : '#94A3B8',
          }}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
