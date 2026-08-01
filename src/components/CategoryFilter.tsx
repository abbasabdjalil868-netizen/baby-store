'use client';

import React from 'react';
import { CATEGORIES, AGE_GROUPS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Milk, Box, Heart, Smile, Gift, Sparkles, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-3.5 h-3.5" />,
  Milk: <Milk className="w-3.5 h-3.5" />,
  Box: <Box className="w-3.5 h-3.5" />,
  Heart: <Heart className="w-3.5 h-3.5" />,
  Smile: <Smile className="w-3.5 h-3.5" />,
  Gift: <Gift className="w-3.5 h-3.5" />,
};

export const CategoryFilter: React.FC = () => {
  const { selectedCategory, setSelectedCategory, selectedAgeGroup, setSelectedAgeGroup } = useCart();

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs border border-slate-200/80 mb-6 sm:mb-8">
      
      {/* Header & Filter Title */}
      <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-1.5 text-slate-800 font-bold text-sm sm:text-base">
          <Filter className="w-4 h-4 text-emerald-600" />
          <span>تصفية المنتجات</span>
        </div>
        
        {(selectedCategory !== 'all' || selectedAgeGroup !== 'all') && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedAgeGroup('all');
            }}
            className="text-[11px] sm:text-xs text-rose-600 hover:text-rose-700 font-semibold underline underline-offset-4"
          >
            إعادة تعيين
          </button>
        )}
      </div>

      {/* 1. Category Tabs (Horizontal Scrollable) */}
      <div className="mb-4">
        <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
          الفئة:
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar -mx-2 px-2 touch-pan-x">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                {iconMap[cat.icon]}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Age Group Tabs */}
      <div>
        <label className="block text-[10px] sm:text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
          حسب العمر:
        </label>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {AGE_GROUPS.map((age) => {
            const isSelected = selectedAgeGroup === age.id;
            return (
              <button
                key={age.id}
                onClick={() => setSelectedAgeGroup(age.id)}
                className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                👶 {age.label}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
