'use client';

import React from 'react';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { Navbar } from '../components/Navbar';
import { HeroBanner } from '../components/HeroBanner';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductGrid } from '../components/ProductGrid';
import { TrustSignals } from '../components/TrustSignals';
import { CartDrawer } from '../components/CartDrawer';
import { ProductQuickView } from '../components/ProductQuickView';
import { AuthModal } from '../components/AuthModal';
import { BottomNav } from '../components/BottomNav';
import { Toast } from '../components/Toast';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0 max-w-full overflow-x-hidden">
      {/* Announcement Top Bar */}
      <AnnouncementBar />

      {/* Main Header / Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 max-w-full overflow-x-hidden">
        {/* Promotional Hero Section */}
        <HeroBanner />

        {/* Store Container */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8">
          {/* Filtering Bar */}
          <CategoryFilter />

          {/* Products Grid Showcase */}
          <ProductGrid />
        </div>

        {/* Trust Signals Section */}
        <TrustSignals />
      </main>

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <ProductQuickView />
      <AuthModal />
      <BottomNav />
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
}
