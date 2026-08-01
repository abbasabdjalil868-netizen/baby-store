'use client';

import React from 'react';
import { ShieldCheck, Truck, Banknote, Headphones, CheckCircle2 } from 'lucide-react';

export const TrustSignals: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />,
      title: 'منتجات أصلية 100%',
      desc: 'حليب ومستلزمات بمواصفات موثوقة وتاريخ حديث.',
      bg: 'bg-emerald-50',
    },
    {
      icon: <Banknote className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />,
      title: 'الدفع عند الاستلام',
      desc: 'تسوق بأمان وافحص طلبك قبل الدفع نقداً.',
      bg: 'bg-teal-50',
    },
    {
      icon: <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />,
      title: 'توصيل لباب البيت',
      desc: 'خدمة شحن سريعة مع حفظ آمن للطفل.',
      bg: 'bg-amber-50',
    },
    {
      icon: <Headphones className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />,
      title: 'دعم واستفسارات',
      desc: 'فريقنا متواجد بالواتساب للإجابة والتعليمات.',
      bg: 'bg-cyan-50',
    },
  ];

  return (
    <section className="py-8 sm:py-12 bg-white border-y border-slate-200/60 my-8 sm:my-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 mb-1">لماذا يثق بنا الآباء والأمهات؟</h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            نحن نضع صحة طفلك وراحتك في المقام الأول دائماً.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/70 hover:border-emerald-200 hover:shadow-md transition-all flex flex-col items-center text-center group bg-white"
            >
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl ${item.bg} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-xs sm:text-base mb-1 flex items-center gap-1">
                <span>{item.title}</span>
              </h3>
              <p className="text-slate-500 text-[10px] sm:text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
