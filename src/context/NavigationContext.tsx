import React, { createContext, useContext, useState } from 'react';

export type ScreenName =
  | 'Home'
  | 'BusinessDetail'
  | 'StoryViewer'
  | 'CitySelect'
  | 'Search'
  | 'AddPost'
  | 'Notifications'
  | 'Profile';

export interface NavFrame {
  screen: ScreenName;
  props?: any;
}

interface NavigationContextType {
  navStack: NavFrame[];
  push: (screen: ScreenName, props?: any) => void;
  pop: () => void;
  reset: (screen: ScreenName, props?: any) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [navStack, setNavStack] = useState<NavFrame[]>([{ screen: 'Home' }]);

  const push = (screen: ScreenName, props?: any) => {
    setNavStack((prev) => [...prev, { screen, props }]);
  };

  const pop = () => {
    setNavStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const reset = (screen: ScreenName, props?: any) => {
    setNavStack([{ screen, props }]);
  };

  return (
    <NavigationContext.Provider value={{ navStack, push, pop, reset }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within NavigationProvider');
  return context;
}
