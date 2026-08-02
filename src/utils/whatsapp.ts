import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  notes?: string;
  paymentMethod: 'cod';
}

// Permanent Store WhatsApp Number (07725757873 -> 9647725757873)
export const STORE_WHATSAPP_NUMBER = '9647725757873';

export function generateWhatsAppOrderUrl(
  items: CartItem[],
  customer: CustomerDetails,
  subtotal: number,
  shippingFee: number,
  totalPrice: number,
  phoneNumber: string = STORE_WHATSAPP_NUMBER
): string {
  // STRICTLY HARDCODED TO 9647725757873 - NO FALLBACKS, NO CACHE!
  const targetPhone = '9647725757873';

  const dateStr = new Date().toLocaleDateString('ar-IQ', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  let message = `🛒 *طلب جديد من متجر بيبي كير (Baby Care Store)*\n`;
  message += `📅 *التاريخ:* ${dateStr}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

  message += `👤 *معلومات الزبون:*\n`;
  message += `• *الاسم الكريم:* ${customer.name}\n`;
  message += `• *رقم التواصل:* ${customer.phone}\n`;
  message += `• *العنوان / المدينة:* ${customer.address}\n`;
  message += `• *طريقة الدفع:* 💵 الدفع عند الاستلام (Cash on Delivery)\n`;
  if (customer.notes && customer.notes.trim() !== '') {
    message += `• *ملاحظات الطلب:* ${customer.notes.trim()}\n`;
  }
  message += `\n📦 *قائمة المنتجات المطلوبة (${items.length}):*\n`;

  items.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    message += `${index + 1}. *${item.product.name}*\n`;
    message += `   └ الكمية: ${item.quantity} | السعر: ${item.product.price.toLocaleString()} د.ع | الإجمالي: ${itemTotal.toLocaleString()} د.ع\n`;
  });

  message += `\n💵 *ملخص الحساب:*\n`;
  message += `• مجموع المنتجات: ${subtotal.toLocaleString()} د.ع\n`;
  message += `• كلفة التوصيل: ${shippingFee === 0 ? 'مجاني 🎉' : `${shippingFee.toLocaleString()} د.ع`}\n`;
  message += `• *المجموع الكلي النهائي:* *${totalPrice.toLocaleString()} د.ع*\n\n`;

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `يرجى تأكيد الطلب للبدء بالتجهيز والتوصيل فوراً. شكراً لتسوقكم معنا! 🍼✨`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${targetPhone}?text=${encodedMessage}`;
}
