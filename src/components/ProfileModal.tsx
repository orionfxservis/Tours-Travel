import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  User,
  Camera,
  Moon,
  Sun,
  Globe,
  DollarSign,
  WifiOff,
  Check,
  Award
} from 'lucide-react';

export const ProfileModal: React.FC = () => {
  const {
    isProfileOpen,
    setProfileOpen,
    profile,
    updateProfile,
    isDarkMode,
    toggleDarkMode,
    language,
    setLanguage,
    currency,
    setCurrency,
    isOffline,
    offlineSyncQueue
  } = useApp();

  const [name, setName] = useState(profile.name);
  const [handle, setHandle] = useState(profile.handle);
  const [bio, setBio] = useState(profile.bio);
  const [homeBase, setHomeBase] = useState(profile.homeBase);

  if (!isProfileOpen) return null;

  const sampleAvatars = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBBuUxmMlmHAHD5x_73mvzrzD_8MYWdSiC4jublF-_VONj3GB1bDMTadICrVgnBvFInVg5kZerMEV_E6CXDnKTnrrLjZte6M1WbVblBexi_qorG8cWsmMjB0MZb8kkYtsOU0sQMrMABMQ3NuTx1t7VI5lN5q53jo06p0DKYeLgGhFLTrk_hLCUsZYH351OlvfXSYDVCKJnOzEjVALn72HHY5mh0y_xmdWkhkAvAho6kNXCSPFyP8pur_Q',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDFXW69HZZx3WbB88j_oN4yP5lF5x7H146B8wFv46z5x9=w400-h400',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCYq49R6P89Y0l79B352-u12WcZqJtYmG6i1wK3o3VnB7rN68x12Lkj-A1V0=w400-h400'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim(),
      handle: handle.trim(),
      bio: bio.trim(),
      homeBase: homeBase.trim()
    });
    setProfileOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full shadow-2xl border border-surface-container-high/40 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-surface-container-high/40 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-on-surface">
              Customizable Traveler Profile
            </h3>
          </div>
          <button
            onClick={() => setProfileOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSave} className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-5 text-xs">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-surface-container-low p-4 rounded-xl border border-surface-container-high/40">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/40 shadow-sm"
            />
            <div className="flex flex-col items-center sm:items-start flex-1">
              <span className="font-bold text-on-surface text-sm">{profile.name}</span>
              <span className="text-[11px] text-on-surface-variant">{profile.handle}</span>
              <span className="mt-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase">
                {profile.membershipTier}
              </span>

              {/* Avatar options */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] text-outline">Preset avatars:</span>
                {sampleAvatars.map((av, i) => (
                  <img
                    key={i}
                    src={av}
                    alt="preset"
                    onClick={() => updateProfile({ avatar: av })}
                    className="w-6 h-6 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Name & Handle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-on-surface font-semibold mb-1">Display Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container-high text-on-surface focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-on-surface font-semibold mb-1">Handle</label>
              <input
                type="text"
                required
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container-high text-on-surface focus:outline-none"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-on-surface font-semibold mb-1">Personalized Bio</label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container-high text-on-surface focus:outline-none"
            />
          </div>

          {/* Home Base */}
          <div>
            <label className="block text-on-surface font-semibold mb-1">Home Base / Origin City</label>
            <input
              type="text"
              value={homeBase}
              onChange={(e) => setHomeBase(e.target.value)}
              className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container-high text-on-surface focus:outline-none"
            />
          </div>

          {/* Traveler Preferences & Offline Queue Status */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high/40 flex flex-col gap-2.5">
            <span className="font-bold text-on-surface text-xs">Device & Offline Sync Status</span>
            <div className="flex justify-between items-center text-[11px] text-on-surface-variant">
              <span>Connection Status:</span>
              <span className={`font-bold ${isOffline ? 'text-amber-600' : 'text-emerald-600'}`}>
                {isOffline ? 'Offline Simulation (Local Mode)' : 'Online & Real-Time Sync'}
              </span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-on-surface-variant">
              <span>Queued Offline Edits:</span>
              <span className="font-bold text-on-surface">{offlineSyncQueue.length} Changes Pending</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container-high/40">
            <button
              type="button"
              onClick={() => setProfileOpen(false)}
              className="px-4 py-2 rounded-xl text-on-surface-variant hover:text-on-surface font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary-container shadow-sm"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
