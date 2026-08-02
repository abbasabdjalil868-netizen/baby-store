'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';
import { BannerItem, DEFAULT_BANNERS } from '../data/banners';
import { CartItem, CustomerDetails, STORE_WHATSAPP_NUMBER as FIXED_PHONE } from '../utils/whatsapp';
import {
  fetchCloudProducts,
  saveCloudProducts,
  getLocalProducts,
  saveLocalProducts,
  fetchCloudBanners,
  saveCloudBanners,
  getLocalBanners,
  saveLocalBanners,
  fetchCloudOrders,
  saveCloudOrders,
  getLocalOrders,
  saveLocalOrders,
} from '../utils/cloudDb';

export interface UserProfile {
  name: string;
  email?: string;
  avatar?: string;
  role: 'customer' | 'admin' | 'guest';
}

export interface Order {
  id: string;
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
}

interface CartContextType {
  // Auth State
  user: UserProfile | null;
  loginAsGuest: () => void;
  loginWithGoogle: () => void;
  loginCustomer: (name: string) => void;
  loginAdmin: (username: string, pass: string) => boolean;
  logoutUser: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;

  // Store Products Management
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;
  isSyncingCloud: boolean;

  // Banners Management
  banners: BannerItem[];
  addBanner: (banner: Omit<BannerItem, 'id'>) => void;
  updateBanner: (id: string, banner: Partial<BannerItem>) => void;
  deleteBanner: (id: string) => void;

  // Cart Management
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  // Filtering & Search state
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedAgeGroup: string;
  setSelectedAgeGroup: (age: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  
  // Orders Management (Synced Cloud Orders)
  orders: Order[];
  addOrder: (customer: CustomerDetails) => Promise<string>;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
  refreshOrders: () => Promise<void>;

  // Admin Store Settings
  storePhone: string;
  setStorePhone: (phone: string) => void;

  // Computations
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  totalPrice: number;
  freeShippingThreshold: number;
  progressToFreeShipping: number;
  
  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const FREE_SHIPPING_THRESHOLD = 50000; // Free shipping above 50,000 IQD
export const DEFAULT_SHIPPING_FEE = 5000; // 5,000 IQD Delivery fee

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>(getLocalProducts);
  const [banners, setBanners] = useState<BannerItem[]>(getLocalBanners);
  const [orders, setOrders] = useState<Order[]>(getLocalOrders);
  const [isSyncingCloud, setIsSyncingCloud] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [storePhone, setStorePhoneState] = useState<string>(FIXED_PHONE);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mount sync: Fetch Cloud products, banners & customer orders
  useEffect(() => {
    async function initCloudSync() {
      setIsSyncingCloud(true);
      const localList = getLocalProducts();
      const cloudProds = await fetchCloudProducts();
      if (cloudProds && cloudProds.length >= localList.length) {
        setProducts(cloudProds);
      }

      const cloudBanners = await fetchCloudBanners();
      if (cloudBanners && cloudBanners.length > 0) {
        setBanners(cloudBanners);
      }

      const cloudOrders = await fetchCloudOrders();
      if (cloudOrders) {
        setOrders(cloudOrders);
      }

      setIsSyncingCloud(false);
    }
    initCloudSync();

    try {
      const savedUser = sessionStorage.getItem('baby_store_user');
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedCart = localStorage.getItem('baby_store_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (e) {
      console.error('Failed to load storage', e);
    }
  }, []);

  // Poll Cloud Orders every 15 seconds so Admin gets live order updates automatically
  useEffect(() => {
    const orderInterval = setInterval(async () => {
      const liveOrders = await fetchCloudOrders();
      if (liveOrders) {
        setOrders(liveOrders);
      }
    }, 15000);
    return () => clearInterval(orderInterval);
  }, []);

  // Sync user session
  const saveUserSession = (usr: UserProfile | null) => {
    setUser(usr);
    try {
      if (usr) sessionStorage.setItem('baby_store_user', JSON.stringify(usr));
      else sessionStorage.removeItem('baby_store_user');
    } catch (e) {}
  };

  const loginAsGuest = () => {
    const guestUser: UserProfile = {
      name: 'ضيف المتجر',
      role: 'guest',
    };
    saveUserSession(guestUser);
    setIsAuthModalOpen(false);
    showToast('أهلاً بك! تم التصفح كضيف 👶');
  };

  const loginWithGoogle = () => {
    const googleUser: UserProfile = {
      name: 'علي الكرار',
      email: 'ali.store@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: 'customer',
    };
    saveUserSession(googleUser);
    setIsAuthModalOpen(false);
    showToast('تم تسجيل الدخول بنجاح عبر حساب Google! 🌐');
  };

  const loginCustomer = (customerName: string) => {
    const customerUser: UserProfile = {
      name: customerName,
      role: 'customer',
    };
    saveUserSession(customerUser);
    setIsAuthModalOpen(false);
    showToast(`أهلاً بك يا ${customerName}! تم تسجيل الدخول بنجاح 👶`);
  };

  const loginAdmin = (username: string, pass: string): boolean => {
    if (username.trim().toLowerCase() === 'abbas' && pass.trim() === '20012001') {
      const adminUser: UserProfile = {
        name: 'عباس (الأدمن)',
        role: 'admin',
      };
      saveUserSession(adminUser);
      setIsAuthModalOpen(false);
      showToast('أهلاً بك يا عباس! تم فتح لوحة تحكم الأدمن بنجاح 🔑');
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    saveUserSession(null);
    showToast('تم تسجيل الخروج بنجاح.');
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Sync state changes to storage
  useEffect(() => {
    try {
      localStorage.setItem('baby_store_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const setStorePhone = (phone: string) => {
    setStorePhoneState(phone);
    showToast('تم تحديث رقم واتساب المتجر بنجاح! 📱');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Products CRUD - Saves locally AND pushes to Cloud DB
  const addProduct = async (newProdData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: 'p_' + Date.now(),
      rating: 5.0,
      reviewsCount: 1,
    };
    const updated = [newProduct, ...products];
    setProducts(updated);
    saveLocalProducts(updated);
    showToast(`تم حفظ وتثبيت المنتج "${newProduct.name}" بنجاح (${updated.length} منتجات)! ✨`);
    await saveCloudProducts(updated);
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setProducts(updated);
    saveLocalProducts(updated);
    showToast('تم حفظ التعديلات بنجاح! 📝');
    await saveCloudProducts(updated);
  };

  const deleteProduct = async (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveLocalProducts(updated);
    setCart((prev) => prev.filter((item) => item.product.id !== id));
    showToast('تم حذف المنتج بنجاح! 🗑️');
    await saveCloudProducts(updated);
  };

  const resetProductsToDefault = async () => {
    setProducts(DEFAULT_PRODUCTS);
    saveLocalProducts(DEFAULT_PRODUCTS);
    await saveCloudProducts(DEFAULT_PRODUCTS);
    showToast('تم استعادة كافة المنتجات الافتراضية سحابياً! 🔄');
  };

  // Banners CRUD
  const addBanner = async (bannerData: Omit<BannerItem, 'id'>) => {
    const newBanner: BannerItem = {
      ...bannerData,
      id: 'b_' + Date.now(),
    };
    const updated = [...banners, newBanner];
    setBanners(updated);
    saveLocalBanners(updated);
    showToast('تم إضافة البنر الإعلاني الجديد بنجاح! 🎡');
    await saveCloudBanners(updated);
  };

  const updateBanner = async (id: string, bannerData: Partial<BannerItem>) => {
    const updated = banners.map((b) => (b.id === id ? { ...b, ...bannerData } : b));
    setBanners(updated);
    saveLocalBanners(updated);
    showToast('تم تحديث البنر الإعلاني بنجاح! 🎡');
    await saveCloudBanners(updated);
  };

  const deleteBanner = async (id: string) => {
    const updated = banners.filter((b) => b.id !== id);
    setBanners(updated);
    saveLocalBanners(updated);
    showToast('تم حذف البنر الإعلاني بنجاح! 🗑️');
    await saveCloudBanners(updated);
  };

  // Cart Operations
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevCart, { product, quantity }];
    });
    showToast(`تم إضافة "${product.name}" إلى السلة بنجاح! 🍼`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Automatic Stock Deduction Helper
  const deductStockForOrder = async (orderedItems: CartItem[]) => {
    setProducts((currentProducts) => {
      const updatedProds = currentProducts.map((p) => {
        const orderedItem = orderedItems.find((item) => item.product.id === p.id);
        if (orderedItem) {
          const currentStock = p.stockCount ?? 20;
          const newStock = Math.max(0, currentStock - orderedItem.quantity);
          return {
            ...p,
            stockCount: newStock,
            inStock: newStock > 0,
          };
        }
        return p;
      });

      saveLocalProducts(updatedProds);
      saveCloudProducts(updatedProds);
      return updatedProds;
    });
  };

  // Global Real-Time Cloud Order Logging
  const addOrder = async (customer: CustomerDetails): Promise<string> => {
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const orderedItems = [...cart];

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer,
      items: orderedItems,
      subtotal,
      shippingFee,
      totalPrice,
      status: 'pending',
    };

    // 1. Fetch freshest orders from Cloud DB first to avoid overwriting peer orders
    const latestCloudOrders = await fetchCloudOrders();
    const updatedOrders = [newOrder, ...latestCloudOrders];

    setOrders(updatedOrders);
    saveLocalOrders(updatedOrders);

    // 2. Save globally to Cloud DB so Abbas sees it live in /admin on any device
    await saveCloudOrders(updatedOrders);

    // 3. Automatically deduct stock for ordered items
    deductStockForOrder(orderedItems);

    return orderId;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updated);
    saveLocalOrders(updated);
    await saveCloudOrders(updated);
    showToast('تم تحديث حالة الطلب بنجاح! 📦');
  };

  const deleteOrder = async (orderId: string) => {
    const updated = orders.filter((o) => o.id !== orderId);
    setOrders(updated);
    saveLocalOrders(updated);
    await saveCloudOrders(updated);
    showToast('تم حذف الطلب من السجل!');
  };

  const refreshOrders = async () => {
    const liveOrders = await fetchCloudOrders();
    if (liveOrders) {
      setOrders(liveOrders);
      showToast('تم تحديث الطلبات من السحابة بنجاح! 🔄');
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : DEFAULT_SHIPPING_FEE;
  const totalPrice = subtotal + shippingFee;
  const progressToFreeShipping = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <CartContext.Provider
      value={{
        user,
        loginAsGuest,
        loginWithGoogle,
        loginCustomer,
        loginAdmin,
        logoutUser,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        isSyncingCloud,
        banners,
        addBanner,
        updateBanner,
        deleteBanner,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        selectedCategory,
        setSelectedCategory,
        selectedAgeGroup,
        setSelectedAgeGroup,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        refreshOrders,
        storePhone: FIXED_PHONE,
        setStorePhone,
        totalItems,
        subtotal,
        shippingFee,
        totalPrice,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        progressToFreeShipping,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
