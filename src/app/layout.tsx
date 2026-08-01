import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../context/CartContext';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'بيبي كير | متجر حليب ومستلزمات الأطفال الشامل',
  description: 'المتجر الإلكتروني المتخصص لأفضل أنواع الحليب الطبي والصناعي، الحفاضات، وعناية الرضع مع التوصيل والدفع عند الاستلام وإرسال الطلبات عبر الواتساب.',
  keywords: ['حليب أطفال', 'مستلزمات أطفال', 'حفاضات بامبرز', 'رضّاعات أفينت', 'دفع عند الاستلام', 'طلب عبر الواتساب'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="antialiased bg-[#faf9f6] text-slate-800 font-sans min-h-screen flex flex-col selection:bg-emerald-200 selection:text-emerald-900">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
