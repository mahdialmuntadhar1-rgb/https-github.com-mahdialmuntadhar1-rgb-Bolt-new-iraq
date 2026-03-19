import { IRAQI_CITIES, UI_TEXT } from '../types/constants';
import { Language } from '../types';

interface CitySelectorProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  lang: Language;
}

export function CitySelector({ selectedCity, setSelectedCity, lang }: CitySelectorProps) {
  return (
    <div className="w-full py-8 bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-gradient-to-b from-[#6C63FF] to-[#FF6B9D] rounded-full" />
          {UI_TEXT[lang].chooseCity}
        </h2>
        
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
          {IRAQI_CITIES.map((city) => (
            <button
              key={city.id}
              onClick={() => setSelectedCity(city.id)}
              className={`flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                selectedCity === city.id
                  ? 'bg-gradient-to-r from-[#6C63FF] to-[#FF6B9D] text-white border-transparent shadow-[0_0_20px_rgba(108,99,255,0.6)] scale-105'
                  : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:bg-white/10'
              }`}
            >
              {lang === 'en' ? city.en : lang === 'ar' ? city.ar : city.ku}
            </button>
          ))}
        </div>
        
        <p className="mt-4 text-sm text-white/50 italic">
          {UI_TEXT[lang].subSlogans.hero}
        </p>
      </div>
    </div>
  );
}
