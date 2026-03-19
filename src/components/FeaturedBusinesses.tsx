import { useBusinesses } from '../hooks/useBusinesses';
import { BusinessCard } from './BusinessCard';
import { UI_TEXT } from '../types/constants';
import { Language } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedBusinessesProps {
  selectedCity: string;
  lang: Language;
}

export function FeaturedBusinesses({ selectedCity, lang }: FeaturedBusinessesProps) {
  // For featured, we'll just fetch a few with a higher limit or specific criteria if we had it
  // In this case, we'll just show the first 8
  const { businesses, loading } = useBusinesses(selectedCity, 'all', 8);

  return (
    <section className="py-20 bg-[#0A0E1A]/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#F6C90E] text-sm font-bold tracking-widest uppercase">
              <Sparkles className="w-4 h-4 fill-current" />
              {UI_TEXT[lang].featuredBusinesses}
            </div>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">
              {UI_TEXT[lang].featuredBusinesses}
            </h2>
            <p className="text-white/60 text-lg">
              {UI_TEXT[lang].subSlogans.featured}
            </p>
          </div>
          
          <button className="flex items-center gap-2 text-white/70 hover:text-white font-bold transition-colors group">
            {UI_TEXT[lang].viewDetails}
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex gap-8 overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-72 h-96 bg-white/5 rounded-2xl animate-pulse border border-white/10" />
            ))
          ) : (
            businesses.map((business) => (
              <div key={business.id} className="flex-shrink-0 w-72 snap-start">
                <BusinessCard business={business} lang={lang} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
