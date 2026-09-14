/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { ExploreView } from './components/ExploreView';
import { PackagesView } from './components/PackagesView';
import { DestinationsView } from './components/DestinationsView';
import { MapPlannerView } from './components/MapPlannerView';
import { JournalView } from './components/JournalView';
import { LegalView } from './components/LegalView';
import { BookingPaymentModal } from './components/BookingPaymentModal';
import { BudgetModal } from './components/BudgetModal';
import { GroupSyncModal } from './components/GroupSyncModal';
import { MemoriesModal } from './components/MemoriesModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { ProfileModal } from './components/ProfileModal';
import { ShareModal } from './components/ShareModal';
import { Toast } from './components/Toast';

const MainContent: React.FC = () => {
  const { currentTab } = useApp();

  const renderTab = () => {
    switch (currentTab) {
      case 'explore':
        return <ExploreView />;
      case 'packages':
        return <PackagesView />;
      case 'destinations':
        return <DestinationsView />;
      case 'map':
        return <MapPlannerView />;
      case 'journal':
        return <JournalView />;
      case 'legal':
        return <LegalView />;
      default:
        return <ExploreView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface transition-colors duration-300">
      {/* Fixed Header */}
      <Header />

      {/* Main App Container */}
      <main className="flex-1 pt-20 w-full">
        {renderTab()}
      </main>

      {/* Comprehensive App Footer */}
      <Footer />

      {/* Persistent Bottom Nav for Mobile */}
      <BottomNav />

      {/* Global Modals and Drawers */}
      <BookingPaymentModal />
      <BudgetModal />
      <GroupSyncModal />
      <MemoriesModal />
      <NotificationDrawer />
      <ProfileModal />
      <ShareModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
