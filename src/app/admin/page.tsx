'use client';

import React, { useState, useEffect } from 'react';
import { useCart, Order } from '../../context/CartContext';
import { Product, CATEGORIES, AGE_GROUPS } from '../../data/products';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Settings,
  Plus,
  Edit,
  Trash2,
  Phone,
  MessageCircle,
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles,
  Milk,
  Save,
  RotateCcw,
  X,
  Lock,
  LogOut,
  User,
  ShieldAlert
} from 'lucide-react';
import Link from 'next/link';
import { Toast } from '../../components/Toast';

export default function AdminPage() {
  const {
    user,
    loginAdmin,
    logoutUser,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    orders,
    updateOrderStatus,
    deleteOrder,
    storePhone,
    setStorePhone,
  } = useCart();

  // Credentials input state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'settings'>('dashboard');

  // Modal State for Adding/Editing Product
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State for New Product
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState<Product['category']>('milk');
  const [categoryName, setCategoryName] = useState('حليب طبي وصناعي');
  const [ageGroup, setAgeGroup] = useState<Product['ageGroup']>('0-6m');
  const [ageLabel, setAgeLabel] = useState('0-6 أشهر');
  const [price, setPrice] = useState<number>(50);
  const [oldPrice, setOldPrice] = useState<number | undefined>(undefined);
  const [unit, setUnit] = useState('علبة واحدة');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [badge, setBadge] = useState('');
  const [inStock, setInStock] = useState(true);
  const [features, setFeatures] = useState('منتج عالي الجودة, آمن للطفل');

  // Settings state
  const [tempPhone, setTempPhone] = useState(storePhone);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const success = loginAdmin(usernameInput, passwordInput);
    if (!success) {
      setAuthError('اسم المستخدم أو كلمة السر غير صحيحة! يرجى إدخال اسم المستخدم abbas وكلمة السر 20012001');
    }
  };

  const isAdminAuthenticated = user?.role === 'admin';

  // Computations for dashboard
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  const handleOpenAddModal = () => {
    setName('');
    setBrand('');
    setCategory('milk');
    setCategoryName('حليب طبي وصناعي');
    setAgeGroup('0-6m');
    setAgeLabel('0-6 أشهر');
    setPrice(50);
    setOldPrice(undefined);
    setUnit('علبة واحدة');
    setImage('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80');
    setDescription('منتج رعاية وتغذية ممتاز للطفل.');
    setBadge('');
    setInStock(true);
    setFeatures('موصى به طبيًا, آمن ومضمون');
    setIsAddModalOpen(true);
  };

  const handleSaveNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image) return;

    const feats = features.split(',').map((f) => f.trim()).filter(Boolean);

    addProduct({
      name,
      brand: brand || 'ماركة أصلية',
      category,
      categoryName: CATEGORIES.find((c) => c.id === category)?.name || categoryName,
      ageGroup,
      ageLabel: AGE_GROUPS.find((a) => a.id === ageGroup)?.label || ageLabel,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      unit: unit || 'قطعة واحدة',
      image,
      description,
      features: feats.length > 0 ? feats : ['منتج عالي الجودة'],
      badge: badge.trim() || undefined,
      inStock,
    });

    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
  };

  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      ...editingProduct,
      price: Number(editingProduct.price),
      oldPrice: editingProduct.oldPrice ? Number(editingProduct.oldPrice) : undefined,
    });

    setEditingProduct(null);
  };

  // -------------------------------------------------------------
  // UNAUTHENTICATED ADMIN LOGIN SCREEN (abbas / 20012001)
  // -------------------------------------------------------------
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 dir-rtl">
        <div className="bg-slate-800 border border-slate-700 max-w-md w-full rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">تسجيل دخول الأدمن</h1>
            <p className="text-xs text-slate-400">
              يرجى إدخال اسم المستخدم وكلمة السر المعتمدة للأدمن للمتابعة.
            </p>
          </div>

          {authError && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-2xl text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1.5">اسم المستخدم (Username):</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="مثال: abbas"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-500 pr-10 pl-4 py-3 rounded-2xl text-sm font-mono focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">كلمة السر (Password):</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-500 pr-10 pl-4 py-3 rounded-2xl text-sm font-mono focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-emerald-500/25 active:scale-98"
            >
              فتح لوحة الأدمن 🔓
            </button>
          </form>

          <div className="pt-4 border-t border-slate-700/60 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
            >
              <span>العودة لمتجر الزبائن</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD (Logged in as abbas)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col dir-rtl">
      
      {/* Top Navbar Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-xs">
              <Milk className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg flex items-center gap-2">
                لوحة تحكم الأدمن (عباس) 🔑
              </h1>
              <span className="text-[11px] text-emerald-400 font-medium">منطقة محمية - متجر بيبي كير</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logoutUser}
              className="flex items-center gap-1.5 bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors"
              title="تسجيل الخروج وقفل اللوحة"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">تسجيل الخروج</span>
            </button>

            <Link
              href="/"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-colors shadow-xs"
            >
              <span>المتجر الرئيسي</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3">
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80 sticky top-24 space-y-1">
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>لوحة الإحصائيات</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-colors ${
                activeTab === 'products'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Package className="w-5 h-5" />
              <span>إدارة المنتجات ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-colors ${
                activeTab === 'orders'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <span>إدارة الطلبات الواردة</span>
              </div>
              {pendingOrders > 0 && (
                <span className="bg-amber-400 text-amber-950 text-xs px-2 py-0.5 rounded-full font-extrabold">
                  {pendingOrders}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-colors ${
                activeTab === 'settings'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>إعدادات المتجر</span>
            </button>

          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: Dashboard Overview */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                
                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-bold block mb-1">إجمالي المبيعات</span>
                    <span className="text-2xl font-extrabold text-slate-900">{totalRevenue} ر.س</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-bold block mb-1">الطلبات المسجلة</span>
                    <span className="text-2xl font-extrabold text-slate-900">{orders.length} طلب</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-bold block mb-1">المنتجات النشطة</span>
                    <span className="text-2xl font-extrabold text-slate-900">{products.length} منتج</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                    <Package className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-bold block mb-1">الطلبات قيد التجهيز</span>
                    <span className="text-2xl font-extrabold text-amber-600">{pendingOrders} طلب</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>

              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>إجراءات سريعة للأدمن عباس</span>
                </h2>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleOpenAddModal}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-2xl text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة منتج جديد للمتجر</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('orders')}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-2.5 rounded-2xl text-xs sm:text-sm transition-colors flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>عرض سجل الطلبات الواردة</span>
                  </button>
                </div>
              </div>

              {/* Recent Logged Orders Table */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
                <h2 className="text-lg font-bold text-slate-900 mb-4">آخر الطلبات المسجلة من الزبائن</h2>
                {orders.length === 0 ? (
                  <p className="text-slate-400 text-xs text-center py-6">لا توجد طلبات مسجلة بعد.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                      <thead className="bg-slate-50 text-slate-500 font-bold">
                        <tr>
                          <th className="p-3">رقم الطلب</th>
                          <th className="p-3">الزبون</th>
                          <th className="p-3">الهاتف</th>
                          <th className="p-3">العنوان</th>
                          <th className="p-3">المجموع</th>
                          <th className="p-3">الحالة</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50">
                            <td className="p-3 font-extrabold text-slate-900">{order.id}</td>
                            <td className="p-3 font-bold text-slate-800">{order.customer.name}</td>
                            <td className="p-3 text-slate-600" dir="ltr">{order.customer.phone}</td>
                            <td className="p-3 text-slate-600">{order.customer.address}</td>
                            <td className="p-3 font-extrabold text-emerald-700">{order.totalPrice} ر.س</td>
                            <td className="p-3">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  order.status === 'completed'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : order.status === 'cancelled'
                                    ? 'bg-rose-100 text-rose-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {order.status === 'completed'
                                  ? 'مكتمل'
                                  : order.status === 'cancelled'
                                  ? 'ملغي'
                                  : 'قيد التجهيز'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: Manage Products */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">إدارة المنتجات المخزنة</h2>
                  <p className="text-xs text-slate-500 mt-0.5">يمكنك إضافة، تعديل، حذف المنتجات أو تغيير حالة التوفر فورياً.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenAddModal}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-2xl text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>منتج جديد</span>
                  </button>

                  <button
                    onClick={resetProductsToDefault}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-2.5 rounded-2xl text-xs transition-colors flex items-center gap-1.5"
                    title="استعادة القائمة الافتراضية"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="hidden sm:inline">افتراضي</span>
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">المنتج</th>
                        <th className="p-3">الفئة والعمر</th>
                        <th className="p-3">السعر</th>
                        <th className="p-3">المخزون</th>
                        <th className="p-3 text-center">التحكم</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-12 h-12 object-cover rounded-xl border border-slate-200 shrink-0"
                            />
                            <div>
                              <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">{p.name}</h4>
                              <span className="text-[11px] text-slate-400">{p.brand} ({p.unit})</span>
                            </div>
                          </td>

                          <td className="p-3">
                            <span className="block font-semibold text-slate-700">{p.categoryName}</span>
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full inline-block mt-0.5">
                              {p.ageLabel}
                            </span>
                          </td>

                          <td className="p-3 font-extrabold text-emerald-700 whitespace-nowrap">
                            {p.price} ر.س
                            {p.oldPrice && (
                              <span className="text-[10px] text-slate-400 line-through block font-normal">
                                {p.oldPrice} ر.س
                              </span>
                            )}
                          </td>

                          <td className="p-3">
                            <button
                              onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors ${
                                p.inStock
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                              }`}
                            >
                              {p.inStock ? 'متوفر ✓' : 'غير متوفر ✕'}
                            </button>
                          </td>

                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleOpenEditModal(p)}
                                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                                title="تعديل"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteProduct(p.id)}
                                className="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors"
                                title="حذف"
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

          {/* TAB 3: Manage Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                <h2 className="text-xl font-extrabold text-slate-900">سجل طلبات الواتساب الواردة</h2>
                <p className="text-xs text-slate-500 mt-0.5">يتم حفظ الطلبات أوتوماتيكياً عندما يضغط الزبون على زر الواتساب بالسلة.</p>
              </div>

              {orders.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-slate-200/80 text-center text-slate-400">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p className="font-bold text-slate-700">لا توجد طلبات مسجلة حتى الآن</p>
                  <p className="text-xs text-slate-400 mt-1">ستظهر هنا جميع الطلبات المرسلة عبر السلة فور إرسالها.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-extrabold text-base text-slate-900">{order.id}</span>
                          <span className="text-xs text-slate-400">
                            {new Date(order.createdAt).toLocaleDateString('ar-EG', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl">
                          <div>
                            <span className="text-slate-400 font-semibold block">الزبون:</span>
                            <strong className="text-slate-900">{order.customer.name}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 font-semibold block">الهاتف:</span>
                            <span dir="ltr" className="font-mono font-bold text-slate-800">{order.customer.phone}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-semibold block">العنوان:</span>
                            <span>{order.customer.address}</span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="pt-2">
                          <span className="text-xs font-bold text-slate-500 block mb-1">المنتجات:</span>
                          <div className="flex flex-wrap gap-2">
                            {order.items.map((item, idx) => (
                              <span
                                key={idx}
                                className="bg-emerald-50 text-emerald-900 text-xs px-2.5 py-1 rounded-xl font-medium border border-emerald-100"
                              >
                                {item.product.name} (x{item.quantity})
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row lg:flex-col items-end justify-between gap-4 border-t lg:border-t-0 lg:border-r border-slate-100 pt-4 lg:pt-0 lg:pr-6 shrink-0">
                        <div className="text-right">
                          <span className="text-xs text-slate-400 block font-semibold">المجموع الإجمالي:</span>
                          <span className="text-2xl font-extrabold text-emerald-700">{order.totalPrice} ر.س</span>
                        </div>

                        {/* Order Actions */}
                        <div className="flex items-center gap-2">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl focus:outline-none focus:border-emerald-500"
                          >
                            <option value="pending">قيد التجهيز</option>
                            <option value="completed">مكتمل ✓</option>
                            <option value="cancelled">ملغي ✕</option>
                          </select>

                          <a
                            href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl transition-colors"
                            title="تواصل مباشر عبر الواتساب"
                          >
                            <MessageCircle className="w-4 h-4 fill-current" />
                          </a>

                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-2 rounded-xl transition-colors"
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

          {/* TAB 4: Store Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <h2 className="text-xl font-extrabold text-slate-900">إعدادات المتجر ورقم الواتساب</h2>

                {/* Store WhatsApp Phone */}
                <div className="max-w-md space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    رقم واتساب المتجر لتلقي الطلبات (صيغة عالمية بدون +):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tempPhone}
                      onChange={(e) => setTempPhone(e.target.value)}
                      placeholder="9647700000000"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-2.5 rounded-xl text-xs focus:outline-none focus:border-emerald-500 font-mono"
                    />
                    <button
                      onClick={() => setStorePhone(tempPhone)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>حفظ</span>
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400 block">
                    سيتم تحويل جميع رسائل الواتساب الصادرة من السلة إلى هذا الرقم تلقائياً.
                  </span>
                </div>

              </div>

            </div>
          )}

        </main>

      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 my-8 border border-rose-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-lg">إضافة منتج جديد للمتجر</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">اسم المنتج *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: حليب بيبيلاك مرحلة 1"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">الماركة / الشركة</label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="مثال: Bebelac"
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">الوحدة / العبوة</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="مثال: علبة 400غ"
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">الفئة *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Product['category'])}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800"
                  >
                    <option value="milk">حليب طبي وصناعي</option>
                    <option value="diapers">حفاضات ومنديل عناية</option>
                    <option value="hygiene">عناية واستحمام</option>
                    <option value="feeding">رضّاعات ومستلزمات</option>
                    <option value="toys">عضاضات وألعاب</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">الفئة العمرية *</label>
                  <select
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value as Product['ageGroup'])}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800"
                  >
                    <option value="0-6m">حديثي الولادة (0-6 أشهر)</option>
                    <option value="6-12m">6-12 شهر</option>
                    <option value="1-3y">1-3 سنوات</option>
                    <option value="all">كل الأعمار</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">السعر (ر.س) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">السعر السابق (خصم اختياري)</label>
                  <input
                    type="number"
                    value={oldPrice || ''}
                    onChange={(e) => setOldPrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">رابط صورة المنتج (URL) *</label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">وصف المنتج</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">شارة مميزة (مثال: الأكثر مبيعاً)</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={inStock}
                      onChange={(e) => setInStock(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600 rounded"
                    />
                    <span>المنتج متوفر بالمخزون</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-extrabold shadow-md"
                >
                  حفظ ونشر المنتج
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 my-8 border border-rose-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-lg">تعديل المنتج: {editingProduct.name}</h3>
              <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">اسم المنتج</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">السعر (ر.س)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">السعر السابق</label>
                  <input
                    type="number"
                    value={editingProduct.oldPrice || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        oldPrice: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">شارة مميزة</label>
                <input
                  type="text"
                  value={editingProduct.badge || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800"
                />
              </div>

              <div className="flex items-center pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={editingProduct.inStock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                    className="w-4 h-4 accent-emerald-600 rounded"
                  />
                  <span>المنتج متوفر حالياً بالمخزون</span>
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-extrabold shadow-md"
                >
                  حفظ التعديلات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Toast />

    </div>
  );
}
