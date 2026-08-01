'use client';

import React from 'react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { Star, Plus, Eye, Check, ShoppingCart } from 'lucide-react';
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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col group relative"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden">
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 right-3 z-10 bg-amber-400 text-amber-950 font-bold text-xs px-2.5 py-1 rounded-full shadow-xs">
            {product.badge}
          </span>
        )}

        {/* Age Label */}
        <span className="absolute bottom-3 right-3 z-10 bg-white/90 backdrop-blur-md text-slate-700 font-medium text-xs px-2.5 py-1 rounded-full shadow-xs">
          👶 {product.ageLabel}
        </span>

        {/* Quick View Button on Hover */}
        <button
          onClick={() => setQuickViewProduct(product)}
          className="absolute top-3 left-3 z-10 w-9 h-9 bg-white/90 hover:bg-white text-slate-700 hover:text-emerald-600 rounded-full flex items-center justify-center shadow-md transition-transform active:scale-90"
          title="معاينة سريعة للمنتج"
        >
          <Eye className="w-4 h-4" />
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
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
            <span>{product.brand}</span>
            <span>{product.unit}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-800 text-base line-clamp-2 mb-2 group-hover:text-emerald-700 transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center text-amber-400">
              <Star className="w-4 h-4 fill-current" />
            </div>
            <span className="text-xs font-bold text-slate-700">{product.rating}</span>
            <span className="text-xs text-slate-400">({product.reviewsCount} تقييم)</span>
          </div>
        </div>

        {/* Bottom Price & Add CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-xs text-slate-400 line-through">
                {product.oldPrice} ر.س
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-emerald-700">{product.price}</span>
              <span className="text-xs font-bold text-emerald-600">ر.س</span>
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-95 ${
              isAlreadyInCart
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
            }`}
          >
            {isAlreadyInCart ? (
              <>
                <Check className="w-4 h-4 text-emerald-700" />
                <span>تم الإضافة ({cartItem?.quantity})</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>إضافة بالسلة</span>
              </>
            )}
          </button>
        </div>

      </div>
    </motion.div>
  );
};
