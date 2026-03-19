import React from 'react';
import { Business, Language } from '../types';
import { UI_TEXT } from '../types/constants';
import { Star, Phone, MapPin, ExternalLink } from 'lucide-react';

interface BusinessCardProps {
  business: Business;
  lang: Language;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business, lang }) => {
  const fallback = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop&sig=${business.id}`;
  
  return (
    <div className="glass-card group relative overflow-hidden flex flex-col h-full transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={fallback}
          alt={business.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-transparent opacity-60" />
        
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1 bg-gradient-to-r from-[#6C63FF] to-[#FF6B9D] text-white text-[10px] font-bold rounded-full shadow-lg">
            {business.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white group-hover:text-[#6C63FF] transition-colors line-clamp-1">
            {business.name}
          </h3>
          <div className="flex items-center gap-1 text-[#F6C90E]">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-bold">4.5</span>
          </div>
        </div>

        <div className="space-y-2 mb-6 flex-grow">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <MapPin className="w-3.5 h-3.5 text-[#FF6B9D]" />
            <span>{business.governorate}</span>
          </div>
          {business.phone && (
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Phone className="w-3.5 h-3.5 text-[#6C63FF]" />
              <span>{business.phone}</span>
            </div>
          )}
        </div>

        <button className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-gradient-to-r hover:from-[#6C63FF] hover:to-[#FF6B9D] hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2">
          {UI_TEXT[lang].viewDetails}
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
