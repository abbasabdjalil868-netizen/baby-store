'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { ProductCard } from './ProductCard';
import { PackageSearch, Sparkles } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { products, selectedCategory, selectedAgeGroup, searchQuery, setSelectedCategory, setSelectedAgeGroup, setSearchQuery } = useCart();

  const filteredProducts = products.filter((product) => {
    // Category match
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    // Age Group match
    if (selectedAgeGroup !== 'all' && product.ageGroup !== 'all' && product.ageGroup !== selectedAgeGroup) {
      return false;
    }
    // Search query match
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
    <div id="products-section" className="scroll-mt-24 mb-16">
      {/* Header Info Bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <span>تصفح المنتجات المتوفرة</span>
            <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400" />
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            يتم عرض {filteredProducts.length} من أصل {products.length} منتج
          </p>
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty Search State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs my-8 max-w-lg mx-auto">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">لا توجد نتائج مطابقة لتصفيتك</h3>
          <p className="text-slate-500 text-sm mb-6">
            لم نجد منتجات تطابق المعايير أو كلمة البحث المطلوبة. يرجى تجربة إعادة تعيين البحث.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedAgeGroup('all');
              setSearchQuery('');
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-2xl text-sm transition-colors shadow-sm"
          >
            عرض جميع المنتجات
          </button>
        </div>
      )}
    </div>
  );
};
