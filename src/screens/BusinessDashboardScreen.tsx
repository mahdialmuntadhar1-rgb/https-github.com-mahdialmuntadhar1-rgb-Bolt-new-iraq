import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Eye, Phone, MapPin, Star, Edit3, CheckCircle, Lock } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

type DbBusiness = {
  id: string; name: string | null; category: string | null;
  city: string | null; governorate: string | null; phone: string | null; address: string | null;
};

const DEMO_STATS = [
  { icon: '👁', label: 'Views this week', ar: 'مشاهدات هذا الأسبوع', value: '247', color: '#3B82F6' },
  { icon: '📞', label: 'Calls received', ar: 'مكالمات واردة', value: '18', color: '#10B981' },
  { icon: '📍', label: 'Direction taps', ar: 'طلبات الاتجاه', value: '31', color: '#F59E0B' },
  { icon: '⭐', label: 'Avg. Rating', ar: 'متوسط التقييم', value: '4.2', color: '#8B5CF6' },
];

export function BusinessDashboardScreen({ businessId }: { businessId: string }) {
  const { pop, push } = useNavigation();
  const { user } = useAuth();
  const [business, setBusiness] = useState<DbBusiness | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // A real app would check a `claimed_by` column; for now demo shows if NOT logged in
  const isClaimed = !!user;

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from<DbBusiness>('businesses')
        .select('id,name,category,city,governorate,phone,address')
        .eq('id', businessId);
      setBusiness(data?.[0] ?? null);
      setIsLoading(false);
    };
    load();
  }, [businessId]);

  if (isLoading) {
    return (
      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} className="absolute inset-0 bg-[#F0F2F5] z-50 flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-[#1E3A5F] border-t-transparent rounded-full animate-spin" />
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 26, stiffness: 220 }}
      className="absolute inset-0 bg-[#F0F2F5] z-50 flex flex-col overflow-hidden">

      {/* ── Header ── */}
      <div className="bg-white px-4 pt-4 pb-4 shadow-sm border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={pop} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <ChevronLeft size={20} className="text-[#374151]" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-[16px] font-bold text-[#111827] truncate">{business?.name ?? 'Business'}</h1>
            <p className="text-[12px] text-[#9CA3AF] capitalize">{business?.category} · {business?.city}</p>
          </div>
          {isClaimed && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
              <CheckCircle size={12} /> Claimed
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
        {/* ── DEMO BANNER (unclaimed) ── */}
        {!isClaimed && (
          <div className="rounded-2xl p-4 border-2" style={{ background: 'linear-gradient(135deg, #D4A017/20, #F59E0B/10)', borderColor: '#D4A017' }}>
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">🏪</span>
              <div className="flex-1">
                <p className="font-bold text-[15px]" style={{ color: '#92400E' }}>هذا عملك؟ / Is this your business?</p>
                <p className="text-[12px] mt-1" style={{ color: '#78350F' }}>Claim it free and take control of your listing</p>
              </div>
            </div>
            <button onClick={() => push('Register')}
              className="mt-3 w-full py-2.5 rounded-xl font-bold text-[14px] text-white shadow-md"
              style={{ background: '#D4A017' }}>
              ✨ Claim Free — احصل عليه مجاناً
            </button>
          </div>
        )}

        {/* ── Stats grid ── */}
        <div>
          <h3 className="text-[13px] font-bold text-[#374151] mb-2">
            {isClaimed ? 'Your Analytics' : 'Preview Analytics'} {!isClaimed && '🔒'}
          </h3>
          <div className="grid grid-cols-2 gap-3 relative">
            {DEMO_STATS.map(stat => (
              <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.07)] border border-gray-100">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <p className="text-[22px] font-bold text-[#111827]">{stat.value}</p>
                <p className="text-[11px] text-[#9CA3AF] mt-0.5">{stat.label}</p>
                <p className="text-[10px] text-[#9CA3AF]">{stat.ar}</p>
              </div>
            ))}
            {/* Blur overlay for unclaimed */}
            {!isClaimed && (
              <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center"
                style={{ backdropFilter: 'blur(4px)', background: 'rgba(255,255,255,0.6)' }}>
                <Lock size={28} className="text-[#1E3A5F] mb-2" />
                <p className="text-[13px] font-bold text-[#1E3A5F]">Claim to unlock analytics</p>
                <p className="text-[11px] text-[#6B7280] mt-0.5">سجّل للوصول إلى الإحصائيات</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Business info card ── */}
        <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.07)] border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-[14px] text-[#111827]">Business Details</h3>
            {isClaimed && (
              <button className="flex items-center gap-1 text-[12px] font-semibold text-[#1E3A5F] bg-[#1E3A5F]/8 px-2.5 py-1 rounded-full">
                <Edit3 size={12} /> Edit
              </button>
            )}
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { icon: <Phone size={15} className="text-[#10B981]" />, label: 'Phone', value: business?.phone ?? 'Not listed' },
              { icon: <MapPin size={15} className="text-[#FF6B6B]" />, label: 'Address', value: business?.address ?? ([business?.city, business?.governorate].filter(Boolean).join(', ') || 'Not listed') },
              { icon: <Star size={15} className="text-[#F59E0B]" />, label: 'Category', value: business?.category ?? '—' },
            ].map(row => (
              <div key={row.label} className="px-4 py-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">{row.icon}</div>
                <div className="min-w-0">
                  <p className="text-[11px] text-[#9CA3AF]">{row.label}</p>
                  <p className="text-[14px] font-semibold text-[#111827] truncate capitalize">{row.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Offers section (claimed only, otherwise teaser) ── */}
        <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.07)] border border-gray-100 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-[14px] text-[#111827]">Offers & Posts</h3>
            {isClaimed && (
              <button className="text-[12px] font-bold text-white bg-[#1E3A5F] px-3 py-1.5 rounded-full">+ Add Offer</button>
            )}
          </div>
          <div className="space-y-2">
            {[
              { title: 'Weekend Discount 20%', date: 'Active until March 30', emoji: '🏷️' },
              { title: 'Free Delivery Over 25k IQD', date: 'Ongoing', emoji: '🚚' },
            ].map(offer => (
              <div key={offer.title} className="flex items-center gap-3 p-3 bg-[#F0F2F5] rounded-xl">
                <span className="text-xl">{offer.emoji}</span>
                <div>
                  <p className="text-[13px] font-semibold text-[#111827]">{offer.title}</p>
                  <p className="text-[11px] text-[#9CA3AF]">{offer.date}</p>
                </div>
              </div>
            ))}
          </div>
          {!isClaimed && (
            <div className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ backdropFilter: 'blur(4px)', background: 'rgba(255,255,255,0.7)' }}>
              <Lock size={22} className="text-[#1E3A5F] mb-1.5" />
              <p className="text-[12px] font-bold text-[#1E3A5F]">Claim to manage offers</p>
            </div>
          )}
        </div>

        {/* Bottom CTA for unclaimed */}
        {!isClaimed && (
          <div className="bg-[#1E3A5F] rounded-2xl p-5 text-center">
            <p className="text-white font-bold text-[16px] mb-1">Take Control — تحكم بعملك</p>
            <p className="text-white/70 text-[12px] mb-4">247 people viewed this listing last week</p>
            <button onClick={() => push('Register')}
              className="w-full py-3 rounded-xl font-bold text-[14px] shadow-md"
              style={{ background: '#D4A017', color: '#1A1A1A' }}>
              Claim Business Free / احصل عليه مجاناً
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
