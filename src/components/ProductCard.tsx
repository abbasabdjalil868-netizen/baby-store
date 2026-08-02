'use client';

import React from 'react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { Plus, Eye, Check } from 'lucide-react';
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between group relative"
    >
      {/* Top Image Box */}
      <div className="relative aspect-square w-full bg-slate-50/80 overflow-hidden">
        
        {/* Special Offer Badge (Top Right) */}
        {product.badge && (
          <span className="absolute top-2 right-2 z-10 bg-amber-400 text-amber-950 font-extrabold text-[9px] sm:text-xs px-2 py-0.5 rounded-full shadow-2xs">
            {product.badge}
          </span>
        )}

        {/* Age Group Tag (Bottom Right) */}
        <span className="absolute bottom-2 right-2 z-10 bg-white/95 backdrop-blur-xs text-slate-700 font-bold text-[9px] sm:text-xs px-2 py-0.5 rounded-full border border-slate-200/60 shadow-2xs">
          👶 {product.ageLabel}
        </span>

        {/* Quick View Button (Top Left) */}
        <button
          onClick={() => setQuickViewProduct(product)}
          className="absolute top-2 left-2 z-10 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 hover:bg-white text-slate-600 hover:text-emerald-600 rounded-full flex items-center justify-center shadow-xs transition-all active:scale-90"
          title="معاينة تفاصيل المنتج"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>

        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Body Information */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Unit Row */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-medium">
            <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md font-bold truncate max-w-[90px]">
              {product.brand}
            </span>
            <span className="truncate">{product.unit}</span>
          </div>

          {/* Title with Fixed Line Height for Uniform Card Alignment */}
          <h3 className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-2 min-h-[32px] sm:min-h-[40px] mb-1.5 leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Price & Add Button Row */}
        <div className="pt-2 border-t border-slate-100 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2 mt-1">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-[10px] text-slate-400 line-through">
                {product.oldPrice.toLocaleString()} د.ع
              </span>
            )}
            <div className="flex items-baseline gap-0.5">
              <span className="text-xs sm:text-base font-extrabold text-emerald-700">
                {product.price.toLocaleString()}
              </span>
              <span className="text-[9px] sm:text-xs font-bold text-emerald-600">د.ع</span>
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className={`w-full xs:w-auto flex items-center justify-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all active:scale-95 shadow-2xs ${
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
