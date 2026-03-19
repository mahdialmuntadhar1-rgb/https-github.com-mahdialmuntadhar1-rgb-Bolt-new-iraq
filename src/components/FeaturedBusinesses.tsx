import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MapPin, Phone } from './icons';
import { useTranslations } from '../hooks/useTranslations';
import { GlassCard } from './GlassCard';

interface DirectoryBusiness {
  id: number;
  name: string;
  category: string;
  city: string;
  governorate: string;
  phone: string;
  lat: number | null;
  lng: number | null;
}

const CATEGORY_IMAGES: Record<string, string> = {
  restaurant: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
  school: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
  hospital: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
  hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  bank: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=600&q=80',
  pharmacy: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&q=80',
  cafe: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80',
  supermarket: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80',
  default: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80',
};

const getCategoryImage = (category: string) =>
  CATEGORY_IMAGES[category] || CATEGORY_IMAGES.default;

const formatCategory = (cat: string) =>
  cat.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export const FeaturedBusinesses: React.FC = () => {
  const { t } = useTranslations();
  const [businesses, setBusinesses] = useState<DirectoryBusiness[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from<DirectoryBusiness>('directory')
        .select('id, name, category, city, governorate, phone, lat, lng')
        .not('phone', 'is', null)
        .neq('phone', '')
        .neq('name', 'Unknown')
        .neq('name', '')
        .not('lat', 'is', null)
        .limit(8);
      setBusinesses((data as DirectoryBusiness[]) || []);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t('featured.title')}</h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-shrink-0 w-72 h-64 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (businesses.length === 0) return null;

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">{t('featured.title')}</h2>
          <span className="text-white/40 text-sm">Verified with contact info</span>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {businesses.map((business) => (
            <GlassCard
              key={business.id}
              className="flex-shrink-0 w-72 snap-center overflow-hidden group hover:shadow-glow-primary p-0"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={getCategoryImage(business.category)}
                  alt={business.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-primary/80 text-white text-xs font-medium">
                    {formatCategory(business.category)}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-base mb-2 truncate">{business.name}</h3>
                <div className="flex items-center gap-1 text-white/60 text-sm mb-2">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{business.city || business.governorate}</span>
                </div>
                {business.phone && (
                  <a
                    href={`tel:${business.phone}`}
                    className="flex items-center gap-1.5 text-teal-400 hover:text-teal-300 text-sm transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {business.phone}
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
