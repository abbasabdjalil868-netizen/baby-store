'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Check } from 'lucide-react';
import { getBadgeColorClass } from './ProductCard';

export const ProductQuickView: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const handleClose = () => {
    setQuantity(1);
    setQuickViewProduct(null);
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    handleClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden z-10 my-auto border border-rose-100 dir-rtl"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 left-4 z-20 w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="relative bg-slate-50 p-6 flex items-center justify-center">
              {quickViewProduct.badge && (
                <span className={`absolute top-4 right-4 z-10 text-xs px-3 py-1 rounded-full ${getBadgeColorClass(quickViewProduct.badge)}`}>
                  {quickViewProduct.badge}
                </span>
              )}
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="max-h-72 w-auto object-contain rounded-2xl shadow-sm"
              />
            </div>

            {/* Product Details */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold">
                  <span>{quickViewProduct.brand}</span>
                  <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold">
                    👶 {quickViewProduct.ageLabel}
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-slate-900 mb-3 leading-snug">
                  {quickViewProduct.name}
                </h2>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4 bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100">
                  <span className="text-2xl font-extrabold text-emerald-700">
                    {(quickViewProduct.price * quantity).toLocaleString()} د.ع
                  </span>
                  {quickViewProduct.oldPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      {(quickViewProduct.oldPrice * quantity).toLocaleString()} د.ع
                    </span>
                  )}
                  <span className="text-xs text-slate-500 mr-auto font-bold">({quickViewProduct.unit})</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Features List */}
                <div className="space-y-1.5 mb-6">
                  {quickViewProduct.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Controls */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-slate-600">الكمية:</span>
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-slate-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-md text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة المنتج للسلة 🛒</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
