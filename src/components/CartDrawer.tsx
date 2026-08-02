'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { generateWhatsAppOrderUrl } from '../utils/whatsapp';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, CheckCircle2, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shippingFee,
    totalPrice,
    freeShippingThreshold,
    progressToFreeShipping,
    addOrder,
    storePhone,
    showToast,
  } = useCart();

  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      setFormError('يرجى ملء جميع الحقول المطلوبة (الاسم، الهاتف، العنوان)');
      return;
    }

    setFormError('');
    setIsSubmittingOrder(true);

    const customerDetails = {
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
      notes: customerNotes,
      paymentMethod: 'cod' as const,
    };

    try {
      // 1. AWAIT saving the order to Cloud DB BEFORE redirecting to WhatsApp
      await addOrder(customerDetails);

      // 2. Build WhatsApp URL
      const url = generateWhatsAppOrderUrl(
        cart,
        customerDetails,
        subtotal,
        shippingFee,
        totalPrice,
        storePhone
      );

      // 3. Clear Cart completely after sending order
      clearCart();

      // 4. Open WhatsApp
      window.open(url, '_blank');

      // 5. Toast notification & Reset Drawer state
      showToast('تم تسجيل الطلب وإرساله للواتساب بنجاح! 🛒✨');
      setStep('cart');
      closeCart();
    } catch (err) {
      console.error('Order submission error:', err);
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden dir-rtl">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 left-0 max-w-full flex">
          {/* Drawer Slide Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-r border-slate-200"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-6 border-b border-slate-100 bg-emerald-50/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-slate-800 text-base sm:text-lg">
                      {step === 'cart' ? 'سلة التسوق' : 'إتمام الطلب والدفع'}
                    </h2>
                    <p className="text-slate-500 text-xs">
                      {step === 'cart' ? `${cart.length} منتجات مضافة` : 'أدخل بيانات التوصيل المباشر'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeCart}
                  className="w-9 h-9 bg-white text-slate-400 hover:text-slate-700 rounded-full flex items-center justify-center border border-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              {cart.length > 0 && (
                <div className="mt-4 pt-3 border-t border-emerald-100">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="flex items-center gap-1 text-emerald-800">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      {subtotal >= freeShippingThreshold ? (
                        <span className="text-emerald-700 font-extrabold">مبروك! حصلت على توصيل مجاني 🎉</span>
                      ) : (
                        <span>أضف بـ <strong className="text-emerald-700">{remainingForFreeShipping.toLocaleString()} د.ع</strong> للحصول على توصيل مجاني</span>
                      )}
                    </span>
                    <span className="text-emerald-600 text-[10px] font-bold">{Math.round(progressToFreeShipping)}%</span>
                  </div>

                  <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Step 1: Cart Items List */}
            {step === 'cart' ? (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 my-12">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg mb-1">سلتك فارغة حالياً</h3>
                    <p className="text-slate-500 text-xs mb-6 max-w-xs leading-relaxed">
                      تصفح تشكيلة منتجات الحليب وحفاضات الأطفال وأضف ما يحتاجه طفلك للسلة.
                    </p>
                    <button
                      onClick={closeCart}
                      className="bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-sm hover:bg-emerald-700 transition-colors"
                    >
                      تصفح المنتجات الآن
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 p-3 bg-slate-50/80 rounded-2xl border border-slate-200/70 relative"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-xl bg-white shrink-0 border border-slate-100"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-slate-400 mb-1.5 font-medium">
                          {item.product.unit}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-emerald-700 text-sm">
                            {(item.product.price * item.quantity).toLocaleString()} د.ع
                          </span>

                          <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-100"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-300 hover:text-rose-500 p-1 transition-colors self-start"
                        title="حذف المنتج"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            ) : (
              /* Step 2: Checkout Form */
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3.5 rounded-2xl text-xs flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">خيار الدفع المعتمد: الدفع عند الاستلام 💵</p>
                      <p className="text-[11px] text-amber-700 mt-0.5">
                        سيتم تجهيز طلبك وإرسال تفاصيله للواتساب للتأكيد والتوصيل لعنوانك مباشرة.
                      </p>
                    </div>
                  </div>

                  {formError && (
                    <div className="bg-rose-50 text-rose-700 p-3 rounded-xl text-xs font-bold border border-rose-200">
                      {formError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      اسم الزبون الكريم <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: علي محمد"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      رقم الهاتف / الواتساب <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="07725757873"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white text-left dir-ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      العنوان المباشر (المحافظة / المنطقة / أقرب نقطة دالة) <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="بغداد - الكرادة - شارع 62 - قرب صيدلية..."
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ملاحظات خاصة بالطلب (اختياري)
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: يرجى التوصيل بعد الساعة 4 عصراً"
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white"
                    />
                  </div>
                </form>
              </div>
            )}

            {/* Footer Calculation & Sticky Submit */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/90 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>مجموع المنتجات:</span>
                    <span className="font-semibold">{subtotal.toLocaleString()} د.ع</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>كلفة التوصيل:</span>
                    <span className="font-semibold text-emerald-700">
                      {shippingFee === 0 ? 'مجاني 🎉' : `${shippingFee.toLocaleString()} د.ع`}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-2 border-t border-slate-200">
                    <span>المجموع النهائي:</span>
                    <span className="text-emerald-700 text-base">{totalPrice.toLocaleString()} د.ع</span>
                  </div>
                </div>

                {step === 'cart' ? (
                  <button
                    onClick={() => setStep('checkout')}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-md text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <span>متابعة إتمام الطلب والدفع</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={isSubmittingOrder}
                      onClick={() => setStep('cart')}
                      className="bg-white border border-slate-200 text-slate-600 font-bold py-3 px-4 rounded-2xl text-xs hover:bg-slate-100 disabled:opacity-50"
                    >
                      رجوع للسلة
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmittingOrder}
                      form="checkout-form"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-md text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmittingOrder ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>جاري التسجيل أونلاين...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>تأكيد وإرسال للواتساب 📱</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
