import React, { useEffect, useState } from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallBanner: React.FC = () => {
  const { canInstall, installed, triggerInstall } = usePWAInstall();
  const [dismissed, setDismissed] = useState(() =>
    localStorage.getItem('pwa-banner-dismissed') === 'true'
  );
  const isOnline = useOnlineStatus();
  const [showOfflineBanner, setShowOfflineBanner] = useState(false);
  const [prevOnline, setPrevOnline] = useState(isOnline);

  useEffect(() => {
    if (!isOnline && prevOnline) {
      setShowOfflineBanner(true);
    } else if (isOnline && !prevOnline) {
      setShowOfflineBanner(true);
      const timer = setTimeout(() => setShowOfflineBanner(false), 3000);
      return () => clearTimeout(timer);
    }
    setPrevOnline(isOnline);
  }, [isOnline, prevOnline]);

  const handleInstall = async () => {
    await triggerInstall();
    setDismissed(true);
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  const showInstallCard = canInstall && !dismissed && !installed;

  return (
    <>
      {showOfflineBanner && (
        <div className={`fixed top-16 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium shadow-lg transition-all duration-300 whitespace-nowrap ${
          isOnline
            ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
            : 'bg-red-500/20 border border-red-500/40 text-red-300'
        }`}>
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isOnline ? 'bg-emerald-400' : 'bg-red-400'}`} />
          {isOnline ? 'Back online' : 'You are offline — browsing cached data'}
        </div>
      )}

      {showInstallCard && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-[60] backdrop-blur-xl bg-dark-bg/95 border border-white/20 rounded-2xl p-4 shadow-glow-primary">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">Install Iraqi Compass</p>
              <p className="text-white/60 text-xs mt-0.5">Add to home screen — works offline too.</p>
            </div>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white/60 hover:text-white"
              aria-label="Dismiss"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleInstall}
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold hover:shadow-glow-primary transition-all min-h-[44px]"
            >
              Install App
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 text-sm transition-colors min-h-[44px]"
            >
              Not now
            </button>
          </div>
        </div>
      )}
    </>
  );
};
