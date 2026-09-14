import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowUp,
  Headset,
  X,
  Send,
  Sparkles,
  PhoneCall,
  Clock,
  CheckCircle2,
  HelpCircle,
  Compass
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'concierge' | 'user';
  text: string;
  time: string;
  options?: { label: string; action: string }[];
}

export const FloatingActions: React.FC = () => {
  const { setCurrentTab, showToast, formatPrice } = useApp();
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);
  const [userQuery, setUserQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'concierge',
      text: 'Hello and welcome to Voyager Concierge Support! Our live team is on standby 24/7. How can we assist with your journey, seasonal tours, or custom itinerary today?',
      time: 'Just now',
      options: [
        { label: '❄️ Dubai Winter Tours', action: 'dubai' },
        { label: '🗺️ Build Custom Itinerary', action: 'itinerary' },
        { label: '💳 Payment & Booking Help', action: 'booking' },
        { label: '📞 Speak with Senior Agent', action: 'call' }
      ]
    }
  ]);

  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Monitor scroll position to show Back to Top button only when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto scroll chat to bottom when messages change
  useEffect(() => {
    if (isSupportOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isSupportOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || userQuery).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setUserQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      let followUpOptions: { label: string; action: string }[] | undefined;

      const q = query.toLowerCase();

      if (q.includes('dubai') || q.includes('winter') || q.includes('safari') || q.includes('desert')) {
        botResponse =
          'Dubai’s premier season is right now in Winter (November to March) with 24°C balmy weather! We feature 5 exclusive winter tours: Red Dune Desert Safaris with Bedouin dining, Burj Khalifa Level 148 Sky Lounge, Palm Jumeirah Sunset Yacht Charters, and Hatta Mountain Kayaking. Would you like to view our Dubai Winter tours or add them to your planner?';
        followUpOptions = [
          { label: '✨ View Dubai Winter Tours', action: 'view_dubai' },
          { label: '📅 Open Trip Planner', action: 'itinerary' }
        ];
      } else if (q.includes('price') || q.includes('cost') || q.includes('budget') || q.includes('pay') || q.includes('booking')) {
        botResponse =
          'All our package bookings include verified luxury stays, private chauffeur transfers, and guided activities with zero surprise fees. You can customize guest counts and pay securely via card, Apple Pay, or wire transfer in your chosen currency.';
        followUpOptions = [
          { label: '💳 Explore Packages', action: 'packages' },
          { label: '📞 Call Concierge Desk', action: 'call' }
        ];
      } else if (q.includes('itinerary') || q.includes('map') || q.includes('plan')) {
        botResponse =
          'You can use our interactive Map & Planner tab to customize day-by-day stops, budget your accommodations, and add curated experiences seamlessly!';
        followUpOptions = [
          { label: '🗺️ Go to Map Planner', action: 'itinerary' }
        ];
      } else if (q.includes('call') || q.includes('agent') || q.includes('human') || q.includes('phone') || q.includes('contact')) {
        botResponse =
          'Our senior luxury travel specialist Arthur Vance-Moreau is available on WhatsApp or direct hotline: +1 (800) 869-2437 (VOYAGER). A priority support ticket #VYG-' + Math.floor(1000 + Math.random() * 9000) + ' has been opened for your session.';
      } else {
        botResponse =
          'Thank you for contacting Voyager! Our concierge team is happy to customize your expedition. You can browse our hand-crafted destinations, explore winter seasonal experiences, or connect directly with a dedicated travel specialist.';
        followUpOptions = [
          { label: '❄️ Dubai Winter Tours', action: 'dubai' },
          { label: '🗺️ Map & Trip Planner', action: 'itinerary' }
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'concierge',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: followUpOptions
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleOptionClick = (action: string, label: string) => {
    if (action === 'dubai' || action === 'view_dubai') {
      setCurrentTab('destinations');
      showToast('Navigated to Destinations catalog with Dubai Winter Tours!', 'info');
      handleSendMessage(label);
    } else if (action === 'itinerary') {
      setCurrentTab('map');
      showToast('Opened your interactive Map & Itinerary Planner!', 'info');
      handleSendMessage(label);
    } else if (action === 'packages') {
      setCurrentTab('packages');
      showToast('Navigated to Curated Packages!', 'info');
      handleSendMessage(label);
    } else if (action === 'booking') {
      handleSendMessage('How does booking and payment work on Voyager?');
    } else if (action === 'call') {
      handleSendMessage('I would like to speak with a senior travel concierge specialist.');
      showToast('Connecting you to Arthur Vance-Moreau (+1 800-VOYAGER)...', 'info');
    }
  };

  return (
    <>
      {/* Floating Action Container - Placed at bottom-right, floating safely above mobile nav on small screens */}
      <div
        id="floating-actions-container"
        className="fixed bottom-20 md:bottom-6 right-3 sm:right-6 z-40 flex items-center gap-2 sm:gap-2.5 print:hidden select-none"
      >
        {/* Floating Back to Top Button (Placed before Online Support) */}
        {showBackToTop && (
          <button
            id="floating-back-to-top"
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 px-3 py-2.5 sm:px-3.5 sm:py-2.5 rounded-full bg-surface-container-lowest/95 dark:bg-surface-container/95 backdrop-blur-md text-on-surface border border-surface-container-high/70 shadow-lg hover:shadow-xl hover:bg-surface-container transition-all duration-200 cursor-pointer active:scale-95 group animate-in fade-in zoom-in-95 duration-200"
            title="Back to top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-primary transition-transform duration-200 group-hover:-translate-y-0.5" />
            <span className="hidden sm:inline text-xs font-bold text-on-surface whitespace-nowrap">
              Back to Top
            </span>
          </button>
        )}

        {/* Floating Online Support Button */}
        <button
          id="floating-online-support"
          onClick={() => setIsSupportOpen((prev) => !prev)}
          type="button"
          className={`relative flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer active:scale-95 group ${
            isSupportOpen
              ? 'bg-secondary text-white ring-2 ring-secondary/40'
              : 'bg-primary text-white hover:bg-primary-container'
          }`}
          title="Online Support"
          aria-label="Online Support"
        >
          <div className="relative flex items-center justify-center">
            <Headset className="w-4 h-4" />
            {/* Live pulsing green online indicator */}
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white dark:border-zinc-900"></span>
            </span>
          </div>
          <span className="text-xs font-bold whitespace-nowrap">
            Online Support
          </span>
        </button>
      </div>

      {/* Floating Online Support Chat Drawer / Card */}
      {isSupportOpen && (
        <div
          id="online-support-modal"
          className="fixed bottom-36 md:bottom-20 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[380px] max-h-[520px] bg-surface-container-lowest rounded-3xl shadow-2xl border border-surface-container-high/80 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {/* Support Header */}
          <div className="bg-gradient-to-r from-primary via-primary-container to-secondary p-4 text-white flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                <Headset className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-primary" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-black tracking-tight">
                    Voyager Concierge
                  </h4>
                  <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-1.5 py-0.2 rounded-full">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-white/80 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-white/70" />
                  24/7 Live Assistance · &lt; 1 min reply
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSupportOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              title="Close support window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Support Badge Bar */}
          <div className="bg-surface-container px-4 py-2 border-b border-surface-container-high/50 flex items-center justify-between text-[11px] text-on-surface-variant">
            <span className="flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Verified Travel Specialists
            </span>
            <button
              onClick={() => handleOptionClick('call', 'Call Senior Concierge Agent')}
              className="text-primary font-bold hover:underline flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              +1 (800) VOYAGER
            </button>
          </div>

          {/* Messages Area */}
          <div className="p-3.5 overflow-y-auto flex-1 flex flex-col gap-3 max-h-[300px] bg-surface/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-br-none shadow-sm'
                      : 'bg-surface-container-low border border-surface-container-high/60 text-on-surface rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Optional quick response buttons */}
                  {msg.options && (
                    <div className="mt-2.5 flex flex-col gap-1.5 pt-1.5 border-t border-surface-container-high/40">
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                        Suggested Inquiries:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {msg.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleOptionClick(opt.action, opt.label)}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-surface-container text-primary font-bold hover:bg-primary hover:text-white transition-all text-left border border-surface-container-high/60"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-on-surface-variant px-1 mt-0.5">
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-on-surface-variant bg-surface-container-low p-2 rounded-xl w-fit">
                <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span>Concierge is typing...</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Chat Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-surface-container-lowest border-t border-surface-container-high/60 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Ask anything (e.g. Dubai winter tours, visa, packages)..."
              className="flex-1 bg-surface-container px-3.5 py-2 rounded-xl text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={!userQuery.trim()}
              className="p-2 rounded-xl bg-primary text-white hover:bg-primary-container disabled:opacity-40 disabled:hover:bg-primary transition-all cursor-pointer shrink-0"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
