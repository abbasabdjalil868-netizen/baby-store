import { Product, PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';
import { BannerItem, DEFAULT_BANNERS } from '../data/banners';
import { Order } from '../context/CartContext';

const LOCAL_STORAGE_KEY = 'baby_store_user_products_final_v2';
const BANNERS_STORAGE_KEY = 'baby_store_user_banners_v1';
const ORDERS_STORAGE_KEY = 'baby_store_orders_v1';

// 100% Public, CORS-enabled, Zero-auth Cloud Database Endpoints
const CLOUD_DB_URL = 'https://jsonblob.com/api/jsonBlob/019fc3eb-b96c-749b-8605-f56b124ae5d1';
const BANNERS_DB_URL = 'https://jsonblob.com/api/jsonBlob/019fc40d-d34a-711e-b816-b8db2362f6b8';
const ORDERS_DB_URL = 'https://jsonblob.com/api/jsonBlob/019fc475-b91c-7729-9e0f-90e633d4ff2e';

/**
 * Get products from local storage fallback
 */
export function getLocalProducts(): Product[] {
  if (typeof window === 'undefined') return DEFAULT_PRODUCTS;
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Local Storage Read Error', e);
  }
  return DEFAULT_PRODUCTS;
}

/**
 * Save products to local storage fallback
 */
export function saveLocalProducts(products: Product[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Local Storage Write Error', e);
  }
}

/**
 * Fetch live products from Cloud DB for all customers worldwide
 */
export async function fetchCloudProducts(): Promise<Product[]> {
  const localList = getLocalProducts();
  try {
    const res = await fetch(CLOUD_DB_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        saveLocalProducts(data);
        return data;
      }
    }
  } catch (error) {
    console.error('Cloud DB Fetch Error:', error);
  }
  return localList;
}

/**
 * Save products to Cloud DB (Public Instant Sync)
 */
export async function saveCloudProducts(products: Product[]): Promise<boolean> {
  saveLocalProducts(products);
  try {
    const res = await fetch(CLOUD_DB_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(products),
    });
    return res.ok;
  } catch (error) {
    console.error('Cloud DB Save Error:', error);
    return false;
  }
}

/**
 * Banners Persistence
 */
export function getLocalBanners(): BannerItem[] {
  if (typeof window === 'undefined') return DEFAULT_BANNERS;
  try {
    const saved = localStorage.getItem(BANNERS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {}
  return DEFAULT_BANNERS;
}

export function saveLocalBanners(banners: BannerItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(BANNERS_STORAGE_KEY, JSON.stringify(banners));
  } catch (e) {}
}

export async function fetchCloudBanners(): Promise<BannerItem[]> {
  const localBanners = getLocalBanners();
  try {
    const res = await fetch(BANNERS_DB_URL, {
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        saveLocalBanners(data);
        return data;
      }
    }
  } catch (e) {}
  return localBanners;
}

export async function saveCloudBanners(banners: BannerItem[]): Promise<boolean> {
  saveLocalBanners(banners);
  try {
    const res = await fetch(BANNERS_DB_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(banners),
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

/**
 * Global Orders Persistence (Syncs Customer orders to Admin Dashboard live)
 */
export function getLocalOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {}
  return [];
}

export function saveLocalOrders(orders: Order[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {}
}

export async function fetchCloudOrders(): Promise<Order[]> {
  const localOrders = getLocalOrders();
  try {
    const res = await fetch(ORDERS_DB_URL, {
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        saveLocalOrders(data);
        return data;
      }
    }
  } catch (e) {}
  return localOrders;
}

export async function saveCloudOrders(orders: Order[]): Promise<boolean> {
  saveLocalOrders(orders);
  try {
    const res = await fetch(ORDERS_DB_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orders),
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}
