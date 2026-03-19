import { UI_TEXT } from '../types/constants';
import { Language } from '../types';
import { Calendar, Tag, MessageSquare, ArrowRight, User } from 'lucide-react';

interface SectionProps {
  lang: Language;
}

export function EventsSection({ lang }: SectionProps) {
  return (
    <section className="py-20 bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#6C63FF] text-sm font-bold tracking-widest uppercase">
              <Calendar className="w-4 h-4" />
              {UI_TEXT[lang].eventsToday}
            </div>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">
              {UI_TEXT[lang].whatHappening}
            </h2>
            <p className="text-white/60 text-lg">
              {UI_TEXT[lang].subSlogans.events}
            </p>
          </div>
          
          <button className="flex items-center gap-2 text-white/70 hover:text-white font-bold transition-colors group">
            {UI_TEXT[lang].viewDetails}
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card group relative overflow-hidden h-64 cursor-pointer">
              <img
                src={`https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop&sig=${i}`}
                alt="Event"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/40 to-transparent z-10" />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="flex items-center gap-2 text-[#FF6B9D] text-xs font-bold mb-2">
                  <Calendar className="w-3 h-3" />
                  <span>MAR 20, 2026 · 8:00 PM</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#6C63FF] transition-colors">
                  Grand Opening Concert
                </h3>
                <p className="text-white/60 text-sm mt-1">Baghdad International Fair</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DealsSection({ lang }: SectionProps) {
  return (
    <section className="py-20 bg-[#0A0E1A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#FF6B9D] text-sm font-bold tracking-widest uppercase">
              <Tag className="w-4 h-4" />
              {UI_TEXT[lang].deals}
            </div>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">
              Exclusive {UI_TEXT[lang].deals}
            </h2>
            <p className="text-white/60 text-lg">
              Save big on your favorite local spots
            </p>
          </div>
          
          <button className="flex items-center gap-2 text-white/70 hover:text-white font-bold transition-colors group">
            {UI_TEXT[lang].viewDetails}
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-card group relative overflow-hidden h-80 flex flex-col">
              <div className="relative h-40">
                <img
                  src={`https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&sig=${i}`}
                  alt="Deal"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-[#FF6B9D] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  -30% OFF
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-2">Weekend Special Dinner</h3>
                <p className="text-white/50 text-xs mb-4 line-clamp-2">Enjoy a 3-course meal for two at Al-Rasheed Restaurant.</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-white/40 line-through">45,000 IQD</span>
                    <span className="text-[#FF6B9D] font-bold">31,500 IQD</span>
                  </div>
                  <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-all">
                    Claim
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CommunityStories({ lang }: SectionProps) {
  const stories = [
    { name: 'Zahra', city: 'Baghdad', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { name: 'Ahmed', city: 'Erbil', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    { name: 'Layla', city: 'Basra', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
    { name: 'Yusuf', city: 'Mosul', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { name: 'Fatima', city: 'Najaf', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
  ];

  return (
    <section className="py-20 bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#6C63FF] text-sm font-bold tracking-widest uppercase">
              <MessageSquare className="w-4 h-4" />
              {UI_TEXT[lang].communityStories}
            </div>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">
              {UI_TEXT[lang].communityStories}
            </h2>
            <p className="text-white/60 text-lg">
              {UI_TEXT[lang].subSlogans.stories}
            </p>
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar">
          {stories.map((s, i) => (
            <div key={i} className="flex-shrink-0 group cursor-pointer text-center space-y-3">
              <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-br from-[#6C63FF] to-[#FF6B9D] group-hover:shadow-[0_0_20px_rgba(108,99,255,0.6)] transition-all duration-500">
                <div className="w-full h-full rounded-full border-2 border-[#0A0E1A] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#0A0E1A] border border-white/10 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                  <User className="w-3 h-3" />
                </div>
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white group-hover:text-[#6C63FF] transition-colors">{s.name}</h4>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">{s.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
