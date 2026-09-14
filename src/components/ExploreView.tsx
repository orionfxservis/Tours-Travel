import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Calendar,
  Users,
  SlidersHorizontal,
  Compass,
  Headphones,
  FileCheck,
  Hotel,
  ArrowRight,
  Heart,
  Star,
  Clock,
  Bookmark,
  ChevronRight,
  Share2
} from 'lucide-react';

export const ExploreView: React.FC = () => {
  const {
    packages,
    destinations,
    articles,
    wishlist,
    toggleWishlist,
    openBookingModal,
    setCurrentTab,
    openShareModal,
    showToast,
    formatPrice,
    t
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDates, setSelectedDates] = useState('Jul 12 – Jul 24');
  const [selectedWanderers, setSelectedWanderers] = useState(2);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Hero Spotlight Package: Amalfi / Mediterranean
  const heroPackage = packages.find(p => p.id === 'amalfi-dream') || packages[0];
  const isHeroWishlisted = wishlist.includes(heroPackage.id);

  const filteredDestinations = destinations.filter(d =>
    !searchQuery ||
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Search & Exploration Header Panel */}
      <section className="px-4 sm:px-6 pt-4 pb-2 max-w-7xl mx-auto w-full">
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-[0_4px_24px_-4px_rgba(27,59,72,0.07)] flex flex-col gap-3 border border-surface-container-high/40">
          {/* Search input field */}
          <div className="flex items-center gap-3 bg-surface-container-low px-4 py-3 rounded-xl focus-within:ring-2 focus-within:ring-primary/40 transition-all">
            <Compass className="w-5 h-5 text-primary shrink-0" />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">
                {t('discover') || 'Discover'}
              </span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none truncate font-medium"
                placeholder={t('searchPlaceholder') || 'Where do you want to explore? (Amalfi, Kyoto, Iceland...)'}
                type="text"
              />
            </div>
            <button
              onClick={() => {
                if (searchQuery.trim()) {
                  showToast(`Searching curated expeditions for "${searchQuery}"...`, 'search');
                }
              }}
              aria-label="Search"
              className="w-10 h-10 rounded-full bg-primary hover:bg-primary-container text-white flex items-center justify-center shadow-sm active:scale-95 transition-all"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Compact Filter / Picker Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-0.5">
            <button
              onClick={() => {
                const nextDates = selectedDates === 'Jul 12 – Jul 24' ? 'Sep 04 – Sep 18' : 'Jul 12 – Jul 24';
                setSelectedDates(nextDates);
                showToast(`Travel window updated to ${nextDates}`, 'calendar_month');
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface text-xs font-semibold whitespace-nowrap active:bg-secondary-fixed transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>{selectedDates}</span>
            </button>

            <button
              onClick={() => {
                const nextCount = selectedWanderers >= 6 ? 2 : selectedWanderers + 2;
                setSelectedWanderers(nextCount);
                showToast(`Party size updated to ${nextCount} Wanderers`, 'group');
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface text-xs font-semibold whitespace-nowrap active:bg-secondary-fixed transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-secondary" />
              <span>{selectedWanderers} Wanderers</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface text-xs font-semibold whitespace-nowrap active:bg-secondary-fixed transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-tertiary" />
                <span>{t('filters') || 'Filters'}</span>
              </button>

              {showFilterDropdown && (
                <div className="absolute left-0 mt-2 w-52 bg-surface-container-lowest rounded-xl shadow-xl p-3 border border-outline-variant/30 z-30 flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">Experience Type</span>
                  <button
                    onClick={() => {
                      setCurrentTab('packages');
                      setShowFilterDropdown(false);
                    }}
                    className="text-left text-xs text-on-surface hover:text-primary py-1"
                  >
                    ✨ Private Yacht & Charter Stays
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('packages');
                      setShowFilterDropdown(false);
                    }}
                    className="text-left text-xs text-on-surface hover:text-primary py-1"
                  >
                    🏔️ Alpine Thermal & Wellness
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('packages');
                      setShowFilterDropdown(false);
                    }}
                    className="text-left text-xs text-on-surface hover:text-primary py-1"
                  >
                    🍵 Heritage Ryokan & Tea Trails
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Carousel: Summer in the Mediterranean */}
      <section className="px-4 sm:px-6 pt-3 pb-4 max-w-7xl mx-auto w-full">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_12px_32px_-8px_rgba(27,59,72,0.18)] aspect-[16/10] sm:aspect-[21/9] flex flex-col justify-end p-5 sm:p-8 group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBW0nyCQQq-zKoscYXUCpKH-paxSlpRFCgujQmRjbG0EbfhBO82fAoZhHAZVQHJPTrNFCp-TsN7sP_pN_eyJwYtlAyeqw_-utUgYBqf9YQ-2lAm21VV_c6LecOgK842X2wxKZ7XcebXvdqahCgYmVQNeNaXmXFWFljsOlTinTijGY-t4J7qIuPvJGArX7zSO_JFQT1nf5LyxwM6y20-p9nkVh-WEyBL4EmH-FivfuIYTfNSicnHWNUV8A')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          {/* Offer Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-primary font-bold">
              Limited Offer · 25% Off
            </span>
          </div>

          {/* Quick Wishlist & Share Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => openShareModal({
                title: 'Summer in the Mediterranean',
                subtitle: 'Amalfi coastlines, private catamaran charters & sun-ripened vineyards.',
                url: window.location.href,
                image: heroPackage.imageUrl
              })}
              aria-label="Share spotlight"
              className="w-9 h-9 rounded-full bg-white/85 dark:bg-zinc-900/80 backdrop-blur-md flex items-center justify-center text-on-surface shadow-sm active:scale-90 transition-transform"
            >
              <Share2 className="w-4 h-4 text-secondary" />
            </button>
            <button
              onClick={() => toggleWishlist(heroPackage.id)}
              aria-label="Save to favorites"
              className="w-9 h-9 rounded-full bg-white/85 dark:bg-zinc-900/80 backdrop-blur-md flex items-center justify-center text-on-surface shadow-sm active:scale-90 transition-transform"
            >
              <Heart
                className={`w-4 h-4 ${isHeroWishlisted ? 'fill-primary text-primary' : 'text-primary'}`}
              />
            </button>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-1 text-white max-w-2xl">
            <span className="text-[11px] uppercase tracking-widest text-primary-fixed font-bold">
              {t('seasonalSpotlight') || 'Seasonal Spotlight'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold leading-tight drop-shadow-sm">
              {t('summerMediterranean') || 'Summer in the Mediterranean'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-200 line-clamp-2">
              {t('summerSubtitle') || 'Amalfi coastlines, private catamaran charters & sun-ripened vineyards.'}
            </p>
            <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs text-zinc-300">
                  {t('earlyBooking') || 'Early booking from'}
                </span>
                <span className="text-lg sm:text-xl font-bold text-white">
                  {formatPrice(2840)}{' '}
                  <span className="text-xs font-normal line-through text-zinc-400">
                    {formatPrice(3790)}
                  </span>
                </span>
              </div>
              <button
                onClick={() => openBookingModal(heroPackage)}
                className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-container text-white text-xs sm:text-sm font-bold shadow-lg active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span>{t('bookNow') || 'Book Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Travel Services Grid */}
      <section className="px-4 sm:px-6 py-2 max-w-7xl mx-auto w-full">
        <div className="bg-surface-container-low rounded-2xl p-3.5 sm:p-5 shadow-sm border border-surface-container-high/30">
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {/* Custom Itineraries */}
            <div
              onClick={() => setCurrentTab('map')}
              className="flex flex-col items-center text-center gap-1.5 p-2 rounded-xl active:bg-surface-container hover:bg-surface-container transition-colors cursor-pointer group"
            >
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-primary-fixed flex items-center justify-center text-primary shadow-sm group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[11px] sm:text-xs text-on-surface leading-tight font-semibold">
                {t('customItineraries') || 'Custom Itineraries'}
              </span>
            </div>

            {/* 24/7 Concierge */}
            <div
              onClick={() => {
                showToast('Connecting you to Arthur Vance-Moreau, Senior Travel Specialist...', 'support_agent');
                setCurrentTab('journal');
              }}
              className="flex flex-col items-center text-center gap-1.5 p-2 rounded-xl active:bg-surface-container hover:bg-surface-container transition-colors cursor-pointer group"
            >
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shadow-sm group-hover:scale-105 transition-transform">
                <Headphones className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[11px] sm:text-xs text-on-surface leading-tight font-semibold">
                {t('concierge') || '24/7 Concierge'}
              </span>
            </div>

            {/* Visa Support */}
            <div
              onClick={() => {
                setCurrentTab('legal');
                showToast('Navigating to Travel Documentation & Visa Governance', 'policy');
              }}
              className="flex flex-col items-center text-center gap-1.5 p-2 rounded-xl active:bg-surface-container hover:bg-surface-container transition-colors cursor-pointer group"
            >
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary shadow-sm group-hover:scale-105 transition-transform">
                <FileCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[11px] sm:text-xs text-on-surface leading-tight font-semibold">
                {t('visaSupport') || 'Visa Support'}
              </span>
            </div>

            {/* Luxury Stays */}
            <div
              onClick={() => setCurrentTab('packages')}
              className="flex flex-col items-center text-center gap-1.5 p-2 rounded-xl active:bg-surface-container hover:bg-surface-container transition-colors cursor-pointer group"
            >
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface shadow-sm group-hover:scale-105 transition-transform">
                <Hotel className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <span className="text-[11px] sm:text-xs text-on-surface leading-tight font-semibold">
                {t('luxuryStays') || 'Luxury Stays'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vacation Packages */}
      <section className="px-4 sm:px-6 pt-6 pb-2 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-primary font-bold">
              {t('curatedJourneys') || 'Curated Journeys'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-on-surface">
              {t('featuredPackages') || 'Featured Packages'}
            </h3>
          </div>
          <button
            onClick={() => setCurrentTab('packages')}
            className="text-xs font-semibold text-secondary hover:text-primary flex items-center gap-0.5"
          >
            <span>{t('viewAll') || 'View all'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Packages Responsive Grid aligned perfectly to page margins */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {packages.slice(0, 4).map((pkg) => {
            const isBookmarked = wishlist.includes(pkg.id);
            return (
              <div
                key={pkg.id}
                className="w-full bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(27,59,72,0.06)] border border-surface-container-high/40 flex flex-col justify-between group hover:shadow-md transition-shadow"
              >
                <div
                  className="relative h-44 sm:h-48 w-full overflow-hidden cursor-pointer"
                  onClick={() => openBookingModal(pkg)}
                >
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
                    {pkg.categories.includes('island') ? 'All-Inclusive' : pkg.categories.includes('mountain') ? 'Adventure' : 'Curated'}
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{pkg.rating}</span>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-lg bg-white/90 dark:bg-black/80 backdrop-blur-sm text-on-surface text-[11px] font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-secondary" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                  <div>
                    <h4
                      onClick={() => openBookingModal(pkg)}
                      className="font-bold text-base text-on-surface truncate hover:text-primary cursor-pointer"
                      title={pkg.title}
                    >
                      {pkg.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mt-0.5 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-surface-container-high/40">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant">
                        {t('startingFrom') || 'Starting from'}
                      </span>
                      <span className="text-base font-bold text-primary">
                        {formatPrice(pkg.price)}
                        <span className="text-xs font-normal text-on-surface-variant">
                          {t('perPerson') || '/person'}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleWishlist(pkg.id)}
                        aria-label="Bookmark package"
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                          isBookmarked
                            ? 'bg-primary text-white'
                            : 'bg-surface-container text-secondary hover:text-on-surface'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => openBookingModal(pkg)}
                        className="px-3 py-1.5 rounded-full bg-primary hover:bg-primary-container text-white text-xs font-bold transition-transform active:scale-95 shadow-sm"
                      >
                        {t('reserve') || 'Reserve'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Popular Destinations Worldwide (2x2 Rich Media Grid) */}
      <section className="px-4 sm:px-6 pt-6 pb-2 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-primary font-bold">
              {t('wanderlustPicks') || 'Wanderlust Picks'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-on-surface">
              {t('popularDestinations') || 'Popular Destinations'}
            </h3>
          </div>
          <button
            onClick={() => setCurrentTab('destinations')}
            className="text-xs font-semibold text-on-surface-variant hover:text-primary flex items-center gap-1"
          >
            <span>42 Locations</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {filteredDestinations.slice(0, 4).map((dest) => (
            <div
              key={dest.id}
              onClick={() => setCurrentTab('destinations')}
              className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm flex flex-col justify-end p-3.5 cursor-pointer group active:scale-[0.98] transition-all hover:shadow-md"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('${dest.imageUrl}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="text-[10px] text-primary-fixed uppercase tracking-wider font-bold">
                  {dest.country}
                </span>
                <h4 className="font-bold text-base sm:text-lg leading-tight">
                  {dest.name}
                </h4>
                <p className="text-[11px] text-zinc-200 mt-0.5">
                  {dest.staysCount} Curated Stays
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Metrics & Verified Traveler Review Banner */}
      <section className="px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full">
        <div className="bg-surface-container rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-4 border border-surface-container-high/40">
          {/* Trust Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 pb-3 border-b border-surface-container-high/50">
            <div className="flex flex-col text-center">
              <span className="text-xl sm:text-2xl font-extrabold text-primary">14.8k+</span>
              <span className="text-[10px] sm:text-xs text-on-surface-variant font-medium">
                {t('journeysPlanned') || 'Journeys Planned'}
              </span>
            </div>
            <div className="flex flex-col text-center">
              <span className="text-xl sm:text-2xl font-extrabold text-secondary">4.96</span>
              <span className="text-[10px] sm:text-xs text-on-surface-variant font-medium">
                {t('avgRating') || 'Average Rating'}
              </span>
            </div>
            <div className="flex flex-col text-center">
              <span className="text-xl sm:text-2xl font-extrabold text-tertiary">98%</span>
              <span className="text-[10px] sm:text-xs text-on-surface-variant font-medium">
                {t('satisfiedTravelers') || 'Satisfied Travelers'}
              </span>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="italic text-sm sm:text-base text-on-surface font-light leading-relaxed">
              “Voyager handled every minute detail for our Mediterranean escape—from private harbor transfers to cliffside tables we could never have reserved alone.”
            </p>
            <div className="flex items-center gap-3 pt-1">
              <img
                className="w-10 h-10 rounded-full object-cover ring-2 ring-surface-container"
                alt="Elena Vance"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBuUxmMlmHAHD5x_73mvzrzD_8MYWdSiC4jublF-_VONj3GB1bDMTadICrVgnBvFInVg5kZerMEV_E6CXDnKTnrrLjZte6M1WbVblBexi_qorG8cWsmMjB0MZb8kkYtsOU0sQMrMABMQ3NuTx1t7VI5lN5q53jo06p0DKYeLgGhFLTrk_hLCUsZYH351OlvfXSYDVCKJnOzEjVALn72HHY5mh0y_xmdWkhkAvAho6kNXCSPFyP8pur_Q"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">Elena Vance & Marcus Reed</span>
                <span className="text-[11px] text-secondary">Amalfi & Ravello Expedition · June 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Travel Stories & Inspiration */}
      <section className="px-4 sm:px-6 pt-2 pb-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-primary font-bold">
              Journal & Insights
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-on-surface">
              {t('travelInspiration') || 'Travel Inspiration'}
            </h3>
          </div>
          <button
            onClick={() => setCurrentTab('journal')}
            className="text-xs font-semibold text-secondary hover:text-primary flex items-center gap-0.5"
          >
            <span>{t('readAll') || 'Read all'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
          {articles.slice(0, 2).map((story) => (
            <article
              key={story.id}
              onClick={() => setCurrentTab('journal')}
              className="bg-surface-container-lowest rounded-2xl p-3 sm:p-4 shadow-sm border border-surface-container-high/40 flex items-center gap-3.5 cursor-pointer active:scale-[0.99] hover:shadow-md transition-all group"
            >
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-cover bg-center transition-transform group-hover:scale-105"
                style={{ backgroundImage: `url('${story.imageUrl}')` }}
              />
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
                    {story.category}
                  </span>
                  <span className="text-outline text-xs">•</span>
                  <span className="text-[10px] text-on-surface-variant font-medium">
                    {story.readTime}
                  </span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {story.title}
                </h4>
                <span className="text-[11px] text-secondary mt-1">
                  By {story.author}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
