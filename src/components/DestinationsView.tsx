import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Destination, DestinationTour } from '../types';
import {
  MapPin,
  Search,
  Sun,
  Star,
  Compass,
  ArrowUpRight,
  Heart,
  Share2,
  Calendar,
  Hotel,
  Sparkles,
  Clock,
  Check,
  Plus,
  X,
  ChevronRight,
  ShieldCheck,
  Users,
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  Ticket
} from 'lucide-react';

export const DestinationsView: React.FC = () => {
  const {
    destinations,
    packages,
    wishlist,
    toggleWishlist,
    setCurrentTab,
    openShareModal,
    openBookingModal,
    addItineraryStop,
    showToast,
    formatPrice
  } = useApp();

  const [activeRegion, setActiveRegion] = useState<string>('all');
  const [activeSeason, setActiveSeason] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modal for viewing curated winter tours of a destination
  const [selectedDestForTours, setSelectedDestForTours] = useState<Destination | null>(null);
  const [tourCategoryFilter, setTourCategoryFilter] = useState<string>('all');
  
  // Quick booking state for individual tour
  const [bookingTour, setBookingTour] = useState<DestinationTour | null>(null);
  const [bookingGuests, setBookingGuests] = useState<number>(2);
  const [bookingDate, setBookingDate] = useState<string>('Dec 15, 2025');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [bookingSuccessCode, setBookingSuccessCode] = useState<string | null>(null);

  const regions = [
    { id: 'all', label: 'All Regions' },
    { id: 'Middle East', label: 'Middle East' },
    { id: 'Europe', label: 'Europe' },
    { id: 'Asia', label: 'Asia' },
    { id: 'Americas', label: 'Americas' },
    { id: 'Africa', label: 'Africa' },
  ];

  const seasons = [
    { id: 'all', label: 'All Seasons' },
    { id: 'winter', label: '❄️ Winter (Nov–Mar)', badge: 'Winter Tours' },
    { id: 'spring', label: '🌸 Spring (Mar–May)' },
    { id: 'summer', label: '☀️ Summer (Jun–Aug)' },
    { id: 'autumn', label: '🍂 Autumn (Sep–Nov)' },
  ];

  const filteredDestinations = destinations.filter((dest) => {
    // Flexible region matching
    const destRegionLower = (dest.region || '').toLowerCase();
    const destCountryLower = (dest.country || '').toLowerCase();
    const matchesRegion =
      activeRegion === 'all' ||
      destRegionLower.includes(activeRegion.toLowerCase()) ||
      (activeRegion === 'Middle East' && (destRegionLower.includes('middle-east') || destCountryLower.includes('emirates') || destCountryLower.includes('dubai') || dest.name.toLowerCase().includes('dubai'))) ||
      (activeRegion === 'Asia' && (destRegionLower.includes('asia') || destRegionLower.includes('middle-east')));

    // Season matching
    const seasonLower = (dest.bestSeason || '').toLowerCase();
    const matchesSeason =
      activeSeason === 'all' ||
      (activeSeason === 'winter' && (
        seasonLower.includes('winter') ||
        seasonLower.includes('nov') ||
        seasonLower.includes('dec') ||
        seasonLower.includes('jan') ||
        seasonLower.includes('feb') ||
        seasonLower.includes('mar')
      )) ||
      (activeSeason === 'spring' && (seasonLower.includes('spring') || seasonLower.includes('mar') || seasonLower.includes('apr') || seasonLower.includes('may'))) ||
      (activeSeason === 'summer' && (seasonLower.includes('summer') || seasonLower.includes('jun') || seasonLower.includes('jul') || seasonLower.includes('aug'))) ||
      (activeSeason === 'autumn' && (seasonLower.includes('autumn') || seasonLower.includes('sep') || seasonLower.includes('oct') || seasonLower.includes('nov')));

    // Search query matching (matches destination details and tour highlights)
    const q = searchQuery.toLowerCase().trim();
    const toursText = (dest.winterTours || []).map(t => `${t.title} ${t.tag} ${t.description} ${t.highlights.join(' ')}`).join(' ').toLowerCase();
    const matchesSearch =
      !q ||
      dest.name.toLowerCase().includes(q) ||
      dest.country.toLowerCase().includes(q) ||
      (dest.tagline || '').toLowerCase().includes(q) ||
      (dest.description || '').toLowerCase().includes(q) ||
      toursText.includes(q);

    return matchesRegion && matchesSeason && matchesSearch;
  });

  const handleOpenToursModal = (dest: Destination) => {
    setSelectedDestForTours(dest);
    setTourCategoryFilter('all');
  };

  const handleStartBookingTour = (tour: DestinationTour) => {
    setBookingTour(tour);
    setBookingGuests(2);
    setBookingDate('Dec 15, 2025');
    setBookingTime(tour.departureTimes?.[0] || '14:30');
    setBookingSuccessCode(null);
  };

  const handleConfirmTourBooking = () => {
    if (!bookingTour) return;
    const code = `VOY-DXB-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingSuccessCode(code);

    // Also automatically add this tour to the user's itinerary planner
    addItineraryStop({
      day: 1,
      time: bookingTime || '14:30',
      title: `${bookingTour.title} (${bookingGuests} Guests)`,
      location: 'Dubai, United Arab Emirates',
      category: 'activity',
      cost: bookingTour.price * bookingGuests,
      notes: `Winter Season Tour · Ref: ${code}. Included: ${bookingTour.highlights.slice(0, 3).join(', ')}`
    });

    showToast(`Confirmed! ${bookingTour.title} booked for ${bookingDate} (${code})`, 'success');
  };

  const handleAddTourToItinerary = (tour: DestinationTour) => {
    addItineraryStop({
      day: 1,
      time: tour.departureTimes?.[0]?.split(' ')?.[0] || '14:30',
      title: tour.title,
      location: 'Dubai, UAE',
      category: 'activity',
      cost: tour.price,
      notes: `Curated Winter Tour (${tour.season}). Highlights: ${tour.highlights.slice(0, 3).join(', ')}`
    });
    showToast(`Added "${tour.title}" to your trip itinerary planner!`, 'success');
  };

  const dubaiPackage = packages.find(p => p.id === 'dubai-winter-odyssey') || packages[0];
  const dubaiDest = destinations.find(d => d.id === 'dest-dubai');

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-16">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
        <div>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            Curated Global Horizons
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            Popular Destinations
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-md">
          Explore golden deserts, iconic archipelagos, and winter sanctuaries hand-selected for world travelers.
        </p>
      </div>

      {/* Winter Spotlight Banner for Dubai Tours */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-primary/10 to-surface-container border border-primary/20 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary bg-primary/15 px-2.5 py-0.5 rounded-full">
                Winter Season Spotlight
              </span>
              <span className="text-xs font-semibold text-secondary flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                Nov–Mar · 24°C Balmy Days
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-on-surface mt-1">
              Dubai Winter Tours & Arabian Desert Escapes
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 max-w-2xl">
              Winter is Dubai’s golden season with warm sunlit afternoons, red dune sunset safaris, starlit Bedouin banquets, and calm Gulf yacht cruises.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          {dubaiDest && (
            <button
              onClick={() => handleOpenToursModal(dubaiDest)}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold shadow-sm hover:bg-primary-container transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Dubai Winter Tours (5)</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => {
              setActiveSeason('winter');
              setActiveRegion('Middle East');
            }}
            className="px-3.5 py-2.5 rounded-xl bg-surface-container border border-surface-container-high text-xs font-bold text-on-surface hover:bg-surface-container-high transition-all"
            title="Filter by winter destinations"
          >
            Filter Winter
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3 mb-6">
        {/* Search input */}
        <div className="w-full flex items-center gap-2.5 bg-surface-container-low px-4 py-3 rounded-xl border border-surface-container-high/40 focus-within:ring-2 focus-within:ring-primary/40">
          <Search className="w-4 h-4 text-primary shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Dubai, winter tours, desert safaris, countries, or sights..."
            className="w-full bg-transparent text-xs sm:text-sm text-on-surface placeholder:text-outline focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-on-surface-variant hover:text-on-surface p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dual Filter Controls: Season & Region */}
        <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
          {/* Season Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full lg:w-auto pb-1 lg:pb-0">
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1 pr-1 shrink-0">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              Season:
            </span>
            {seasons.map((season) => {
              const isActive = activeSeason === season.id;
              return (
                <button
                  key={season.id}
                  onClick={() => setActiveSeason(season.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span>{season.label}</span>
                  {season.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${isActive ? 'bg-white/25 text-white' : 'bg-primary/10 text-primary'}`}>
                      {season.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Region Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full lg:w-auto pb-1 lg:pb-0">
            <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1 pr-1 shrink-0">
              <MapPin className="w-3.5 h-3.5 text-secondary" />
              Region:
            </span>
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setActiveRegion(reg.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeRegion === reg.id
                    ? 'bg-secondary text-white shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Destinations */}
      {filteredDestinations.length === 0 ? (
        <div className="bg-surface-container rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-3 border border-surface-container-high">
          <Compass className="w-10 h-10 text-outline" />
          <h3 className="text-lg font-bold text-on-surface">No destinations match your filters</h3>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-sm">
            Try resetting your season or region filters, or search for "Dubai" to explore winter tours.
          </p>
          <button
            onClick={() => {
              setActiveRegion('all');
              setActiveSeason('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold mt-2"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest: Destination) => {
            const isWishlisted = wishlist.includes(dest.id);
            const hasWinterTours = Boolean(dest.winterTours && dest.winterTours.length > 0);
            const isDubai = dest.id === 'dest-dubai';

            return (
              <div
                key={dest.id}
                className={`bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(27,59,72,0.06)] border flex flex-col justify-between group hover:shadow-lg transition-all ${
                  isDubai ? 'border-primary/40 ring-1 ring-primary/20' : 'border-surface-container-high/40'
                }`}
              >
                {/* Media Card Top */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Country Pill & Spotlight Badge */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-primary" />
                      {dest.country}
                    </div>
                    {dest.badge && (
                      <div className="px-2.5 py-0.5 rounded-full bg-amber-500/90 text-white text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md flex items-center gap-1 shadow-sm">
                        <Flame className="w-3 h-3" />
                        {dest.badge}
                      </div>
                    )}
                  </div>

                  {/* Weather & Wishlist & Share */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      {dest.weatherTemp || dest.avgTemp || '24°C'}
                    </span>
                    <button
                      onClick={() => toggleWishlist(dest.id)}
                      className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
                        isWishlisted
                          ? 'bg-primary text-white'
                          : 'bg-black/50 text-white hover:bg-black/80'
                      }`}
                      title="Save destination"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => openShareModal({
                        title: `${dest.name}, ${dest.country}`,
                        subtitle: dest.tagline || dest.description || '',
                        url: window.location.href,
                        image: dest.imageUrl
                      })}
                      className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                      title="Share destination"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Bottom title inside media */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl sm:text-2xl font-black drop-shadow-sm leading-snug">
                        {dest.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-bold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-lg shrink-0">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{dest.rating || 4.9}</span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-200 line-clamp-1 mt-0.5">
                      {dest.tagline || dest.description}
                    </p>
                  </div>
                </div>

                {/* Card Meta & Details */}
                <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1 justify-between">
                  <div>
                    {/* Meta stats */}
                    <div className="grid grid-cols-2 gap-2 text-xs pb-1">
                      <div className="flex items-center gap-1.5 text-on-surface-variant">
                        <Hotel className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span><strong>{dest.staysCount}</strong> Curated Stays</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-on-surface-variant">
                        <Calendar className="w-3.5 h-3.5 text-secondary shrink-0" />
                        <span>Best: <strong>{dest.bestSeason}</strong></span>
                      </div>
                    </div>

                    {/* Winter Tours Showcase Pill on Destination Card */}
                    {hasWinterTours && (
                      <div className="mt-2 p-2.5 rounded-xl bg-primary/10 border border-primary/20 flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-extrabold text-primary flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            {dest.winterTours?.length} Curated Winter Tours
                          </span>
                          <span className="text-[10px] uppercase font-bold text-secondary">
                            Nov – Mar Peak
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {dest.winterTours?.slice(0, 3).map((t) => (
                            <span
                              key={t.id}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-white/80 dark:bg-surface-container font-semibold text-on-surface truncate max-w-[190px]"
                              title={t.title}
                            >
                              {t.tag}
                            </span>
                          ))}
                          {(dest.winterTours?.length || 0) > 3 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-primary text-white font-bold">
                              +{(dest.winterTours?.length || 0) - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Highlights tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {(dest.highlights || dest.sights || []).slice(0, 4).map((h, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2.5 py-0.5 rounded-md bg-surface-container font-medium text-on-surface-variant"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Pricing */}
                  <div className="pt-3 border-t border-surface-container-high/40 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-secondary">
                        From {formatPrice(dest.startingPrice || 180)} / trip
                      </span>
                      <button
                        onClick={() => setCurrentTab('map')}
                        className="flex items-center gap-1 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <span>Map & Plan</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Prominent Action Button for Destinations with Tours */}
                    {hasWinterTours ? (
                      <button
                        onClick={() => handleOpenToursModal(dest)}
                        className="w-full py-2.5 px-3 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary-container transition-all flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>View {dest.name.split('&')[0].trim()} Winter Tours ({dest.winterTours?.length})</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setCurrentTab('packages')}
                        className="w-full py-2 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all flex items-center justify-center gap-1"
                      >
                        <span>Explore Packages</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CURATED WINTER TOURS FOR SELECTED DESTINATION (DUBAI & MORE)       */}
      {/* ========================================================================= */}
      {selectedDestForTours && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[92vh] bg-surface-container-lowest rounded-3xl shadow-2xl border border-surface-container-high/60 overflow-hidden flex flex-col">
            {/* Modal Header Media Banner */}
            <div className="relative h-44 sm:h-52 w-full overflow-hidden shrink-0">
              <img
                src={selectedDestForTours.imageUrl}
                alt={selectedDestForTours.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedDestForTours(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/90 flex items-center justify-center transition-colors z-10"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Banner Details */}
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider bg-primary text-white px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Winter Season Showcase
                  </span>
                  <span className="text-[11px] font-semibold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Sun className="w-3 h-3 text-amber-400" />
                    {selectedDestForTours.weatherTemp || '24°C'} Balmy Warmth · Nov–Mar
                  </span>
                  <span className="text-[11px] font-semibold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                    {selectedDestForTours.country}
                  </span>
                </div>
                <h3 className="text-xl sm:text-3xl font-black">
                  {selectedDestForTours.name} Winter Tours
                </h3>
                <p className="text-xs sm:text-sm text-zinc-200 line-clamp-1 mt-0.5">
                  Hand-crafted desert safaris, private Gulf charters, skyline lounges, and historical souk walks.
                </p>
              </div>
            </div>

            {/* Why Winter Note Banner */}
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-on-surface">
                <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  <strong>Why Winter in Dubai?</strong> Gentle 24°C sunshine, pleasant desert nights, and calm Gulf waters make November to March the premier season for open-air touring.
                </span>
              </div>
              <span className="text-[10px] font-extrabold text-primary uppercase whitespace-nowrap bg-primary/10 px-2 py-0.5 rounded-md hidden sm:inline-block">
                5 VIP Tours Available
              </span>
            </div>

            {/* Scrollable Tours List */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm sm:text-base font-extrabold text-on-surface flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-primary" />
                  Curated Winter Tours & Experiences
                </h4>
                <span className="text-xs text-on-surface-variant">
                  Prices per guest in {formatPrice(100).split('100')[0].trim()}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {(selectedDestForTours.winterTours || []).map((tour) => (
                  <div
                    key={tour.id}
                    className="bg-surface-container-low rounded-2xl border border-surface-container-high/50 p-4 sm:p-5 flex flex-col md:flex-row gap-4 hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    {/* Tour Image */}
                    <div className="relative w-full md:w-48 h-40 md:h-auto rounded-xl overflow-hidden shrink-0">
                      <img
                        src={tour.imageUrl}
                        alt={tour.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                        {tour.tag}
                      </div>
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {tour.duration.split('·')[0].trim()}
                      </div>
                    </div>

                    {/* Tour Details */}
                    <div className="flex flex-col justify-between flex-1 gap-2.5">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h5 className="text-base font-bold text-on-surface">
                            {tour.title}
                          </h5>
                          <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md self-start sm:self-auto">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{tour.rating}</span>
                            <span className="text-[10px] text-on-surface-variant font-normal">({tour.reviewCount})</span>
                          </div>
                        </div>

                        <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                          {tour.description}
                        </p>

                        {/* Highlights pills */}
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {tour.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-surface-container-high/60 font-medium text-on-surface flex items-center gap-1"
                            >
                              <Check className="w-2.5 h-2.5 text-primary" />
                              {h}
                            </span>
                          ))}
                        </div>

                        {/* Inclusions */}
                        {tour.inclusions && (
                          <div className="mt-2 text-[11px] text-on-surface-variant flex flex-wrap gap-x-3 gap-y-1">
                            <span className="font-bold text-on-surface">Includes:</span>
                            {tour.inclusions.map((inc, i) => (
                              <span key={i} className="flex items-center gap-1">
                                • {inc}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Pricing and CTAs */}
                      <div className="pt-3 border-t border-surface-container-high/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                            Winter Rate · {tour.season}
                          </span>
                          <span className="text-lg font-extrabold text-primary">
                            {formatPrice(tour.price)}{' '}
                            <span className="text-xs font-normal text-on-surface-variant">/ guest</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAddTourToItinerary(tour)}
                            className="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-all flex items-center gap-1.5 border border-surface-container-high"
                            title="Add to Itinerary"
                          >
                            <Plus className="w-3.5 h-3.5 text-primary" />
                            <span>Add to Planner</span>
                          </button>
                          <button
                            onClick={() => handleStartBookingTour(tour)}
                            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary-container transition-all flex items-center gap-1.5"
                          >
                            <Ticket className="w-3.5 h-3.5" />
                            <span>Book Tour</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Complete Dubai Package Banner */}
              {dubaiPackage && (
                <div className="mt-2 rounded-2xl bg-surface-container p-4 sm:p-5 border border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">
                      Comprehensive 6-Day Odyssey
                    </span>
                    <h5 className="text-sm sm:text-base font-extrabold text-on-surface mt-0.5">
                      {dubaiPackage.title}
                    </h5>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Combines all 5 winter tours, 5-star Palm Jumeirah villas, and airport transfers. From {formatPrice(dubaiPackage.price)} / person.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDestForTours(null);
                      openBookingModal(dubaiPackage);
                    }}
                    className="px-4 py-2 rounded-xl bg-secondary text-white text-xs font-bold shrink-0 hover:bg-secondary/90 transition-all flex items-center gap-1"
                  >
                    <span>Book Full 6-Day Package</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: QUICK BOOKING CONFIRMATION FOR A SPECIFIC WINTER TOUR              */}
      {/* ========================================================================= */}
      {bookingTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl border border-surface-container-high/60 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-surface-container-high flex items-center justify-between bg-surface-container-low">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-primary" />
                <h4 className="text-base font-bold text-on-surface">
                  Book Winter Tour
                </h4>
              </div>
              <button
                onClick={() => setBookingTour(null)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingSuccessCode ? (
              /* Success confirmation ticket screen */
              <div className="p-6 text-center flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-on-surface">
                  Booking Confirmed!
                </h4>
                <p className="text-xs sm:text-sm text-on-surface-variant max-w-sm">
                  Your reservation for <strong>{bookingTour.title}</strong> has been secured for <strong>{bookingDate}</strong> at <strong>{bookingTime}</strong>.
                </p>

                <div className="w-full bg-surface-container rounded-xl p-3.5 my-2 border border-surface-container-high text-left flex flex-col gap-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Booking Reference:</span>
                    <strong className="text-primary font-mono">{bookingSuccessCode}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Travelers:</span>
                    <span className="font-semibold">{bookingGuests} Guests</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Total Paid:</span>
                    <strong className="text-on-surface">{formatPrice(bookingTour.price * bookingGuests)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Status:</span>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Instant Confirmation
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full mt-2">
                  <button
                    onClick={() => {
                      setBookingTour(null);
                      setSelectedDestForTours(null);
                      setCurrentTab('map');
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-all"
                  >
                    View in Map & Planner
                  </button>
                  <button
                    onClick={() => setBookingTour(null)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary-container transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <div className="p-4 sm:p-6 flex flex-col gap-4">
                {/* Tour preview mini card */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-surface-container-high">
                  <img
                    src={bookingTour.imageUrl}
                    alt={bookingTour.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold text-primary">
                      {bookingTour.season}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-on-surface truncate">
                      {bookingTour.title}
                    </h5>
                    <p className="text-[11px] text-on-surface-variant">
                      {bookingTour.duration} · {formatPrice(bookingTour.price)} / guest
                    </p>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    Select Winter Date (Nov – Mar)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {['Nov 20, 2025', 'Dec 15, 2025', 'Jan 10, 2026', 'Feb 14, 2026'].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setBookingDate(d)}
                        className={`py-2 px-2 text-xs rounded-xl font-bold border transition-all ${
                          bookingDate === d
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-surface-container border-surface-container-high text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Departure Time Selection */}
                {bookingTour.departureTimes && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-secondary" />
                      Departure Slot
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {bookingTour.departureTimes.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setBookingTime(time)}
                          className={`py-1.5 px-3 text-xs rounded-xl font-bold border transition-all ${
                            bookingTime === time
                              ? 'bg-secondary text-white border-secondary shadow-sm'
                              : 'bg-surface-container border-surface-container-high text-on-surface hover:bg-surface-container-high'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Guests counter */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-high">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <div>
                      <span className="text-xs font-bold text-on-surface block">Number of Guests</span>
                      <span className="text-[11px] text-on-surface-variant">Ages 4 and above</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setBookingGuests(Math.max(1, bookingGuests - 1))}
                      className="w-7 h-7 rounded-lg bg-surface-container-high text-on-surface font-bold hover:bg-outline-variant transition-colors flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{bookingGuests}</span>
                    <button
                      type="button"
                      onClick={() => setBookingGuests(Math.min(10, bookingGuests + 1))}
                      className="w-7 h-7 rounded-lg bg-primary text-white font-bold hover:bg-primary-container transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-3 rounded-xl bg-surface-container flex flex-col gap-1 text-xs">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>{formatPrice(bookingTour.price)} × {bookingGuests} {bookingGuests === 1 ? 'Guest' : 'Guests'}</span>
                    <span>{formatPrice(bookingTour.price * bookingGuests)}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Dubai Tourism & Conservation Fee</span>
                    <span className="text-emerald-600 font-semibold">Included</span>
                  </div>
                  <div className="pt-2 mt-1 border-t border-surface-container-high flex justify-between items-baseline font-bold text-sm text-on-surface">
                    <span>Total Amount</span>
                    <span className="text-base text-primary font-black">
                      {formatPrice(bookingTour.price * bookingGuests)}
                    </span>
                  </div>
                </div>

                {/* Confirm Button */}
                <button
                  type="button"
                  onClick={handleConfirmTourBooking}
                  className="w-full py-3 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Winter Tour Reservation</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
