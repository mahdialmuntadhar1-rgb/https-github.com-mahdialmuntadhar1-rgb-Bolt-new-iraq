import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { categories, governorates } from '../constants';
import type { Business } from '../types';
import { Star, Grid3x3, List, MapPin, Phone, ArrowLeft } from './icons';
import { useTranslations } from '../hooks/useTranslations';
import { GlassCard } from './GlassCard';
import { useBusinesses } from '../hooks/useBusinesses';

const PAGE_SIZE = 50;

interface BusinessCardProps {
  business: Business;
  viewMode: 'grid' | 'list';
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, viewMode }) => {
  const { t, lang } = useTranslations();

  const displayName = lang === 'ar' && business.nameAr ? business.nameAr :
                      lang === 'ku' && business.nameKu ? business.nameKu :
                      business.name;

  const phone = business.phone?.trim();
  const categoryLabel = t(categories.find(c => c.id === business.category)?.nameKey || '') || business.category?.replace(/_/g, ' ');
  const location = business.city || business.governorate || 'Iraq';

  if (viewMode === 'list') {
    return (
      <GlassCard className="p-4 flex gap-4 text-start rtl:text-right items-center">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-white font-semibold text-base truncate">{displayName}</h3>
            <span className={`flex-shrink-0 inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${phone ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-500/10 text-gray-400'}`}>
              {phone ? '✓ Verified' : 'Unverified'}
            </span>
          </div>
          <p className="text-white/50 text-sm mb-1">{categoryLabel}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1 text-white/60 text-sm">
              <MapPin className="w-3.5 h-3.5" />{location}
            </div>
            {phone && (
              <a href={`tel:${phone}`} className="flex items-center gap-1 text-teal-400 hover:text-teal-300 text-sm transition-colors">
                <Phone className="w-3.5 h-3.5" />{phone}
              </a>
            )}
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="overflow-hidden group text-start p-0 hover:border-primary/30 transition-colors">
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-white font-semibold text-base leading-snug">{displayName}</h3>
          <span className={`flex-shrink-0 inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${phone ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-500/10 text-gray-400'}`}>
            {phone ? '✓' : '–'}
          </span>
        </div>
        <p className="text-white/50 text-sm mb-3">{categoryLabel}</p>
        <div className="flex items-center gap-1 text-white/60 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>
        {phone ? (
          <a href={`tel:${phone}`} className="flex items-center gap-1.5 text-teal-400 hover:text-teal-300 text-sm transition-colors">
            <Phone className="w-3.5 h-3.5" />{phone}
          </a>
        ) : (
          <span className="text-gray-600 text-sm italic">No phone listed</span>
        )}
      </div>
    </GlassCard>
  );
};

interface BusinessDirectoryProps {
  initialFilter?: { categoryId: string };
  governorate?: string;
  search?: string;
  onBack?: () => void;
}

export const BusinessDirectory: React.FC<BusinessDirectoryProps> = ({
  initialFilter,
  governorate: externalGovernorate,
  search: externalSearch,
  onBack,
}) => {
  const [filters, setFilters] = useState({
    category: initialFilter?.categoryId || 'all',
    governorate: externalGovernorate || 'all',
    rating: 0,
    search: externalSearch || '',
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { t } = useTranslations();

  const getPageFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const p = parseInt(params.get('page') ?? '1', 10);
    return isNaN(p) || p < 1 ? 0 : p - 1;
  };

  const [page, setPage] = useState(getPageFromUrl);

  const setPageAndUrl = useCallback((newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams(window.location.search);
    if (newPage === 0) {
      params.delete('page');
    } else {
      params.set('page', String(newPage + 1));
    }
    const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, []);

  useEffect(() => {
    setFilters(prev => ({ ...prev, category: initialFilter?.categoryId || 'all' }));
  }, [initialFilter]);

  useEffect(() => {
    setFilters(prev => ({ ...prev, governorate: externalGovernorate || 'all' }));
  }, [externalGovernorate]);

  useEffect(() => {
    setFilters(prev => ({ ...prev, search: externalSearch || '' }));
  }, [externalSearch]);

  useEffect(() => {
    setPageAndUrl(0);
  }, [filters.category, filters.governorate, filters.rating, filters.search, setPageAndUrl]);

  const { businesses, totalCount, isLoading, usingMockData, error } = useBusinesses(filters, page, PAGE_SIZE);

  const filteredBusinesses = useMemo(() => businesses, [businesses]);
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const showingFrom = totalCount === 0 ? 0 : page * PAGE_SIZE + 1;
  const showingTo = Math.min((page + 1) * PAGE_SIZE, totalCount);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center relative mb-8">
          {onBack && (
            <button
              onClick={onBack}
              className="absolute start-0 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden md:inline">{t('header.backToHome')}</span>
            </button>
          )}
          <h2 className="text-3xl font-bold text-white text-center">{t('directory.title')}</h2>
        </div>
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4 text-start rtl:text-right">
            <GlassCard className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center justify-between">
                {t('directory.filters')}
                <button
                  onClick={() => setFilters({ category: 'all', governorate: externalGovernorate || 'all', rating: 0, search: externalSearch || '' })}
                  className="text-xs text-secondary hover:text-secondary/80"
                >
                  {t('directory.reset')}
                </button>
              </h3>
              <div className="mb-4">
                <label className="block text-white/70 text-sm mb-2">Search</label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  placeholder="Name, city, category..."
                  className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 outline-none text-sm focus:border-primary/50 transition-colors"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white/70 text-sm mb-2">{t('directory.category')}</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white outline-none text-sm"
                >
                  <option value="all" className="bg-dark-bg">{t('directory.allCategories')}</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id} className="bg-dark-bg">{t(category.nameKey)}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-white/70 text-sm mb-2">{t('filter.governorate')}</label>
                <select
                  value={filters.governorate}
                  onChange={(e) => setFilters({ ...filters, governorate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white outline-none text-sm"
                >
                  {governorates.map((gov) => (
                    <option key={gov.id} value={gov.value} className="bg-dark-bg">
                      {t(gov.nameKey)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-white/70 text-sm mb-2 block">{t('directory.minimumRating')}</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilters({ ...filters, rating: filters.rating === rating ? 0 : rating })}
                      className={`flex-1 aspect-square rounded-xl flex items-center justify-center transition-all duration-200 ${filters.rating >= rating ? 'bg-gradient-to-br from-accent to-primary' : 'backdrop-blur-xl bg-white/10 hover:bg-white/20'}`}
                    >
                      <Star className={`w-4 h-4 ${filters.rating >= rating ? 'text-white fill-white' : 'text-white/40'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
          <div className="lg:col-span-3">
            {error && !usingMockData && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                Connection error — please try again. ({error})
              </div>
            )}
          <div className="flex items-center justify-between mb-6">
              <p className="text-white/70 text-sm">
                {totalCount > 0 ? (
                  <>Showing <span className="text-white font-semibold">{showingFrom.toLocaleString()}–{showingTo.toLocaleString()}</span> of <span className="text-white font-semibold">{totalCount.toLocaleString()}</span></>
                ) : (
                  <span className="text-white font-semibold">0</span>
                )}{' '}
                {t('directory.businessesFound')}
                {filters.search && <span className="text-secondary"> for "{filters.search}"</span>}
                {filters.governorate !== 'all' && <span className="text-secondary"> in {filters.governorate}</span>}
              </p>
              <div className="flex items-center gap-1 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-1">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary' : 'hover:bg-white/10'}`}>
                  <Grid3x3 className="w-4 h-4 text-white" />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary' : 'hover:bg-white/10'}`}>
                  <List className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            {isLoading && (
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-4'}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-36 rounded-2xl bg-white/5 animate-pulse" />
                ))}
              </div>
            )}
            {!isLoading && usingMockData && (
              <p className="text-yellow-400/70 text-sm mb-4">Showing sample data — Supabase connection unavailable</p>
            )}
            {!isLoading && (
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-4' : 'space-y-3'}>
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} viewMode={viewMode} />
                ))}
              </div>
            )}
            {!isLoading && filteredBusinesses.length === 0 && (
              <div className="text-center py-16 text-white/40">
                <p className="text-lg mb-2">No businesses found</p>
                <p className="text-sm">Try adjusting your filters or search term</p>
              </div>
            )}
            <div className="mt-8 flex items-center justify-between text-sm text-white/60">
              <button
                disabled={page === 0}
                onClick={() => setPageAndUrl(Math.max(0, page - 1))}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 transition-all min-h-[44px]"
              >
                ← Previous
              </button>
              <span>Page {page + 1} of {totalPages.toLocaleString()}</span>
              <button
                disabled={page >= totalPages - 1}
                onClick={() => setPageAndUrl(Math.min(totalPages - 1, page + 1))}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 transition-all min-h-[44px]"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
