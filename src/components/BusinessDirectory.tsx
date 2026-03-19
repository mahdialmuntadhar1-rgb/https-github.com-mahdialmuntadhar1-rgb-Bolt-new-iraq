import { useBusinesses } from '../hooks/useBusinesses';
import { BusinessCard } from './BusinessCard';
import { UI_TEXT } from '../types/constants';
import { Language } from '../types';
import { Rocket, Loader2, AlertCircle, FilterX } from 'lucide-react';
import { forwardRef } from 'react';

interface BusinessDirectoryProps {
  selectedCity: string;
  selectedCategory: string;
  lang: Language;
  onClearFilters: () => void;
}

export const BusinessDirectory = forwardRef<HTMLDivElement, BusinessDirectoryProps>(
  ({ selectedCity, selectedCategory, lang, onClearFilters }, ref) => {
    const { businesses, loading, error } = useBusinesses(selectedCity, selectedCategory, 12);

    return (
      <section ref={ref} className="py-20 bg-[#0A0E1A] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-extrabold text-white mb-3 tracking-tight">
                {UI_TEXT[lang].businessDirectory}
              </h2>
              <p className="text-white/60 text-lg max-w-2xl">
                {UI_TEXT[lang].subSlogans.directory}
              </p>
            </div>

            <button className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#6C63FF] to-[#FF6B9D] text-white rounded-full font-bold text-sm shadow-[0_0_25px_rgba(108,99,255,0.4)] hover:scale-105 transition-all duration-300">
              <Rocket className="w-4 h-4" />
              {UI_TEXT[lang].listYourBusiness}
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-10 flex items-center justify-between shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-[#6C63FF] animate-pulse" />
              Showing {businesses.length} results
              {selectedCategory !== 'all' && (
                <span className="px-2 py-0.5 bg-[#6C63FF]/20 text-[#6C63FF] rounded-md border border-[#6C63FF]/30">
                  in "{selectedCategory}"
                </span>
              )}
              {selectedCity !== 'all' ? (
                <span className="text-white/40">· {selectedCity}</span>
              ) : (
                <span className="text-white/40">· All Iraq</span>
              )}
            </div>

            {(selectedCity !== 'all' || selectedCategory !== 'all') && (
              <button
                onClick={onClearFilters}
                className="flex items-center gap-1.5 text-xs font-bold text-[#FF6B9D] hover:text-white transition-colors"
              >
                <FilterX className="w-3.5 h-3.5" />
                {UI_TEXT[lang].clearFilters}
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="w-12 h-12 text-[#6C63FF] animate-spin" />
              <p className="text-white/50 animate-pulse">Fetching businesses...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Supabase request failed</h3>
              <p className="text-white/50 max-w-md">{error}</p>
            </div>
          ) : businesses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <FilterX className="w-10 h-10 text-white/20" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">{UI_TEXT[lang].noResults}</h3>
                <p className="text-white/40">Try adjusting your filters or search criteria</p>
              </div>
              <button
                onClick={onClearFilters}
                className="px-8 py-3 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-all"
              >
                {UI_TEXT[lang].clearFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {businesses.map((business) => (
                <BusinessCard key={business.id} business={business} lang={lang} />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
);

BusinessDirectory.displayName = 'BusinessDirectory';
