import React, { useState } from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { AuthProvider } from './context/AuthContext';
import { BottomNav } from './components/BottomNav';
import { LandingScreen } from './screens/LandingScreen';
import { HomeScreen } from './screens/HomeScreen';
import { BusinessDetailScreen } from './screens/BusinessDetailScreen';
import { BusinessDashboardScreen } from './screens/BusinessDashboardScreen';
import { StoryViewerScreen } from './screens/StoryViewerScreen';
import { SearchScreen } from './screens/SearchScreen';
import { CitySelectScreen } from './screens/CitySelectScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AddPostScreen } from './screens/AddPostScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { LoginScreen } from './screens/LoginScreen';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { AnimatePresence } from 'framer-motion';

const NO_BOTTOM_NAV = ['StoryViewer', 'AddPost', 'CitySelect', 'Landing', 'Register', 'Login', 'BusinessDashboard'];

function AppContent() {
  const { navStack } = useNavigation();
  const [selectedCity, setSelectedCity] = useState('all');
  const currentScreen = navStack[navStack.length - 1];
  const hideBottomNav = NO_BOTTOM_NAV.includes(currentScreen.screen);

  return (
    <div className="w-full h-full bg-black sm:p-4 flex items-center justify-center">
      <div className="w-full h-full sm:w-[390px] sm:h-[844px] sm:rounded-[3rem] bg-[#F0F2F5] relative overflow-hidden shadow-2xl sm:border-[8px] sm:border-gray-900">

        {/* Dynamic Island (desktop) */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-3xl z-[100]" />

        <div className="relative w-full h-full">
          <AnimatePresence mode="popLayout">
            {navStack.map((frame, index) => {
              if (index < navStack.length - 2) return null;
              const isTop = index === navStack.length - 1;
              return (
                <div key={`${frame.screen}-${index}`} className="absolute inset-0"
                  style={{ zIndex: index, display: isTop || index === navStack.length - 2 ? 'block' : 'none' }}>
                  {frame.screen === 'Landing'           && <LandingScreen />}
                  {frame.screen === 'Home'              && <HomeScreen selectedCity={selectedCity} setSelectedCity={setSelectedCity} initialTab={frame.props?.initialTab} />}
                  {frame.screen === 'BusinessDetail'    && <BusinessDetailScreen businessId={frame.props?.businessId} />}
                  {frame.screen === 'BusinessDashboard' && <BusinessDashboardScreen businessId={frame.props?.businessId} />}
                  {frame.screen === 'StoryViewer'       && <StoryViewerScreen storyId={frame.props?.storyId} />}
                  {frame.screen === 'Search'            && <SearchScreen />}
                  {frame.screen === 'CitySelect'        && <CitySelectScreen selectedCity={selectedCity} setSelectedCity={setSelectedCity} />}
                  {frame.screen === 'Notifications'     && <NotificationsScreen />}
                  {frame.screen === 'Profile'           && <ProfileScreen />}
                  {frame.screen === 'AddPost'           && <AddPostScreen />}
                  {frame.screen === 'Register'          && <RegisterScreen />}
                  {frame.screen === 'Login'             && <LoginScreen />}
                </div>
              );
            })}
          </AnimatePresence>
        </div>

        {!hideBottomNav && <BottomNav />}
        <PWAInstallBanner />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </AuthProvider>
  );
}
