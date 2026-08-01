'use client';

import React from 'react';
import { CATEGORIES, AGE_GROUPS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Milk, Box, Heart, Smile, Gift, Sparkles, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-4 h-4" />,
  Milk: <Milk className="w-4 h-4" />,
  Box: <Box className="w-4 h-4" />,
  Heart: <Heart className="w-4 h-4" />,
  Smile: <Smile className="w-4 h-4" />,
  Gift: <Gift className="w-4 h-4" />,
};

export const CategoryFilter: React.FC = () => {
  const { selectedCategory, setSelectedCategory, selectedAgeGroup, setSelectedAgeGroup } = useCart();

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 mb-8">
      
      {/* Header & Filter Title */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
          <Filter className="w-5 h-5 text-emerald-600" />
          <span>تصفية المنتجات</span>
        </div>
        
        {(selectedCategory !== 'all' || selectedAgeGroup !== 'all') && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedAgeGroup('all');
            }}
            className="text-xs text-rose-600 hover:text-rose-700 font-semibold underline underline-offset-4"
          >
            إعادة تعيين الفلاتر
          </button>
        )}
      </div>

      {/* 1. Category Tabs */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wider">
          اختر الفئة:
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-100/80 text-slate-650 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {iconMap[cat.icon]}
                <span>{cat.name}</span>
                {isSelected && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-emerald-600 rounded-2xl -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Age Group Tabs */}
      <div>
        <label className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wider">
          التصفية حسب الفئة العمرية:
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {AGE_GROUPS.map((age) => {
            const isSelected = selectedAgeGroup === age.id;
            return (
              <button
                key={age.id}
                onClick={() => setSelectedAgeGroup(age.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
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
