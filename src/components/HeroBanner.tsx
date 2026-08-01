'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, MessageCircle, ShieldCheck, Truck, Sparkles, HeartHandshake } from 'lucide-react';
import { STORE_WHATSAPP_NUMBER } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';

export const HeroBanner: React.FC = () => {
  const { setSelectedCategory } = useCart();

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/80 via-emerald-50/40 to-slate-50 py-12 sm:py-16">
      
      {/* Decorative Pastel Orbs */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-center lg:text-right"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-800 border border-emerald-200 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>محل متخصص في حليب ومستلزمات العناية بطفلك</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight sm:leading-tight mb-4">
              صحة طفلك وراحته <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
                في أيدٍ أمينة مع بيبي كير
              </span>
            </h1>

            <p className="text-slate-650 text-base sm:text-lg mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              نوفر لكِ أجود أنواع الحليب الطبي والصناعي، الحفاضات الأصلية، ومستلزمات العناية الفائقة بأسعار مناسبة مع خدمة التوصيل المباشر والدفع عند الاستلام.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <button
                onClick={scrollToProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-emerald-600/25 active:scale-98 transition-all text-base"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>تسوق الآن</span>
              </button>

              <a
                href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent('مرحباً، أود الاستفسار عن منتجات الحليب والمستلزمات للطلب الفوري')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-2 border-emerald-200 font-bold px-7 py-3.5 rounded-2xl transition-all text-base shadow-xs"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600/20" />
                <span>اطلب عبر الواتساب</span>
              </a>
            </div>

            {/* Highlights Bar */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/60 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-slate-700 text-xs sm:text-sm font-medium">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>منتجات أصلية 100%</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 text-xs sm:text-sm font-medium">
                <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>توصيل سريع للباب</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 text-xs sm:text-sm font-medium">
                <HeartHandshake className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>دفع عند الاستلام</span>
              </div>
            </div>

          </motion.div>

          {/* Banner Graphic / Card Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card Graphic */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-rose-100/80 relative">
                
                <div className="absolute -top-4 -right-4 bg-amber-400 text-amber-950 font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md transform rotate-3 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 fill-current" /> عروض الأسبوع
                </div>

                <img
                  src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&auto=format&fit=crop&q=80"
                  alt="مستلزمات الأطفال وحليب الرضع"
                  className="w-full h-56 sm:h-64 object-cover rounded-2xl mb-6 shadow-xs"
                />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">باقة العناية الشاملة للطفل</h3>
                    <p className="text-slate-500 text-xs mt-0.5">حليب + حفاضات + مستحضرات حمام</p>
                  </div>
                  <div className="text-left">
                    <span className="text-xs text-rose-500 line-through font-semibold block">260 ر.س</span>
                    <span className="text-xl font-extrabold text-emerald-600">199 ر.س</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedCategory('all');
                    scrollToProducts();
                  }}
                  className="w-full mt-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold py-2.5 rounded-xl text-sm transition-colors"
                >
                  استعراض جميع العروض 👈
                </button>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
