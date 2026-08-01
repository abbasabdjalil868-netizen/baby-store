'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Truck,
  ShieldCheck,
  User,
  Phone,
  MapPin,
  FileText,
  AlertCircle
} from 'lucide-react';
import { generateWhatsAppOrderUrl, CustomerDetails } from '../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    totalPrice,
    progressToFreeShipping,
    freeShippingThreshold,
    clearCart,
    addOrder,
    storePhone
  } = useCart();

  // Customer Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setFormError('يرجى تعبئة جميع الحقول المطلوبة (الاسم، الهاتف، العنوان)');
      return;
    }
    setFormError(null);

    const customer: CustomerDetails = {
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      notes: notes.trim(),
      paymentMethod: 'cod',
    };

    // Log Order into Admin Dashboard History
    addOrder(customer);

    // Launch WhatsApp
    const url = generateWhatsAppOrderUrl(cart, customer, subtotal, shippingFee, totalPrice, storePhone);
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-extrabold text-slate-800 text-lg">سلة التسوق</h2>
                  <p className="text-xs text-slate-500">
                    {cart.length === 0 ? 'السلة فارغة' : `${cart.length} منتجات في السلة`}
                  </p>
                </div>
              </div>

              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full bg-white hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors border border-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            {cart.length > 0 && (
              <div className="bg-emerald-50 px-5 py-3 border-b border-emerald-100">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-900 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    {subtotal >= freeShippingThreshold ? (
                      <span className="text-emerald-700 font-extrabold">مبروك! حصلت على توصيل مجاني 🎉</span>
                    ) : (
                      <span>
                        أضف <strong>{freeShippingThreshold - subtotal} ر.س</strong> إضافية للتوصيل المجاني
                      </span>
                    )}
                  </span>
                </div>
                <div className="w-full bg-emerald-200/70 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-1">سلتك فارغة حالياً</h3>
                  <p className="text-slate-400 text-xs max-w-xs mx-auto mb-6">
                    استكشف تشكيلة حليب ومستلزمات الأطفال الممتازة وأضف منتجاتك المفضلة هنا.
                  </p>
                  <button
                    onClick={closeCart}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-2xl transition-colors shadow-sm"
                  >
                    تصفح المنتجات الآن 👶
                  </button>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <span>المنتجات المختارة</span>
                      <button
                        onClick={clearCart}
                        className="text-rose-500 hover:text-rose-600 font-semibold"
                      >
                        تفريغ السلة
                      </button>
                    </div>

                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/70"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-xl bg-white border border-slate-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <span className="text-xs text-slate-400 block mb-1">
                            {item.product.price} ر.س / للقطعة
                          </span>

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-7 text-center text-xs font-bold text-slate-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-sm font-extrabold text-emerald-700">
                              {item.product.price * item.quantity} ر.س
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 rounded-lg transition-colors"
                          title="حذف المنتج"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Customer Info Form */}
                  <form onSubmit={handleWhatsAppCheckout} className="space-y-4 pt-4 border-t border-slate-100">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                      <User className="w-4 h-4 text-emerald-600" />
                      <span>بيانات الشحن والتوصيل</span>
                    </h3>

                    {formError && (
                      <div className="bg-rose-50 border border-rose-200 text-rose-700 p-2.5 rounded-xl text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          الاسم الكامل <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="مثال: أحمد علي"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 pr-9 pl-3 py-2 rounded-xl text-xs focus:outline-none focus:border-emerald-500 focus:bg-white"
                          />
                          <User className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          رقم الهاتف / الواتساب <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            placeholder="مثال: 07700000000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 pr-9 pl-3 py-2 rounded-xl text-xs focus:outline-none focus:border-emerald-500 focus:bg-white"
                          />
                          <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          المدينة والعنوان التفصيلي <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="مثال: بغداد / المنصور / حي الأشجار"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 pr-9 pl-3 py-2 rounded-xl text-xs focus:outline-none focus:border-emerald-500 focus:bg-white"
                          />
                          <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          ملاحظات إضافية (اختياري)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="مثال: الاتصال قبل الوصول بـ 30 دقيقة"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 pr-9 pl-3 py-2 rounded-xl text-xs focus:outline-none focus:border-emerald-500 focus:bg-white"
                          />
                          <FileText className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                    </div>

                    {/* Payment Method Selector */}
                    <div className="pt-2">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        طريقة الدفع المختارة:
                      </label>
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-900 font-bold">
                        <span className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-amber-600" />
                          <span>💵 الدفع نقداً عند الاستلام (COD)</span>
                        </span>
                        <span className="bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full text-[10px]">
                          مفعل تلقائياً
                        </span>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* Footer Summary & WhatsApp Order Launcher */}
            {cart.length > 0 && (
              <div className="p-5 bg-slate-50 border-t border-slate-200/80 space-y-3">
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>مجموع المنتجات:</span>
                    <span className="font-semibold text-slate-800">{subtotal} ر.س</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>كلفة التوصيل:</span>
                    <span className="font-semibold text-slate-800">
                      {shippingFee === 0 ? (
                        <strong className="text-emerald-600 font-bold">مجاني</strong>
                      ) : (
                        `${shippingFee} ر.س`
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                    <span>المجموع الإجمالي:</span>
                    <span className="text-emerald-700">{totalPrice} ر.س</span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-lg shadow-emerald-600/25 active:scale-98 transition-all flex items-center justify-center gap-2.5 text-sm"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>إرسال الطلب عبر الواتساب (WhatsApp)</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
