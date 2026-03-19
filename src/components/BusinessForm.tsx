import React, { useState } from 'react';
import { UI_TEXT, IRAQI_CITIES, CATEGORIES } from '../types/constants';
import { Language } from '../types';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BusinessFormProps {
  lang: Language;
  onSuccess: () => void;
}

export const BusinessForm: React.FC<BusinessFormProps> = ({ lang, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: CATEGORIES[1].id, // Default to first real category (index 1 because 0 is 'all')
    governorate: IRAQI_CITIES[1].id, // Default to first real city (index 1 because 0 is 'all')
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from('businesses')
        .insert([{
          ...formData,
          is_verified: false,
          rating: 0,
          reviews_count: 0,
          image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
        }]);

      if (supabaseError) throw supabaseError;

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err: any) {
      console.error('Error listing business:', err);
      setError(err.message || 'Failed to list business. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-white">
          {lang === 'ar' ? 'تم بنجاح!' : lang === 'ku' ? 'سەرکەوتوو بوو!' : 'Success!'}
        </h3>
        <p className="text-white/60 max-w-xs">
          {lang === 'ar' 
            ? 'تم إدراج عملك. سيظهر في الدليل قريباً.' 
            : lang === 'ku' 
            ? 'کارەکەت تۆمارکرا. بەم زووانە لە لیستەکەدا دەردەکەوێت.' 
            : 'Your business has been listed. It will appear in the directory shortly.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">
            {lang === 'ar' ? 'اسم العمل' : lang === 'ku' ? 'ناوی کار' : 'Business Name'}
          </label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6C63FF] transition-colors"
            placeholder={lang === 'ar' ? 'مثال: مطعم المنصور' : lang === 'ku' ? 'بۆ نموونە: چێشتخانەی مەنسوور' : 'e.g. Al-Mansour Restaurant'}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">
            {lang === 'ar' ? 'رقم الهاتف' : lang === 'ku' ? 'ژمارەی مۆبایل' : 'Phone Number'}
          </label>
          <input
            required
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6C63FF] transition-colors"
            placeholder="e.g. +964 770 123 4567"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">
              {lang === 'ar' ? 'الفئة' : lang === 'ku' ? 'پۆلێن' : 'Category'}
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6C63FF] transition-colors appearance-none"
            >
              {CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id} className="bg-[#121826]">
                  {c.icon} {c.label[lang]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">
              {lang === 'ar' ? 'المحافظة' : lang === 'ku' ? 'پارێزگا' : 'Governorate'}
            </label>
            <select
              value={formData.governorate}
              onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6C63FF] transition-colors appearance-none"
            >
              {IRAQI_CITIES.filter(c => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id} className="bg-[#121826]">
                  {lang === 'en' ? c.en : lang === 'ar' ? c.ar : c.ku}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">
            {lang === 'ar' ? 'وصف العمل' : lang === 'ku' ? 'وەسفی کار' : 'Business Description'}
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6C63FF] transition-colors h-24 resize-none"
            placeholder={lang === 'ar' ? 'أخبرنا المزيد عن عملك...' : lang === 'ku' ? 'زیاتر دەربارەی کارەکەت پێمان بڵێ...' : 'Tell us more about your business...'}
          />
        </div>
      </div>

      <button
        disabled={loading}
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-[#6C63FF] to-[#FF6B9D] text-white rounded-xl font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Send className="w-5 h-5" />
            {UI_TEXT[lang].listYourBusiness}
          </>
        )}
      </button>
    </form>
  );
};
