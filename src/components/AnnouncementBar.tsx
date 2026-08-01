'use client';

import React from 'react';
import { Truck, ShieldCheck, MessageCircle, Sparkles } from 'lucide-react';
import { STORE_WHATSAPP_NUMBER } from '../utils/whatsapp';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-emerald-800 text-white text-xs sm:text-sm py-2 px-4 shadow-inner relative z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium overflow-x-auto no-scrollbar py-0.5">
          <span className="inline-flex items-center gap-1 bg-emerald-700/80 text-emerald-100 px-2 py-0.5 rounded-full text-xs font-semibold">
            <Sparkles className="w-3 h-3 text-amber-300" /> عرض خاص
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Truck className="w-4 h-4 text-emerald-300" /> توصيل سريع لكافة المناطق
          </span>
          <span className="hidden md:inline text-emerald-400">•</span>
          <span className="hidden md:flex items-center gap-1.5 whitespace-nowrap">
            <ShieldCheck className="w-4 h-4 text-emerald-300" /> الدفع عند الاستلام متاح
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-full text-xs transition-colors font-medium shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>للطلب السريع عبر الواتساب</span>
          </a>
        </div>
      </div>
    </div>
  );
};
