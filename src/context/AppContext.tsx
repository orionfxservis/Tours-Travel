import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  TabType,
  LanguageCode,
  CurrencyCode,
  CurrencyInfo,
  UserProfile,
  TravelPackage,
  Destination,
  JournalArticle,
  ItineraryStop,
  GroupMember,
  ExpenseItem,
  PackingItem,
  MemoryPhoto,
  NotificationItem,
  BookingConfirmation
} from '../types';
import {
  DEFAULT_USER_PROFILE,
  MOCK_PACKAGES,
  MOCK_DESTINATIONS,
  MOCK_ARTICLES,
  INITIAL_GROUP_MEMBERS,
  INITIAL_ITINERARY_STOPS,
  INITIAL_EXPENSES,
  INITIAL_PACKING_ITEMS,
  INITIAL_MEMORIES,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';
import { translations } from '../i18n/translations';

interface ToastState {
  message: string;
  icon: string;
  visible: boolean;
}

interface ShareData {
  title: string;
  subtitle: string;
  url: string;
  image?: string;
}

export const CURRENCY_MAP: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 155.0 },
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 3.67 },
  CAD: { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', rate: 1.36 },
  AUD: { code: 'AUD', symbol: 'AU$', name: 'Australian Dollar', rate: 1.52 },
  CHF: { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', rate: 0.90 },
  PKR: { code: 'PKR', symbol: 'PKR ', name: 'Pakistani Rupee', rate: 278.0 }
};

interface AppContextType {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isOffline: boolean;
  toggleOfflineSimulation: () => void;
  offlineSyncQueue: string[];
  
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  
  packages: TravelPackage[];
  destinations: Destination[];
  articles: JournalArticle[];
  
  wishlist: string[];
  toggleWishlist: (packageId: string) => void;
  
  selectedPackageForBooking: TravelPackage | null;
  openBookingModal: (pkg: TravelPackage) => void;
  closeBookingModal: () => void;
  
  activeBooking: BookingConfirmation | null;
  setActiveBooking: (booking: BookingConfirmation | null) => void;
  
  itineraryStops: ItineraryStop[];
  addItineraryStop: (stop: Omit<ItineraryStop, 'id' | 'votes'>) => void;
  voteItineraryStop: (stopId: string, type: 'up' | 'down') => void;
  
  groupMembers: GroupMember[];
  expenses: ExpenseItem[];
  addExpense: (expense: Omit<ExpenseItem, 'id'>) => void;
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountInUSD: number) => string;
  getCurrencySymbol: () => string;
  
  packingList: PackingItem[];
  togglePackingItem: (id: string) => void;
  addPackingItem: (text: string, category: PackingItem['category'], assignedTo: string) => void;
  
  memories: MemoryPhoto[];
  addMemory: (photo: Omit<MemoryPhoto, 'id' | 'likes' | 'timestamp'>) => void;
  likeMemory: (id: string) => void;
  
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationCount: number;
  
  isNotificationOpen: boolean;
  setNotificationOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setProfileOpen: (open: boolean) => void;
  isShareModalOpen: boolean;
  setShareModalOpen: (open: boolean) => void;
  shareData: ShareData | null;
  openShareModal: (data: ShareData) => void;
  
  isBudgetModalOpen: boolean;
  setBudgetModalOpen: (open: boolean) => void;
  isGroupModalOpen: boolean;
  setGroupModalOpen: (open: boolean) => void;
  isMemoriesModalOpen: boolean;
  setMemoriesModalOpen: (open: boolean) => void;
  
  toast: ToastState;
  showToast: (message: string, icon?: string) => void;
  hideToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const SYNC_CHANNEL_NAME = 'voyager_realtime_sync';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Tab state
  const [currentTab, setCurrentTab] = useState<TabType>('explore');
  
  // Language
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('voyager_lang');
      return (saved as LanguageCode) || 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('voyager_lang', lang);
    } catch {}
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language]);

  const t = useCallback((key: string): string => {
    return translations[language]?.[key] || translations.en?.[key] || key;
  }, [language]);

  // Dark Mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('voyager_dark_mode') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    try {
      localStorage.setItem('voyager_dark_mode', String(isDarkMode));
    } catch {}
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Offline detection & simulation
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [offlineSyncQueue, setOfflineSyncQueue] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('voyager_offline_queue');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState<ToastState>({
    message: '',
    icon: 'check_circle',
    visible: false
  });

  const showToast = useCallback((message: string, icon: string = 'check_circle') => {
    setToast({ message, icon, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3200);
  }, []);

  const hideToast = () => setToast(prev => ({ ...prev, visible: false }));

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      if (offlineSyncQueue.length > 0) {
        showToast(`Reconnected! Synchronized ${offlineSyncQueue.length} offline updates.`, 'cloud_sync');
        setOfflineSyncQueue([]);
        localStorage.removeItem('voyager_offline_queue');
      } else {
        showToast('Back online. Connected to Voyager Cloud Sync.', 'cloud_done');
      }
    };

    const handleOffline = () => {
      setIsOffline(true);
      showToast('Offline Mode active. Local changes will queue.', 'cloud_off');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [offlineSyncQueue, showToast]);

  const toggleOfflineSimulation = () => {
    setIsOffline(prev => {
      const next = !prev;
      if (next) {
        showToast('Simulated Offline Mode Enabled.', 'cloud_off');
      } else {
        if (offlineSyncQueue.length > 0) {
          showToast(`Reconnected! Synced ${offlineSyncQueue.length} queued edits.`, 'cloud_sync');
          setOfflineSyncQueue([]);
          localStorage.removeItem('voyager_offline_queue');
        } else {
          showToast('Back online with live group synchronization.', 'cloud_done');
        }
      }
      return next;
    });
  };

  // BroadcastChannel for Real-Time Sync across tabs
  const broadcastSync = useCallback((actionType: string, payload: unknown) => {
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
        channel.postMessage({ type: actionType, payload, timestamp: Date.now() });
        channel.close();
      } catch (e) {
        console.warn('BroadcastChannel sync error:', e);
      }
    }
  }, []);

  // User Profile
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('voyager_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  });

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('voyager_user_profile', JSON.stringify(next));
      return next;
    });
    showToast('Profile preferences updated.', 'badge');
  };

  // Static items (with local overrides)
  const [packages] = useState<TravelPackage[]>(MOCK_PACKAGES);
  const [destinations] = useState<Destination[]>(MOCK_DESTINATIONS);
  const [articles] = useState<JournalArticle[]>(MOCK_ARTICLES);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('voyager_wishlist');
      return saved ? JSON.parse(saved) : ['amalfi-dream', 'dest-iceland'];
    } catch {
      return ['amalfi-dream'];
    }
  });

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('voyager_wishlist', JSON.stringify(next));
      showToast(exists ? 'Removed from saved wishlist' : 'Saved to your Wishlist', exists ? 'bookmark_border' : 'bookmark');
      return next;
    });
  };

  // Modals & Booking
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState<TravelPackage | null>(null);
  const [activeBooking, setActiveBooking] = useState<BookingConfirmation | null>(() => {
    try {
      const saved = localStorage.getItem('voyager_last_booking');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const openBookingModal = (pkg: TravelPackage) => setSelectedPackageForBooking(pkg);
  const closeBookingModal = () => setSelectedPackageForBooking(null);

  // Itinerary Stops
  const [itineraryStops, setItineraryStops] = useState<ItineraryStop[]>(() => {
    try {
      const saved = localStorage.getItem('voyager_itinerary');
      return saved ? JSON.parse(saved) : INITIAL_ITINERARY_STOPS;
    } catch {
      return INITIAL_ITINERARY_STOPS;
    }
  });

  const addItineraryStop = (stopData: Omit<ItineraryStop, 'id' | 'votes'>) => {
    const newStop: ItineraryStop = {
      ...stopData,
      id: `stop-${Date.now()}`,
      votes: { upvotes: 1, downvotes: 0, userVote: 'up' }
    };
    setItineraryStops(prev => {
      const next = [...prev, newStop];
      localStorage.setItem('voyager_itinerary', JSON.stringify(next));
      return next;
    });
    broadcastSync('ADD_STOP', newStop);
    showToast(`Added "${newStop.title}" to itinerary`, 'event_available');
    
    if (isOffline) {
      setOfflineSyncQueue(q => {
        const nextQ = [...q, `Add stop: ${newStop.title}`];
        localStorage.setItem('voyager_offline_queue', JSON.stringify(nextQ));
        return nextQ;
      });
    }
  };

  const voteItineraryStop = (stopId: string, type: 'up' | 'down') => {
    setItineraryStops(prev => {
      const next = prev.map(stop => {
        if (stop.id !== stopId) return stop;
        const currentVote = stop.votes.userVote;
        let up = stop.votes.upvotes;
        let down = stop.votes.downvotes;

        if (currentVote === type) {
          // undo vote
          if (type === 'up') up = Math.max(0, up - 1);
          if (type === 'down') down = Math.max(0, down - 1);
          return { ...stop, votes: { upvotes: up, downvotes: down, userVote: undefined } };
        } else {
          if (currentVote === 'up') up = Math.max(0, up - 1);
          if (currentVote === 'down') down = Math.max(0, down - 1);
          if (type === 'up') up += 1;
          if (type === 'down') down += 1;
          return { ...stop, votes: { upvotes: up, downvotes: down, userVote: type } };
        }
      });
      localStorage.setItem('voyager_itinerary', JSON.stringify(next));
      return next;
    });
    broadcastSync('VOTE_STOP', { stopId, type });
  };

  // Group Members
  const [groupMembers] = useState<GroupMember[]>(INITIAL_GROUP_MEMBERS);

  // Expenses & Budget
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    try {
      const saved = localStorage.getItem('voyager_expenses');
      return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
    } catch {
      return INITIAL_EXPENSES;
    }
  });

  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem('voyager_currency') as CurrencyCode;
      return (saved && CURRENCY_MAP[saved]) ? saved : 'USD';
    } catch {
      return 'USD';
    }
  });

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('voyager_currency', c);
    } catch {}
  };

  const formatPrice = useCallback((amountInUSD: number): string => {
    const info = CURRENCY_MAP[currency] || CURRENCY_MAP.USD;
    const converted = Math.round(amountInUSD * info.rate);
    return `${info.symbol}${converted.toLocaleString()}`;
  }, [currency]);

  const getCurrencySymbol = useCallback((): string => {
    return CURRENCY_MAP[currency]?.symbol || '$';
  }, [currency]);

  const addExpense = (expenseData: Omit<ExpenseItem, 'id'>) => {
    const newExp: ExpenseItem = {
      ...expenseData,
      id: `exp-${Date.now()}`
    };
    setExpenses(prev => {
      const next = [newExp, ...prev];
      localStorage.setItem('voyager_expenses', JSON.stringify(next));
      return next;
    });
    broadcastSync('ADD_EXPENSE', newExp);
    showToast(`Logged $${newExp.amount} for ${newExp.title}`, 'receipt_long');
  };

  // Packing List
  const [packingList, setPackingList] = useState<PackingItem[]>(() => {
    try {
      const saved = localStorage.getItem('voyager_packing');
      return saved ? JSON.parse(saved) : INITIAL_PACKING_ITEMS;
    } catch {
      return INITIAL_PACKING_ITEMS;
    }
  });

  const togglePackingItem = (id: string) => {
    setPackingList(prev => {
      const next = prev.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item);
      localStorage.setItem('voyager_packing', JSON.stringify(next));
      return next;
    });
  };

  const addPackingItem = (text: string, category: PackingItem['category'], assignedTo: string) => {
    const newItem: PackingItem = {
      id: `pack-${Date.now()}`,
      text,
      category,
      assignedTo,
      isCompleted: false
    };
    setPackingList(prev => {
      const next = [...prev, newItem];
      localStorage.setItem('voyager_packing', JSON.stringify(next));
      return next;
    });
    showToast(`Added to packing checklist`, 'checklist');
  };

  // Memories Photos
  const [memories, setMemories] = useState<MemoryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem('voyager_memories');
      return saved ? JSON.parse(saved) : INITIAL_MEMORIES;
    } catch {
      return INITIAL_MEMORIES;
    }
  });

  const addMemory = (photoData: Omit<MemoryPhoto, 'id' | 'likes' | 'timestamp'>) => {
    const newMemory: MemoryPhoto = {
      ...photoData,
      id: `mem-${Date.now()}`,
      likes: 1,
      userLiked: true,
      timestamp: 'Just now'
    };
    setMemories(prev => {
      const next = [newMemory, ...prev];
      localStorage.setItem('voyager_memories', JSON.stringify(next));
      return next;
    });
    broadcastSync('ADD_MEMORY', newMemory);
    showToast('Photo uploaded to collaborative album', 'add_photo_alternate');
  };

  const likeMemory = (id: string) => {
    setMemories(prev => {
      const next = prev.map(m => {
        if (m.id !== id) return m;
        const liked = !m.userLiked;
        return {
          ...m,
          likes: liked ? m.likes + 1 : Math.max(0, m.likes - 1),
          userLiked: liked
        };
      });
      localStorage.setItem('voyager_memories', JSON.stringify(next));
      return next;
    });
  };

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('voyager_notifs');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => {
      const next = prev.map(n => n.id === id ? { ...n, isRead: true } : n);
      localStorage.setItem('voyager_notifs', JSON.stringify(next));
      return next;
    });
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => {
      const next = prev.map(n => ({ ...n, isRead: true }));
      localStorage.setItem('voyager_notifs', JSON.stringify(next));
      return next;
    });
    showToast('All notifications marked as read', 'done_all');
  };

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  // Modals visibility
  const [isNotificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [isProfileOpen, setProfileOpen] = useState<boolean>(false);
  const [isShareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [shareData, setShareData] = useState<ShareData | null>(null);

  const openShareModal = (data: ShareData) => {
    setShareData(data);
    setShareModalOpen(true);
  };

  const [isBudgetModalOpen, setBudgetModalOpen] = useState<boolean>(false);
  const [isGroupModalOpen, setGroupModalOpen] = useState<boolean>(false);
  const [isMemoriesModalOpen, setMemoriesModalOpen] = useState<boolean>(false);

  // BroadcastChannel listener for multi-tab live sync
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return;
    const channel = new BroadcastChannel(SYNC_CHANNEL_NAME);

    channel.onmessage = (event) => {
      const data = event.data;
      if (!data) return;

      if (data.type === 'ADD_STOP') {
        setItineraryStops(prev => [...prev, data.payload]);
        showToast(`Sync: New activity proposed by group member`, 'sync');
      } else if (data.type === 'VOTE_STOP') {
        const { stopId, type } = data.payload;
        setItineraryStops(prev => prev.map(stop => {
          if (stop.id !== stopId) return stop;
          return {
            ...stop,
            votes: {
              ...stop.votes,
              upvotes: type === 'up' ? stop.votes.upvotes + 1 : stop.votes.upvotes,
              downvotes: type === 'down' ? stop.votes.downvotes + 1 : stop.votes.downvotes
            }
          };
        }));
      } else if (data.type === 'ADD_EXPENSE') {
        setExpenses(prev => [data.payload, ...prev]);
        showToast(`Sync: Group expense added: ${data.payload.title}`, 'receipt');
      } else if (data.type === 'ADD_MEMORY') {
        setMemories(prev => [data.payload, ...prev]);
        showToast(`Sync: New photo shared by group member`, 'photo_camera');
      }
    };

    return () => channel.close();
  }, [showToast]);

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        language,
        setLanguage,
        t,
        isDarkMode,
        toggleDarkMode,
        isOffline,
        toggleOfflineSimulation,
        offlineSyncQueue,
        profile,
        updateProfile,
        packages,
        destinations,
        articles,
        wishlist,
        toggleWishlist,
        selectedPackageForBooking,
        openBookingModal,
        closeBookingModal,
        activeBooking,
        setActiveBooking,
        itineraryStops,
        addItineraryStop,
        voteItineraryStop,
        groupMembers,
        expenses,
        addExpense,
        currency,
        setCurrency,
        formatPrice,
        getCurrencySymbol,
        packingList,
        togglePackingItem,
        addPackingItem,
        memories,
        addMemory,
        likeMemory,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationCount,
        isNotificationOpen,
        setNotificationOpen,
        isProfileOpen,
        setProfileOpen,
        isShareModalOpen,
        setShareModalOpen,
        shareData,
        openShareModal,
        isBudgetModalOpen,
        setBudgetModalOpen,
        isGroupModalOpen,
        setGroupModalOpen,
        isMemoriesModalOpen,
        setMemoriesModalOpen,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
