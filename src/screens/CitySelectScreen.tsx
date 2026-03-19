import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { GOVERNORATES } from '../data/mockData';
import { ChevronLeft, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface CitySelectScreenProps {
  selectedCity: string;
  setSelectedCity: (id: string) => void;
}

export function CitySelectScreen({ selectedCity, setSelectedCity }: CitySelectScreenProps) {
  const { pop } = useNavigation();

  const handleSelect = (id: string) => {
    setSelectedCity(id);
    pop();
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-white z-50 flex flex-col"
    >
      <div className="pt-safe px-4 pb-3 shadow-sm border-b border-gray-100 flex items-center gap-3">
        <button onClick={pop} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Select City</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => handleSelect('all')}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-colors text-left ${selectedCity === 'all' ? 'border-[#FF6B6B] bg-[#FF6B6B]/5' : 'border-gray-100 hover:border-[#FF6B6B] hover:bg-[#FF6B6B]/5'}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">🇮🇶</div>
              <span className="font-bold text-gray-900">All Cities</span>
            </div>
          </button>
          {GOVERNORATES.map((city) => (
            <button
              key={city.id}
              onClick={() => handleSelect(city.id)}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-colors text-left ${selectedCity === city.id ? 'border-[#FF6B6B] bg-[#FF6B6B]/5' : 'border-gray-100 hover:border-[#FF6B6B] hover:bg-[#FF6B6B]/5'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <MapPin size={20} />
                </div>
                <span className="font-bold text-gray-900">{city.nameEn}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
