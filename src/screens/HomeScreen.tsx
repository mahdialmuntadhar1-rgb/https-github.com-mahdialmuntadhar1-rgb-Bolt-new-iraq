import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { CATEGORIES, HERO_SLIDES, MOCK_STORIES, MOCK_POSTS, GOVERNORATES, type Post } from '../data/mockData';
import { getBusinesses } from '../services/businessService';
import type { Business } from '../types';
import { MapPin, ChevronDown, Heart, MessageCircle, Share2, Clock, MoreHorizontal, PlusSquare, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

type TabType = 'shakumaku' | 'madinaty';

interface HomeScreenProps {
  selectedCity: string;
  setSelectedCity: (id: string) => void;
}

// Category accent colours used for placeholder initials and border accents
const CAT_COLORS: Record<string, string> = {
  restaurant: '#FF6B6B', cafe: '#F59E0B', pharmacy: '#10B981', hospital: '#3B82F6',
  school: '#8B5CF6', supermarket: '#06B6D4', bank: '#6366F1', hotel: '#EC4899',
  gym: '#F97316', fuel: '#64748B', clothes: '#D946EF', furniture: '#84CC16',
  electronics: '#0EA5E9', mosque: '#14B8A6', bus_station: '#94A3B8',
};
function catColor(cat: string | undefined) { return CAT_COLORS[cat ?? ''] ?? '#FF6B6B'; }

export function HomeScreen({ selectedCity, setSelectedCity }: HomeScreenProps) {
  const { push } = useNavigation();
  const [activeTab, setActiveTab] = useState<TabType>('shakumaku');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [feedPosts] = useState<Post[]>(MOCK_POSTS);

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [gridPage, setGridPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoadingGrid, setIsLoadingGrid] = useState(false);
  const [gridError, setGridError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const PAGE_SIZE = 12;

  const loadBusinesses = useCallback(async (page: number, category: string | null, city: string, append: boolean) => {
    setIsLoadingGrid(true);
    setGridError(null);
    const result = await getBusinesses({
      page, pageSize: PAGE_SIZE,
      category: category ?? 'all',
      governorate: city !== 'all' ? GOVERNORATES.find(g => g.id === city)?.nameEn ?? 'all' : 'all',
    });
    if (result.error) setGridError(result.error);
    setBusinesses(prev => append ? [...prev, ...result.businesses] : result.businesses);
    setTotalCount(result.totalCount);
    setIsLoadingGrid(false);
  }, []);

  useEffect(() => {
    setGridPage(0);
    setBusinesses([]);
    loadBusinesses(0, selectedCategory, selectedCity, false);
  }, [selectedCategory, selectedCity, loadBusinesses]);

  const loadMore = () => { const next = gridPage + 1; setGridPage(next); loadBusinesses(next, selectedCategory, selectedCity, true); };
  const hasMore = businesses.length < totalCount;

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % HERO_SLIDES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#F5F5F7] overflow-y-auto pb-20 no-scrollbar">
      {/* ── Hero ── */}
      <div className="relative h-60 bg-gray-900 shrink-0">
        <AnimatePresence mode="wait">
          <motion.img key={currentSlide} src={HERO_SLIDES[currentSlide].imageUrl}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full object-cover opacity-75" />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

        <div className="absolute top-0 left-0 right-0 px-4 pt-4 flex justify-between items-center z-10">
          <h1 className="text-white font-bold text-xl tracking-tight drop-shadow">IraqCompass</h1>
          <button onClick={() => push('CitySelect')} className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-2 rounded-full text-white text-sm font-semibold border border-white/20">
            <MapPin size={13} />
            <span>{GOVERNORATES.find(g => g.id === selectedCity)?.nameEn ?? 'All Cities'}</span>
            <ChevronDown size={13} />
          </button>
        </div>

        <div className="absolute bottom-5 left-4 right-4 z-10">
          <motion.h2 key={`title-${currentSlide}`} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-white text-xl font-bold mb-2.5 drop-shadow">{HERO_SLIDES[currentSlide].title}</motion.h2>
          <div className="flex gap-1.5">
            {HERO_SLIDES.map((_, idx) => (
              <div key={idx} className={cn('h-1 rounded-full transition-all duration-300', idx === currentSlide ? 'w-6 bg-[#FF6B6B]' : 'w-1.5 bg-white/40')} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky header: city chips + tabs ── */}
      <div className="sticky top-0 z-30 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <div className="flex overflow-x-auto px-4 py-3 gap-2 no-scrollbar">
          {[{ id: 'all', nameEn: 'All Cities' }, ...GOVERNORATES].map(city => (
            <button key={city.id} onClick={() => setSelectedCity(city.id)}
              className={cn('whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all',
                selectedCity === city.id ? 'bg-[#1A1A1A] text-white shadow-sm' : 'bg-[#F0F0F2] text-[#6B7280] hover:bg-gray-200')}>
              {city.nameEn}
            </button>
          ))}
        </div>
        <div className="flex px-4">
          {(['shakumaku', 'madinaty'] as TabType[]).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={cn('flex-1 pb-3 text-[13px] font-bold capitalize transition-colors relative',
                activeTab === tab ? 'text-[#FF6B6B]' : 'text-[#9CA3AF]')}>
              {tab === 'shakumaku' ? 'Shakumaku' : 'Madinaty'}
              {activeTab === tab && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-6 right-6 h-[2.5px] bg-[#FF6B6B] rounded-full" />}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1">
        {activeTab === 'shakumaku' ? (
          <div className="pb-6">
            {/* Stories strip */}
            <div className="bg-white pt-4 pb-4 mb-3 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <div className="flex overflow-x-auto px-4 gap-4 no-scrollbar">
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                  <div className="w-[62px] h-[62px] rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-[#F5F5F7] relative">
                    <div className="absolute -bottom-0.5 right-0 bg-[#FF6B6B] text-white rounded-full p-[3px] border-2 border-white"><PlusSquare size={11} /></div>
                  </div>
                  <span className="text-[11px] font-medium text-[#6B7280]">Your Story</span>
                </div>
                {MOCK_STORIES.map(story => (
                  <button key={story.id} onClick={() => push('StoryViewer', { storyId: story.id })} className="flex flex-col items-center gap-1.5 shrink-0">
                    <div className="w-[62px] h-[62px] rounded-full p-[2.5px] bg-gradient-to-tr from-amber-400 via-[#FF6B6B] to-pink-500">
                      <img src={story.authorImage} alt={story.authorName} className="w-full h-full rounded-full object-cover border-2 border-white" />
                    </div>
                    <span className="text-[11px] font-medium text-[#374151] w-[62px] truncate text-center">{story.authorName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Post feed */}
            <div className="flex flex-col gap-3 px-4">
              {feedPosts.map((post, index) => (
                <React.Fragment key={post.id}>
                  {index > 0 && index % 4 === 0 && (
                    <button onClick={() => push('StoryViewer', { storyId: MOCK_STORIES[0].id })}
                      className="rounded-2xl overflow-hidden relative h-52 bg-gray-900 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
                      <img src={MOCK_STORIES[0].imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-55" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="relative z-10 flex flex-col items-center justify-end h-full p-5">
                        <div className="w-11 h-11 rounded-full border-2 border-[#FF6B6B] mb-2 overflow-hidden">
                          <img src={MOCK_STORIES[0].authorImage} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-white font-bold text-sm">{MOCK_STORIES[0].authorName}'s Story</p>
                        <p className="text-white/70 text-xs mt-0.5">Tap to view</p>
                      </div>
                    </button>
                  )}
                  <PostCard post={post} onBusinessClick={() => post.businessId && push('BusinessDetail', { businessId: post.businessId })} />
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : (
          /* ── Madinaty tab ── */
          <div className="px-4 pt-4">
            {/* Category chips */}
            <div className="flex overflow-x-auto gap-2 pb-4 no-scrollbar">
              <CategoryChip active={selectedCategory === null} onClick={() => setSelectedCategory(null)} icon="🏙️" label="All" />
              {CATEGORIES.map(cat => (
                <CategoryChip key={cat.id} active={selectedCategory === cat.id}
                  onClick={() => setSelectedCategory(cat.id)} icon={cat.icon} label={cat.nameEn} />
              ))}
            </div>

            {/* Result count */}
            {totalCount > 0 && (
              <div className="flex items-center justify-between mb-4">
                <p className="text-[13px] font-semibold text-[#374151]">
                  <span className="text-[#FF6B6B]">{totalCount.toLocaleString()}</span> businesses found
                </p>
                {selectedCategory && (
                  <button onClick={() => setSelectedCategory(null)} className="text-[11px] text-[#6B7280] bg-gray-100 px-2.5 py-1 rounded-full">Clear filter</button>
                )}
              </div>
            )}

            {/* Grid */}
            {isLoadingGrid && businesses.length === 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200" />
                    <div className="p-3 space-y-2">
                      <div className="h-3.5 bg-gray-200 rounded-md w-3/4" />
                      <div className="h-2.5 bg-gray-100 rounded-md w-1/2" />
                      <div className="h-2 bg-gray-100 rounded-md w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : gridError ? (
              <div className="py-16 text-center">
                <p className="text-[#FF6B6B] font-semibold text-sm mb-1">Something went wrong</p>
                <p className="text-[#9CA3AF] text-xs">{gridError}</p>
              </div>
            ) : businesses.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-[#374151] font-semibold text-sm">No businesses found</p>
                <p className="text-[#9CA3AF] text-xs mt-1">Try a different filter or city</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  {businesses.map(b => (
                    <BusinessCard key={b.id} business={b} onPress={() => push('BusinessDetail', { businessId: String(b.id) })} />
                  ))}
                </div>
                {hasMore && (
                  <div className="py-8 flex justify-center">
                    <button onClick={loadMore} disabled={isLoadingGrid}
                      className="bg-white border border-gray-200 text-[#374151] px-7 py-2.5 rounded-full text-sm font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center gap-2 active:scale-95 transition-transform">
                      {isLoadingGrid
                        ? <><div className="w-4 h-4 border-2 border-[#FF6B6B] border-t-transparent rounded-full animate-spin" /> Loading…</>
                        : <>Load More <span className="text-[#FF6B6B] font-bold">({(totalCount - businesses.length).toLocaleString()} left)</span></>}
                    </button>
                  </div>
                )}
                <div className="h-4" />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Category chip ── */
function CategoryChip({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: string; label: string }) {
  return (
    <button onClick={onClick}
      className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all border',
        active ? 'bg-[#FF6B6B] text-white border-transparent shadow-md' : 'bg-white text-[#6B7280] border-gray-200 shadow-sm')}>
      <span className="text-base leading-none">{icon}</span>
      {label}
    </button>
  );
}

/* ── Business card ── */
function BusinessCard({ business, onPress }: { business: Business; onPress: () => void }) {
  const location = [business.city, business.governorate].filter(Boolean).join(', ');
  const accent = catColor(business.category);
  const initial = (business.name ?? '?')[0].toUpperCase();

  return (
    <button onClick={onPress}
      className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex flex-col text-left transition-all active:scale-95 border border-gray-100/80">
      {/* Image / placeholder */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {business.imageUrl ? (
          <img src={business.imageUrl} alt={business.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white" style={{ background: accent }}>
            {initial}
          </div>
        )}
        {/* Category badge */}
        <div className="absolute top-2 left-2 px-2.5 py-[3px] rounded-full text-[10px] font-bold text-white shadow-sm"
          style={{ background: accent }}>
          {business.category}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1" style={{ borderTop: `2.5px solid ${accent}20` }}>
        <h3 className="font-semibold text-[14px] text-[#1A1A1A] line-clamp-2 leading-snug">{business.name}</h3>
        {location && (
          <p className="text-[11px] text-[#9CA3AF] flex items-center gap-1">
            <MapPin size={9} className="shrink-0" /><span className="truncate">{location}</span>
          </p>
        )}
        {business.phone && (
          <p className="text-[11px] text-[#9CA3AF] flex items-center gap-1 mt-0.5">
            <Phone size={9} className="shrink-0" /><span className="truncate">{business.phone}</span>
          </p>
        )}
      </div>
    </button>
  );
}

/* ── Post card ── */
function PostCard({ post, onBusinessClick }: { post: Post; onBusinessClick: () => void }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const handleLike = () => { setIsLiked(l => !l); setLikes(p => isLiked ? p - 1 : p + 1); };

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100/60">
      {/* Author row */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer flex-1 min-w-0" onClick={onBusinessClick}>
          <img src={post.authorImage} alt={post.authorName} className="w-11 h-11 rounded-full object-cover border-2 border-gray-100 shrink-0" />
          <div className="min-w-0">
            <h4 className="font-semibold text-[15px] text-[#1A1A1A] leading-snug truncate">{post.authorName}</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              {post.categoryId && (
                <span className="text-[11px] font-semibold text-[#FF6B6B] bg-[#FF6B6B]/10 px-2 py-[1px] rounded-full capitalize">{post.categoryId}</span>
              )}
              <span className="text-[11px] text-[#9CA3AF] flex items-center gap-0.5"><Clock size={9} /> {post.timestamp}</span>
            </div>
          </div>
        </div>
        <button className="text-[#9CA3AF] p-1.5 rounded-full hover:bg-gray-100"><MoreHorizontal size={18} /></button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-[14px] text-[#374151] leading-relaxed">{post.content}</p>
      </div>

      {/* Image */}
      {post.imageUrl && (
        <div className="w-full aspect-video bg-gray-100">
          <img src={post.imageUrl} alt="Post" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-100">
        <div className="flex items-center gap-5">
          <button onClick={handleLike} className="flex items-center gap-1.5 transition-colors">
            <motion.div whileTap={{ scale: 0.75 }}>
              <Heart size={19} className={cn(isLiked ? 'text-[#FF6B6B] fill-[#FF6B6B]' : 'text-[#9CA3AF]')} />
            </motion.div>
            <span className={cn('text-[13px] font-semibold', isLiked ? 'text-[#FF6B6B]' : 'text-[#6B7280]')}>{likes}</span>
          </button>
          <button className="flex items-center gap-1.5 text-[#9CA3AF]">
            <MessageCircle size={19} /><span className="text-[13px] font-semibold text-[#6B7280]">{post.comments}</span>
          </button>
          <button className="flex items-center gap-1.5 text-[#9CA3AF]">
            <Share2 size={19} /><span className="text-[13px] font-semibold text-[#6B7280]">{post.shares}</span>
          </button>
        </div>
        {post.businessId && (
          <button onClick={onBusinessClick} className="text-[12px] font-bold text-[#FF6B6B] bg-[#FF6B6B]/10 px-3.5 py-1.5 rounded-full">
            View Listing
          </button>
        )}
      </div>
    </div>
  );
}
