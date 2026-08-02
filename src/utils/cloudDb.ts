import { Product, PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';

const LOCAL_STORAGE_KEY = 'baby_store_user_products_final_v1';
const CLOUD_DB_URL = 'https://baby-care-store-iq-default-rtdb.firebaseio.com/products.json';

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
 * Fetch live products from Cloud DB without dropping local additions
 */
export async function fetchCloudProducts(): Promise<Product[]> {
  const localList = getLocalProducts();
  try {
    const res = await fetch(CLOUD_DB_URL, {
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Only return cloud data if it has at least as many items as local list
        if (data.length >= localList.length) {
          saveLocalProducts(data);
          return data;
        }
      }
    }
  } catch (error) {
    console.error('Cloud DB Fetch Error:', error);
  }
  return localList;
}

/**
 * Save products to both Cloud DB and Local Storage
 */
export async function saveCloudProducts(products: Product[]): Promise<boolean> {
  // Always save locally first so refresh NEVER erases products!
  saveLocalProducts(products);

  try {
    const res = await fetch(CLOUD_DB_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(products),
    });
    return res.ok;
  } catch (error) {
    console.error('Cloud DB Save Error:', error);
    return false;
  }
}
