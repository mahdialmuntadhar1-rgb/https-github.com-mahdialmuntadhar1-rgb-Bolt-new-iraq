import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useAuth } from '../context/AuthContext';

const inputCls = "w-full bg-[#F0F2F5] rounded-xl px-4 py-3.5 text-[14px] text-[#111827] placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 transition";

export function LoginScreen() {
  const { pop, push, reset } = useNavigation();
  const { signIn } = useAuth();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const { error: err } = await signIn(email, password);
    setIsLoading(false);
    if (err) { setError(err); return; }
    reset('Landing');
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
            <h1 className="text-[17px] font-bold text-[#111827]">Sign In</h1>
            <p className="text-[12px] text-[#9CA3AF]">تسجيل الدخول</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col justify-center px-4 py-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center text-3xl shadow-md"
            style={{ background: 'linear-gradient(135deg, #1E3A5F, #2D6A9F)' }}>🧭</div>
          <h2 className="text-[20px] font-bold text-[#111827]">Welcome back</h2>
          <p className="text-[13px] text-[#9CA3AF] mt-0.5">أهلاً بعودتك إلى بوصلة العراق</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
              <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
              <p className="text-[13px] text-red-600">{error}</p>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-4 space-y-4 border border-gray-100">
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between">
                <label className="text-[13px] font-semibold text-[#374151]">Email</label>
                <span className="text-[12px] text-[#9CA3AF]">البريد الإلكتروني</span>
              </div>
              <input type="email" className={inputCls} placeholder="your@email.com" value={email}
                onChange={e => setEmail(e.target.value)} required />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between">
                <label className="text-[13px] font-semibold text-[#374151]">Password</label>
                <button type="button" className="text-[12px] font-semibold" style={{ color: '#1E3A5F' }}>
                  Forgot? / نسيت؟
                </button>
              </div>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} className={inputCls + ' pr-12'} placeholder="••••••••" value={password}
                  onChange={e => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <button type="submit" disabled={isLoading}
            className="w-full py-3.5 rounded-2xl font-bold text-[15px] text-white shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            style={{ background: isLoading ? '#9CA3AF' : '#1E3A5F' }}>
            {isLoading ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Signing in…</> : 'Sign In — دخول'}
          </button>

          <p className="text-center text-[13px] text-[#6B7280]">
            New to IraqCompass?{' '}
            <button type="button" onClick={() => push('Register')} className="font-bold" style={{ color: '#1E3A5F' }}>
              Register free — سجّل مجاناً
            </button>
          </p>
        </form>
      </div>
    </motion.div>
  );
}
