import React, { useState } from 'react';
import { Globe, PlusCircle } from 'lucide-react';
import { Language } from '../types';
import { UI_TEXT } from '../types/constants';
import { Modal } from './Modal';
import { BusinessForm } from './BusinessForm';

const languages = [
  { code: 'en', label: 'English', dir: 'ltr', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', dir: 'rtl', flag: '🇮🇶' },
  { code: 'ku', label: 'کوردی', dir: 'rtl', flag: '🟡' },
];

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export function Header({ lang, setLang }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0A0E1A]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#FF6B9D] flex items-center justify-center">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Iraq Compass</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-full text-sm font-bold hover:bg-white/10 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-[#6C63FF]" />
            {UI_TEXT[lang].listYourBusiness}
          </button>

          <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code as Language)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  lang === l.code
                    ? 'bg-gradient-to-r from-[#6C63FF] to-[#FF6B9D] text-white shadow-[0_0_15px_rgba(108,99,255,0.4)]'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{l.flag}</span>
                <span className="hidden sm:inline">{l.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={UI_TEXT[lang].listYourBusiness}
      >
        <BusinessForm lang={lang} onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </header>
  );
}
