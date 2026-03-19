import React, { useState } from 'react';
import { X } from './icons';
import { useTranslations } from '../hooks/useTranslations';

interface AuthModalProps {
    onClose: () => void;
    onLogin: () => void;
}

const IRAQI_CITIES = [
    'Baghdad', 'Basra', 'Mosul', 'Erbil', 'Sulaymaniyah', 'Kirkuk',
    'Najaf', 'Karbala', 'Nasiriyah', 'Amarah', 'Diwaniyah', 'Hillah',
    'Ramadi', 'Fallujah', 'Tikrit', 'Samarra', 'Dohuk', 'Zakho',
    'Kut', 'Baqubah',
];

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
    const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        city: '',
        language: 'en',
        role: 'user',
    });
    const { t } = useTranslations();

    const set = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (activeTab === 'signup' && !form.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!form.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email address';
        if (!form.password) newErrors.password = 'Password is required';
        else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (activeTab === 'signup' && !form.city) newErrors.city = 'Please select your city';
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        onLogin();
    };

    const inputClass = (field: string) =>
        `w-full px-4 py-3 rounded-xl bg-white/5 border ${errors[field] ? 'border-red-400' : 'border-white/10'} text-white outline-none focus:border-primary transition-colors`;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-md backdrop-blur-2xl bg-dark-bg/90 border border-white/20 rounded-3xl p-8 shadow-glow-primary text-start rtl:text-right max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 end-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                    <X className="w-5 h-5 text-white" />
                </button>

                <div className="flex border-b border-white/10 mb-6">
                    <button onClick={() => { setActiveTab('signin'); setErrors({}); }} className={`flex-1 py-3 font-semibold transition-colors ${activeTab === 'signin' ? 'text-primary border-b-2 border-primary' : 'text-white/60 hover:text-white'}`}>
                        {t('auth.signIn')}
                    </button>
                    <button onClick={() => { setActiveTab('signup'); setErrors({}); }} className={`flex-1 py-3 font-semibold transition-colors ${activeTab === 'signup' ? 'text-primary border-b-2 border-primary' : 'text-white/60 hover:text-white'}`}>
                        {t('auth.signUp')}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {activeTab === 'signup' && (
                        <>
                            <div>
                                <label className="block text-white/70 text-sm mb-2">{t('auth.fullName')} *</label>
                                <input
                                    type="text"
                                    value={form.fullName}
                                    onChange={e => set('fullName', e.target.value)}
                                    className={inputClass('fullName')}
                                    placeholder="Your full name"
                                />
                                {errors.fullName && <p className="mt-1 text-red-400 text-xs">{errors.fullName}</p>}
                            </div>
                            <div>
                                <label className="block text-white/70 text-sm mb-2">{t('auth.phone')}</label>
                                <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={e => set('phone', e.target.value)}
                                    placeholder="+964 7..."
                                    className={inputClass('phone')}
                                />
                            </div>
                            <div>
                                <label className="block text-white/70 text-sm mb-2">City *</label>
                                <select
                                    value={form.city}
                                    onChange={e => set('city', e.target.value)}
                                    className={`${inputClass('city')} appearance-none`}
                                >
                                    <option value="" className="bg-dark-bg">Select your city</option>
                                    {IRAQI_CITIES.map(city => (
                                        <option key={city} value={city} className="bg-dark-bg">{city}</option>
                                    ))}
                                </select>
                                {errors.city && <p className="mt-1 text-red-400 text-xs">{errors.city}</p>}
                            </div>
                            <div>
                                <label className="block text-white/70 text-sm mb-2">Role</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { value: 'user', label: 'Regular User' },
                                        { value: 'business_owner', label: 'Business Owner' },
                                        { value: 'station', label: 'Station / Org' },
                                    ].map(option => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => set('role', option.value)}
                                            className={`py-2 px-3 rounded-xl text-xs font-medium transition-all border ${
                                                form.role === option.value
                                                    ? 'bg-primary border-primary text-white'
                                                    : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white bg-white/5'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-white/70 text-sm mb-2">{t('auth.language')}</label>
                                <select
                                    value={form.language}
                                    onChange={e => set('language', e.target.value)}
                                    className={`${inputClass('language')} appearance-none`}
                                >
                                    <option value="en" className="bg-dark-bg">English</option>
                                    <option value="ar" className="bg-dark-bg">العربية</option>
                                    <option value="ku" className="bg-dark-bg">Kurdî</option>
                                </select>
                            </div>
                        </>
                    )}
                    <div>
                        <label className="block text-white/70 text-sm mb-2">{t('auth.email')} *</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={e => set('email', e.target.value)}
                            className={inputClass('email')}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="mt-1 text-red-400 text-xs">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-white/70 text-sm mb-2">{t('auth.password')} *</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={e => set('password', e.target.value)}
                            className={inputClass('password')}
                            placeholder={activeTab === 'signup' ? 'Minimum 6 characters' : ''}
                        />
                        {errors.password && <p className="mt-1 text-red-400 text-xs">{errors.password}</p>}
                    </div>
                    {activeTab === 'signin' && (
                        <div className="text-end">
                            <button type="button" className="text-sm text-secondary hover:text-secondary/80 transition-colors">
                                Forgot password?
                            </button>
                        </div>
                    )}
                    <button type="submit" className="w-full !mt-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-glow-primary transition-all min-h-[44px]">
                        {activeTab === 'signin' ? t('auth.signIn') : t('auth.createAccount')}
                    </button>
                </form>
            </div>
        </div>
    );
};
