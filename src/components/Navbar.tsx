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

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-100 shadow-xs w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Row 1: Logo (Right) & User/Cart Actions (Left) */}
        <div className="flex items-center justify-between h-14 sm:h-20 w-full">
          
          {/* Logo (Right in RTL) */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
              <Milk className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-2xl text-slate-800 tracking-tight flex items-center gap-1">
                بيبي كير <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-rose-400 text-rose-400" />
              </span>
              <span className="text-[9px] sm:text-xs text-emerald-600 font-medium -mt-1 hidden xs:block">
                حليب ومستلزمات الأطفال
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar (Middle on md+) */}
          <div className="hidden md:block flex-1 max-w-xl mx-6">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن حليب، حفاضات، رضّاعات، عناية..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 pr-11 pl-10 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white text-sm shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons (Left in RTL) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* User Profile / Auth Button */}
            {user ? (
              <div className="flex items-center gap-1">
                {user.role === 'admin' ? (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1.5 rounded-full text-xs font-bold shadow-xs hover:bg-emerald-200 transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="hidden sm:inline">الأدمن (عباس)</span>
                    <span className="sm:hidden text-[10px]">الأدمن</span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1.5 rounded-full text-xs font-bold">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-4 h-4 rounded-full object-cover" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                    <span className="max-w-[60px] sm:max-w-[100px] truncate text-[11px] sm:text-xs">{user.name}</span>
                  </div>
                )}

                <button
                  onClick={logoutUser}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded-full transition-colors"
                  title="تسجيل الخروج"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-colors"
              >
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>دخول</span>
              </button>
            )}

            {/* Desktop WhatsApp Direct */}
            <a
              href={`https://wa.me/${storePhone}?text=${encodeURIComponent('السلام عليكم، أستفسر عن المنتجات المتوفرة لديكم')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/20" />
              <span>تواصل معنا</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full shadow-md shadow-emerald-600/20 active:scale-95 transition-all text-xs font-bold"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">السلة</span>
              {totalItems > 0 && (
                <span className="bg-amber-400 text-amber-950 text-[10px] sm:text-xs font-extrabold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Row 2: Full Width Mobile Search Bar (Below Header on Phones) */}
        <div className="block md:hidden pb-2.5 pt-0.5 w-full">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="ابحث عن حليب، حفاضات، رضّاعات، عناية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 pr-9 pl-8 py-2 rounded-full border border-slate-200 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white shadow-inner"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
