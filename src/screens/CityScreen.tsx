import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useLanguage, LangSwitcher } from '../context/LanguageContext';
import { CATEGORIES } from '../data/directory';

type City = { id: string; ar: string; ku: string; en: string; emoji: string; count: number };

export function CityScreen({ city }: { city: City }) {
  const { push, pop } = useNavigation();
  const { t, lang } = useLanguage();

  const cityName = lang === 'ku' ? city.ku : lang === 'en' ? city.en : city.ar;

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: '#070F1E' }}>

      {/* ── Header ── */}
      <div
        className="shrink-0 px-4 pt-10 pb-5"
        style={{ background: 'linear-gradient(180deg, #0D1F3C 0%, #0A1628 100%)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={pop}
            className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-all active:scale-90"
            style={{
              background: 'rgba(212,160,23,0.12)',
              border: '1.5px solid rgba(212,160,23,0.4)',
              boxShadow: '0 2px 8px rgba(212,160,23,0.1)',
            }}
          >
            <ChevronRight size={22} style={{ color: '#D4A017' }} />
          </button>

          {/* City info centred */}
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center gap-2 mb-0.5">
              <span className="text-3xl">{city.emoji}</span>
              <div className="text-right">
                <p className="text-white font-bold text-[18px] leading-tight">{city.ar}</p>
                <p className="text-[11px]" style={{ color: '#D4A017' }}>{city.ku} · {city.en}</p>
              </div>
            </div>
            <p className="text-[11px] mt-1" style={{ color: '#64748B' }}>
              {city.count.toLocaleString('ar-IQ')} {t.businesses}
            </p>
          </div>

          <LangSwitcher compact />
        </div>

        {/* Breadcrumb */}
        <p className="text-center text-[12px] mb-4" style={{ color: '#64748B' }}>
          {t.chooseCity} ‹ <span style={{ color: '#D4A017' }}>{cityName}</span>
        </p>

        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4A017 40%, #D4A017 60%, transparent)' }} />
      </div>

      {/* ── Category grid ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-8">
        {/* Section header */}
        <div className="flex items-baseline justify-between mt-5 mb-1">
          <p className="text-[12px]" style={{ color: '#64748B' }}>{CATEGORIES.length} {t.chooseCategorySub}</p>
          <p className="font-bold text-[16px]" style={{ color: '#D4A017' }}>{t.chooseCategory}</p>
        </div>
        <div className="h-px mb-4" style={{ background: 'linear-gradient(90deg, transparent, #1E3A5F, transparent)' }} />

        <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.map((cat, i) => {
            const label = cat[lang as 'ar' | 'ku' | 'en'] ?? cat.en;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.035, duration: 0.35, ease: 'easeOut' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => push('BusinessList', { city, category: cat })}
                className="rounded-3xl flex flex-col items-center text-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #0F2040 0%, #0A1628 100%)',
                  border: `1px solid ${cat.accent}44`,
                  boxShadow: `0 8px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
                  padding: '20px 12px 16px',
                }}
              >
                {/* Top glow radial */}
                <div
                  className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${cat.accent}28 0%, transparent 70%)` }}
                />

                {/* Left accent strip */}
                <div
                  className="absolute left-0 top-4 bottom-4 w-1 rounded-full"
                  style={{ background: `linear-gradient(180deg, ${cat.accent}cc, ${cat.accent}22)` }}
                />

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${cat.accent}66, transparent)` }}
                />

                {/* Emoji */}
                <span
                  className="text-[40px] mb-3 relative z-10"
                  style={{ filter: `drop-shadow(0 4px 14px ${cat.accent}77)` }}
                >
                  {cat.emoji}
                </span>

                {/* Label */}
                <p className="text-white font-bold text-[14px] leading-tight mb-1 relative z-10">{label}</p>
                <p className="text-[10px] mb-3 relative z-10" style={{ color: '#64748B' }}>{cat.en}</p>

                {/* Count badge */}
                <span
                  className="relative z-10 text-[11px] font-bold px-3 py-1 rounded-full"
                  style={{
                    background: `${cat.accent}22`,
                    border: `1px solid ${cat.accent}55`,
                    color: cat.accent,
                  }}
                >
                  ٣٦٠ {t.businesses}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
