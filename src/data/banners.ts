export interface BannerItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  categoryLink?: string;
  ctaText?: string;
}

export const DEFAULT_BANNERS: BannerItem[] = [
  {
    id: 'b1',
    badge: 'تخفيضات موسمية 🍼',
    title: 'أفضل حليب وأغذية لأطفالكم',
    subtitle: 'توفير عائلي وتوصيل سريع لكافة المحافظات',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&auto=format&fit=crop&q=80',
    categoryLink: 'milk',
    ctaText: 'تسوق قسم الحليب والرضاعات 🛒',
  },
  {
    id: 'b2',
    badge: 'راحة وجودة عالية 📦',
    title: 'حفاضات ومناديل العناية الفائقة',
    subtitle: 'جميع المقاسات من أشهر الماركات العالميه',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200&auto=format&fit=crop&q=80',
    categoryLink: 'diapers',
    ctaText: 'تصفح عروض الحفاضات 👶',
  },
  {
    id: 'b3',
    badge: 'توصيل مجاني 🚚',
    title: 'عناية كاملة لبشرة وصحة طفلك',
    subtitle: 'شحن مجاني للطلبات فوق 50,000 د.ع',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&auto=format&fit=crop&q=80',
    categoryLink: 'care',
    ctaText: 'اكتشف منتجات العناية ✨',
  },
];
