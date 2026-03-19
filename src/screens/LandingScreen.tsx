import React from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../context/NavigationContext';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus } from 'lucide-react';

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' } }),
};

export function LandingScreen() {
  const { push } = useNavigation();
  const { user } = useAuth();

  return (
    <div
      className="w-full h-full flex flex-col overflow-y-auto no-scrollbar"
      style={{ background: 'linear-gradient(160deg, #0F1F35 0%, #1E3A5F 50%, #162D4A 100%)' }}
    >
      {/* ── Header ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pt-12 pb-6">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          className="mb-8 text-center">
          <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4 shadow-xl">
            <span className="text-4xl">🧭</span>
          </div>
          <h1 className="text-white text-3xl font-bold leading-tight">
            Iraq<span style={{ color: '#D4A017' }}>Compass</span>
          </h1>
          <p className="text-white/60 text-sm mt-1 font-medium">بوصلة العراق · کومپاسی عێراق</p>
          <p className="text-white/40 text-xs mt-2">Discover businesses & stories across Iraq</p>
        </motion.div>

        {/* Two big entry cards */}
        <div className="w-full flex flex-col gap-4">
          {/* Madinaty card */}
          <motion.button
            custom={0} variants={CARD_VARIANTS} initial="hidden" animate="visible"
            whileTap={{ scale: 0.97 }}
            onClick={() => push('Home', { initialTab: 'madinaty' })}
            className="w-full rounded-[20px] overflow-hidden shadow-2xl text-left"
            style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #2D6A9F 100%)', minHeight: 160 }}
          >
            <div className="p-6 flex items-center gap-5 h-full">
              <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center text-4xl shrink-0 border border-white/20">
                🏪
              </div>
              <div className="flex-1">
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">Business Directory</p>
                <h2 className="text-white text-[22px] font-bold leading-tight">مدينتي</h2>
                <h3 className="text-white text-[18px] font-semibold">Madinaty</h3>
                <p className="text-white/60 text-[13px] mt-1">6,955+ businesses across Iraq</p>
              </div>
              <div className="text-white/40 text-2xl">›</div>
            </div>
          </motion.button>

          {/* Shakumaku card */}
          <motion.button
            custom={1} variants={CARD_VARIANTS} initial="hidden" animate="visible"
            whileTap={{ scale: 0.97 }}
            onClick={() => push('Home', { initialTab: 'shakumaku' })}
            className="w-full rounded-[20px] overflow-hidden shadow-2xl text-left"
            style={{ background: 'linear-gradient(135deg, #6B21A8 0%, #BE123C 100%)', minHeight: 160 }}
          >
            <div className="p-6 flex items-center gap-5 h-full">
              <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center text-4xl shrink-0 border border-white/20">
                📣
              </div>
              <div className="flex-1">
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">Social Feed</p>
                <h2 className="text-white text-[22px] font-bold leading-tight">شكومكو</h2>
                <h3 className="text-white text-[18px] font-semibold">Shakumaku</h3>
                <p className="text-white/60 text-[13px] mt-1">Discover stories & local posts</p>
              </div>
              <div className="text-white/40 text-2xl">›</div>
            </div>
          </motion.button>
        </div>

        {/* Stats strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="flex items-center gap-6 mt-8">
          {[['6,955+', 'Businesses'], ['19', 'Governorates'], ['15+', 'Categories']].map(([val, label]) => (
            <div key={label} className="text-center">
              <p className="text-white font-bold text-lg leading-none" style={{ color: '#D4A017' }}>{val}</p>
              <p className="text-white/50 text-[11px] mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Auth footer ── */}
      <div className="px-5 pb-8 shrink-0">
        {user ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white/10 rounded-2xl p-4 flex items-center gap-3 border border-white/15">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">👤</div>
            <div>
              <p className="text-white font-semibold text-[14px]">{user.full_name ?? user.email}</p>
              <p className="text-white/50 text-[11px] capitalize">{user.role ?? 'Member'}</p>
            </div>
            <button onClick={() => push('Profile')} className="ml-auto text-[12px] font-bold text-white/70 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
              Profile
            </button>
          </motion.div>
        ) : (
          <div className="flex gap-3">
            <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              onClick={() => push('Login')}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/25 text-white font-semibold text-[14px] bg-white/8">
              <LogIn size={16} /> Sign In / تسجيل دخول
            </motion.button>
            <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              onClick={() => push('Register')}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-[14px] shadow-lg"
              style={{ background: '#D4A017', color: '#1A1A1A' }}>
              <UserPlus size={16} /> Register / سجّل
            </motion.button>
          </div>
        )}
        <p className="text-center text-white/25 text-[10px] mt-4">Iraq Compass · بوصلة العراق</p>
      </div>
    </div>
  );
}
