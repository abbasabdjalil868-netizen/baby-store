'use client';

import React from 'react';
import { ShieldCheck, Truck, Banknote, Headphones, CheckCircle2 } from 'lucide-react';

export const TrustSignals: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
      title: 'منتجات أصلية 100%',
      desc: 'حليب ومستلزمات مستوردة من الموزعين المعتمدين وتاريخ صلاحية حديث مضمون.',
      bg: 'bg-emerald-50',
    },
    {
      icon: <Banknote className="w-8 h-8 text-emerald-600" />,
      title: 'الدفع عند الاستلام',
      desc: 'تسوق بأمان كامل واستلم طلبك وافحصه قبل دفع قيمته نقدًا.',
      bg: 'bg-teal-50',
    },
    {
      icon: <Truck className="w-8 h-8 text-emerald-600" />,
      title: 'توصيل لباب البيت',
      desc: 'خدمة شحن سريعة مع مراعاة حفظ الأغذية والحليب في ظروف تخزين صحية.',
      bg: 'bg-amber-50',
    },
    {
      icon: <Headphones className="w-8 h-8 text-emerald-600" />,
      title: 'دعم واستفسارات دائم',
      desc: 'فريقنا متواجد عبر الواتساب على مدار الساعة للإجابة عن استفساراتكم وتوجيهكم.',
      bg: 'bg-cyan-50',
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200/60 my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">لماذا يثق بنا آلاف الآباء والأمهات؟</h2>
          <p className="text-slate-500 text-sm">
            نحن نضع صحة طفلك وراحتك في المقام الأول من خلال خدماتنا المتميزة المعززة بالأمانة والدقة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl border border-slate-200/70 hover:border-emerald-200 hover:shadow-md transition-all flex flex-col items-center text-center group"
            >
              <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-2 flex items-center gap-1">
                <span>{item.title}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
