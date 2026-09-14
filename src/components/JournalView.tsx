import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JournalArticle } from '../types';
import {
  BookOpen,
  Clock,
  Share2,
  Bookmark,
  Camera,
  Heart,
  Plus,
  Sparkles
} from 'lucide-react';

export const JournalView: React.FC = () => {
  const {
    articles,
    memories,
    likeMemory,
    setMemoriesModalOpen,
    openShareModal,
    showToast
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [savedArticles, setSavedArticles] = useState<string[]>(['art-1']);

  const categories = [
    { id: 'all', label: 'All Chronicles' },
    { id: 'Cultural Guide', label: 'Cultural Guides' },
    { id: 'Expeditions', label: 'Expeditions' },
    { id: 'Culinary', label: 'Culinary & Wine' },
    { id: 'Wildlife', label: 'Wildlife & Nature' }
  ];

  const filteredArticles = articles.filter(
    (a) => activeCategory === 'all' || a.category === activeCategory
  );

  const toggleSaveArticle = (id: string) => {
    setSavedArticles((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? 'Article removed from reading list' : 'Saved to Reading List', 'bookmark');
      return next;
    });
  };

  const heroArticle = articles[0];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-14">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
        <div>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            Voyager Dispatch
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            Travel Journal & Insights
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMemoriesModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary-container transition-all"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Collaborative Photo Album</span>
          </button>
        </div>
      </div>

      {/* Featured Lead Story Hero */}
      {heroArticle && (
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-surface-container-high/40 mb-8 group">
          <div
            className="h-72 sm:h-96 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${heroArticle.imageUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider">
              Featured Dispatch
            </span>
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => openShareModal({
                title: heroArticle.title,
                subtitle: heroArticle.excerpt,
                url: window.location.href,
                image: heroArticle.imageUrl
              })}
              className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleSaveArticle(heroArticle.id)}
              className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
                savedArticles.includes(heroArticle.id)
                  ? 'bg-primary text-white'
                  : 'bg-black/50 text-white hover:bg-black/80'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${savedArticles.includes(heroArticle.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary-fixed mb-1.5">
              <span>{heroArticle.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {heroArticle.readTime}
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black leading-tight drop-shadow-sm mb-2">
              {heroArticle.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-200 line-clamp-2 leading-relaxed mb-3">
              {heroArticle.excerpt}
            </p>

            <div className="flex items-center gap-3 pt-2 border-t border-white/20">
              <img
                src={heroArticle.authorAvatar}
                alt={heroArticle.author}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white/30"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold">{heroArticle.author}</span>
                <span className="text-[10px] text-zinc-300">{heroArticle.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === c.id
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredArticles.map((art: JournalArticle) => {
          const isSaved = savedArticles.includes(art.id);
          return (
            <article
              key={art.id}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-surface-container-high/40 flex flex-col justify-between group hover:shadow-md transition-all"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                    {art.category}
                  </div>
                  <button
                    onClick={() => toggleSaveArticle(art.id)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
                      isSaved
                        ? 'bg-primary text-white'
                        : 'bg-black/50 text-white hover:bg-black/80'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-[11px] text-secondary font-semibold mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime}</span>
                    <span>•</span>
                    <span>{art.date}</span>
                  </div>

                  <h4 className="font-bold text-base text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </h4>

                  <p className="text-xs text-on-surface-variant mt-2 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0 flex items-center justify-between border-t border-surface-container-high/30 mt-2">
                <div className="flex items-center gap-2">
                  <img
                    src={art.authorAvatar}
                    alt={art.author}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-on-surface">
                    {art.author}
                  </span>
                </div>
                <button
                  onClick={() => openShareModal({
                    title: art.title,
                    subtitle: art.excerpt,
                    url: window.location.href,
                    image: art.imageUrl
                  })}
                  className="text-secondary hover:text-primary transition-colors p-1"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Collaborative Memories Photo Strip */}
      <section className="bg-surface-container rounded-2xl p-5 sm:p-6 border border-surface-container-high/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold flex items-center gap-1">
              <Camera className="w-3.5 h-3.5" />
              Collaborative Memories
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-on-surface">
              Shared Expedition Moments
            </h3>
          </div>
          <button
            onClick={() => setMemoriesModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container-highest hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-primary" />
            <span>Add Memory</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {memories.slice(0, 4).map((m) => (
            <div
              key={m.id}
              className="relative aspect-square rounded-xl overflow-hidden group shadow-sm"
            >
              <img
                src={m.imageUrl || m.url}
                alt={m.caption}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-xs">
                <span className="truncate text-[11px] font-medium max-w-[70%]">
                  {m.caption}
                </span>
                <button
                  onClick={() => likeMemory(m.id)}
                  className="flex items-center gap-1 text-[11px] font-bold"
                >
                  <Heart className={`w-3.5 h-3.5 ${m.userLiked ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                  <span>{m.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
