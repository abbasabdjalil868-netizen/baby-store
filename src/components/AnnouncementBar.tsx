'use client';

import React from 'react';
import { Truck, ShieldCheck, MessageCircle, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const AnnouncementBar: React.FC = () => {
  const { storePhone } = useCart();

  return (
    <div className="bg-emerald-800 text-white text-[11px] sm:text-xs py-2 px-3 shadow-inner relative z-50 overflow-hidden w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Notice text */}
        <div className="flex items-center gap-2 overflow-hidden truncate">
          <span className="inline-flex items-center gap-1 bg-emerald-700 text-emerald-100 px-2 py-0.5 rounded-full font-bold text-[10px] shrink-0">
            <Sparkles className="w-3 h-3 text-amber-300" /> عروض
          </span>
          <span className="truncate font-medium">
            توصيل سريع لكافة المناطق • الدفع عند الاستلام متاح 🚚
          </span>
        </div>

        {/* WhatsApp Link */}
        <a
          href={`https://wa.me/${storePhone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-full font-bold shrink-0 transition-colors shadow-xs text-[10px] sm:text-xs"
        >
          <MessageCircle className="w-3 h-3 fill-current" />
          <span>الواتساب</span>
        </a>

      </div>
    </div>
  );
};
