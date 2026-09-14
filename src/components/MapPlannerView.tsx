import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ItineraryStop } from '../types';
import {
  MapPin,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Users,
  DollarSign,
  Download,
  Share2,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

export const MapPlannerView: React.FC = () => {
  const {
    itineraryStops,
    addItineraryStop,
    voteItineraryStop,
    groupMembers,
    setBudgetModalOpen,
    setGroupModalOpen,
    openShareModal,
    showToast,
    isOffline
  } = useApp();

  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedStopId, setSelectedStopId] = useState<string>(itineraryStops[0]?.id || '');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Form for new stop
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('14:00');
  const [newLocation, setNewLocation] = useState('');
  const [newCategory, setNewCategory] = useState<ItineraryStop['category']>('activity');
  const [newCost, setNewCost] = useState(45);
  const [newNotes, setNewNotes] = useState('');

  const currentStops = itineraryStops.filter(
    (stop) =>
      stop.day === selectedDay &&
      (filterCategory === 'all' || stop.category === filterCategory)
  );

  const selectedStop = itineraryStops.find((s) => s.id === selectedStopId) || currentStops[0] || itineraryStops[0];

  const handleAddStopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLocation.trim()) {
      showToast('Please fill in activity title and location', 'error');
      return;
    }

    addItineraryStop({
      day: selectedDay,
      time: newTime,
      title: newTitle,
      location: newLocation,
      coordinates: [
        40.63 + (Math.random() - 0.5) * 0.08,
        14.60 + (Math.random() - 0.5) * 0.08
      ],
      description: newNotes || 'Suggested by group member',
      category: newCategory,
      cost: Number(newCost) || 0,
      suggestedBy: groupMembers[0]?.name || 'You',
      suggestedAvatar: groupMembers[0]?.avatar
    });

    setNewTitle('');
    setNewLocation('');
    setNewNotes('');
    setIsAddModalOpen(false);
  };

  const days = [
    { day: 1, label: 'Day 1', title: 'Arrival & Villa Check-In' },
    { day: 2, label: 'Day 2', title: 'Ravello & Cliffside Dining' },
    { day: 3, label: 'Day 3', title: 'Capri Yacht Expedition' }
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-14">
      {/* Top Planner Header & Group Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 bg-surface-container-lowest rounded-2xl p-4 sm:p-6 border border-surface-container-high/40 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
              Collaborative Group Trip
            </span>
            <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${isOffline ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`} />
              {isOffline ? 'Offline Cache Active' : 'Live Sync Active (4 online)'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-on-surface">
            Amalfi Coast Grand Itinerary
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            7 Days · 5 Group Members · $8,400 Total Budget
          </p>
        </div>

        {/* Group Members & Quick Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Member Avatars */}
          <div
            onClick={() => setGroupModalOpen(true)}
            className="flex items-center -space-x-2 cursor-pointer bg-surface-container px-2.5 py-1.5 rounded-full hover:bg-surface-container-high transition-colors"
            title="Click to manage group members"
          >
            {groupMembers.map((m) => (
              <img
                key={m.id}
                src={m.avatar}
                alt={m.name}
                className="w-8 h-8 rounded-full border-2 border-surface object-cover"
                title={`${m.name} (${m.role})`}
              />
            ))}
            <div className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center border-2 border-surface">
              +1
            </div>
          </div>

          {/* Budget Quick Button */}
          <button
            onClick={() => setBudgetModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors"
          >
            <DollarSign className="w-4 h-4 text-secondary" />
            <span>Split Budget</span>
          </button>

          {/* Share Itinerary */}
          <button
            onClick={() => openShareModal({
              title: 'Amalfi Coast Grand Itinerary',
              subtitle: 'Collaborate and vote on stops with the travel crew.',
              url: window.location.href
            })}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors"
          >
            <Share2 className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline">Invite</span>
          </button>

          {/* Download Offline Guide */}
          <button
            onClick={() => {
              showToast('Itinerary, maps & tickets downloaded for 100% offline access', 'download_done');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors"
            title="Download for offline access"
          >
            <Download className="w-4 h-4 text-tertiary" />
            <span className="hidden sm:inline">Save Offline</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Itinerary Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Map Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="relative w-full h-80 sm:h-[420px] bg-slate-900 rounded-2xl overflow-hidden shadow-md border border-surface-container-high/40 select-none">
            {/* Map visual background with terrain contours & ocean aesthetic */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-85"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYq49R6P89Y0l79B352-u12WcZqJtYmG6i1wK3o3VnB7rN68x12Lkj-A1V0=w1200-h800')`
              }}
            />
            {/* Vector grid overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

            {/* Map Controls Header */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-semibold">
                <Layers className="w-3.5 h-3.5 text-primary" />
                <span>Amalfi Peninsula Waypoints</span>
              </div>

              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-xl text-white text-xs font-bold">
                <button
                  onClick={() => setFilterCategory('all')}
                  className={`px-2 py-0.5 rounded-md text-[11px] ${filterCategory === 'all' ? 'bg-primary text-white' : 'text-zinc-300'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterCategory('dining')}
                  className={`px-2 py-0.5 rounded-md text-[11px] ${filterCategory === 'dining' ? 'bg-primary text-white' : 'text-zinc-300'}`}
                >
                  Dining
                </button>
                <button
                  onClick={() => setFilterCategory('activity')}
                  className={`px-2 py-0.5 rounded-md text-[11px] ${filterCategory === 'activity' ? 'bg-primary text-white' : 'text-zinc-300'}`}
                >
                  Activities
                </button>
              </div>
            </div>

            {/* Simulated Interactive SVG Route Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4A6741" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#5E8352" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#87B078" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <path
                d="M 120 110 Q 230 180 340 140 T 520 280"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="3.5"
                strokeDasharray="6,4"
                className="animate-dash"
              />
            </svg>

            {/* Interactive Pins on Map */}
            {itineraryStops.map((stop, index) => {
              const isSelected = stop.id === selectedStopId;
              // Synthetic layout positions across the map
              const positions = [
                { top: '24%', left: '22%' },
                { top: '38%', left: '46%' },
                { top: '30%', left: '68%' },
                { top: '65%', left: '78%' },
                { top: '55%', left: '32%' },
              ];
              const pos = positions[index % positions.length];

              return (
                <div
                  key={stop.id}
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => setSelectedStopId(stop.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto transition-transform hover:scale-125 z-20 group"
                >
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg border-2 ${
                      isSelected
                        ? 'bg-primary text-white border-white scale-110 shadow-primary/40'
                        : 'bg-black/80 text-white border-primary/60 hover:bg-black'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center font-black">
                      {index + 1}
                    </span>
                    <span className="truncate max-w-[100px] text-[11px]">
                      {stop.location}
                    </span>
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex flex-col bg-surface-container-lowest text-on-surface p-2 rounded-xl shadow-xl border border-outline-variant/30 text-[11px] w-48 z-30 pointer-events-none">
                    <span className="font-bold text-primary">{stop.title}</span>
                    <span className="text-on-surface-variant text-[10px]">{stop.time} · ${stop.cost}</span>
                  </div>
                </div>
              );
            })}

            {/* Bottom active pin preview card */}
            {selectedStop && (
              <div className="absolute bottom-3 left-3 right-3 bg-surface-container-lowest/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-surface-container-high/60 flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-xs text-on-surface truncate">
                      {selectedStop.title}
                    </span>
                    <span className="text-[11px] text-on-surface-variant flex items-center gap-1">
                      <Clock className="w-3 h-3 text-secondary" />
                      {selectedStop.time} · {selectedStop.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-primary">
                    ${selectedStop.cost}
                  </span>
                  <button
                    onClick={() => {
                      showToast(`Navigating to ${selectedStop.location}...`, 'navigation');
                    }}
                    className="p-2 rounded-lg bg-primary text-white hover:bg-primary-container transition-colors"
                    title="Directions"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Route Summary Card */}
          <div className="grid grid-cols-3 gap-3 bg-surface-container-low rounded-2xl p-4 border border-surface-container-high/30 text-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-secondary">Distance</span>
              <p className="text-base font-extrabold text-on-surface">38.4 km</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-secondary">Driving Time</span>
              <p className="text-base font-extrabold text-on-surface">1h 45m</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-secondary">Waypoints</span>
              <p className="text-base font-extrabold text-on-surface">{itineraryStops.length} Spots</p>
            </div>
          </div>
        </div>

        {/* Right Column: Collaborative Itinerary Timeline (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Day Tabs */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {days.map((d) => (
                <button
                  key={d.day}
                  onClick={() => setSelectedDay(d.day)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedDay === d.day
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Propose Stop Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all active:scale-95 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Propose Stop</span>
            </button>
          </div>

          {/* Itinerary Timeline List */}
          <div className="flex flex-col gap-3 max-h-[580px] overflow-y-auto no-scrollbar pr-1">
            {currentStops.length === 0 ? (
              <div className="text-center py-10 bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-high/40">
                <Calendar className="w-8 h-8 text-outline mx-auto mb-2" />
                <p className="text-xs font-semibold text-on-surface">No stops planned for this day yet.</p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="mt-3 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold"
                >
                  Add First Stop
                </button>
              </div>
            ) : (
              currentStops.map((stop, idx) => {
                const isSelected = stop.id === selectedStopId;
                return (
                  <div
                    key={stop.id}
                    onClick={() => setSelectedStopId(stop.id)}
                    className={`bg-surface-container-lowest rounded-2xl p-4 border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary shadow-md ring-1 ring-primary/30'
                        : 'border-surface-container-high/40 hover:border-outline-variant/60 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-secondary flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {stop.time}
                          </span>
                          <h4 className="text-sm font-bold text-on-surface leading-tight mt-0.5">
                            {stop.title}
                          </h4>
                        </div>
                      </div>

                      <span className="text-xs font-extrabold text-primary">
                        ${stop.cost}
                      </span>
                    </div>

                    <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                      {stop.description}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-surface-container-high/40 flex items-center justify-between text-xs">
                      {/* Suggested by avatar */}
                      <div className="flex items-center gap-1.5 text-on-surface-variant">
                        {stop.suggestedAvatar ? (
                          <img
                            src={stop.suggestedAvatar}
                            alt={stop.suggestedBy}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                        ) : (
                          <Users className="w-4 h-4 text-secondary" />
                        )}
                        <span className="text-[11px] truncate max-w-[100px]">
                          {stop.suggestedBy}
                        </span>
                      </div>

                      {/* Collaborative Voting Controls */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            voteItineraryStop(stop.id, 'up');
                          }}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-colors ${
                            stop.votes.userVote === 'up'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-surface-container text-on-surface-variant hover:text-emerald-600'
                          }`}
                          title="Vote in favor"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{stop.votes.upvotes}</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            voteItineraryStop(stop.id, 'down');
                          }}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-colors ${
                            stop.votes.userVote === 'down'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                              : 'bg-surface-container text-on-surface-variant hover:text-rose-600'
                          }`}
                          title="Vote against"
                        >
                          <ThumbsDown className="w-3 h-3" />
                          <span>{stop.votes.downvotes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Propose Stop Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest rounded-2xl p-6 max-w-md w-full shadow-2xl border border-surface-container-high/40">
            <h3 className="text-lg font-bold text-on-surface mb-1">
              Propose Itinerary Activity
            </h3>
            <p className="text-xs text-on-surface-variant mb-4">
              All group members can immediately see and vote on your proposed stop.
            </p>

            <form onSubmit={handleAddStopSubmit} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="block text-on-surface font-semibold mb-1">Activity Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Sunset Aperitivo at Franco's Bar"
                  className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-on-surface font-semibold mb-1">Time</label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container-high focus:outline-none text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-on-surface font-semibold mb-1">Est. Cost ($)</label>
                  <input
                    type="number"
                    value={newCost}
                    onChange={(e) => setNewCost(Number(e.target.value))}
                    className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container-high focus:outline-none text-on-surface"
                  />
                </div>
              </div>

              <div>
                <label className="block text-on-surface font-semibold mb-1">Location / Address</label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Via San Cesareo, Sorrento"
                  className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container-high focus:outline-none text-on-surface"
                />
              </div>

              <div>
                <label className="block text-on-surface font-semibold mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ItineraryStop['category'])}
                  className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container-high focus:outline-none text-on-surface"
                >
                  <option value="activity">Activity / Tour</option>
                  <option value="dining">Dining & Drinks</option>
                  <option value="sightseeing">Sightseeing</option>
                  <option value="transit">Transit & Boat</option>
                </select>
              </div>

              <div>
                <label className="block text-on-surface font-semibold mb-1">Notes / Why go?</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. High cliff terrace with view of Faraglioni rocks. Dress code smart casual."
                  className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container-high focus:outline-none text-on-surface"
                />
              </div>

              <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-surface-container-high/40">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-on-surface-variant hover:text-on-surface font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary-container shadow-sm"
                >
                  Add to Group Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
