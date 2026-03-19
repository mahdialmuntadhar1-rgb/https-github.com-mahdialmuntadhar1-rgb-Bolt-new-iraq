import { useState, useEffect } from 'react';
import { Language } from '../types';

export function useLanguage() {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const dir = lang === 'en' ? 'ltr' : 'rtl';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    
    if (lang === 'ar' || lang === 'ku') {
      document.documentElement.style.fontFamily = "'Noto Sans Arabic', sans-serif";
    } else {
      document.documentElement.style.fontFamily = "Inter, sans-serif";
    }
  }, [lang]);

  return { lang, setLang };
}
