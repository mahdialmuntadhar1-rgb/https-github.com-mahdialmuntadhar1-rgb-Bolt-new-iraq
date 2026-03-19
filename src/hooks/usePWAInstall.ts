import { useCallback, useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let _deferredPrompt: BeforeInstallPromptEvent | null = null;
let _isInstalled = false;
const _listeners = new Set<() => void>();

const notify = () => _listeners.forEach((fn) => fn());

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    _deferredPrompt = e as BeforeInstallPromptEvent;
    notify();
  });
  window.addEventListener('appinstalled', () => {
    _deferredPrompt = null;
    _isInstalled = true;
    notify();
  });
}

const isIOS = () =>
  typeof navigator !== 'undefined' &&
  /iphone|ipad|ipod/i.test(navigator.userAgent) &&
  !('standalone' in window && (window as Window & { standalone?: boolean }).standalone);

const isInStandaloneMode = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in window && !!(window as Window & { standalone?: boolean }).standalone));

export const usePWAInstall = () => {
  const [canInstall, setCanInstall] = useState(() => !!_deferredPrompt);
  const [installed, setInstalled] = useState(() => _isInstalled || isInStandaloneMode());

  useEffect(() => {
    const update = () => {
      setCanInstall(!!_deferredPrompt);
      setInstalled(_isInstalled || isInStandaloneMode());
    };
    _listeners.add(update);
    return () => { _listeners.delete(update); };
  }, []);

  const triggerInstall = useCallback(async () => {
    if (!_deferredPrompt) return false;
    await _deferredPrompt.prompt();
    const { outcome } = await _deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      _deferredPrompt = null;
      _isInstalled = true;
      notify();
    }
    return outcome === 'accepted';
  }, []);

  return { canInstall, installed, isIOS: isIOS(), triggerInstall };
};
