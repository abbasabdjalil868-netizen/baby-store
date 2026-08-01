'use client';

import React from 'react';
import { Milk, Heart, MessageCircle, Phone, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { STORE_WHATSAPP_NUMBER } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Store Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
                <Milk className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight flex items-center gap-1.5">
                بيبي كير <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              متجر متخصص في توفير كافة مستلزمات الأطفال وحليب الرضع الطبي والصناعي مع التزام تام بالجودة العالية والتوصيل السريع والدفع عند الاستلام.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-xl flex items-center justify-center transition-colors"
                title="واتساب"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-r-4 border-emerald-500 pr-3">
              أقسام المتجر
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#products-section" className="hover:text-emerald-400 transition-colors">
                  حليب طبي وصناعي للرضع
                </a>
              </li>
              <li>
                <a href="#products-section" className="hover:text-emerald-400 transition-colors">
                  حفاضات ومنديل مبللة
                </a>
              </li>
              <li>
                <a href="#products-section" className="hover:text-emerald-400 transition-colors">
                  مستحضرات الاستحمام والعناية
                </a>
              </li>
              <li>
                <a href="#products-section" className="hover:text-emerald-400 transition-colors">
                  رضّاعات ومستلزمات التغذية
                </a>
              </li>
              <li>
                <a href="#products-section" className="hover:text-emerald-400 transition-colors">
                  عضاضات وألعاب التسنين
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Policies & Guarantees */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-r-4 border-emerald-500 pr-3">
              سياسات المتجر
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ضمان المنتجات الأصلية 100%</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>سياسة التوصيل المباشر خلال 24 ساعة</span>
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-emerald-400" />
                <span>سياسة استبدال المنتجات التالفة</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>الدفع عند الاستلام متاح لجميع الطلبات</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-r-4 border-emerald-500 pr-3">
              تواصل معنا
            </h3>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>المركز الرئيسي: حي الجامعة، الشارع العام</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span dir="ltr">+964 770 000 0000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>خدمة الطلب المباشر عبر الواتساب</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} متجر بيبي كير لحليب ومستلزمات الأطفال. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <span>طريقة الدفع المعتمدة: 💵 الدفع عند الاستلام</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
