'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { ProductCard } from './ProductCard';
import { PackageSearch, Sparkles } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { products, selectedCategory, selectedAgeGroup, searchQuery, setSelectedCategory, setSelectedAgeGroup, setSearchQuery } = useCart();

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    if (selectedAgeGroup !== 'all' && product.ageGroup !== 'all' && product.ageGroup !== selectedAgeGroup) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchName = product.name.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchCategory = product.categoryName.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchCategory && !matchDesc) {
        return false;
      }
    }
    return true;
  });

  return (
    <div id="products-section" className="scroll-mt-20 mb-12 sm:mb-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 flex items-center gap-1.5">
            <span>قائمة المنتجات والمستلزمات</span>
            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
          </h2>
          <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5 font-medium">
            عرض {filteredProducts.length} من أصل {products.length} منتج متوفر
          </p>
        </div>
      </div>

      {/* Grid Container */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200/80 shadow-2xs my-6 max-w-md mx-auto">
          <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <PackageSearch className="w-7 h-7" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 mb-1">لا توجد نتائج مطابقة</h3>
          <p className="text-slate-500 text-xs mb-5">
            لم نجد منتجات تطابق كلمة البحث الحالية.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedAgeGroup('all');
              setSearchQuery('');
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs transition-colors shadow-2xs"
          >
            عرض جميع المنتجات
          </button>
        </div>
      )}
    </div>
  );
};
