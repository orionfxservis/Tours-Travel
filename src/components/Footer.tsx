import React from 'react';
import { useApp } from '../context/AppContext';
import { VOYAGER_LOGO_URL } from '../data/mockData';
import {
  ShieldCheck,
  Lock,
  ArrowUp,
  Compass,
  Luggage,
  MapPin,
  Map,
  BookOpen,
  Scale,
  Users,
  DollarSign,
  Camera,
  PhoneCall,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setCurrentTab,
    setBudgetModalOpen,
    setGroupModalOpen,
    setMemoriesModalOpen,
    openShareModal,
    t
  } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (tab: 'explore' | 'packages' | 'destinations' | 'map' | 'journal' | 'legal') => {
    setCurrentTab(tab);
    scrollToTop();
  };

  return (
    <footer
      id="app-footer"
      className="relative z-10 bg-surface-container-low border-t-2 border-surface-container-high/70 text-on-surface transition-colors duration-300 pt-12 md:pt-16 pb-28 md:pb-12 px-4 sm:px-6 lg:px-8 w-full shadow-[0_-4px_24px_rgba(27,59,72,0.03)]"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Trust Badges Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 border-b border-surface-container-high/60 text-xs text-on-surface-variant font-medium">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span>Curated & Handpicked Expeditions</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
              <PhoneCall className="w-4 h-4" />
            </div>
            <span>24/7 Global Traveler Concierge</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-600/10 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span>100% Traveler Protection & Flexible Rebooking</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>Verified 5-Star Luxury Partners</span>
          </div>
        </div>

        {/* Multi-Column Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 py-10">
          {/* Col 1: Brand & Mission */}
          <div className="flex flex-col gap-4">
            <div
              onClick={() => navigateTo('explore')}
              className="flex items-center gap-2.5 cursor-pointer group w-fit"
            >
              <img
                src={VOYAGER_LOGO_URL}
                alt="Voyager"
                className="h-8 w-auto transition-transform group-hover:scale-105"
              />
              <span className="font-extrabold text-xl tracking-tight text-on-surface">
                Voyager
              </span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Tailor-made itineraries, collaborative group expeditions, interactive route planning, and verified reservations across the globe.
            </p>
            <div className="flex flex-col gap-1 text-[11px] text-on-surface-variant/80 pt-1">
              <span className="font-semibold text-on-surface">Luxury Travel Guild · Virtuoso Partner</span>
              <span>IATA Certified Operator #0148291 · Seller of Travel #2104928</span>
            </div>
          </div>

          {/* Col 2: Navigation & Expeditions */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
              Expeditions & Journeys
            </h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-on-surface-variant font-medium">
              <li>
                <button
                  onClick={() => navigateTo('explore')}
                  className="flex items-center gap-2 hover:text-primary transition-colors text-left"
                >
                  <Compass className="w-3.5 h-3.5 text-primary/70" />
                  <span>Explore Featured Escapes</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('packages')}
                  className="flex items-center gap-2 hover:text-primary transition-colors text-left"
                >
                  <Luggage className="w-3.5 h-3.5 text-primary/70" />
                  <span>Curated Packages</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('destinations')}
                  className="flex items-center gap-2 hover:text-primary transition-colors text-left"
                >
                  <MapPin className="w-3.5 h-3.5 text-primary/70" />
                  <span>Destinations Directory</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('map')}
                  className="flex items-center gap-2 hover:text-primary transition-colors text-left"
                >
                  <Map className="w-3.5 h-3.5 text-primary/70" />
                  <span>Interactive Route Planner</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('journal')}
                  className="flex items-center gap-2 hover:text-primary transition-colors text-left"
                >
                  <BookOpen className="w-3.5 h-3.5 text-primary/70" />
                  <span>Travel Journal & Inspiration</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Interactive Travel Tools */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
              Traveler Suite
            </h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-on-surface-variant font-medium">
              <li>
                <button
                  onClick={() => setBudgetModalOpen(true)}
                  className="flex items-center gap-2 hover:text-primary transition-colors text-left"
                >
                  <DollarSign className="w-3.5 h-3.5 text-secondary" />
                  <span>Trip Budget Tracker</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setGroupModalOpen(true)}
                  className="flex items-center gap-2 hover:text-primary transition-colors text-left"
                >
                  <Users className="w-3.5 h-3.5 text-secondary" />
                  <span>Group Planning & Sync</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setMemoriesModalOpen(true)}
                  className="flex items-center gap-2 hover:text-primary transition-colors text-left"
                >
                  <Camera className="w-3.5 h-3.5 text-secondary" />
                  <span>Photo Memories Album</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openShareModal({
                    title: 'Voyager Bespoke Travel Expedition',
                    subtitle: 'Explore and plan tailor-made itineraries with friends across the globe.',
                    url: window.location.href,
                    image: VOYAGER_LOGO_URL
                  })}
                  className="flex items-center gap-2 hover:text-primary transition-colors text-left"
                >
                  <Sparkles className="w-3.5 h-3.5 text-secondary" />
                  <span>Share Itinerary</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('legal')}
                  className="flex items-center gap-2 hover:text-primary transition-colors text-left"
                >
                  <Scale className="w-3.5 h-3.5 text-secondary" />
                  <span>Traveler Legal & Terms</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust, Safety & Support */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
              Assistance & Support
            </h4>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-on-surface-variant">
              <div className="bg-surface-container p-3 rounded-xl border border-surface-container-high/60 flex flex-col gap-1">
                <span className="font-semibold text-on-surface text-xs">24/7 Concierge Hotline</span>
                <span className="text-primary font-bold text-sm tracking-tight">+1 (800) 869-2437</span>
                <span className="text-[11px] text-on-surface-variant">concierge@voyagerexpeditions.com</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>256-bit TLS/SSL Certified Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>PCI-DSS Level 1 Validated Gateway</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="border-t border-surface-container-high/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Voyager Expeditions Inc. All rights reserved.</span>
            <span className="hidden sm:inline text-outline-variant">•</span>
            <button
              onClick={() => navigateTo('legal')}
              className="hover:text-primary underline-offset-2 hover:underline transition-colors"
            >
              Privacy Policy & Traveler Terms
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs transition-colors shadow-sm cursor-pointer group"
            title="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-primary transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
