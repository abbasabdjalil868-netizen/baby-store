'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, MessageCircle, Heart, Milk, X, Settings, User, LogOut } from 'lucide-react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const {
    totalItems,
    openCart,
    searchQuery,
    setSearchQuery,
    storePhone,
    user,
    openAuthModal,
    logoutUser,
  } = useCart();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Milk className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl text-slate-800 tracking-tight flex items-center gap-1.5">
                  بيبي كير <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
                </span>
                <span className="text-xs text-emerald-600 font-medium -mt-1">
                  حليب ومستلزمات الأطفال
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-6">
            <div className={`relative transition-all duration-200 ${isSearchFocused ? 'scale-[1.01]' : ''}`}>
              <input
                type="text"
                placeholder="ابحث عن حليب، حفاضات، رضّاعات، عناية..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 pr-11 pl-10 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 text-sm transition-all shadow-inner"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Search className="w-4 h-4" />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Unified User Status / Sign In Button */}
            {user ? (
              <div className="flex items-center gap-2">
                {user.role === 'admin' ? (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs hover:bg-emerald-200 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-emerald-700" />
                    <span>لوحة التحكم (عباس) 🔑</span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full text-xs font-bold">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover" />
                    ) : (
                      <User className="w-4 h-4 text-emerald-600" />
                    )}
                    <span>{user.name}</span>
                  </div>
                )}

                <button
                  onClick={logoutUser}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-full transition-colors"
                  title="تسجيل الخروج"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors"
              >
                <User className="w-4 h-4 text-emerald-600" />
                <span>تسجيل الدخول</span>
              </button>
            )}

            {/* WhatsApp Direct */}
            <a
              href={`https://wa.me/${storePhone}?text=${encodeURIComponent('السلام عليكم، أستفسر عن المنتجات المتوفرة لديكم')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors shadow-xs"
              title="تواصل معنا مباشرة عبر الواتساب"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
              <span className="hidden md:inline">تواصل معنا</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2.5 rounded-full shadow-md shadow-emerald-600/20 active:scale-95 transition-all text-xs sm:text-sm font-semibold"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">السلة</span>
              {totalItems > 0 && (
                <span className="bg-amber-400 text-amber-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
