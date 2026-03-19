/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CitySelector } from './components/CitySelector';
import { CategoryGrid } from './components/CategoryGrid';
import { FeaturedBusinesses } from './components/FeaturedBusinesses';
import { BusinessDirectory } from './components/BusinessDirectory';
import { EventsSection, DealsSection, CommunityStories } from './components/PlaceholderSections';
import { AccessibilitySection, Footer } from './components/Footer';
import { useLanguage } from './hooks/useLanguage';

export default function App() {
  const { lang, setLang } = useLanguage();
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const directoryRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (directoryRef.current) {
      directoryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearFilters = () => {
    setSelectedCity('all');
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] selection:bg-[#6C63FF]/30 selection:text-white">
      <Header lang={lang} setLang={setLang} />
      
      <main>
        <Hero lang={lang} />
        
        <CitySelector 
          selectedCity={selectedCity} 
          setSelectedCity={setSelectedCity} 
          lang={lang} 
        />
        
        <CategoryGrid 
          lang={lang} 
          onCategoryClick={handleCategoryClick} 
        />
        
        <FeaturedBusinesses 
          selectedCity={selectedCity} 
          lang={lang} 
        />
        
        <EventsSection lang={lang} />
        
        <DealsSection lang={lang} />
        
        <BusinessDirectory 
          ref={directoryRef}
          selectedCity={selectedCity}
          selectedCategory={selectedCategory}
          lang={lang}
          onClearFilters={handleClearFilters}
        />
        
        <CommunityStories lang={lang} />
        
        <AccessibilitySection lang={lang} />
      </main>
      
      <Footer lang={lang} />
    </div>
  );
}
