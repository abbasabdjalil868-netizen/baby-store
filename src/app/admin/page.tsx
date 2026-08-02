'use client';

import React, { useState } from 'react';
import { useCart, Order } from '../../context/CartContext';
import { Product, CATEGORIES, AGE_GROUPS } from '../../data/products';
import { BannerItem } from '../../data/banners';
import {
  Package,
  ShoppingBag,
  TrendingUp,
  Plus,
  Trash2,
  Edit,
  Clock,
  Settings,
  ArrowRight,
  ShieldAlert,
  Milk,
  Tag,
  Sparkles,
  Image as ImageIcon,
  Upload,
  Printer,
  X,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

export const BADGE_OPTIONS = [
  { value: '', label: 'بدون وسام ترويجي' },
  { value: 'الأكثر مبيعة', label: '🔥 الأكثر مبيعة' },
  { value: 'عرض خاص', label: '💥 عرض خاص' },
  { value: 'جديد', label: '✨ جديد' },
  { value: 'باقي 2 قطع فقط', label: '🔥 باقي 2 قطع فقط' },
  { value: 'باقي 3 قطع فقط', label: '⚡ باقي 3 قطع فقط' },
  { value: 'باقي 5 قطع فقط', label: '⚠️ باقي 5 قطع فقط' },
  { value: 'الكمية محدودة جداً', label: '📦 الكمية محدودة جداً' },
  { value: 'موصى به طبياً', label: '👨‍⚕️ موصى به طبياً' },
  { value: 'توفير عائلي', label: '🏷️ توفير عائلي' },
  { value: '100% طبيعي', label: '🌱 100% طبيعي' },
  { value: 'مجموعة قيمة', label: '🎁 مجموعة قيمة' },
  { value: 'خصم خاص', label: '⚡ خصم خاص' },
];

export default function AdminDashboard() {
  const {
    user,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    banners,
    addBanner,
    updateBanner,
    deleteBanner,
    orders,
    updateOrderStatus,
    deleteOrder,
    storePhone,
    setStorePhone,
    loginAdmin,
    showToast,
  } = useCart();

  const [activeTab, setActiveTab] = useState<'products' | 'banners' | 'orders' | 'settings'>('products');

  // Login form state for protected view
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [authError, setAuthError] = useState('');

  // Add/Edit Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form Fields for Products
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState<Product['category']>('milk');
  const [categoryName, setCategoryName] = useState('حليب طبي وصناعي');
  const [ageGroup, setAgeGroup] = useState<Product['ageGroup']>('0-6m');
  const [ageLabel, setAgeLabel] = useState('0-6 أشهر');
  const [price, setPrice] = useState<number>(15000);
  const [oldPrice, setOldPrice] = useState<number | undefined>(18000);
  const [stockCount, setStockCount] = useState<number>(20);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [unit, setUnit] = useState('علبة 400 غرام');
  const [badge, setBadge] = useState('');
  const [customBadge, setCustomBadge] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Add/Edit Banner Modal State
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [bannerBadge, setBannerBadge] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [bannerCtaText, setBannerCtaText] = useState('تصفح العروض الآن 🛒');

  // Invoice Print Modal State
  const [selectedPrintOrder, setSelectedPrintOrder] = useState<Order | null>(null);

  // Phone settings field
  const [phoneInput, setPhoneInput] = useState(storePhone);

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(adminUser, adminPass);
    if (!success) {
      setAuthError('اسم المستخدم أو كلمة السر غير صحيحة!');
    } else {
      setAuthError('');
    }
  };

  // Helper to handle Category change
  const handleCategorySelect = (catId: Product['category']) => {
    setCategory(catId);
    const catObj = CATEGORIES.find((c) => c.id === catId);
    if (catObj) {
      setCategoryName(catObj.name);
    }
  };

  // Helper to handle Age Group change
  const handleAgeGroupSelect = (ageId: Product['ageGroup']) => {
    setAgeGroup(ageId);
    const ageObj = AGE_GROUPS.find((a) => a.id === ageId);
    if (ageObj) {
      setAgeLabel(ageObj.label);
    }
  };

  // Automatic Client-Side Image Compressor (Reduces 5MB smartphone photo to 30KB)
  const handleImageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    targetSetter: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    showToast('جاري ضغط ومعالجة الصورة من الاستوديو... 🖼️');

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          targetSetter(compressedDataUrl);
          setIsUploadingImage(false);
          showToast('تم معالجة وضغط الصورة بنجاح! 📸✨');
        }
      };

      if (event.target?.result) {
        img.src = event.target.result.toString();
      }
    };

    reader.readAsDataURL(file);
  };

  const triggerWindowPrint = () => {
    window.print();
  };

  // If not logged in as Admin abbas / 20012001, render login screen
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 dir-rtl font-sans">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full border border-slate-200 text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <h1 className="text-xl font-extrabold text-slate-900 mb-1">لوحة تحكم الأدمن (بيبي كير)</h1>
          <p className="text-slate-500 text-xs mb-6">
            يرجى إدخال اسم المستخدم وكلمة السر المخصصة لإدارة المتجر والطلبات.
          </p>

          {authError && (
            <div className="bg-rose-50 text-rose-700 p-3 rounded-xl text-xs font-bold mb-4 border border-rose-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleAdminAuth} className="space-y-4 text-right">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">اسم المستخدم</label>
              <input
                type="text"
                required
                placeholder="أدخل اسم المستخدم"
                value={adminUser}
                onChange={(e) => setAdminUser(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">كلمة السر</label>
              <input
                type="password"
                required
                placeholder="أدخل كلمة السر"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl text-xs shadow-md transition-colors"
            >
              تسجيل الدخول كأدمن 🔑
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link href="/" className="text-xs text-emerald-600 font-semibold hover:underline">
              👈 العودة إلى المتجر
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Dashboard Stats
  const totalRevenue = orders
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;

  const handleOpenAddModal = (prod?: Product) => {
    if (prod) {
      setEditingProductId(prod.id);
      setName(prod.name);
      setBrand(prod.brand);
      setCategory(prod.category);
      setCategoryName(prod.categoryName);
      setAgeGroup(prod.ageGroup);
      setAgeLabel(prod.ageLabel);
      setPrice(prod.price);
      setOldPrice(prod.oldPrice);
      setStockCount(prod.stockCount ?? 20);
      setImage(prod.image);
      setDescription(prod.description);
      setUnit(prod.unit);
      const isPredefinedBadge = BADGE_OPTIONS.some(b => b.value === prod.badge);
      if (isPredefinedBadge) {
        setBadge(prod.badge || '');
        setCustomBadge('');
      } else {
        setBadge('custom');
        setCustomBadge(prod.badge || '');
      }
    } else {
      setEditingProductId(null);
      setName('');
      setBrand('');
      setCategory('milk');
      setCategoryName('حليب طبي وصناعي');
      setAgeGroup('0-6m');
      setAgeLabel('0-6 أشهر');
      setPrice(15000);
      setOldPrice(18000);
      setStockCount(20);
      setImage('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80');
      setDescription('');
      setUnit('علبة 400 غرام');
      setBadge('');
      setCustomBadge('');
    }
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image) return;

    const inStockStatus = stockCount > 0;
    const finalBadge = badge === 'custom' ? customBadge.trim() : badge;

    if (editingProductId) {
      updateProduct(editingProductId, {
        name,
        brand,
        category,
        categoryName,
        ageGroup,
        ageLabel,
        price,
        oldPrice: oldPrice || undefined,
        stockCount,
        inStock: inStockStatus,
        image,
        description,
        unit,
        badge: finalBadge || undefined,
      });
    } else {
      addProduct({
        name,
        brand,
        category,
        categoryName,
        ageGroup,
        ageLabel,
        price,
        oldPrice: oldPrice || undefined,
        stockCount,
        inStock: inStockStatus,
        image,
        description,
        features: ['منتج عالي الجودة لسلامة طفلك', 'شحن وتغليف طبي معتمد'],
        unit,
        badge: finalBadge || undefined,
      });
    }

    setIsAddModalOpen(false);
  };

  // Banner Modal Handlers
  const handleOpenBannerModal = (ban?: BannerItem) => {
    if (ban) {
      setEditingBannerId(ban.id);
      setBannerTitle(ban.title);
      setBannerSubtitle(ban.subtitle);
      setBannerBadge(ban.badge);
      setBannerImage(ban.image);
      setBannerCtaText(ban.ctaText || 'تصفح العروض الآن 🛒');
    } else {
      setEditingBannerId(null);
      setBannerTitle('');
      setBannerSubtitle('');
      setBannerBadge('تخفيضات مميزة 🍼');
      setBannerImage('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&auto=format&fit=crop&q=80');
      setBannerCtaText('تسوق الآن 🛒');
    }
    setIsBannerModalOpen(true);
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerTitle || !bannerImage) return;

    if (editingBannerId) {
      updateBanner(editingBannerId, {
        title: bannerTitle,
        subtitle: bannerSubtitle,
        badge: bannerBadge,
        image: bannerImage,
        ctaText: bannerCtaText,
      });
    } else {
      addBanner({
        title: bannerTitle,
        subtitle: bannerSubtitle,
        badge: bannerBadge,
        image: bannerImage,
        ctaText: bannerCtaText,
      });
    }

    setIsBannerModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneInput.trim()) {
      setStorePhone(phoneInput.trim());
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dir-rtl font-sans pb-12 print:bg-white print:p-0">
      {/* Admin Top Header (Hidden on Print) */}
      <header className="bg-slate-900 text-white sticky top-0 z-30 shadow-md print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
              <Milk className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm sm:text-lg flex items-center gap-2">
                <span>لوحة التحكم الكاملة (عباس)</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
                  أدمن مفعّل 🔑
                </span>
              </h1>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors"
          >
            <span>عرض المتجر</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          </Link>

        </div>
      </header>

      {/* Main Container (Hidden on Print) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 print:hidden">
        
        {/* KPI Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold block">إجمالي المبيعات المكتملة</span>
              <span className="text-xl font-extrabold text-slate-900">{totalRevenue.toLocaleString()} د.ع</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold block">طلبات بالانتظار</span>
              <span className="text-xl font-extrabold text-amber-600">{pendingOrdersCount} طلبات</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold block">إجمالي عدد الطلبات</span>
              <span className="text-xl font-extrabold text-slate-900">{orders.length} طلبات</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold block">المنتجات بالمتجر</span>
              <span className="text-xl font-extrabold text-slate-900">{products.length} منتج</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-6 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all shrink-0 ${
              activeTab === 'products'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>إدارة المنتجات والمخزون ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('banners')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all shrink-0 ${
              activeTab === 'banners'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>إدارة البنرات المتحركة 🎡 ({banners.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all shrink-0 relative ${
              activeTab === 'orders'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>طلبات الزبائن ({orders.length})</span>
            {pendingOrdersCount > 0 && (
              <span className="bg-amber-400 text-amber-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all shrink-0 ${
              activeTab === 'settings'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>إعدادات الواتساب والمحل</span>
          </button>
        </div>

        {/* Tab 1: Products Management */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between gap-3 mb-6">
              <h2 className="text-lg font-bold text-slate-900">قائمة ومخزون منتجات المتجر</h2>

              <button
                onClick={() => handleOpenAddModal()}
                className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة منتج جديد</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-bold">
                    <tr>
                      <th className="p-4">المنتج والوسام</th>
                      <th className="p-4">قسم المنتج والعمر</th>
                      <th className="p-4">السعر</th>
                      <th className="p-4">عدد القطع بالمخزن 📦</th>
                      <th className="p-4 text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-12 h-12 object-contain rounded-xl border border-slate-200 bg-slate-50 p-1"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-bold text-slate-800 line-clamp-1">{prod.name}</h4>
                                {prod.badge && (
                                  <span className="bg-amber-400 text-amber-950 font-extrabold text-[9px] px-2 py-0.5 rounded-full shrink-0">
                                    {prod.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400">{prod.brand} • {prod.unit}</span>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md w-fit text-[11px]">
                              🏷️ {prod.categoryName}
                            </span>
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full w-fit font-bold">
                              👶 {prod.ageLabel}
                            </span>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="font-extrabold text-emerald-700 text-sm">{prod.price.toLocaleString()} د.ع</span>
                            {prod.oldPrice && (
                              <span className="text-[10px] text-slate-400 line-through">
                                {prod.oldPrice.toLocaleString()} د.ع
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Stock Count Column */}
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              (prod.stockCount ?? 0) > 0
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                                : 'bg-rose-100 text-rose-800 border border-rose-200'
                            }`}>
                              {(prod.stockCount ?? 0) > 0 ? `${prod.stockCount ?? 20} قطعة متوفرة` : 'نفذت الكمية ❌'}
                            </span>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenAddModal(prod)}
                              className="p-2 text-slate-500 hover:text-emerald-600 bg-slate-100 hover:bg-emerald-50 rounded-xl transition-colors"
                              title="تعديل المنتج والوسام والتفاصيل"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => deleteProduct(prod.id)}
                              className="p-2 text-slate-500 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 rounded-xl transition-colors"
                              title="حذف المنتج"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Banners Management */}
        {activeTab === 'banners' && (
          <div>
            <div className="flex items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">إدارة صور ونصوص البنرات المتحركة (Carousel Banners)</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  يمكنك إضافة وتعديل صور ونصوص البنرات الرئيسية التي تظهر أعلى المتجر للزبائن.
                </p>
              </div>

              <button
                onClick={() => handleOpenBannerModal()}
                className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة بنر جديد 🎡</span>
              </button>
            </div>

            {/* Banners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {banners.map((ban, index) => (
                <div
                  key={ban.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div className="relative h-44 bg-slate-900">
                    <img
                      src={ban.image}
                      alt={ban.title}
                      className="w-full h-full object-cover filter brightness-[0.75]"
                    />
                    <span className="absolute top-3 right-3 bg-amber-400 text-amber-950 font-black text-xs px-3 py-1 rounded-full shadow-xs">
                      {ban.badge}
                    </span>
                    <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                      شريحة {index + 1}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base mb-1">{ban.title}</h3>
                      <p className="text-slate-600 text-xs mb-3">{ban.subtitle}</p>
                      <span className="bg-emerald-50 text-emerald-700 text-[11px] px-2.5 py-1 rounded-lg font-bold inline-block mb-4">
                        زر الإجراء: {ban.ctaText || 'تصفح العروض الآن 🛒'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
                      <button
                        onClick={() => handleOpenBannerModal(ban)}
                        className="flex-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>تعديل الصور والنص</span>
                      </button>

                      <button
                        onClick={() => deleteBanner(ban.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                        title="حذف البنر"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Orders Log with Printable Invoice Button */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4">سجل الطلبات الواردة عبر الواتساب</h2>

            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto my-8">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-800 text-base mb-1">لا توجد طلبات مسجلة حتى الآن</h3>
                <p className="text-slate-500 text-xs">
                  عندما يرسل الزبائن طلباتهم عبر الواتساب ستظهر تفاصيلها هنا تلقائياً.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">{ord.id}</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(ord.createdAt).toLocaleString('ar-IQ')}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            ord.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ord.status === 'cancelled'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {ord.status === 'completed'
                            ? 'مكتمل ومسلم'
                            : ord.status === 'cancelled'
                            ? 'ملغي'
                            : 'قيد التجهيز والتوصيل'}
                        </span>
                      </div>

                      <div className="text-xs text-slate-700 pt-1">
                        <strong>الزبون:</strong> {ord.customer.name} | <strong>الهاتف:</strong> {ord.customer.phone} |{' '}
                        <strong>العنوان:</strong> {ord.customer.address}
                      </div>

                      <div className="text-xs text-slate-500 font-medium">
                        المنتجات: {ord.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 border-t lg:border-t-0 pt-3 lg:pt-0 w-full lg:w-auto justify-between lg:justify-end">
                      <div className="text-left">
                        <span className="text-[10px] text-slate-400 block">المجموع النهائي:</span>
                        <span className="text-base font-extrabold text-emerald-700">
                          {ord.totalPrice.toLocaleString()} د.ع
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Print Invoice Button */}
                        <button
                          onClick={() => setSelectedPrintOrder(ord)}
                          className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-blue-50 hover:bg-blue-100 text-blue-800 transition-colors flex items-center gap-1 border border-blue-200"
                          title="طباعة الفاتورة ووصل التوصيل"
                        >
                          <Printer className="w-3.5 h-3.5 text-blue-600" />
                          <span>طباعة الفاتورة 🖨️</span>
                        </button>

                        <button
                          onClick={() =>
                            updateOrderStatus(
                              ord.id,
                              ord.status === 'completed' ? 'pending' : 'completed'
                            )
                          }
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors"
                        >
                          {ord.status === 'completed' ? 'تحديد كقيد الانتظار' : 'تحديد كمكتمل'}
                        </button>

                        <button
                          onClick={() => deleteOrder(ord.id)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                          title="حذف الطلب"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Store Settings */}
        {activeTab === 'settings' && (
          <div className="max-w-xl bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-2">تعديل رقم واتساب استقبال الطلبات</h2>
            <p className="text-xs text-slate-500 mb-6">
              أي طلب يقوم الزبون بإرساله سيصل مباشرة إلى هذا الرقم المعين.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  رقم الواتساب مع رمز الدولة (بدون +)
                </label>
                <input
                  type="text"
                  required
                  placeholder="9647725757873"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 text-left dir-ltr focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs shadow-sm transition-colors"
              >
                حفظ رقم الواتساب المحدث 📱
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs print:hidden">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-emerald-600" />
              <span>{editingProductId ? 'تعديل المنتج والوسام والتفاصيل' : 'إضافة منتج جديد مع وسام ترويجي'}</span>
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-right text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">اسم المنتج <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="مثال: حليب أبتاميل 400غ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold"
                />
              </div>

              {/* Promotional Badge Selector */}
              <div className="bg-amber-50/80 p-3 rounded-2xl border border-amber-200 space-y-2">
                <label className="block font-bold text-amber-950 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                  <span>الوسام الترويجي فوق المنتج (Badge)</span>
                </label>
                
                <select
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full bg-white border border-amber-300 font-bold rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-500"
                >
                  {BADGE_OPTIONS.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                  <option value="custom">✏️ كتابة وسام ترويجي مخصص...</option>
                </select>

                {badge === 'custom' && (
                  <input
                    type="text"
                    required
                    placeholder="اكتب الوسام هنا (مثال: باقي 2 قطع فقط، خصم 30%...)"
                    value={customBadge}
                    onChange={(e) => setCustomBadge(e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl px-3 py-1.5 text-slate-800 font-bold mt-1"
                  />
                )}
              </div>

              {/* Category & Age Group Selectors */}
              <div className="grid grid-cols-2 gap-3 bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100">
                <div>
                  <label className="block font-bold text-emerald-900 mb-1">قسم المنتج 🏷️ <span className="text-rose-500">*</span></label>
                  <select
                    value={category}
                    onChange={(e) => handleCategorySelect(e.target.value as Product['category'])}
                    className="w-full bg-white border border-emerald-300 font-bold rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-600"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-emerald-900 mb-1">الفئة العمرية 👶 <span className="text-rose-500">*</span></label>
                  <select
                    value={ageGroup}
                    onChange={(e) => handleAgeGroupSelect(e.target.value as Product['ageGroup'])}
                    className="w-full bg-white border border-emerald-300 font-bold rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-600"
                  >
                    {AGE_GROUPS.map((age) => (
                      <option key={age.id} value={age.id}>
                        {age.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">الماركة (Brand)</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: Aptamil"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">الوحدة / الحجم</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: علبة 400 غرام"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">السعر (د.ع)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">السعر السابق</label>
                  <input
                    type="number"
                    value={oldPrice || ''}
                    onChange={(e) => setOldPrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-emerald-800 mb-1">العدد بالمخزن 📦</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={stockCount}
                    onChange={(e) => setStockCount(Number(e.target.value))}
                    className="w-full bg-emerald-50 border border-emerald-300 font-bold rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              {/* Product Image Field with Auto-Compressing File Reader */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  صورة المنتج (رابط أونلاين أو اختيار مباشر من استوديو هاتفك) <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="https://... أو اختر من الاستوديو"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 dir-ltr text-left"
                  />
                  <label className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer shrink-0 shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploadingImage ? 'جاري الضغط...' : '📁 الاستوديو'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFileUpload(e, setImage)}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">الوصف التفصيلي للمنتج</label>
                <textarea
                  rows={2}
                  placeholder="اكتب وصفاً مختصراً لفوائد هذا المنتج..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={isUploadingImage}
                  className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 rounded-xl shadow-sm disabled:opacity-50"
                >
                  حفظ المنتج مع الوسام 💾
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Banner Modal */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs print:hidden">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-emerald-600" />
              <span>{editingBannerId ? 'تعديل صورة ونص البنر' : 'إضافة بنر متحرك جديد 🎡'}</span>
            </h3>

            <form onSubmit={handleSaveBanner} className="space-y-3 text-right text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">العنوان الرئيسي للبنر <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="مثال: عروض التوفير العائلي على جميع الحفاضات"
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">الوصف الفرعي للبنر</label>
                <input
                  type="text"
                  placeholder="مثال: توصيل سريع وحصري لكافة المحافظات"
                  value={bannerSubtitle}
                  onChange={(e) => setBannerSubtitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">الوسام الترويجي البارز</label>
                <input
                  type="text"
                  placeholder="مثال: خصم 25% 🍼"
                  value={bannerBadge}
                  onChange={(e) => setBannerBadge(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold"
                />
              </div>

              {/* Banner Image Field with Auto-Compressing File Reader */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  رابط صورة البنر خلفية (أو اختيار مباشر من استوديو هاتفك) <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="https://... أو اختر من الاستوديو"
                    value={bannerImage}
                    onChange={(e) => setBannerImage(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 dir-ltr text-left font-mono"
                  />
                  <label className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer shrink-0 shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploadingImage ? 'جاري الضغط...' : '📁 الاستوديو'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFileUpload(e, setBannerImage)}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">نص الزر التفاعلي</label>
                <input
                  type="text"
                  placeholder="مثال: تصفح العروض الآن 🛒"
                  value={bannerCtaText}
                  onChange={(e) => setBannerCtaText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={isUploadingImage}
                  className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 rounded-xl shadow-sm disabled:opacity-50"
                >
                  حفظ البنر 💾
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Invoice Modal / Window */}
      {selectedPrintOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs dir-rtl">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 relative max-h-[95vh] overflow-y-auto print:max-w-none print:w-full print:p-0 print:shadow-none print:border-none print:rounded-none">
            
            {/* Action Bar (Hidden on Print) */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 print:hidden">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm">
                <Printer className="w-5 h-5 text-emerald-600" />
                <span>معاينة الفاتورة الجاهزة للطباعة</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={triggerWindowPrint}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 py-2 rounded-xl text-xs shadow-md transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة الوصل الآن 🖨️</span>
                </button>

                <button
                  onClick={() => setSelectedPrintOrder(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Invoice Content Sheet */}
            <div className="p-4 sm:p-6 border border-slate-300 rounded-2xl bg-white text-slate-900 font-sans print:border-none print:p-0">
              
              {/* Receipt Header */}
              <div className="flex items-center justify-between pb-6 border-b-2 border-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-xs">
                    🍼
                  </div>
                  <div>
                    <h1 className="text-xl font-black text-slate-900">متجر بيبي كير مستلزمات الأطفال</h1>
                    <p className="text-xs text-slate-600 font-bold">Baby Care Store • هاتف: 07725757873</p>
                  </div>
                </div>

                <div className="text-left">
                  <span className="inline-block bg-slate-900 text-white font-black text-xs px-3 py-1 rounded-md mb-1">
                    فاتورة توصيل # {selectedPrintOrder.id}
                  </span>
                  <span className="block text-[11px] text-slate-500 font-bold">
                    التاريخ: {new Date(selectedPrintOrder.createdAt).toLocaleDateString('ar-IQ')}
                  </span>
                </div>
              </div>

              {/* Customer Shipping Info Box */}
              <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-xs font-black text-slate-900 mb-2 underline decoration-emerald-500 decoration-2">
                  بيانات الزبون وعنوان التوصيل:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800">
                  <div><strong>اسم الزبون:</strong> {selectedPrintOrder.customer.name}</div>
                  <div><strong>رقم الهاتف:</strong> {selectedPrintOrder.customer.phone}</div>
                  <div className="sm:col-span-2"><strong>عنوان التوصيل:</strong> {selectedPrintOrder.customer.address}</div>
                  <div><strong>طريقة الدفع:</strong> <span className="font-extrabold text-emerald-800">الدفع عند الاستلام (COD)</span></div>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-6 overflow-x-auto">
                <table className="w-full text-right text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white font-bold">
                      <th className="p-2.5 border border-slate-900">#</th>
                      <th className="p-2.5 border border-slate-900">اسم المادة والمواصفات</th>
                      <th className="p-2.5 border border-slate-900 text-center">الكمية</th>
                      <th className="p-2.5 border border-slate-900">سعر المفرد</th>
                      <th className="p-2.5 border border-slate-900">المجموع</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPrintOrder.items.map((item, index) => (
                      <tr key={index} className="border-b border-slate-200">
                        <td className="p-2.5 border border-slate-200 text-center font-bold">{index + 1}</td>
                        <td className="p-2.5 border border-slate-200 font-bold">
                          {item.product.name} ({item.product.brand})
                        </td>
                        <td className="p-2.5 border border-slate-200 text-center font-black text-sm">
                          {item.quantity}
                        </td>
                        <td className="p-2.5 border border-slate-200">
                          {item.product.price.toLocaleString()} د.ع
                        </td>
                        <td className="p-2.5 border border-slate-200 font-bold text-emerald-800">
                          {(item.product.price * item.quantity).toLocaleString()} د.ع
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Totals Summary Box */}
              <div className="flex justify-end mb-6">
                <div className="w-full sm:w-72 bg-slate-50 p-4 rounded-xl border border-slate-300 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>مجموع المواد:</span>
                    <span className="font-bold">{selectedPrintOrder.subtotal.toLocaleString()} د.ع</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>أجور التوصيل:</span>
                    <span className="font-bold">
                      {selectedPrintOrder.shippingFee === 0 ? 'مجاني 🚚' : `${selectedPrintOrder.shippingFee.toLocaleString()} د.ع`}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-300">
                    <span>المبلغ النهائي المطلوب عند التسليم:</span>
                    <span className="text-emerald-700 text-base">{selectedPrintOrder.totalPrice.toLocaleString()} د.ع</span>
                  </div>
                </div>
              </div>

              {/* Invoice Footer */}
              <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1">
                <p className="font-bold text-slate-800 flex items-center justify-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600 inline" />
                  <span>شكراً لثقتكم بمتجر بيبي كير 👶🍼 نتمنى لطفلكم وافر الصحة والعافية!</span>
                </p>
                <p className="text-[10px] text-slate-400">لأي استفسار يرجى الاتصال بنا عبر الرقم: 07725757873</p>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
