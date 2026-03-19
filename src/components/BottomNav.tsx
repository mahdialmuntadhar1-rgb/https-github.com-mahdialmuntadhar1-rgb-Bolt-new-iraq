import React from 'react';
import { useNavigation, type ScreenName } from '../context/NavigationContext';
import { Home, Search, PlusSquare, Bell, User } from 'lucide-react';
import { cn } from '../lib/utils';

export function BottomNav() {
  const { navStack, reset, push } = useNavigation();
  const currentScreen = navStack[navStack.length - 1].screen;

  const navItems: { id: ScreenName; icon: React.ElementType; label: string }[] = [
    { id: 'Home', icon: Home, label: 'Home' },
    { id: 'Search', icon: Search, label: 'Search' },
    { id: 'AddPost', icon: PlusSquare, label: 'Add' },
    { id: 'Notifications', icon: Bell, label: 'Alerts' },
    { id: 'Profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center pb-safe pt-2 px-2 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          currentScreen === item.id ||
          (item.id === 'Home' && ['BusinessDetail', 'StoryViewer', 'CitySelect'].includes(currentScreen));

        return (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === 'Home') reset('Home');
              else if (currentScreen !== item.id) push(item.id);
            }}
            className="flex flex-col items-center justify-center w-16 h-12 gap-1 relative"
          >
            <Icon
              size={24}
              className={cn('transition-colors duration-200', isActive ? 'text-[#FF6B6B]' : 'text-gray-400')}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span className={cn('text-[10px] font-medium transition-colors duration-200', isActive ? 'text-[#FF6B6B]' : 'text-gray-400')}>
              {item.label}
            </span>
            {isActive && <div className="absolute -top-2 w-1 h-1 rounded-full bg-[#FF6B6B]" />}
          </button>
        );
      })}
    </div>
  );
}
