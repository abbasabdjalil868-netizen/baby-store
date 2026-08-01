'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, MessageCircle, ChevronRight, ChevronLeft, Sparkles, ShieldCheck, Truck, HeartHandshake } from 'lucide-react';
import { useCart } from '../context/CartContext';

export interface BannerSlide {
  id: string;
  badge: string;
  title: string;
  highlightText: string;
  description: string;
  priceTag?: string;
  image: string;
  gradientBg: string;
  categoryFilter?: string;
}

export const SLIDES: BannerSlide[] = [
  {
    id: 's1',
    badge: 'عروض الحليب 🍼',
    title: 'أجود أنواع الحليب الطبي والصناعي',
    highlightText: 'لصحة ونمو طفلك الرضيع',
    description: 'أبتاميل، نان كومفورت، وسيميلاك جولد مع توصيل سريع.',
    priceTag: 'من 15,000 د.ع',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    gradientBg: 'from-emerald-900/90 via-teal-900/80 to-slate-900/95',
    categoryFilter: 'milk',
  },
  {
    id: 's2',
    badge: 'حفاضات وعناية 👶',
    title: 'راحة فائقة 12 ساعة متواصلة',
    highlightText: 'بامبرز ومناديل واترويبس النقية',
    description: 'حماية متكاملة ضد التسريب مع توصيل مجاني للطلبات الكبيرة.',
    priceTag: 'توصيل مجاني 🎉',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&auto=format&fit=crop&q=80',
    gradientBg: 'from-amber-950/90 via-rose-950/80 to-slate-900/95',
    categoryFilter: 'diapers',
  },
  {
    id: 's3',
    badge: 'مستحضرات واستحمام 🛁',
    title: 'سيباميد وموستيلا ورضّاعات أفينت',
    highlightText: 'عناية لطيفة بدون دموع 100%',
    description: 'مستحضرات طبية ورضّاعات مضادة للمغص لراحة طفلك.',
    priceTag: 'خصم 25%',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    gradientBg: 'from-cyan-950/90 via-blue-950/80 to-slate-900/95',
    categoryFilter: 'hygiene',
  },
];

export const HeroBanner: React.FC = () => {
  const { setSelectedCategory, storePhone } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play timer (4 seconds)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = SLIDES[currentSlide];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const scrollToProducts = (category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative overflow-hidden py-3 sm:py-6 w-full bg-slate-100/60"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Compact Mobile-First Banner Container */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-900 min-h-[220px] sm:min-h-[340px] flex items-center">
          
          {/* Animated Background Image & Overlay */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-0"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradientBg}`} />
            </motion.div>
          </AnimatePresence>

          {/* Slide Text Content */}
          <div className="relative z-10 p-4 sm:p-8 lg:p-10 w-full text-white dir-rtl">
            <div className="max-w-xl">
              
              {/* Badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id + '_badge'}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md text-amber-300 border border-white/20 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold mb-2 shadow-xs"
                >
                  <Sparkles className="w-3 h-3 fill-current text-amber-300" />
                  <span>{slide.badge}</span>
                </motion.div>
              </AnimatePresence>

              {/* Headline */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={slide.id + '_title'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-lg sm:text-3xl lg:text-4xl font-extrabold leading-snug mb-1.5"
                >
                  {slide.title} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-amber-200">
                    {slide.highlightText}
                  </span>
                </motion.h1>
              </AnimatePresence>

              {/* Subtitle Description */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={slide.id + '_desc'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="text-slate-200 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2"
                >
                  {slide.description}
                </motion.p>
              </AnimatePresence>

              {/* CTA Action Bar */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id + '_cta'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex items-center gap-2 flex-wrap"
                >
                  <button
                    onClick={() => scrollToProducts(slide.categoryFilter)}
                    className="inline-flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl shadow-md text-xs sm:text-sm active:scale-95 transition-all"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>تسوق الآن</span>
                  </button>

                  <a
                    href={`https://wa.me/${storePhone}?text=${encodeURIComponent(`مرحباً، أود الاستفسار عن عروض: ${slide.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                    <span>واتساب</span>
                  </a>

                  {slide.priceTag && (
                    <span className="bg-amber-400 text-amber-950 font-extrabold text-[10px] sm:text-xs px-2.5 py-1 rounded-lg shadow-xs mr-auto sm:mr-0">
                      {slide.priceTag}
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-xs transition-colors"
            title="السابق"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-xs transition-colors"
            title="التالي"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Pagination Bullet Dots */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-5 bg-emerald-400' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>

        </div>

        {/* Feature Badges below Banner */}
        <div className="grid grid-cols-3 gap-2 mt-3 text-center text-[10px] sm:text-xs font-bold text-slate-700">
          <div className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>أصلي 100%</span>
          </div>
          <div className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-center gap-1">
            <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>توصيل سريع</span>
          </div>
          <div className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-center gap-1">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>دفع عند الاستلام</span>
          </div>
        </div>

      </div>
    </section>
  );
};
