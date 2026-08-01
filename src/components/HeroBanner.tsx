'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, MessageCircle, ShieldCheck, Truck, Sparkles, HeartHandshake } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const HeroBanner: React.FC = () => {
  const { setSelectedCategory, storePhone } = useCart();

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-emerald-50/30 to-slate-50 py-5 sm:py-12 w-full">
      
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-10 w-36 sm:w-72 h-36 sm:h-72 bg-emerald-200/30 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 text-center lg:text-right"
          >
            <div className="inline-flex items-center gap-1 bg-emerald-100/90 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold mb-2.5 shadow-2xs">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>محل حليب ومستلزمات الأطفال</span>
            </div>

            <h1 className="text-xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-snug mb-2">
              صحة طفلك  <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                في أيدٍ أمينة مع بيبي كير
              </span>
            </h1>

            <p className="text-slate-600 text-xs sm:text-base mb-4 leading-relaxed max-w-xl mx-auto lg:mx-0 px-2 sm:px-0">
              نوفر أجود أنواع الحليب الطبي والصناعي، الحفاضات الأصلية، ومستلزمات العناية بأسعار مناسبة وتوصيل سريع.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-2 mb-4 px-2 sm:px-0">
              <button
                onClick={scrollToProducts}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-sm text-xs sm:text-sm active:scale-95 transition-transform"
              >
                <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>تسوق الآن</span>
              </button>

              <a
                href={`https://wa.me/${storePhone}?text=${encodeURIComponent('مرحباً، أود الاستفسار عن منتجات الحليب والمستلزمات')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-white text-emerald-800 border border-emerald-300 font-bold px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/20" />
                <span>طلب بالواتساب</span>
              </a>
            </div>

            {/* Highlights Bar */}
            <div className="flex items-center justify-between sm:justify-start gap-2 pt-3 border-t border-slate-200/60 max-w-md mx-auto lg:mx-0 text-[10px] sm:text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>منتجات أصلية 100%</span>
              </div>
              <div className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>توصيل سريع</span>
              </div>
              <div className="flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>دفع عند الاستلام</span>
              </div>
            </div>

          </motion.div>

          {/* Banner Graphic Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5 relative mt-2 lg:mt-0"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="bg-white p-3 sm:p-5 rounded-2xl sm:rounded-3xl shadow-md border border-slate-100 relative">
                
                <span className="absolute -top-2.5 right-3 bg-amber-400 text-amber-950 font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 fill-current" /> عروض الأسبوع
                </span>

                <img
                  src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&auto=format&fit=crop&q=80"
                  alt="مستلزمات الأطفال وحليب الرضع"
                  className="w-full h-36 sm:h-64 object-cover rounded-xl sm:rounded-2xl mb-2.5"
                />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-xs sm:text-base">باقة العناية الشاملة</h3>
                    <p className="text-slate-400 text-[10px]">حليب + حفاضات + عناية</p>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-rose-500 line-through block">260 ر.س</span>
                    <span className="text-sm sm:text-lg font-extrabold text-emerald-600">199 ر.س</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
