import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VOYAGER_LOGO_URL } from '../data/mockData';
import { LanguageCode, TabType, CurrencyCode } from '../types';
import {
  Bell,
  Moon,
  Sun,
  Globe,
  Wifi,
  WifiOff,
  Share2,
  DollarSign,
  Users,
  Camera
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    language,
    setLanguage,
    currency,
    setCurrency,
    isDarkMode,
    toggleDarkMode,
    isOffline,
    toggleOfflineSimulation,
    unreadNotificationCount,
    setNotificationOpen,
    setProfileOpen,
    profile,
    openShareModal,
    setBudgetModalOpen,
    setGroupModalOpen,
    setMemoriesModalOpen,
    t
  } = useApp();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const getTabSubtitle = () => {
    switch (currentTab) {
      case 'explore': return t('explore') || 'Explore';
      case 'packages': return t('packages') || 'Packages';
      case 'destinations': return t('destinations') || 'Destinations';
      case 'map': return t('map') || 'Map & Planner';
      case 'journal': return t('journal') || 'Journal';
      case 'legal': return t('legal') || 'Legal';
      default: return t('explore') || 'Explore';
    }
  };

  const languages: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇦🇪' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  ];

  const currencies: { code: CurrencyCode; label: string; symbol: string }[] = [
    { code: 'USD', label: 'USD ($)', symbol: '$' },
    { code: 'EUR', label: 'EUR (€)', symbol: '€' },
    { code: 'GBP', label: 'GBP (£)', symbol: '£' },
    { code: 'JPY', label: 'JPY (¥)', symbol: '¥' },
    { code: 'AED', label: 'AED (د.إ)', symbol: 'د.إ' },
    { code: 'CAD', label: 'CAD ($)', symbol: 'CA$' },
    { code: 'AUD', label: 'AUD ($)', symbol: 'AU$' },
    { code: 'CHF', label: 'CHF (Fr)', symbol: 'CHF' },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-40 pt-safe bg-surface/90 backdrop-blur-xl border-b border-surface-container-high/40 shadow-[0_1px_12px_rgba(27,59,72,0.04)]">
        <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <img
              src={VOYAGER_LOGO_URL}
              alt="Voyager Logo"
              onClick={() => {
                setCurrentTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="h-8 w-auto object-contain cursor-pointer transition-transform hover:scale-105"
            />
            <div
              onClick={() => {
                setCurrentTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex flex-col cursor-pointer"
            >
              <span className="font-bold text-lg tracking-tight text-on-surface leading-none">
                Voyager
              </span>
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                {getTabSubtitle()}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Tablets & Desktops) */}
          <nav className="hidden md:flex items-center gap-1 bg-surface-container-low/90 px-1.5 py-1 rounded-full border border-surface-container-high/60 shadow-xs" aria-label="Primary Navigation">
            {[
              { id: 'explore' as TabType, label: t('explore') || 'Explore' },
              { id: 'packages' as TabType, label: t('packages') || 'Packages' },
              { id: 'destinations' as TabType, label: t('destinations') || 'Destinations' },
              { id: 'map' as TabType, label: t('map') || 'Planner' },
              { id: 'journal' as TabType, label: t('journal') || 'Journal' },
            ].map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Quick tool shortcuts for large screens */}
          <div className="hidden xl:flex items-center gap-1.5 ml-2 pl-3 border-l border-outline-variant/30">
            <button
              onClick={() => setBudgetModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
              title="Budget Tracker"
            >
              <DollarSign className="w-3.5 h-3.5 text-secondary" />
              <span>Budget</span>
            </button>
            <button
              onClick={() => setGroupModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
              title="Group Planning & Sync"
            >
              <Users className="w-3.5 h-3.5 text-primary" />
              <span>Group</span>
            </button>
            <button
              onClick={() => setMemoriesModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
              title="Photo Memories"
            >
              <Camera className="w-3.5 h-3.5 text-tertiary" />
              <span>Memories</span>
            </button>
          </div>

          {/* Right Action Icons & User Control */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Offline Simulation Toggle Badge */}
            <button
              onClick={toggleOfflineSimulation}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                isOffline
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 border border-amber-300 dark:border-amber-700'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
              title={isOffline ? 'Offline Mode active (Click to connect)' : 'Online (Click to simulate offline)'}
            >
              {isOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span className="hidden sm:inline">Offline</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="hidden sm:inline">Live</span>
                </>
              )}
            </button>

            {/* Quick Share Trigger */}
            <button
              onClick={() => openShareModal({
                title: 'Voyager Bespoke Travel Expedition',
                subtitle: 'Explore and plan tailor-made itineraries with friends across the globe.',
                url: window.location.href,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW0nyCQQq-zKoscYXUCpKH-paxSlpRFCgujQmRjbG0EbfhBO82fAoZhHAZVQHJPTrNFCp-TsN7sP_pN_eyJwYtlAyeqw_-utUgYBqf9YQ-2lAm21VV_c6LecOgK842X2wxKZ7XcebXvdqahCgYmVQNeNaXmXFWFljsOlTinTijGY-t4J7qIuPvJGArX7zSO_JFQT1nf5LyxwM6y20-p9nkVh-WEyBL4EmH-FivfuIYTfNSicnHWNUV8A'
              })}
              className="w-10 h-10 flex items-center justify-center rounded-full text-secondary hover:bg-surface-container transition-colors"
              aria-label="Share trip"
              title="Share Voyager"
            >
              <Share2 className="w-[19px] h-[19px]" />
            </button>

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setCurrencyDropdownOpen(false);
                }}
                className="h-10 px-2.5 flex items-center gap-1 rounded-full text-secondary hover:bg-surface-container transition-colors text-xs font-semibold"
                aria-label="Change language"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-36 bg-surface-container-lowest rounded-xl shadow-xl py-1.5 border border-outline-variant/30 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-start text-xs font-semibold flex items-center justify-between hover:bg-surface-container transition-colors ${
                        language === l.code ? 'text-primary bg-surface-container-low' : 'text-on-surface'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </span>
                      {language === l.code && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Toggle Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setCurrencyDropdownOpen(!currencyDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="h-10 px-2.5 flex items-center gap-1 rounded-full text-secondary hover:bg-surface-container transition-colors text-xs font-semibold"
                aria-label="Change currency"
                title="Change Currency"
              >
                <DollarSign className="w-3.5 h-3.5 text-secondary" />
                <span className="font-bold">{currency}</span>
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-44 bg-surface-container-lowest rounded-xl shadow-xl py-1.5 border border-outline-variant/30 z-50 max-h-72 overflow-y-auto">
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCurrency(c.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-start text-xs font-semibold flex items-center justify-between hover:bg-surface-container transition-colors ${
                        currency === c.code ? 'text-primary bg-surface-container-low' : 'text-on-surface'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-bold text-primary w-6 text-center">{c.symbol}</span>
                        <span>{c.label}</span>
                      </span>
                      {currency === c.code && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 flex items-center justify-center rounded-full text-secondary hover:bg-surface-container transition-colors"
              aria-label="Toggle dark mode"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-[19px] h-[19px] text-amber-400" /> : <Moon className="w-[19px] h-[19px]" />}
            </button>

            {/* Notifications Button */}
            <button
              onClick={() => setNotificationOpen(true)}
              aria-label="Notifications"
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-secondary hover:bg-surface-container transition-colors"
            >
              <Bell className="w-[20px] h-[20px]" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-2 right-2 min-w-[16px] h-4 px-1 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center animate-scale-in">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* User Profile Avatar */}
            <button
              onClick={() => setProfileOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary/40 ml-0.5"
              aria-label="User profile"
            >
              <img
                alt={profile.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-container"
                src={profile.avatar}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Persistent Offline Banner if offline */}
      {isOffline && (
        <div className="fixed top-16 left-0 right-0 z-30 bg-gradient-to-r from-amber-600 via-amber-700 to-primary text-white text-xs font-medium px-4 py-1.5 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <WifiOff className="w-3.5 h-3.5 shrink-0" />
            <span>
              <strong>Offline Mode Active:</strong> Itineraries, tickets, and maps are cached locally. Your edits will auto-sync once reconnected.
            </span>
          </div>
        </div>
      )}
    </>
  );
};
