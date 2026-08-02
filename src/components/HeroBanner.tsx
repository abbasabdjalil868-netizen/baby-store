'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Sparkles, ArrowLeft } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { banners, setSelectedCategory } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play carousel slider every 4000ms (4 seconds) unless hovered
  useEffect(() => {
    if (isHovered || !banners || banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered, banners]);

  if (!banners || banners.length === 0) return null;

  const currentBanner = banners[currentIndex] || banners[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleCtaClick = (catLink?: string) => {
    if (catLink) {
      setSelectedCategory(catLink);
    } else {
      setSelectedCategory('all');
    }

    const productsEl = document.getElementById('products-section');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4 dir-rtl">
      <div
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md bg-slate-900 h-[210px] xs:h-[240px] sm:h-[320px] md:h-[360px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner.id || currentIndex}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image */}
            <img
              src={currentBanner.image}
              alt={currentBanner.title}
              className="w-full h-full object-cover object-center filter brightness-[0.70]"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-900/30" />

            {/* Banner Text Content */}
            <div className="absolute inset-0 p-4 sm:p-8 md:p-12 flex flex-col justify-center max-w-xl text-white">
              {currentBanner.badge && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-1.5 sm:mb-3"
                >
                  <span className="inline-flex items-center gap-1 bg-amber-400 text-amber-950 font-black text-[10px] sm:text-xs px-2.5 py-1 rounded-full shadow-xs">
                    <Sparkles className="w-3 h-3 fill-current" />
                    <span>{currentBanner.badge}</span>
                  </span>
                </motion.div>
              )}

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base xs:text-lg sm:text-2xl md:text-3xl font-extrabold leading-tight mb-1 sm:mb-2 drop-shadow-md"
              >
                {currentBanner.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[11px] sm:text-sm text-slate-200 line-clamp-2 mb-3 sm:mb-6 font-medium max-w-md leading-relaxed"
              >
                {currentBanner.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={() => handleCtaClick(currentBanner.categoryLink)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 w-fit active:scale-95"
                >
                  <span>{currentBanner.ctaText || 'تصفح العروض الآن'}</span>
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Previous / Next Arrow Controls */}
        {banners.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white backdrop-blur-xs flex items-center justify-center border border-white/20 transition-all active:scale-90"
              title="السابق"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white backdrop-blur-xs flex items-center justify-center border border-white/20 transition-all active:scale-90"
              title="التالي"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Carousel Pagination Dots */}
        {banners.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-slate-950/40 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/10">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-6 h-2 bg-emerald-400 shadow-xs'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
                title={`شريحة ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
