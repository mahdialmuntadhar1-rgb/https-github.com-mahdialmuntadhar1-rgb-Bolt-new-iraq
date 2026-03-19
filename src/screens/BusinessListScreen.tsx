import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Phone, MapPin } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useLanguage, LangSwitcher } from '../context/LanguageContext';
import { getBusinesses } from '../services/businessService';
import type { Business } from '../types';

type City     = { id: string; ar: string; ku: string; en: string };
type Category = { id: string; ar: string; ku: string; en: string; emoji: string; accent: string };

export function BusinessListScreen({ city, category }: { city: City; category: Category }) {
  const { push, pop } = useNavigation();
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const PAGE = 15;

  const load = useCallback(async (p: number, append: boolean) => {
    if (p === 0) setIsLoading(true); else setIsLoadingMore(true);
    const result = await getBusinesses({ page: p, pageSize: PAGE, category: category.id, governorate: city.id });
    if (append) setBusinesses(prev => [...prev, ...result.businesses]);
    else setBusinesses(result.businesses);
    setTotal(result.totalCount);
    setIsLoading(false);
    setIsLoadingMore(false);
  }, [city.id, category.id]);

  useEffect(() => { setPage(0); load(0, false); }, [load]);

  const cityName = lang === 'ku' ? city.ku : lang === 'en' ? city.en : city.ar;
  const catName  = category[lang as 'ar' | 'ku' | 'en'] ?? category.en;

  const FILTERS = [
    { id: 'all',    label: t.allFilter },
    { id: 'rating', label: t.topRated },
    { id: 'open',   label: t.openNow },
  ];

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: '#0A1628' }}>

      {/* ── Header ── */}
      <div className="shrink-0 px-4 pt-10 pb-3" style={{ background: 'linear-gradient(160deg, #0A1628 0%, #1E3A5F 100%)' }}>
        <div className="flex items-center gap-3 mb-1">
          <button onClick={pop} className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid #D4A017' }}>
            <ChevronRight size={20} style={{ color: '#D4A017' }} />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-[15px] leading-tight truncate">
              {category.emoji} {catName} — {cityName}
            </p>
            <p className="text-[12px]" style={{ color: '#D4A017' }}>
              {isLoading ? '…' : `${total.toLocaleString('ar-IQ')} ${t.results}`}
            </p>
          </div>
          <LangSwitcher compact />
        </div>

        {/* Breadcrumb */}
        <p className="text-[12px] mb-3" style={{ color: '#64748B' }}>
          {t.chooseCity} ← {city.ar} ← <span style={{ color: '#D4A017' }}>{category.ar}</span>
        </p>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {FILTERS.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className="shrink-0 text-[12px] font-bold px-4 py-1.5 rounded-full border transition-all"
              style={filter === f.id
                ? { background: '#D4A017', color: '#0A1628', borderColor: '#D4A017' }
                : { background: '#0F2040', color: '#fff', borderColor: '#1E3A5F' }}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-3 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4A017, transparent)' }} />
      </div>

      {/* ── List ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden animate-pulse" style={{ background: '#0F2040', border: '1px solid #1E3A5F' }}>
              <div className="h-36" style={{ background: '#1E3A5F' }} />
              <div className="p-4 space-y-2">
                <div className="h-4 rounded w-3/4" style={{ background: '#1E3A5F' }} />
                <div className="h-3 rounded w-1/2" style={{ background: '#1E3A5F' }} />
              </div>
            </div>
          ))
        ) : businesses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-3">
            <span className="text-5xl">🔍</span>
            <p className="text-[14px]" style={{ color: '#64748B' }}>{t.noResults}</p>
          </div>
        ) : (
          <>
            {businesses.map(biz => (
              <motion.div
                key={biz.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => push('BusinessDetail', { businessId: biz.id, category })}
                className="rounded-2xl overflow-hidden cursor-pointer"
                style={{ background: '#0F2040', border: '1px solid #1E3A5F', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
              >
                {/* Card image */}
                <div className="h-36 flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg, ${category.accent}22, ${category.accent}55)` }}>
                  <span className="text-5xl font-black"
                    style={{ color: category.accent, textShadow: `0 0 30px ${category.accent}88` }}>
                    {(biz.name ?? '?')[0].toUpperCase()}
                  </span>
                  <span className="absolute bottom-2 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                    style={{ background: 'rgba(0,0,0,0.55)', color: '#fff' }}>
                    {catName}
                  </span>
                  {/* Dashboard button top-right */}
                  <button
                    onClick={e => { e.stopPropagation(); push('BusinessDashboard', { businessId: biz.id }); }}
                    className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(212,160,23,0.2)', border: '1px solid #D4A017', color: '#D4A017' }}>
                    {t.manageBtn}
                  </button>
                </div>
                {/* Body */}
                <div className="px-4 pt-3 pb-4">
                  <p className="text-white font-bold text-[16px] leading-tight mb-1">{biz.name}</p>
                  <p className="text-[13px] mb-3" style={{ color: '#94A3B8' }}>
                    {catName} · {biz.city ?? biz.governorate}
                  </p>
                  <div className="flex gap-2">
                    {biz.phone && (
                      <a href={`tel:${biz.phone}`} onClick={e => e.stopPropagation()}
                        className="flex items-center gap-1 text-[12px] font-semibold px-3 py-1.5 rounded-full border"
                        style={{ borderColor: '#1E3A5F', color: '#94A3B8' }}>
                        <Phone size={12} /> {t.callNow.split('/')[0].trim()}
                      </a>
                    )}
                    <span className="flex items-center gap-1 text-[12px] px-3 py-1.5 rounded-full border"
                      style={{ borderColor: '#1E3A5F', color: '#64748B' }}>
                      <MapPin size={12} /> {biz.city ?? biz.governorate}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {businesses.length < total && (
              <button onClick={() => { const next = page + 1; setPage(next); load(next, true); }}
                disabled={isLoadingMore}
                className="w-full py-3 rounded-2xl font-bold text-[14px] border transition-all"
                style={{ borderColor: '#D4A017', color: '#D4A017', background: 'transparent' }}>
                {isLoadingMore ? '…' : `${t.loadMore} (${(total - businesses.length).toLocaleString('ar-IQ')} ${t.results})`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
