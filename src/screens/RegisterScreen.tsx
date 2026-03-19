import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useAuth } from '../context/AuthContext';

const GOVERNORATES_AR = [
  { en: 'Baghdad', ar: 'بغداد' }, { en: 'Basra', ar: 'البصرة' }, { en: 'Erbil', ar: 'أربيل' },
  { en: 'Sulaymaniyah', ar: 'السليمانية' }, { en: 'Najaf', ar: 'النجف' }, { en: 'Karbala', ar: 'كربلاء' },
  { en: 'Mosul', ar: 'الموصل' }, { en: 'Kirkuk', ar: 'كركوك' }, { en: 'Anbar', ar: 'الأنبار' },
  { en: 'Diyala', ar: 'ديالى' }, { en: 'Babil', ar: 'بابل' }, { en: 'Wasit', ar: 'واسط' },
  { en: 'Maysan', ar: 'ميسان' }, { en: 'Dhi Qar', ar: 'ذي قار' }, { en: 'Muthanna', ar: 'المثنى' },
  { en: 'Qadisiyyah', ar: 'القادسية' }, { en: 'Saladin', ar: 'صلاح الدين' }, { en: 'Dohuk', ar: 'دهوك' },
];

const ROLES = [
  { value: 'citizen', label: 'Citizen', ar: '👤 مواطن' },
  { value: 'business', label: 'Business Owner', ar: '🏪 صاحب عمل' },
  { value: 'organization', label: 'Organization', ar: '🏛 منظمة' },
];

const Field = ({ label, arLabel, children }: { label: string; arLabel: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <div className="flex items-baseline justify-between">
      <label className="text-[13px] font-semibold text-[#374151]">{label}</label>
      <span className="text-[12px] text-[#9CA3AF]">{arLabel}</span>
    </div>
    {children}
  </div>
);

const inputCls = "w-full bg-[#F0F2F5] rounded-xl px-4 py-3 text-[14px] text-[#111827] placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 transition";

export function RegisterScreen() {
  const { pop, push, reset } = useNavigation();
  const { signUp } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '', governorate: '', role: 'citizen' });
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirm) { setError('Passwords do not match / كلمتا المرور غير متطابقتين'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setIsLoading(true);
    const { error: err } = await signUp(form.email, form.password, {
      full_name: form.name, phone: form.phone,
      governorate: form.governorate, role: form.role,
    });
    setIsLoading(false);
    if (err) { setError(err); return; }
    setSuccess(true);
    setTimeout(() => reset('Landing'), 2000);
  };

  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 26, stiffness: 220 }}
      className="absolute inset-0 bg-[#F0F2F5] z-50 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-4 shadow-sm border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={pop} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <ChevronLeft size={20} className="text-[#374151]" />
          </button>
          <div>
            <h1 className="text-[17px] font-bold text-[#111827]">Create Account</h1>
            <p className="text-[12px] text-[#9CA3AF]">إنشاء حساب جديد</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5">
        {success ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center h-full gap-4">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={40} className="text-green-500" />
            </div>
            <p className="text-[18px] font-bold text-[#111827]">Welcome aboard! 🎉</p>
            <p className="text-[#6B7280] text-[13px] text-center">Check your email to verify your account</p>
          </motion.div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
                <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                <p className="text-[13px] text-red-600">{error}</p>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-4 space-y-4 border border-gray-100">
              <Field label="Full Name" arLabel="الاسم الكامل">
                <input className={inputCls} placeholder="Ahmad Al-Rashidi" value={form.name} onChange={set('name')} required />
              </Field>
              <Field label="Email" arLabel="البريد الإلكتروني">
                <input type="email" className={inputCls} placeholder="ahmad@email.com" value={form.email} onChange={set('email')} required />
              </Field>
              <Field label="Phone (Iraqi)" arLabel="رقم الهاتف">
                <input className={inputCls} placeholder="+964 7XX XXX XXXX" value={form.phone} onChange={set('phone')} />
              </Field>
              <Field label="Password" arLabel="كلمة المرور">
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} className={inputCls + ' pr-12'} placeholder="Min. 6 characters" value={form.password} onChange={set('password')} required />
                  <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </Field>
              <Field label="Confirm Password" arLabel="تأكيد كلمة المرور">
                <input type={showPw ? 'text' : 'password'} className={inputCls} placeholder="Repeat password" value={form.confirm} onChange={set('confirm')} required />
              </Field>
            </div>

            <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-4 space-y-4 border border-gray-100">
              <Field label="Governorate" arLabel="المحافظة">
                <select className={inputCls} value={form.governorate} onChange={set('governorate')} required>
                  <option value="">Select your governorate…</option>
                  {GOVERNORATES_AR.map(g => (
                    <option key={g.en} value={g.en}>{g.ar} — {g.en}</option>
                  ))}
                </select>
              </Field>

              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <label className="text-[13px] font-semibold text-[#374151]">Account Type</label>
                  <span className="text-[12px] text-[#9CA3AF]">نوع الحساب</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {ROLES.map(r => (
                    <button type="button" key={r.value}
                      onClick={() => setForm(f => ({ ...f, role: r.value }))}
                      className={`rounded-xl p-3 text-center border-2 transition-all ${form.role === r.value ? 'border-[#1E3A5F] bg-[#1E3A5F]/5' : 'border-gray-200 bg-gray-50'}`}>
                      <p className="text-xl mb-1">{r.ar.split(' ')[0]}</p>
                      <p className={`text-[11px] font-semibold ${form.role === r.value ? 'text-[#1E3A5F]' : 'text-[#6B7280]'}`}>{r.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full py-3.5 rounded-2xl font-bold text-[15px] text-white shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              style={{ background: isLoading ? '#9CA3AF' : '#1E3A5F' }}>
              {isLoading ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Creating…</> : 'Create Account — إنشاء حساب'}
            </button>

            <p className="text-center text-[13px] text-[#6B7280]">
              Already registered?{' '}
              <button type="button" onClick={() => push('Login')} className="font-bold" style={{ color: '#1E3A5F' }}>Sign in here</button>
            </p>
          </form>
        )}
      </div>
    </motion.div>
  );
}
