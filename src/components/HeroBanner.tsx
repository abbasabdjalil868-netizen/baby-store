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
  oldPriceTag?: string;
  image: string;
  bgGradient: string;
  accentColor: string;
  categoryFilter?: string;
}

export const SLIDES: BannerSlide[] = [
  {
    id: 's1',
    badge: 'عروض الحليب الطازج 🍼',
    title: 'أجود أنواع الحليب الطبي والصناعي',
    highlightText: 'لصحة ونمو طفلك الرضيع',
    description: 'نوفر أبتاميل، نان كومفورت، وسيميلاك جولد الأصلي بأسعار تنافسية وتوصيل سريع لباب بيتك.',
    priceTag: 'من 15,000 د.ع',
    oldPriceTag: '18,000 د.ع',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    bgGradient: 'from-emerald-900/90 via-teal-900/80 to-slate-900/90',
    accentColor: 'emerald',
    categoryFilter: 'milk',
  },
  {
    id: 's2',
    badge: 'باقة الحفاضات والعناية 👶',
    title: 'راحة فائقة 12 ساعة متواصلة',
    highlightText: 'بامبرز ومناديل واترويبس النقية',
    description: 'حماية متكاملة ضد التسريب والتسلخات مع مناديل 99.9% ماء نقي لحماية البشرة الحساسة.',
    priceTag: 'توصيل مجاني 🎉',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&auto=format&fit=crop&q=80',
    bgGradient: 'from-amber-900/90 via-rose-950/80 to-slate-900/90',
    accentColor: 'amber',
    categoryFilter: 'diapers',
  },
  {
    id: 's3',
    badge: 'مستحضرات الاستحمام والرضّاعات 🛁',
    title: 'سيباميد وموستيلا ورضّاعات أفينت',
    highlightText: 'عناية لطيفة بدون دموع 100%',
    description: 'مستحضرات طبية مجربة بدرجة حموضة 5.5 ورضّاعات مضادة للمغص لرضاعة هادئة ومريحة.',
    priceTag: 'خصومات حصرية 25%',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    bgGradient: 'from-cyan-900/90 via-blue-950/80 to-slate-900/90',
    accentColor: 'cyan',
    categoryFilter: 'hygiene',
  },
];

export const HeroBanner: React.FC = () => {
  const { setSelectedCategory, storePhone } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play timer (5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
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
      className="relative overflow-hidden py-4 sm:py-8 w-full bg-slate-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Animated Banner Container Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 min-h-[360px] sm:min-h-[420px] flex items-center">
          
          {/* Animated Background Slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-0"
            >
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />
              {/* Gradient Dark Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`} />
            </motion.div>
          </AnimatePresence>

          {/* Slide Content */}
          <div className="relative z-10 p-5 sm:p-10 lg:p-12 w-full text-white dir-rtl">
            <div className="max-w-2xl">
              
              {/* Badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id + '_badge'}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-amber-300 border border-white/20 px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse text-amber-300" />
                  <span>{slide.badge}</span>
                </motion.div>
              </AnimatePresence>

              {/* Title */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={slide.id + '_title'}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-2"
                >
                  {slide.title} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">
                    {slide.highlightText}
                  </span>
                </motion.h1>
              </AnimatePresence>

              {/* Description */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={slide.id + '_desc'}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-slate-200 text-xs sm:text-base mb-6 leading-relaxed line-clamp-2 max-w-xl"
                >
                  {slide.description}
                </motion.p>
              </AnimatePresence>

              {/* Action Buttons & Price Badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id + '_cta'}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex flex-wrap items-center gap-3 mb-6"
                >
                  <button
                    onClick={() => scrollToProducts(slide.categoryFilter)}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold px-6 py-3 rounded-2xl shadow-lg shadow-emerald-500/30 text-xs sm:text-sm active:scale-95 transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>تسوق هذا القسم</span>
                  </button>

                  <a
                    href={`https://wa.me/${storePhone}?text=${encodeURIComponent(`مرحباً، أود الاستفسار عن عروض: ${slide.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold px-5 py-3 rounded-2xl text-xs sm:text-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                    <span>استفسار بالواتساب</span>
                  </a>

                  {slide.priceTag && (
                    <div className="bg-amber-400 text-amber-950 px-3 py-1.5 rounded-xl font-extrabold text-xs shadow-md flex items-center gap-1.5 mr-auto sm:mr-0">
                      <span>{slide.priceTag}</span>
                      {slide.oldPriceTag && (
                        <span className="line-through text-amber-900/70 text-[10px]">{slide.oldPriceTag}</span>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Bottom Feature Badges */}
              <div className="flex items-center gap-4 pt-3 border-t border-white/15 text-[11px] font-semibold text-slate-300">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>منتجات أصلية 100%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>توصيل لكافة المحافظات</span>
                </div>
                <div className="flex items-center gap-1">
                  <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
                  <span>دفع عند الاستلام</span>
                </div>
              </div>

            </div>
          </div>

          {/* Previous / Next Arrow Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md active:scale-90"
            title="البنر السابق"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md active:scale-90"
            title="البنر التالي"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Dots Indicators (Bullet Dots at Bottom) */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx
                    ? 'w-6 bg-emerald-400'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                title={`شريحة ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
