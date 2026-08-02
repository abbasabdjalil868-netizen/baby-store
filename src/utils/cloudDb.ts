import { Product, PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';

// Firebase Realtime Cloud Database Endpoint for Baby Store
const CLOUD_DB_URL = 'https://baby-care-store-iq-default-rtdb.firebaseio.com/products.json';

/**
 * Fetch live products from Cloud Database (for all customers globally)
 */
export async function fetchCloudProducts(): Promise<Product[]> {
  try {
    const res = await fetch(CLOUD_DB_URL, {
      cache: 'no-store', // Always fetch fresh live data
    });
    if (!res.ok) {
      return DEFAULT_PRODUCTS;
    }
    const data = await res.json();
    if (!data || !Array.isArray(data) || data.length === 0) {
      // If DB is empty, initialize with default products
      await saveCloudProducts(DEFAULT_PRODUCTS);
      return DEFAULT_PRODUCTS;
    }
    return data;
  } catch (error) {
    console.error('Cloud DB Fetch Error:', error);
    return DEFAULT_PRODUCTS;
  }
}

/**
 * Save / Update products in Cloud Database (Admin Abbas)
 */
export async function saveCloudProducts(products: Product[]): Promise<boolean> {
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
