import React from 'react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';
import {
  Compass,
  Luggage,
  MapPin,
  Map,
  BookOpen,
  Scale
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentTab, setCurrentTab, t } = useApp();

  const navItems: { id: TabType; labelKey: string; defaultLabel: string; icon: React.ReactNode }[] = [
    { id: 'explore', labelKey: 'explore', defaultLabel: 'Explore', icon: <Compass className="w-[22px] h-[22px]" /> },
    { id: 'packages', labelKey: 'packages', defaultLabel: 'Packages', icon: <Luggage className="w-[22px] h-[22px]" /> },
    { id: 'destinations', labelKey: 'destinations', defaultLabel: 'Destinations', icon: <MapPin className="w-[22px] h-[22px]" /> },
    { id: 'map', labelKey: 'map', defaultLabel: 'Planner', icon: <Map className="w-[22px] h-[22px]" /> },
    { id: 'journal', labelKey: 'journal', defaultLabel: 'Journal', icon: <BookOpen className="w-[22px] h-[22px]" /> },
    { id: 'legal', labelKey: 'legal', defaultLabel: 'Legal', icon: <Scale className="w-[22px] h-[22px]" /> }
  ];

  return (
    <nav
      className="fixed bottom-0 w-full z-40 pb-safe bg-surface/92 backdrop-blur-xl border-t border-surface-container-high/40 shadow-[0_-8px_30px_rgba(19,34,41,0.06)] md:hidden"
      aria-label="Main Navigation"
    >
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-primary font-bold scale-105'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <div className="relative">
                {item.icon}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-[10px] tracking-tight leading-none whitespace-nowrap">
                {t(item.labelKey) || item.defaultLabel}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
