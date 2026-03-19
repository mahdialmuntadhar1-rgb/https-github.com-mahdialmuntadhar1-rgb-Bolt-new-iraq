import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { Search, MapPin, Phone, X } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { getBusinesses } from '../services/businessService';
import type { Business } from '../types';
import { motion } from 'framer-motion';
import { useDebounce } from '../hooks/useDebounce';

const CAT_COLORS: Record<string, string> = {
  restaurant: '#FF6B6B', cafe: '#F59E0B', pharmacy: '#10B981', hospital: '#3B82F6',
  school: '#8B5CF6', supermarket: '#06B6D4', bank: '#6366F1', hotel: '#EC4899',
  gym: '#F97316', fuel: '#64748B', clothes: '#D946EF', furniture: '#84CC16',
  electronics: '#0EA5E9', mosque: '#14B8A6', bus_station: '#94A3B8',
};
function catColor(cat: string | undefined) { return CAT_COLORS[cat ?? ''] ?? '#FF6B6B'; }

const QUICK_SEARCHES = [
  'Restaurants Baghdad', 'Cafes Erbil', 'Pharmacies Basra',
  'Schools Najaf', 'Hospitals Kirkuk', 'Banks Sulaymaniyah',
];

export function SearchScreen() {
  const { push } = useNavigation();
  const [query, setQuery]           = useState('');
  const [results, setResults]       = useState<Business[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading]   = useState(false);
  const [searched, setSearched]     = useState(false);
  const debouncedQuery              = useDebounce(query, 420);

  const doSearch = useCallback(async (term: string) => {
    if (!term.trim()) { setResults([]); setSearched(false); return; }
    setIsLoading(true); setSearched(true);
    const result = await getBusinesses({ page: 0, pageSize: 20, search: term });
    setResults(result.businesses);
    setTotalCount(result.totalCount);
    setIsLoading(false);
  }, []);

  useEffect(() => { doSearch(debouncedQuery); }, [debouncedQuery, doSearch]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 bg-[#F5F5F7] z-30 flex flex-col">

      {/* ── Search header ── */}
      <div className="bg-white px-4 pt-5 pb-4 shadow-[0_2px_12px_rgba(0,0,0,0.08)] shrink-0">
        <h1 className="text-[22px] font-bold text-[#1A1A1A] mb-3">Search</h1>
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Restaurants, hospitals, cafes…"
            className="w-full bg-[#F5F5F7] rounded-xl py-3 pl-10 pr-10 text-[14px] text-[#1A1A1A] placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#FF6B6B]/30 transition"
            autoFocus
          />
          {query.length > 0 && (
            <button onClick={() => setQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
              <X size={16} />
            </button>
          )}
          {isLoading && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-[#FF6B6B] border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {searched ? (
          /* ── Results ── */
          <div className="px-4 pt-4">
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="text-[14px] font-bold text-[#1A1A1A]">
                {isLoading ? 'Searching…' : <><span className="text-[#FF6B6B]">{totalCount.toLocaleString()}</span> results</>}
              </h3>
              {!isLoading && totalCount > 20 && (
                <p className="text-[11px] text-[#9CA3AF]">Showing top 20</p>
              )}
            </div>

            {results.length > 0 ? (
              <div className="flex flex-col gap-3">
                {results.map(b => <SearchResultCard key={b.id} business={b} onPress={() => push('BusinessDetail', { businessId: String(b.id) })} />)}
                {totalCount > results.length && (
                  <div className="py-4 text-center">
                    <p className="text-[12px] text-[#9CA3AF]">Refine your search to see more specific results</p>
                  </div>
                )}
              </div>
            ) : !isLoading ? (
              <div className="py-20 flex flex-col items-center">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-[15px] font-semibold text-[#374151] mb-1">No results found</p>
                <p className="text-[13px] text-[#9CA3AF]">Try "{query.split(' ')[0]}" or a different city</p>
              </div>
            ) : null}
          </div>
        ) : (
          /* ── Discovery state ── */
          <div className="px-4 pt-5 flex flex-col gap-6 pb-8">
            {/* Category grid */}
            <div>
              <h3 className="text-[15px] font-bold text-[#1A1A1A] mb-3">Browse by Category</h3>
              <div className="grid grid-cols-4 gap-3">
                {CATEGORIES.slice(0, 12).map(cat => (
                  <button key={cat.id} onClick={() => setQuery(cat.nameEn)}
                    className="flex flex-col items-center gap-1.5 group">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center text-2xl border border-gray-100 group-active:scale-90 transition-transform">
                      {cat.icon}
                    </div>
                    <span className="text-[10px] font-semibold text-[#6B7280] text-center leading-tight">{cat.nameEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick searches */}
            <div>
              <h3 className="text-[15px] font-bold text-[#1A1A1A] mb-3">Quick Searches</h3>
              <div className="flex flex-wrap gap-2">
                {QUICK_SEARCHES.map(term => (
                  <button key={term} onClick={() => setQuery(term)}
                    className="bg-white border border-gray-200 text-[#374151] px-3.5 py-1.5 rounded-full text-[12px] font-semibold shadow-sm active:scale-95 transition-transform">
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats banner */}
            <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-4 flex items-center gap-4 border border-gray-100">
              <div className="w-12 h-12 bg-[#FF6B6B]/10 rounded-xl flex items-center justify-center text-2xl shrink-0">🏢</div>
              <div>
                <p className="text-[15px] font-bold text-[#1A1A1A]">6,955 Businesses</p>
                <p className="text-[12px] text-[#9CA3AF] mt-0.5">Across all 19 Iraqi governorates</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SearchResultCard({ business, onPress }: { business: Business; onPress: () => void }) {
  const location = [business.city, business.governorate].filter(Boolean).join(', ');
  const accent   = catColor(business.category);
  const initial  = (business.name ?? '?')[0].toUpperCase();

  return (
    <button onClick={onPress}
      className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.07)] border border-gray-100/80 flex items-center gap-3 p-3 text-left active:scale-[0.98] transition-transform">
      {/* Avatar / image */}
      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0" style={{ background: accent }}>
        {business.imageUrl
          ? <img src={business.imageUrl} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white">{initial}</div>}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-[15px] text-[#1A1A1A] truncate leading-snug">{business.name}</h4>
        {location && (
          <p className="text-[12px] text-[#9CA3AF] flex items-center gap-1 mt-1">
            <MapPin size={11} className="shrink-0" /><span className="truncate">{location}</span>
          </p>
        )}
        {business.phone && (
          <p className="text-[12px] text-[#9CA3AF] flex items-center gap-1 mt-0.5">
            <Phone size={11} className="shrink-0" /><span className="truncate">{business.phone}</span>
          </p>
        )}
      </div>

      {/* Category chip */}
      <div className="shrink-0">
        <span className="text-[10px] font-bold px-2 py-1 rounded-full text-white capitalize"
          style={{ background: accent }}>
          {business.category}
        </span>
      </div>
    </button>
  );
}
