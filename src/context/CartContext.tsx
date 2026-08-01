'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';
import { CartItem, CustomerDetails, STORE_WHATSAPP_NUMBER as FIXED_PHONE } from '../utils/whatsapp';

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
  
  // Orders Management
  orders: Order[];
  addOrder: (customer: CustomerDetails) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;

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
const CURRENCY_CACHE_VERSION = 'v_iqd_2026_02_fixed_phone';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [storePhone, setStorePhoneState] = useState<string>(FIXED_PHONE);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load state from storage on mount
  useEffect(() => {
    try {
      const currentCacheVer = localStorage.getItem('baby_store_cache_ver');
      if (currentCacheVer !== CURRENCY_CACHE_VERSION) {
        localStorage.removeItem('baby_store_products');
        localStorage.removeItem('baby_store_phone');
        localStorage.setItem('baby_store_cache_ver', CURRENCY_CACHE_VERSION);
        setProducts(DEFAULT_PRODUCTS);
        setStorePhoneState(FIXED_PHONE);
      } else {
        const savedProducts = localStorage.getItem('baby_store_products');
        if (savedProducts) setProducts(JSON.parse(savedProducts));

        const savedPhone = localStorage.getItem('baby_store_phone');
        if (savedPhone && savedPhone !== '9647700000000') setStorePhoneState(savedPhone);
        else setStorePhoneState(FIXED_PHONE);
      }

      const savedUser = sessionStorage.getItem('baby_store_user');
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedCart = localStorage.getItem('baby_store_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedOrders = localStorage.getItem('baby_store_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch (e) {
      console.error('Failed to load storage', e);
    }
  }, []);

  // Sync user state
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
      localStorage.setItem('baby_store_products', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('baby_store_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('baby_store_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  const setStorePhone = (phone: string) => {
    setStorePhoneState(phone);
    try {
      localStorage.setItem('baby_store_phone', phone);
    } catch (e) {}
    showToast('تم تحديث رقم واتساب المتجر بنجاح! 📱');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Products CRUD
  const addProduct = (newProdData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: 'p_' + Date.now(),
      rating: 5.0,
      reviewsCount: 1,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`تم إضافة المنتج "${newProduct.name}" بنجاح! ✨`);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast('تم تحديث بيانات المنتج بنجاح! 📝');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('تم حذف المنتج من المتجر! 🗑️');
  };

  const resetProductsToDefault = () => {
    setProducts(DEFAULT_PRODUCTS);
    localStorage.setItem('baby_store_products', JSON.stringify(DEFAULT_PRODUCTS));
    showToast('تم استعادة كافة المنتجات والأسعار بالدينار العراقي! 🔄');
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

  // Order Logging
  const addOrder = (customer: CustomerDetails): string => {
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer,
      items: [...cart],
      subtotal,
      shippingFee,
      totalPrice,
      status: 'pending',
    };
    setOrders((prev) => [newOrder, ...prev]);
    return orderId;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast('تم تحديث حالة الطلب بنجاح! 📦');
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast('تم حذف الطلب من السجل!');
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
        storePhone: storePhone || FIXED_PHONE,
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
