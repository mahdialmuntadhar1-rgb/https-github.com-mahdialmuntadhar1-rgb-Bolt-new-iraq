import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { UI_TEXT } from '../types/constants';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

export function Hero({ lang }: HeroProps) {
  const [sloganIndex, setSloganIndex] = useState(0);
  const slogans = UI_TEXT[lang].slogans;

  useEffect(() => {
    const interval = setInterval(() => {
      setSloganIndex((prev) => (prev + 1) % slogans.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slogans.length]);

  return (
    <div className="relative py-20 overflow-hidden flex flex-col items-center justify-center text-center px-4">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0A0E1A]/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1580130089855-467406b05b63?q=80&w=2000&auto=format&fit=crop"
          alt="Iraq Background"
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <div className="h-24 sm:h-32 flex items-center justify-center mb-6">
          <h1
            key={sloganIndex}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white animate-fade-in"
            style={{ animation: 'fadeIn 1s ease-in-out' }}
          >
            {slogans[sloganIndex]}
          </h1>
        </div>

        <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium">
          {UI_TEXT[lang].subSlogans.hero}
        </p>

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-white/50" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent focus:bg-white/15 transition-all shadow-lg backdrop-blur-sm text-lg"
            placeholder={UI_TEXT[lang].searchPlaceholder}
          />
          <button className="absolute inset-y-2 right-2 px-6 bg-gradient-to-r from-[#6C63FF] to-[#FF6B9D] text-white rounded-full font-semibold hover:shadow-[0_0_20px_rgba(108,99,255,0.6)] transition-all">
            Search
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
