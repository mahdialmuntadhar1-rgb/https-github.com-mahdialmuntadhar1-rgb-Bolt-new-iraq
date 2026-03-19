import { CATEGORY_IMAGES, UI_TEXT, CATEGORIES } from '../types/constants';
import { Language } from '../types';

interface CategoryGridProps {
  lang: Language;
  onCategoryClick: (category: string) => void;
}

export function CategoryGrid({ lang, onCategoryClick }: CategoryGridProps) {
  return (
    <section className="py-16 bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{UI_TEXT[lang].exploreCategories}</h2>
            <p className="text-white/60">{UI_TEXT[lang].subSlogans.hero}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
            <div
              key={cat.id}
              onClick={() => onCategoryClick(cat.id)}
              className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(108,99,255,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/40 to-transparent z-10" />
              <img
                src={CATEGORY_IMAGES[cat.id]}
                alt={cat.id}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end items-center text-center">
                <span className="text-4xl mb-3 transform transition-transform duration-500 group-hover:scale-125 group-hover:-translate-y-2">
                  {cat.icon}
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#FF6B9D] transition-colors">
                  {cat.label[lang]}
                </h3>
                
                <div className="absolute bottom-0 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-[#6C63FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/20 to-[#FF6B9D]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
