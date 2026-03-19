import React from 'react';
import { Search, Mic } from './icons';
import { useTranslations } from '../hooks/useTranslations';

const WaveformAnimation = () => (
  <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
);

interface SearchPortalProps {
  onSearch?: (query: string) => void;
}

export const SearchPortal: React.FC<SearchPortalProps> = ({ onSearch }) => {
  const [isListening, setIsListening] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const { t, lang } = useTranslations();
  const recognitionRef = React.useRef<any>(null);

  React.useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    const langMap: Record<string, string> = { en: 'en-US', ar: 'ar-IQ', ku: 'ckb-IQ' };
    recognition.lang = langMap[lang] || 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      onSearch?.(transcript);
    };
    recognitionRef.current = recognition;
  }, [lang, onSearch]);

  const handleMicClick = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setInputValue('');
      recognitionRef.current.start();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) onSearch?.(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onSearch?.(inputValue.trim());
    }
  };

  const quickFilters = [
    { label: t('hero.filters.restaurants'), query: 'restaurant' },
    { label: t('hero.filters.eventsToday'), query: 'school' },
    { label: t('hero.filters.entertainment'), query: 'hotel' },
    { label: t('hero.filters.deals'), query: 'pharmacy' },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="relative group">
          <div className="backdrop-blur-xl bg-white/10 border-2 border-white/20 rounded-full ps-4 pe-2 py-2 md:px-6 md:py-4 flex items-center gap-2 md:gap-4 transition-all duration-300 hover:bg-white/15 hover:border-primary/50 focus-within:border-primary focus-within:shadow-[0_0_30px_rgba(108,43,217,0.5)]">
            <Search className="w-5 h-5 md:w-6 md:h-6 text-secondary flex-shrink-0" />
            <input
              type="text"
              placeholder={t('hero.searchPlaceholder')}
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/50 text-sm md:text-base"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {inputValue && (
              <button
                type="submit"
                className="px-4 py-1.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/80 transition-colors flex-shrink-0"
              >
                Search
              </button>
            )}
            <button
              type="button"
              className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleMicClick}
              disabled={!recognitionRef.current}
            >
              <Mic className="w-5 h-5 text-white" />
              {isListening && <WaveformAnimation />}
            </button>
          </div>
        </form>
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {quickFilters.map(({ label, query }) => (
            <button
              key={query}
              onClick={() => { setInputValue(query); onSearch?.(query); }}
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-200 text-white/80 hover:text-white text-xs md:text-sm"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
