export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'milk' | 'diapers' | 'hygiene' | 'feeding' | 'toys';
  categoryName: string;
  ageGroup: 'all' | '0-6m' | '6-12m' | '1-3y';
  ageLabel: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  features: string[];
  badge?: string;
  inStock: boolean;
  unit: string;
}

export const CATEGORIES = [
  { id: 'all', name: 'جميع المنتجات', icon: 'Sparkles' },
  { id: 'milk', name: 'حليب طبي وصناعي', icon: 'Milk' },
  { id: 'diapers', name: 'حفاضات ومنديل عناية', icon: 'Box' },
  { id: 'hygiene', name: 'عناية واستحمام', icon: 'Heart' },
  { id: 'feeding', name: 'رضّاعات ومستلزمات', icon: 'Smile' },
  { id: 'toys', name: 'عضاضات وألعاب', icon: 'Gift' },
] as const;

export const AGE_GROUPS = [
  { id: 'all', label: 'كل الأعمار' },
  { id: '0-6m', label: 'حديثي الولادة (0-6 أشهر)' },
  { id: '6-12m', label: '6 - 12 شهر' },
  { id: '1-3y', label: '1 - 3 سنوات' },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'حليب أبتاميل برونوترا مرحلة 1 (400غ)',
    brand: 'Aptamil',
    category: 'milk',
    categoryName: 'حليب طبي وصناعي',
    ageGroup: '0-6m',
    ageLabel: '0-6 أشهر',
    price: 65,
    oldPrice: 75,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    description: 'تركيبة حليب متكاملة لدعم مناعة حديثي الولادة، مدعمة بالأوميغا 3 والبريبايوتكس لسهولة الهضم وراحة المعدة.',
    features: ['مخصص لحديثي الولادة', 'مدعم بأوميغا 3 و 6', 'سهل الهضم ولطيف على المعدة'],
    badge: 'الأكثر مبيعاً',
    inStock: true,
    unit: 'علبة 400 غرام'
  },
  {
    id: 'p2',
    name: 'حليب نان كومفورت مرحلة 2 (800غ)',
    brand: 'Nestlé NAN',
    category: 'milk',
    categoryName: 'حليب طبي وصناعي',
    ageGroup: '6-12m',
    ageLabel: '6-12 شهر',
    price: 110,
    oldPrice: 125,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    description: 'حليب مخصص للأطفال من عمر 6 أشهر يساعد في تقليل المغص والمغص المعوي بفضل تركيبته الخاصة الخفيفة.',
    features: ['يقلل المغص والغازات', 'مدعم بالحديد والفيتامينات', 'طعم محبوب للأطفال'],
    badge: 'خصم خاص',
    inStock: true,
    unit: 'علبة 800 غرام'
  },
  {
    id: 'p3',
    name: 'حليب سيميلاك جولد مرحلة 3 (1600غ)',
    brand: 'Similac',
    category: 'milk',
    categoryName: 'حليب طبي وصناعي',
    ageGroup: '1-3y',
    ageLabel: '1-3 سنوات',
    price: 195,
    oldPrice: 215,
    rating: 4.9,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80',
    description: 'تركيبة نمو متقدمة تحتوي على HMO الطبيعي لدعم الجهاز المناعي والتطور العقلي والبدني للأطفال فوق السنة.',
    features: ['يحتوي على مركب HMO', 'دعم النمو العقلي والبدني', 'خالي من زيت النخيل'],
    badge: 'توفير عائلي',
    inStock: true,
    unit: 'علبة اقتصادية 1600غ'
  },
  {
    id: 'p4',
    name: 'حفاضات بامبرز عناية ممتازة كلوت مقاس 3 (56 حفاضة)',
    brand: 'Pampers',
    category: 'diapers',
    categoryName: 'حفاضات ومنديل عناية',
    ageGroup: '0-6m',
    ageLabel: '4 - 9 كجم',
    price: 88,
    oldPrice: 98,
    rating: 4.7,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80',
    description: 'نعومة فائقة وملمس قطني يوفر حماية حتى 12 ساعة ضد التسريب مع شريط مؤشر الجفاف الحساس.',
    features: ['ملمس ريشي ناعم', 'امتصاص فائق لمدة 12 ساعة', 'مؤشر جفاف حراري'],
    badge: 'موصى به طبيًا',
    inStock: true,
    unit: 'عبوة 56 حفاضة'
  },
  {
    id: 'p5',
    name: 'مناديل واترويبس النقية للطفل (4 عبوات x 60 منديل)',
    brand: 'WaterWipes',
    category: 'diapers',
    categoryName: 'حفاضات ومنديل عناية',
    ageGroup: 'all',
    ageLabel: 'لكل الأعمار',
    price: 72,
    oldPrice: 85,
    rating: 5.0,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
    description: 'المناديل الأنقى عالميًا المكونة من 99.9% ماء ونقطة من خلاصة الفاكهة. آمنة تماماً لحديثي الولادة والشرى الجلدي.',
    features: ['99.9% ماء نقي', 'خالية تماماً من العطور والمواد الكيميائية', 'آمنة على البشرة الحساسة'],
    badge: '100% طبيعي',
    inStock: true,
    unit: 'مجموعة 4 عبوات'
  },
  {
    id: 'p6',
    name: 'مجموعة سيباميد العناية الكاملة بالطفل (شامبو + لوشن + كريم)',
    brand: 'Sebamed',
    category: 'hygiene',
    categoryName: 'عناية واستحمام',
    ageGroup: 'all',
    ageLabel: 'لكل الأعمار',
    price: 135,
    oldPrice: 160,
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
    description: 'مجموعة مستحضرات سيباميد الخالية من الصابون بدرجة حموضة 5.5 لحماية الغلاف الطبيعي لبشرة الطفل الرقيقة.',
    features: ['درجة حموضة متوازنة 5.5', 'حماية ضد التسلخات والجفاف', 'طبي ومجرب إكلينيكياً'],
    badge: 'مجموعة قيمة',
    inStock: true,
    unit: 'طقم 3 قطع'
  },
  {
    id: 'p7',
    name: 'رضّاعة فيليبس أفينت الطبيعية مضادة للمغص (260 مل)',
    brand: 'Philips Avent',
    category: 'feeding',
    categoryName: 'رضّاعات ومستلزمات',
    ageGroup: '0-6m',
    ageLabel: '1 شهر +',
    price: 55,
    oldPrice: 65,
    rating: 4.8,
    reviewsCount: 175,
    image: 'https://images.unsplash.com/photo-1560963689-02e1a87d00f6?w=600&auto=format&fit=crop&q=80',
    description: 'تصميم حلمة مرن يشبه ثدي الأم يسهل الجمع بين الرضاعة الطبيعية والصناعية، مع صمام مضاد للمغص.',
    features: ['حلمة طبيعية فائقة النعومة', 'صمام مزدوج يقلل الهواء والمغص', 'خالية من BPA تماماً'],
    badge: 'الأعلى تقييماً',
    inStock: true,
    unit: 'رضّاعة واحدة'
  },
  {
    id: 'p8',
    name: 'عضاضة سيليكون مهدئة لآلام التسنين خالية من BPA',
    brand: 'Chicco',
    category: 'toys',
    categoryName: 'عضاضات وألعاب',
    ageGroup: '0-6m',
    ageLabel: '3 أشهر +',
    price: 32,
    oldPrice: 40,
    rating: 4.7,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80',
    description: 'عضاضة باردة محشوة بالماء المعقم لتهدئة لثة الطفل أثناء ظهور الأسنان الأولى، سهلة الإمساك بالأيدي الصغيرة.',
    features: ['قابلة للتبريد بالثلاجة', 'خامات سيليكون غذائية آمنة', 'تصميم مريح وسهل التنظيف'],
    badge: 'جديد',
    inStock: true,
    unit: 'قطعة واحدة'
  },
  {
    id: 'p9',
    name: 'حليب موستيلا شامبو ورغوة استحمام لحديثي الولادة (500 مل)',
    brand: 'Mustela',
    category: 'hygiene',
    categoryName: 'عناية واستحمام',
    ageGroup: '0-6m',
    ageLabel: 'منذ اليوم الأول',
    price: 78,
    oldPrice: 90,
    rating: 4.9,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&auto=format&fit=crop&q=80',
    description: 'شامبو ورغوة استحمام بتركيبة الشوفان العضوية والأفوكادو، تنظف الشعر والجسم دون التسبب في دموع أو تهيج العينين.',
    features: ['تركيبة لا تسبب الدموع', '98% مكونات طبيعية عضوي', 'عطر رقيق ومنعش'],
    badge: 'عضوي',
    inStock: true,
    unit: 'عبوة ضاغط 500 مل'
  }
];
