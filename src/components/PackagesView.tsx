import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TravelPackage } from '../types';
import {
  Star,
  Clock,
  Bookmark,
  Share2,
  CheckCircle2,
  SlidersHorizontal,
  Search,
  Sparkles,
  MapPin,
  Calendar
} from 'lucide-react';

export const PackagesView: React.FC = () => {
  const {
    packages,
    wishlist,
    toggleWishlist,
    openBookingModal,
    openShareModal,
    formatPrice,
    t
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Journeys' },
    { id: 'island', label: 'Island Escape' },
    { id: 'mountain', label: 'Alpine & Snow' },
    { id: 'cultural', label: 'Cultural & Historic' },
    { id: 'safari', label: 'Safari & Wildlife' },
    { id: 'wellness', label: 'Wellness & Spa' }
  ];

  const filteredPackages = packages.filter((pkg) => {
    const matchesCat = activeCategory === 'all' || pkg.categories.includes(activeCategory);
    const matchesSearch =
      !searchFilter ||
      pkg.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      pkg.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesPrice = pkg.price <= maxPrice;
    return matchesCat && matchesSearch && matchesPrice;
  });

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-12">
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
        <div>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {t('curatedJourneys') || 'Curated Journeys'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            Bespoke Vacation Packages
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-md leading-relaxed">
          Handcrafted expeditions managed by certified local concierges with private charters, fine dining, and full cancellation flexibility.
        </p>
      </div>

      {/* Search Bar & Filter Toggle */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 flex items-center gap-2.5 bg-surface-container-low px-4 py-2.5 rounded-xl border border-surface-container-high/40 focus-within:ring-2 focus-within:ring-primary/40">
          <Search className="w-4 h-4 text-primary" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search by destination or theme (e.g. Amalfi, Onsen, Glaciers)..."
            className="w-full bg-transparent text-xs sm:text-sm text-on-surface placeholder:text-outline focus:outline-none"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
            showFilters
              ? 'bg-primary text-white border-primary'
              : 'bg-surface-container text-on-surface border-surface-container-high/60 hover:bg-surface-container-high'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Price Filter</span>
        </button>
      </div>

      {/* Conditional Price Range Drawer */}
      {showFilters && (
        <div className="bg-surface-container-low rounded-xl p-4 mb-4 border border-surface-container-high/40 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
          <div className="w-full sm:w-1/2">
            <div className="flex justify-between text-xs font-semibold text-on-surface mb-1">
              <span>Max Budget: {formatPrice(maxPrice)} / person</span>
              <span className="text-outline">{formatPrice(1000)} - {formatPrice(6000)}</span>
            </div>
            <input
              type="range"
              min="1200"
              max="6000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-on-surface-variant font-medium">
              Showing {filteredPackages.length} packages
            </span>
            <button
              onClick={() => {
                setMaxPrice(6000);
                setActiveCategory('all');
                setSearchFilter('');
              }}
              className="text-xs text-primary font-bold hover:underline"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-primary text-white shadow-sm scale-105'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Packages Grid */}
      {filteredPackages.length === 0 ? (
        <div className="text-center py-16 bg-surface-container-lowest rounded-2xl border border-surface-container-high/40 p-8">
          <MapPin className="w-12 h-12 text-outline mx-auto mb-3" />
          <h3 className="text-lg font-bold text-on-surface">No packages found</h3>
          <p className="text-xs text-on-surface-variant mt-1">
            Try adjusting your budget slider or clearing the keyword search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg: TravelPackage) => {
            const isBookmarked = wishlist.includes(pkg.id);
            return (
              <div
                key={pkg.id}
                className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(27,59,72,0.06)] border border-surface-container-high/40 flex flex-col justify-between group hover:shadow-lg transition-all"
              >
                {/* Image Header */}
                <div>
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Top badging */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary" />
                        {pkg.location}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={() => openShareModal({
                          title: pkg.title,
                          subtitle: pkg.description,
                          url: window.location.href,
                          image: pkg.imageUrl
                        })}
                        className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                        title="Share Package"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleWishlist(pkg.id)}
                        className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
                          isBookmarked
                            ? 'bg-primary text-white'
                            : 'bg-black/50 text-white hover:bg-black/80'
                        }`}
                        title="Save to Wishlist"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Rating & Duration badges */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md font-semibold">
                        <Clock className="w-3 h-3 text-secondary" />
                        {pkg.duration}
                      </span>
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md font-semibold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {pkg.rating} ({pkg.reviewsCount || pkg.reviewCount || 120})
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors leading-snug">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed line-clamp-3">
                      {pkg.description}
                    </p>

                    {/* Highlights / Features pills */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(pkg.features || pkg.inclusions?.map(i => i.title) || ['Curated Itinerary', 'Private Transport', 'Concierge Service']).map((feature, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-surface-container font-medium text-on-surface-variant"
                        >
                          <CheckCircle2 className="w-3 h-3 text-secondary shrink-0" />
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Next Available Dates */}
                    <div className="mt-3.5 pt-3 border-t border-surface-container-high/40 flex items-center justify-between text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        Next Departure:
                      </span>
                      <span className="font-bold text-on-surface">
                        {pkg.availableDates?.[0] || 'Jul 15, 2025'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Price & Booking CTA */}
                <div className="px-4 sm:px-5 pb-5 pt-2 flex items-center justify-between border-t border-surface-container-high/40 bg-surface-container-low/30">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                      Total Experience
                    </span>
                    <span className="text-xl font-black text-primary">
                      {formatPrice(pkg.price)}
                      <span className="text-xs font-normal text-on-surface-variant">
                        /person
                      </span>
                    </span>
                  </div>

                  <button
                    onClick={() => openBookingModal(pkg)}
                    className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md hover:shadow-lg active:scale-95 transition-all"
                  >
                    Reserve Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
