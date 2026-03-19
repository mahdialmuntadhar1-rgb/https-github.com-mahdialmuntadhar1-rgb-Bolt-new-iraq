import React, { useState, useRef, useEffect } from 'react';
import type { User } from '../types';
import { Sparkles, User as UserIcon } from './icons';
import { useTranslations } from '../hooks/useTranslations';
import { LanguageSelector } from './LanguageSelector';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeaderProps {
    isLoggedIn: boolean;
    user: User | null;
    onSignIn: () => void;
    onSignOut: () => void;
    onDashboard: () => void;
    onHome: () => void;
}

const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const DownloadIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
    </svg>
);

const IOSShareIcon = () => (
    <svg className="w-4 h-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
);

const InstallButton: React.FC = () => {
    const { canInstall, installed, isIOS, triggerInstall } = usePWAInstall();
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!showTooltip) return;
        const handler = (e: MouseEvent) => {
            if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node) &&
                btnRef.current && !btnRef.current.contains(e.target as Node)) {
                setShowTooltip(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [showTooltip]);

    if (installed) return null;

    const handleClick = async () => {
        if (canInstall) {
            await triggerInstall();
        } else {
            setShowTooltip((v) => !v);
        }
    };

    return (
        <div className="relative">
            <button
                ref={btnRef}
                onClick={handleClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white text-xs font-medium transition-all duration-200"
                aria-label="Install app"
            >
                <DownloadIcon />
                <span className="hidden lg:inline">Install App</span>
            </button>

            {showTooltip && (
                <div
                    ref={tooltipRef}
                    className="absolute end-0 top-full mt-2 w-64 backdrop-blur-2xl bg-dark-bg/95 border border-white/20 rounded-2xl p-4 shadow-glow-primary z-[70] text-start"
                >
                    <p className="text-white font-semibold text-sm mb-2">
                        {isIOS ? 'Add to Home Screen (iOS)' : 'Install Iraqi Compass'}
                    </p>
                    {isIOS ? (
                        <ol className="text-white/70 text-xs space-y-1.5 list-decimal list-inside">
                            <li>Tap the <IOSShareIcon /> Share button at the bottom of Safari</li>
                            <li>Scroll down and tap <strong className="text-white">"Add to Home Screen"</strong></li>
                            <li>Tap <strong className="text-white">Add</strong> to confirm</li>
                        </ol>
                    ) : (
                        <p className="text-white/70 text-xs leading-relaxed">
                            Open this page in <strong className="text-white">Chrome</strong> or <strong className="text-white">Edge</strong> on your phone or desktop, then look for the install icon in the address bar — or tap the browser menu and choose <strong className="text-white">"Install app"</strong>.
                        </p>
                    )}
                    <button
                        onClick={() => setShowTooltip(false)}
                        className="mt-3 w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-xs transition-colors"
                    >
                        Got it
                    </button>
                </div>
            )}
        </div>
    );
};

export const Header: React.FC<HeaderProps> = ({ isLoggedIn, user, onSignIn, onSignOut, onDashboard, onHome }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { t } = useTranslations();
    const isOnline = useOnlineStatus();
    const { canInstall, installed, isIOS, triggerInstall } = usePWAInstall();

    const closeMobileMenu = () => setMobileMenuOpen(false);

    const handleMobileInstall = async () => {
        if (canInstall) {
            await triggerInstall();
            closeMobileMenu();
        }
    };

    return (
        <header className="sticky top-0 z-50 py-4 backdrop-blur-xl bg-dark-bg/80 border-b border-glass-border">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <button onClick={() => { onHome(); closeMobileMenu(); }} className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-white">
                    <Sparkles className="text-primary" />
                    Iraq<span className="text-secondary">Compass</span>
                </button>

                <nav className="hidden sm:flex items-center gap-3 rtl:flex-row-reverse">
                    <span
                        title={isOnline ? 'Online' : 'Offline — showing cached data'}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                            isOnline
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-red-400 animate-pulse'}`} />
                        {isOnline ? 'Online' : 'Offline'}
                    </span>

                    <InstallButton />

                    <LanguageSelector />
                    {isLoggedIn && user ? (
                        <div className="relative">
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-3 p-2 rounded-full bg-glass-surface hover:bg-glass-hover border border-glass-border transition-colors">
                                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                                <span className="hidden md:block text-white/90 font-medium">{user.name}</span>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute end-0 mt-2 w-48 backdrop-blur-2xl bg-dark-bg/90 border border-white/20 rounded-xl shadow-soft p-2" onMouseLeave={() => setDropdownOpen(false)}>
                                    <button onClick={() => { onDashboard(); setDropdownOpen(false); }} className="w-full text-start px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">{t('header.dashboard')}</button>
                                    <button onClick={() => { onSignOut(); setDropdownOpen(false); }} className="w-full text-start px-4 py-2 rounded-lg text-accent hover:bg-white/10 transition-colors">{t('header.logout')}</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button onClick={onSignIn} className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-glow-primary transition-all duration-300 flex items-center gap-2">
                            <UserIcon className="w-4 h-4" /> {t('header.signIn')}
                        </button>
                    )}
                </nav>

                <button
                    className="sm:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>

            {mobileMenuOpen && (
                <div className="sm:hidden border-t border-white/10 bg-dark-bg/95 backdrop-blur-xl">
                    <div className="container mx-auto px-4 py-4 space-y-3">
                        <div className="flex items-center justify-between py-2">
                            <LanguageSelector />
                            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                                isOnline
                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                            }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-red-400 animate-pulse'}`} />
                                {isOnline ? 'Online' : 'Offline'}
                            </span>
                        </div>

                        {!installed && (
                            canInstall ? (
                                <button
                                    onClick={handleMobileInstall}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium min-h-[44px] border border-white/10 transition-colors"
                                >
                                    <DownloadIcon />
                                    Install App — Add to Home Screen
                                </button>
                            ) : (
                                <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/60 leading-relaxed">
                                    {isIOS
                                        ? <>Tap the Share button in Safari, then <strong className="text-white">"Add to Home Screen"</strong></>
                                        : <>Open in <strong className="text-white">Chrome</strong> or <strong className="text-white">Edge</strong> and tap <strong className="text-white">"Install app"</strong> in the menu</>
                                    }
                                </div>
                            )
                        )}

                        {isLoggedIn && user ? (
                            <>
                                <div className="flex items-center gap-3 py-2 border-b border-white/10">
                                    <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full" />
                                    <span className="text-white/90 font-medium">{user.name}</span>
                                </div>
                                <button
                                    onClick={() => { onDashboard(); closeMobileMenu(); }}
                                    className="w-full text-start px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-white min-h-[44px]"
                                >
                                    {t('header.dashboard')}
                                </button>
                                <button
                                    onClick={() => { onSignOut(); closeMobileMenu(); }}
                                    className="w-full text-start px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-accent min-h-[44px]"
                                >
                                    {t('header.logout')}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => { onSignIn(); closeMobileMenu(); }}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold min-h-[44px]"
                            >
                                {t('header.signIn')}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};
