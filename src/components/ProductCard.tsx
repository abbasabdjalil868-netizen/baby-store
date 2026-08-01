'use client';

import React from 'react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { Star, Plus, Eye, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setQuickViewProduct, cart } = useCart();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const isAlreadyInCart = Boolean(cartItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col group relative"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden">
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-amber-400 text-amber-950 font-extrabold text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-xs">
            {product.badge}
          </span>
        )}

        {/* Age Label */}
        <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-10 bg-white/90 backdrop-blur-md text-slate-700 font-bold text-[9px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-xs">
          👶 {product.ageLabel}
        </span>

        {/* Quick View Button */}
        <button
          onClick={() => setQuickViewProduct(product)}
          className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 w-7 h-7 sm:w-9 sm:h-9 bg-white/90 hover:bg-white text-slate-700 hover:text-emerald-600 rounded-full flex items-center justify-center shadow-md transition-transform active:scale-90"
          title="معاينة سريعة"
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Unit */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 mb-1 font-medium">
            <span className="truncate max-w-[80px] sm:max-w-none">{product.brand}</span>
            <span>{product.unit}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-800 text-xs sm:text-base line-clamp-2 mb-1.5 leading-tight sm:leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-slate-700">{product.rating}</span>
            <span className="text-[9px] sm:text-xs text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Bottom Price & Add CTA */}
        <div className="pt-2 sm:pt-3 border-t border-slate-100 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-1.5 sm:gap-2 mt-1">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                {product.oldPrice.toLocaleString()} د.ع
              </span>
            )}
            <div className="flex items-baseline gap-0.5 sm:gap-1">
              <span className="text-sm sm:text-lg font-extrabold text-emerald-700">{product.price.toLocaleString()}</span>
              <span className="text-[10px] sm:text-xs font-bold text-emerald-600">د.ع</span>
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className={`w-full xs:w-auto flex items-center justify-center gap-1 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-sm font-bold transition-all shadow-xs active:scale-95 ${
              isAlreadyInCart
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
            }`}
          >
            {isAlreadyInCart ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>مضاف ({cartItem?.quantity})</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة</span>
              </>
            )}
          </button>
        </div>

      </div>
    </motion.div>
  );
};
