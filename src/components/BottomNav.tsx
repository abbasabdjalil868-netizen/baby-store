'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { Home, Grid, ShoppingBag, User, Settings } from 'lucide-react';
import Link from 'next/link';

export const BottomNav: React.FC = () => {
  const { totalItems, openCart, user, openAuthModal } = useCart();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="block md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-lg px-2 py-2 w-full dir-rtl">
      <div className="flex items-center justify-around text-slate-600 max-w-md mx-auto">
        
        {/* Home */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center gap-0.5 text-emerald-700 font-bold active:scale-95 transition-transform"
        >
          <Home className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px]">الرئيسية</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => scrollToSection('products-section')}
          className="flex flex-col items-center gap-0.5 hover:text-emerald-700 active:scale-95 transition-transform"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px]">الأقسام</span>
        </button>

        {/* Cart Trigger */}
        <button
          onClick={openCart}
          className="relative flex flex-col items-center gap-0.5 hover:text-emerald-700 active:scale-95 transition-transform"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-400 text-amber-950 text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-emerald-700">السلة</span>
        </button>

        {/* Account / Admin */}
        {user?.role === 'admin' ? (
          <Link
            href="/admin"
            className="flex flex-col items-center gap-0.5 text-emerald-800 font-bold active:scale-95 transition-transform"
          >
            <Settings className="w-5 h-5 text-emerald-700" />
            <span className="text-[10px]">الأدمن</span>
          </Link>
        ) : (
          <button
            onClick={openAuthModal}
            className="flex flex-col items-center gap-0.5 hover:text-emerald-700 active:scale-95 transition-transform"
          >
            <User className="w-5 h-5" />
            <span className="text-[10px]">{user ? user.name : 'حسابي'}</span>
          </button>
        )}

      </div>
    </div>
  );
};
