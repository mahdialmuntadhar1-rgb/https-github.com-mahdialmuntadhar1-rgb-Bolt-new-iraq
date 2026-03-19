import React, { useState } from 'react';
import { Business, Language } from '../types';
import { UI_TEXT } from '../types/constants';
import { Star, Phone, MapPin, ExternalLink, Clock, Globe } from 'lucide-react';
import { Modal } from './Modal';

interface BusinessCardProps {
  business: Business;
  lang: Language;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business, lang }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fallback = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop&sig=${business.id}`;
  
  return (
    <>
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

          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-gradient-to-r hover:from-[#6C63FF] hover:to-[#FF6B9D] hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2"
          >
            {UI_TEXT[lang].viewDetails}
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={business.name}
      >
        <div className="space-y-8">
          <div className="relative h-64 rounded-2xl overflow-hidden">
            <img
              src={fallback}
              alt={business.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121826] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="px-4 py-1.5 bg-[#6C63FF] text-white text-xs font-bold rounded-full shadow-xl">
                {business.category}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">About</h4>
                <p className="text-white/70 leading-relaxed">
                  A premier {business.category.toLowerCase()} located in the heart of {business.governorate}. 
                  Providing exceptional service and quality to the local community.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Contact Info</h4>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-[#6C63FF]" />
                  </div>
                  <span>{business.phone || 'No phone provided'}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#FF6B9D]" />
                  </div>
                  <span>{business.governorate}, Iraq</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-[#F6C90E]" />
                  </div>
                  <span>www.{business.name.toLowerCase().replace(/\s+/g, '')}.iq</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Opening Hours
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Mon - Fri</span>
                    <span className="text-white font-medium">9:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Sat - Sun</span>
                    <span className="text-white font-medium">10:00 AM - 11:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-grow py-4 bg-[#6C63FF] text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all">
                  Call Now
                </button>
                <button className="px-6 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
