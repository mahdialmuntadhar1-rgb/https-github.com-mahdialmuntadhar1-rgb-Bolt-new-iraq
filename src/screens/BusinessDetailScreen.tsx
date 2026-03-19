import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { supabase } from '../lib/supabase';
import { ChevronLeft, MapPin, Phone, Globe, Clock, Heart, Share2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const CATEGORY_IMAGES: Record<string, string> = {
  restaurant:   'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
  cafe:         'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
  pharmacy:     'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=800',
  hospital:     'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
  school:       'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800',
  supermarket:  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
  bank:         'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=800',
  hotel:        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
  gym:          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
  fuel:         'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=800',
  clothes:      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800',
  furniture:    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
};
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=800';

const CAT_COLORS: Record<string, string> = {
  restaurant: '#FF6B6B', cafe: '#F59E0B', pharmacy: '#10B981', hospital: '#3B82F6',
  school: '#8B5CF6', supermarket: '#06B6D4', bank: '#6366F1', hotel: '#EC4899',
  gym: '#F97316', fuel: '#64748B', clothes: '#D946EF', furniture: '#84CC16',
  electronics: '#0EA5E9', mosque: '#14B8A6', bus_station: '#94A3B8',
};
function catColor(cat: string | null | undefined) { return CAT_COLORS[cat ?? ''] ?? '#FF6B6B'; }

type DbBusiness = {
  id: string; name: string | null; category: string | null;
  city: string | null; governorate: string | null; phone: string | null; address: string | null;
};

export function BusinessDetailScreen({ businessId }: { businessId: string }) {
  const { pop } = useNavigation();
  const [business, setBusiness]   = useState<DbBusiness | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'about' | 'photos' | 'reviews'>('about');
  const [isLiked, setIsLiked]     = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from<DbBusiness>('businesses')
        .select('id, name, category, city, governorate, phone, address')
        .eq('id', businessId);
      setBusiness(data?.[0] ?? null);
      setIsLoading(false);
    };
    load();
  }, [businessId]);

  const cat      = business?.category?.toLowerCase().replace(/\s+/g, '_');
  const imageUrl = CATEGORY_IMAGES[cat ?? ''] ?? DEFAULT_IMAGE;
  const accent   = catColor(business?.category);
  const location = [business?.city, business?.governorate].filter(Boolean).join(', ');

  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 26, stiffness: 220 }}
      className="absolute inset-0 bg-[#F5F5F7] z-50 flex flex-col overflow-hidden"
    >
      {/* ── Header image ── */}
      <div className="relative h-64 shrink-0">
        <img src={imageUrl} alt={business?.name ?? ''} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />

        {/* Nav bar */}
        <div className="absolute top-0 left-0 right-0 px-4 pt-4 flex justify-between items-center z-10">
          <button onClick={pop}
            className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
            <ChevronLeft size={22} />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
              <Share2 size={18} />
            </button>
            <button onClick={() => setIsLiked(!isLiked)}
              className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
              <Heart size={18} className={cn('transition-all', isLiked ? 'fill-[#FF6B6B] text-[#FF6B6B]' : 'text-white')} />
            </button>
          </div>
        </div>

        {/* Business identity */}
        {isLoading ? (
          <div className="absolute bottom-5 left-4 right-4 z-10 animate-pulse space-y-2">
            <div className="h-4 bg-white/20 rounded w-20" />
            <div className="h-7 bg-white/20 rounded w-3/4" />
            <div className="h-3 bg-white/15 rounded w-1/2" />
          </div>
        ) : (
          <div className="absolute bottom-5 left-4 right-4 z-10">
            <span className="inline-block text-[10px] font-bold text-white px-2.5 py-[3px] rounded-full mb-2 capitalize"
              style={{ background: accent }}>
              {business?.category ?? 'Business'}
            </span>
            <h1 className="text-white text-xl font-bold leading-snug mb-1 drop-shadow">{business?.name ?? 'Business'}</h1>
            {location && (
              <p className="text-white/80 text-[12px] flex items-center gap-1">
                <MapPin size={12} /> {location}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── Tab bar ── */}
      <div className="bg-white border-b border-gray-100 shrink-0 flex shadow-sm">
        {(['about', 'photos', 'reviews'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={cn('flex-1 py-3.5 text-[13px] font-bold capitalize relative transition-colors',
              activeTab === tab ? 'text-[#FF6B6B]' : 'text-[#9CA3AF]')}>
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="b-tab-indicator" className="absolute bottom-0 left-6 right-6 h-[2.5px] rounded-full" style={{ background: accent }} />
            )}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4">
        {activeTab === 'about' && (
          <div className="space-y-3">
            {/* Contact card */}
            <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.07)] border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="font-bold text-[15px] text-[#1A1A1A]">Contact & Location</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {business?.phone && (
                  <a href={`tel:${business.phone}`} className="flex items-center gap-3 px-4 py-3.5 active:bg-gray-50">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accent}18` }}>
                      <Phone size={16} style={{ color: accent }} />
                    </div>
                    <div>
                      <p className="text-[13px] text-[#9CA3AF] leading-none mb-0.5">Phone</p>
                      <p className="text-[15px] font-semibold text-[#1A1A1A]">{business.phone}</p>
                    </div>
                    <ExternalLink size={14} className="ml-auto text-[#9CA3AF]" />
                  </a>
                )}
                <div className="flex items-center gap-3 px-4 py-3.5">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                    <Globe size={16} className="text-[#9CA3AF]" />
                  </div>
                  <div>
                    <p className="text-[13px] text-[#9CA3AF] leading-none mb-0.5">Website</p>
                    <p className="text-[14px] text-[#9CA3AF]">Not listed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3.5">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-[#9CA3AF]" />
                  </div>
                  <div>
                    <p className="text-[13px] text-[#9CA3AF] leading-none mb-0.5">Hours</p>
                    <p className="text-[14px] text-[#9CA3AF]">Not available</p>
                  </div>
                </div>
                {location && (
                  <div className="flex items-center gap-3 px-4 py-3.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accent}18` }}>
                      <MapPin size={16} style={{ color: accent }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] text-[#9CA3AF] leading-none mb-0.5">Address</p>
                      <p className="text-[14px] font-semibold text-[#1A1A1A] leading-snug">{business?.address ?? location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.07)] border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="font-bold text-[15px] text-[#1A1A1A]">Location</h3>
              </div>
              <div className="relative h-44">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
                  className="w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ background: accent }}>
                    <MapPin size={22} className="text-white fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl flex items-center gap-2">
                  <MapPin size={13} style={{ color: accent }} />
                  <span className="text-[12px] font-semibold text-[#374151] truncate">{location || 'Iraq'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="grid grid-cols-3 gap-2">
            {[0,1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-200">
                <img src={`${imageUrl}&sig=${i+1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.07)] border border-gray-100 p-6 text-center">
              <div className="text-[48px] font-bold text-[#1A1A1A] mb-1">—</div>
              <div className="flex justify-center gap-1 mb-2">
                {[1,2,3,4,5].map(s => <span key={s} className="text-xl text-gray-200">★</span>)}
              </div>
              <p className="text-[13px] text-[#9CA3AF] mb-4">No reviews yet. Be the first!</p>
              <button className="text-white text-[13px] font-bold px-6 py-2.5 rounded-full shadow-md"
                style={{ background: accent }}>
                Write a Review
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom CTA ── */}
      {business?.phone && (
        <div className="bg-white px-4 py-3 border-t border-gray-100 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] shrink-0">
          <a href={`tel:${business.phone}`}
            className="flex items-center justify-center gap-2 text-white text-[14px] font-bold py-3 rounded-2xl shadow-md active:scale-[0.98] transition-transform"
            style={{ background: accent }}>
            <Phone size={17} /> Call Now
          </a>
        </div>
      )}
    </motion.div>
  );
}
