import { Product, PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';

const LOCAL_STORAGE_KEY = 'baby_store_user_products_final_v2';

// 100% Public, CORS-enabled, Zero-auth Cloud Database Endpoint
const CLOUD_DB_URL = 'https://jsonblob.com/api/jsonBlob/019fc3eb-b96c-749b-8605-f56b124ae5d1';

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
  // Always save locally first
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
