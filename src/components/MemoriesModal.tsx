import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Camera,
  Heart,
  Upload,
  Plus,
  MapPin,
  Sparkles
} from 'lucide-react';

export const MemoriesModal: React.FC = () => {
  const {
    isMemoriesModalOpen,
    setMemoriesModalOpen,
    memories,
    addMemory,
    likeMemory,
    groupMembers,
    showToast
  } = useApp();

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('Amalfi Coast');
  const [uploadedBy, setUploadedBy] = useState(groupMembers[0]?.name || 'Elena Vance');

  if (!isMemoriesModalOpen) return null;

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) {
      showToast('Please add a caption for your photo memory', 'error');
      return;
    }

    const finalImage = imageUrl.trim() || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFXW69HZZx3WbB88j_oN4yP5lF5x7H146B8wFv46z5x9=w800-h600';
    addMemory({
      imageUrl: finalImage,
      caption: caption.trim(),
      location: location.trim(),
      uploadedBy,
      uploaderAvatar: groupMembers.find(m => m.name === uploadedBy)?.avatar
    });

    setCaption('');
    setImageUrl('');
    setShowUploadForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-surface-container-lowest rounded-2xl max-w-3xl w-full shadow-2xl border border-surface-container-high/40 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-surface-container-high/40 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-tertiary/15 text-tertiary flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface leading-tight">
                Collaborative Memories Gallery
              </h3>
              <span className="text-[11px] text-on-surface-variant">
                Shared captures & snapshots from group travelers
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Memory</span>
            </button>
            <button
              onClick={() => setMemoriesModalOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Upload Form Accordion */}
        {showUploadForm && (
          <div className="p-4 bg-surface-container-low border-b border-surface-container-high/40 animate-fade-in">
            <form onSubmit={handleUploadSubmit} className="flex flex-col gap-3 text-xs">
              <h4 className="font-bold text-on-surface flex items-center gap-1">
                <Upload className="w-3.5 h-3.5 text-primary" />
                Upload Photo to Collaborative Album
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-on-surface font-semibold mb-1">Image URL (or leave blank for demo photo)</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://... (optional)"
                    className="w-full bg-surface-container px-3 py-2 rounded-xl border border-surface-container-high text-on-surface focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-on-surface font-semibold mb-1">Location Tag</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Capri Faraglioni rocks"
                    className="w-full bg-surface-container px-3 py-2 rounded-xl border border-surface-container-high text-on-surface focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-on-surface font-semibold mb-1">Caption / Story</label>
                  <input
                    type="text"
                    required
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="e.g. Swimming into the emerald sea cave at noon"
                    className="w-full bg-surface-container px-3 py-2 rounded-xl border border-surface-container-high text-on-surface focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-on-surface font-semibold mb-1">Photographer</label>
                  <select
                    value={uploadedBy}
                    onChange={(e) => setUploadedBy(e.target.value)}
                    className="w-full bg-surface-container px-3 py-2 rounded-xl border border-surface-container-high text-on-surface focus:outline-none"
                  >
                    {groupMembers.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="px-3 py-1.5 rounded-lg text-on-surface-variant font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-container"
                >
                  Post Memory
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {memories.map((photo) => (
              <div
                key={photo.id}
                className="bg-surface-container-low rounded-2xl overflow-hidden border border-surface-container-high/40 shadow-sm flex flex-col justify-between group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.imageUrl || photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-primary" />
                    {photo.location}
                  </span>

                  <button
                    onClick={() => likeMemory(photo.id)}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        photo.userLiked ? 'fill-rose-500 text-rose-500' : 'text-white'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-3 flex flex-col gap-1.5">
                  <p className="text-xs font-semibold text-on-surface leading-snug">
                    {photo.caption}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-surface-container-high/30 text-[11px] text-on-surface-variant">
                    <div className="flex items-center gap-1.5">
                      {photo.uploaderAvatar && (
                        <img
                          src={photo.uploaderAvatar}
                          alt={photo.uploadedBy}
                          className="w-4 h-4 rounded-full object-cover"
                        />
                      )}
                      <span>{photo.uploadedBy}</span>
                    </div>

                    <span className="flex items-center gap-1 font-bold text-rose-500">
                      <Heart className="w-3 h-3 fill-current" />
                      {photo.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
